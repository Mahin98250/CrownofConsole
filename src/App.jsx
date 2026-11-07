import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Crown, Gamepad2, Headphones,
  MapPin, Menu, Monitor, MousePointer2, Phone, ShieldCheck, Sparkles, Trophy, X, Zap
} from 'lucide-react'

const PHONE = '918799508567'
const ADDRESS = 'FF/1, Shakti Arcade, Science City Road, Ahmedabad, Gujarat 380060'
const whatsapp = (message) => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`

const nav = [
  ['Experience', '#experience'],
  ['The arena', '#arena'],
  ['Visit us', '#visit'],
]

const features = [
  { icon: Monitor, number: '01', title: 'The setup', text: 'A dedicated space to get in the zone. Ask our team about the gaming stations and available hardware before your visit.' },
  { icon: Headphones, number: '02', title: 'Get immersed', text: 'Bring your focus, find your game and settle into the experience with your crew.' },
  { icon: Trophy, number: '03', title: 'Play together', text: 'Challenge your friends, sharpen your skills and ask us about upcoming community events.' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`, '_blank')
    }
  }

  return (
    <main>
      <div className="announcement"><span className="live-dot" /> SCIENCE CITY ROAD, AHMEDABAD <span className="announce-divider">/</span> YOUR NEXT GAME STARTS HERE</div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="The Crown Of Console home">
          <span className="brand-mark"><Crown size={23} strokeWidth={1.7} /></span>
          <span className="brand-name">THE CROWN <i>OF</i> CONSOLE</span>
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-cta" href={whatsapp('Hi! I would like to enquire about a gaming session at The Crown Of Console.')} target="_blank" rel="noreferrer">Enquire now <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" />
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="hero-content">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <span className="eyebrow-line" /> THE GAMING DESTINATION <span className="eyebrow-line" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .08 }}>
            RULE<br /><span>THE</span> GAME<span className="period">.</span>
          </motion.h1>
          <motion.p className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .2 }}>
            Lock in. Level up. Make every session count.<br className="desktop-break" /> Your gaming space is waiting in Ahmedabad.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .3 }}>
            <a className="button button-primary" href={whatsapp('Hi! I would like to enquire about gaming availability and rates.')} target="_blank" rel="noreferrer">Plan your session <ArrowUpRight size={17} /></a>
            <a className="button button-quiet" href="#experience">Explore the experience <ArrowDownRight size={17} /></a>
          </motion.div>
          <div className="hero-footnote"><span>01 / 03</span><span className="footnote-line" /><span>BUILT FOR THE LOVE OF PLAY</span></div>
        </div>
        <div className="hero-visual" aria-label="Atmospheric gaming setup illustration">
          <div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" />
          <div className="visual-card">
            <div className="visual-card-top"><span>PLAYER ONE</span><span className="status"><i /> READY</span></div>
            <div className="screen-frame">
              <div className="screen-sheen" />
              <div className="screen-crosshair">+</div>
              <div className="screen-word">PLAY<span> WITHOUT</span><br />LIMITS<span className="screen-dot">.</span></div>
              <div className="screen-caption">THE CROWN OF CONSOLE · AHMEDABAD</div>
            </div>
            <div className="visual-card-bottom"><span><Zap size={13} /> YOUR ARENA</span><span>EST. FOR PLAY</span></div>
          </div>
          <div className="floating-tag tag-top"><Sparkles size={14} /> LEVEL UP YOUR NIGHT</div>
          <div className="floating-tag tag-bottom"><Gamepad2 size={16} /> GAME ON</div>
          <div className="visual-index">CC — 001</div>
        </div>
        <a className="scroll-cue" href="#experience"><span /> SCROLL TO EXPLORE</a>
      </section>

      <section className="ticker" aria-label="Gaming atmosphere"><div className="ticker-track">{Array.from({ length: 4 }).map((_, i) => <span key={i}>FOCUS <b>✳</b> COMPETE <b>✳</b> CONNECT <b>✳</b> REPEAT <b>✳</b></span>)}</div></section>

      <section className="intro section-pad" id="experience">
        <div className="section-kicker"><span>01</span> / THE EXPERIENCE</div>
        <div className="intro-layout">
          <h2>MORE THAN<br />A <span>GAME.</span></h2>
          <div className="intro-text"><p className="lead">It's the rush before the match. The call that turns into a comeback. The one more round that becomes a story.</p><p>At The Crown Of Console, gaming is about the moments you create. Come solo, bring your squad, and make the session yours.</p><a className="text-link" href={whatsapp('Hi! Tell me more about The Crown Of Console.')} target="_blank" rel="noreferrer">GET TO KNOW US <ArrowUpRight size={16} /></a></div>
        </div>
        <div className="feature-grid">
          {features.map(({ icon: Icon, number, title, text }) => <article className="feature-card" key={number}><div className="feature-top"><span>{number}</span><Icon size={22} strokeWidth={1.5} /></div><h3>{title}</h3><p>{text}</p><div className="feature-rule" /></article>)}
        </div>
      </section>

      <section className="arena" id="arena">
        <div className="arena-image">
          <div className="arena-image-overlay" />
          <div className="arena-stamp"><Crown size={25} /><span>THE<br />CROWN</span></div>
          <div className="arena-image-caption">YOUR SPACE. YOUR GAME. YOUR RULES.</div>
        </div>
        <div className="arena-copy">
          <div className="section-kicker"><span>02</span> / ENTER THE ARENA</div>
          <h2>FIND YOUR<br /><span>FLOW.</span></h2>
          <p>Whether you're chasing a personal best or just here for a great time with friends, the best part is showing up and pressing start.</p>
          <div className="arena-points"><div><ShieldCheck size={18} /><span>A welcoming space for players</span></div><div><Gamepad2 size={18} /><span>Ask about current games and platforms</span></div><div><MousePointer2 size={18} /><span>Contact us for session availability</span></div></div>
          <a className="button button-outline" href={whatsapp('Hi! I want to know which games and platforms are currently available.')} target="_blank" rel="noreferrer">Ask about the setup <ArrowUpRight size={16} /></a>
        </div>
      </section>

      <section className="visit section-pad" id="visit">
        <div className="section-kicker"><span>03</span> / FIND YOUR WAY</div>
        <div className="visit-heading"><h2>THE NEXT<br /><span>MOVE IS YOURS.</span></h2><p>Got a game in mind? Want to know the rates? Reach out before you visit and our team can help you plan your session.</p></div>
        <div className="visit-grid">
          <div className="visit-card address-card"><div className="visit-icon"><MapPin size={22} /></div><span className="card-label">FIND THE CROWN</span><h3>Come find us.</h3><p>{ADDRESS}</p><button className="text-link button-reset" onClick={copyAddress}>{copied ? 'ADDRESS COPIED' : 'COPY ADDRESS'} <ArrowUpRight size={15} /></button><a className="map-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noreferrer">OPEN IN MAPS <ArrowUpRight size={14} /></a></div>
          <div className="visit-card contact-card"><div className="visit-icon"><Phone size={22} /></div><span className="card-label">LET'S TALK</span><h3>Make a move.</h3><p>For current rates, available games, timings and session enquiries, get in touch with us directly.</p><a className="contact-number" href="tel:+918799508567">+91 87995 08567</a><a className="button button-primary" href={whatsapp('Hi! I would like to enquire about The Crown Of Console. Please share current rates, timings and availability.')} target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowUpRight size={16} /></a></div>
        </div>
      </section>

      <section className="closing">
        <div className="closing-glow" /><div className="closing-content"><div className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT SESSION AWAITS <span className="eyebrow-line" /></div><h2>READY<br />PLAYER<span>?</span></h2><a className="button button-primary" href={whatsapp('Hi! I am ready to plan a gaming session.')} target="_blank" rel="noreferrer">LET'S PLAY <ArrowUpRight size={17} /></a></div><div className="closing-side">THE CROWN OF CONSOLE<br />AHMEDABAD · INDIA</div>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><Crown size={21} /></span><span className="brand-name">THE CROWN <i>OF</i> CONSOLE</span></a>
        <span className="footer-note">MADE FOR THE LOVE OF PLAY.</span>
        <div className="footer-links"><a href="#experience">EXPERIENCE</a><a href="#visit">CONTACT</a><a href={whatsapp('Hi!')} target="_blank" rel="noreferrer">WHATSAPP <ArrowUpRight size={12} /></a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} THE CROWN OF CONSOLE</span><span>SCIENCE CITY ROAD, AHMEDABAD</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>
    </main>
  )
}

export default App