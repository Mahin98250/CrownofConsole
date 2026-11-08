import { useEffect, useState } from 'react'
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, CalendarDays,
  Check, ChevronDown, Gamepad2, MapPin, Menu, MessageCircle, Monitor,
  Phone, Users, X, Zap, Clock3, Instagram
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
  if (localStorage.getItem('coc-analytics-consent') === 'yes' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}
const PHOTO = {
  hero: 'https://images.unsplash.com/photo-1715279240000-9a50953e327d?auto=format&fit=crop&w=1800&q=88',
  room: 'https://images.unsplash.com/photo-1792635926439-4f19b4d311e0?auto=format&fit=crop&w=1400&q=85',
  desk: 'https://images.unsplash.com/photo-1632603093711-0d93a0bcc6cc?auto=format&fit=crop&w=1400&q=85'
}

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
   <a className="brand-mark" href="#/home" aria-label="The Crown Of Console home"><span className="logo-placeholder">YOUR LOGO</span><span className="brand-name">THE CROWN<br/><b>OF CONSOLE</b></span></a>
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
function HomePage() {
 return <main id="main-content" tabIndex="-1" className="home-page art-playground">
  <section className="art-hero">
   <div className="art-hero-top"><span>THE CROWN OF CONSOLE <i>✳</i> AHMEDABAD</span><span>INDEPENDENT PLAY CLUB / EST. AHMEDABAD</span></div>
   <div className="art-hero-stage"><div className="hero-shape hero-shape-orange"/><div className="hero-shape hero-shape-blue"/>
    <div className="hero-type-art"><span className="hero-eyebrow-art">A DIFFERENT KIND OF GAME NIGHT</span><h1>PLAY<br/><em>OUTSIDE</em><br/>THE <span>LINES.</span></h1><p>Good games are only the beginning. Make a little noise, find your people and turn an ordinary day into a story worth replaying.</p><a className="art-pill-link" href="#player-lab">FIND YOUR PLAY STYLE <ArrowDownRight size={17}/></a></div>
    <div className="hero-art-collage"><div className="collage-photo"><img src={PHOTO.hero} alt="Illustrative gaming lounge photograph, not the actual venue" fetchPriority="high"/><span>VISUAL REFERENCE · NOT THE ACTUAL VENUE</span></div><div className="collage-sticker collage-sticker-yellow">NO<br/>PAUSE<br/>BUTTON</div><div className="collage-sticker collage-sticker-blue">LET'S<br/>PLAY!</div><div className="collage-caption"><b>01</b><span>THE GOOD STUFF<br/>HAPPENS TOGETHER</span></div></div>
    <div className="hero-side-index">SCROLL TO GET IN <span>↓</span></div>
   </div>
   <div className="hero-bottom-art"><span>NOT JUST A PLACE TO PLAY.</span><span>A PLACE TO MAKE A MOMENT.</span><span>SCIENCE CITY ROAD, AHMEDABAD ↗</span></div>
  </section>
  <section className="manifesto-art" data-reveal><div className="art-section-meta"><span>01 / THE HOUSE RULES</span><span>GOOD ENERGY ONLY (THE REST IS UP TO YOU)</span></div><div className="manifesto-art-grid"><h2>LESS<br/>SCROLL.<br/><em>MORE</em><br/>SCORE.</h2><div className="manifesto-art-note"><span className="asterisk-doodle">✳</span><p>Some nights are made for getting out, catching up and finding out who really has the better game. That's the feeling behind The Crown Of Console.</p><span className="handwritten-note">bring your people ↗</span></div></div><div className="manifesto-art-bottom"><span>GOOD GAMES</span><b>+</b><span>GREAT COMPANY</span><b>=</b><span>ONE MORE ROUND</span></div></section>
  <section className="visual-interlude" data-reveal><div className="interlude-image"><img src={PHOTO.room} alt="Illustrative gaming lounge photograph, not the actual venue" loading="lazy"/><span>REFERENCE IMAGE · NOT THE ACTUAL VENUE</span><b>MAKE<br/>A SCENE.</b></div><div className="interlude-copy"><span className="section-kicker">02 / THE ATMOSPHERE</span><h2>GOOD TIMES.<br/><em>NO SCRIPT.</em></h2><p>Come with a plan or make one when you get here. Explore the space and ask the team about the current setup, games and rates.</p><a href="#/space" className="art-text-link">TAKE A LOOK AROUND <ArrowUpRight size={18}/></a><span className="interlude-doodle" aria-hidden="true">✳</span></div></section>
  <PlayerSelector/>
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

function GamesPage() {
  const [game, setGame] = useState('')
  const [kind, setKind] = useState('A specific game')
  const [sent, setSent] = useState(false)
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
      <div className="gameplay-gallery">
        <article className={"gameplay-frame gameplay-frame-1"}><img src="https://d.techtimes.com/en/full/469882/sports-fc.png" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement.classList.add("gameplay-frame-fallback") }} alt="FC 27 in-game match action" loading="eager" decoding="async" /><div className="gameplay-frame-shade"></div><span className="gameplay-frame-index">01 / FOOTBALL</span><h3>EA SPORTS FC 27</h3></article>
        <article className={"gameplay-frame gameplay-frame-2"}><img src="https://www.weareplaystation.fr/api/upload/media/post/0008/02/thumb_701592_post_big.jpg" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement.classList.add("gameplay-frame-fallback") }} alt="GTA V PS5 in-game driving scene" loading="eager" decoding="async" /><div className="gameplay-frame-shade"></div><span className="gameplay-frame-index">02 / OPEN WORLD</span><h3>GRAND THEFT AUTO V</h3></article>
