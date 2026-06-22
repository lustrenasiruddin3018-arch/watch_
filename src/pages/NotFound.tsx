import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-px mx-auto py-24 text-center">
      <h1 className="font-display text-5xl font-bold text-navy mb-4">404</h1>
      <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  )
}
