import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: String,
        quantity: Number,
        color: String,
        size: String,
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'],
      default: 'Processing',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Order', orderSchema)
