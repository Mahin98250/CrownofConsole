import { useState } from 'react'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, Check,
  ChevronDown, Clock3, Gamepad2, MapPin, Menu, MessageCircle,
  Monitor, Phone, Search, Users, X
} from 'lucide-react'

const PHONE = '918799508567'
const ADDRESS = 'FF/1, Shakti Arcade, Above Kutchi King, Near ICICI Bank, Science City Road, Ahmedabad'
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ADDRESS)
const whatsappUrl = (message) => 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(message)

const faqs = [
  {
    question: 'What are the session rates?',
    answer: 'Rates can change, so we do not show an unverified price list. Send the team a message and ask for the latest rates before you visit.'
  },
  {
    question: 'Which games or consoles are available?',
    answer: 'The current game and platform list has not been published here. Tell the team which title or console you have in mind and they can confirm availability.'
  },
  {
    question: 'Can we visit as a group?',
    answer: 'You can enquire about a group visit. Share how many people are coming and your preferred time so the team can guide you.'
  },
  {
    question: 'Where is The Crown Of Console?',
    answer: 'You can find us at FF/1, Shakti Arcade, above Kutchi King, near ICICI Bank, Science City Road, Ahmedabad. Use the directions link on this page to open Google Maps.'
  },
  {
    question: 'Do I need to contact you before coming?',
    answer: 'It is a good idea to check current timings, rates and availability before travelling. The WhatsApp enquiry on this page goes directly to the team.'
  }
]

const experiences = {
  solo: {
    eyebrow: 'YOUR OWN PACE',
    title: 'A session for one.',
    description: 'Have a game in mind? Ask what is available and plan a focused visit around your preferred time.',
    message: 'Hello! I am interested in a solo gaming session. Could you share the current rates, timings and availability?'
  },
  squad: {
    eyebrow: 'BRING YOUR PEOPLE',
    title: 'Make it a group plan.',
    description: 'Coming with friends? Share your group size first so the team can confirm what can be arranged.',
    message: 'Hello! I am planning a group gaming visit. Could you confirm availability and current rates?'
  },
  discover: {
    eyebrow: 'FIND YOUR NEXT GAME',
    title: 'Ask before you arrive.',
    description: 'Looking for a particular game, console or setup? Send the name to the team and check what is currently available.',
    message: 'Hello! I would like to ask about the games and platforms currently available.'
  }
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="utility-bar">
        <span><i /> SCIENCE CITY ROAD, AHMEDABAD</span>
        <a href="tel:+918799508567">Need help? <b>+91 87995 08567</b></a>
      </div>
      <header className="site-header">
        <a className="logo-placeholder" href="#home" aria-label="Your logo placeholder, home">YOUR LOGO</a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#explore" onClick={closeMenu}>Explore</a>
          <a href="#faqs" onClick={closeMenu}>FAQs</a>
          <a href="#location" onClick={closeMenu}>Location</a>
          <a className="nav-cta" href={whatsappUrl('Hello! I would like to check current availability and rates at The Crown Of Console.')} target="_blank" rel="noreferrer" onClick={closeMenu}>
            Check availability <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
    </>
  )
}

