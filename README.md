# LUXTIME Watches

A premium watch e-commerce site built with React 19, TypeScript, Vite, and Tailwind CSS. Frontend-only — no server required.

## What's included

- Home page with auto-rotating hero slider, brands, categories, featured products
- Watch listing with search, category/brand filters, sorting
- Product detail page with image gallery + zoom, specs, reviews, warranty, manufacturer info, related products
- Cart with quantity control, GST calculation, coupon code (`LUXTIME10` for 10% off)
- Wishlist
- Login / Register with local mock authentication (stored in `localStorage` — see note below)
- Order tracking page with progress stages
- Contact page with map embed and form
- Privacy Policy, Terms, cookie consent banner
- Sticky responsive navbar, footer with newsletter signup

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

```bash
npm run build      # production build to /dist
npm run preview     # preview the production build locally
```

## Authentication note

Login/Register in this project is a **local-only mock** for demo purposes (`src/context/AuthContext.tsx`). Accounts are stored in the browser's `localStorage`, with no real server, no password hashing, and no security guarantees. If you need real authentication, replace `AuthContext` with calls to your own backend (e.g. Express + JWT, Firebase Auth, Supabase, Auth0, etc.).

## Folder structure

```text
src/
├── components/      Navbar, Footer, HeroSlider, ProductCard, etc.
├── pages/            Home, Watches, ProductDetail, Cart, Login, ...
├── context/           CartContext, WishlistContext, AuthContext
├── data/              Mock product/brand/category data
├── types/             Shared TypeScript types
├── utils/             currency formatter
├── App.tsx
└── main.tsx
```

## Deploying to Vercel

This repo includes a `vercel.json` with SPA rewrites so client-side routes (e.g. `/watches`, `/product/:id`) work on refresh. Just connect the repo in Vercel — it auto-detects the Vite framework, build command, and output directory.

## Notes & next steps

- Replace the placeholder images in `src/data/products.ts` with real product photography.
- Add a payment gateway integration (Razorpay/Stripe) at checkout in `Cart.tsx`.
- Add a real backend if you need persistent accounts, orders, or inventory management.
- Add Redux Toolkit slices if you outgrow Context for cart/wishlist/auth state.
