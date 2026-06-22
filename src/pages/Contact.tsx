import { useState, type FormEvent } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="container-px mx-auto py-16">
      <h1 className="font-display text-3xl font-bold text-navy mb-10 text-center">Contact Us</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <MapPin className="text-gold mt-1" />
            <div>
              <p className="font-semibold text-navy">Address</p>
              <p className="text-slate-600 text-sm">42 Mahatma Gandhi Road, Thiruvananthapuram, Kerala 695001, India</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="text-gold mt-1" />
            <div>
              <p className="font-semibold text-navy">Email Support</p>
              <p className="text-slate-600 text-sm">support@luxtimewatches.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-gold mt-1" />
            <div>
              <p className="font-semibold text-navy">Phone</p>
              <p className="text-slate-600 text-sm">+91 471 222 0000</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden h-64 mt-4">
            <iframe
              title="LUXTIME Store Location"
              className="w-full h-full border-0"
              loading="lazy"
              src="https://maps.google.com/maps?q=Thiruvananthapuram&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-glass p-8 space-y-4">
          {submitted ? (
            <p className="text-emerald-600 font-semibold">Thanks for reaching out — our team will respond within 24 hours.</p>
          ) : (
            <>
              <div>
                <label className="text-sm font-semibold text-navy">Name</label>
                <input required className="w-full mt-1 rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <div>
                <label className="text-sm font-semibold text-navy">Email</label>
                <input type="email" required className="w-full mt-1 rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <div>
                <label className="text-sm font-semibold text-navy">Message</label>
                <textarea required rows={5} className="w-full mt-1 rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
