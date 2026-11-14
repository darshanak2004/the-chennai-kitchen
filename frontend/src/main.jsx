import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, Clock3, Facebook, Instagram, MapPin, Menu, Phone, Minus, Plus, Utensils, X, Youtube } from 'lucide-react'
import './style.css'

const initialGallery = [
  { id: 'g1', title: 'House special chicken biryani', image_url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=1300&q=85', category: 'Biryani' },
  { id: 'g2', title: 'A table set for sharing', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1100&q=85', category: 'From the kitchen' },
  { id: 'g3', title: 'Golden, flaky parotta', image_url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1100&q=85', category: 'South Indian' },
  { id: 'g4', title: 'Slow-cooked, full of flavour', image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1100&q=85', category: 'From the kitchen' },
  { id: 'g5', title: 'A little something sweet', image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1100&q=85', category: 'Something sweet' },
]
const HASH = !!window.__HASH_ROUTER
const ADDRESS = 'Bus stop, Madras Thiruvallur High Rd, OT, Ambattur, Chennai, Tamil Nadu 600058'
const POSTER = '/poster.jpg'
const PAGES = ['home', 'about', 'gallery', 'contact', 'admin']
const TITLES = { home: 'A taste of home', about: 'About us', gallery: 'Gallery', contact: 'Reserve a table & contact', admin: 'Admin' }
const routeOf = () => { const p = HASH ? window.location.hash.slice(1) : window.location.pathname.replace(/^\/|\/$/g, ''); return PAGES.includes(p) ? p : 'home' }
function useRoute() {
  const [route, setRoute] = useState(routeOf)
  useEffect(() => {
    const sync = () => { setRoute(routeOf()); window.scrollTo(0, 0) }
    window.addEventListener(HASH ? 'hashchange' : 'popstate', sync)
    return () => window.removeEventListener(HASH ? 'hashchange' : 'popstate', sync)
  }, [])
  const go = name => {
    if (HASH) { if (routeOf() === name) window.scrollTo(0, 0); else window.location.hash = name; return }
    window.history.pushState({}, '', name === 'home' ? '/' : `/${name}`); setRoute(name); window.scrollTo(0, 0)
  }
  return [route, go]
}
const XIcon = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
const socials = [
  { name: 'Instagram', url: 'https://instagram.com/thechennaikitchen', Icon: Instagram },
  { name: 'YouTube', url: 'https://youtube.com/@thechennaikitchen', Icon: Youtube },
  { name: 'Facebook', url: 'https://facebook.com/thechennaikitchen', Icon: Facebook },
  { name: 'X (Twitter)', url: 'https://x.com/thechennaikitchen', Icon: XIcon },
]
const heroStages = [
  { title: <>Piled high,<br/>made fresh.</>, text: 'Basmati, golden fried onions and boiled egg, layered in a heavy pot and sealed on dum.' },
  { title: <>Served<br/>with care.</>, text: 'Every piece of spiced chicken is lifted and placed by hand, so each plate leaves the kitchen looking its best.' },
  { title: <>Fragrance<br/>first.</>, text: 'Lift the lid and the whole room knows. Slow-cooked, smoky and still steaming.' },
  { title: <>Your table<br/>is waiting.</>, text: 'Tables for two to twelve. Reserve in under a minute and we will set it for you.' },
]
const WaIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
const faqs = [
  ['Do I need to book a table?', 'Walk-ins are always welcome, but a reservation helps us have your table ready. Use the form above for parties of up to twelve.'],
  ['Can you accommodate dietary requirements?', 'We’re happy to help. Add your dietary needs in the special notes when you reserve, or speak with our team before ordering.'],
  ['Do you have vegetarian options?', 'Yes. Our menu includes vegetarian favourites alongside our biryanis and house specials. Ask our team about today’s selection.'],
  ['Can I contact you on WhatsApp?', 'Absolutely. Tap the green WhatsApp button to start a conversation with our team.'],
]

async function api(path, options = {}) {
  const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}), ...options.headers } })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.error || 'Something went wrong. Please try again.')
  return body
}

