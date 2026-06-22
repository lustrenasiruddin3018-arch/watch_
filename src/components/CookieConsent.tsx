import { useEffect, useState } from 'react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('luxtime_cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('luxtime_cookie_consent', 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-navy text-white px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm text-white/80 text-center sm:text-left">
        We use cookies to remember your cart and preferences. See our{' '}
        <a href="/privacy-policy" className="text-gold underline">
          Privacy Policy
        </a>
        .
      </p>
      <button onClick={accept} className="bg-gold text-navy px-5 py-2 rounded-full text-sm font-semibold shrink-0">
        Accept
      </button>
    </div>
  )
}
