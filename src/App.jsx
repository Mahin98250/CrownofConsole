import { useEffect, useState } from 'react'
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, CalendarDays,
  Check, ChevronDown, Crown, Gamepad2, MapPin, Menu, MessageCircle, Monitor,
  Phone, Search, Users, X, Zap, Clock3, Instagram
} from 'lucide-react'

const PHONE = '918799508567'
const PHONE_DISPLAY = '+91 87995 08567'
const ADDRESS = 'FF/1, Shakti Arcade, Above Kutchi King, Near ICICI Bank, Science City Road, Ahmedabad'
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ADDRESS)
const MAP_EMBED_URL = 'https://www.google.com/maps?q=' + encodeURIComponent(ADDRESS) + '&output=embed'
const WA = (message) => 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(message)
const TODAY = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)

const ANALYTICS_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''
function loadAnalytics() {
  if (!ANALYTICS_ID || window.__cocAnalyticsLoaded) return
  window.__cocAnalyticsLoaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function(){ window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', ANALYTICS_ID, { anonymize_ip: true, send_page_view: false })
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ANALYTICS_ID)
  document.head.appendChild(script)
}
function trackEvent(name, params = {}) {
  try {
    if (window.localStorage.getItem('coc-analytics-consent') === 'yes' && typeof window.gtag === 'function') {
      window.gtag('event', name, params)
    }
  } catch {
    // Analytics must never interrupt the customer journey when storage is unavailable.
  }
}
const PHOTO = {
  hero: 'https://images.unsplash.com/photo-1715279240000-9a50953e327d?auto=format&fit=crop&w=1800&q=88',
  room: 'https://images.unsplash.com/photo-1792635926439-4f19b4d311e0?auto=format&fit=crop&w=1400&q=85',
  desk: 'https://images.unsplash.com/photo-1632603093711-0d93a0bcc6cc?auto=format&fit=crop&w=1400&q=85'
}

const GAME_GALLERY = [
  { title: 'EA SPORTS FC 27', category: '01 / FOOTBALL', genre: 'SPORTS', short: 'FC 27', src: 'https://d.techtimes.com/en/full/469882/sports-fc.png', alt: 'EA SPORTS FC 27 football match gameplay', wide: true },
  { title: 'GRAND THEFT AUTO V', category: '02 / OPEN WORLD', genre: 'OPEN WORLD', short: 'GTA V', src: 'https://cdn.mos.cms.futurecdn.net/AQw34cg4TbtrUEA6MJ9a3d.jpg', alt: 'Grand Theft Auto V open-world gameplay' },
  { title: 'EA SPORTS FC 26', category: '03 / FOOTBALL', genre: 'SPORTS', short: 'FC 26', src: 'https://www.maniac.de/wp-content/uploads/2025/10/ea-sports-fc-26-TEST.jpg', alt: 'EA SPORTS FC 26 football gameplay' },
  { title: 'GRAN TURISMO 7', category: '04 / RACING', genre: 'RACING', short: 'GT 7', src: 'https://www.xtgamer.net/wp-content/uploads/granturismo7-08-scaled.jpg', alt: 'Gran Turismo 7 racing gameplay' },
  { title: 'NBA 2K26', category: '05 / BASKETBALL', genre: 'SPORTS', short: '2K26', src: 'https://image.api.playstation.com/vulcan/ap/rnd/202507/0209/830e75bc7c63c3f7dd329643ddaf97ce386b9fe0cda8ba5d.jpg?format=jpg&h=810&w=1440', alt: 'NBA 2K26 basketball gameplay' },
  { title: 'CALL OF DUTY: BLACK OPS 7', category: '06 / ACTION', genre: 'ACTION', short: 'BLACK OPS 7', src: 'https://cdn.mos.cms.futurecdn.net/ERWHrJnW3xSK8Zwiw7o3jX.jpg', alt: 'Call of Duty Black Ops 7 action gameplay', wide: true },
  { title: "MARVEL'S SPIDER-MAN 2", category: '07 / ADVENTURE', genre: 'ADVENTURE', short: 'SPIDER-MAN 2', src: 'https://assetsio.gnwcdn.com/spider-man-2-hunters.jpg?auto=webp&fit=bounds&format=jpg&height=2048&quality=85&width=2048', alt: "Marvel's Spider-Man 2 gameplay" },
  { title: 'IT TAKES TWO', category: '08 / CO-OP', genre: 'CO-OP', short: 'IT TAKES TWO', src: 'https://cdn.staticneo.com/ew/2/20/IT2_CH1-BitingDust-Boss2.jpg', alt: 'It Takes Two cooperative gameplay' },
  { title: 'MINECRAFT', category: '09 / CREATIVE', genre: 'CREATIVE', short: 'MINECRAFT', src: 'https://gamebeatz.com/cdn/shop/files/video_games-playstation_5-Minecraft-_4.jpg?v=1746444551&width=1200', alt: 'Minecraft gameplay', wide: true }
]

const NAV = [
  ['home', 'Home'],
  ['space', 'The space'],
  ['games', 'Games'],
  ['experiences', 'Experiences'],
  ['visit', 'Plan a visit'],
  ['contact', 'Contact']
]

