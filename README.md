# LUXTIME Watches

A premium watch e-commerce site built with React 19, TypeScript, Vite, and Tailwind CSS, with an optional Express + MongoDB backend for authentication and orders.

## What's included

**Frontend** (`/`)
- Home page with auto-rotating hero slider, brands, categories, featured products
- Watch listing with search, category/brand filters, sorting
- Product detail page with image gallery + zoom, specs, reviews, warranty, manufacturer info, related products
- Cart with quantity control, GST calculation, coupon code (`LUXTIME10` for 10% off)
- Wishlist
- Login / Register pages wired to the backend JWT API
- Order tracking page with progress stages
- Contact page with map embed and form
- Privacy Policy, Terms, Cookie consent banner
- Sticky responsive navbar, footer with newsletter signup

**Backend** (`/backend`)
- Express server with JWT auth (register/login), bcrypt password hashing
- MongoDB/Mongoose models for User and Order
- CORS configured for the Vite dev server

> The frontend works fully on its own using mock product data in `src/data/products.ts`. The backend is only required for real login/register/order persistence — without it, Login/Register calls will fail gracefully with an error message.

## Setup

### 1. Frontend

```bash
npm install
cp .env.example .env   # adjust VITE_API_URL if needed
npm run dev
```

Visit `http://localhost:5173`.

### 2. Backend (optional, for auth + orders)

Requires a MongoDB instance (local or Atlas).

```bash
cd backend
npm install
cp .env.example .env   # set MONGO_URI and JWT_SECRET
npm run dev
```

The backend runs on `http://localhost:5000` by default.

## Folder structure

```text
src/
├── components/      Navbar, Footer, HeroSlider, ProductCard, etc.
├── pages/            Home, Watches, ProductDetail, Cart, Login, ...
├── context/           CartContext, WishlistContext, AuthContext
├── data/              Mock product/brand/category data
├── types/             Shared TypeScript types
├── utils/             api client, currency formatter
├── App.tsx
└── main.tsx
backend/
├── models/            User.js, Order.js
├── routes/            auth.js, orders.js
├── middleware/        auth.js (JWT guard)
└── server.js
```

## Notes & next steps

- Replace the placeholder images in `src/data/products.ts` with real product photography.
- Add a payment gateway integration (Razorpay/Stripe) at checkout in `Cart.tsx`.
- Wire `OrderTracking.tsx` to `GET /api/orders/:id` once you have real order IDs.
- Add Redux Toolkit slices if you outgrow Context for cart/wishlist/auth state.
- Add a `Product` collection + admin routes to the backend if you want to manage inventory dynamically instead of the static `products.ts` file.
