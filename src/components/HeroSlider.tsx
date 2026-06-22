import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    title: 'Luxury Analog Collection',
    description: 'Timeless craftsmanship from the world\u2019s finest watchmakers.',
    image: 'https://placehold.co/1600x800/0F172A/D4AF37?text=Luxury+Analog',
    to: '/watches?category=Luxury',
  },
  {
    title: 'Smart Watch Series',
    description: 'Stay connected without compromising on style.',
    image: 'https://placehold.co/1600x800/1e293b/D4AF37?text=Smart+Watches',
    to: '/watches?category=Smart',
  },
  {
    title: 'Sports Watch Collection',
    description: 'Built tough for every adventure, on land or underwater.',
    image: 'https://placehold.co/1600x800/0F172A/FFFFFF?text=Sports+Watches',
    to: '/watches?category=Sports',
  },
  {
    title: 'Limited Edition Watches',
    description: 'Rare pieces for collectors who value exclusivity.',
    image: 'https://placehold.co/1600x800/1e293b/FFFFFF?text=Limited+Edition',
    to: '/watches?category=Luxury',
  },
]

export default function HeroSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <section className="relative h-[480px] md:h-[640px] w-full overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/50 to-transparent" />
          <div className="relative h-full flex items-center container-px mx-auto">
            <div className="max-w-xl text-white">
              <p className="text-gold font-semibold tracking-widest text-sm mb-3">LUXTIME PRESENTS</p>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 leading-tight">{slide.title}</h1>
              <p className="text-white/80 text-base md:text-lg mb-8">{slide.description}</p>
              <div className="flex gap-4">
                <Link to={slide.to} className="btn-primary">
                  Shop Now
                </Link>
                <Link to="/about" className="btn-outline">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-gold hover:text-navy text-white rounded-full p-2 transition-colors"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-gold hover:text-navy text-white rounded-full p-2 transition-colors"
      >
        <ChevronRight />
      </button>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-gold' : 'w-2 bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  )
}
