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
        <span className="logo-placeholder">YOUR LOGO</span>
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

function MoodSelector() {
  const [mood, setMood] = useState('friendly-rivalry')
  const options = [
    { id: 'friendly-rivalry', title: 'Friendly rivalry', note: 'A little competition', prompt: 'I am interested in a friendly competitive gaming session. Could you share what options are currently available, along with rates and timings?' },
    { id: 'play-together', title: 'Play together', note: 'A shared session', prompt: 'I am planning a gaming visit with friends. Could you share the current group options, rates and availability?' },
    { id: 'solo-session', title: 'My own pace', note: 'A solo visit', prompt: 'I am interested in a solo gaming visit. Could you share the current options, rates, timings and availability?' }
  ]
  const selected = options.find((option) => option.id === mood) || options[0]
  return <section className="mood-section section-pad" data-reveal>
    <div className="mood-heading">
      <Eyebrow>MAKE IT YOUR KIND OF NIGHT</Eyebrow>
      <span className="mood-counter">INTERACTIVE ENQUIRY / 01—03</span>
      <h2>What's your<br /><em>next move?</em></h2>
      <p>Choose the vibe. We'll turn it into a message you can send to the café team. The team will confirm what can be arranged.</p>
    </div>
    <div className="mood-picker">
      {options.map((option, index) => <button key={option.id} type="button" className={mood === option.id ? 'mood-option mood-option-active' : 'mood-option'} onClick={() => setMood(option.id)} aria-pressed={mood === option.id}>
        <span className="mood-option-no">0{index + 1}</span>
        <span className="mood-option-copy"><b>{option.title}</b><small>{option.note}</small></span>
        <span className="mood-option-arrow"><ArrowUpRight size={18} /></span>
      </button>)}
      <div className="mood-result">
        <span>YOUR CURRENT PICK</span>
        <b>{selected.title}</b>
        <a href={WA('Hello, The Crown Of Console! ' + selected.prompt)} target="_blank" rel="noreferrer">ENQUIRE ABOUT THIS <ArrowUpRight size={15} /></a>
      </div>
    </div>
  </section>
}

