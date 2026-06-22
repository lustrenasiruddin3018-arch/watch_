import { Link } from 'react-router-dom'
import { categories } from '@/data/products'

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-surface">
      <div className="container-px mx-auto">
        <h2 className="section-title mb-10">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              to={`/watches?category=${cat.key}`}
              className="group relative rounded-2xl overflow-hidden shadow-glass bg-white hover:-translate-y-1 transition-transform duration-300"
            >
              <img src={cat.image} alt={cat.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-display font-bold text-navy mb-2">{cat.title}</h3>
                <ul className="text-xs text-slate-500 space-y-1">
                  {cat.points.map((pt) => (
                    <li key={pt}>&bull; {pt}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
