import { useProducts } from './hooks/useProducts'
import { useCart } from './hooks/useCart'
import RoomScene from './components/RoomScene'

export default function App() {
  const { products, loading, error } = useProducts(3)
  const { totalItems, addToCart, loading: cartLoading, goToCheckout } = useCart()

  if (loading) return (
    <div style={{
      color: '#4fc3f7', display: 'flex', alignItems: 'center',
      justifyContent: 'center', height: '100vh', background: '#080c10',
      fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase',
    }}>
      Loading H2 Store...
    </div>
  )

  if (error) return (
    <div style={{ color: '#f87171', padding: '2rem', background: '#080c10', minHeight: '100vh' }}>
      <strong>Error connecting to Shopify:</strong> {error}
      <br /><br />
      Check your .env file and make sure your VITE_SHOPIFY_STOREFRONT_TOKEN is correct.
    </div>
  )

  return (
    <RoomScene
      products={products}
      totalItems={totalItems}
      onAddToCart={addToCart}
      cartLoading={cartLoading}
      onCheckout={goToCheckout}
    />
  )
}