function routeFromHash() {
  const route = window.location.hash.replace(/^#\/?/, '').split('/')[0]
  return !route ? 'home' : NAV.some(([path]) => path === route) ? route : 'not-found'
}

function Eyebrow({ children, light = false }) {
  return <span className={light ? 'eyebrow eyebrow-light' : 'eyebrow'}><i />{children}</span>
}

function ActionLink({ href, children, light = false, external = false }) {
  return <a className={light ? 'action-link action-link-light' : 'action-link'} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{children}<ArrowUpRight size={16} /></a>
}

function Header({ route }) {
 const [open,setOpen]=useState(false)
 useEffect(()=>setOpen(false),[route])
 return <>
  <div className="utility-bar art-utility"><span>THE CROWN OF CONSOLE <b>✳</b> AHMEDABAD</span><a href="tel:+918799508567"><Phone size={12}/> {PHONE_DISPLAY}</a></div>
  <header className="site-header art-header">
   <a className="brand-mark" href="#/home" aria-label="The Crown Of Console home"><span className="brand-seal" aria-hidden="true"><Crown size={18} strokeWidth={1.8}/></span><span className="brand-name">THE CROWN<br/><b>OF CONSOLE</b></span></a>
   <button className="nav-toggle art-nav-toggle" type="button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
   <nav className={open?'main-nav art-main-nav nav-open':'main-nav art-main-nav'} aria-label="Main navigation">
    {NAV.map(([path,label],i)=><a key={path} href={'#/'+path} className={route===path?'nav-active':''} aria-current={route===path?'page':undefined}><span>0{i+1}</span>{label}</a>)}
    <a className="nav-cta art-nav-cta" href="#/visit">LET'S PLAY <ArrowUpRight size={16}/></a>
   </nav>
  </header>
 </>
}

function PageTop({ number, kicker, title, italic, intro, dark = false }) {
  return <section className={dark ? 'page-top page-top-dark' : 'page-top'}>
    <div className="page-top-meta"><span>{number} / THE CROWN OF CONSOLE</span><span>{kicker}</span></div>
    <div className="page-top-grid">
      <h1>{title}<br /><em>{italic}</em></h1>
      <p>{intro}</p>
    </div>
  </section>
}

function PlayerSelector() {
  const [player,setPlayer]=useState('crew')
  const options=[
    {id:'solo',n:'01',title:'SOLO MODE',sub:'Your own pace.',message:'I am interested in a solo gaming visit. Could you share the current options, rates and timings?'},
    {id:'rivals',n:'02',title:'RIVAL MODE',sub:'Friendly competition.',message:'I would like to ask about a competitive or head-to-head gaming visit. What options are currently available?'},
    {id:'crew',n:'03',title:'CREW MODE',sub:'Bring your people.',message:'I am planning a group gaming visit. Could you share current options, rates and availability?'}
  ]
  const active=options.find(x=>x.id===player)||options[2]
  return <section className="player-lab" id="player-lab" data-reveal>
    <div className="lab-heading"><span className="section-kicker">04 / YOUR PLAY STYLE</span><span className="lab-sticker">PICK A SIDE ✳</span><h2>WHO'S<br/><em>PLAYING?</em></h2><p>Every good session starts with a plan. Choose your mode and send the team a message to check what's possible.</p></div>
    <div className="player-console"><div className="console-top"><span>PLAYER SELECT</span><span>CHOOSE 01 — 03</span></div>
      <div className="player-options">{options.map(x=><button type="button" key={x.id} onClick={()=>setPlayer(x.id)} className={player===x.id?'player-option player-option-active':'player-option'} aria-pressed={player===x.id}><span className="player-number">{x.n}</span><span className="player-option-text"><b>{x.title}</b><small>{x.sub}</small></span><span className="player-check">{player===x.id?'✳':'+'}</span></button>)}</div>
      <div className="player-confirm"><div><small>YOUR SELECTED MODE</small><strong>{active.title}</strong></div><a href={WA('Hello, The Crown Of Console! '+active.message)} target="_blank" rel="noreferrer">LET'S TALK <ArrowUpRight size={17}/></a></div><span className="console-scribble" aria-hidden="true">GG!</span>
    </div>
  </section>
}
function DualSenseMotion() {
  return <div className="dualsense-motion" aria-hidden="true">
    <span className="dualsense-orbit dualsense-orbit-one" />
    <span className="dualsense-orbit dualsense-orbit-two" />
    <svg className="dualsense-controller" viewBox="0 0 360 220" role="presentation">
      <defs>
        <linearGradient id="controller-shell" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff"/><stop offset=".52" stopColor="#dfe3e8"/><stop offset="1" stopColor="#aeb6c2"/></linearGradient>
        <linearGradient id="controller-grip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4f6f9"/><stop offset="1" stopColor="#aab3c0"/></linearGradient>
        <linearGradient id="controller-light" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#39a6ff"/><stop offset=".5" stopColor="#b8dfff"/><stop offset="1" stopColor="#39a6ff"/></linearGradient>
      </defs>
      <path d="M104 49c-19 1-32 14-40 37L34 160c-8 22 7 37 26 29l61-30h118l61 30c19 8 34-7 26-29l-30-74c-8-23-21-36-40-37-36-2-51 10-76 10s-40-12-76-10Z" fill="url(#controller-shell)" stroke="#7e8998" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M67 112 43 165c-5 13 2 22 14 16l47-24-37-45Zm226 0 24 53c5 13-2 22-14 16l-47-24 37-45Z" fill="url(#controller-grip)" opacity=".8"/>
      <path d="M130 48c7-13 22-20 50-20s43 7 50 20l-10 28h-80Z" fill="#c8ced7" stroke="#929dab" strokeWidth="2"/>
      <rect x="145" y="43" width="70" height="36" rx="13" fill="#202630" stroke="#8994a3" strokeWidth="2"/>
      <path d="M157 53h46" stroke="#4d5867" strokeWidth="2" strokeLinecap="round"/>
      <path d="M93 100v48M69 124h48" stroke="#515c6a" strokeWidth="13" strokeLinecap="round"/>
      <path d="M93 100v48M69 124h48" stroke="#e9edf2" strokeWidth="8" strokeLinecap="round"/>
      <circle cx="259" cy="104" r="10" fill="#25303d"/><circle cx="283" cy="126" r="10" fill="#25303d"/><circle cx="235" cy="126" r="10" fill="#25303d"/><circle cx="259" cy="148" r="10" fill="#25303d"/>
      <circle cx="259" cy="104" r="4" fill="#4ea8ff"/><circle cx="283" cy="126" r="4" fill="#f36b7f"/><circle cx="235" cy="126" r="4" fill="#d8ff3e"/><circle cx="259" cy="148" r="4" fill="#a88aff"/>
      <circle cx="133" cy="160" r="21" fill="#8994a2"/><circle cx="133" cy="157" r="17" fill="#252d38" stroke="#cbd1da" strokeWidth="2"/>
      <circle cx="227" cy="160" r="21" fill="#8994a2"/><circle cx="227" cy="157" r="17" fill="#252d38" stroke="#cbd1da" strokeWidth="2"/>
      <path d="M174 103h12m-6-6v12" stroke="#566170" strokeWidth="2" strokeLinecap="round"/>
      <path d="M164 88c9-5 23-5 32 0" stroke="url(#controller-light)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M156 190c13 8 35 8 48 0" stroke="#7e8998" strokeWidth="2" fill="none" opacity=".6"/>
    </svg>
    <span className="dualsense-label"><i /> DUALSENSE / PLAY READY</span>
  </div>
}


function InteractiveController() {
  const controls = [
    { id: 'up', label: 'D-PAD UP', symbol: '↑', type: 'direction', message: 'Look up. Spot the next move before the competition does.' },
    { id: 'left', label: 'D-PAD LEFT', symbol: '←', type: 'direction', message: 'Change direction. A new route can change the whole match.' },
    { id: 'right', label: 'D-PAD RIGHT', symbol: '→', type: 'direction', message: 'Switch lanes. There is always another way to play.' },
    { id: 'down', label: 'D-PAD DOWN', symbol: '↓', type: 'direction', message: 'Reset your focus. The next round starts fresh.' },
    { id: 'triangle', label: 'TRIANGLE', symbol: '△', type: 'face', message: 'Think ahead. Make the clever play.' },
    { id: 'circle', label: 'CIRCLE', symbol: '○', type: 'face', message: 'Take the shot. Sometimes instinct wins.' },
    { id: 'cross', label: 'CROSS', symbol: '×', type: 'face', message: 'Press start. Your next gaming story begins here.' },
    { id: 'square', label: 'SQUARE', symbol: '□', type: 'face', message: 'Try something different. Discover a new favourite.' },
    { id: 'l1', label: 'LEFT SHOULDER · L1', symbol: 'L1', type: 'shoulder', message: 'Left shoulder. Keep your reactions quick and your timing sharp.' },
    { id: 'r1', label: 'RIGHT SHOULDER · R1', symbol: 'R1', type: 'shoulder', message: 'Right shoulder. A small press can make a big difference.' },
    { id: 'l2', label: 'LEFT TRIGGER · L2', symbol: 'L2', type: 'trigger', message: 'Left trigger. Ease into the move and control the pace.' },
    { id: 'r2', label: 'RIGHT TRIGGER · R2', symbol: 'R2', type: 'trigger', message: 'Right trigger. Commit to the moment when it counts.' },
    { id: 'l3', label: 'LEFT ANALOG STICK · L3', symbol: '●', type: 'stick', message: 'Left stick. Find your movement and take the lead.' },
    { id: 'r3', label: 'RIGHT ANALOG STICK · R3', symbol: '●', type: 'stick', message: 'Right stick. Adjust your view and keep your eyes on the game.' },
    { id: 'create', label: 'CREATE BUTTON', symbol: '≡', type: 'system', message: 'Create. Capture the moments worth keeping.' },
    { id: 'options', label: 'OPTIONS BUTTON', symbol: '☰', type: 'system', message: 'Options. Take a breath, then get back into the action.' },
    { id: 'touchpad', label: 'TOUCHPAD', symbol: '', type: 'touchpad', message: 'Touchpad. A little surface with plenty of possibilities.' },
    { id: 'ps', label: 'PLAYSTATION BUTTON', symbol: '✧', type: 'ps', message: 'The home button. Every great session starts somewhere.' }
  ]
  const [active, setActive] = useState('cross')
  const [soundEnabled, setSoundEnabled] = useState(false)
  const playClick = () => {
    if (!soundEnabled) return
    let context
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) return
      context = new AudioContextClass()
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      oscillator.type = 'triangle'
      oscillator.frequency.setValueAtTime(460, context.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(680, context.currentTime + 0.045)
      gain.gain.setValueAtTime(0.025, context.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.085)
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.start()
      oscillator.stop(context.currentTime + 0.09)
      oscillator.onended = () => context.close()
    } catch {
      try { context?.close() } catch { /* Audio is optional. */ }
    }
  }
  const selected = controls.find((control) => control.id === active) || controls[6]
  const selectControl = (id) => {
    setActive(id)
    playClick()
  }
  return <section className="controller-lab section-pad" data-reveal aria-labelledby="controller-lab-title">
    <div className="controller-lab-copy">
      <Eyebrow>03 / PRESS START</Eyebrow>
      <h2 id="controller-lab-title">TAKE<br/><em>CONTROL.</em></h2>
      <p>Explore the controls of a DualSense-inspired controller. Press any button or stick to feel the response and light change. Just for fun — no controller is connected.</p>
      <span className="controller-demo-note">A SMALL INTERACTIVE DEMO · BUILT INTO THIS PAGE</span>
    </div>
    <div className="controller-demo">
      <div className="controller-status">
        <span>DUALSENSE / INTERACTIVE DEMO</span>
        <div className="controller-status-actions">
          <strong aria-live="polite">{selected.label}</strong>
          <button type="button" className="sound-toggle" aria-pressed={soundEnabled} onClick={() => setSoundEnabled(!soundEnabled)}>{soundEnabled ? 'SOUND ON' : 'SOUND OFF'}</button>
        </div>
      </div>
      <div className="controller-visual">
        <svg className="controller-interactive-svg" viewBox="0 0 360 220" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="interactive-shell" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff"/><stop offset=".24" stopColor="#f1f3f6"/><stop offset=".62" stopColor="#d8dde5"/><stop offset="1" stopColor="#9ca7b5"/></linearGradient>
            <linearGradient id="interactive-grip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#edf0f4"/><stop offset="1" stopColor="#8e9aaa"/></linearGradient>
            <linearGradient id="interactive-touchpad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d6dce5"/><stop offset="1" stopColor="#aeb8c6"/></linearGradient>
            <linearGradient id="interactive-dark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3c4654"/><stop offset="1" stopColor="#111923"/></linearGradient>
            <radialGradient id="interactive-stick"><stop offset="0" stopColor="#536071"/><stop offset=".72" stopColor="#222c38"/><stop offset="1" stopColor="#0c1118"/></radialGradient>
            <pattern id="interactive-grip-grain" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1.3" cy="1.3" r=".55" fill="#6c7787" opacity=".38"/></pattern>
          </defs>
          <ellipse cx="180" cy="185" rx="137" ry="20" fill="#000000" opacity=".2"/>
          <path d="M104 39c-20 1-34 15-42 39L34 158c-8 23 7 38 27 30l60-27h118l60 27c20 8 35-7 27-30l-28-80c-8-24-22-38-42-39-36-2-51 10-76 10s-40-12-76-10Z" fill="url(#interactive-shell)" stroke="#7f8997" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M69 108 43 163c-5 13 2 22 14 16l45-22-33-49Zm222 0 26 55c5 13-2 22-14 16l-45-22 33-49Z" fill="url(#interactive-grip)" opacity=".88"/>
          <path d="M69 111 45 164l57-8-33-45Zm222 0 24 53-57-8 33-45Z" fill="url(#interactive-grip-grain)" opacity=".8"/>
          <path d="M58 83c6-20 15-31 29-34l21-3-3 27-27 38-20-28Zm244 0c-6-20-15-31-29-34l-21-3 3 27 27 38 20-28Z" fill="#aeb8c6" stroke="#828d9b" strokeWidth="1.5"/>
          <path d="M85 45h44l7 24H82c-7 0-10-4-8-10l3-8c1-4 4-6 8-6Zm190 0h-44l-7 24h54c7 0 10-4 8-10l-3-8c-1-4-4-6-8-6Z" fill="url(#interactive-dark)" stroke="#7e8998" strokeWidth="1.5"/>
          <path d="M85 49h42M233 49h42" stroke="#aeb9c8" strokeWidth="1.5" opacity=".7" strokeLinecap="round"/>
          <path d="M110 35c8-12 28-17 70-17s62 5 70 17l-7 23H117Z" fill="#c5cdd8" stroke="#919baa" strokeWidth="1.5"/>
          <path d="M145 37h70l-4 42h-62Z" fill="url(#interactive-touchpad)" stroke="#929eae" strokeWidth="1.6"/>
          <path d="M151 42h58M151 73h58" stroke="#ffffff" strokeWidth="1" opacity=".45"/>
          <path d="M157 46v25M203 46v25" stroke="#8f9aaa" strokeWidth=".6" opacity=".35"/>
          <path d="M158 87h44" stroke="#7b8797" strokeWidth="1.2" strokeLinecap="round" opacity=".55"/>
          <rect x="166" y="91" width="28" height="5" rx="2.5" fill="#a5afbd"/>
          <g fill="url(#interactive-dark)" stroke="#667282" strokeWidth="1">
            <rect x="143" y="101" width="15" height="9" rx="3"/>
            <rect x="202" y="101" width="15" height="9" rx="3"/>
          </g>
          <path d="M174 119h12" stroke="#647080" strokeWidth="1.5" strokeLinecap="round"/>
          <g fill="url(#interactive-dark)" stroke="#8c98a8" strokeWidth="1.5">
            <circle cx="133" cy="157" r="23"/>
            <circle cx="227" cy="157" r="23"/>
          </g>
          <g fill="url(#interactive-stick)" stroke="#0c1118" strokeWidth="1">
            <circle cx="133" cy="157" r="17"/>
            <circle cx="227" cy="157" r="17"/>
          </g>
          <g fill="none" stroke="#657183" strokeWidth=".7" opacity=".8">
            <circle cx="133" cy="157" r="13"/><circle cx="227" cy="157" r="13"/>
            <path d="M133 143v4m0 20v4m-14-14h4m20 0h4m66-14v4m0 20v4m-14-14h4m20 0h4"/>
          </g>
          <path d="M93 100v48M69 124h48" stroke="#5d6878" strokeWidth="17" strokeLinecap="round"/>
          <path d="M93 100v48M69 124h48" stroke="#dce1e8" strokeWidth="11" strokeLinecap="round"/>
          <path d="M93 102v44M71 124h44" stroke="#f9fafb" strokeWidth="1.1" opacity=".7" strokeLinecap="round"/>
          <g fill="url(#interactive-dark)" stroke="#7a8798" strokeWidth="1.4">
            <circle cx="259" cy="104" r="11.5"/><circle cx="283" cy="126" r="11.5"/>
            <circle cx="235" cy="126" r="11.5"/><circle cx="259" cy="148" r="11.5"/>
          </g>
          <g fill="none" stroke="#96a2b2" strokeWidth=".7" opacity=".7">
            <circle cx="259" cy="104" r="8.5"/><circle cx="283" cy="126" r="8.5"/>
            <circle cx="235" cy="126" r="8.5"/><circle cx="259" cy="148" r="8.5"/>
          </g>
          <path d="M171 130h18" stroke="#7d8999" strokeWidth="1" opacity=".45"/>
          <path d="M172 136h16m-12 4h8m-8 4h8" stroke="#697586" strokeWidth="1" strokeLinecap="round" opacity=".7"/>
          <circle cx="180" cy="159" r="5.5" fill="url(#interactive-dark)" stroke="#8793a3" strokeWidth="1"/>
          <path d="M175 177h10" stroke="#8994a3" strokeWidth="1.1" strokeLinecap="round"/>
          <path d="M119 27c13-7 29-9 61-9s48 2 61 9" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity=".7"/>
        </svg>
        <div className="controller-hitpad" role="group" aria-label="Interactive controller buttons">
          {controls.map((control) => <button
            key={control.id}
            type="button"
            className={'controller-hit controller-hit-' + control.id + ' controller-hit-' + control.type + (active === control.id ? ' controller-hit-active' : '')}
            onClick={() => selectControl(control.id)}
            onContextMenu={(event) => event.preventDefault()}
            aria-label={'Press ' + control.label}
            aria-pressed={active === control.id}
            draggable="false"
          >{control.symbol}</button>)}
        </div>
        <span className={'controller-lightbar controller-lightbar-' + active} aria-hidden="true"/>
      </div>
      <div className="controller-feedback" aria-live="polite">
        <span>YOUR MOVE</span>
        <p>{selected.message}</p>
        <small>NO HARDWARE CONNECTED · JUST A WEB INTERACTION</small>
      </div>
    </div>
  </section>
}
function HomePage() {
 return <main id="main-content" tabIndex="-1" className="home-page art-playground">
  <section className="art-hero">
   <div className="art-hero-top"><span>THE CROWN OF CONSOLE <i>✳</i> AHMEDABAD</span><span>INDEPENDENT PLAY CLUB / EST. AHMEDABAD</span></div>
   <div className="art-hero-stage"><div className="hero-shape hero-shape-orange"/><div className="hero-shape hero-shape-blue"/>
    <div className="hero-type-art"><span className="hero-eyebrow-art">PLAYSTATION GAMING CAFÉ · AHMEDABAD</span><h1>PLAY<br/><em>OUTSIDE</em><br/>THE <span>LINES.</span></h1><p>The Crown Of Console is a PlayStation gaming café in Ahmedabad — bring your friends for head-to-head matches, co-op adventures and multiplayer gaming.</p><a className="art-pill-link" href="#player-lab">FIND YOUR PLAY STYLE <ArrowDownRight size={17}/></a></div>
    <div className="hero-art-collage"><div className="collage-photo"><img src={PHOTO.hero} alt="Illustrative gaming lounge photograph, not the actual venue" fetchPriority="high"/><span>VISUAL REFERENCE · NOT THE ACTUAL VENUE</span></div><div className="collage-sticker collage-sticker-yellow">NO<br/>PAUSE<br/>BUTTON</div><div className="collage-sticker collage-sticker-blue">LET'S<br/>PLAY!</div><div className="collage-caption"><b>01</b><span>THE GOOD STUFF<br/>HAPPENS TOGETHER</span></div><DualSenseMotion /></div>
    <div className="hero-side-index">SCROLL TO GET IN <span>↓</span></div>
   </div>
   <div className="hero-bottom-art"><span>NOT JUST A PLACE TO PLAY.</span><span>A PLACE TO MAKE A MOMENT.</span><span>SCIENCE CITY ROAD, AHMEDABAD ↗</span></div>
  </section>
  <section className="manifesto-art" data-reveal><div className="art-section-meta"><span>01 / THE HOUSE RULES</span><span>GOOD ENERGY ONLY (THE REST IS UP TO YOU)</span></div><div className="manifesto-art-grid"><h2>LESS<br/>SCROLL.<br/><em>MORE</em><br/>SCORE.</h2><div className="manifesto-art-note"><span className="asterisk-doodle">✳</span><p>Some nights are made for getting out, catching up and finding out who really has the better game. That's the feeling behind The Crown Of Console.</p><span className="handwritten-note">bring your people ↗</span></div></div><div className="manifesto-art-bottom"><span>GOOD GAMES</span><b>+</b><span>GREAT COMPANY</span><b>=</b><span>ONE MORE ROUND</span></div></section>
  <section className="visual-interlude" data-reveal><div className="interlude-image"><img src={PHOTO.room} alt="Illustrative gaming lounge photograph, not the actual venue" loading="lazy"/><span>REFERENCE IMAGE · NOT THE ACTUAL VENUE</span><b>MAKE<br/>A SCENE.</b></div><div className="interlude-copy"><span className="section-kicker">02 / THE ATMOSPHERE</span><h2>GOOD TIMES.<br/><em>NO SCRIPT.</em></h2><p>Come with a plan or make one when you get here. Explore the space and ask the team about the current setup, games and rates.</p><a href="#/space" className="art-text-link">TAKE A LOOK AROUND <ArrowUpRight size={18}/></a><span className="interlude-doodle" aria-hidden="true">✳</span></div></section>
  <InteractiveController />
  <PlayerSelector/>
  <ShareTheCrown/>
  <section className="art-directory" data-reveal><div className="art-section-meta"><span>05 / OPEN THE DOORS</span><span>TAKE YOUR PICK</span></div><div className="directory-heading"><h2>WHERE TO<br/><em>FROM HERE?</em></h2><span>THERE'S MORE THAN ONE WAY TO PLAY.</span></div><div className="directory-grid">
   <a href="#/games" className="directory-tile directory-games"><span>01 — THE LINEUP</span><b>GOT A<br/><em>GAME?</em></b><i>↗</i><small>ASK WHAT'S AVAILABLE</small></a>
   <a href="#/experiences" className="directory-tile directory-experiences"><span>02 — YOUR PEOPLE</span><b>MAKE IT<br/><em>A MATCH.</em></b><i>↗</i><small>EXPLORE EXPERIENCES</small></a>
   <a href="#/visit" className="directory-tile directory-visit"><span>03 — MAKE A PLAN</span><b>SEE YOU<br/><em>THERE.</em></b><i>↗</i><small>PLAN A VISIT</small></a>
  </div></section>
  <section className="art-location" data-reveal><div className="location-sunburst" aria-hidden="true">✳</div><span className="section-kicker">06 / THE PIN ON YOUR MAP</span><h2>GOOD TIMES<br/>LIVE <em>HERE.</em></h2><div className="art-location-bottom"><p>FF/1, Shakti Arcade, Above Kutchi King, Near ICICI Bank, Science City Road, Ahmedabad.</p><div><a href="#/contact" className="art-location-button">FIND THE PLACE <ArrowUpRight size={18}/></a><a href="tel:+918799508567" className="art-phone">+91 87995 08567</a></div></div><div className="location-bottom-meta"><span>THE CROWN OF CONSOLE</span><span>AHMEDABAD, INDIA · COME PLAY</span></div></section>
 </main>
}

function Lightbox({ images, active, setActive }) {
  useEffect(() => {
    if (active === null) return
    const key = (event) => {
      if (event.key === 'Escape') setActive(null)
      if (event.key === 'ArrowRight') setActive((active + 1) % images.length)
      if (event.key === 'ArrowLeft') setActive((active + images.length - 1) % images.length)
    }
    document.addEventListener('keydown', key)
    document.body.classList.add('modal-open')
    return () => { document.removeEventListener('keydown', key); document.body.classList.remove('modal-open') }
  }, [active, images.length, setActive])
  if (active === null) return null
  return <div className="photo-modal" role="dialog" aria-modal="true" aria-label="Photo gallery" onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null) }}>
    <button className="modal-close" onClick={() => setActive(null)} aria-label="Close gallery"><X /></button>
    <button className="modal-arrow" onClick={() => setActive((active + images.length - 1) % images.length)} aria-label="Previous photo"><ArrowLeft /></button>
    <figure><img src={images[active].src} alt={images[active].alt} /><figcaption>{images[active].caption} · Reference photography</figcaption></figure>
    <button className="modal-arrow" onClick={() => setActive((active + 1) % images.length)} aria-label="Next photo"><ArrowRight /></button>
  </div>
}

