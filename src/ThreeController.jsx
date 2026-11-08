import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'


// Build a compact, procedural studio reflection rig. Broad softboxes create
// readable highlights on glossy buttons while the darker sweep keeps the shell
// from looking metallic. It is generated locally: no remote HDRI or extra asset.
function createStudioEnvironment(renderer, lowPowerDevice) {
  const canvas = document.createElement('canvas')
  canvas.width = lowPowerDevice ? 768 : 1024
  canvas.height = lowPowerDevice ? 384 : 512
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const w = canvas.width
  const h = canvas.height
  const base = ctx.createLinearGradient(0, 0, 0, h)
  base.addColorStop(0, '#657080')
  base.addColorStop(0.24, '#303945')
  base.addColorStop(0.52, '#111820')
  base.addColorStop(0.78, '#252e39')
  base.addColorStop(1, '#77808a')
  ctx.fillStyle = base
  ctx.fillRect(0, 0, w, h)

  const glow = (x, y, radius, colour) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, colour)
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
  }
  glow(w * 0.5, h * 0.48, w * 0.42, 'rgba(170,190,215,.18)')
  glow(w * 0.04, h * 0.52, w * 0.22, 'rgba(220,230,245,.12)')
  glow(w * 0.96, h * 0.46, w * 0.2, 'rgba(210,225,245,.1)')

  // Large diffused studio panels, plus narrow edge strips for crisp contours.
  const panel = (x, y, width, height, alpha = 0.9) => {
    ctx.save()
    ctx.shadowColor = 'rgba(255,255,255,.5)'
    ctx.shadowBlur = Math.max(12, h * 0.055)
    const gradient = ctx.createLinearGradient(x, y, x + width, y + height)
    gradient.addColorStop(0, `rgba(255,255,255,${alpha * 0.72})`)
    gradient.addColorStop(0.5, `rgba(238,244,255,${alpha})`)
    gradient.addColorStop(1, `rgba(205,219,238,${alpha * 0.68})`)
    ctx.fillStyle = gradient
    ctx.fillRect(x, y, width, height)
    ctx.restore()
  }
  panel(w * 0.105, h * 0.18, w * 0.12, h * 0.36, 0.72)
  panel(w * 0.39, h * 0.07, w * 0.2, h * 0.19, 0.62)
  panel(w * 0.755, h * 0.2, w * 0.105, h * 0.4, 0.78)
  panel(w * 0.925, h * 0.3, w * 0.025, h * 0.28, 0.48)
  panel(w * 0.28, h * 0.82, w * 0.38, h * 0.035, 0.34)

  const texture = new THREE.CanvasTexture(canvas)
  texture.mapping = THREE.EquirectangularReflectionMapping
  texture.colorSpace = THREE.SRGBColorSpace
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())

  const pmrem = new THREE.PMREMGenerator(renderer)
  pmrem.compileEquirectangularShader()
  const target = pmrem.fromEquirectangular(texture)
  texture.dispose()
  pmrem.dispose()
  return target
}


const FACE_BUTTON_SYMBOLS = {
  triangle: 'triangle',
  circle: 'circle',
  cross: 'cross',
  square: 'square',
}

