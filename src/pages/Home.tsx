import { Link } from 'react-router-dom'
import HeroSlider from '@/components/HeroSlider'
import BrandsSection from '@/components/BrandsSection'
import CategoriesSection from '@/components/CategoriesSection'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'

export default function Home() {
  const featured = products.slice(0, 4)

  return (
    <div>
      <HeroSlider />
      <BrandsSection />
      <CategoriesSection />

      <section className="py-16 bg-white">
        <div className="container-px mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="section-title text-left">Featured Watches</h2>
            <Link to="/watches" className="text-sm font-semibold text-gold hover:text-navy">
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy text-white text-center">
        <div className="container-px mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold mb-4">Join the LUXTIME Inner Circle</h2>
          <p className="text-white/70 mb-6">Subscribe for early access to limited editions and member-only pricing.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 rounded-l-full px-4 py-3 text-navy focus:outline-none"
            />
            <button type="submit" className="bg-gold text-navy px-6 rounded-r-full font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