function SpacePage() {
  const [active, setActive] = useState(null)
  const images = [
    { src: PHOTO.hero, alt: 'Illustrative gaming lounge scene', caption: 'The gaming atmosphere' },
    { src: PHOTO.room, alt: 'Illustrative gaming room', caption: 'A place to settle in' },
    { src: PHOTO.desk, alt: 'Illustrative gaming desk setup', caption: 'The setup' }
  ]
  return <main id="main-content" tabIndex="-1" className="inner-page">
    <PageTop number="01" kicker="THE SPACE" title="A place to" italic="plug in." intro="A first look at the kind of gaming atmosphere we're aiming to share. The photographs on this page are temporary references, not pictures of the actual café." />
    <section className="space-story section-pad">
      <div className="story-number">01 <span>— THE IDEA</span></div>
      <div className="story-content"><h2>Come for the game.<br /><em>Stay for the moment.</em></h2><p>Whether you're planning ahead or just checking us out, start with the details that matter. Message the team for confirmed information about the current setup, rates and availability.</p><ActionLink href="#/visit">Ask about a visit</ActionLink></div>
    </section>
    <section className="gallery-page section-pad">
      <div className="section-index"><span>02 — VISUAL REFERENCES</span><span>SELECT A FRAME TO EXPAND</span></div>
      <div className="gallery-masonry">{images.map((item, index) => <button className={'gallery-tile gallery-tile-' + index} key={item.src} onClick={() => setActive(index)}><img src={item.src} alt={item.alt} loading="lazy" /><span><b>0{index + 1}</b>{item.caption}<ArrowUpRight size={17} /></span></button>)}</div>
      <p className="reference-note">All images shown here are illustrative references. They should be replaced with photographs of The Crown Of Console before being treated as a venue gallery.</p>
    </section>
    <section className="space-cta"><div><Eyebrow light>HAVE A QUESTION?</Eyebrow><h2>Get the details<br /><em>before you go.</em></h2></div><ActionLink href="#/contact" light>Contact the team</ActionLink></section>
    <Lightbox images={images} active={active} setActive={setActive} />
  </main>
}