// Add a small, real 3D cap and a crisp engraved-style symbol to each face
// button. The cap follows the original animated button group, so it presses
// with the button instead of behaving like a screen-space sticker.
function addFaceButtonDetails(group, id, renderer) {
  if (!FACE_BUTTON_SYMBOLS[id]) return null

  // The licensed model already contains the physical white button caps and
  // their decal meshes. Measure the complete button assembly in its own local
  // space, then place only the symbol artwork just above the cap surface. This
  // avoids stacking a second cap over the original model's authored geometry.
  group.updateMatrixWorld(true)
  const worldBounds = new THREE.Box3().setFromObject(group)
  const worldCenter = worldBounds.getCenter(new THREE.Vector3())
  const worldCorners = [
    new THREE.Vector3(worldBounds.min.x, worldBounds.min.y, worldBounds.min.z),
    new THREE.Vector3(worldBounds.min.x, worldBounds.min.y, worldBounds.max.z),
    new THREE.Vector3(worldBounds.min.x, worldBounds.max.y, worldBounds.min.z),
    new THREE.Vector3(worldBounds.min.x, worldBounds.max.y, worldBounds.max.z),
    new THREE.Vector3(worldBounds.max.x, worldBounds.min.y, worldBounds.min.z),
    new THREE.Vector3(worldBounds.max.x, worldBounds.min.y, worldBounds.max.z),
    new THREE.Vector3(worldBounds.max.x, worldBounds.max.y, worldBounds.min.z),
    new THREE.Vector3(worldBounds.max.x, worldBounds.max.y, worldBounds.max.z),
  ]
  const localBounds = new THREE.Box3()
  for (const corner of worldCorners) localBounds.expandByPoint(group.worldToLocal(corner))
  const size = localBounds.getSize(new THREE.Vector3())
  const center = localBounds.getCenter(new THREE.Vector3())
  const radius = Math.min(size.x, size.y) * 0.465
  if (!Number.isFinite(radius) || radius <= 0.001) return null

  const artwork = document.createElement('canvas')
  artwork.width = 256
  artwork.height = 256
  const ctx = artwork.getContext('2d')
  if (!ctx) return null

  // A compact, high-contrast grey mark sized like the legends on a real
  // DualSense cap. The transparent canvas leaves the model's cap material
  // and highlights untouched.
  ctx.strokeStyle = '#4b5563'
  ctx.lineWidth = 22
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  if (id === 'triangle') {
    ctx.moveTo(128, 39)
    ctx.lineTo(49, 190)
    ctx.lineTo(207, 190)
    ctx.closePath()
  } else if (id === 'circle') {
    ctx.arc(128, 128, 83, 0, Math.PI * 2)
  } else if (id === 'square') {
    ctx.rect(49, 49, 158, 158)
  } else {
    ctx.moveTo(66, 66)
    ctx.lineTo(190, 190)
    ctx.moveTo(190, 66)
    ctx.lineTo(66, 190)
  }
  ctx.stroke()

  const texture = new THREE.CanvasTexture(artwork)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  const symbol = new THREE.Mesh(
    new THREE.PlaneGeometry(radius * 1.52, radius * 1.52),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.015,
      depthTest: true,
      depthWrite: false,
      side: THREE.FrontSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -2,
      toneMapped: false,
    }),
  )
  symbol.position.set(center.x, center.y, localBounds.max.z + Math.max(0.00035, radius * 0.008))
  symbol.name = `face-button-symbol-${id}`
  symbol.renderOrder = 2
  symbol.frustumCulled = false
  symbol.castShadow = false
  symbol.receiveShadow = false
  group.add(symbol)
  return symbol
}