function ExperienceExplorer() {
  const [active, setActive] = useState('solo')
  const [game, setGame] = useState('')
  const current = experiences[active]

  const sendGameQuestion = () => {
    const title = game.trim()
    if (!title) return
    window.open(whatsappUrl('Hello! I would like to check whether ' + title + ' is currently available at The Crown Of Console. Please also share the rates and timings.'), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="experience-section section-shell" id="experience">
      <div className="section-heading">
        <div>
          <span className="eyebrow">START WITH WHAT YOU NEED</span>
          <h2>Every visit starts<br /><em>with a good plan.</em></h2>
        </div>
        <p>Choose what describes your visit. We’ll point you to the right next step.</p>
      </div>

      <div className="experience-layout">
        <div className="experience-options" role="tablist" aria-label="Choose your visit type">
          <button className={active === 'solo' ? 'experience-option active' : 'experience-option'} type="button" role="tab" aria-selected={active === 'solo'} onClick={() => setActive('solo')}>
            <span className="option-icon"><Monitor size={20} /></span>
            <span><small>01 / PLAY YOUR WAY</small><b>Solo session</b></span>
            <ArrowUpRight size={17} />
          </button>
          <button className={active === 'squad' ? 'experience-option active' : 'experience-option'} type="button" role="tab" aria-selected={active === 'squad'} onClick={() => setActive('squad')}>
            <span className="option-icon"><Users size={20} /></span>
            <span><small>02 / BRING THE CREW</small><b>Group visit</b></span>
            <ArrowUpRight size={17} />
          </button>
          <button className={active === 'discover' ? 'experience-option active' : 'experience-option'} type="button" role="tab" aria-selected={active === 'discover'} onClick={() => setActive('discover')}>
            <span className="option-icon"><Gamepad2 size={20} /></span>
            <span><small>03 / FIND A GAME</small><b>Game enquiry</b></span>
            <ArrowUpRight size={17} />
          </button>
        </div>

        <div className="experience-detail" role="tabpanel">
          <span className="detail-kicker">{current.eyebrow}</span>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
          <a className="button button-primary" href={whatsappUrl(current.message)} target="_blank" rel="noreferrer">
            Ask the team <ArrowUpRight size={17} />
          </a>
          <span className="detail-index">CROWN OF CONSOLE <i /> AHMEDABAD</span>
        </div>
      </div>

      <div className="game-finder" id="explore">
        <div className="finder-copy">
          <span className="eyebrow">LOOKING FOR SOMETHING SPECIFIC?</span>
          <h3>Search a game or platform.</h3>
          <p>Enter a title, console or platform. We’ll send your question straight to the team.</p>
        </div>
        <div className="finder-action">
          <label className="search-field">
            <Search size={19} />
            <input value={game} onChange={(event) => setGame(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') sendGameQuestion() }} placeholder="e.g. a game or console name" aria-label="Game or platform name" />
            {game && <button type="button" onClick={() => setGame('')} aria-label="Clear search"><X size={16} /></button>}
          </label>
          <button className="button button-primary finder-button" type="button" onClick={sendGameQuestion} disabled={!game.trim()}>
            Check availability <ArrowRight size={17} />
          </button>
          <span className="finder-note">Availability is confirmed by the team, not automatically.</span>
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

  const submit = (event) => {
    event.preventDefault()
    const lines = [
      'Hello, The Crown Of Console!',
      'I would like to check availability for a gaming visit.',
      name.trim() ? 'Name: ' + name.trim() : '',
      date ? 'Preferred date: ' + date : '',
      'Preferred time: ' + time,
      'Number of players: ' + players,
      'Please share the current rates and confirm availability. Thank you.'
    ].filter(Boolean)
    window.open(whatsappUrl(lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  return (
    <form className="planner-card" onSubmit={submit}>
      <div className="planner-heading">
        <div>
          <span className="eyebrow">PLAN YOUR VISIT</span>
          <h3>Let's make a plan.</h3>
        </div>
        <span className="planner-icon"><CalendarDays size={21} /></span>
      </div>
      <label className="form-field">
        <span>Your name <small>OPTIONAL</small></span>
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your name" autoComplete="name" />
      </label>
      <div className="form-grid">
        <label className="form-field">
          <span>Preferred date</span>
          <input type="date" min={new Date().toISOString().slice(0, 10)} value={date} onChange={(event) => setDate(event.target.value)} />
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
      <button className="button button-primary planner-submit" type="submit">Continue on WhatsApp <ArrowUpRight size={17} /></button>
      <p className="form-disclaimer">This sends an enquiry only. Your visit is not booked until the team confirms it.</p>
    </form>
  )
}

function App() {
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
    <>
      <Header />
      <main id="main">
        <section className="hero" id="home">
          <img className="hero-image" src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1800&q=88" alt="Illustrative gaming setup" fetchPriority="high" />
          <div className="hero-image-shade" />
          <div className="hero-content">
            <span className="hero-location"><i /> GAMING CAFE <b>/</b> AHMEDABAD</span>
            <h1>Make time<br />for <em>game time.</em></h1>
            <p>Bring your people, choose what you want to play and make a plan. Find The Crown Of Console on Science City Road.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#experience">Explore the experience <ArrowUpRight size={17} /></a>
              <a className="button button-ghost" href={whatsappUrl('Hello! I would like to check current availability and rates.')} target="_blank" rel="noreferrer">Talk to the team <MessageCircle size={16} /></a>
            </div>
          </div>
          <div className="hero-bottom">
            <span>THE CROWN OF CONSOLE</span>
            <span>SCIENCE CITY ROAD, AHMEDABAD</span>
            <a href="#experience">SCROLL TO EXPLORE <ArrowDownRight size={15} /></a>
          </div>
          <div className="hero-image-note">ILLUSTRATIVE GAMING IMAGE</div>
        </section>

        <section className="trust-strip" aria-label="Quick information">
          <div><MapPin size={17} /><span><b>Find us</b><small>Science City Road, Ahmedabad</small></span></div>
          <div><MessageCircle size={17} /><span><b>Ask directly</b><small>Speak with the team on WhatsApp</small></span></div>
          <div><Clock3 size={17} /><span><b>Check before you visit</b><small>Confirm current timings and rates</small></span></div>
        </section>

        <ExperienceExplorer />

        <section className="visit-section section-shell" id="plan">
          <div className="visit-intro">
            <span className="eyebrow">A FEW DETAILS, THEN YOU'RE SET</span>
            <h2>Get your next<br /><em>session started.</em></h2>
            <p>Tell us when you would like to visit. Your details will be added to a WhatsApp message so the team can confirm rates and availability with you.</p>
            <div className="visit-points">
              <div><Check size={16} /><span>No online payment required here</span></div>
              <div><Check size={16} /><span>Confirm details directly with the team</span></div>
              <div><Check size={16} /><span>Ask about a specific game or group visit</span></div>
            </div>
          </div>
          <VisitPlanner />
        </section>

        <section className="faq-section section-shell" id="faqs">
          <div className="faq-intro">
            <span className="eyebrow">GOOD TO KNOW</span>
            <h2>Before you<br /><em>head over.</em></h2>
            <p>Can't find what you're looking for? Send us a message and ask directly.</p>
            <a className="text-link" href={whatsappUrl('Hello! I have a question about The Crown Of Console.')} target="_blank" rel="noreferrer">Ask a question <ArrowUpRight size={16} /></a>
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

        <section className="location-section section-shell" id="location">
          <div className="location-copy">
            <span className="eyebrow">COME FIND US</span>
            <h2>See you<br /><em>at the cafe.</em></h2>
            <p>We're at Shakti Arcade on Science City Road. Open directions before you set off, or copy the address for later.</p>
            <div className="address-card">
              <MapPin size={20} />
              <div><b>The Crown Of Console</b><span>FF/1, Shakti Arcade,<br />Above Kutchi King, Near ICICI Bank,<br />Science City Road, Ahmedabad</span></div>
            </div>
            <div className="location-actions">
              <button className="copy-address" type="button" onClick={copyAddress}>{copied ? <Check size={16} /> : <MapPin size={16} />}{copied ? 'Address copied' : 'Copy address'}</button>
              <a className="text-link" href={MAP_URL} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16} /></a>
            </div>
            <a className="phone-link" href="tel:+918799508567"><Phone size={17} /> +91 87995 08567</a>
          </div>
          <a className="map-card" href={MAP_URL} target="_blank" rel="noreferrer" aria-label="Open the location in Google Maps">
            <div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" />
            <div className="map-marker"><MapPin size={24} /></div>
            <span className="map-label">SCIENCE CITY ROAD <b>·</b> AHMEDABAD</span>
            <span className="map-open">OPEN IN MAPS <ArrowUpRight size={16} /></span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="logo-placeholder footer-logo" href="#home">YOUR LOGO</a>
          <p>Make time for game time.</p>
          <a className="footer-contact" href={whatsappUrl('Hello! I would like to know more about The Crown Of Console.')} target="_blank" rel="noreferrer">CONTACT THE TEAM <ArrowUpRight size={16} /></a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} THE CROWN OF CONSOLE</span>
          <span>SCIENCE CITY ROAD, AHMEDABAD</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>

      <a className="mobile-contact-bar" href={whatsappUrl('Hello! I would like to check current availability and rates at The Crown Of Console.')} target="_blank" rel="noreferrer">
        <MessageCircle size={17} /> Check availability <ArrowUpRight size={16} />
      </a>
    </>
  )
}

export default App
