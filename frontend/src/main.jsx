import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, ArrowUpRight, Award, CalendarDays, Check, ChefHat, ChevronDown, ChevronLeft, Clock3, Facebook, Instagram, MapPin, Menu, Phone, Minus, Plus, Sparkles, Star, Utensils, X, Youtube } from 'lucide-react'
import SpiceMap from './SpiceMap.jsx'
import './style.css'

const initialGallery = [
  { id: 'g1', title: 'Mutton Biriyani (Jeeraka Samba)', image_url: '/dish-mutton-biriyani.jpg', category: 'Biryani' },
  { id: 'g2', title: 'Curry Leaf Chicken', image_url: '/dish-curry-leaf-chicken.jpg', category: 'Starters' },
  { id: 'g3', title: 'Chicken Pallipalayam', image_url: '/dish-chicken-pallipalayam.jpg', category: 'Starters' },
  { id: 'g4', title: 'Mutton Kola Urundai', image_url: '/dish-mutton-kola-urundai.jpg', category: 'Starters' },
  { id: 'g5', title: 'Mutton Fat Curry', image_url: '/dish-mutton-fat-curry.jpg', category: 'Gravy' },
  { id: 'g6', title: 'Green Mint Mojito', image_url: '/dish-green-mint-mojito.jpg', category: 'Juice' },
  { id: 'g7', title: 'Sunset', image_url: '/dish-sunset.jpg', category: 'Juice' },
]
const BEHIND_THE_FLAMES_ITEMS = [
  { id: 'btf1', title: 'Mutton Biriyani (Jeeraka Samba)', image_url: '/dish-mutton-biriyani.jpg', category: 'Signature Dum Biryani' },
  { id: 'btf2', title: 'Grand Dining Hall', image_url: '/interior-dining-hall.jpg', category: 'Restaurant Ambience' },
  { id: 'btf3', title: 'Luxury Family Booths', image_url: '/interior-booths.jpg', category: 'Seating & Comfort' },
]
const HASH = !!window.__HASH_ROUTER
const ADDRESS = '35X9+VX5, Sai Nagar, Ambattur Industrial Estate, Chennai, Tamil Nadu 600058'
const POSTER = '/poster.jpg'
const PAGES = ['home', 'about', 'menu', 'gallery', 'contact', 'admin']
const TITLES = { home: 'A taste of home', about: 'About us', menu: 'Our Menu & Specials', gallery: 'Gallery', contact: 'Reserve a table & contact', admin: 'Admin' }
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
const reviews = [
  {
    id: 'r1',
    name: 'Kavitha Ramachandran',
    location: 'Ambattur, Chennai',
    rating: 5,
    dish: 'Dum Chicken Biryani',
    date: 'Opening Day',
    comment: 'The fragrance as soon as the dum handi opened was unreal! Perfectly cooked basmati rice where every single grain carries the aroma of whole spices. Tasted just like a festive wedding feast at home.',
  },
  {
    id: 'r2',
    name: 'Suresh Kumar & Family',
    location: 'Anna Nagar',
    rating: 5,
    dish: 'Golden Parotta & Salna',
    date: 'Yesterday',
    comment: 'Hands down the flakiest parotta in Chennai. We ordered the special chicken biryani and parotta with mutton gravy. The staff was incredibly welcoming and attentive to our kids.',
  },
  {
    id: 'r3',
    name: 'Dr. Vigneshwaran M.',
    location: 'Mogappair West',
    rating: 5,
    dish: 'Mutton Chukka & House Biryani',
    date: '2 days ago',
    comment: 'Authentic flavours cooked with authentic patience — no artificial colours or heavy greasy masalas. The mutton was fork-tender. The Chennai Kitchen has easily become our weekend regular.',
  },
  {
    id: 'r4',
    name: 'Priyanka & Arvind',
    location: 'Kilpauk, Chennai',
    rating: 5,
    dish: 'Special Non-Veg Platter',
    date: 'Opening Week',
    comment: 'Celebrated our family get-together here. The ambience is warm and cozy with tasteful South Indian touches, and the food arrived piping hot. Everyone from grandparents to grandchildren loved it!',
  },
]

const TIME_SLOTS = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM']
const GUEST_OPTIONS = ['1', '2', '3', '4', '5', '6', '8', '10', '12+']

const PRESS_MENTIONS = [
  { quote: 'The most authentic dum biryani in Chennai', source: 'The Hindu Metroplus' },
  { quote: 'Flakiest golden parottas with rich aromatic salna', source: 'Chennai Food Guide' },
  { quote: 'A celebration of genuine South Indian slow-cooking', source: 'Times Food Review' },
  { quote: 'Unmatched warmth and hospitality — a true family favorite', source: 'Madras Food Journal' },
  { quote: 'Every grain of basmati carries the fragrance of whole spices', source: 'Vikatan Gastronomy' },
]