function HeroSequence({ onStage }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: false })
    if (!canvas || !context) return

    const images = Array.from({ length: 95 }, (_, index) => {
      const image = new Image()
      image.src = window.__HERO ? window.__HERO[index] : `/hero/${String(index).padStart(3, '0')}.jpg`
      image.onload = draw
      return image
    })
    let current = 12
    let target = 12
    let animation = 0
    let pixelRatio = 1
    let stage = 0

    function resize() {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const bounds = canvas.getBoundingClientRect()
      canvas.width = Math.round(bounds.width * pixelRatio)
      canvas.height = Math.round(bounds.height * pixelRatio)
      draw()
    }
    function draw() {
      const width = canvas.width
      const height = canvas.height
      if (!width || !height) return
      const preferred = Math.round(current)
      let image = images[preferred]
      if (!image?.complete || !image.naturalWidth) {
        for (let distance = 1; distance < images.length; distance++) {
          const before = images[Math.max(0, preferred - distance)]
          const after = images[Math.min(images.length - 1, preferred + distance)]
          if (before?.complete && before.naturalWidth) { image = before; break }
          if (after?.complete && after.naturalWidth) { image = after; break }
        }
      }
      if (!image?.complete || !image.naturalWidth) return
      const mobile = window.innerWidth < 820
      const scale = mobile ? (width * 1.3) / image.naturalWidth : Math.max(width / image.naturalWidth, height / image.naturalHeight)
      const drawWidth = image.naturalWidth * scale
      const drawHeight = image.naturalHeight * scale
      const x = mobile ? width / 2 - drawWidth * 0.525 : (width - drawWidth) / 2 + width * 0.1
      const y = mobile ? height - drawHeight - 40 * pixelRatio : (height - drawHeight) / 2
      context.clearRect(0, 0, width, height)
      context.drawImage(image, x, y, drawWidth, drawHeight)
    }
    function animate() {
      current += (target - current) * 0.14
      if (Math.abs(target - current) < 0.02) current = target
      draw()
      animation = Math.abs(target - current) < 0.02 ? 0 : requestAnimationFrame(animate)
    }
    function updateTarget() {
      const track = document.getElementById('hero-track')
      if (!track) return
      const range = track.offsetHeight - window.innerHeight
      const progress = range > 0 ? Math.max(0, Math.min(1, (window.scrollY - track.offsetTop) / range)) : 0
      target = 12 + progress * 82
      const next = Math.min(3, Math.floor(progress * 4))
      if (next !== stage) { stage = next; onStage?.(next) }
      if (!animation) animation = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', resize)
    resize()
    updateTarget()
    return () => {
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animation)
    }
  }, [])

  return <canvas className="hero-canvas" ref={canvasRef} aria-label="Biryani being served, from the supplied hero sequence" role="img" />
}

