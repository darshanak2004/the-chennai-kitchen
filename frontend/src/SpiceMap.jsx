import React, { useState, useRef } from 'react'
import { MapPin, Navigation, ZoomIn, ZoomOut, Compass, Layers, Phone, Clock, ArrowUpRight, Check } from 'lucide-react'

export default function SpiceMap({
  address = 'No.15, 1st Floor, Ambattur Industrial Estate, Bus Stand Complex, MTH Road, Chennai - 600058',
}) {
  const [zoom, setZoom] = useState(1)
  const [activeWaypoint, setActiveWaypoint] = useState(null)
  const [viewMode, setViewMode] = useState('spice') // 'spice' or 'live'
  const [isCopied, setIsCopied] = useState(false)

  const handleZoomIn = () => setZoom(z => Math.min(1.6, +(z + 0.15).toFixed(2)))
  const handleZoomOut = () => setZoom(z => Math.max(0.9, +(z - 0.15).toFixed(2)))
  const handleReset = () => {
    setZoom(1)
    setActiveWaypoint(null)
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2200)
  }

  // Route path through MTH Road to The Chennai Kitchen at Ambattur Bus Stand Complex
  const routePathD = 'M 885,255 L 720,265 Q 580,270 515,285 L 430,305 Q 385,318 360,332 L 348,340'

  return (
    <div className="spice-map-card">
      {/* Top Map Header / Controls Bar */}
      <div className="spice-map-toolbar">
        <div className="spice-map-title-wrap">
          <div className="spice-pulse-indicator" aria-hidden="true"></div>
          <div>
            <h3 className="spice-map-title">The Spice Route to Ambattur</h3>
            <p className="spice-map-sub">
              MTH Road · Fresh Country Spices Delivered Daily to Our Kitchen
            </p>
          </div>
        </div>

        <div className="spice-map-actions">
          <div className="spice-mode-toggle" role="tablist" aria-label="Map style selector">
            <button
              role="tab"
              aria-selected={viewMode === 'spice'}
              className={`mode-btn ${viewMode === 'spice' ? 'active' : ''}`}
              onClick={() => setViewMode('spice')}
            >
              <span className="dot turmeric"></span> Spice Route Map
            </button>
            <button
              role="tab"
              aria-selected={viewMode === 'live'}
              className={`mode-btn ${viewMode === 'live' ? 'active' : ''}`}
              onClick={() => setViewMode('live')}
            >
              <Layers size={13} /> Live Google Map
            </button>
          </div>

          <a
            className="directions-pill-btn"
            href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open turn-by-turn directions in Google Maps"
          >
            <Navigation size={13} />
            <span>Get Directions</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="spice-map-viewport">
        {viewMode === 'live' ? (
          <div className="live-map-container">
            <iframe
              title="Google Map of The Chennai Kitchen, Ambattur"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        ) : (
          <div className="spice-svg-stage" style={{ transform: `scale(${zoom})` }}>
            <svg
              viewBox="0 0 900 560"
              className="spice-map-svg"
              aria-label="Interactive Spice Route Map of The Chennai Kitchen, Ambattur"
            >
              <defs>
                {/* Spice Palette Gradients */}
                <linearGradient id="creamTerrain" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#faf5eb" />
                  <stop offset="50%" stopColor="#f5ede0" />
                  <stop offset="100%" stopColor="#ece0cf" />
                </linearGradient>

                <linearGradient id="lakeWater" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#cbe5dc" />
                  <stop offset="100%" stopColor="#a8d0c2" />
                </linearGradient>

                <linearGradient id="leafPark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dfede3" />
                  <stop offset="100%" stopColor="#c5ded0" />
                </linearGradient>

                <linearGradient id="chilliRoute" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e5a93b" />
                  <stop offset="45%" stopColor="#d33827" />
                  <stop offset="100%" stopColor="#982018" />
                </linearGradient>

                <filter id="mapShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#3c131a" floodOpacity="0.18" />
                </filter>
                <filter id="pinGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#b8261b" floodOpacity="0.38" />
                </filter>

                {/* Road Stroke Masks */}
                <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f5c563" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#b8261b" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              {/* 1. Base Terrain Canvas (Warm Cream) */}
              <rect width="900" height="560" fill="url(#creamTerrain)" />

              {/* Subtle Parchment Grid Lines */}
              <g stroke="#e2d4c0" strokeWidth="0.6" strokeDasharray="4 8" opacity="0.6">
                <line x1="0" y1="140" x2="900" y2="140" />
                <line x1="0" y1="280" x2="900" y2="280" />
                <line x1="0" y1="420" x2="900" y2="420" />
                <line x1="225" y1="0" x2="225" y2="560" />
                <line x1="450" y1="0" x2="450" y2="560" />
                <line x1="675" y1="0" x2="675" y2="560" />
              </g>

              {/* 2. Natural Features (Deep Leaf Green & Calm Water) */}
              {/* Ambattur Eri (Lake) */}
              <path
                d="M 50,45 Q 120,30 210,60 Q 280,85 260,150 Q 240,210 160,205 Q 80,200 40,155 Q 15,100 50,45 Z"
                fill="url(#lakeWater)"
                stroke="#8fbfae"
                strokeWidth="1.5"
                opacity="0.95"
              />
              <text x="135" y="125" fill="#316753" fontSize="12" fontWeight="600" letterSpacing="0.08em" textAnchor="middle" opacity="0.85">
                AMBATTUR ERI
              </text>
              <text x="135" y="140" fill="#4d7c6b" fontSize="9" letterSpacing="0.06em" textAnchor="middle" opacity="0.75">
                (Freshwater Lake)
              </text>

              {/* Green Parks / Industrial Greenbelts */}
              <path
                d="M 640,60 Q 720,45 820,70 Q 860,110 820,150 Q 750,170 660,135 Q 610,100 640,60 Z"
                fill="url(#leafPark)"
                stroke="#b0d4be"
                strokeWidth="1"
              />
              <text x="735" y="110" fill="#2d6040" fontSize="10" fontWeight="600" letterSpacing="0.06em" textAnchor="middle" opacity="0.75">
                AMBATTUR PARK
              </text>

              <path
                d="M 550,420 Q 640,400 710,430 Q 730,490 670,525 Q 580,530 540,490 Q 520,445 550,420 Z"
                fill="url(#leafPark)"
                stroke="#b0d4be"
                strokeWidth="1"
              />
              <text x="630" y="475" fill="#2d6040" fontSize="10" fontWeight="600" letterSpacing="0.06em" textAnchor="middle" opacity="0.75">
                ESTATE GREENBELT
              </text>

              {/* 3. Secondary & Local City Roads (Warm Cream / Tan) */}
              <g stroke="#dfd0bd" strokeLinecap="round" strokeLinejoin="round">
                {/* North Residential & Commercial Grid */}
                <path d="M 280,60 L 280,270" strokeWidth="5" />
                <path d="M 410,50 L 410,290" strokeWidth="6" />
                <path d="M 480,70 L 480,285" strokeWidth="5" />
                <path d="M 620,50 L 620,270" strokeWidth="5" />
                <path d="M 740,60 L 740,265" strokeWidth="5" />
                <path d="M 280,120 L 880,120" strokeWidth="4" />
                <path d="M 330,195 L 880,195" strokeWidth="4.5" />

                {/* South Industrial Estate Grid */}
                <path d="M 120,380 L 120,540" strokeWidth="5" />
                <path d="M 240,360 L 240,540" strokeWidth="6" />
                <path d="M 400,345 L 400,540" strokeWidth="5" />
                <path d="M 640,310 L 640,540" strokeWidth="5" />
                <path d="M 760,290 L 760,540" strokeWidth="6" />
                <path d="M 80,450 L 880,450" strokeWidth="4.5" />
                <path d="M 100,515 L 880,515" strokeWidth="4.5" />
              </g>

              {/* Railway Line (Chennai Central - Arakkonam) */}
              <g opacity="0.85">
                <path d="M 240,75 L 890,75" stroke="#786558" strokeWidth="3" />
                <path d="M 240,75 L 890,75" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="6 6" />
                <rect x="345" y="62" width="70" height="24" rx="4" fill="#ffffff" stroke="#786558" strokeWidth="1" filter="url(#mapShadow)" />
                <text x="380" y="77" fill="#422e23" fontSize="8.5" fontWeight="700" letterSpacing="0.04em" textAnchor="middle">
                  🚆 Ambattur Rly Stn
                </text>
              </g>

              {/* 4. Major Arterial Highways (Turmeric Gold) */}
              {/* Ambattur Industrial Estate 3rd Main Road */}
              <path d="M 520,285 L 520,540" stroke="#f0b842" strokeWidth="9" strokeLinecap="round" />
              <path d="M 520,285 L 520,540" stroke="#fcf6eb" strokeWidth="2" strokeDasharray="8 8" />
              <text x="532" y="440" fill="#714b13" fontSize="9" fontWeight="700" letterSpacing="0.07em" transform="rotate(90 532 440)">
                INDUSTRIAL ESTATE ROAD
              </text>

              {/* Chennai Bypass / Padi Flyover Connector */}
              <path d="M 840,40 L 840,540" stroke="#eab13b" strokeWidth="11" strokeLinecap="round" />
              <text x="852" y="160" fill="#6d480d" fontSize="9" fontWeight="700" letterSpacing="0.08em" transform="rotate(90 852 160)">
                CHENNAI BYPASS / PADI FLYOVER →
              </text>

              {/* MTH Road (Madras Thiruvallur High Road) — Base Road Layer */}
              <path
                d="M 20,380 L 180,360 L 330,340 Q 420,320 520,285 L 720,265 L 890,255"
                stroke="#e5a93b"
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 20,380 L 180,360 L 330,340 Q 420,320 520,285 L 720,265 L 890,255"
                stroke="#fff8ee"
                strokeWidth="2.5"
                strokeDasharray="10 10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* MTH Road Label */}
              <g transform="translate(620, 252)">
                <rect x="-95" y="-13" width="190" height="18" rx="9" fill="#fff9ef" stroke="#d89b28" strokeWidth="1" filter="url(#mapShadow)" />
                <text x="0" y="0" fill="#7d4e0e" fontSize="9.5" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">
                  MTH ROAD (CTH ROAD)
                </text>
              </g>

              {/* Ambattur OT Bus Stand Complex Outline */}
              <g transform="translate(305, 310)">
                <rect x="0" y="0" width="85" height="52" rx="7" fill="#fffaf1" stroke="#d5a034" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="42" y="18" fill="#8a5313" fontSize="8" fontWeight="700" textAnchor="middle" letterSpacing="0.03em">
                  BUS STAND
                </text>
                <text x="42" y="28" fill="#8a5313" fontSize="7.5" fontWeight="600" textAnchor="middle">
                  COMPLEX
                </text>
                <circle cx="16" cy="40" r="3" fill="#2d6040" />
                <circle cx="28" cy="40" r="3" fill="#2d6040" />
                <circle cx="40" cy="40" r="3" fill="#2d6040" />
                <text x="56" y="42" fill="#5c4639" fontSize="7">Bays 1-8</text>
              </g>

              {/* 5. Highlighted Spice Delivery Route (Chilli Red & Turmeric Gold) */}
              {/* Route Ambient Glow */}
              <path
                d={routePathD}
                fill="none"
                stroke="url(#routeGlow)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Route Core Line */}
              <path
                id="spiceDeliveryRoutePath"
                d={routePathD}
                fill="none"
                stroke="url(#chilliRoute)"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Animated Directional Arrows / Dash Flow */}
              <path
                d={routePathD}
                fill="none"
                stroke="#fff8ee"
                strokeWidth="2.5"
                strokeDasharray="8 14"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="route-dash-flow"
              />

              {/* 6. Subtle Spice Waypoint Markers along the Journey */}
              {/* Waypoint 1: Padi Entry (Cumin Seeds) */}
              <g
                className="spice-waypoint"
                transform="translate(745, 240)"
                onClick={() => setActiveWaypoint(activeWaypoint === 'cumin' ? null : 'cumin')}
                style={{ cursor: 'pointer' }}
              >
                <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#d49424" strokeWidth="1.5" filter="url(#mapShadow)" />
                {/* 3 cumin seeds */}
                <ellipse cx="-4" cy="-2" rx="4" ry="1.8" fill="#a46d25" transform="rotate(-30 -4 -2)" />
                <ellipse cx="3" cy="-1" rx="4" ry="1.8" fill="#7e5218" transform="rotate(25 3 -1)" />
                <ellipse cx="0" cy="4" rx="4" ry="1.8" fill="#b87b2b" transform="rotate(75 0 4)" />
                <rect x="-38" y="-30" width="76" height="15" rx="7.5" fill="#fff8ec" stroke="#d49424" strokeWidth="0.8" />
                <text x="0" y="-20" fill="#78470a" fontSize="7.5" fontWeight="700" letterSpacing="0.04em" textAnchor="middle">
                  ✦ CUMIN SEEDS
                </text>
              </g>

              {/* Waypoint 2: Estate Junction (Curry Leaves) */}
              <g
                className="spice-waypoint"
                transform="translate(525, 260)"
                onClick={() => setActiveWaypoint(activeWaypoint === 'leaf' ? null : 'leaf')}
                style={{ cursor: 'pointer' }}
              >
                <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#2a603c" strokeWidth="1.5" filter="url(#mapShadow)" />
                {/* Fresh curry leaf */}
                <path d="M -7,6 Q 0,-3 7,-6 Q 3,3 -7,6 Z" fill="#2d6a42" stroke="#1b4329" strokeWidth="0.5" />
                <line x1="-6" y1="5" x2="6" y2="-5" stroke="#a3d9b5" strokeWidth="0.7" />
                <rect x="-44" y="-30" width="88" height="15" rx="7.5" fill="#f0f7f2" stroke="#2d6a42" strokeWidth="0.8" />
                <text x="0" y="-20" fill="#1b4d2e" fontSize="7.5" fontWeight="700" letterSpacing="0.04em" textAnchor="middle">
                  ✦ CURRY LEAVES
                </text>
              </g>

              {/* Waypoint 3: OT Junction (Black Peppercorns) */}
              <g
                className="spice-waypoint"
                transform="translate(425, 290)"
                onClick={() => setActiveWaypoint(activeWaypoint === 'pepper' ? null : 'pepper')}
                style={{ cursor: 'pointer' }}
              >
                <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#8d1f2d" strokeWidth="1.5" filter="url(#mapShadow)" />
                {/* 4 black peppercorns */}
                <circle cx="-3" cy="-3" r="3" fill="#30181d" />
                <circle cx="4" cy="-2" r="2.6" fill="#4d242c" />
                <circle cx="0" cy="4" r="2.8" fill="#241115" />
                <circle cx="-2" cy="-4" r="0.8" fill="#f5eee7" opacity="0.6" />
                <rect x="-42" y="-30" width="84" height="15" rx="7.5" fill="#fff5f5" stroke="#982018" strokeWidth="0.8" />
                <text x="0" y="-20" fill="#6a151b" fontSize="7.5" fontWeight="700" letterSpacing="0.04em" textAnchor="middle">
                  ✦ BLACK PEPPER
                </text>
              </g>

              {/* 7. Animated Delivery Vehicle Carrying Spice Sacks */}
              <g className="spice-delivery-truck">
                {/* Vehicle SVG Object */}
                <g transform="translate(-25, -14)">
                  {/* Delivery Auto / Van Body in Turmeric Gold & Chilli Red */}
                  {/* Cargo Bed with Jute Spice Sacks */}
                  <rect x="0" y="6" width="22" height="13" rx="2" fill="#4a1c22" stroke="#2a0d12" strokeWidth="0.8" />

                  {/* 3 Plump Burlap Spice Sacks stacked in cargo bed */}
                  {/* Sack 1 (Turmeric Gold Sack) */}
                  <ellipse cx="6" cy="7" rx="5" ry="4.5" fill="#e5a93b" stroke="#7e5414" strokeWidth="0.6" />
                  <ellipse cx="6" cy="4.5" rx="2" ry="1.2" fill="#f9d77e" />

                  {/* Sack 2 (Chilli Red Sack with chillies) */}
                  <ellipse cx="14" cy="7" rx="5" ry="4.5" fill="#b8261b" stroke="#63130c" strokeWidth="0.6" />
                  <path d="M 13,3 Q 16,1 17,4" stroke="#e52d1f" strokeWidth="1.2" fill="none" />

                  {/* Sack 3 (Cumin/Coriander Brown Sack on top) */}
                  <ellipse cx="10" cy="3" rx="4.5" ry="3.5" fill="#9d7342" stroke="#503719" strokeWidth="0.6" />

                  {/* Driver Cab */}
                  <path d="M 21,5 L 34,5 L 38,12 L 38,19 L 21,19 Z" fill="#b8261b" stroke="#68120c" strokeWidth="0.8" />
                  {/* Windshield */}
                  <path d="M 28,6 L 33,6 L 36,12 L 28,12 Z" fill="#e6f4ff" stroke="#4a1c22" strokeWidth="0.6" />
                  {/* Golden Headlight */}
                  <circle cx="38" cy="14" r="1.8" fill="#fde047" />
                  <polygon points="39,13 49,10 49,18 39,15" fill="#fde047" opacity="0.35" />

                  {/* Wheels */}
                  <circle cx="7" cy="19" r="3.6" fill="#1b0b0f" stroke="#715d55" strokeWidth="1" />
                  <circle cx="7" cy="19" r="1.2" fill="#f5eee7" />
                  <circle cx="32" cy="19" r="3.6" fill="#1b0b0f" stroke="#715d55" strokeWidth="1" />
                  <circle cx="32" cy="19" r="1.2" fill="#f5eee7" />

                  {/* Floating Spice Tag above Truck */}
                  <rect x="2" y="-12" width="40" height="12" rx="4" fill="#ffffff" stroke="#b8261b" strokeWidth="0.8" filter="url(#mapShadow)" />
                  <text x="22" y="-3.5" fill="#982018" fontSize="7" fontWeight="800" textAnchor="middle" letterSpacing="0.03em">
                    SPICE VAN 🚚
                  </text>
                </g>

                {/* SVG Motion Path Animation */}
                <animateMotion
                  path={routePathD}
                  dur="14s"
                  repeatCount="indefinite"
                  rotate="auto"
                  keyPoints="0; 0.95; 1; 1"
                  keyTimes="0; 0.78; 0.92; 1"
                />
              </g>

              {/* 8. The Destination Restaurant Beacon (The Chennai Kitchen) */}
              <g transform="translate(348, 335)" filter="url(#pinGlow)">
                {/* Outer Pulsing Golden Ripple */}
                <circle cx="0" cy="0" r="32" fill="#e5a93b" opacity="0.22" className="beacon-ripple-outer" />
                <circle cx="0" cy="0" r="22" fill="#b8261b" opacity="0.25" className="beacon-ripple-inner" />

                {/* Main Restaurant Destination Pin */}
                <path
                  d="M 0,-42 C -18,-42 -22,-24 0,0 C 22,-24 18,-42 0,-42 Z"
                  fill="url(#chilliRoute)"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
                <circle cx="0" cy="-24" r="12" fill="#ffffff" />
                {/* Traditional Dum Pot / Cooking Icon */}
                <circle cx="0" cy="-24" r="9" fill="#982018" />
                <text x="0" y="-20.5" fill="#f6ce7b" fontSize="9" fontWeight="900" textAnchor="middle">
                  🍲
                </text>

                {/* Restaurant Destination Card Popup */}
                <g transform="translate(-115, -112)" filter="url(#mapShadow)">
                  <rect x="0" y="0" width="230" height="62" rx="10" fill="#ffffff" stroke="#b8261b" strokeWidth="1.8" />
                  {/* Gold Top Accent Line */}
                  <rect x="0" y="0" width="230" height="4" rx="2" fill="#e5a93b" />

                  <text x="14" y="22" fill="#982018" fontSize="12" fontWeight="800" letterSpacing="0.04em">
                    THE CHENNAI KITCHEN
                  </text>
                  <text x="14" y="37" fill="#4d352b" fontSize="9" fontWeight="600">
                    No.15, 1st Floor, Bus Stand Complex
                  </text>
                  <text x="14" y="49" fill="#755a4e" fontSize="8">
                    MTH Road, Ambattur · Grand Opening 15 Nov
                  </text>

                  {/* Star Rating Badge */}
                  <rect x="185" y="12" width="34" height="17" rx="8.5" fill="#fdf4df" stroke="#d5a034" strokeWidth="0.8" />
                  <text x="202" y="24" fill="#8d560c" fontSize="8" fontWeight="800" textAnchor="middle">
                    ★ 4.9
                  </text>
                </g>
              </g>

              {/* Decorative Corner Spices */}
              <g transform="translate(35, 520)" opacity="0.6">
                <text fill="#68473a" fontSize="8.5" fontWeight="600" letterSpacing="0.08em">
                  📍 AMBATTUR · 13° 06' N, 80° 09' E
                </text>
              </g>
            </svg>
          </div>
        )}

        {/* Floating Familiar Map Controls (Top Right) */}
        <div className="spice-map-controls" role="toolbar" aria-label="Map navigation controls">
          <button
            className="ctrl-btn"
            onClick={handleZoomIn}
            aria-label="Zoom in"
            title="Zoom in"
            disabled={viewMode === 'live'}
          >
            <ZoomIn size={16} />
          </button>
          <button
            className="ctrl-btn"
            onClick={handleZoomOut}
            aria-label="Zoom out"
            title="Zoom out"
            disabled={viewMode === 'live'}
          >
            <ZoomOut size={16} />
          </button>
          <button
            className="ctrl-btn"
            onClick={handleReset}
            aria-label="Reset map view"
            title="Recenter on The Chennai Kitchen"
            disabled={viewMode === 'live'}
          >
            <Compass size={16} />
          </button>
        </div>

        {/* Active Waypoint Tooltip Popup */}
        {activeWaypoint && (
          <div className="waypoint-tooltip">
            {activeWaypoint === 'cumin' && (
              <div>
                <strong>Padi Junction: Cumin & Mustard Hub</strong>
                <p>Whole country cumin (jeera) hand-selected from spice mandis and ground each dawn.</p>
              </div>
            )}
            {activeWaypoint === 'leaf' && (
              <div>
                <strong>Estate Green: Fresh Curry Leaves</strong>
                <p>Aromatic kariveppilai delivered fresh every morning from local farm orchards.</p>
              </div>
            )}
            {activeWaypoint === 'pepper' && (
              <div>
                <strong>Ambattur OT: Whole Black Pepper</strong>
                <p>Sun-dried Tellicherry black peppercorns crushed fresh for our traditional pepper mutton soup.</p>
              </div>
            )}
            <button className="tooltip-close" onClick={() => setActiveWaypoint(null)}>✕</button>
          </div>
        )}
      </div>

      {/* Bottom Information & Legend Strip */}
      <div className="spice-map-footer">
        <div className="spice-legend">
          <span className="legend-item">
            <span className="legend-swatch chilli"></span>
            <span>Chilli Red Route</span>
          </span>
          <span className="legend-item">
            <span className="legend-swatch turmeric"></span>
            <span>Turmeric MTH Road</span>
          </span>
          <span className="legend-item">
            <span className="legend-swatch green"></span>
            <span>Fresh Herb Greens</span>
          </span>
          <span className="legend-item">
            <span className="legend-swatch truck"></span>
            <span>Daily Spice Van</span>
          </span>
        </div>

        <div className="spice-quick-actions">
          <button className="copy-addr-btn" onClick={copyAddress} title="Copy exact address">
            {isCopied ? <Check size={13} className="text-green" /> : <MapPin size={13} />}
            <span>{isCopied ? 'Address Copied!' : 'Copy Address'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
