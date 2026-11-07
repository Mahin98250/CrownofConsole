import { useEffect, useState } from 'react'
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays,
  Check, ChevronDown, Clock3, Gamepad2, MapPin, Menu, MessageCircle,
  Monitor, Phone, Users, X
} from 'lucide-react'

const PHONE = '918799508567'
const ADDRESS = 'FF/1, Shakti Arcade, Above Kutchi King, Near ICICI Bank, Science City Road, Ahmedabad'
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ADDRESS)
const MAP_EMBED_URL = 'https://www.google.com/maps?q=' + encodeURIComponent(ADDRESS) + '&output=embed'
const whatsappUrl = (message) => 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(message)
const localToday = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1715279240000-9a50953e327d?auto=format&fit=crop&w=1500&q=85',
    alt: 'Illustrative console gaming room with a large screen and ambient lighting',
    caption: 'Gaming space reference',
    credit: 'Branden Skeli / Unsplash'
  },
  {
    src: 'https://images.unsplash.com/photo-1792635926439-4f19b4d311e0?auto=format&fit=crop&w=1100&q=82',
    alt: 'Illustrative gaming room with screen and collectibles',
    caption: 'Setup reference',
    credit: 'Branden Skeli / Unsplash'
  },
  {
    src: 'https://images.unsplash.com/photo-1632603093711-0d93a0bcc6cc?auto=format&fit=crop&w=1100&q=82',
    alt: 'Illustrative dual monitor gaming desk setup',
    caption: 'Gaming desk reference',
    credit: 'amjed omaf / Unsplash'
  }
]

const experiences = [
  {
    id: 'solo',
    number: '01',
    label: 'A solo visit',
    icon: Monitor,
    title: 'Your time. Your game.',
    description: 'Have a title in mind? Ask the team what is currently available, what it costs and when you can drop in.',
    action: 'Ask about a solo session',
    message: 'Hello! I am interested in a solo gaming session. Could you share the current rates, timings and availability?'
  },
  {
    id: 'group',
    number: '02',
    label: 'A group visit',
    icon: Users,
    title: 'Bring the whole crew.',
    description: 'Planning a visit with friends? Share your group size and preferred time so the team can confirm what can be arranged.',
    action: 'Plan a group visit',
    message: 'Hello! I am planning a group gaming visit. Could you confirm the available options, current rates and timings?'
  },
  {
    id: 'game',
    number: '03',
    label: 'A game in mind',
    icon: Gamepad2,
    title: 'Ask before you arrive.',
    description: 'Tell the team which game or platform you are looking for. They can confirm the current availability before you make the trip.',
    action: 'Ask about a game',
    message: ''
  }
]