function GameplayCard({ game, index }) {
  const [imageFailed, setImageFailed] = useState(false)
  return <article className={['gameplay-frame', game.wide ? 'gameplay-frame-wide' : '', imageFailed ? 'gameplay-frame-fallback' : ''].filter(Boolean).join(' ')}>
    {!imageFailed
      ? <img src={game.src} alt={game.alt} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" onError={() => setImageFailed(true)} />
      : <div className="gameplay-image-placeholder" aria-hidden="true"><span>{game.category}</span><b>{game.short}</b><small>IMAGE PREVIEW UNAVAILABLE</small></div>}
    <div className="gameplay-frame-shade"></div>
    <span className="gameplay-frame-index">{game.category}</span>
    <h3>{game.title}</h3>
  </article>
}

function GamesPage() {
  const [game, setGame] = useState('')
  const [kind, setKind] = useState('A specific game')
  const [sent, setSent] = useState(false)
  const [genre, setGenre] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const filteredGames = GAME_GALLERY.filter((item) => {
    const matchesGenre = genre === 'ALL' || item.genre === genre
    const query = searchTerm.trim().toLowerCase()
    const matchesSearch = !query || [item.title, item.short, item.category, item.genre].join(' ').toLowerCase().includes(query)
    return matchesGenre && matchesSearch
  })
  const submit = (event) => {
    event.preventDefault()
    const message = 'Hello! I would like to ask about game availability at The Crown Of Console.\nWhat I am looking for: ' + kind + '\nGame / details: ' + (game.trim() || 'Please share the current games and platforms available.') + '\nCould you also confirm current rates and timings?'
    trackEvent('game_enquiry', { enquiry_type: kind })
    window.open(WA(message), '_blank', 'noopener,noreferrer')
    setSent(true)
  }
  return <main id="main-content" tabIndex="-1" className="inner-page">
    <PageTop number="02" kicker="GAME DISCOVERY" title="What's on" italic="your list?" intro="Have a title in mind? Tell us what you're looking for and the café team can confirm whether it's currently available. We don't publish an unverified game catalogue." dark />
    <section className="game-showcase section-pad" aria-labelledby="popular-games-title">
      <div className="game-showcase-heading"><div><Eyebrow>POPULAR ON PLAYSTATION 5</Eyebrow><h2 id="popular-games-title">WHAT DO YOU<br/><em>WANT TO PLAY?</em></h2></div><p>Football, racing, open-world adventures and multiplayer favourites. These are popular PS5 titles you can ask our team about.</p></div>
      <div className="discovery-tools">
        <label className="game-search"><Search size={17}/><input type="search" aria-label="Search games" placeholder="Search a title or genre" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /><span>⌕</span></label>
        <div className="genre-filters" role="group" aria-label="Filter games by genre">
          {['ALL','SPORTS','OPEN WORLD','RACING','ACTION','ADVENTURE','CO-OP','CREATIVE'].map((item) => <button key={item} type="button" className={genre === item ? 'genre-filter genre-filter-active' : 'genre-filter'} aria-pressed={genre === item} onClick={() => setGenre(item)}>{item === 'ALL' ? 'ALL GAMES' : item}</button>)}
        </div>
        <div className="discovery-result-line"><span>CURATED GAME DISCOVERY</span><strong>{filteredGames.length} {filteredGames.length === 1 ? 'TITLE' : 'TITLES'}</strong></div>
      </div>
      {filteredGames.length
        ? <div className="gameplay-gallery">{filteredGames.map((item, index) => <GameplayCard key={item.title} game={item} index={index} />)}</div>
        : <div className="discovery-empty"><b>NO MATCH THIS ROUND.</b><p>Try another title or choose a different genre.</p><button type="button" onClick={() => { setSearchTerm(''); setGenre('ALL') }}>RESET DISCOVERY ↗</button></div>}
      <div className="game-showcase-foot"><p>Game availability at the café may vary. Ask us which titles are currently installed before visiting.</p><a href={WA('Hello! I would like to check which PS5 games are currently available at The Crown Of Console, including EA SPORTS FC 27, FC 26 and GTA V.')} target="_blank" rel="noreferrer">ASK ABOUT GAME AVAILABILITY <ArrowUpRight size={16}/></a></div>
    </section>
    <section className="games-intro section-pad">
      <div className="games-aside"><span>YOUR NEXT<br />PICK</span><Gamepad2 size={46} /><small>ENQUIRE DIRECTLY</small></div>
      <div className="games-form-wrap"><Eyebrow>LET'S CHECK AVAILABILITY</Eyebrow><h2>What do you<br /><em>want to play?</em></h2>
        <form className="enquiry-form" onSubmit={submit}>
          <fieldset className="game-intent-field"><legend>What are you in the mood for?</legend><div className="game-intents">
            {['A specific game','A multiplayer game','A particular console or platform',"What's currently available"].map((option, index) => <button type="button" key={option} className={kind === option ? 'game-intent game-intent-active' : 'game-intent'} aria-pressed={kind === option} onClick={() => { setKind(option); setSent(false) }}><span>0{index + 1}</span><b>{option}</b><i>{kind === option ? '✳' : '+'}</i></button>)}
          </div></fieldset>
          <label className="field"><span>Game title or details <small>OPTIONAL</small></span><input value={game} onChange={(event) => { setGame(event.target.value); setSent(false) }} placeholder="Type a game or describe what you're after" /></label>
          <button className="button button-dark" type="submit">Check with the team <MessageCircle size={16} /></button>
          <p className="form-hint">{sent ? 'WhatsApp has been opened with your enquiry. Send the message there to contact the team.' : 'This sends an enquiry only. Availability is confirmed by the café team.'}</p>
        </form>
      </div>
    </section>
    <section className="games-note section-pad"><span>GOOD TO KNOW</span><p>Game titles, platforms and session rates can change. Contact the team for the latest confirmed information before making your trip.</p></section>
  </main>
}

