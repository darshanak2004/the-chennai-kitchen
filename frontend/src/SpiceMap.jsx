import React, { useState } from 'react'
import { MapPin, Navigation, ZoomIn, ZoomOut, Compass, Layers, ArrowUpRight, Check } from 'lucide-react'

export default function SpiceMap({
  address = '35X9+VX5, Sai Nagar, Ambattur Industrial Estate, Chennai, Tamil Nadu 600058',
}) {
  const [zoom, setZoom] = useState(1)
  const [activeWaypoint, setActiveWaypoint] = useState(null)
  const [viewMode, setViewMode] = useState('spice') // 'spice' or 'live'
  const [isCopied, setIsCopied] = useState(false)

  const handleZoomIn = () => setZoom(z => Math.min(1.5, +(z + 0.15).toFixed(2)))
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

  // Realistic route path from Padi Flyover (East) along MTH Road, turning directly into Sai Nagar at The Chennai Kitchen
  const routePathD = 'M 885,245 L 710,255 Q 580,265 500,280 L 420,300 Q 375,312 355,325 L 342,342'

  return (
    <div className="spice-map-card">
      {/* Top Map Header / Controls Bar */}
      <div className="spice-map-toolbar">
        <div className="spice-map-title-wrap">
          <div className="spice-pulse-indicator" aria-hidden="true"></div>
          <div>
            <h3 className="spice-map-title">Route to The Chennai Kitchen</h3>
            <p className="spice-map-sub">
              Sai Nagar, Ambattur Industrial Estate · MTH Road (Near Bus Stand)
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
              <span className="dot turmeric"></span> Illustrated Route
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
              title="Google Map of The Chennai Kitchen, Sai Nagar, Ambattur Industrial Estate"
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
              aria-label="Clear realistic route map to The Chennai Kitchen, Sai Nagar, Ambattur"
            >
              <defs>
                {/* Clean Realistic Cartographic Gradients */}
                <linearGradient id="terrainBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#faf6ef" />
                  <stop offset="50%" stopColor="#f5efe4" />
                  <stop offset="100%" stopColor="#ebe1d3" />
                </linearGradient>

                <linearGradient id="lakeWater" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#cfe6de" />
                  <stop offset="100%" stopColor="#b2d6ca" />
                </linearGradient>

                <linearGradient id="parkGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e3ede5" />
                  <stop offset="100%" stopColor="#cfe2d4" />
                </linearGradient>

                <linearGradient id="primaryRoute" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e5a93b" />
                  <stop offset="40%" stopColor="#c53628" />
                  <stop offset="100%" stopColor="#982018" />
                </linearGradient>

                <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#2b1117" floodOpacity="0.14" />
                </filter>
                <filter id="destGlow" x="-25%" y="-25%" width="150%" height="150%">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#982018" floodOpacity="0.32" />
                </filter>
              </defs>

              {/* 1. Base Terrain Canvas */}
              <rect width="900" height="560" fill="url(#terrainBg)" />

              {/* Suburban & Industrial Zone Blocks (Realistic Zoning) */}
              {/* Sai Nagar Commercial Zone */}
              <rect x="300" y="320" width="130" height="90" rx="8" fill="#f2e8dc" stroke="#e0d1c0" strokeWidth="1" />
              <text x="365" y="395" fill="#88695d" fontSize="9" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">
                SAI NAGAR
              </text>

              {/* Ambattur Industrial Estate South Zone */}
              <rect x="460" y="330" width="220" height="190" rx="8" fill="#f0e6da" stroke="#dfd2c1" strokeWidth="1" />
              <text x="570" y="420" fill="#7d6155" fontSize="10" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">
                AMBATTUR INDUSTRIAL ESTATE
              </text>
              <text x="570" y="435" fill="#9e8478" fontSize="8" letterSpacing="0.05em" textAnchor="middle">
                (SIDCO Manufacturing & Tech Zone)
              </text>

              {/* North Residential Layout (Ram Nagar / Varadarajapuram) */}
              <rect x="260" y="90" width="230" height="140" rx="6" fill="#f5ede2" stroke="#e4d7c8" strokeWidth="1" />
              <text x="375" y="155" fill="#8c7368" fontSize="8.5" fontWeight="600" letterSpacing="0.06em" textAnchor="middle">
                AMBATTUR OLD TOWN (OT)
              </text>

              {/* 2. Natural Features (Ambattur Lake & Green Belts) */}
              <path
                d="M 40,40 Q 110,25 190,50 Q 250,70 230,130 Q 210,185 140,180 Q 70,175 35,135 Q 15,90 40,40 Z"
                fill="url(#lakeWater)"
                stroke="#97c5b6"
                strokeWidth="1.2"
              />
              <text x="120" y="110" fill="#2d6452" fontSize="11" fontWeight="700" letterSpacing="0.07em" textAnchor="middle">
                AMBATTUR ERI
              </text>
              <text x="120" y="125" fill="#4a7c6c" fontSize="8.5" letterSpacing="0.05em" textAnchor="middle">
                (Lake Wetland)
              </text>

              <path
                d="M 680,60 Q 760,45 840,65 Q 870,110 830,145 Q 770,160 690,130 Q 650,95 680,60 Z"
                fill="url(#parkGreen)"
                stroke="#bad8c5"
                strokeWidth="1"
              />
              <text x="760" y="105" fill="#316345" fontSize="9.5" fontWeight="600" letterSpacing="0.05em" textAnchor="middle">
                ESTATE ECO PARK
              </text>

              {/* 3. Secondary City Road Grid (Crisp Realistic Street Hierarchy) */}
              <g stroke="#dfd2c0" strokeLinecap="round" strokeLinejoin="round">
                {/* Secondary Cross Streets */}
                <path d="M 260,60 L 260,280" strokeWidth="4.5" />
                <path d="M 390,60 L 390,295" strokeWidth="5.5" />
                <path d="M 450,70 L 450,285" strokeWidth="4.5" />
                <path d="M 610,50 L 610,270" strokeWidth="5" />
                <path d="M 720,60 L 720,260" strokeWidth="5" />

                {/* Industrial Estate Grid */}
                <path d="M 120,380 L 120,535" strokeWidth="5" />
                <path d="M 230,360 L 230,535" strokeWidth="5" />
                <path d="M 342,342 L 342,535" strokeWidth="5" />
                <path d="M 630,300 L 630,535" strokeWidth="5" />
                <path d="M 740,280 L 740,535" strokeWidth="5.5" />
                <path d="M 80,440 L 880,440" strokeWidth="4" />
                <path d="M 100,505 L 880,505" strokeWidth="4" />
              </g>

              {/* Railway Line & Station */}
              <g opacity="0.88">
                <path d="M 220,70 L 890,70" stroke="#716055" strokeWidth="3" />
                <path d="M 220,70 L 890,70" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="6 6" />
                <rect x="330" y="58" width="85" height="23" rx="4" fill="#ffffff" stroke="#716055" strokeWidth="1" filter="url(#cardShadow)" />
                <text x="372" y="73" fill="#3a271f" fontSize="8.5" fontWeight="700" letterSpacing="0.04em" textAnchor="middle">
                  🚆 Ambattur Station
                </text>
              </g>

              {/* 4. Major Arterial Roads */}
              {/* Ambattur Industrial Estate 3rd Main Road */}
              <path d="M 505,280 L 505,535" stroke="#e8b146" strokeWidth="8" strokeLinecap="round" />
              <path d="M 505,280 L 505,535" stroke="#ffffff" strokeWidth="1.8" strokeDasharray="8 8" />
              <g transform="translate(517, 430) rotate(90)">
                <text fill="#684511" fontSize="8.5" fontWeight="700" letterSpacing="0.06em">
                  ESTATE 3RD MAIN ROAD
                </text>
              </g>

              {/* Chennai Bypass / Padi Flyover Connector */}
              <path d="M 845,35 L 845,535" stroke="#e0a635" strokeWidth="10" strokeLinecap="round" />
              <g transform="translate(857, 180) rotate(90)">
                <text fill="#664109" fontSize="9" fontWeight="700" letterSpacing="0.07em">
                  CHENNAI BYPASS / PADI FLYOVER →
                </text>
              </g>

              {/* MTH Road (Madras Thiruvallur High Road / NH 716) */}
              <path
                d="M 20,380 L 170,360 L 320,340 Q 410,320 500,280 L 710,255 L 890,245"
                stroke="#dfa338"
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 20,380 L 170,360 L 320,340 Q 410,320 500,280 L 710,255 L 890,245"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeDasharray="10 10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* MTH Road High-Contrast Shield Badge */}
              <g transform="translate(630, 242)">
                <rect x="-85" y="-12" width="170" height="18" rx="9" fill="#ffffff" stroke="#c98e26" strokeWidth="1" filter="url(#cardShadow)" />
                <text x="0" y="1" fill="#663f0d" fontSize="9.5" fontWeight="700" letterSpacing="0.07em" textAnchor="middle">
                  MTH ROAD (NH 716)
                </text>
              </g>

              {/* Ambattur OT Bus Stand Complex Outline */}
              <g transform="translate(295, 305)">
                <rect x="0" y="0" width="80" height="46" rx="6" fill="#ffffff" stroke="#d5a034" strokeWidth="1.2" strokeDasharray="3 3" />
                <text x="40" y="16" fill="#78470a" fontSize="7.5" fontWeight="700" textAnchor="middle">
                  BUS STAND
                </text>
                <text x="40" y="26" fill="#78470a" fontSize="7" fontWeight="600" textAnchor="middle">
                  COMPLEX
                </text>
                <circle cx="15" cy="36" r="2.5" fill="#2d6040" />
                <circle cx="26" cy="36" r="2.5" fill="#2d6040" />
                <circle cx="37" cy="36" r="2.5" fill="#2d6040" />
                <text x="50" y="38" fill="#6e574c" fontSize="6.5">Bays</text>
              </g>

              {/* Sai Nagar Street Connector */}
              <path d="M 320,340 L 342,342 L 350,380" stroke="#f0c265" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

              {/* 5. Highlighted Direct Route */}
              {/* Route Ambient Glow */}
              <path
                d={routePathD}
                fill="none"
                stroke="#fce7a2"
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.75"
              />
              {/* Route Core Line */}
              <path
                id="spiceDeliveryRoutePath"
                d={routePathD}
                fill="none"
                stroke="url(#primaryRoute)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Directional Dash Flow */}
              <path
                d={routePathD}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="7 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="route-dash-flow"
              />

              {/* 6. Subtle Spice Waypoint Markers along the Journey */}
              {/* Waypoint 1: Padi Junction (Cumin) */}
              <g
                className="spice-waypoint"
                transform="translate(735, 230)"
                onClick={() => setActiveWaypoint(activeWaypoint === 'cumin' ? null : 'cumin')}
                style={{ cursor: 'pointer' }}
              >
                <circle cx="0" cy="0" r="13" fill="#ffffff" stroke="#c88b22" strokeWidth="1.5" filter="url(#cardShadow)" />
                <ellipse cx="-3" cy="-2" rx="3.5" ry="1.6" fill="#8d5b1d" transform="rotate(-30 -3 -2)" />
                <ellipse cx="3" cy="-1" rx="3.5" ry="1.6" fill="#6a4413" transform="rotate(25 3 -1)" />
                <ellipse cx="0" cy="3.5" rx="3.5" ry="1.6" fill="#a46b24" transform="rotate(75 0 3.5)" />
                <rect x="-34" y="-27" width="68" height="14" rx="7" fill="#ffffff" stroke="#c88b22" strokeWidth="0.8" />
                <text x="0" y="-18" fill="#6a3e08" fontSize="7" fontWeight="700" letterSpacing="0.04em" textAnchor="middle">
                  CUMIN SEEDS
                </text>
              </g>

              {/* Waypoint 2: Estate Road Junction (Curry Leaves) */}
              <g
                className="spice-waypoint"
                transform="translate(510, 255)"
                onClick={() => setActiveWaypoint(activeWaypoint === 'leaf' ? null : 'leaf')}
                style={{ cursor: 'pointer' }}
              >
                <circle cx="0" cy="0" r="13" fill="#ffffff" stroke="#245a35" strokeWidth="1.5" filter="url(#cardShadow)" />
                <path d="M -6,5 Q 0,-3 6,-5 Q 3,3 -6,5 Z" fill="#2d6a42" stroke="#1b4329" strokeWidth="0.5" />
                <line x1="-5" y1="4" x2="5" y2="-4" stroke="#a3d9b5" strokeWidth="0.6" />
                <rect x="-40" y="-27" width="80" height="14" rx="7" fill="#ffffff" stroke="#245a35" strokeWidth="0.8" />
                <text x="0" y="-18" fill="#184a2b" fontSize="7" fontWeight="700" letterSpacing="0.04em" textAnchor="middle">
                  CURRY LEAVES
                </text>
              </g>

              {/* Waypoint 3: OT Junction (Black Pepper) */}
              <g
                className="spice-waypoint"
                transform="translate(415, 280)"
                onClick={() => setActiveWaypoint(activeWaypoint === 'pepper' ? null : 'pepper')}
                style={{ cursor: 'pointer' }}
              >
                <circle cx="0" cy="0" r="13" fill="#ffffff" stroke="#7e1724" strokeWidth="1.5" filter="url(#cardShadow)" />
                <circle cx="-3" cy="-3" r="2.8" fill="#2c1519" />
                <circle cx="3.5" cy="-2" r="2.4" fill="#4a2128" />
                <circle cx="0" cy="3.5" r="2.6" fill="#1f0d11" />
                <circle cx="-2" cy="-4" r="0.7" fill="#f5eee7" opacity="0.6" />
                <rect x="-38" y="-27" width="76" height="14" rx="7" fill="#ffffff" stroke="#7e1724" strokeWidth="0.8" />
                <text x="0" y="-18" fill="#58101a" fontSize="7" fontWeight="700" letterSpacing="0.04em" textAnchor="middle">
                  BLACK PEPPER
                </text>
              </g>

              {/* 7. Animated Delivery Vehicle Carrying Spice Sacks */}
              <g className="spice-delivery-truck">
                <g transform="translate(-24, -14)">
                  {/* Cargo Bed with Jute Spice Sacks */}
                  <rect x="0" y="6" width="22" height="13" rx="2" fill="#3c161c" stroke="#220b0e" strokeWidth="0.8" />

                  {/* 3 Spice Sacks */}
                  {/* Sack 1 (Turmeric) */}
                  <ellipse cx="6" cy="7" rx="5" ry="4.5" fill="#e5a93b" stroke="#6f4810" strokeWidth="0.6" />
                  <ellipse cx="6" cy="4.5" rx="2" ry="1.2" fill="#fce498" />

                  {/* Sack 2 (Chilli) */}
                  <ellipse cx="14" cy="7" rx="5" ry="4.5" fill="#b8261b" stroke="#5b110b" strokeWidth="0.6" />
                  <path d="M 13,3 Q 16,1 17,4" stroke="#e52d1f" strokeWidth="1.2" fill="none" />

                  {/* Sack 3 (Cumin/Coriander) */}
                  <ellipse cx="10" cy="3" rx="4.5" ry="3.5" fill="#9d7342" stroke="#483115" strokeWidth="0.6" />

                  {/* Driver Cab */}
                  <path d="M 21,5 L 34,5 L 38,12 L 38,19 L 21,19 Z" fill="#b8261b" stroke="#5b110b" strokeWidth="0.8" />
                  <path d="M 28,6 L 33,6 L 36,12 L 28,12 Z" fill="#e6f4ff" stroke="#3c161c" strokeWidth="0.6" />

                  {/* Golden Headlight */}
                  <circle cx="38" cy="14" r="1.8" fill="#fde047" />
                  <polygon points="39,13 48,10 48,18 39,15" fill="#fde047" opacity="0.3" />

                  {/* Wheels */}
                  <circle cx="7" cy="19" r="3.6" fill="#1b0b0f" stroke="#68554d" strokeWidth="1" />
                  <circle cx="7" cy="19" r="1.2" fill="#ffffff" />
                  <circle cx="32" cy="19" r="3.6" fill="#1b0b0f" stroke="#68554d" strokeWidth="1" />
                  <circle cx="32" cy="19" r="1.2" fill="#ffffff" />

                  {/* Floating Tag */}
                  <rect x="2" y="-12" width="40" height="12" rx="4" fill="#ffffff" stroke="#b8261b" strokeWidth="0.8" filter="url(#cardShadow)" />
                  <text x="22" y="-3.5" fill="#982018" fontSize="7" fontWeight="800" textAnchor="middle" letterSpacing="0.03em">
                    SPICE VAN 🚚
                  </text>
                </g>

                <animateMotion
                  path={routePathD}
                  dur="14s"
                  repeatCount="indefinite"
                  rotate="auto"
                  keyPoints="0; 0.95; 1; 1"
                  keyTimes="0; 0.78; 0.92; 1"
                />
              </g>

              {/* 8. Destination Restaurant Pin (Sai Nagar, Ambattur Industrial Estate) */}
              <g transform="translate(342, 342)" filter="url(#destGlow)">
                <circle cx="0" cy="0" r="30" fill="#e5a93b" opacity="0.22" className="beacon-ripple-outer" />
                <circle cx="0" cy="0" r="20" fill="#b8261b" opacity="0.28" className="beacon-ripple-inner" />

                {/* Main Destination Pin */}
                <path
                  d="M 0,-42 C -18,-42 -22,-24 0,0 C 22,-24 18,-42 0,-42 Z"
                  fill="url(#primaryRoute)"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
                <circle cx="0" cy="-24" r="12" fill="#ffffff" />
                <circle cx="0" cy="-24" r="9" fill="#982018" />
                <text x="0" y="-20.5" fill="#f6ce7b" fontSize="9" fontWeight="900" textAnchor="middle">
                  🍲
                </text>

                {/* Destination Info Card */}
                <g transform="translate(-115, -114)" filter="url(#cardShadow)">
                  <rect x="0" y="0" width="230" height="64" rx="10" fill="#ffffff" stroke="#b8261b" strokeWidth="1.8" />
                  <rect x="0" y="0" width="230" height="4" rx="2" fill="#e5a93b" />

                  <text x="14" y="22" fill="#982018" fontSize="12" fontWeight="800" letterSpacing="0.03em">
                    THE CHENNAI KITCHEN
                  </text>
                  <text x="14" y="38" fill="#3b261d" fontSize="9" fontWeight="700">
                    35X9+VX5, Sai Nagar
                  </text>
                  <text x="14" y="50" fill="#6d5449" fontSize="8">
                    Ambattur Industrial Estate, Chennai 600058
                  </text>

                  {/* Rating Badge */}
                  <rect x="185" y="12" width="34" height="17" rx="8.5" fill="#fdf4df" stroke="#d5a034" strokeWidth="0.8" />
                  <text x="202" y="24" fill="#7d4b07" fontSize="8" fontWeight="800" textAnchor="middle">
                    ★ 4.9
                  </text>
                </g>
              </g>

              {/* Exact Plus Code Footer Mark on Map */}
              <g transform="translate(35, 525)" opacity="0.75">
                <text fill="#68473a" fontSize="9" fontWeight="700" letterSpacing="0.06em">
                  📍 35X9+VX5 · SAI NAGAR, AMBATTUR INDUSTRIAL ESTATE
                </text>
              </g>
            </svg>
          </div>
        )}

        {/* Familiar Map Navigation Controls */}
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
            aria-label="Recenter on The Chennai Kitchen"
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
                <strong>Padi Junction: Cumin & Mustard</strong>
                <p>Whole country cumin (jeera) hand-selected from spice mandis and ground fresh at dawn.</p>
              </div>
            )}
            {activeWaypoint === 'leaf' && (
              <div>
                <strong>Estate Junction: Fresh Curry Leaves</strong>
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

      {/* Clean Bottom Location Strip (Removed color-naming labels) */}
      <div className="spice-map-footer">
        <div className="spice-location-badges">
          <span className="loc-badge">
            <span className="loc-dot"></span>
            <span>MTH Road Highway</span>
          </span>
          <span className="loc-badge">
            <span className="loc-dot green"></span>
            <span>Sai Nagar Entrance</span>
          </span>
          <span className="loc-badge">
            <span className="loc-dot gold"></span>
            <span>Near OT Bus Stand</span>
          </span>
        </div>

        <div className="spice-quick-actions">
          <button className="copy-addr-btn" onClick={copyAddress} title="Copy exact address">
            {isCopied ? <Check size={13} className="text-green" /> : <MapPin size={13} />}
            <span>{isCopied ? 'Address Copied!' : 'Copy Exact Address'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
