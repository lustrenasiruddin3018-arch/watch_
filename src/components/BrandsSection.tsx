import { brands } from '@/data/products'

export default function BrandsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-px mx-auto">
        <h2 className="section-title mb-10">Shop by Brand</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center rounded-2xl border border-slate-100 p-4 hover:shadow-glass hover:border-gold/40 transition-all duration-300"
            >
              <img src={brand.logo} alt={brand.name} className="rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