const faqs = [
  {
    question: 'What are the current session rates?',
    answer: 'Rates and packages can change. Message the team for the latest pricing before you visit. We prefer to confirm the actual rate rather than publish an outdated one.'
  },
  {
    question: 'Which games and platforms are available?',
    answer: 'The current game and equipment list has not been confirmed for this website yet. Tell the team the game or platform you have in mind and they can check it for you.'
  },
  {
    question: 'Can I visit with a group?',
    answer: 'You can enquire about a group visit. Share how many people are coming and your preferred time so the team can guide you.'
  },
  {
    question: 'What are the opening hours?',
    answer: 'Opening hours can change and have not been verified for this page. Please contact the team before travelling to confirm the current timings.'
  },
  {
    question: 'Do I need to book before arriving?',
    answer: 'A message before you leave is a good way to check availability. The website sends an enquiry to WhatsApp; your visit is not confirmed until the team replies.'
  }
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  return (
    <>
      <div className="topline">
        <span>SCIENCE CITY ROAD, AHMEDABAD</span>
        <a href="tel:+918799508567">+91 87995 08567</a>
      </div>
      <header className="header">
        <a className="logo-placeholder" href="#home" aria-label="Your logo placeholder, home">YOUR LOGO</a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? 'navigation navigation-open' : 'navigation'} aria-label="Main navigation">
          <a href="#space" onClick={close}>The space</a>
          <a href="#experience" onClick={close}>Experiences</a>
          <a href="#visit" onClick={close}>Plan a visit</a>
          <a href="#location" onClick={close}>Find us</a>
          <a className="header-cta" href={whatsappUrl('Hello! I would like to check current availability and rates at The Crown Of Console.')} target="_blank" rel="noreferrer" onClick={close}>Make an enquiry <ArrowUpRight size={15} /></a>
        </nav>
      </header>
    </>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <span className="eyebrow"><i /> THE CROWN OF CONSOLE <b>·</b> AHMEDABAD</span>
        <h1>A gaming café<br /><em>in Ahmedabad.</em></h1>
        <p className="hero-intro">Find The Crown Of Console on Science City Road. Check the details that matter before you visit — current games, session rates and availability, all confirmed directly by the team.</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#experience">Explore the experience <ArrowDownRight size={16} /></a>
          <a className="quiet-link" href={whatsappUrl('Hello! Could you share the current rates and availability at The Crown Of Console?')} target="_blank" rel="noreferrer">Ask us a question <ArrowUpRight size={15} /></a>
        </div>
        <div className="hero-footnote"><span>THE CROWN OF CONSOLE</span><span>SCIENCE CITY ROAD · AHMEDABAD</span></div>
      </div>
      <div className="hero-visual">
        <img
          src="https://images.unsplash.com/photo-1715279240000-9a50953e327d?auto=format&fit=crop&w=1800&q=88"
          alt="Illustrative gaming room photograph; actual venue photography will replace this image"
          fetchPriority="high"
        />
        <div className="hero-image-tag">REFERENCE PHOTO · NOT THE ACTUAL VENUE</div>
        <div className="hero-image-caption">
          <span>THE CROWN OF CONSOLE · AHMEDABAD</span>
          <span>PHOTO: BRANDEN SKELI / UNSPLASH</span>
        </div>
      </div>
    </section>
  )
}

function QuickFacts() {
  return (
    <div className="quick-facts" aria-label="Business details">
      <div><MapPin size={17} /><span><b>Find the café</b><small>Science City Road, Ahmedabad</small></span></div>
      <div><MessageCircle size={17} /><span><b>Talk to the team</b><small>Direct WhatsApp enquiries</small></span></div>
      <div><Clock3 size={17} /><span><b>Before you visit</b><small>Confirm current hours and rates</small></span></div>
    </div>
  )
}

function Gallery() {
  const [activeImage, setActiveImage] = useState(null)
  const close = () => setActiveImage(null)
  const previous = () => setActiveImage((value) => (value + gallery.length - 1) % gallery.length)
  const next = () => setActiveImage((value) => (value + 1) % gallery.length)

  useEffect(() => {
    if (activeImage === null) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.classList.add('lightbox-open')
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('lightbox-open')
    }
  }, [activeImage])

  return (
    <section className="space-section section-shell" id="space">
      <div className="section-topline"><span>01 — THE SPACE</span><span>LOOK AROUND</span></div>
      <div className="space-heading">
        <h2>Take a look<br /><em>around.</em></h2>
        <p>A first look at the kind of setup and atmosphere to expect. These are reference images for now; venue photographs will replace them.</p>
      </div>
      <div className="gallery-disclaimer">TEMPORARY REFERENCE PHOTOGRAPHY · REPLACE WITH ACTUAL VENUE PHOTOS</div>
      <div className="gallery-grid">
        {gallery.map((image, index) => (
          <button className={'gallery-item gallery-item-' + (index + 1)} type="button" key={image.src} onClick={() => setActiveImage(index)} aria-label={'View image: ' + image.caption}>
            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
            <span className="gallery-caption"><b>{image.caption}</b><small>{image.credit}</small></span>
            <span className="gallery-open"><ArrowUpRight size={17} /></span>
          </button>
        ))}
      </div>
      {activeImage !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
          <button className="lightbox-close" type="button" onClick={close} aria-label="Close photo viewer"><X size={22} /></button>
          <button className="lightbox-arrow lightbox-prev" type="button" onClick={previous} aria-label="Previous photo"><ArrowLeft size={22} /></button>
          <figure>
            <img src={gallery[activeImage].src} alt={gallery[activeImage].alt} />
            <figcaption><b>{gallery[activeImage].caption}</b><span>{gallery[activeImage].credit} · Reference image</span></figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" type="button" onClick={next} aria-label="Next photo"><ArrowRight size={22} /></button>
        </div>
      )}
    </section>
  )
}

