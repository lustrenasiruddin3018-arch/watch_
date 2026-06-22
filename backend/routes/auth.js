import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

function signToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

function toSafeUser(user) {
  return { id: user._id, name: user.name, email: user.email, phone: user.phone }
}

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' })
    }
    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) return res.status(409).json({ message: 'Email already registered' })

    const passwordHash = await User.hashPassword(password)
    const user = await User.create({ name, email, phone, passwordHash })

    const token = signToken(user)
    res.status(201).json({ token, user: toSafeUser(user) })
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email?.toLowerCase() })
    if (!user) return res.status(401).json({ message: 'Invalid email or password' })

    const valid = await user.comparePassword(password)
    if (!valid) return res.status(401).json({ message: 'Invalid email or password' })

    const token = signToken(user)
    res.json({ token, user: toSafeUser(user) })
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message })
  }
})

export default router
