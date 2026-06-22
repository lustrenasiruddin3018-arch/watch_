import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { getProductById } from '@/data/products'
import { formatINR } from '@/utils/format'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, gst, total, clearCart } = useCart()
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponMessage, setCouponMessage] = useState('')
  const navigate = useNavigate()

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'LUXTIME10') {
      setDiscount(Math.round(subtotal * 0.1))
      setCouponMessage('Coupon applied! 10% off your order.')
    } else {
      setDiscount(0)
      setCouponMessage('Invalid coupon code.')
    }
  }

  const grandTotal = total - discount

  if (items.length === 0) {
    return (
      <div className="container-px mx-auto py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-navy mb-3">Your cart is empty</h1>
        <p className="text-slate-500 mb-6">Browse our collection to find your next timepiece.</p>
        <Link to="/watches" className="btn-primary">
          Shop Watches
        </Link>
      </div>
    )
  }

  return (
    <div className="container-px mx-auto py-10">
      <h1 className="font-display text-3xl font-bold text-navy mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const product = getProductById(item.productId)
            if (!product) return null
            const price = product.discountPrice ?? product.price
            return (
              <div
                key={`${item.productId}-${item.color}-${item.size}`}
                className="flex gap-4 bg-white rounded-xl shadow-glass p-4"
              >
                <img src={product.images[0]} alt={product.model} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="text-xs text-slate-400">{product.brand}</p>
                  <p className="font-semibold text-navy">{product.model}</p>
                  <p className="text-xs text-slate-500">
                    Color: {item.color} &middot; Size: {item.size}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-slate-200 rounded-full">
                      <button
                        onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                        className="px-3 py-1 text-navy"
                      >
                        -
                      </button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                        className="px-3 py-1 text-navy"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.color, item.size)}
                      className="text-red-500 text-sm flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
                <p className="font-bold text-navy">{formatINR(price * item.quantity)}</p>
              </div>
            )
          })}
          <button onClick={clearCart} className="text-sm text-slate-400 hover:text-red-500">
            Clear Cart
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-glass p-6 h-fit">
          <h2 className="font-display font-bold text-navy mb-4">Order Summary</h2>
          <div className="flex gap-2 mb-4">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code (try LUXTIME10)"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button onClick={applyCoupon} className="px-4 rounded-lg bg-navy text-white text-sm font-semibold">
              Apply
            </button>
          </div>
          {couponMessage && <p className="text-xs text-slate-500 mb-3">{couponMessage}</p>}

          <div className="space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>{formatINR(gst)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span>-{formatINR(discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-navy text-base border-t border-slate-100 pt-2">
              <span>Total</span>
              <span>{formatINR(grandTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/order-tracking')}
            className="w-full btn-primary mt-6"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
