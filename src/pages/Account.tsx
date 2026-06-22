import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function Account() {
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <div className="container-px mx-auto py-16 max-w-md">
      <h1 className="font-display text-3xl font-bold text-navy mb-6 text-center">My Account</h1>
      <div className="bg-white rounded-2xl shadow-glass p-8 space-y-3">
        <p><span className="font-semibold text-navy">Name:</span> {user?.name}</p>
        <p><span className="font-semibold text-navy">Email:</span> {user?.email}</p>
        {user?.phone && <p><span className="font-semibold text-navy">Phone:</span> {user.phone}</p>}
        <button onClick={logout} className="w-full btn-primary mt-4">
          Logout
        </button>
      </div>
    </div>
  )
}