<article className={"gameplay-frame gameplay-frame-9"}><img src="https://www.maniac.de/wp-content/uploads/2025/10/ea-sports-fc-26-TEST.jpg" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement.classList.add("gameplay-frame-fallback") }} alt="EA Sports FC 26 PS5 gameplay" loading="eager" decoding="async" /><div className="gameplay-frame-shade"></div><span className="gameplay-frame-index">03 / FOOTBALL</span><h3>EA SPORTS FC 26</h3></article>
        <article className={"gameplay-frame gameplay-frame-3"}><img src="https://cdn.mos.cms.futurecdn.net/AQw34cg4TbtrUEA6MJ9a3d.jpg" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement.classList.add("gameplay-frame-fallback") }} alt="Gran Turismo 7 cockpit racing gameplay" loading="eager" decoding="async" /><div className="gameplay-frame-shade"></div><span className="gameplay-frame-index">03 / RACING</span><h3>GRAN TURISMO 7</h3></article>
        <article className={"gameplay-frame gameplay-frame-4"}><img src="https://www.xtgamer.net/wp-content/uploads/granturismo7-08-scaled.jpg" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement.classList.add("gameplay-frame-fallback") }} alt="NBA 2K26 in-game basketball match" loading="eager" decoding="async" /><div className="gameplay-frame-shade"></div><span className="gameplay-frame-index">04 / BASKETBALL</span><h3>NBA 2K26</h3></article>
        <article className={"gameplay-frame gameplay-frame-5"}><img src="https://image.api.playstation.com/vulcan/ap/rnd/202507/0209/830e75bc7c63c3f7dd329643ddaf97ce386b9fe0cda8ba5d.jpg?format=jpg&h=810&w=1440" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement.classList.add("gameplay-frame-fallback") }} alt="Call of Duty Black Ops 7 multiplayer gameplay" loading="eager" decoding="async" /><div className="gameplay-frame-shade"></div><span className="gameplay-frame-index">05 / ACTION</span><h3>CALL OF DUTY: BLACK OPS 7</h3></article>
        <article className={"gameplay-frame gameplay-frame-6"}><img src="https://cdn.mos.cms.futurecdn.net/ERWHrJnW3xSK8Zwiw7o3jX.jpg" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement.classList.add("gameplay-frame-fallback") }} alt="Spider-Man 2 in-game city traversal" loading="eager" decoding="async" /><div className="gameplay-frame-shade"></div><span className="gameplay-frame-index">06 / ADVENTURE</span><h3>MARVEL'S SPIDER-MAN 2</h3></article>
        <article className={"gameplay-frame gameplay-frame-7"}><img src="https://assetsio.gnwcdn.com/spider-man-2-hunters.jpg?auto=webp&fit=bounds&format=jpg&height=2048&quality=85&width=2048" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement.classList.add("gameplay-frame-fallback") }} alt="It Takes Two split-screen gameplay" loading="eager" decoding="async" /><div className="gameplay-frame-shade"></div><span className="gameplay-frame-index">07 / CO-OP</span><h3>IT TAKES TWO</h3></article>
        <article className={"gameplay-frame gameplay-frame-8"}><img src="https://cdn.staticneo.com/ew/2/20/IT2_CH1-BitingDust-Boss2.jpg" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement.classList.add("gameplay-frame-fallback") }} alt="Minecraft in-game building scene" loading="eager" decoding="async" /><div className="gameplay-frame-shade"></div><span className="gameplay-frame-index">08 / CREATIVE</span><h3>MINECRAFT</h3></article>
      </div>
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
    <div className="footer-main"><div className="footer-brand"><span className="logo-placeholder">YOUR LOGO</span><div><b>THE CROWN OF CONSOLE</b><small>SCIENCE CITY ROAD · AHMEDABAD</small></div></div><div className="footer-cta"><span>READY WHEN YOU ARE.</span><a href="#/visit">Plan a visit <ArrowUpRight size={17} /></a></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} THE CROWN OF CONSOLE</span><div><a href="#/contact">CONTACT</a><a href="tel:+918799508567">CALL THE TEAM</a></div><a href="#/home">BACK TO TOP ↑</a></div>
  </footer>
}


