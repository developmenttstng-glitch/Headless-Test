import { useState } from 'react'

export default function Hotspot({ product, position, onClick }) {
  const [hovered, setHovered] = useState(false)

  if (!product) return null

  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)
  const currency = product.priceRange.minVariantPrice.currencyCode

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: '32px',
        height: '32px',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        zIndex: 10,
      }}
    >
      {/* Outer pulse ring */}
      <div style={{
        position: 'absolute', inset: '-6px',
        border: '1.5px solid rgba(79,195,247,0.25)',
        borderRadius: '50%',
        animation: 'pulseRing 2.5s ease-in-out infinite 0.4s',
      }} />
      {/* Inner pulse ring */}
      <div style={{
        position: 'absolute', inset: 0,
        border: '1.5px solid rgba(79,195,247,0.6)',
        borderRadius: '50%',
        animation: 'pulseRing 2.5s ease-in-out infinite',
      }} />
      {/* Dot */}
      <div style={{
        position: 'absolute',
        width: '8px', height: '8px',
        background: '#4fc3f7',
        borderRadius: '50%',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 8px rgba(79,195,247,0.8)',
        transition: 'scale 0.15s',
        scale: hovered ? '1.3' : '1',
      }} />
      {/* Tooltip */}
      {hovered && (
        <div style={{
          position: 'absolute',
          left: '44px', top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(8,12,16,0.95)',
          border: '0.5px solid rgba(79,195,247,0.4)',
          padding: '0.6rem 1rem',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 20,
        }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e8eaed', fontWeight: 500 }}>
            {product.title}
          </div>
          <div style={{ fontSize: '11px', color: '#4fc3f7', marginTop: '2px' }}>
            {currency} ${price}
          </div>
        </div>
      )}
    </div>
  )
}
