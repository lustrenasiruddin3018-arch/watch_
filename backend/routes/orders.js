import express from 'express'
import Order from '../models/Order.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

router.post('/', requireAuth, async (req, res) => {
  try {
    const { items, total } = req.body
    const order = await Order.create({ user: req.userId, items, total })
    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ message: 'Could not create order', error: err.message })
  }
})

router.get('/', requireAuth, async (req, res) => {
  const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 })
  res.json(orders)
})

router.get('/:id', requireAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.userId })
  if (!order) return res.status(404).json({ message: 'Order not found' })
  res.json(order)
})

export default router
