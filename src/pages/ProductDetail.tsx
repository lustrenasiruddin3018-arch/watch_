import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Heart, Truck, ShieldCheck } from 'lucide-react'
import { getProductById, products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatINR } from '@/utils/format'
import ProductCard from '@/components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const product = id ? getProductById(id) : undefined
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()

  const [activeImage, setActiveImage] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [color, setColor] = useState(product?.colors[0] ?? '')
  const [size, setSize] = useState(product?.sizes[0] ?? '')
  const [tab, setTab] = useState<'description' | 'specs' | 'reviews' | 'warranty'>('description')

  if (!product) {
    return (
      <div className="container-px mx-auto py-20 text-center">
        <p className="text-slate-500">Watch not found.</p>
        <Link to="/watches" className="text-gold font-semibold">
          Back to all watches
        </Link>
      </div>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div className="container-px mx-auto py-10">
      <nav className="text-xs text-slate-400 mb-6">
        <Link to="/">Home</Link> / <Link to="/watches">Watches</Link> / <span className="text-navy">{product.model}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div
            className="overflow-hidden rounded-2xl bg-surface mb-4 cursor-zoom-in"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <img
              src={product.images[activeImage]}
              alt={product.model}
              className={`w-full h-[420px] object-cover transition-transform duration-500 ${zoom ? 'scale-125' : 'scale-100'}`}
            />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${i === activeImage ? 'border-gold' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400">{product.brand}</p>
          <h1 className="font-display text-3xl font-bold text-navy mb-2">{product.model}</h1>
          <div className="flex items-center gap-2 text-amber-500 text-sm mb-4">
            <Star size={16} fill="currentColor" />
            <span>{product.rating}</span>
            <span className="text-slate-400">({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-bold text-navy text-2xl">{formatINR(product.discountPrice ?? product.price)}</span>
            {product.discountPrice && (
              <span className="text-slate-400 line-through">{formatINR(product.price)}</span>
            )}
          </div>

          <p className="text-slate-600 mb-6">{product.description}</p>

          <div className="mb-4">
            <p className="text-sm font-semibold text-navy mb-2">Color</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-1.5 rounded-full text-sm border-2 ${color === c ? 'border-gold bg-gold/10' : 'border-slate-200'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-navy mb-2">Size</p>
            <div className="flex gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1.5 rounded-full text-sm border-2 ${size === s ? 'border-gold bg-gold/10' : 'border-slate-200'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={() => addToCart({ productId: product.id, quantity: 1, color, size })}
              className="flex-1 rounded-full border-2 border-navy text-navy font-semibold py-3 hover:bg-navy hover:text-white transition-colors"
            >
              Add to Cart
            </button>
            <Link
              to="/cart"
              onClick={() => addToCart({ productId: product.id, quantity: 1, color, size })}
              className="flex-1 text-center rounded-full bg-gold text-navy font-semibold py-3 hover:bg-navy hover:text-gold transition-colors"
            >
              Buy Now
            </Link>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist"
              className={`rounded-full p-3 border-2 ${isWishlisted(product.id) ? 'border-gold bg-gold text-navy' : 'border-slate-200 text-navy'}`}
            >
              <Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="flex flex-col gap-2 text-sm text-slate-600 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-gold" /> Free delivery in 3-5 business days
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-gold" /> {product.warranty.periodMonths / 12}-year manufacturer warranty
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex gap-6 border-b border-slate-200 mb-6 overflow-x-auto">
          {(['description', 'specs', 'reviews', 'warranty'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-semibold capitalize whitespace-nowrap ${
                tab === t ? 'text-navy border-b-2 border-gold' : 'text-slate-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'description' && (
          <div className="max-w-2xl text-slate-600 space-y-3">
            <p>{product.description}</p>
            <ul className="list-disc list-inside">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="bg-surface rounded-xl p-4 mt-4 text-sm">
              <p className="font-semibold text-navy mb-1">Manufacturer Details</p>
              <p>Name: {product.manufacturer.name}</p>
              <p>Country of Origin: {product.manufacturer.countryOfOrigin}</p>
              <p>Manufactured: {product.manufacturer.manufacturingDate}</p>
              <p>Material: {product.manufacturer.materialUsed}</p>
              <p>Contact: {product.manufacturer.contact}</p>
            </div>
          </div>
        )}

        {tab === 'specs' && (
          <table className="w-full max-w-xl text-sm">
            <tbody>
              {Object.entries(product.specifications).map(([key, value]) => (
                <tr key={key} className="border-b border-slate-100">
                  <td className="py-2 font-semibold text-navy w-1/3">{key}</td>
                  <td className="py-2 text-slate-600">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'reviews' && (
          <div className="space-y-4 max-w-2xl">
            {product.reviews.map((r) => (
              <div key={r.id} className="flex gap-4 border-b border-slate-100 pb-4">
                <img src={r.customerImage} alt={r.customerName} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-semibold text-navy text-sm">{r.customerName}</p>
                  <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">{r.comment}</p>
                  <p className="text-xs text-slate-400 mt-1">{r.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'warranty' && (
          <div className="max-w-2xl text-sm text-slate-600 space-y-2">
            <p><span className="font-semibold text-navy">Warranty Period:</span> {product.warranty.periodMonths} months</p>
            <p><span className="font-semibold text-navy">Coverage:</span> {product.warranty.coverage}</p>
            <p><span className="font-semibold text-navy">Replacement Policy:</span> {product.warranty.replacementPolicy}</p>
            <p><span className="font-semibold text-navy">Service Centers:</span> {product.warranty.serviceCenters.join(', ')}</p>
            <p><span className="font-semibold text-navy">Claim Process:</span> {product.warranty.claimProcess}</p>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="section-title text-left mb-6">Related Watches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