function ExperiencesPage() {
  const experiences = [
    { no: '01', icon: Monitor, title: 'A solo session', text: 'Coming on your own? Tell the team what you would like to play and ask about current rates and availability.', prompt: 'Hello! I am interested in a solo gaming visit. Could you share the current rates, timings and availability?' },
    { no: '02', icon: Zap, title: 'A little competition', text: 'Have a friendly match in mind? Ask the team which games and arrangements are currently possible.', prompt: 'Hello! I would like to ask about options for a competitive or head-to-head gaming visit. What is currently available?' },
    { no: '03', icon: Users, title: 'Bring your people', text: 'Planning with friends? Share your group size and preferred time so the team can confirm what can be arranged.', prompt: 'Hello! I am planning a group gaming visit. Could you confirm current options, rates and timings?' }
  ]
  return <main id="main-content" tabIndex="-1" className="inner-page">
    <PageTop number="03" kicker="WAYS TO PLAY" title="Pick your" italic="kind of play." intro="Every visit starts with a different plan. Choose the one closest to yours and ask the team for the latest details before heading out." />
    <section className="experience-list section-pad">{experiences.map(({ no, icon: Icon, title, text, prompt }) => <article className="experience-card" key={no}><span className="experience-no">{no}</span><div className="experience-icon"><Icon size={26} /></div><div className="experience-copy"><h2>{title}</h2><p>{text}</p></div><a href={WA(prompt)} target="_blank" rel="noreferrer" className="round-link" aria-label={'Enquire about ' + title}><ArrowUpRight /></a></article>)}</section>
    <section className="experience-bottom"><h2>Not sure yet?<br /><em>That's alright.</em></h2><p>Tell us what you're thinking and we'll help you figure out the details.</p><ActionLink href="#/contact" light>Talk to the team</ActionLink></section>
  </main>
}

