import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-px mx-auto py-16 max-w-md">
      <h1 className="font-display text-3xl font-bold text-navy mb-2 text-center">Welcome Back</h1>
      <p className="text-slate-500 text-center mb-8">Login to your LUXTIME account</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-glass p-8 space-y-4">
        <div>
          <label className="text-sm font-semibold text-navy">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-navy">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="flex justify-between text-sm">
          <Link to="/forgot-password" className="text-gold hover:underline">
            Forgot Password?
          </Link>
          <Link to="/register" className="text-navy font-semibold hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}