function AnalyticsConsent() {
  const [choice, setChoice] = useState(() => localStorage.getItem('coc-analytics-consent') || 'unset')
  useEffect(() => { if (choice === 'yes') loadAnalytics() }, [choice])
  if (!ANALYTICS_ID || choice !== 'unset') return null
  return <aside className="analytics-consent" aria-label="Analytics preferences">
    <div><b>HELP US MAKE THE SITE BETTER.</b><p>Optional website analytics help us understand which pages are useful. No analytics runs unless you agree.</p></div>
    <div className="analytics-consent-actions">
      <button type="button" onClick={() => { localStorage.setItem('coc-analytics-consent','no'); setChoice('no') }}>No thanks</button>
      <button type="button" onClick={() => { localStorage.setItem('coc-analytics-consent','yes'); setChoice('yes') }}>Allow analytics</button>
    </div>
  </aside>
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
function StartupIntro() {
  const [visible, setVisible] = useState(() => {
    try { return sessionStorage.getItem('coc-intro-seen-v2') !== 'yes' } catch { return true }
  })
  useEffect(() => {
    if (!visible) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setVisible(false); return }
    const timer = window.setTimeout(() => {
      setVisible(false)
      try { sessionStorage.setItem('coc-intro-seen-v2', 'yes') } catch {}
    }, 3200)
    return () => window.clearTimeout(timer)
  }, [visible])
  const dismiss = () => {
    try { sessionStorage.setItem('coc-intro-seen-v2', 'yes') } catch {}
    setVisible(false)
  }
  if (!visible) return null
  return <div className="startup-intro" role="dialog" aria-modal="true" aria-label="The Crown Of Console introduction">
    <div className="startup-grain" aria-hidden="true" />
    <div className="startup-topline"><span>THE CROWN OF CONSOLE</span><span>AHMEDABAD · INDIA</span></div>
    <div className="startup-center">
      <span className="startup-kicker">POWERING UP YOUR PLAY SPACE</span>
      <div className="startup-controller-wrap" aria-hidden="true">
        <span className="startup-light-pool" />
        <img className="startup-controller-photo" src="https://d.techtimes.com/en/full/469882/sports-fc.png" alt="" fetchPriority="high" decoding="async" />
      </div>
      <div className="startup-wordmark"><b>READY</b><em> PLAYER ONE.</em></div>
      <div className="startup-loading"><span /></div>
      <span className="startup-status">PRESS START TO ENTER</span>
    </div>
    <div className="startup-bottomline"><span>GOOD GAMES. GREAT COMPANY.</span><button type="button" onClick={dismiss}>SKIP INTRO ↗</button></div>
  </div>
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
    <StartupIntro />
    <ScrollProgress />
    <Header route={route} />
    {pages[route] || <NotFound />}
    <ScrollTools />
    <Footer />
    <AnalyticsConsent />
    <a className="mobile-enquiry" href={WA('Hello! I would like to check current rates and availability at The Crown Of Console.')} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Enquire on WhatsApp <ArrowUpRight size={16} /></a>
  </>
}

export default App