function ExperienceExplorer() {
  const [selected, setSelected] = useState('solo')
  const [game, setGame] = useState('')
  const current = experiences.find((item) => item.id === selected) || experiences[0]
  const ActiveIcon = current.icon

  const sendEnquiry = () => {
    const message = selected === 'game'
      ? 'Hello! I would like to check whether ' + game.trim() + ' is currently available. Could you also share the current rates and timings?'
      : current.message
    if (!message) return
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="experience-section" id="experience">
      <div className="section-shell experience-inner">
        <div className="section-topline"><span>02 — THE EXPERIENCE</span><span>CHOOSE YOUR PLAN</span></div>
        <div className="experience-heading">
          <h2>What brings<br /><em>you in?</em></h2>
          <p>Choose the kind of visit you have in mind. Ask the team for confirmed details before travelling.</p>
        </div>
        <div className="experience-browser">
          <div className="experience-tabs" role="tablist" aria-label="Choose your gaming visit">
            {experiences.map((item) => {
              const Icon = item.icon
              return (
                <button
                  className={selected === item.id ? 'experience-tab is-active' : 'experience-tab'}
                  type="button"
                  role="tab"
                  aria-selected={selected === item.id}
                  key={item.id}
                  onClick={() => setSelected(item.id)}
                >
                  <span>{item.number}</span>
                  <Icon size={20} />
                  <b>{item.label}</b>
                  <ArrowUpRight className="tab-arrow" size={16} />
                </button>
              )
            })}
          </div>
          <div className="experience-panel" role="tabpanel">
            <div className="panel-icon"><ActiveIcon size={25} /></div>
            <span className="eyebrow">{current.number} / YOUR VISIT</span>
            <h3>{current.title}</h3>
            <p>{current.description}</p>
            {selected === 'game' && (
              <label className="game-question">
                <span>WHAT DO YOU WANT TO PLAY?</span>
                <input value={game} onChange={(event) => setGame(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') sendEnquiry() }} placeholder="Enter a game or platform" />
              </label>
            )}
            <button className="button button-lime" type="button" onClick={sendEnquiry} disabled={selected === 'game' && !game.trim()}>
              {current.action} <ArrowUpRight size={16} />
            </button>
            <span className="panel-footnote">A MESSAGE GOES DIRECTLY TO THE CAFE TEAM</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function VisitPlanner() {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('Evening')
  const [players, setPlayers] = useState('2')
  const [note, setNote] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const message = [
      'Hello, The Crown Of Console!',
      'I would like to enquire about a gaming visit.',
      name.trim() ? 'Name: ' + name.trim() : '',
      date ? 'Preferred date: ' + date : '',
      'Preferred time: ' + time,
      'Number of players: ' + players,
      note.trim() ? 'Additional details: ' + note.trim() : '',
      'Please share current rates and confirm availability. Thank you.'
    ].filter(Boolean).join('\n')
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="visit-section section-shell" id="visit">
      <div className="visit-copy">
        <div className="section-topline"><span>03 — PLAN A VISIT</span><span>NO PAYMENT REQUIRED</span></div>
        <h2>Planning a visit?<br /><em>Start here.</em></h2>
        <p>Send your preferred date, time and group size to the team. They will reply with current rates and availability.</p>
        <div className="visit-assurance">
          <div><Check size={16} /><span>Enquiry goes straight to WhatsApp</span></div>
          <div><Check size={16} /><span>No online payment or account needed</span></div>
          <div><Check size={16} /><span>Wait for confirmation before travelling</span></div>
        </div>
      </div>
      <form className="visit-form" onSubmit={submit}>
        <div className="form-heading">
          <div><span className="eyebrow">VISIT ENQUIRY</span><h3>When should we expect you?</h3></div>
          <CalendarDays size={23} />
        </div>
        <label className="form-field">
          <span>Your name <small>OPTIONAL</small></span>
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your name" autoComplete="name" />
        </label>
        <div className="form-row">
          <label className="form-field">
            <span>Preferred date</span>
            <input type="date" min={localToday()} value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
          <label className="form-field">
            <span>Preferred time</span>
            <select value={time} onChange={(event) => setTime(event.target.value)}>
              <option>Morning</option><option>Afternoon</option><option>Evening</option><option>Late evening</option>
            </select>
          </label>
        </div>
        <label className="form-field">
          <span>Number of players</span>
          <select value={players} onChange={(event) => setPlayers(event.target.value)}>
            {['1','2','3','4','5','6','7','8','9','10','10+'].map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label className="form-field">
          <span>Anything else? <small>OPTIONAL</small></span>
          <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="A game, group detail or question..." rows="3" />
        </label>
        <button className="button button-dark form-submit" type="submit">Continue on WhatsApp <ArrowUpRight size={17} /></button>
        <p className="form-note">Enquiry only — your visit is not booked until the team confirms it.</p>
      </form>
    </section>
  )
}

function FAQSection() {
  return (
    <section className="faq-section section-shell" id="faqs">
      <div className="faq-intro">
        <div className="section-topline"><span>04 — BEFORE YOU COME</span></div>
        <h2>Before you<br /><em>head over.</em></h2>
        <p>Still have a question? The team is one message away.</p>
        <a className="text-link" href={whatsappUrl('Hello! I have a question about The Crown Of Console.')} target="_blank" rel="noreferrer">Ask the team <ArrowUpRight size={16} /></a>
      </div>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <details className="faq-item" key={item.question} open={index === 0}>
            <summary><span>{item.question}</span><ChevronDown size={18} /></summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function LocationSection() {
  const [copied, setCopied] = useState(false)
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.open(MAP_URL, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section className="location-section" id="location">
      <div className="location-content section-shell">
        <div className="location-copy">
          <div className="section-topline"><span>05 — FIND THE CAFE</span><span>AHMEDABAD, INDIA</span></div>
          <h2>Find us on<br /><em>Science City Road.</em></h2>
          <p>We are at Shakti Arcade, near ICICI Bank. Use directions below or call if you need help finding the entrance.</p>
          <div className="address-details">
            <MapPin size={20} />
            <div><b>The Crown Of Console</b><span>FF/1, Shakti Arcade,<br />Above Kutchi King, Near ICICI Bank,<br />Science City Road, Ahmedabad</span></div>
          </div>
          <div className="location-actions">
            <button className="copy-address" type="button" onClick={copyAddress}>{copied ? <Check size={15} /> : <MapPin size={15} />}{copied ? 'Address copied' : 'Copy address'}</button>
            <a className="text-link" href={MAP_URL} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16} /></a>
          </div>
          <a className="location-phone" href="tel:+918799508567"><Phone size={17} /> +91 87995 08567</a>
        </div>
        <div className="map-frame">
          <iframe title="Map showing The Crown Of Console on Science City Road, Ahmedabad" src={MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <a href={MAP_URL} target="_blank" rel="noreferrer">OPEN IN GOOGLE MAPS <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <a className="logo-placeholder footer-logo" href="#home">YOUR LOGO</a>
          <p>THE CROWN OF CONSOLE · AHMEDABAD</p>
        </div>
        <a href={whatsappUrl('Hello! I would like to know more about The Crown Of Console.')} target="_blank" rel="noreferrer">GET IN TOUCH <ArrowUpRight size={16} /></a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} THE CROWN OF CONSOLE</span>
        <span>SCIENCE CITY ROAD, AHMEDABAD</span>
        <a href="#home">BACK TO TOP ↑</a>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <QuickFacts />
        <Gallery />
        <ExperienceExplorer />
        <VisitPlanner />
        <FAQSection />
        <LocationSection />
      </main>
      <Footer />
      <a className="mobile-whatsapp" href={whatsappUrl('Hello! I would like to check current availability and rates at The Crown Of Console.')} target="_blank" rel="noreferrer">
        <MessageCircle size={17} /> Make an enquiry <ArrowUpRight size={16} />
      </a>
    </>
  )
}

export default App