function VisitPage() {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('Evening')
  const [players, setPlayers] = useState('2')
  const [details, setDetails] = useState('')
  const [sent, setSent] = useState(false)
  const submit = (event) => {
    event.preventDefault()
    const message = ['Hello, The Crown Of Console!', 'I would like to enquire about a gaming visit.', name.trim() ? 'Name: ' + name.trim() : '', date ? 'Preferred date: ' + date : '', 'Preferred time: ' + time, 'Number of players: ' + players, details.trim() ? 'Additional details: ' + details.trim() : '', 'Please share current rates and confirm availability. Thank you.'].filter(Boolean).join('\n')
    trackEvent('visit_enquiry', { player_count: players, preferred_time: time })
    window.open(WA(message), '_blank', 'noopener,noreferrer')
    setSent(true)
  }
  return <main id="main-content" tabIndex="-1" className="inner-page">
    <PageTop number="04" kicker="VISIT ENQUIRY" title="Let's plan" italic="your visit." intro="Share a few details with the team. This is a WhatsApp enquiry, not an instant booking or confirmed reservation." dark />
    <section className="visit-page-layout section-pad">
      <div className="visit-sidebar"><Eyebrow>BEFORE YOU SET OFF</Eyebrow><h2>One message<br /><em>before the game.</em></h2><p>Send your preferred date, time and group size. The team can reply with current rates and let you know what is available.</p>
        <ul className="check-list"><li><Check size={17} /> No online payment required</li><li><Check size={17} /> Enquiry goes to WhatsApp</li><li><Check size={17} /> Wait for confirmation before travelling</li></ul>
      </div>
      <form className="visit-form-page" onSubmit={submit}>
        <div className="form-title"><span>YOUR VISIT DETAILS</span><CalendarDays /></div>
        <label className="field"><span>Your name <small>OPTIONAL</small></span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" autoComplete="name" /></label>
        <div className="form-row"><label className="field"><span>Preferred date</span><input type="date" min={TODAY()} value={date} onChange={(event) => setDate(event.target.value)} /></label><label className="field"><span>Preferred time</span><select value={time} onChange={(event) => setTime(event.target.value)}><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Late evening</option></select></label></div>
        <label className="field"><span>Number of players</span><select value={players} onChange={(event) => setPlayers(event.target.value)}>{['1','2','3','4','5','6','7','8','9','10','10+'].map((n) => <option key={n}>{n}</option>)}</select></label>
        <label className="field"><span>Anything else? <small>OPTIONAL</small></span><textarea rows="4" value={details} onChange={(event) => setDetails(event.target.value)} placeholder="A game in mind, group details or a question..." /></label>
        <button className="button button-lime form-submit" type="submit">Continue on WhatsApp <ArrowUpRight size={17} /></button>
        <p className="form-hint">{sent ? 'Your enquiry draft is open in WhatsApp. Send it there to reach the team.' : 'Your visit is not booked until the team confirms it.'}</p>
      </form>
    </section>
  </main>
}

