import { useState } from 'react'
import {
  ArrowDown, ArrowUpRight, Check, ChevronDown, Clock3,
  Gamepad2, MapPin, Menu, MessageCircle, Monitor, Phone, Users, X
} from 'lucide-react'

const PHONE = '918799508567'
const ADDRESS = 'FF/1, Shakti Arcade, Above Kutchi King, Near ICICI Bank, Science City Road, Ahmedabad'
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`
const whatsappUrl = (message) => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`

const questions = [
  {
    question: 'How much does a gaming session cost?',
    answer: 'Rates and packages can change. Message the team on WhatsApp and they’ll share the current pricing before you make the trip.'
  },
  {
    question: 'Which games and platforms are available?',
    answer: 'The current game and hardware list hasn’t been published here yet. Ask the team about the title or platform you have in mind.'
  },
  {
    question: 'Can I come with a group?',
    answer: 'Yes, you can enquire about a group visit. Share how many people are coming so the team can confirm what’s possible.'
  },
  {
    question: 'Do I need to book before arriving?',
    answer: 'A quick message before you leave is the best way to check availability and avoid a wasted trip.'
  }
]

function BrandMark() {
  return (
    <span className="wordmark-icon" aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <defs><linearGradient id="crownGold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff0a2"/><stop offset=".48" stopColor="#f4b83e"/><stop offset="1" stopColor="#b85a1e"/></linearGradient></defs>
        <path d="M7 16 14 23 19 10 24 20 30 8 34 23 42 15 38 31H11L7 16Z" fill="url(#crownGold)" stroke="#e45b42" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M12 34Q24 29 36 34L40 40Q24 45 8 40L12 34Z" fill="#101a35" stroke="#f5c35d" strokeWidth="1.5"/>
        <path d="M15 35h18q3 0 4 3l-2 3H13l-2-3q1-3 4-3Z" fill="#11131b" stroke="#e45b42" strokeWidth="1.1"/>
        <circle cx="17" cy="38" r="1.5" fill="#e45b42"/><circle cx="21" cy="36.5" r="1.2" fill="#e45b42"/><circle cx="28" cy="36.5" r="1.2" fill="#e45b42"/><circle cx="32" cy="38" r="1.5" fill="#e45b42"/>
      </svg>
    </span>
  )
}

function SectionLabel({ number, children }) {
  return <div className="section-label"><span>{number}</span><i />{children}</div>
}

function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="topline"><span className="topline-mark" /> SCIENCE CITY ROAD <span className="topline-separator">/</span> AHMEDABAD, INDIA</div>
      <header className="header">
        <a className="wordmark" href="#home" aria-label="The Crown Of Console, home">
          <BrandMark />
          <span>THE CROWN <small>OF</small> CONSOLE</span>
        </a>
        <button className="mobile-menu" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={open ? 'navigation navigation-open' : 'navigation'} aria-label="Main navigation">
          <a href="#story" onClick={close}>The place</a>
          <a href="#details" onClick={close}>Before you play</a>
          <a href="#visit" onClick={close}>Find us</a>
          <a className="nav-contact" href={whatsappUrl('Hello, I’m planning a visit to The Crown Of Console. Could you help me with availability and current rates?')} target="_blank" rel="noreferrer" onClick={close}>Talk to the team <ArrowUpRight size={15} /></a>
        </nav>
      </header>
    </>
  )
}

