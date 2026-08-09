# ACE STORE

School merch for ACE School, built as a standalone fashion-brand storefront.
**WEAR YOUR ACE.**

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview   # serve the production build locally
```

## Add real product photography

Drop images into `public/images/products/` using the filenames referenced in
`src/data/products.js` (e.g. `hoodie-black-1.jpg`, `hoodie-black-2.jpg`).
Each `<ProductImage>` tries to load the real file first and only falls back
to a generated placeholder if it's missing — no code changes required.

## Add / edit products

Edit `src/data/products.js`. Each product needs `slug`, `category`
(`clothing` or `accessories`), `price`, `colors`, `sizes`, `description`,
`details`, `material`, and an `images` array (filenames without extension).

## Orders

Orders are saved to `localStorage` via `src/utils/orders.js`
(`buildOrder`, `saveOrder`, `getOrders`). No payment provider is wired up
yet — `PLACE ORDER` builds an order object, clears the cart, and routes to
`/success`. To go live later:

1. Swap the body of `saveOrder` in `src/utils/orders.js` for a Supabase
   (or other backend) call — the signature can stay the same.
2. Add a payment step between checkout submission and `/success` when
   you're ready to take real payments.

## Deploy to Netlify

This repo includes `netlify.toml` and `public/_redirects`, so client-side
routing (`/shop`, `/product/:slug`, etc.) works out of the box. Connect the
repo in Netlify, or drag-and-drop the `dist/` folder after `npm run build`.

## Structure

```
src/
  components/   reusable UI (Button, ProductCard, Header, etc.)
  pages/        route-level views
  layouts/      MainLayout (Header + Footer shell)
  data/         product catalog
  hooks/        useLocalStorage, useScrollReveal
  context/      CartContext
  utils/        formatting, placeholders, orders
  styles/       design tokens + global base styles
```