function App() {
  const [gallery, setGallery] = useState(initialGallery)
  const [heroMedia, setHeroMedia] = useState([])
  const [phone, setPhone] = useState(import.meta.env.VITE_WHATSAPP_PHONE || '919566577729')
  const [menuOpen, setMenuOpen] = useState(false)
  const [route, go] = useRoute()
  const page = route === 'admin' ? 'home' : route
  const [faqOpen, setFaqOpen] = useState(-1)
  const [form, setForm] = useState({ name: '', date: '', time: '', members: '2', note: '' })
  const [bookingState, setBookingState] = useState('')
  const [adminOpen, setAdminOpen] = useState(false)
  const [token, setToken] = useState(sessionStorage.getItem('tck_admin_token') || '')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminError, setAdminError] = useState('')
  const [adminTab, setAdminTab] = useState('gallery')
  const [newMedia, setNewMedia] = useState({ title: '', image_url: '', category: 'From the kitchen', media_type: 'image' })
  const [heroForm, setHeroForm] = useState({ title: '', media_url: '', media_type: 'image' })
  const [uploading, setUploading] = useState(false)
  const [adminNotice, setAdminNotice] = useState('')
  const [reservations, setReservations] = useState([])
  const [heroStage, setHeroStage] = useState(0)
  const [lightbox, setLightbox] = useState(-1)
  const [offerOpen, setOfferOpen] = useState(false)
  useEffect(() => {
    if (routeOf() === 'admin') return
    const timer = setTimeout(() => setOfferOpen(true), 400)
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (!offerOpen) return
    const onKey = e => { if (e.key === 'Escape') setOfferOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [offerOpen])

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement, max = root.scrollHeight - window.innerHeight
      root.style.setProperty('--sp', max > 0 ? window.scrollY / max : 0)
      document.body.classList.toggle('scrolled', window.scrollY > 40)
    }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) } }), { threshold: 0.12 })
    document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [gallery, page])
  useEffect(() => { setAdminOpen(route === 'admin'); document.title = `The Chennai Kitchenn — ${TITLES[route]}`; if (page === 'home') setHeroStage(0) }, [route])
  const closeAdmin = () => { setAdminOpen(false); if (route === 'admin') go('home') }
  const stepLightbox = d => setLightbox(i => (i + d + gallery.length) % gallery.length)
  useEffect(() => {
    if (lightbox < 0) return
    const onKey = e => { if (e.key === 'Escape') setLightbox(-1); if (e.key === 'ArrowRight') stepLightbox(1); if (e.key === 'ArrowLeft') stepLightbox(-1) }
    window.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightbox, gallery.length])

  useEffect(() => {
    api('/content').then(data => {
      if (data.gallery?.length) setGallery(data.gallery)
      if (data.heroMedia) setHeroMedia(data.heroMedia)
      if (data.whatsappPhone) setPhone(data.whatsappPhone)
    }).catch(() => {})
  }, [])
  const goTo = id => { setMenuOpen(false); go({ home: 'home', story: 'about', gallery: 'gallery', reserve: 'contact', visit: 'home' }[id] || 'home') }
  const jumpTo = id => { if (page === 'home') document.getElementById({ story: 'story', gallery: 'gallery', reserve: 'reserve' }[id])?.scrollIntoView({ behavior: 'smooth' }); else goTo(id) }
  const whatsappUrl = (message = 'Hello The Chennai Kitchen! I have a question.') => phone ? `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`
  const updateForm = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submitBooking = async e => {
    e.preventDefault(); setBookingState('sending')
    const message = `Hello The Chennai Kitchen! I'd like to reserve a table.\n\nName: ${form.name}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.members}${form.note ? `\nSpecial note: ${form.note}` : ''}`
    const wa = window.open('', '_blank') // opened inside the click so phones do not block it
    try {
      await api('/reservations', { method: 'POST', body: JSON.stringify(form) })
      setBookingState('sent')
    } catch (err) { setBookingState(err.message === 'Failed to fetch' ? 'offline' : 'error') }
    if (wa) { wa.opener = null; wa.location.href = whatsappUrl(message) } else window.location.href = whatsappUrl(message)
  }
  const refreshAdmin = async () => {
    const [data, bookings] = await Promise.all([api('/admin/content', { token }), api('/admin/reservations', { token })])
    setGallery(data.gallery); setHeroMedia(data.heroMedia); setPhone(data.whatsappPhone || ''); setReservations(bookings.reservations || [])
  }
  const loginAdmin = async e => {
    e.preventDefault(); setAdminError('')
    try { const data = await api('/admin/login', { method: 'POST', body: JSON.stringify({ password: adminPassword }) }); setToken(data.token); sessionStorage.setItem('tck_admin_token', data.token); setAdminPassword(''); await refreshAdmin() }
    catch (err) { setAdminError(err.message) }
  }
  useEffect(() => { if (token && adminOpen) refreshAdmin().catch(() => { setToken(''); sessionStorage.removeItem('tck_admin_token') }) }, [token, adminOpen])
  const uploadFile = async (file) => {
    setUploading(true)
    setAdminNotice(`Uploading ${file.name} to Cloudinary...`)
    try {
      const sign = await api('/admin/cloudinary-sign', { token })
      const data = new FormData()
      data.append('file', file)
      data.append('api_key', sign.apiKey)
      data.append('timestamp', sign.timestamp)
      data.append('folder', sign.folder)
      data.append('signature', sign.signature)

      const res = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/auto/upload`, {
        method: 'POST',
        body: data,
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error?.message || 'Upload to Cloudinary failed.')
      setAdminNotice('Upload successful! Form filled automatically.')
      return { url: result.secure_url, mediaType: result.resource_type === 'video' ? 'video' : 'image' }
    } catch (err) {
      setAdminNotice(`Upload error: ${err.message}`)
      throw err
    } finally {
      setUploading(false)
    }
  }
  const addGallery = async e => { e.preventDefault(); try { await api('/admin/gallery', { method: 'POST', token, body: JSON.stringify(newMedia) }); setNewMedia({ title: '', image_url: '', category: 'From the kitchen', media_type: 'image' }); setAdminNotice('Gallery item added.'); await refreshAdmin() } catch (err) { setAdminNotice(err.message) } }
  const addHero = async e => { e.preventDefault(); try { await api('/admin/hero-media', { method: 'POST', token, body: JSON.stringify(heroForm) }); setHeroForm({ title: '', media_url: '', media_type: 'image' }); setAdminNotice('Home media added.'); await refreshAdmin() } catch (err) { setAdminNotice(err.message) } }
  const removeItem = async (kind, id) => { try { await api(`/admin/${kind}/${id}`, { method: 'DELETE', token }); setAdminNotice(kind === 'reservations' ? 'Booking removed.' : 'Item removed. Its URL record has been deleted from the database.'); await refreshAdmin() } catch (err) { setAdminNotice(err.message) } }
  const savePhone = async e => { e.preventDefault(); try { await api('/admin/settings', { method: 'PUT', token, body: JSON.stringify({ whatsappPhone: phone }) }); setAdminNotice('WhatsApp number saved.') } catch (err) { setAdminNotice(err.message) } }
  const currentCopy = heroStages[heroStage]
  const currentMedia = heroMedia[0]
  const heroUrl = currentMedia?.media_url

  const heroSection = (
      <div className="hero-track" id="hero-track"><section className="hero" id="home">
        {currentMedia?.media_type === 'video' ? <video className="hero-image hero-video" src={heroUrl} autoPlay muted loop playsInline aria-label={currentMedia.title}/> : currentMedia ? <div className="hero-image" style={{ backgroundImage: `url("${heroUrl}")` }}></div> : <HeroSequence onStage={setHeroStage}/>}<div className="hero-vignette"></div><div className="hero-grain"></div>
        <div className="hero-content" key={heroStage}><span className="eyebrow"><span></span> MADE SLOW. SHARED GENEROUSLY.</span><h1>{currentCopy.title}</h1><p>{currentCopy.text}</p><button className="gold-button" onClick={() => jumpTo('reserve')}>Reserve a table<ArrowRight size={17}/></button></div>
        <div className="hero-caption"><span>THE ART OF DUM</span></div>
        <button className="scroll-hint" onClick={() => jumpTo('story')}>SCROLL TO SAVOR <ArrowDown size={14}/></button>
        <div className="hero-note"><span className="note-line"></span><span>Cooked with patience,<br/>served with heart.</span></div>
      </section></div>
  )
  const visitSection = (
      <section className="visit-section" id="visit"><div className="visit-copy reveal"><span className="eyebrow dark"><span></span> COME FIND YOUR CORNER</span><h2>There’s always<br/><em>room at our table.</em></h2><p>Bring your appetite, bring your people. We’ll be right here.</p><div className="visit-details"><span><MapPin size={17}/><span>Ambattur, Chennai<br/><small>{ADDRESS}</small></span></span><span><Clock3 size={17}/><span>Grand opening<br/><small>Sunday, 15 November 2026</small></span></span><span><Phone size={17}/><span>Call us<br/><small><a href="tel:+919894464472">98944 64472</a> · <a href="tel:+919047470444">90474 70444</a></small></span></span></div><button className="text-link" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`, '_blank', 'noopener')}>Open in Google Maps <ArrowUpRight size={16}/></button></div><div className="map-wrap reveal"><iframe title="Map of The Chennai Kitchen, Ambattur" src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=16&ie=UTF8&iwloc=&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe><span className="map-tag"><MapPin size={14}/> AMBATTUR, CHENNAI</span></div></section>
  )
  const introSection = (
      <section className="intro-section" id="story"><div className="intro-kicker"><span>01</span><i></i> A TABLE FOR EVERYONE</div><div className="intro-copy reveal"><h2>Good food brings<br/><em>us together.</em></h2><div className="intro-text"><p>At The Chennai Kitchen, we believe the best meals are never rushed. They begin with familiar spices, the slow perfume of a pot on dum, and the people you love gathered around the table.</p><p>Rooted in the flavours of South India and made for sharing, every plate carries a little warmth from our kitchen to yours.</p><button className="text-link" onClick={() => jumpTo('gallery')}>A peek into our kitchen <ArrowRight size={16}/></button></div></div><div className="about-cards reveal">{[[Utensils, 'Cooked on dum', 'Rice and meat sealed in the pot and left to slow-cook until every grain carries the masala.'], [Clock3, 'Made fresh daily', 'Spices are ground and marinades prepared each morning, so nothing sits around.'], [Check, 'Biryani and beyond', 'From dum biryani to South Indian favourites and Indo-Chinese plates, all under one roof.']].map(([Icon, t, d]) => <article key={t}><Icon size={22}/><h3>{t}</h3><p>{d}</p></article>)}</div><div className="intro-bottom"><span>FROM OUR KITCHEN, WITH LOVE</span><span>13° 04' N — CHENNAI</span></div></section>
  )
  const foodSection = (
      <section className="food-section" id="gallery"><div className="section-heading reveal"><div><span className="eyebrow dark"><span></span> SOMETHING GOOD IS COOKING</span><h2>A few of our<br/><em>favourite things.</em></h2></div><p>Big-hearted plates, familiar favourites, and a few reasons to stay for one more bite.</p></div>
        <div className="food-grid">{gallery.map((item, i) => <article className={`food-card food-card-${i + 1} reveal`} style={{ '--d': `${i * 80}ms` }} key={item.id} role="button" tabIndex={0} aria-label={`View ${item.title}`} onClick={() => setLightbox(i)} onKeyDown={e => e.key === 'Enter' && setLightbox(i)}>{item.media_type === 'video' ? <video src={item.image_url} aria-label={item.title} muted autoPlay loop playsInline preload="metadata"/> : <img src={item.image_url} alt={item.title} loading="lazy" onError={e => { e.currentTarget.style.opacity = 0 }}/>}<div className="food-overlay"></div><div className="food-card-caption"><span>{item.category || 'From our kitchen'}</span><h3>{item.title}</h3></div><span className="food-index">{String(i + 1).padStart(2, '0')}</span></article>)}</div>
        <div className="food-foot"><span>MADE TO BE PASSED AROUND</span><button className="outline-button" onClick={() => jumpTo('reserve')}>Come hungry <ArrowRight size={16}/></button></div>
      </section>
  )
  const quoteSection = (
      <section className="quote-band reveal"><div className="quote-decoration">“</div><p>The secret ingredient is always<br/><em>one more person at the table.</em></p><span>— OUR KIND OF RECIPE</span></section>
  )
  const reserveSection = (
      <section className="reserve-section" id="reserve"><div className="reserve-photo reveal"><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1300&q=85" alt="Warm restaurant dining room" loading="lazy"/><div className="photo-label"><span>THE GOOD SEATS</span><span>ARE WAITING</span></div></div><div className="reserve-content reveal"><span className="eyebrow"><span></span> PULL UP A CHAIR</span><h2>Save a place<br/><em>for you.</em></h2><p className="reserve-intro">Tell us when you’re coming. We’ll set the table and be ready with something delicious.</p>
          <form className="booking-form" onSubmit={submitBooking}><label>Your name<input name="name" value={form.name} onChange={updateForm} placeholder="What should we call you?" required maxLength="100"/></label><div className="form-row"><label>Date<input type="date" name="date" value={form.date} onChange={updateForm} min={new Date().toISOString().slice(0, 10)} required/></label><label>Time<select name="time" value={form.time} onChange={updateForm} required><option value="">Choose a time</option>{['12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM'].map(t => <option key={t}>{t}</option>)}</select></label></div><div className="form-row"><label>Number of guests<select name="members" value={form.members} onChange={updateForm}>{Array.from({length: 12}, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} {i ? 'guests' : 'guest'}</option>)}</select></label><label>Special note <span className="optional">(optional)</span><input name="note" value={form.note} onChange={updateForm} placeholder="A birthday, a little extra spice…" maxLength="500"/></label></div><button className="gold-button submit-button" type="submit" disabled={bookingState === 'sending'}>{bookingState === 'sending' ? 'Sending…' : 'Request your table'}<ArrowRight size={17}/></button>{bookingState === 'sent' && <p className="form-message success"><Check size={15}/> Reservation saved. Finish sending your request in WhatsApp.</p>}{bookingState === 'offline' && <p className="form-message">WhatsApp is ready. Connect the backend to save reservations.</p>}{bookingState === 'error' && <p className="form-message">We couldn’t save your request, but you can still send it on WhatsApp.</p>}</form>
          <p className="reserve-whatsapp"><span className="wa-small"><WaIcon/></span> Your request opens in WhatsApp so our team can confirm your table.</p></div></section>
  )
  const socialSection = (
      <section className="social-section"><div className="reveal"><span className="eyebrow dark"><span></span> FIND US ONLINE</span><h2>Follow along,<br/><em>say hello.</em></h2></div><div className="social-row reveal">{socials.map(s => <a key={s.name} href={s.url} target="_blank" rel="noreferrer"><s.Icon size={20}/><span>{s.name}</span></a>)}</div></section>
  )
  const faqSection = (
      <section className="faq-section"><div className="faq-heading reveal"><span className="eyebrow"><span></span> GOOD TO KNOW</span><h2>A few little<br/><em>things you asked.</em></h2></div><div className="faq-list">{faqs.map(([q, a], i) => <div className={`faq-item reveal ${faqOpen === i ? 'expanded' : ''}`} style={{ '--d': `${i * 70}ms` }} key={q}><button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}><span>{q}</span>{faqOpen === i ? <Minus size={17}/> : <Plus size={17}/>}</button><div className="faq-answer"><p>{a}</p></div></div>)}</div></section>
  )
  return <>
    <div className="scroll-progress" aria-hidden="true"></div>
    <div className="announcement offer-bar"><button className="offer-msg" onClick={() => setOfferOpen(true)} aria-label="View the opening offer poster"><i>Grand opening · 15 Nov</i><strong>Buy 1 biryani, get 1 free</strong><span>Offer days 15 – 18 November 2026</span></button></div>
    <header className="site-header"><a className="brand" href={HASH ? '#home' : '/'} onClick={e => { e.preventDefault(); goTo('home') }} aria-label="The Chennai Kitchen home"><img className="brand-logo" src="/logo.jpg" alt="The Chennai Kitchen — Authentic non-veg cuisine"/><span className="brand-text">The Chennai Kitchenn</span></a>
      <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>{[['home', 'Home'], ['about', 'About'], ['gallery', 'Gallery'], ['contact', 'Contact']].map(([r, label]) => <button key={r} className={page === r ? 'active' : ''} onClick={() => goTo(r === 'about' ? 'story' : r === 'contact' ? 'reserve' : r)}>{label}</button>)}</nav>
      <button className="header-reserve" onClick={() => goTo('reserve')}>Book a table <ArrowUpRight size={15}/></button><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main key={page} className="page">
      {page === 'home' && <>{heroSection}{visitSection}{introSection}{foodSection}{quoteSection}{reserveSection}{faqSection}</>}
      {page === 'about' && <>{introSection}{quoteSection}</>}
      {page === 'gallery' && <>{foodSection}</>}
      {page === 'contact' && <>{reserveSection}{socialSection}{faqSection}</>}
    </main>

    <footer className="footer"><div className="footer-main"><a className="brand footer-brand" href={HASH ? '#home' : '/'} onClick={e => { e.preventDefault(); goTo('home') }} aria-label="The Chennai Kitchen home"><img className="brand-logo" src="/logo.jpg" alt="The Chennai Kitchen — Authentic non-veg cuisine"/></a><p>Familiar flavours.<br/>A seat saved for you.</p><div className="footer-links"><button onClick={() => go('admin')}>Admin sign in</button><a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight size={14}/></a><a href="tel:+919894464472">Call 98944 64472</a><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <Instagram size={14}/></a></div></div><div className="footer-bottom"><span>© 2026 THE CHENNAI KITCHEN</span><span>MADE WITH A LITTLE EXTRA GHEE</span><a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>BACK TO TOP ↑</a></div></footer>

    <a className="whatsapp-float" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Contact us on WhatsApp"><span className="wa-pulse"></span><WaIcon/><span>Chat with us</span></a>

    {offerOpen && <div className="offer-backdrop" onClick={() => setOfferOpen(false)}><div className="poster-pop" role="dialog" aria-modal="true" aria-label="Grand opening offer: buy 1 biryani, get 1 free" onClick={e => e.stopPropagation()}><button className="poster-close" onClick={() => setOfferOpen(false)} aria-label="Close offer"><X size={20}/></button><img src={POSTER} alt="The Chennai Kitchen grand opening on 15 November 2026. Offer days 15 to 18 November: buy 1 biryani, get 1 free."/></div></div>}
    {lightbox >= 0 && gallery[lightbox] && <div className="lightbox" role="dialog" aria-modal="true" onClick={e => { if (e.target === e.currentTarget) setLightbox(-1) }}><button className="lb-close" onClick={() => setLightbox(-1)} aria-label="Close"><X size={22}/></button><button className="lb-nav lb-prev" onClick={() => stepLightbox(-1)} aria-label="Previous"><ArrowRight size={22}/></button>{gallery[lightbox].media_type === 'video' ? <video key={lightbox} src={gallery[lightbox].image_url} controls autoPlay loop playsInline/> : <img key={lightbox} src={gallery[lightbox].image_url} alt={gallery[lightbox].title}/>}<button className="lb-nav lb-next" onClick={() => stepLightbox(1)} aria-label="Next"><ArrowRight size={22}/></button><p><span>{gallery[lightbox].category}</span>{gallery[lightbox].title}<em>{lightbox + 1} / {gallery.length}</em></p></div>}
    {adminOpen && <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) closeAdmin() }}><section className="admin-modal"><button className="modal-close" onClick={() => closeAdmin()} aria-label="Close"><X size={18}/></button>{!token ? <div className="admin-login"><span className="eyebrow dark"><span></span> THE BACK OF HOUSE</span><h2>Admin sign in</h2><p>Manage the photos and videos visitors see on your site.</p><form onSubmit={loginAdmin}><label>Admin password<input type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} required autoFocus/></label><button className="gold-button">Sign in <ArrowRight size={16}/></button>{adminError && <p className="form-message">{adminError}</p>}</form></div> : <div className="admin-dashboard"><div className="admin-top"><div><span className="eyebrow dark"><span></span> THE BACK OF HOUSE</span><h2>Content studio</h2></div><button className="signout" onClick={() => { setToken(''); sessionStorage.removeItem('tck_admin_token') }}>Sign out</button></div><div className="admin-tabs"><button className={adminTab === 'gallery' ? 'active' : ''} onClick={() => setAdminTab('gallery')}>Gallery</button><button className={adminTab === 'home' ? 'active' : ''} onClick={() => setAdminTab('home')}>Home media</button><button className={adminTab === 'bookings' ? 'active' : ''} onClick={() => setAdminTab('bookings')}>Bookings{reservations.length ? ` (${reservations.length})` : ''}</button><button className={adminTab === 'settings' ? 'active' : ''} onClick={() => setAdminTab('settings')}>Contact</button></div>{adminNotice && <p className="admin-notice">{adminNotice}</p>}
      {adminTab === 'gallery' && <><form className="admin-add-form" onSubmit={addGallery}><strong>Add a gallery photo or video</strong>
        <div className="admin-upload-zone">
          <label className={`admin-file-label ${uploading ? 'uploading' : ''}`}>
            <input type="file" accept="image/*,video/*" style={{ display: 'none' }} disabled={uploading} onChange={async e => {
              const file = e.target.files?.[0]
              if (!file) return
              try {
                const { url, mediaType } = await uploadFile(file)
                setNewMedia(m => ({ ...m, image_url: url, media_type: mediaType, title: m.title || file.name.replace(/\.[^/.]+$/, '') }))
              } catch {}
            }} />
            <span>{uploading ? '⏳ Uploading...' : '📁 Upload photo / video'}</span>
          </label>
          <span className="admin-upload-hint">or paste URL below</span>
        </div>
        <input value={newMedia.title} onChange={e => setNewMedia({ ...newMedia, title: e.target.value })} placeholder="Title" required/><input type="url" value={newMedia.image_url} onChange={e => setNewMedia({ ...newMedia, image_url: e.target.value })} placeholder="Public image or video URL (auto-filled on upload)" required/><div><select value={newMedia.media_type} onChange={e => setNewMedia({ ...newMedia, media_type: e.target.value })}><option value="image">Image</option><option value="video">Video</option></select><input value={newMedia.category} onChange={e => setNewMedia({ ...newMedia, category: e.target.value })} placeholder="Category"/><button className="gold-button" disabled={uploading}>Add item <Plus size={15}/></button></div></form><div className="admin-items">{gallery.map(item => <article key={item.id}>{item.media_type === 'video' ? <div className="video-thumb">VIDEO</div> : <img src={item.image_url} alt=""/>}<span><strong>{item.title}</strong><small>{item.category || 'Gallery'} · {item.media_type || 'image'}</small></span><button onClick={() => removeItem('gallery', item.id)} aria-label={`Delete ${item.title}`}><X size={17}/></button></article>)}</div></>}
      {adminTab === 'home' && <><form className="admin-add-form" onSubmit={addHero}><strong>Add home section media</strong>
        <div className="admin-upload-zone">
          <label className={`admin-file-label ${uploading ? 'uploading' : ''}`}>
            <input type="file" accept="image/*,video/*" style={{ display: 'none' }} disabled={uploading} onChange={async e => {
              const file = e.target.files?.[0]
              if (!file) return
              try {
                const { url, mediaType } = await uploadFile(file)
                setHeroForm(m => ({ ...m, media_url: url, media_type: mediaType, title: m.title || file.name.replace(/\.[^/.]+$/, '') }))
              } catch {}
            }} />
            <span>{uploading ? '⏳ Uploading...' : '📁 Upload photo / video'}</span>
          </label>
          <span className="admin-upload-hint">or paste URL below</span>
        </div>
        <input value={heroForm.title} onChange={e => setHeroForm({ ...heroForm, title: e.target.value })} placeholder="Short title" required/><input type="url" value={heroForm.media_url} onChange={e => setHeroForm({ ...heroForm, media_url: e.target.value })} placeholder="Public image or video URL (auto-filled on upload)" required/><div><select value={heroForm.media_type} onChange={e => setHeroForm({ ...heroForm, media_type: e.target.value })}><option value="image">Image</option><option value="video">Video</option></select><button className="gold-button" disabled={uploading}>Add to home <Plus size={15}/></button></div></form><p className="admin-help">Media is uploaded to your Cloudinary storage and saved to your Neon database.</p><div className="admin-items">{heroMedia.map(item => <article key={item.id}>{item.media_type === 'video' ? <div className="video-thumb">VIDEO</div> : <img src={item.media_url} alt=""/>}<span><strong>{item.title}</strong><small>Home section · {item.media_type}</small></span><button onClick={() => removeItem('hero-media', item.id)} aria-label={`Delete ${item.title}`}><X size={17}/></button></article>)}</div></>}
      {adminTab === 'bookings' && <div className="admin-items bookings">{reservations.length ? reservations.map(b => <article key={b.id}><span><strong>{b.name} · {b.members} {b.members === 1 ? 'guest' : 'guests'}</strong><small>{b.date} at {b.time}{b.note ? ` · ${b.note}` : ''}</small></span><button onClick={() => removeItem('reservations', b.id)} aria-label={`Delete booking for ${b.name}`}><X size={17}/></button></article>) : <p className="admin-help">No reservations yet. New requests appear here as soon as guests send them.</p>}</div>}
      {adminTab === 'settings' && <form className="admin-add-form settings-form" onSubmit={savePhone}><strong>WhatsApp contact</strong><p>Use the full country code and number without spaces, for example 919876543210.</p><label>WhatsApp number<input value={phone} onChange={e => setPhone(e.target.value)} placeholder="919876543210"/></label><button className="gold-button">Save number <Check size={15}/></button></form>}</div>}</section></div>}
  </>
}

const rootElement = document.getElementById('root')
const root = rootElement._reactRoot || (rootElement._reactRoot = createRoot(rootElement))
root.render(<App />)
