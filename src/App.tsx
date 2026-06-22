import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import CookieConsent from '@/components/CookieConsent'
import Home from '@/pages/Home'
import Watches from '@/pages/Watches'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Wishlist from '@/pages/Wishlist'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Account from '@/pages/Account'
import Contact from '@/pages/Contact'
import About from '@/pages/About'
import OrderTracking from '@/pages/OrderTracking'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import Terms from '@/pages/Terms'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watches" element={<Watches />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <CookieConsent />
    </>
  )
}
