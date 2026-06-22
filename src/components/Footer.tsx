import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80 pt-16 pb-8">
      <div className="container-px mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div>
          <h3 className="font-display text-xl font-bold text-white mb-3">
            LUX<span className="text-gold">TIME</span>
          </h3>
          <p className="text-sm text-white/60">
            Premium timepieces for every moment that matters. Authorized retailer of the world's finest watch brands.
          </p>
          <div className="flex gap-3 mt-4">
            <Facebook size={18} />
            <Instagram size={18} />
            <Twitter size={18} />
            <Youtube size={18} />
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/watches" className="hover:text-gold">Watches</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/watches?category=Analog" className="hover:text-gold">Analog</Link></li>
            <li><Link to="/watches?category=Smart" className="hover:text-gold">Smart</Link></li>
            <li><Link to="/watches?category=Sports" className="hover:text-gold">Sports</Link></li>
            <li><Link to="/watches?category=Luxury" className="hover:text-gold">Luxury</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Customer Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/order-tracking" className="hover:text-gold">Track Order</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Warranty Policy</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-gold">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-gold">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Newsletter</h4>
          <p className="text-sm text-white/60 mb-3">Get early access to new arrivals and exclusive offers.</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex"
          >
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 rounded-l-full px-3 py-2 text-sm text-navy focus:outline-none"
            />
            <button type="submit" className="bg-gold text-navy px-4 rounded-r-full text-sm font-semibold">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-white/50">
        &copy; {new Date().getFullYear()} LUXTIME Watches. All rights reserved.
      </div>
    </footer>
  )
}
