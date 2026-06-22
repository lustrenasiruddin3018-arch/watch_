import { Link, useNavigate } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import type { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatINR } from '@/utils/format'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const navigate = useNavigate()
  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = () => {
    addToCart({ productId: product.id, quantity: 1, color: product.colors[0], size: product.sizes[0] })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/cart')
  }

  return (
    <div className="group bg-white rounded-2xl shadow-glass overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={`${product.brand} ${product.model}`}
            loading="lazy"
            className="w-full h-56 object-cover"
          />
        </Link>
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className={`absolute top-3 right-3 rounded-full p-2 ${
            wishlisted ? 'bg-gold text-navy' : 'bg-white/80 text-navy'
          }`}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        {product.discountPrice && (
          <span className="absolute top-3 left-3 bg-navy text-gold text-xs font-bold px-2 py-1 rounded-full">
            {Math.round(100 - (product.discountPrice / product.price) * 100)}% OFF
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-slate-400 uppercase tracking-wide">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-navy mb-1 hover:text-gold transition-colors">
            {product.model}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-xs text-amber-500 mb-2">
          <Star size={14} fill="currentColor" />
          <span>{product.rating}</span>
          <span className="text-slate-400">({product.reviewCount})</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {product.features.slice(0, 2).map((f) => (
            <span key={f} className="text-[10px] bg-surface text-slate-500 px-2 py-0.5 rounded-full">
              {f}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-2">
          {product.colors.map((c) => (
            <span key={c} title={c} className="w-3.5 h-3.5 rounded-full border border-slate-300" style={{ backgroundColor: c.toLowerCase() }} />
          ))}
        </div>
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-bold text-navy text-lg">{formatINR(product.discountPrice ?? product.price)}</span>
            {product.discountPrice && (
              <span className="text-sm text-slate-400 line-through">{formatINR(product.price)}</span>
            )}
          </div>
          <p className={`text-xs mb-3 ${product.inStock ? 'text-emerald-600' : 'text-red-500'}`}>
            {product.inStock ? `In Stock (${product.stockCount})` : 'Out of Stock'}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 text-xs font-semibold rounded-full border-2 border-navy text-navy py-2 hover:bg-navy hover:text-white transition-colors disabled:opacity-40"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="flex-1 text-xs font-semibold rounded-full bg-gold text-navy py-2 hover:bg-navy hover:text-gold transition-colors disabled:opacity-40"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