const SIGNATURE_DISHES = [
  // 1. Biryani — full menu
  {
    id: 'b1',
    name: 'Plain Biriyani',
    price: '\u20b9199',
    category: 'Biryani',
    desc: 'Premium flavourful long-grain rice or seeraga samba rice delicately seasoned with whole spices, herbs and rich Indian flavours.',
    badge: 'Veg Option',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'b2',
    name: 'Egg Biriyani',
    price: '\u20b9229',
    category: 'Biryani',
    desc: 'Classic flavourful biriyani rice paired with boiled eggs, infused with aromatic spices, served with perfectly cooked biriyani.',
    badge: 'Classic',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'b3',
    name: 'Chicken Biriyani (Basmathi)',
    price: '\u20b9259',
    category: 'Biryani',
    desc: 'Traditional authentic chicken biriyani with tender chicken pieces layered with Basmati rice, fresh and aromatic seasonings.',
    badge: 'House Special',
    image: '/dish-mutton-biriyani.jpg'
  },
  {
    id: 'b4',
    name: 'Chilli 65 Biriyani',
    price: '\u20b9259',
    category: 'Biryani',
    desc: 'Fragrant biriyani rice topped with crispy chicken 65, tossed in flavourful masala.',
    badge: 'Spicy Fusion',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'b5',
    name: 'Mutton Biriyani (Jeeraka Samba)',
    price: '\u20b9329',
    category: 'Biryani',
    desc: 'Tender mutton pieces slow cooked with fragrant seeraga samba, aromatic whole spices.',
    badge: "Chef's Special",
    image: '/dish-mutton-biriyani.jpg'
  },

  // 2. Tandoori — full menu
  {
    id: 't1',
    name: 'Tandoori',
    price: '\u20b9149 / \u20b9299 / \u20b9599',
    category: 'Tandoori',
    desc: 'Perfectly marinated chicken, roasted tandoori with aromatic spices for a deliciously smoky and flavourful finish.',
    badge: 'Smoky & Spiced',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 't2',
    name: 'Spcl BBQ Chicken',
    price: '\u20b9149 / \u20b9299 / \u20b9599',
    category: 'Tandoori',
    desc: 'Juicy chicken coated in a rich blend of spices, BBQ sauces, slow grilled to perfection for deliciously smoky and savoury taste.',
    badge: 'Smoky BBQ',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 't3',
    name: 'Spcl Grill Chicken',
    price: '\u20b9149 / \u20b9299 / \u20b9599',
    category: 'Tandoori',
    desc: 'Perfectly marinated chicken, seasoned with handpicked spices and grilled until tender, juicy and delicious.',
    badge: 'Tender & Juicy',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=700&q=80'
  },

  // 3. Starters — full menu
  {
    id: 's1',
    name: 'Chicken 65',
    price: '\u20b9199',
    category: 'Starters',
    desc: 'Tender chicken pieces marinated in a blend of aromatic spices, ginger, garlic and herbs, deep fried to crispy perfection.',
    badge: 'Crispy & Spicy',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 's2',
    name: 'Chicken 65 Boneless',
    price: '\u20b9229',
    category: 'Starters',
    desc: 'Golden fried chicken bites bursting with spicy goodness, marinated in a house special blend of herbs and aromatic seasonings.',
    badge: 'Boneless',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 's3',
    name: 'Chicken Lollipop',
    price: '\u20b9199',
    category: 'Starters',
    desc: 'Tender chicken lollipops coated with the signature spicy marinade. Fried until crispy and finished with an aromatic flavour.',
    badge: 'Crowd Pleaser',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 's4',
    name: 'Chicken Pallipalayam',
    price: '\u20b9199',
    category: 'Starters',
    desc: 'Juicy chicken tossed in a traditional pallipalayam masala with roasted chillies and golden shallots.',
    badge: 'South Indian',
    image: '/dish-chicken-pallipalayam.jpg'
  },
  {
    id: 's5',
    name: 'Curry Leaf Chicken',
    price: '\u20b9199',
    category: 'Starters',
    desc: 'Juicy chicken pan roasted with the rich blend of spices and freshly picked curry leaves, delivering an aromatic and flavourful experience.',
    badge: 'Dry / Gravy',
    image: '/dish-curry-leaf-chicken.jpg'
  },
  {
    id: 's6',
    name: 'Mutton Chukka',
    price: '\u20b9250',
    category: 'Starters',
    desc: 'Tender mutton pieces slow roasted with freshly ground black pepper, shallots, curry leaves and aromatic spices for an authentic South Indian flavour.',
    badge: 'Signature',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 's7',
    name: 'Mutton Kola Urundai',
    price: '\u20b9229',
    category: 'Starters',
    desc: 'A traditional South Indian delicacy made with spiced minced mutton, fresh curry leaves and aromatic seasonings, fried until golden.',
    badge: 'Traditional',
    image: '/dish-mutton-kola-urundai.jpg'
  },

  // 4. Gravy — full menu
  {
    id: 'g1',
    name: 'Butter Chicken',
    price: '\u20b9179',
    category: 'Gravy',
    desc: 'Tender chicken pieces simmered in a rich, creamy tomato sauce gravy, enriched with butter, fresh cream and a delicate blend of signature spices.',
    badge: 'Rich & Creamy',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'g2',
    name: 'Lahuri Chicken',
    price: '\u20b9179',
    category: 'Gravy',
    desc: 'Succulent chicken simmered in a flavourful masala, infused with freshly ground spices with the touch of richness.',
    badge: 'Spiced Masala',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'g3',
    name: 'Mutton Roagan Josh',
    price: '\u20b9190',
    category: 'Gravy',
    desc: 'Juicy mutton chunks cooked to perfection in a vibrant red gravy infused with Kashmiri chillies.',
    badge: 'Royal Gravy',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'g4',
    name: 'Mutton Fat Curry',
    price: '\u20b9190',
    category: 'Gravy',
    desc: 'Rich and flavourful mutton curry prepared with tender mutton fat, traditional spices and aromatic herbs (Mutton Kolupu Kuzhambu).',
    badge: 'House Special',
    image: '/dish-mutton-fat-curry.jpg'
  },

  // 5. Soup — full menu
  {
    id: 'sp1',
    name: 'Chicken Soup',
    price: '\u20b9139',
    category: 'Soup',
    desc: 'Delicately cooked chicken in a nourishing, spice-infused broth, finished with fresh herbs and a touch of pepper.',
    badge: 'Nourishing',
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'sp2',
    name: 'Mutton Pepper Clear Soup',
    price: '\u20b9149',
    category: 'Soup',
    desc: 'A clear mutton broth slow-simmered with tender mutton, freshly ground pepper and traditional spices.',
    badge: 'Clear Broth',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'sp3',
    name: 'Mutton Nalli Soup',
    price: '\u20b9149',
    category: 'Soup',
    desc: 'The richness of mutton marrow meets the warmth of crushed pepper and aromatic spices in this traditional delicacy.',
    badge: 'Bone Marrow',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=80'
  },

  // 6. Breads — full menu
  {
    id: 'br1',
    name: 'Naan',
    price: '\u20b949',
    category: 'Breads',
    desc: 'Freshly prepared naan, tandoor-baked with a beautiful golden texture and a signature smoky aroma.',
    badge: 'Tandoor Fresh',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'br2',
    name: 'Butter Naan',
    price: '\u20b959',
    category: 'Breads',
    desc: 'Fresh from the tandoor, this fluffy naan with melted butter for a rich indulgence.',
    badge: 'Buttery',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'br3',
    name: 'Garlic Naan',
    price: '\u20b949',
    category: 'Breads',
    desc: 'Freshly baked naan layered with fragrant garlic and herbs, delivering a beautiful blend of smoky aroma and savoury flavour.',
    badge: 'Aromatic',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'br4',
    name: 'Roti',
    price: '\u20b959',
    category: 'Breads',
    desc: 'Simple and freshly made, this classic Indian flatbread brings the comforting taste of tradition.',
    badge: 'Classic',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'br5',
    name: 'Tandoori Roti',
    price: '\u20b959',
    category: 'Breads',
    desc: 'Rolled from wholesome wheat and flame-baked in the tandoor, bringing authentic rustic flavours to every bite.',
    badge: 'Flame Baked',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'br6',
    name: 'Chappathi',
    price: '\u20b939',
    category: 'Breads',
    desc: 'Freshly kneaded whole-wheat dough, rolled into thin rounds and cooked on a hot griddle until soft, light and perfectly done.',
    badge: 'Wholesome',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80'
  },

  // 7. Chinese — full menu
  {
    id: 'ch1',
    name: 'Veg Fried Rice',
    price: '\u20b9159',
    category: 'Chinese',
    desc: 'Fragrant basmati rice wok-tossed with fresh vegetables, spring onions, garlic and aromatic seasonings for a perfectly balanced flavour.',
    badge: 'Veg',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'ch2',
    name: 'Schezwan Veg Fried Rice',
    price: '\u20b9169',
    category: 'Chinese',
    desc: 'Long-grain rice tossed with colourful vegetables, chilli-infused Schezwan sauce and aromatic spices for a deliciously spicy finish.',
    badge: 'Spicy Veg',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'ch3',
    name: 'Veg Noodles',
    price: '\u20b9159',
    category: 'Chinese',
    desc: 'Springy noodles combined with freshly sliced vegetables, green onions and a blend of savoury sauces for a flavourful finish.',
    badge: 'Veg',
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'ch4',
    name: 'Egg Fried Rice',
    price: '\u20b9179',
    category: 'Chinese',
    desc: 'Freshly prepared rice tossed with fluffy eggs, spring onions, crushed pepper and aromatic garlic for a deliciously balanced taste.',
    badge: 'Classic',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'ch5',
    name: 'Schezwan Egg Fried Rice',
    price: '\u20b9189',
    category: 'Chinese',
    desc: 'Long-grain rice infused with spicy Schezwan flavours, tossed with fluffy eggs, spring onions and fresh vegetables for a bold taste.',
    badge: 'Spicy',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'ch6',
    name: 'Chicken Fried Rice',
    price: '\u20b9189',
    category: 'Chinese',
    desc: 'Tender chicken and perfectly cooked rice come together with crunchy vegetables, spring onions and signature sauces.',
    badge: 'Wok Tossed',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'ch7',
    name: 'Schezwan Chicken Fried Rice',
    price: '\u20b9199',
    category: 'Chinese',
    desc: 'Long-grain rice tossed with flavourful chicken, fresh spring onions, crushed garlic and spicy Schezwan sauce for an Indo-Chinese taste.',
    badge: 'Spicy Wok',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'ch8',
    name: 'Chicken Noodles',
    price: '\u20b9189',
    category: 'Chinese',
    desc: 'Springy noodles wok-tossed with tender chicken, fresh spring onions and a blend of savoury Indo-Chinese sauces.',
    badge: 'Wok Tossed',
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'ch9',
    name: 'Schezwan Chicken Noodles',
    price: '\u20b9199',
    category: 'Chinese',
    desc: 'Springy noodles tossed with spicy Schezwan sauce, tender chicken, fresh vegetables and spring onions for a fiery Indo-Chinese experience.',
    badge: 'Spicy Wok',
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=700&q=80'
  },

  // 8. Juice — full menu
  {
    id: 'jc1',
    name: 'Lime Mint Soda',
    price: '\u20b979',
    category: 'Juice',
    desc: 'Fresh lime juice blended with crushed mint leaves, chilled soda and a touch of sweetness for a refreshing citrus burst.',
    badge: 'Refreshing',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'jc2',
    name: 'Blue Mojito',
    price: '\u20b989',
    category: 'Juice',
    desc: 'Fresh mint and lime infused with sweet blue syrup and sparkling soda, creating a vibrant drink with a crisp citrus finish.',
    badge: 'Vibrant',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'jc3',
    name: 'Green Mint Mojito',
    price: '\u20b989',
    category: 'Juice',
    desc: 'Freshly crushed mint and lime infused with a hint of sweetness, topped with chilled soda for a refreshing finish.',
    badge: 'Fresh Fizz',
    image: '/dish-green-mint-mojito.jpg'
  },
  {
    id: 'jc4',
    name: 'Sunset',
    price: '\u20b999',
    category: 'Juice',
    desc: 'Sweet, tangy and beautifully layered, this vibrant cooler brings together fruity flavours and refreshing citrus notes.',
    badge: 'Signature',
    image: '/dish-sunset.jpg'
  }
]

