import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useAuth } from '@/context/AuthContext'
import { products } from '@/data/products'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Watches', to: '/watches' },
  { label: 'Brands', to: '/watches' },
  { label: 'Categories', to: '/watches' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<typeof products>([])
  const { itemCount } = useCart()
  const { wishlist } = useWishlist()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleQueryChange = (value: string) => {
    setQuery(value)
    if (value.trim().length === 0) {
      setSuggestions([])
      return
    }
    const q = value.toLowerCase()
    setSuggestions(
      products
        .filter(
          (p) =>
            p.brand.toLowerCase().includes(q) ||
            p.model.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        )
        .slice(0, 5)
    )
  }

  const submitSearch = () => {
    if (query.trim()) {
      navigate(`/watches?q=${encodeURIComponent(query.trim())}`)
      setSuggestions([])
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg' : 'bg-navy/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-px mx-auto flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="font-display text-xl lg:text-2xl font-bold text-white tracking-wide">
          LUX<span className="text-gold">TIME</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-white/80 hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center relative">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
              placeholder="Search brand, model, category..."
              className="w-56 lg:w-72 rounded-full bg-white/10 text-white placeholder-white/50 text-sm px-4 py-2 pr-9 border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Search watches"
            />
            <Search
              size={16}
              onClick={submitSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 cursor-pointer"
            />
            {suggestions.length > 0 && (
              <ul className="absolute mt-2 w-full bg-white rounded-xl shadow-glass overflow-hidden z-50">
                {suggestions.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/product/${p.id}`}
                      onClick={() => setSuggestions([])}
                      className="block px-4 py-2 text-sm text-navy hover:bg-surface"
                    >
                      {p.brand} {p.model}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-5">
          <button
            onClick={() => navigate(isAuthenticated ? '/account' : '/login')}
            className="hidden sm:flex items-center gap-1 text-white/90 hover:text-gold text-sm font-medium"
            aria-label="Account"
          >
            <User size={18} />
            {isAuthenticated ? user?.name.split(' ')[0] : 'Login'}
          </button>
          {isAuthenticated && (
            <button onClick={logout} className="hidden sm:inline text-xs text-white/60 hover:text-gold">
              Logout
            </button>
          )}
          <Link to="/wishlist" className="relative text-white/90 hover:text-gold" aria-label="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-navy text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative text-white/90 hover:text-gold" aria-label="Cart">
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-navy text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="lg:hidden text-white" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-navy border-t border-white/10 px-4 pb-4">
          <div className="relative mb-3 mt-3">
            <input
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
              placeholder="Search watches..."
              className="w-full rounded-full bg-white/10 text-white placeholder-white/50 text-sm px-4 py-2 border border-white/20 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-white/90 py-2 text-sm border-b border-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
