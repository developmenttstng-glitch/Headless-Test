import { useState } from 'react'

export default function ProductDrawer({ product, onClose, onAddToCart, cartLoading }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.edges?.[0]?.node || null
  )
  const [added, setAdded] = useState(false)

  if (!product) return null

  const price = parseFloat(
    selectedVariant?.price?.amount || product.priceRange.minVariantPrice.amount
  ).toFixed(2)
  const currency = selectedVariant?.price?.currencyCode || product.priceRange.minVariantPrice.currencyCode
  const variants = product.variants.edges.map((e) => e.node)
  const image = product.featuredImage?.url

  async function handleAdd() {
    if (!selectedVariant?.availableForSale) return
    await onAddToCart(selectedVariant.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.5)', zIndex: 200,
      }} />
      <div style={{
        position: 'fixed', right: 0, top: 0, bottom: 0, width: '360px',
        background: '#0d1520',
        borderLeft: '0.5px solid rgba(79,195,247,0.2)',
        zIndex: 201, display: 'flex', flexDirection: 'column',
        animation: 'slideIn 0.3s ease',
      }}>
        <style>{`
          @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        `}</style>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '0.5px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4a5568' }}>Product</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#8899aa', fontSize: '22px', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        {/* Body */}
        <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
          {image && (
            <div style={{ width: '100%', height: '200px', marginBottom: '1.5rem', background: '#0f1e2d', borderRadius: '4px', overflow: 'hidden' }}>
              <img src={image} alt={product.featuredImage?.altText || product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
            </div>
          )}
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4fc3f7', marginBottom: '0.5rem' }}>{product.handle}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 200, color: '#e8eaed', marginBottom: '0.4rem' }}>{product.title}</div>
          <div style={{ fontSize: '1.1rem', color: '#a8c8e8', marginBottom: '1.25rem' }}>{currency} ${price}</div>
          {product.description && (
            <div style={{ fontSize: '13px', lineHeight: 1.7, color: '#8899aa', marginBottom: '1.75rem' }}>{product.description}</div>
          )}
          {variants.length > 1 && (
            <>
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8899aa', marginBottom: '0.75rem' }}>Options</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {variants.map((v) => (
                  <button key={v.id} onClick={() => setSelectedVariant(v)} disabled={!v.availableForSale} style={{
                    minWidth: '44px', height: '44px', padding: '0 12px',
                    border: selectedVariant?.id === v.id ? '1px solid #4fc3f7' : '0.5px solid rgba(255,255,255,0.12)',
                    background: 'transparent',
                    color: !v.availableForSale ? '#4a5568' : selectedVariant?.id === v.id ? '#4fc3f7' : '#a8c8e8',
                    fontSize: '12px', cursor: v.availableForSale ? 'pointer' : 'not-allowed',
                    textDecoration: !v.availableForSale ? 'line-through' : 'none',
                  }}>
                    {v.title}
                  </button>
                ))}
              </div>
            </>
          )}
          <button onClick={handleAdd} disabled={cartLoading || !selectedVariant?.availableForSale} style={{
            width: '100%', padding: '1rem',
            background: added ? '#1d9e75' : '#4fc3f7',
            color: '#080c10', border: 'none',
            fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
            fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s',
            opacity: cartLoading ? 0.7 : 1,
          }}>
            {added ? '+ Added to cart' : cartLoading ? 'Adding...' : !selectedVariant?.availableForSale ? 'Unavailable' : 'Add to cart'}
          </button>
        </div>
      </div>
    </>
  )
}