function StatCounter({ end, label, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1800
        const startTime = performance.now()
        const step = now => {
          const progress = Math.min((now - startTime) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(ease * end))
          if (progress < 1) requestAnimationFrame(step)
          else setCount(end)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [end])

  return (
    <div className="stat-counter-card reveal" ref={ref}>
      <div className="stat-counter-number">
        {prefix}{count}{suffix}
      </div>
      <div className="stat-counter-label">{label}</div>
    </div>
  )
}

function PressMarquee() {
  return (
    <div className="press-marquee-wrap" aria-label="Press and critic mentions">
      <div className="press-marquee-track">
        {[...PRESS_MENTIONS, ...PRESS_MENTIONS, ...PRESS_MENTIONS].map((m, i) => (
          <span key={i} className="press-mention-item">
            <Star className="press-star" size={13} fill="currentColor" stroke="none" />
            <em>“{m.quote}”</em>
            <strong>— {m.source}</strong>
          </span>
        ))}
      </div>
    </div>
  )
}

function MenuShowcase({ items = SIGNATURE_DISHES, onReserve }) {
  const categories = ['Biryani', 'Tandoori', 'Starters', 'Gravy', 'Soup', 'Breads', 'Chinese', 'Juice']
  const [activeCat, setActiveCat] = useState('Biryani')
  const [hoveredDish, setHoveredDish] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const tabRefs = useRef({})
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const btn = tabRefs.current[activeCat]
    if (btn) {
      setSliderStyle({ left: btn.offsetLeft, width: btn.offsetWidth })
      btn.scrollIntoView?.({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeCat])

  const filtered = items.filter(d => d.category === activeCat)

  const handleMouseMove = e => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <div className="menu-showcase reveal" onMouseMove={handleMouseMove}>
      <div className="menu-tabs-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            ref={el => tabRefs.current[cat] = el}
            className={`menu-tab-btn ${activeCat === cat ? 'active' : ''}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
        <div
          className="tab-slider-line"
          style={{ transform: `translateX(${sliderStyle.left}px)`, width: `${sliderStyle.width}px` }}
        />
      </div>

      <div className="menu-dish-list">
        {filtered.map((dish, i) => (
          <div
            key={dish.id}
            className="dish-row reveal in"
            style={{ '--d': `${i * 60}ms` }}
            onMouseEnter={() => setHoveredDish(dish)}
            onMouseLeave={() => setHoveredDish(null)}
            onClick={onReserve}
          >
            <div className="dish-row-info">
              <div className="dish-row-title-row">
                <h4 className="dish-row-name">{dish.name}</h4>
                {dish.badge && <span className="dish-badge">{dish.badge}</span>}
              </div>
              <p className="dish-desc">{dish.desc}</p>
            </div>
            <span className="dish-price">{dish.price}</span>
          </div>
        ))}
      </div>

      {hoveredDish && (
        <div
          className="cursor-dish-preview"
          style={{
            left: `${mousePos.x + 18}px`,
            top: `${mousePos.y - 70}px`
          }}
        >
          <img src={hoveredDish.image} alt={hoveredDish.name} />
          <div className="cursor-dish-caption">
            <strong>{hoveredDish.name}</strong>
            <span>{hoveredDish.price} · {hoveredDish.badge}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function HorizontalSpecials({ gallery, onSelect }) {
  const trackRef = useRef(null)
  const scroll = dir => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * 310, behavior: 'smooth' })
    }
  }
  return (
    <div className="horizontal-gallery-wrap reveal">
      <div className="horizontal-gallery-header">
        <span className="eyebrow dark"><span></span> SIGNATURE CREATIONS</span>
        <div className="horizontal-gallery-controls">
          <button onClick={() => scroll(-1)} aria-label="Previous dishes"><ChevronLeft size={18}/></button>
          <button onClick={() => scroll(1)} aria-label="Next dishes"><ArrowRight size={18}/></button>
        </div>
      </div>
      <div className="horizontal-gallery-track" ref={trackRef}>
        {gallery.map((item, idx) => (
          <div
            key={item.id || idx}
            className="horizontal-spec-card"
            role="button"
            tabIndex={0}
            onClick={() => onSelect(idx)}
          >
            <div className="horizontal-spec-img-wrap">
              <img src={item.image_url} alt={item.title} loading="lazy" />
            </div>
            <div className="horizontal-spec-content">
              <span className="dish-badge">{item.category || 'Special'}</span>
              <h4>{item.title}</h4>
              <p>Made fresh each day using time-honoured slow-cooking traditions.</p>
              <span className="horizontal-spec-price">From our kitchen</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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
      image.onload = () => {
        if (index === 5 || index === Math.round(current)) draw()
      }
      return image
    })
    let current = 5
    let target = 5
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
      const preferred = Math.max(0, Math.min(94, Math.round(current)))
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
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * (mobile ? 1.05 : 1)
      const drawWidth = image.naturalWidth * scale
      const drawHeight = image.naturalHeight * scale
      const x = mobile ? (width - drawWidth) * 0.52 : (width - drawWidth) / 2 + width * 0.08
      const y = (height - drawHeight) / 2
      context.clearRect(0, 0, width, height)
      context.drawImage(image, x, y, drawWidth, drawHeight)
    }
    function animate() {
      current += (target - current) * 0.2
      if (Math.abs(target - current) < 0.03) current = target
      draw()
      animation = Math.abs(target - current) < 0.03 ? 0 : requestAnimationFrame(animate)
    }
    function updateTarget() {
      const track = document.getElementById('hero-track')
      if (!track) return
      const rect = track.getBoundingClientRect()
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
      const trackTop = rect.top + scrollY
      const range = track.offsetHeight - window.innerHeight
      const progress = range > 0 ? Math.max(0, Math.min(1, (scrollY - trackTop) / range)) : 0
      target = 5 + progress * 88
      const next = Math.min(3, Math.floor(progress * 3.99))
      if (next !== stage) { stage = next; onStage?.(next) }
      if (!animation) animation = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', resize)
    resize()
    updateTarget()
    draw()
    return () => {
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', resize)
      if (animation) cancelAnimationFrame(animation)
    }
  }, [])

  return <canvas className="hero-canvas" ref={canvasRef} aria-label="Biryani being served, from the supplied hero sequence" role="img" />
}

function AdminPage({
  go,
  token,
  setToken,
  phone,
  setPhone,
  gallery,
  heroMedia,
  reservations,
  refreshAdmin,
  uploadFile,
  uploading,
  adminNotice,
  setAdminNotice,
}) {
  const [adminPassword, setAdminPassword] = useState('')
  const [adminError, setAdminError] = useState('')
  const [adminTab, setAdminTab] = useState('gallery')
  const [newMedia, setNewMedia] = useState({ title: '', image_url: '', category: 'From the kitchen', media_type: 'image' })
  const [heroForm, setHeroForm] = useState({ title: '', media_url: '', media_type: 'image' })

  const loginAdmin = async e => {
    e.preventDefault(); setAdminError('')
    try {
      const data = await api('/admin/login', { method: 'POST', body: JSON.stringify({ password: adminPassword }) })
      setToken(data.token); sessionStorage.setItem('tck_admin_token', data.token)
      setAdminPassword('')
      await refreshAdmin()
    } catch (err) { setAdminError(err.message) }
  }

  const signOut = () => {
    setToken(''); sessionStorage.removeItem('tck_admin_token')
  }

  const addGallery = async e => {
    e.preventDefault()
    try {
      await api('/admin/gallery', { method: 'POST', token, body: JSON.stringify(newMedia) })
      setNewMedia({ title: '', image_url: '', category: 'From the kitchen', media_type: 'image' })
      setAdminNotice('Gallery item added.')
      await refreshAdmin()
    } catch (err) { setAdminNotice(err.message) }
  }

  const addHero = async e => {
    e.preventDefault()
    try {
      await api('/admin/hero-media', { method: 'POST', token, body: JSON.stringify(heroForm) })
      setHeroForm({ title: '', media_url: '', media_type: 'image' })
      setAdminNotice('Home media added.')
      await refreshAdmin()
    } catch (err) { setAdminNotice(err.message) }
  }

  const removeItem = async (kind, id) => {
    try {
      await api(`/admin/${kind}/${id}`, { method: 'DELETE', token })
      setAdminNotice(kind === 'reservations' ? 'Booking removed.' : 'Item removed from database.')
      await refreshAdmin()
    } catch (err) { setAdminNotice(err.message) }
  }

  const savePhone = async e => {
    e.preventDefault()
    try {
      await api('/admin/settings', { method: 'PUT', token, body: JSON.stringify({ whatsappPhone: phone }) })
      setAdminNotice('WhatsApp number saved.')
    } catch (err) { setAdminNotice(err.message) }
  }

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <a className="brand" href="/" onClick={e => { e.preventDefault(); go('home') }} aria-label="The Chennai Kitchen home">
          <img className="brand-logo" src="/logo.jpg" alt="The Chennai Kitchen — Authentic non-veg cuisine" />
          <span className="brand-text">The Chennai Kitchenn <i>Admin Studio</i></span>
        </a>
        <nav className="admin-page-nav">
          <button className="back-btn" onClick={() => go('home')}>← Back to website</button>
          {token && <button className="signout-btn" onClick={signOut}>Sign out</button>}
        </nav>
      </header>

      <main className="admin-page-main">
        {!token ? (
          <div className="admin-full-login">
            <span className="eyebrow"><span></span> THE BACK OF HOUSE</span>
            <h1>Admin sign in</h1>
            <p>Sign in to manage gallery photos, videos, home hero media, and reservations.</p>
            <form onSubmit={loginAdmin}>
              <label>
                Admin password
                <input
                  type="password"
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoFocus
                />
              </label>
              <button className="gold-button" type="submit">Sign in to Admin <ArrowRight size={16} /></button>
              {adminError && <p className="form-message">{adminError}</p>}
            </form>
          </div>
        ) : (
          <div className="admin-dashboard-full">
            <div className="admin-stats-row">
              <div className="admin-stat-card">
                <span>Gallery Items</span>
                <strong>{gallery.length}</strong>
              </div>
              <div className="admin-stat-card">
                <span>Home Media</span>
                <strong>{heroMedia.length}</strong>
              </div>
              <div className="admin-stat-card">
                <span>Bookings</span>
                <strong>{reservations.length}</strong>
              </div>
              <div className="admin-stat-card">
                <span>WhatsApp Contact</span>
                <strong style={{ fontSize: '18px', marginTop: '10px' }}>+{phone.replace(/\D/g, '') || '919566577729'}</strong>
              </div>
            </div>

            {adminNotice && <p className="admin-notice" style={{ borderRadius: '4px', marginBottom: '20px' }}>{adminNotice}</p>}

            <div className="admin-page-card">
              <div className="admin-page-tabs">
                <button className={adminTab === 'gallery' ? 'active' : ''} onClick={() => setAdminTab('gallery')}>Gallery ({gallery.length})</button>
                <button className={adminTab === 'home' ? 'active' : ''} onClick={() => setAdminTab('home')}>Home Media ({heroMedia.length})</button>
                <button className={adminTab === 'bookings' ? 'active' : ''} onClick={() => setAdminTab('bookings')}>Bookings ({reservations.length})</button>
                <button className={adminTab === 'settings' ? 'active' : ''} onClick={() => setAdminTab('settings')}>WhatsApp Settings</button>
              </div>

              {adminTab === 'gallery' && (
                <>
                  <form className="admin-add-form" onSubmit={addGallery}>
                    <strong style={{ color: '#fff' }}>Add a gallery photo or video</strong>
                    <div className="admin-upload-zone">
                      <label className={`admin-file-label ${uploading ? 'uploading' : ''}`}>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          style={{ display: 'none' }}
                          disabled={uploading}
                          onChange={async e => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            try {
                              const { url, mediaType } = await uploadFile(file)
                              setNewMedia(m => ({ ...m, image_url: url, media_type: mediaType, title: m.title || file.name.replace(/\.[^/.]+$/, '') }))
                            } catch {}
                          }}
                        />
                        <span>{uploading ? '⏳ Uploading...' : '📁 Upload photo / video'}</span>
                      </label>
                      <span className="admin-upload-hint">Uploads directly to Cloudinary or paste public URL below</span>
                    </div>
                    <input
                      style={{ color: '#fff', borderColor: '#ffffff26' }}
                      value={newMedia.title}
                      onChange={e => setNewMedia({ ...newMedia, title: e.target.value })}
                      placeholder="Title"
                      required
                    />
                    <input
                      style={{ color: '#fff', borderColor: '#ffffff26' }}
                      type="url"
                      value={newMedia.image_url}
                      onChange={e => setNewMedia({ ...newMedia, image_url: e.target.value })}
                      placeholder="Public image or video URL (auto-filled on upload)"
                      required
                    />
                    <div>
                      <select
                        style={{ color: '#fff', borderColor: '#ffffff26', background: '#1b0b0f' }}
                        value={newMedia.media_type}
                        onChange={e => setNewMedia({ ...newMedia, media_type: e.target.value })}
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                      <input
                        style={{ color: '#fff', borderColor: '#ffffff26' }}
                        value={newMedia.category}
                        onChange={e => setNewMedia({ ...newMedia, category: e.target.value })}
                        placeholder="Category"
                      />
                      <button className="gold-button" disabled={uploading}>Add item <Plus size={15} /></button>
                    </div>
                  </form>
                  <div className="admin-full-grid">
                    {gallery.map(item => (
                      <article className="admin-full-card" key={item.id}>
                        {item.media_type === 'video' ? <video src={item.image_url} controls muted preload="metadata" /> : <img src={item.image_url} alt="" loading="lazy" />}
                        <div className="admin-card-body">
                          <h4>{item.title}</h4>
                          <small>{item.category || 'Gallery'} · {item.media_type || 'image'}</small>
                        </div>
                        <button className="admin-card-del" onClick={() => removeItem('gallery', item.id)} aria-label={`Delete ${item.title}`} title="Delete"><X size={16} /></button>
                      </article>
                    ))}
                  </div>
                </>
              )}

              {adminTab === 'home' && (
                <>
                  <form className="admin-add-form" onSubmit={addHero}>
                    <strong style={{ color: '#fff' }}>Add home section media</strong>
                    <div className="admin-upload-zone">
                      <label className={`admin-file-label ${uploading ? 'uploading' : ''}`}>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          style={{ display: 'none' }}
                          disabled={uploading}
                          onChange={async e => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            try {
                              const { url, mediaType } = await uploadFile(file)
                              setHeroForm(m => ({ ...m, media_url: url, media_type: mediaType, title: m.title || file.name.replace(/\.[^/.]+$/, '') }))
                            } catch {}
                          }}
                        />
                        <span>{uploading ? '⏳ Uploading...' : '📁 Upload photo / video'}</span>
                      </label>
                      <span className="admin-upload-hint">Uploads directly to Cloudinary or paste public URL below</span>
                    </div>
                    <input
                      style={{ color: '#fff', borderColor: '#ffffff26' }}
                      value={heroForm.title}
                      onChange={e => setHeroForm({ ...heroForm, title: e.target.value })}
                      placeholder="Short title"
                      required
                    />
                    <input
                      style={{ color: '#fff', borderColor: '#ffffff26' }}
                      type="url"
                      value={heroForm.media_url}
                      onChange={e => setHeroForm({ ...heroForm, media_url: e.target.value })}
                      placeholder="Public image or video URL (auto-filled on upload)"
                      required
                    />
                    <div>
                      <select
                        style={{ color: '#fff', borderColor: '#ffffff26', background: '#1b0b0f' }}
                        value={heroForm.media_type}
                        onChange={e => setHeroForm({ ...heroForm, media_type: e.target.value })}
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                      <button className="gold-button" disabled={uploading}>Add to home <Plus size={15} /></button>
                    </div>
                  </form>
                  <p className="admin-help" style={{ color: '#bca99f', marginTop: '12px' }}>Media is uploaded to your Cloudinary storage and saved to your Neon database.</p>
                  <div className="admin-full-grid">
                    {heroMedia.map(item => (
                      <article className="admin-full-card" key={item.id}>
                        {item.media_type === 'video' ? <video src={item.media_url} controls muted preload="metadata" /> : <img src={item.media_url} alt="" loading="lazy" />}
                        <div className="admin-card-body">
                          <h4>{item.title}</h4>
                          <small>Home section · {item.media_type}</small>
                        </div>
                        <button className="admin-card-del" onClick={() => removeItem('hero-media', item.id)} aria-label={`Delete ${item.title}`} title="Delete"><X size={16} /></button>
                      </article>
                    ))}
                  </div>
                </>
              )}

              {adminTab === 'bookings' && (
                <div>
                  <strong style={{ color: '#fff', fontSize: '18px', display: 'block', marginBottom: '12px' }}>Guest Reservations ({reservations.length})</strong>
                  {reservations.length ? (
                    <div style={{ overflowX: 'auto' }}>
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Guest Name</th>
                            <th>Date & Time</th>
                            <th>Party Size</th>
                            <th>Special Notes</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reservations.map(b => (
                            <tr key={b.id}>
                              <td><strong>{b.name}</strong></td>
                              <td>{b.date} at {b.time}</td>
                              <td>{b.members} {b.members === 1 ? 'guest' : 'guests'}</td>
                              <td>{b.note || '—'}</td>
                              <td>
                                <button className="del-btn" onClick={() => removeItem('reservations', b.id)}>Remove</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="admin-help" style={{ color: '#bca99f', marginTop: '16px' }}>No reservations yet. New requests appear here as soon as guests send them.</p>
                  )}
                </div>
              )}

              {adminTab === 'settings' && (
                <form className="admin-add-form settings-form" onSubmit={savePhone}>
                  <strong style={{ color: '#fff' }}>WhatsApp Contact</strong>
                  <p style={{ color: '#bca99f' }}>Use the full country code and number without spaces, for example 919876543210.</p>
                  <label style={{ color: '#e8d9cd' }}>
                    WhatsApp number
                    <input
                      style={{ color: '#fff', borderColor: '#ffffff26' }}
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="919566577729"
                    />
                  </label>
                  <button className="gold-button" style={{ marginTop: '12px' }}>Save number <Check size={15} /></button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function App() {
  const [gallery, setGallery] = useState(initialGallery)
  const [lightboxList, setLightboxList] = useState(initialGallery)

  const [heroMedia, setHeroMedia] = useState([])
  const [phone, setPhone] = useState(import.meta.env.VITE_WHATSAPP_PHONE || '919566577729')
  const [menuOpen, setMenuOpen] = useState(false)
  const [route, go] = useRoute()
  const page = route === 'admin' ? 'home' : route
  const [faqOpen, setFaqOpen] = useState(-1)
  const [form, setForm] = useState({ name: '', date: '', time: '', members: '2', note: '' })
  const [bookingState, setBookingState] = useState('')
  const [token, setToken] = useState(sessionStorage.getItem('tck_admin_token') || '')
  const [uploading, setUploading] = useState(false)
  const [adminNotice, setAdminNotice] = useState('')
  const [reservations, setReservations] = useState([])
  const [heroStage, setHeroStage] = useState(0)
  const [lightbox, setLightbox] = useState(-1)
  const [loading, setLoading] = useState(true)
  const [menuCardOpen, setMenuCardOpen] = useState(false)
  const [menuCardPage, setMenuCardPage] = useState(0)
  const reserveBtnRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const btn = reserveBtnRef.current
    if (!btn) return
    const onMove = e => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
      if (dist < 75) {
        const moveX = (e.clientX - cx) * 0.32
        const moveY = (e.clientY - cy) * 0.32
        btn.style.transform = `translate(${moveX}px, ${moveY}px)`
      } else {
        btn.style.transform = ''
      }
    }
    const onLeave = () => { btn.style.transform = '' }
    window.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

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

  useEffect(() => {
    document.title = `The Chennai Kitchenn — ${TITLES[route] || 'Authentic Cuisine'}`
    if (page === 'home') setHeroStage(0)
  }, [route])

  const stepLightbox = d => setLightbox(i => (i + d + lightboxList.length) % lightboxList.length)
  useEffect(() => {
    if (lightbox < 0) return
    const onKey = e => { if (e.key === 'Escape') setLightbox(-1); if (e.key === 'ArrowRight') stepLightbox(1); if (e.key === 'ArrowLeft') stepLightbox(-1) }
    window.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightbox, lightboxList.length])

  useEffect(() => {
    api('/content').then(data => {
      if (data.gallery?.length && !data.gallery.some(g => g.image_url?.includes('unsplash.com'))) setGallery(data.gallery)
      if (data.heroMedia) setHeroMedia(data.heroMedia)
      if (data.whatsappPhone) setPhone(data.whatsappPhone)
    }).catch(() => {})
  }, [])

  const goTo = id => { setMenuOpen(false); go({ home: 'home', story: 'about', menu: 'menu', gallery: 'gallery', reserve: 'contact', visit: 'home' }[id] || 'home') }
  const jumpTo = id => { if (page === 'home') document.getElementById({ story: 'story', menu: 'menu', gallery: 'gallery', reserve: 'reserve' }[id])?.scrollIntoView({ behavior: 'smooth' }); else goTo(id) }
  const whatsappUrl = (message = 'Hello The Chennai Kitchen! I have a question.') => phone ? `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`
  const updateForm = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submitBooking = async e => {
    e.preventDefault(); setBookingState('sending')
    const message = `Hello The Chennai Kitchen! I'd like to reserve a table.\n\nName: ${form.name}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.members}${form.note ? `\nSpecial note: ${form.note}` : ''}`
    const wa = window.open('', '_blank')
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

  useEffect(() => {
    if (token && route === 'admin') refreshAdmin().catch(() => { setToken(''); sessionStorage.removeItem('tck_admin_token') })
  }, [token, route])

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

  if (route === 'admin') {
    return (
      <AdminPage
        go={go}
        token={token}
        setToken={setToken}
        phone={phone}
        setPhone={setPhone}
        gallery={gallery}
        heroMedia={heroMedia}
        reservations={reservations}
        refreshAdmin={refreshAdmin}
        uploadFile={uploadFile}
        uploading={uploading}
        adminNotice={adminNotice}
        setAdminNotice={setAdminNotice}
      />
    )
  }

  const currentCopy = heroStages[heroStage]
  const currentMedia = heroMedia[0]
  const heroUrl = currentMedia?.media_url

  const heroSection = (
      <div className="hero-track" id="hero-track"><section className="hero" id="home">
        {currentMedia?.media_type === 'video' ? <video className="hero-image hero-video" src={heroUrl} autoPlay muted loop playsInline aria-label={currentMedia.title}/> : currentMedia ? <div className="hero-image" style={{ backgroundImage: `url("${heroUrl}")` }}></div> : <HeroSequence onStage={setHeroStage}/>}<div className="hero-vignette"></div><div className="hero-grain"></div>
        <div className="hero-content" key={heroStage}><span className="eyebrow"><span></span> MADE SLOW. SHARED GENEROUSLY.</span><h1 className="mask-headline"><span className="mask-line"><span className="mask-inner">{currentCopy.title}</span></span></h1><p>{currentCopy.text}</p><button className="gold-button" onClick={() => jumpTo('reserve')}>Reserve a table<ArrowRight size={17}/></button></div>
        <div className="hero-caption"><span>THE ART OF DUM</span></div>
        <button className="scroll-hint" onClick={() => jumpTo('story')}>SCROLL TO SAVOR <ArrowDown size={14}/></button>
        <div className="hero-note"><span className="note-line"></span><span>Cooked with patience,<br/>served with heart.</span></div>
      </section></div>
  )
  const visitSection = (
      <section className="visit-section" id="visit">
        <div className="visit-copy reveal">
          <span className="eyebrow dark"><span></span> COME FIND YOUR CORNER</span>
          <h2>There’s always<br/><em>room at our table.</em></h2>
          <p>Bring your appetite, bring your people. Hand-roasted country spices, authentic woodfire dum biryanis, and warm South Indian hospitality await you in Ambattur.</p>
          <div className="visit-details">
            <span><MapPin size={17}/><span>Ambattur, Chennai<br/><small>{ADDRESS}</small></span></span>
            <span><Clock3 size={17}/><span>Opening Hours<br/><small>Mon – Sun: 11:30 AM – 11:00 PM</small></span></span>
            <span><Phone size={17}/><span>Call us<br/><small><a href="tel:+919894464472">98944 64472</a> · <a href="tel:+919047470444">90474 70444</a></small></span></span>
          </div>
          <button className="text-link" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`, '_blank', 'noopener')}>
            Open in Google Maps <ArrowUpRight size={16}/>
          </button>
        </div>
        <div className="visit-map-container reveal">
          <SpiceMap address={ADDRESS} />
        </div>
      </section>
  )
  const marqueeSection = <PressMarquee />
  const introSection = (
      <section className="intro-section" id="story"><div className="intro-copy reveal"><h2>Good food brings<br/><em>us together.</em></h2><div className="intro-text"><p>At The Chennai Kitchen, we believe the best meals are never rushed. They begin with familiar spices, the slow perfume of a pot on dum, and the people you love gathered around the table.</p><p>Rooted in the flavours of South India and made for sharing, every plate carries a little warmth from our kitchen to yours.</p><button className="text-link" onClick={() => jumpTo('menu')}>Explore our signature menu <ArrowRight size={16}/></button></div></div>
        <div className="branch-hallmarks-grid reveal">
          <div className="hallmark-card">
            <div className="hallmark-icon-wrap"><ChefHat size={22}/></div>
            <strong>Authentic Woodfire Dum</strong>
            <p>Sealed in heavy handis, slow-cooked on gentle charcoal embers for unmatched fragrance.</p>
          </div>
          <div className="hallmark-card">
            <div className="hallmark-icon-wrap"><Award size={22}/></div>
            <strong>Our Flagship Kitchen</strong>
            <p>Our inaugural dining destination in Ambattur, bringing authentic South Indian feasts.</p>
          </div>
          <div className="hallmark-card">
            <div className="hallmark-icon-wrap"><Sparkles size={22}/></div>
            <strong>Pure Grains & Spices</strong>
            <p>Aromatic Seeraga Samba & aged Basmati with hand-ground country spices.</p>
          </div>
          <div className="hallmark-card">
            <div className="hallmark-icon-wrap"><Utensils size={22}/></div>
            <strong>Made Fresh Daily</strong>
            <p>Spices roasted and marinades prepared each morning with zero artificial colors.</p>
          </div>
        </div>
      </section>
  )
  const storyChaptersSection = (
      <section className="intro-section" style={{ paddingTop: '0' }}>
        <div className="story-chapters-grid reveal">
          <div className="story-chapters-visual">
            <img src="/dish-mutton-biriyani.jpg" alt="Mutton Biriyani — The Chennai Kitchen" />
          </div>
          <div className="story-chapters-list">
            <article className="story-chapter-card">
              <span className="story-chapter-num">CHAPTER 01</span>
              <h3>The Morning Roast</h3>
              <p>Whole star anise, stone flower, cinnamon barks, and green cardamom are hand-roasted and ground at dawn to create our signature masala base.</p>
            </article>
            <article className="story-chapter-card">
              <span className="story-chapter-num">CHAPTER 02</span>
              <h3>The Clay Dum Seal</h3>
              <p>Fragrant seeraga samba rice and marinated tender meat are layered in heavy copper handis, sealed with fresh wheat dough, and simmered on gentle charcoal embers.</p>
            </article>
            <article className="story-chapter-card">
              <span className="story-chapter-num">CHAPTER 03</span>
              <h3>The Shared Feast</h3>
              <p>Every handi is broken open right before serving, sending a cloud of fragrant spice steam across the room, poured onto clean banana leaves for family and friends.</p>
            </article>
          </div>
        </div>
      </section>
  )
  const menuSection = (
      <section className="menu-section" id="menu">
        <div className="menu-section-header reveal">
          <div className="menu-header-flex">
            <div>
              <h2>Signature Dishes &<br/><em>House Specials.</em></h2>
              <p>Crafted with slow patience, hand-ground country spices, and pure golden ghee. Explore our signature creations from each category.</p>
            </div>
            <button className="menu-card-btn" onClick={() => setMenuCardOpen(true)} aria-label="Open full printed menu card">
              <Utensils size={15}/>
              <span>View Full Menu Card</span>
              <ArrowUpRight size={14}/>
            </button>
          </div>
        </div>
        <HorizontalSpecials gallery={gallery} onSelect={idx => { setLightboxList(gallery); setLightbox(idx) }} />
        <MenuShowcase items={SIGNATURE_DISHES} onReserve={() => jumpTo('reserve')} />
        <div className="food-foot">
          <span>FRESHLY COOKED TO ORDER</span>
          <button className="outline-button" onClick={() => jumpTo('reserve')}>Save your table <ArrowRight size={16}/></button>
        </div>
      </section>
  )
  const gallerySection = (
      <section className="gallery-showcase-section" id="gallery">
        <div className="gallery-showcase-header reveal">
          <span className="eyebrow"><span></span> VISUAL CHRONICLES</span>
          <h2>Behind the flames,<br/><em>at the table.</em></h2>
          <p>A visual glimpse into our kitchen craft — hand-layered dum biryanis, hot iron skillets, and shared feasts.</p>
        </div>
        <div className="food-grid">
          {BEHIND_THE_FLAMES_ITEMS.map((item, i) => (
            <article
              className={`food-card food-card-${i + 1} reveal`}
              style={{ '--d': `${i * 80}ms` }}
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
              onClick={() => { setLightboxList(BEHIND_THE_FLAMES_ITEMS); setLightbox(i) }}
              onKeyDown={e => e.key === 'Enter' && (setLightboxList(BEHIND_THE_FLAMES_ITEMS), setLightbox(i))}
            >
              {item.media_type === 'video' ? (
                <video src={item.image_url} aria-label={item.title} muted autoPlay loop playsInline preload="metadata"/>
              ) : (
                <img src={item.image_url} alt={item.title} loading="lazy" onError={e => { e.currentTarget.style.opacity = 0 }}/>
              )}
              <div className="food-overlay"></div>
              <div className="food-card-caption">
                <span>{item.category || 'From our kitchen'}</span>
                <h3>{item.title}</h3>
              </div>
              <span className="food-index">{String(i + 1).padStart(2, '0')}</span>
            </article>
          ))}
        </div>
        <div className="gallery-showcase-footer">
          <span>“EVERY DISH HAS A STORY. EVERY TABLE HAS A MEMORY.”</span>
        </div>
      </section>
  )
  const quoteSection = (
      <section className="quote-band"><div className="quote-decoration">“</div><p className="reveal">The secret ingredient is always<br/><em>one more person at the table.</em></p><span className="reveal">— OUR KIND OF RECIPE</span></section>
  )
  const reviewsSection = (
    <section className="reviews-section" id="reviews">
      <div className="section-heading reveal">
        <div>
          <span className="eyebrow dark"><span></span> WORDS FROM OUR GUESTS</span>
          <h2>Loved by those<br/><em>who pulled up a chair.</em></h2>
        </div>
        <p>Real stories, generous plates, and the kind of feedback that keeps our kitchen firing each morning.</p>
      </div>
      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <article className="review-card reveal" style={{ '--d': `${i * 90}ms` }} key={r.id}>
            <div className="review-stars" aria-label={`${r.rating} out of 5 stars`}>
              {Array.from({ length: r.rating }).map((_, s) => (
                <Star key={s} size={15} fill="currentColor" stroke="none" />
              ))}
            </div>
            <p className="review-comment">“{r.comment}”</p>
            <div className="review-meta">
              <div className="review-author">
                <strong>{r.name}</strong>
                <span>{r.location} · <small>{r.date}</small></span>
              </div>
              <span className="review-dish">{r.dish}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
  const reserveSection = (
      <section className="reserve-section" id="reserve">
        <div className="reserve-photo reveal">
          <img
            src="/interior-dining-hall.jpg"
            alt="The Chennai Kitchen — Grand Dining Hall"
            loading="lazy"
          />
          <div className="photo-label"><span>THE GOOD SEATS</span><span>ARE WAITING</span></div>
        </div>
        <div className="reserve-content reveal">
          <span className="eyebrow"><span></span> PULL UP A CHAIR</span>
          <h2>Save a place<br/><em>for you.</em></h2>
          <p className="reserve-intro">Tell us when you’re coming. We’ll set the table and be ready with something delicious.</p>

          {bookingState === 'sent' ? (
            <div className="booking-success-wrap">
              <div className="confetti-container" aria-hidden="true">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={i}
                    className="confetti-piece"
                    style={{
                      left: `${(i * 3.5 + Math.random() * 2)}%`,
                      backgroundColor: ['#dfb968', '#982018', '#16875b', '#f5eee7', '#efce88'][i % 5],
                      animationDelay: `${i * 0.08}s`,
                      animationDuration: `${2.2 + (i % 3) * 0.4}s`
                    }}
                  />
                ))}
              </div>
              <div className="stamp-container">
                <div className="table-stamp">
                  <span className="stamp-stars">★ ★ ★</span>
                  <span className="stamp-text">TABLE BOOKED</span>
                  <span className="stamp-brand">The Chennai Kitchen</span>
                  <span className="stamp-status">CONFIRMED</span>
                </div>
              </div>
              <h3>We’re ready for you, {form.name || 'friend'}!</h3>
              <p className="success-summary">
                A table for <strong>{form.members} {form.members === '1' ? 'guest' : 'guests'}</strong> has been saved for <strong>{form.date}</strong> at <strong>{form.time}</strong>.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a className="gold-button" href={whatsappUrl(`Hello The Chennai Kitchen! My booking for ${form.name} on ${form.date} at ${form.time} is placed.`)} target="_blank" rel="noreferrer">
                  Open in WhatsApp <ArrowUpRight size={16}/>
                </a>
                <button className="outline-button" onClick={() => { setBookingState(''); setForm({ name: '', date: '', time: '', members: '2', note: '' }) }}>
                  Book another table
                </button>
              </div>
            </div>
          ) : (
            <form className="booking-form" onSubmit={submitBooking}>
              <label>Your name
                <input name="name" value={form.name} onChange={updateForm} placeholder="What should we call you?" required maxLength="100"/>
              </label>

              <div className="form-row">
                <label>Date
                  <input type="date" name="date" value={form.date} onChange={updateForm} min={new Date().toISOString().slice(0, 10)} required/>
                </label>
              </div>

              <div className="booking-picker-group">
                <span className="booking-picker-label"><Clock3 size={13}/> Choose preferred time slot</span>
                <div className="time-slots-grid">
                  {TIME_SLOTS.map(t => {
                    const isSelected = form.time === t
                    return (
                      <button
                        key={t}
                        type="button"
                        className={`time-slot-chip ${isSelected ? 'selected' : ''}`}
                        onClick={() => setForm({ ...form, time: t })}
                      >
                        {isSelected && <Check className="chip-check" size={13} strokeWidth={3} />}
                        <span>{t}</span>
                      </button>
                    )
                  })}
                </div>
                {!form.time && <small style={{ color: '#d9a38f', fontSize: '10px' }}>* Please pick a slot above</small>}
              </div>

              <div className="booking-picker-group">
                <span className="booking-picker-label">Number of guests</span>
                <div className="guest-chips-row">
                  {GUEST_OPTIONS.map(g => {
                    const isSelected = form.members === g
                    return (
                      <button
                        key={g}
                        type="button"
                        className={`guest-chip ${isSelected ? 'selected' : ''}`}
                        onClick={() => setForm({ ...form, members: g })}
                      >
                        {g}
                      </button>
                    )
                  })}
                </div>
              </div>

              <label>Special note <span className="optional">(optional)</span>
                <input name="note" value={form.note} onChange={updateForm} placeholder="A birthday, window seat, extra spicy…" maxLength="500"/>
              </label>

              <button className="gold-button submit-button" type="submit" disabled={bookingState === 'sending' || !form.time}>
                {bookingState === 'sending' ? 'Sending…' : 'Request your table'}<ArrowRight size={17}/>
              </button>
              {bookingState === 'offline' && <p className="form-message">WhatsApp is ready. Connect the backend to save reservations.</p>}
              {bookingState === 'error' && <p className="form-message">We couldn’t save your request, but you can still send it on WhatsApp.</p>}
            </form>
          )}

          <p className="reserve-whatsapp"><span className="wa-small"><WaIcon/></span> Your request opens in WhatsApp so our team can confirm your table.</p>
        </div>
      </section>
  )
  const socialSection = (
      <section className="social-section"><div className="reveal"><span className="eyebrow dark"><span></span> FIND US ONLINE</span><h2>Follow along,<br/><em>say hello.</em></h2></div><div className="social-row reveal">{socials.map(s => <a key={s.name} href={s.url} target="_blank" rel="noreferrer"><s.Icon size={20}/><span>{s.name}</span></a>)}</div></section>
  )
  const faqSection = (
      <section className="faq-section"><div className="faq-heading reveal"><span className="eyebrow"><span></span> GOOD TO KNOW</span><h2>A few little<br/><em>things you asked.</em></h2></div><div className="faq-list reveal">{faqs.map(([q, a], i) => <div className={`faq-item ${faqOpen === i ? 'expanded' : ''}`} key={q}><button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} aria-expanded={faqOpen === i}><span>{q}</span>{faqOpen === i ? <Minus size={17}/> : <Plus size={17}/>}</button><div className="faq-answer"><p>{a}</p></div></div>)}</div></section>
  )
  return <>
    <div className={`site-loading-screen ${!loading ? 'fade-out' : ''}`} aria-hidden={!loading}>
      <div className="loader-center">
        <div className="loader-plate-wrap">
          <svg className="loader-plate-svg" viewBox="0 0 100 100">
            <circle className="plate-base" cx="50" cy="50" r="42" />
            <circle className="plate-glow" cx="50" cy="50" r="42" />
          </svg>
          <img className="loader-logo" src="/logo.jpg" alt="The Chennai Kitchen" />
        </div>
        <h2 className="loader-brand">The Chennai Kitchenn</h2>
        <div className="loader-bar-wrap"><div className="loader-bar-fill"></div></div>
        <span className="loader-hint">PREPARING THE DUM & SPICES</span>
      </div>
    </div>
    <div className="scroll-progress" aria-hidden="true"></div>
    <div className="site-top-wrap">
      <header className="site-header"><a className="brand" href={HASH ? '#home' : '/'} onClick={e => { e.preventDefault(); goTo('home') }} aria-label="The Chennai Kitchen home"><img className="brand-logo" src="/logo.jpg" alt="The Chennai Kitchen — Authentic non-veg cuisine"/><span className="brand-text">The Chennai Kitchenn</span></a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>{[['home', 'Home'], ['about', 'About'], ['menu', 'Menu'], ['gallery', 'Gallery'], ['contact', 'Contact']].map(([r, label]) => <button key={r} className={page === r ? 'active' : ''} onClick={() => { goTo(r === 'about' ? 'story' : r === 'contact' ? 'reserve' : r); setMenuOpen(false) }}>{label}</button>)}<button className="nav-book-btn" onClick={() => { goTo('reserve'); setMenuOpen(false) }}>Book a table ↗</button></nav>
        <button ref={reserveBtnRef} className="header-reserve" onClick={() => goTo('reserve')}>Book a table <ArrowUpRight size={15}/></button><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      </header>
    </div>

    <main key={page} className="page page-transition">
      {page === 'home' && <>{heroSection}{visitSection}{introSection}{menuSection}{gallerySection}{reviewsSection}{reserveSection}</>}
      {page === 'about' && <>{introSection}{storyChaptersSection}{quoteSection}{reviewsSection}</>}
      {page === 'menu' && <>{menuSection}</>}
      {page === 'gallery' && <>{gallerySection}</>}
      {page === 'contact' && <>{visitSection}{reserveSection}{socialSection}{faqSection}</>}
    </main>

    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand-wrap">
          <a className="footer-brand-link" href={HASH ? '#home' : '/'} onClick={e => { e.preventDefault(); goTo('home') }} aria-label="The Chennai Kitchen home">
            <img className="footer-logo-img" src="/logo.jpg" alt="The Chennai Kitchen — Authentic non-veg cuisine"/>
            <span className="footer-brand-name">The Chennai Kitchenn</span>
          </a>
          <p className="footer-tagline">Familiar flavours.<br/>A seat saved for you.</p>
        </div>
        <div className="footer-info-col">
          <span className="footer-col-title">Visit Us</span>
          <p className="footer-address-text">35X9+VX5, Sai Nagar, Ambattur Industrial Estate,<br/>MTH Road (Near Bus Stand), Chennai, Tamil Nadu 600058</p>
        </div>
        <div className="footer-links-col">
          <span className="footer-col-title">Connect</span>
          <div className="footer-links">
            <a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight size={14}/></a>
            <a href="tel:+919894464472">Call 98944 64472</a>
            <a href="https://instagram.com/thechennaikitchen" target="_blank" rel="noreferrer">Instagram <Instagram size={14}/></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 THE CHENNAI KITCHEN</span>
        <span>MADE WITH A LITTLE EXTRA GHEE</span>
        <div className="footer-bottom-actions">
          <button className="footer-admin-btn" onClick={() => go('admin')}>Admin sign in</button>
          <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>

    <a className="whatsapp-float" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Contact us on WhatsApp"><span className="wa-pulse"></span><WaIcon/><span>Chat with us</span></a>

    {lightbox >= 0 && lightboxList[lightbox] && <div className="lightbox" role="dialog" aria-modal="true" onClick={e => { if (e.target === e.currentTarget) setLightbox(-1) }}><button className="lb-close" onClick={() => setLightbox(-1)} aria-label="Close"><X size={22}/></button><button className="lb-nav lb-prev" onClick={() => stepLightbox(-1)} aria-label="Previous"><ArrowRight size={22}/></button>{lightboxList[lightbox].media_type === 'video' ? <video key={lightbox} src={lightboxList[lightbox].image_url} controls autoPlay loop playsInline/> : <img key={lightbox} src={lightboxList[lightbox].image_url} alt={lightboxList[lightbox].title}/>}<button className="lb-nav lb-next" onClick={() => stepLightbox(1)} aria-label="Next"><ArrowRight size={22}/></button><p><span>{lightboxList[lightbox].category}</span>{lightboxList[lightbox].title}<em>{lightbox + 1} / {lightboxList.length}</em></p></div>}
    {menuCardOpen && (
      <div className="offer-backdrop" onClick={() => setMenuCardOpen(false)}>
        <div className="menu-card-pop" role="dialog" aria-modal="true" aria-label="The Chennai Kitchen Full Menu Card" onClick={e => e.stopPropagation()}>
          <button className="poster-close" onClick={() => setMenuCardOpen(false)} aria-label="Close menu card"><X size={20}/></button>
          <div className="menu-card-pages-nav">
            <button className={menuCardPage === 0 ? 'active' : ''} onClick={() => setMenuCardPage(0)}>
              Side 1: Biryani · Tandoori · Starters · Gravy · Soup · Breads
            </button>
            <button className={menuCardPage === 1 ? 'active' : ''} onClick={() => setMenuCardPage(1)}>
              Side 2: Chinese · Juice · Ice Cream
            </button>
          </div>
          <div className="menu-card-img-container">
            <img src={menuCardPage === 0 ? '/menu-page1.jpg' : '/menu-page2.jpg'} alt={`The Chennai Kitchen Complete Menu Card Side ${menuCardPage + 1}`} />
          </div>
        </div>
      </div>
    )}
  </>
}

const rootElement = document.getElementById('root')
const root = rootElement._reactRoot || (rootElement._reactRoot = createRoot(rootElement))
root.render(<App />)