function HomePage() {
  return <main className="home-page">
    <section className="home-hero home-hero-awwwards">
      <div className="hero-topline">
        <Eyebrow>SCIENCE CITY ROAD · AHMEDABAD</Eyebrow>
        <span>INDEPENDENT GAMING. SHARED MOMENTS.</span>
      </div>
      <div className="hero-stage">
        <div className="hero-type">
          <span className="hero-index">THE CROWN OF CONSOLE / 001</span>
          <h1><span>PRESS</span><span className="hero-word-middle">START<span className="hero-dot">.</span></span><span className="hero-word-last">STAY <em>AWHILE.</em></span></h1>
          <div className="hero-orbit" aria-hidden="true"><span>PLAY</span><i>✳</i><b>TOGETHER</b></div>
        </div>
        <div className="hero-photo">
          <img src={PHOTO.hero} alt="Illustrative gaming lounge photograph, not the actual venue" fetchPriority="high" />
          <div className="hero-photo-shade" />
          <div className="hero-photo-tag"><span>VISUAL REFERENCE</span><b>NOT THE<br />ACTUAL VENUE</b></div>
          <div className="hero-photo-caption"><span>THE PLAY STARTS HERE</span><span>AHMEDABAD, IN</span></div>
          <span className="hero-photo-side">A PLACE TO PLAY / A REASON TO STAY</span>
        </div>
      </div>
      <div className="hero-baseline">
        <p>A place to meet, pick up a controller and make a little more of the time you spend together.</p>
        <div className="hero-actions">
          <a className="button button-lime" href="#/experiences">FIND YOUR PLAY <ArrowUpRight size={16} /></a>
          <a className="hero-secondary-link" href="#/visit">PLAN A VISIT <ArrowDownRight size={16} /></a>
        </div>
        <span className="hero-scroll-cue"><i /> SCROLL TO EXPLORE</span>
      </div>
    </section>

    <div className="ticker" aria-label="The Crown Of Console, Science City Road, Ahmedabad">
      <div className="ticker-track"><span>THE CROWN OF CONSOLE</span><i>✳</i><span>PRESS START. STAY AWHILE.</span><i>✳</i><span>SCIENCE CITY ROAD · AHMEDABAD</span><i>✳</i><span>THE CROWN OF CONSOLE</span><i>✳</i><span>PRESS START. STAY AWHILE.</span><i>✳</i></div>
    </div>

    <section className="home-manifesto section-pad" data-reveal>
      <div className="manifesto-meta"><span>01 / THE IDEA</span><span>GOOD GAMES ARE BETTER TOGETHER</span></div>
      <div className="manifesto-layout">
        <h2>Not just<br />another <em>screen.</em></h2>
        <div className="manifesto-copy"><span className="manifesto-symbol">✳</span><p>It's the friendly rematch, the unexpected win, the “one more round” that turns into an evening. We're building a place around those moments.</p><a href="#/space" className="text-action">GET TO KNOW THE SPACE <ArrowUpRight size={16} /></a></div>
      </div>
      <div className="manifesto-foot"><span>COME AS YOU ARE</span><span>BRING YOUR PEOPLE</span><span>MAKE A MOMENT OF IT</span></div>
    </section>

    <section className="home-image-story" data-reveal>
      <div className="story-image-large">
        <img src={PHOTO.room} alt="Illustrative photograph of a gaming room, not the actual venue" loading="lazy" />
        <span className="story-image-label">REFERENCE IMAGE · NOT THE ACTUAL VENUE</span>
        <span className="story-image-number">02 / ATMOSPHERE</span>
      </div>
      <div className="story-image-copy">
        <Eyebrow light>THE SPACE IS PART OF THE STORY</Eyebrow>
        <h2>Make time<br />for <em>play.</em></h2>
        <p>Explore the visual direction, then ask the team directly about the current setup, equipment, rates and availability.</p>
        <a className="action-link action-link-light" href="#/space">EXPLORE THE SPACE <ArrowUpRight size={16} /></a>
        <span className="story-side-note">A GOOD NIGHT, ONE ROUND AT A TIME.</span>
      </div>
    </section>

    <MoodSelector />

    <section className="home-paths-awwwards section-pad" data-reveal>
      <div className="manifesto-meta"><span>03 / EXPLORE</span><span>YOUR NEXT CHAPTER STARTS HERE</span></div>
      <div className="explore-heading"><h2>Choose your<br /><em>next move.</em></h2><p>Get to know the space, ask about games or send a visit enquiry. Every page has its own place in the story.</p></div>
      <div className="explore-grid">
        <a className="explore-card explore-card-tall" href="#/games"><span className="explore-card-no">01 — DISCOVER</span><Gamepad2 size={27} /><strong>Find your<br /><em>next game.</em></strong><span className="explore-card-foot">ASK ABOUT GAME AVAILABILITY <ArrowUpRight size={17} /></span><b className="explore-ghost">PLAY</b></a>
        <a className="explore-card explore-card-light" href="#/experiences"><span className="explore-card-no">02 — CONNECT</span><Users size={27} /><strong>Bring the<br /><em>whole crew.</em></strong><span className="explore-card-foot">EXPLORE EXPERIENCES <ArrowUpRight size={17} /></span></a>
        <a className="explore-card explore-card-accent" href="#/visit"><span className="explore-card-no">03 — MAKE A PLAN</span><CalendarDays size={27} /><strong>Make it<br /><em>happen.</em></strong><span className="explore-card-foot">SEND A VISIT ENQUIRY <ArrowUpRight size={17} /></span></a>
      </div>
    </section>

    <section className="home-location-awwwards" data-reveal>
      <div className="location-watermark" aria-hidden="true">AHM</div>
      <div className="location-topline"><Eyebrow light>YOUR NEXT STOP</Eyebrow><span>04 / FIND US</span></div>
      <div className="location-layout"><h2>Meet us<br /><em>in the game.</em></h2><div className="location-details"><p>FF/1, Shakti Arcade, Above Kutchi King, Near ICICI Bank, Science City Road, Ahmedabad.</p><a className="button button-lime" href="#/contact">GET DIRECTIONS <ArrowUpRight size={16} /></a><a className="location-phone" href="tel:+918799508567">+91 87995 08567</a></div></div>
      <div className="location-footer"><span>THE CROWN OF CONSOLE</span><span>SCIENCE CITY ROAD · AHMEDABAD, INDIA</span></div>
    </section>
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
    <div className="footer-main"><div className="footer-brand"><span className="logo-placeholder">YOUR LOGO</span><div><b>THE CROWN OF CONSOLE</b><small>SCIENCE CITY ROAD · AHMEDABAD</small></div></div><div className="footer-cta"><span>READY WHEN YOU ARE.</span><a href="#/visit">Plan a visit <ArrowUpRight size={17} /></a></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} THE CROWN OF CONSOLE</span><div><a href="#/contact">CONTACT</a><a href="tel:+918799508567">CALL THE TEAM</a></div><a href="#/home">BACK TO TOP ↑</a></div>
  </footer>
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
    const labels = Object.fromEntries(NAV)
    document.title = (labels[route] || 'Page not found') + ' — The Crown Of Console'
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
    <ScrollProgress />
    <Header route={route} />
    {pages[route] || <NotFound />}
    <ScrollTools />
    <Footer />
    <a className="mobile-enquiry" href={WA('Hello! I would like to check current rates and availability at The Crown Of Console.')} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Enquire on WhatsApp <ArrowUpRight size={16} /></a>
  </>
}

export default App