function ContactPage() {
  const faqs = [
    ['What are the current session rates?', 'Rates and packages can change. Message the team for the latest pricing before you visit.'],
    ['Which games and platforms are available?', 'The current game and equipment list has not been confirmed for this website. Tell the team what you have in mind and they can check.'],
    ['What are the opening hours?', 'Opening hours have not been verified for this page. Please contact the team before travelling to confirm current timings.'],
    ['Do I need to book before arriving?', 'Send an enquiry to check availability. Your visit is not confirmed until the team replies.']
  ]
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(ADDRESS); setCopied(true); window.setTimeout(() => setCopied(false), 1800) }
    catch { window.open(MAP_URL, '_blank', 'noopener,noreferrer') }
  }
  return <main id="main-content" tabIndex="-1" className="inner-page">
    <PageTop number="05" kicker="CONTACT & LOCATION" title="Find your" italic="way here." intro="We're on Science City Road, Ahmedabad. Check the map, copy the address or get in touch before you set off." />
    <section className="contact-layout section-pad">
      <div className="contact-details"><Eyebrow>THE CROWN OF CONSOLE</Eyebrow><h2>Come find<br /><em>the place.</em></h2>
        <div className="contact-detail"><MapPin /><div><b>VISIT US</b><span>FF/1, Shakti Arcade,<br />Above Kutchi King, Near ICICI Bank,<br />Science City Road, Ahmedabad</span></div></div>
        <div className="contact-detail"><Phone /><div><b>CALL THE TEAM</b><a href="tel:+918799508567">{PHONE_DISPLAY}</a></div></div>
        <div className="contact-buttons"><button className="button button-dark" type="button" onClick={copy}>{copied ? 'Address copied' : 'Copy address'} {copied ? <Check size={16} /> : <ArrowUpRight size={16} />}</button><a className="text-action" href={MAP_URL} target="_blank" rel="noreferrer">Open directions <ArrowUpRight size={16} /></a></div>
      </div>
      <div className="map-card"><iframe title="Map showing The Crown Of Console on Science City Road, Ahmedabad" src={MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a href={MAP_URL} target="_blank" rel="noreferrer">OPEN IN GOOGLE MAPS <ArrowUpRight size={14} /></a></div>
    </section>
    <section className="faq-area section-pad"><div className="faq-heading"><Eyebrow>THE USEFUL DETAILS</Eyebrow><h2>A few things<br /><em>you might ask.</em></h2><p>Need something else? Send the team a message.</p><ActionLink href={WA('Hello! I have a question about The Crown Of Console.')} external>Ask a question</ActionLink></div>
      <div className="faq-list">{faqs.map(([question, answer], i) => <details key={question} open={i === 0}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div>
    </section>
  </main>
}

function NotFound() {
  return <main id="main-content" tabIndex="-1" className="not-found"><span>404 / PAGE NOT FOUND</span><h1>This page<br /><em>isn't in the game.</em></h1><a className="button button-dark" href="#/home">Back to home <ArrowUpRight size={16} /></a></main>
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-main"><div className="footer-brand"><span className="brand-seal" aria-hidden="true"><Crown size={18} strokeWidth={1.8}/></span><div><b>THE CROWN OF CONSOLE</b><small>SCIENCE CITY ROAD · AHMEDABAD</small></div></div><div className="footer-cta"><span>READY WHEN YOU ARE.</span><a href="#/visit">Plan a visit <ArrowUpRight size={17} /></a></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} THE CROWN OF CONSOLE</span><div><a href="#/contact">CONTACT</a><a href="tel:+918799508567">CALL THE TEAM</a></div><a href="#/home">BACK TO TOP ↑</a></div>
  </footer>
}



function ShareTheCrown() {
  const [status, setStatus] = useState('')
  const share = async () => {
    const shareData = {
      title: 'The Crown Of Console',
      text: 'A PlayStation gaming café in Ahmedabad. Bring your friends for head-to-head matches, co-op adventures and multiplayer gaming.',
      url: window.location.href.split('#')[0] + '#/home'
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setStatus('Ready to share — thanks!')
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.text + ' ' + shareData.url)
        setStatus('Link and intro copied.')
      } else {
        window.open(WA(shareData.text + ' ' + shareData.url), '_blank', 'noopener,noreferrer')
        setStatus('Share message opened in WhatsApp.')
      }
    } catch (error) {
      if (error?.name !== 'AbortError') setStatus('Sharing is unavailable on this browser.')
    }
  }
  return <section className="share-the-crown" data-reveal>
    <div><span>PASS THE CONTROLLER</span><h2>GOOD GAMES<br/><em>TRAVEL FAST.</em></h2><p>Know someone who'd love a game night? Send them the Crown.</p></div>
    <button type="button" onClick={share}>SHARE THE CROWN <ArrowUpRight size={17}/></button>
    <small aria-live="polite">{status || 'ONE TAP TO SHARE THE WEBSITE'}</small>
  </section>
}