// The source model is credited in MODEL-CREDITS.md. It is loaded only for the
// visual controller; all interaction state and hit targets remain in React.
const MODEL_URL = 'https://raw.githubusercontent.com/SafaElmali/dualsense-studio/main/controller/dualsense.glb'
export default function ThreeController({ active, pressed, stickOffsets, triggerPressure, onReady, onError, onLayout }) {
  const canvasRef = useRef(null)
  const interactionRef = useRef({ active, pressed, stickOffsets, triggerPressure })
  const callbacksRef = useRef({ onReady, onError, onLayout })

  useEffect(() => {
    callbacksRef.current = { onReady, onError, onLayout }
  }, [onReady, onError, onLayout])

  useEffect(() => {
    interactionRef.current = { active, pressed, stickOffsets, triggerPressure }
  }, [active, pressed, stickOffsets, triggerPressure])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    let disposed = false
    let frame = 0
    let previousTime = 0
    let lastRenderTime = 0
    let renderInterval = 1000 / 45
    let pixelRatioCap = 1.5
    let lowPowerDevice = false
    let lastWidth = 0
    let lastHeight = 0
    let readyAfterFirstRender = false
    let lastReportedLayout = null
    let renderer
    let environmentTarget
    let resizeObserver
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(29, 1, 0.1, 100)
    const model = new THREE.Group()
    const controls = new Map()
    const pose = { x: 0.08, y: -0.12, z: -0.018 }
    let dragState = null
    const container = canvas.parentElement
    const hitpad = container?.querySelector('.controller-hitpad')
    scene.add(model)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reportLayout = () => {
      if (!controls.size || camera.position.z <= 0) return
      model.updateMatrixWorld(true)
      camera.updateMatrixWorld(true)
      const layout = {}
      for (const [id, group] of controls) {
        const point = model.localToWorld(group.position.clone()).project(camera)
        const key = id === 'left-stick' ? 'l3' : id === 'right-stick' ? 'r3' : id
        layout[key] = {
          left: ((point.x + 1) / 2) * 100,
          top: ((1 - point.y) / 2) * 100,
        }
      }
      const changed = !lastReportedLayout || Object.keys(layout).some((key) => {
        const previous = lastReportedLayout[key]
        return !previous || Math.abs(previous.left - layout[key].left) > 0.12 || Math.abs(previous.top - layout[key].top) > 0.12
      })
      if (changed) {
        lastReportedLayout = layout
        callbacksRef.current.onLayout?.(layout)
      }
    }
    const setSize = () => {
      if (!renderer || disposed) return
      const bounds = canvas.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return
      const pixelRatio = Math.min(window.devicePixelRatio || 1, pixelRatioCap)
      if (Math.abs(renderer.getPixelRatio() - pixelRatio) > 0.01) renderer.setPixelRatio(pixelRatio)
      if (Math.abs(lastWidth - bounds.width) > 0.5 || Math.abs(lastHeight - bounds.height) > 0.5) {
        lastWidth = bounds.width
        lastHeight = bounds.height
        renderer.setSize(bounds.width, bounds.height, false)
        camera.aspect = bounds.width / bounds.height
        camera.updateProjectionMatrix()
        reportLayout()
      }
    }

    try {
      // Choose a conservative rendering profile from real device capabilities.
      // This keeps the controller usable on integrated graphics and phones rather
      // than forcing a desktop-quality render target on every device.
      const memory = navigator.deviceMemory || 4
      const cores = navigator.hardwareConcurrency || 4
      const compactScreen = window.matchMedia('(max-width: 760px)').matches
      lowPowerDevice = memory <= 4 || cores <= 4 || compactScreen
      pixelRatioCap = lowPowerDevice ? 1.35 : 1.9
      renderInterval = 1000 / (lowPowerDevice ? 45 : 60)
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        precision: 'highp',
        stencil: false,
        depth: true,
        preserveDrawingBuffer: false,
      })
      renderer.setClearColor(0x000000, 0)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.04
      // The product stage uses a soft contact shadow; disabling a large live shadow map
      // avoids GPU spikes and shadow-map shimmer on integrated/mobile graphics.
      renderer.shadowMap.enabled = false
      renderer.info.autoReset = true
    } catch (error) {
      callbacksRef.current.onError?.(error)
      return undefined
    }

    scene.add(new THREE.HemisphereLight(0xf4f6ff, 0x343946, 1.05))
    const key = new THREE.DirectionalLight(0xfff7ec, 3.1)
    key.position.set(-3.5, 5.5, 6)
    key.castShadow = false
    scene.add(key)
    const fill = new THREE.DirectionalLight(0xd6e4ff, 1.25)
    fill.position.set(4, 1.5, 5)
    scene.add(fill)
    const rim = new THREE.DirectionalLight(0xe1e9ff, 2.2)
    rim.position.set(0, 3.5, -5)
    scene.add(rim)

    environmentTarget = createStudioEnvironment(renderer, lowPowerDevice)
    if (environmentTarget) {
      scene.environment = environmentTarget.texture
      scene.environmentIntensity = 0.86
    }

    const handlePointerDown = (event) => {
      if (!hitpad || event.target !== hitpad || !canvas.dataset.ready) return
      dragState = { id: event.pointerId, x: event.clientX, y: event.clientY }
      hitpad.setPointerCapture(event.pointerId)
      container.classList.add('controller-dragging')
    }
    const handlePointerMove = (event) => {
      if (!dragState || dragState.id !== event.pointerId) return
      const dx = event.clientX - dragState.x
      const dy = event.clientY - dragState.y
      dragState.x = event.clientX
      dragState.y = event.clientY
      pose.y += dx * 0.008
      pose.x = THREE.MathUtils.clamp(pose.x + dy * 0.006, -0.5, 0.72)
      model.rotation.set(pose.x, pose.y, pose.z)
      reportLayout()
    }
    const handlePointerUp = (event) => {
      if (!dragState || dragState.id !== event.pointerId) return
      dragState = null
      container.classList.remove('controller-dragging')
    }
    container?.addEventListener('pointerdown', handlePointerDown)
    container?.addEventListener('pointermove', handlePointerMove)
    container?.addEventListener('pointerup', handlePointerUp)
    container?.addEventListener('pointercancel', handlePointerUp)

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
        // Preserve the licensed GLB's authored PBR materials and texture maps.
        // The original material setup is more faithful than forcibly changing
        // roughness/metalness or converting every surface to a new material.
        const cloneMaterial = (source) => {
          const material = source.clone()
          const maxAnisotropy = Math.min(lowPowerDevice ? 8 : 16, renderer.capabilities.getMaxAnisotropy())
          // Keep data maps linear, mark only visible colour maps as sRGB, and
          // improve texture sampling on fine button legends and shell grain.
          for (const key of ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap', 'alphaMap', 'bumpMap', 'displacementMap']) {
            const texture = material[key]
            if (!texture) continue
            texture.anisotropy = maxAnisotropy
            if (key === 'map' || key === 'emissiveMap') texture.colorSpace = THREE.SRGBColorSpace
          }
          if (material.emissive) {
            material.userData.baseEmissive = material.emissive.clone()
            material.userData.baseEmissiveIntensity = material.emissiveIntensity || 0
          }
          return material
        }
        const materials = Array.isArray(object.material)
          ? object.material.map(cloneMaterial)
          : cloneMaterial(object.material)

        const mesh = new THREE.Mesh(geometry, materials)
        mesh.name = object.name
        mesh.userData = { ...object.userData }
        mesh.castShadow = false
        mesh.receiveShadow = false
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

      // The four PlayStation action buttons use the real white-cap / grey-glyph
      // treatment. These details are attached to their moving mesh groups.
      for (const id of ['triangle', 'circle', 'cross', 'square']) {
        const group = controls.get(id)
        if (group) addFaceButtonDetails(group, id, renderer)
      }

      const bounds = new THREE.Box3().setFromObject(model)
      const center = bounds.getCenter(new THREE.Vector3())
      const size = bounds.getSize(new THREE.Vector3())
      model.position.sub(center)
      model.rotation.set(pose.x, pose.y, pose.z)

      const verticalFit = size.y / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 0.82)
      const horizontalFit = size.x / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 1.55 * 0.88)
      camera.position.set(0, 0, Math.max(verticalFit, horizontalFit, 3.5) * 1.035)
      camera.lookAt(0, 0, 0)

      setSize()
      canvas.dataset.ready = 'true'
      readyAfterFirstRender = true
    }, undefined, (error) => {
      if (!disposed) callbacksRef.current.onError?.(error)
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
      // A real controller on a product stage should remain still at rest.
      // Only direct pointer dragging changes its pose; this avoids toy-like
      // floating/swaying motion and frame-rate variations reading as flicker.
      if (!dragState) {
        model.position.y += (0 - model.position.y) * blend
        model.rotation.x += (pose.x - model.rotation.x) * blend
        model.rotation.y += (pose.y - model.rotation.y) * blend
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
      if (time - lastRenderTime < renderInterval) return
      lastRenderTime = time
      renderer.render(scene, camera)
      if (readyAfterFirstRender) {
        readyAfterFirstRender = false
        callbacksRef.current.onReady?.()
      }
    }
    frame = window.requestAnimationFrame(animate)

    const handleContextLost = (event) => {
      event.preventDefault()
      canvas.dataset.ready = 'false'
      callbacksRef.current.onError?.(new Error('Graphics context was interrupted; showing the accessible controller fallback.'))
    }
    const handleContextRestored = () => {
      if (disposed) return
      canvas.dataset.ready = 'true'
      readyAfterFirstRender = true
      lastRenderTime = 0
    }
    canvas.addEventListener('webglcontextlost', handleContextLost)
    canvas.addEventListener('webglcontextrestored', handleContextRestored)

    return () => {
      disposed = true
      window.cancelAnimationFrame(frame)
      resizeObserver?.disconnect()
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      canvas.removeEventListener('webglcontextrestored', handleContextRestored)
      container?.removeEventListener('pointerdown', handlePointerDown)
      container?.removeEventListener('pointermove', handlePointerMove)
      container?.removeEventListener('pointerup', handlePointerUp)
      container?.removeEventListener('pointercancel', handlePointerUp)
      container?.classList.remove('controller-dragging')
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
  }, [])

  return <canvas ref={canvasRef} className="controller-3d-canvas" aria-hidden="true" />
}
