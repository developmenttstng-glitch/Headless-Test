import { useState } from 'react'
import Hotspot from './Hotspot'
import ProductDrawer from './ProductDrawer'

const HOTSPOT_POSITIONS = [
  { x: '24%', y: '50%' },
  { x: '47%', y: '44%' },
  { x: '72%', y: '40%' },
]

export default function RoomScene({ products, totalItems, onAddToCart, cartLoading, onCheckout }) {
  const [activeProduct, setActiveProduct] = useState(null)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#080c10' }}>
      <style>{`
        @keyframes pulseRing {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.15); }
        }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 2.5rem',
        background: 'linear-gradient(to bottom, rgba(8,12,16,0.95), transparent)',
      }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a8c8e8' }}>
          H<span style={{ color: '#4fc3f7' }}>2</span> STORE
        </div>
        <button onClick={onCheckout} style={{
          background: 'none', border: '0.5px solid rgba(79,195,247,0.4)',
          color: '#8899aa', fontSize: '11px', letterSpacing: '0.15em',
          textTransform: 'uppercase', padding: '6px 14px', cursor: 'pointer',
        }}>
          Cart {totalItems > 0 && <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '18px', height: '18px', background: '#4fc3f7', color: '#080c10',
            fontSize: '10px', fontWeight: 700, borderRadius: '50%', marginLeft: '6px',
          }}>{totalItems}</span>}
        </button>
      </nav>

      {/* SVG Room Scene */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="g1" cx="35%" cy="55%" r="45%">
            <stop offset="0%" stopColor="#0d2a40" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#080c10" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="g2" cx="70%" cy="40%" r="35%">
            <stop offset="0%" stopColor="#0a1f1a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#080c10" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1400" height="800" fill="#080c10" />
        <rect width="1400" height="800" fill="url(#g1)" />
        <rect width="1400" height="800" fill="url(#g2)" />
        {/* Floor grid */}
        <line x1="0" y1="600" x2="1400" y2="600" stroke="rgba(79,195,247,0.06)" strokeWidth="1" />
        <g opacity="0.04" stroke="#4fc3f7" strokeWidth="0.5">
          {[620,650,690,740].map(y => <line key={y} x1="0" y1={y} x2="1400" y2={y} />)}
          {[0,233,466,700,933,1167,1400].map(x => <line key={x} x1="700" y1="600" x2={x} y2="800" />)}
        </g>
        {/* Silhouette 1 — jacket */}
        <g transform="translate(280,220)" opacity="0.75">
          <ellipse cx="60" cy="50" rx="22" ry="28" fill="#0d1f30" stroke="#1a3a55" strokeWidth="0.5" />
          <circle cx="60" cy="18" r="14" fill="#0d1f30" stroke="#1a3a55" strokeWidth="0.5" />
          <path d="M30 78 L20 200 L40 202 L60 150 L80 202 L100 200 L90 78 Q60 95 30 78Z" fill="#0f2535" stroke="#1e4060" strokeWidth="0.5" />
          <path d="M20 78 L0 160 L15 163 L30 100Z" fill="#0f2535" stroke="#1e4060" strokeWidth="0.5" />
          <path d="M100 78 L120 160 L105 163 L90 100Z" fill="#0f2535" stroke="#1e4060" strokeWidth="0.5" />
          <path d="M40 202 L35 370 L55 370 L60 280 L65 370 L85 370 L80 202Z" fill="#0d1820" stroke="#1a3040" strokeWidth="0.5" />
        </g>
        {/* Silhouette 2 — tank */}
        <g transform="translate(580,180)" opacity="0.85">
          <ellipse cx="100" cy="60" rx="70" ry="25" fill="#0d2033" stroke="#1e4060" strokeWidth="0.7" />
          <rect x="30" y="60" width="140" height="260" rx="8" fill="#0b1a24" stroke="#1a3a50" strokeWidth="0.7" />
          <ellipse cx="100" cy="320" rx="70" ry="25" fill="#0b1a24" stroke="#1a3a50" strokeWidth="0.7" />
          <circle cx="100" cy="155" r="32" fill="#0a1520" stroke="#1e4060" strokeWidth="0.7" />
          <circle cx="100" cy="155" r="26" fill="none" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.3" />
          <text x="100" y="150" textAnchor="middle" fontSize="16" fontFamily="monospace" fill="#4fc3f7" opacity="0.8">78%</text>
          <text x="100" y="167" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#6899aa" letterSpacing="1">CAPACITY</text>
          <rect x="85" y="35" width="30" height="12" rx="3" fill="#1a3a50" />
        </g>
        {/* Silhouette 3 — mask */}
        <g transform="translate(950,250)" opacity="0.75">
          <path d="M20 40 Q80 0 140 40 L150 130 Q80 175 10 130 Z" fill="#0b1f2d" stroke="#1a3a50" strokeWidth="0.7" />
          <path d="M35 55 Q80 22 125 55 L132 120 Q80 155 28 120 Z" fill="#0a1520" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.4" />
          <text x="80" y="92" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#4fc3f7" opacity="0.5">H2 99.7%</text>
        </g>
        {/* Particles */}
        {[[180,150,1.5],[450,90,1],[820,120,1.5],[1050,200,1],[1250,100,2]].map(([cx,cy,r],i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="#4fc3f7" opacity="0.15" />
        ))}
      </svg>

      {/* Hotspots */}
      {products.map((product, i) => (
        <Hotspot
          key={product.id}
          product={product}
          position={HOTSPOT_POSITIONS[i] || HOTSPOT_POSITIONS[0]}
          onClick={() => setActiveProduct(product)}
        />
      ))}

      {/* Room label */}
      <div style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', zIndex: 10 }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#4fc3f7', marginBottom: '0.4rem' }}>
          Room 01 — The Lab
        </div>
        <div style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 200, lineHeight: 1, color: '#e8eaed' }}>
          H<span style={{ color: '#4fc3f7' }}>2</span><br />STORE
        </div>
      </div>

      {/* Product drawer */}
      {activeProduct && (
        <ProductDrawer
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAddToCart={onAddToCart}
          cartLoading={cartLoading}
        />
      )}
    </div>
  )
}