function AnalyticsConsent() {
  const [choice, setChoice] = useState(() => {
    try { return window.localStorage.getItem('coc-analytics-consent') || 'unset' } catch { return 'no' }
  })
  const choose = (value) => {
    try { window.localStorage.setItem('coc-analytics-consent', value) } catch {}
    setChoice(value)
  }
  useEffect(() => { if (choice === 'yes') loadAnalytics() }, [choice])
  if (!ANALYTICS_ID || choice !== 'unset') return null
  return <aside className="analytics-consent" aria-label="Analytics preferences">
    <div><b>HELP US MAKE THE SITE BETTER.</b><p>Optional website analytics help us understand which pages are useful. No analytics runs unless you agree.</p></div>
    <div className="analytics-consent-actions">
      <button type="button" onClick={() => choose('no')}>No thanks</button>
      <button type="button" onClick={() => choose('yes')}>Allow analytics</button>
    </div>
  </aside>
}



function QuickHelp() {
  const [open, setOpen] = useState(false)
  const [topic, setTopic] = useState('welcome')
  const answers = {
    welcome: ['Hey, welcome to The Crown Of Console!', 'We are a PlayStation gaming café on Science City Road, Ahmedabad. Bring your friends for head-to-head, co-op and multiplayer gaming.'],
    rates: ['How much does it cost?', 'Rates can change. Message the team on WhatsApp for current session prices and packages.'],
    games: ['Which games can I play?', 'The website shows popular titles to explore, not a live installed-games list. Ask the team to confirm a specific game before visiting.'],
    hours: ['When are you open?', 'Current opening hours have not been verified on this website. Please message or call before travelling.'],
    booking: ['Can I book online?', 'The visit form sends an enquiry only. Your visit is not booked until the team replies and confirms availability.'],
    location: ['Where are you located?', 'FF/1, Shakti Arcade, above Kutchi King, near ICICI Bank, Science City Road, Ahmedabad.']
  }
  const answer = answers[topic] || answers.welcome
  return <div className="quick-help">
    {open && <section className="quick-help-panel" aria-label="Quick help assistant">
      <div className="quick-help-head"><div><span>THE CROWN OF CONSOLE</span><b>QUICK HELP</b></div><button type="button" aria-label="Close quick help" onClick={() => setOpen(false)}><X size={17}/></button></div>
      <div className="quick-help-answer" aria-live="polite"><b>{answer[0]}</b><p>{answer[1]}</p></div>
      <div className="quick-help-topics">{[['welcome','Start here'],['rates','Rates'],['games','Games'],['hours','Opening hours'],['booking','Booking'],['location','Location']].map(([id,label]) => <button type="button" key={id} className={topic===id?'quick-help-topic active':'quick-help-topic'} aria-pressed={topic===id} onClick={() => setTopic(id)}>{label}</button>)}</div>
      <a href={WA('Hello! I have a question about The Crown Of Console.')} target="_blank" rel="noreferrer">ASK THE TEAM ON WHATSAPP <ArrowUpRight size={15}/></a>
      <small>QUICK ANSWERS · NOT A LIVE CHAT OR BOOKING SYSTEM</small>
    </section>}
    <button type="button" className="quick-help-trigger" aria-expanded={open} onClick={() => setOpen(!open)}><MessageCircle size={18}/>{open?'CLOSE':'QUICK HELP'}</button>
  </div>
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])
  return <div className="scroll-progress" aria-hidden="true"><span style={{ transform: 'scaleX(' + progress / 100 + ')' }} /></div>
}

function ScrollTools() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 520)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <button className={visible ? 'back-to-top back-to-top-visible' : 'back-to-top'} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}><ArrowUp size={17} /></button>
}
function App() {
  const [route, setRoute] = useState(() => typeof window === 'undefined' ? 'home' : routeFromHash())
  useEffect(() => {
    if (!window.location.hash) window.history.replaceState(null, '', window.location.pathname + window.location.search + '#/home')
    const onChange = () => { setRoute(routeFromHash()); window.scrollTo({ top: 0, behavior: 'auto' }) }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  useEffect(() => {
    trackEvent('page_view', { page_title: route, page_path: '#/' + route })
    const labels = Object.fromEntries(NAV)
    const descriptions = {
      home: 'A different kind of game night. Explore The Crown Of Console on Science City Road, Ahmedabad.',
      space: 'Explore the space and visual references for The Crown Of Console in Ahmedabad. Contact the team for confirmed venue details.',
      games: 'Ask about current games, consoles and availability at The Crown Of Console, Ahmedabad.',
      experiences: 'Explore solo, competitive and group gaming visit ideas at The Crown Of Console, Ahmedabad.',
      visit: 'Send a visit enquiry to The Crown Of Console in Ahmedabad. Your visit is confirmed only after the team replies.',
      contact: 'Find The Crown Of Console on Science City Road, Ahmedabad, and contact the team before your visit.'
    }
    const title = (labels[route] || 'Page not found') + ' — The Crown Of Console'
    document.title = title
    const description = descriptions[route] || 'Find your way to The Crown Of Console, Ahmedabad.'
    const meta = document.querySelector('meta[name="description"]')
    const socialTitle = document.querySelector('meta[property="og:title"]')
    const socialDescription = document.querySelector('meta[property="og:description"]')
    if (meta) meta.setAttribute('content', description)
    if (socialTitle) socialTitle.setAttribute('content', title)
    if (socialDescription) socialDescription.setAttribute('content', description)
  }, [route])
  useEffect(() => {
    const main = document.getElementById('main-content')
    if (main) main.focus({ preventScroll: true })
  }, [route])
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!('IntersectionObserver' in window)) { nodes.forEach((node) => node.classList.add('is-visible')); return }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [route])
  const pages = { home: <HomePage />, space: <SpacePage />, games: <GamesPage />, experiences: <ExperiencesPage />, visit: <VisitPage />, contact: <ContactPage /> }
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <ScrollProgress />
    <Header route={route} />
    {pages[route] || <NotFound />}
    <ScrollTools />
    <QuickHelp />
    <Footer />
    <AnalyticsConsent />
    <a className="mobile-enquiry" href={WA('Hello! I would like to check current rates and availability at The Crown Of Console.')} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Enquire on WhatsApp <ArrowUpRight size={16} /></a>
  </>
}

export default App
