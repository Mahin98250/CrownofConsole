import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

// The source model is credited in MODEL-CREDITS.md. It is loaded only for the
// visual controller; all interaction state and hit targets remain in React.
const MODEL_URL = 'https://raw.githubusercontent.com/SafaElmali/dualsense-studio/main/controller/dualsense.glb'
const CONTROL_ALIASES = { l3: 'left-stick', r3: 'right-stick' }

export default function ThreeController({ active, pressed, stickOffsets, triggerPressure, onReady, onError }) {
  const canvasRef = useRef(null)
  const interactionRef = useRef({ active, pressed, stickOffsets, triggerPressure })
  const callbacksRef = useRef({ onReady, onError })

  useEffect(() => {
    callbacksRef.current = { onReady, onError }
  }, [])

  useEffect(() => {
    interactionRef.current = { active, pressed, stickOffsets, triggerPressure }
  }, [active, pressed, stickOffsets])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    let disposed = false
    let frame = 0
    let previousTime = 0
    let renderer
    let environmentTarget
    let resizeObserver
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    const model = new THREE.Group()
    const controls = new Map()
    const raycastMeshes = []
    scene.add(model)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const setSize = () => {
      if (!renderer || disposed) return
      const bounds = canvas.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(bounds.width, bounds.height, false)
      camera.aspect = bounds.width / bounds.height
      camera.updateProjectionMatrix()
    }

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setClearColor(0x000000, 0)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.04
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
    } catch (error) {
      callbacksRef.current.onError?.(error)
      return undefined
    }

    scene.add(new THREE.HemisphereLight(0xf4f6ff, 0x343946, 1.05))
    const key = new THREE.DirectionalLight(0xfff7ec, 3.1)
    key.position.set(-3.5, 5.5, 6)
    key.castShadow = true
    key.shadow.mapSize.set(1024, 1024)
    key.shadow.camera.left = -4
    key.shadow.camera.right = 4
    key.shadow.camera.top = 4
    key.shadow.camera.bottom = -4
    key.shadow.normalBias = 0.018
    scene.add(key)
    const fill = new THREE.DirectionalLight(0xd6e4ff, 1.25)
    fill.position.set(4, 1.5, 5)
    scene.add(fill)
    const rim = new THREE.DirectionalLight(0xe1e9ff, 2.2)
    rim.position.set(0, 3.5, -5)
    scene.add(rim)

    const pmrem = new THREE.PMREMGenerator(renderer)
    const room = new RoomEnvironment()
    environmentTarget = pmrem.fromScene(room, 0.04)
    scene.environment = environmentTarget.texture
    scene.environmentIntensity = 0.78
    room.dispose()
    pmrem.dispose()

    const loader = new GLTFLoader()
    loader.load(MODEL_URL, (gltf) => {
      if (disposed) return
      gltf.scene.updateMatrixWorld(true)
      const meshes = []
      gltf.scene.traverse((object) => {
        if (object.isMesh) meshes.push(object)
      })

      for (const object of meshes) {
        const geometry = object.geometry.clone().applyMatrix4(object.matrixWorld)
        const materials = Array.isArray(object.material)
          ? object.material.map((material) => material.clone())
          : object.material.clone()
        const materialList = Array.isArray(materials) ? materials : [materials]
        for (const material of materialList) {
          if (material.map) material.map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
          if ('roughness' in material) material.roughness = Math.max(0.22, Math.min(0.82, material.roughness))
          if ('metalness' in material) material.metalness = Math.min(material.metalness, 0.18)
          if (material.emissive) {
            material.userData.baseEmissive = material.emissive.clone()
            material.userData.baseEmissiveIntensity = material.emissiveIntensity || 0
          }
        }

        const mesh = new THREE.Mesh(geometry, materials)
        mesh.name = object.name
        mesh.userData = { ...object.userData }
        mesh.castShadow = true
        mesh.receiveShadow = true
        const controlId = object.userData.control

        if (controlId && controlId !== 'lights') {
          if (!controls.has(controlId)) {
            const group = new THREE.Group()
            group.name = controlId
            group.userData.control = controlId
            controls.set(controlId, group)
            model.add(group)
          }
          controls.get(controlId).add(mesh)
        } else {
          model.add(mesh)
        }
        raycastMeshes.push(mesh)
      }

      // Give each moving part its own physical pivot so button presses move the
      // real mesh assembly instead of scaling a flat overlay.
      for (const [id, group] of controls) {
        const bounds = new THREE.Box3().setFromObject(group)
        const pivot = bounds.getCenter(new THREE.Vector3())
        if (id.endsWith('-stick')) pivot.z = bounds.max.z - 0.06
        if (id === 'l2' || id === 'r2') {
          pivot.y = bounds.max.y - 0.1
          pivot.z = bounds.max.z - 0.1
        }
        for (const child of group.children) child.geometry.translate(-pivot.x, -pivot.y, -pivot.z)
        group.position.copy(pivot)
        group.userData.rest = pivot.clone()
      }

      const bounds = new THREE.Box3().setFromObject(model)
      const center = bounds.getCenter(new THREE.Vector3())
      const size = bounds.getSize(new THREE.Vector3())
      model.position.sub(center)
      model.rotation.set(0.08, -0.12, -0.018)

      const verticalFit = size.y / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 0.82)
      const horizontalFit = size.x / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 1.55 * 0.88)
      camera.position.set(0, 0, Math.max(verticalFit, horizontalFit, 3.5) * 1.08)
      camera.lookAt(0, 0, 0)

      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 30),
        new THREE.ShadowMaterial({ color: 0x090d14, opacity: 0.22 }),
      )
      ground.rotation.x = -Math.PI / 2
      ground.position.y = bounds.min.y - center.y - 0.045
      ground.receiveShadow = true
      scene.add(ground)

      setSize()
      canvas.dataset.ready = 'true'
      callbacksRef.current.onReady?.()
    }, undefined, (error) => {
      if (!disposed) onError?.(error)
    })

    resizeObserver = new ResizeObserver(setSize)
    resizeObserver.observe(canvas.parentElement)
    setSize()

    const animate = (time) => {
      if (disposed) return
      frame = window.requestAnimationFrame(animate)
      if (document.hidden || renderer.getContext().isContextLost()) return
      const dt = Math.min((time - (previousTime || time)) / 1000, 0.05)
      previousTime = time
      const blend = reduceMotion.matches ? 1 : 1 - Math.exp(-19 * dt)
      const input = interactionRef.current
      const isIdle = !input.pressed && !input.active
      if (!reduceMotion.matches && isIdle) {
        model.position.y = Math.sin(time * 0.00075) * 0.018
        model.rotation.y = -0.12 + Math.sin(time * 0.00032) * 0.018
      } else {
        model.position.y += (0 - model.position.y) * blend
        model.rotation.y += (-0.12 - model.rotation.y) * blend
      }

      for (const [id, group] of controls) {
        const rest = group.userData.rest
        if (!rest) continue
        const uiId = id === 'left-stick' ? 'l3' : id === 'right-stick' ? 'r3' : id
        const held = input.pressed === uiId
        if (id === 'left-stick' || id === 'right-stick') {
          const offset = input.stickOffsets?.[uiId] || { x: 0, y: 0 }
          const bounds = canvas.getBoundingClientRect()
          const travel = Math.max(4, bounds.width * 0.13)
          const targetX = THREE.MathUtils.clamp(offset.y / travel, -1, 1) * 0.29
          const targetY = THREE.MathUtils.clamp(offset.x / travel, -1, 1) * 0.29
          group.rotation.x += (targetX - group.rotation.x) * blend
          group.rotation.y += (targetY - group.rotation.y) * blend
          group.position.z += ((rest.z - (held ? 0.035 : 0)) - group.position.z) * blend
        } else if (id === 'l2' || id === 'r2') {
          const pressure = input.triggerPressure?.[id] ?? (held ? 0.16 : 0)
          const target = -THREE.MathUtils.clamp(pressure, 0, 1) * 0.22
          group.rotation.x += (target - group.rotation.x) * blend
        } else {
          const travel = id === 'touchpad' ? 0.016 : id === 'l1' || id === 'r1' ? 0.026 : 0.034
          group.position.z += ((rest.z - (held ? travel : 0)) - group.position.z) * blend
        }

        for (const child of group.children) {
          const mats = Array.isArray(child.material) ? child.material : [child.material]
          for (const material of mats) {
            if (!material.emissive || !material.userData.baseEmissive) continue
            const selected = input.active === uiId
            material.emissive.copy(material.userData.baseEmissive)
            if (selected) material.emissive.lerp(new THREE.Color('#b6e65a'), 0.18)
            material.emissiveIntensity = material.userData.baseEmissiveIntensity + (selected ? 0.22 : 0)
          }
        }
      }
      renderer.render(scene, camera)
    }
    frame = window.requestAnimationFrame(animate)

    const handleContextLost = (event) => {
      event.preventDefault()
      canvas.dataset.ready = 'false'
    }
    canvas.addEventListener('webglcontextlost', handleContextLost)

    return () => {
      disposed = true
      window.cancelAnimationFrame(frame)
      resizeObserver?.disconnect()
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      scene.traverse((object) => {
        if (!object.isMesh) return
        object.geometry.dispose()
        const mats = Array.isArray(object.material) ? object.material : [object.material]
        mats.forEach((material) => {
          material.map?.dispose?.()
          material.dispose()
        })
      })
      environmentTarget?.dispose()
      renderer?.dispose()
    }
  }, [onReady, onError])

  return <canvas ref={canvasRef} className="controller-3d-canvas" aria-hidden="true" />
}