function VisitForm() {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('Evening')
  const [party, setParty] = useState('2')
  const [note, setNote] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const message = [
      'Hello, The Crown Of Console!',
      'I’d like to check availability for a gaming session.',
      name.trim() ? `Name: ${name.trim()}` : '',
      date ? `Preferred date: ${date}` : '',
      `Preferred time: ${time}`,
      `People: ${party}`,
      note.trim() ? `Anything else: ${note.trim()}` : '',
      'Please share the current rates and availability. Thank you.'
    ].filter(Boolean).join('\n')
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <form className="enquiry-form" onSubmit={submit}>
      <div className="form-heading">
        <span className="micro-label">A GOOD SESSION STARTS HERE</span>
        <h3>Planning a visit?</h3>
        <p>Tell us what you have in mind. We’ll confirm the details with you directly.</p>
      </div>
      <label className="field"><span>Your name <small>OPTIONAL</small></span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="What should we call you?" autoComplete="name" /></label>
      <div className="form-row">
        <label className="field"><span>Preferred date</span><input type="date" min={new Date().toISOString().slice(0, 10)} value={date} onChange={(e) => setDate(e.target.value)} /></label>
        <label className="field"><span>Time of day</span><select value={time} onChange={(e) => setTime(e.target.value)}><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Late evening</option></select></label>
      </div>
      <label className="field"><span>How many players?</span><select value={party} onChange={(e) => setParty(e.target.value)}>{['1','2','3','4','5','6','7','8','9','10','10+'].map((n) => <option key={n} value={n}>{n}{n === '1' ? ' player' : ' players'}</option>)}</select></label>
      <label className="field"><span>Anything we should know? <small>OPTIONAL</small></span><textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="A game you want to play, a group visit, a question..." rows="3" /></label>
      <button className="button button-bright form-submit" type="submit">Continue on WhatsApp <ArrowUpRight size={17} /></button>
      <p className="form-footnote">This is an enquiry, not an instant booking. The team will confirm availability and rates with you.</p>
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
          <div className="hero-art-scene" aria-hidden="true">
            <div className="hero-art-grid" />
            <div className="hero-art-ring ring-one" /><div className="hero-art-ring ring-two" />
            <div className="hero-art-crown"><Crown size={58} strokeWidth={1.1}/></div>
            <div className="hero-art-console">THE CROWN <span>PLAYER ONE</span></div>
            <svg className="hero-controller" viewBox="0 0 640 360">
              <defs><linearGradient id="controllerShell" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#59627d"/><stop offset=".35" stopColor="#171f36"/><stop offset="1" stopColor="#080c18"/></linearGradient><linearGradient id="controllerTrim"><stop stopColor="#fff0ad"/><stop offset=".5" stopColor="#e8ad49"/><stop offset="1" stopColor="#d34b3d"/></linearGradient><filter id="controllerShadow"><feGaussianBlur stdDeviation="15"/></filter></defs>
              <ellipse cx="320" cy="300" rx="210" ry="25" fill="#000" opacity=".8" filter="url(#controllerShadow)"/>
              <path d="M155 117C178 88 211 83 257 98L320 118 383 98C429 83 462 88 485 117L535 231C548 264 523 292 488 281L414 245H226L152 281C117 292 92 264 105 231Z" fill="url(#controllerShell)" stroke="url(#controllerTrim)" strokeWidth="7"/>
              <path d="M158 122C184 103 215 103 253 115L320 135 387 115C425 103 456 103 482 122" fill="none" stroke="#c9d5f2" strokeOpacity=".35" strokeWidth="3"/>
              <path d="M196 162h63v17h-23v23h-17v-23h-23Z" fill="#080d19" stroke="#8a96b4" strokeWidth="3"/>
              <circle cx="220" cy="170" r="6" fill="#f1dca4"/><circle cx="244" cy="170" r="6" fill="#f1dca4"/>
              <circle cx="431" cy="158" r="13" fill="#151a29" stroke="#f2c15b" strokeWidth="4"/><circle cx="466" cy="181" r="13" fill="#151a29" stroke="#e34d3e" strokeWidth="4"/><circle cx="396" cy="181" r="13" fill="#151a29" stroke="#5bbbe9" strokeWidth="4"/><circle cx="431" cy="205" r="13" fill="#151a29" stroke="#c18df0" strokeWidth="4"/>
              <path d="M284 145h72q9 0 9 9v33q0 9-9 9h-72q-9 0-9-9v-33q0-9 9-9Z" fill="#090d18" stroke="#68718b" strokeWidth="3"/><path d="M303 162h34" stroke="#f4c15a" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="235" cy="235" r="28" fill="#080c16" stroke="#68718a" strokeWidth="5"/><circle cx="235" cy="235" r="16" fill="#20283c" stroke="#e34d3e" strokeWidth="3"/><circle cx="405" cy="235" r="28" fill="#080c16" stroke="#68718a" strokeWidth="5"/><circle cx="405" cy="235" r="16" fill="#20283c" stroke="#5bbbe9" strokeWidth="3"/>
            </svg>
            <div className="hero-art-bottom"><span>CONSOLE CULTURE</span><span>AHMEDABAD / INDIA</span></div>
          </div>
          <div className="hero-copy">
            <p className="hero-overline"><span /> A GAMING SPOT IN AHMEDABAD</p>
            <h1>Make room<br />for <em>one more</em><br />round.</h1>
            <p className="hero-description">Bring your friends, pick your game and settle in. The Crown Of Console is on Science City Road — your next session is closer than you think.</p>
            <div className="hero-buttons">
              <a className="button button-bright" href="#plan">Plan a visit <ArrowUpRight size={17} /></a>
              <a className="hero-text-link" href="#story">Get to know the place <ArrowDown size={15} /></a>
            </div>
          </div>
          <div className="hero-caption"><span>THE CROWN OF CONSOLE</span><span>AHMEDABAD · GUJARAT</span></div>
          <div className="hero-side-note">A PLACE TO PLAY, NOT JUST PASS THE TIME.</div>
        </section>

        <section className="intro section-wrap" id="story">
          <SectionLabel number="01">A LITTLE ABOUT US</SectionLabel>
          <div className="intro-grid">
            <h2>Good games.<br /><span>Better company.</span></h2>
            <div className="intro-copy">
              <p className="intro-lead">Some plans don’t need much explaining. Get your people together, choose what to play and make an evening of it.</p>
              <p>The Crown Of Console is a gaming cafe on Science City Road. Whether you’re dropping in on your own or bringing a group, get in touch before you arrive and we’ll help you work out the details.</p>
              <a className="inline-link" href={whatsappUrl('Hello! I’d like to know more about The Crown Of Console.')} target="_blank" rel="noreferrer">Ask us a question <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="principles">
            <article><span className="principle-no">01</span><Monitor size={21} /><h3>Settle in</h3><p>Find your spot, get comfortable and take a moment to get into the game.</p></article>
            <article><span className="principle-no">02</span><Gamepad2 size={21} /><h3>Play your way</h3><p>Have a title in mind? Ask the team what’s available before you visit.</p></article>
            <article><span className="principle-no">03</span><Users size={21} /><h3>Bring your crew</h3><p>Planning a group session? Let us know how many players are coming.</p></article>
          </div>
        </section>

        <section className="details-band" id="details">
          <div className="details-photo">
            <div className="campaign-poster">
              <span className="campaign-topline">THE CROWN OF CONSOLE <i> / CC-02</i></span>
              <div className="campaign-crown"><Crown size={54}/></div>
              <div className="campaign-headline">SATURDAY<br/><em>NIGHT</em></div>
              <div className="campaign-subline">GAMING KINGDOM AWAITS.</div>
              <div className="campaign-controller"><Gamepad2 size={68} strokeWidth={1}/></div>
              <span className="campaign-bottomline">MAKE IT A NIGHT TO REMEMBER</span>
            </div>
          </div>
          <div className="details-copy">
            <SectionLabel number="02">A QUICK NOTE BEFORE YOU COME</SectionLabel>
            <h2>Know before<br /><em>you go.</em></h2>
            <p>We’d rather give you the right information than guess. Rates, game availability and session timings are best confirmed directly with the team.</p>
            <div className="detail-list">
              <div><Clock3 size={18} /><span><b>Checking timings</b><small>Message us for current opening hours.</small></span></div>
              <div><Monitor size={18} /><span><b>Checking games</b><small>Ask about the title or platform you want.</small></span></div>
              <div><Users size={18} /><span><b>Coming as a group</b><small>Share your group size when you enquire.</small></span></div>
            </div>
            <a className="button button-outline" href={whatsappUrl('Hello! Could you please share your current opening hours, game list and rates?')} target="_blank" rel="noreferrer">Get the latest details <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section className="plan section-wrap" id="plan">
          <div className="plan-intro">
            <SectionLabel number="03">MAKE A PLAN</SectionLabel>
            <h2>Let’s get<br /><span>you playing.</span></h2>
            <p>Send a few details over WhatsApp. No payment, account or complicated booking process — just a conversation with the people at the cafe.</p>
            <div className="plan-note"><MessageCircle size={18} /><span><b>Direct with the team</b><small>Your enquiry opens WhatsApp with the details you entered. You can review the message before sending it.</small></span></div>
          </div>
          <VisitForm />
        </section>

        <section className="faq section-wrap">
          <div className="faq-intro"><SectionLabel number="04">THE USUAL QUESTIONS</SectionLabel><h2>Before you<br /><em>head out.</em></h2></div>
          <div className="faq-list">
            {questions.map((item, index) => <details className="faq-item" key={item.question} open={index === 0}><summary>{item.question}<ChevronDown size={18} /></summary><p>{item.answer}</p></details>)}
          </div>
        </section>

        <section className="visit" id="visit">
          <div className="visit-left">
            <SectionLabel number="05">COME SAY HELLO</SectionLabel>
            <h2>See you<br /><em>at the cafe.</em></h2>
            <p>We’re at Shakti Arcade, on Science City Road. Save the address or open directions before you set off.</p>
            <div className="address-block"><MapPin size={19} /><div><b>The Crown Of Console</b><span>FF/1, Shakti Arcade,<br />Above Kutchi King, Near ICICI Bank,<br />Science City Road, Ahmedabad</span></div></div>
            <div className="visit-actions"><button className="copy-button" onClick={copyAddress}>{copied ? <Check size={15} /> : <MapPin size={15} />}{copied ? 'Copied' : 'Copy address'}</button><a className="inline-link" href={MAP_URL} target="_blank" rel="noreferrer">Open directions <ArrowUpRight size={15} /></a></div>
            <a className="phone-link" href="tel:+918799508567"><Phone size={17} /> +91 87995 08567</a>
          </div>
          <a className="map-panel" href={MAP_URL} target="_blank" rel="noreferrer" aria-label="Open The Crown Of Console location in Google Maps">
            <div className="map-grid" /><div className="map-pin"><MapPin size={25} /></div><span className="map-panel-label">SCIENCE CITY ROAD · AHMEDABAD</span><span className="map-panel-action">GET DIRECTIONS <ArrowUpRight size={15} /></span>
          </a>
        </section>
      </main>
      <footer className="footer">
        <a className="wordmark footer-mark" href="#home"><BrandMark /><span>THE CROWN <small>OF</small> CONSOLE</span></a>
        <p>Good games are better shared.</p>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} THE CROWN OF CONSOLE</span><span>SCIENCE CITY ROAD, AHMEDABAD</span><a href="#home">BACK TO TOP ↑</a></div>
      </footer>
    </>
  )
}

export default App
