import { useEffect, useState } from 'react'
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays,
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
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [route])
  return <>
    <div className="utility-bar">
      <span>THE CROWN OF CONSOLE <b>·</b> AHMEDABAD</span>
      <a href="tel:+918799508567"><Phone size={12} /> {PHONE_DISPLAY}</a>
    </div>
    <header className="site-header">
      <a className="brand-mark" href="#/home" aria-label="The Crown Of Console home">
        <span className="brand-emblem">C<span>✦</span></span>
        <span className="brand-name">THE CROWN<br /><b>OF CONSOLE</b></span>
      </a>
      <button className="nav-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
        {NAV.map(([path, label]) => <a key={path} href={'#/' + path} className={route === path ? 'nav-active' : ''} aria-current={route === path ? 'page' : undefined}>{label}</a>)}
        <a className="nav-cta" href="#/visit">Make an enquiry <ArrowUpRight size={15} /></a>
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

function HomePage() {
  return <>
    <main>
      <section className="home-hero">
        <div className="hero-text">
          <Eyebrow>SCIENCE CITY ROAD · AHMEDABAD</Eyebrow>
          <h1>Make room<br />for <em>one more</em><br />game.</h1>
          <p className="hero-description">A place to get together, pick up a controller and make an evening of it. Find us in Ahmedabad and check the details before you visit.</p>
          <div className="hero-buttons">
            <a className="button button-lime" href="#/experiences">Explore experiences <ArrowUpRight size={17} /></a>
            <a className="inline-light-link" href="#/visit">Plan your visit <ArrowDownRight size={16} /></a>
          </div>
          <div className="hero-bottomline"><span>THE CROWN OF CONSOLE</span><span>AHMEDABAD, INDIA</span></div>
        </div>
        <div className="hero-image">
          <img src={PHOTO.hero} alt="Illustrative gaming lounge photograph, not the actual venue" fetchPriority="high" />
          <div className="image-stamp"><span>VENUE IMAGE</span><b>REFERENCE<br />PHOTOGRAPH</b></div>
          <div className="image-caption"><span>THE PLAY STARTS HERE</span><span>01 — 06</span></div>
        </div>
        <div className="hero-side-note"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /></div>
      </section>

      <section className="home-intro section-pad">
        <div className="section-index"><span>01 — A PLACE TO PLAY</span><span>NOT JUST ANOTHER STOP</span></div>
        <div className="intro-grid">
          <h2>Good games.<br /><em>Better company.</em></h2>
          <div><p>Some plans don't need much. A few friends, a game you love and somewhere to settle in. That's the feeling we're building around.</p><ActionLink href="#/space">Get to know the space</ActionLink></div>
        </div>
      </section>

      <section className="home-feature">
        <div className="feature-image"><img src={PHOTO.room} alt="Illustrative photograph of a gaming room, not the actual venue" loading="lazy" /><span>REFERENCE PHOTO · NOT THE ACTUAL VENUE</span></div>
        <div className="feature-copy">
          <Eyebrow light>TAKE A CLOSER LOOK</Eyebrow>
          <h2>A little more<br /><em>than screen time.</em></h2>
          <p>Explore the space, tell us what you'd like to play and check the latest details directly with the café team.</p>
          <ActionLink href="#/space" light>Explore the space</ActionLink>
        </div>
      </section>

      <section className="home-paths section-pad">
        <div className="section-index"><span>02 — FIND YOUR WAY</span><span>EXPLORE THE SITE</span></div>
        <div className="path-grid">
          <a className="path-card path-card-featured" href="#/games"><span className="path-no">01</span><Gamepad2 size={24} /><h3>Got a game<br />in mind?</h3><p>Tell us what you want to play. We'll help check what's currently available.</p><b>Explore games <ArrowUpRight size={16} /></b><span className="path-graphic">PLAY</span></a>
          <a className="path-card" href="#/experiences"><span className="path-no">02</span><Users size={24} /><h3>Who's<br />coming along?</h3><p>Find the right enquiry path for a solo visit or a group plan.</p><b>See experiences <ArrowUpRight size={16} /></b></a>
          <a className="path-card" href="#/visit"><span className="path-no">03</span><CalendarDays size={24} /><h3>Make a plan.<br />Then make it happen.</h3><p>Send your preferred date and group size to the team.</p><b>Plan a visit <ArrowUpRight size={16} /></b></a>
        </div>
      </section>

      <section className="home-location">
        <div><Eyebrow light>FIND YOUR WAY HERE</Eyebrow><h2>See you on<br /><em>Science City Road.</em></h2><p>FF/1, Shakti Arcade, Ahmedabad</p></div>
        <ActionLink href="#/contact" light>Get directions</ActionLink>
      </section>
    </main>
  </>
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
  return <main className="inner-page">
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
    window.open(WA(message), '_blank', 'noopener,noreferrer')
    setSent(true)
  }
  return <main className="inner-page">
    <PageTop number="02" kicker="GAME DISCOVERY" title="What's on" italic="your list?" intro="Have a title in mind? Tell us what you're looking for and the café team can confirm whether it's currently available. We don't publish an unverified game catalogue." dark />
    <section className="games-intro section-pad">
      <div className="games-aside"><span>YOUR NEXT<br />PICK</span><Gamepad2 size={46} /><small>ENQUIRE DIRECTLY</small></div>
      <div className="games-form-wrap"><Eyebrow>LET'S CHECK AVAILABILITY</Eyebrow><h2>What do you<br /><em>want to play?</em></h2>
        <form className="enquiry-form" onSubmit={submit}>
          <label className="field"><span>What are you looking for?</span><select value={kind} onChange={(event) => setKind(event.target.value)}><option>A specific game</option><option>A multiplayer game</option><option>A particular console or platform</option><option>What's currently available</option></select></label>
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
  return <main className="inner-page">
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
    window.open(WA(message), '_blank', 'noopener,noreferrer')
    setSent(true)
  }
  return <main className="inner-page">
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
  return <main className="inner-page">
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
  return <main className="not-found"><span>404 / PAGE NOT FOUND</span><h1>This page<br /><em>isn't in the game.</em></h1><a className="button button-dark" href="#/home">Back to home <ArrowUpRight size={16} /></a></main>
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-main"><div className="footer-brand"><span className="brand-emblem">C<span>✦</span></span><div><b>THE CROWN OF CONSOLE</b><small>SCIENCE CITY ROAD · AHMEDABAD</small></div></div><div className="footer-cta"><span>READY WHEN YOU ARE.</span><a href="#/visit">Plan a visit <ArrowUpRight size={17} /></a></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} THE CROWN OF CONSOLE</span><div><a href="#/contact">CONTACT</a><a href="tel:+918799508567">CALL THE TEAM</a></div><a href="#/home">BACK TO TOP ↑</a></div>
  </footer>
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
    const labels = Object.fromEntries(NAV)
    document.title = (labels[route] || 'Page not found') + ' — The Crown Of Console'
  }, [route])
  const pages = { home: <HomePage />, space: <SpacePage />, games: <GamesPage />, experiences: <ExperiencesPage />, visit: <VisitPage />, contact: <ContactPage /> }
  return <>
    <Header route={route} />
    {pages[route] || <NotFound />}
    <Footer />
    <a className="mobile-enquiry" href={WA('Hello! I would like to check current rates and availability at The Crown Of Console.')} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Enquire on WhatsApp <ArrowUpRight size={16} /></a>
  </>
}

export default App
