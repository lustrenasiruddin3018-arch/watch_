import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import type { OrderStatus } from '@/types'

const stages: OrderStatus[] = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered']

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('')
  const [tracked, setTracked] = useState(false)
  // Mocked current stage for demo purposes
  const currentStageIndex = 2

  return (
    <div className="container-px mx-auto py-16 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-navy mb-2 text-center">Track Your Order</h1>
      <p className="text-slate-500 text-center mb-8">Enter your order ID to see live status</p>

      <div className="flex gap-2 mb-10">
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="e.g. LUX-20260601-0042"
          className="flex-1 rounded-lg border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <button onClick={() => setTracked(orderId.trim().length > 0)} className="btn-primary">
          Track
        </button>
      </div>

      {tracked && (
        <div className="bg-white rounded-2xl shadow-glass p-8">
          <p className="text-sm text-slate-500 mb-6">
            Order <span className="font-semibold text-navy">{orderId}</span>
          </p>
          <div className="flex items-center justify-between">
            {stages.map((stage, i) => (
              <div key={stage} className="flex-1 flex flex-col items-center relative">
                {i > 0 && (
                  <div
                    className={`absolute top-4 right-1/2 w-full h-0.5 ${i <= currentStageIndex ? 'bg-gold' : 'bg-slate-200'}`}
                  />
                )}
                <div
                  className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center ${
                    i <= currentStageIndex ? 'bg-gold text-navy' : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <CheckCircle size={18} />
                </div>
                <p className={`text-xs mt-2 text-center ${i <= currentStageIndex ? 'text-navy font-semibold' : 'text-slate-400'}`}>
                  {stage}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
