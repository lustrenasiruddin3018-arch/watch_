import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'
import { products, brands, categories } from '@/data/products'
import type { Category } from '@/types'

export default function Watches() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialCategory = (searchParams.get('category') as Category) || ''

  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState<Category | ''>(initialCategory)
  const [brand, setBrand] = useState('')
  const [sort, setSort] = useState<'default' | 'priceLow' | 'priceHigh' | 'rating'>('default')

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesQuery =
        query.trim() === '' ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.model.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === '' || p.category === category
      const matchesBrand = brand === '' || p.brand === brand
      return matchesQuery && matchesCategory && matchesBrand
    })

    if (sort === 'priceLow') list = [...list].sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price))
    if (sort === 'priceHigh') list = [...list].sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price))
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)

    return list
  }, [query, category, brand, sort])

  const updateParams = (next: { q?: string; category?: string }) => {
    const params = new URLSearchParams(searchParams)
    if (next.q !== undefined) params.set('q', next.q)
    if (next.category !== undefined) params.set('category', next.category)
    setSearchParams(params)
  }

  return (
    <div className="container-px mx-auto py-10">
      <h1 className="font-display text-3xl font-bold text-navy mb-2">All Watches</h1>
      <p className="text-slate-500 mb-8">{filtered.length} watches found</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-6">
          <div>
            <label className="text-sm font-semibold text-navy mb-2 block">Search</label>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                updateParams({ q: e.target.value })
              }}
              placeholder="Brand, model, category"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-navy mb-2 block">Category</label>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setCategory('')
                  updateParams({ category: '' })
                }}
                className={`block text-sm w-full text-left px-2 py-1 rounded ${category === '' ? 'bg-gold/20 text-navy font-semibold' : 'text-slate-600'}`}
              >
                All Categories
              </button>
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => {
                    setCategory(c.key)
                    updateParams({ category: c.key })
                  }}
                  className={`block text-sm w-full text-left px-2 py-1 rounded ${category === c.key ? 'bg-gold/20 text-navy font-semibold' : 'text-slate-600'}`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-navy mb-2 block">Brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-navy mb-2 block">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="default">Relevance</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </aside>

        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <p className="text-slate-500">No watches match your filters. Try adjusting your search.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
