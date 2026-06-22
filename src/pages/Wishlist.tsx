import { Link } from 'react-router-dom'
import { useWishlist } from '@/context/WishlistContext'
import { getProductById } from '@/data/products'
import ProductCard from '@/components/ProductCard'

export default function Wishlist() {
  const { wishlist } = useWishlist()
  const products = wishlist.map((id) => getProductById(id)).filter(Boolean)

  if (products.length === 0) {
    return (
      <div className="container-px mx-auto py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-navy mb-3">Your wishlist is empty</h1>
        <p className="text-slate-500 mb-6">Save watches you love and find them here later.</p>
        <Link to="/watches" className="btn-primary">
          Browse Watches
        </Link>
      </div>
    )
  }

  return (
    <div className="container-px mx-auto py-10">
      <h1 className="font-display text-3xl font-bold text-navy mb-8">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => p && <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
