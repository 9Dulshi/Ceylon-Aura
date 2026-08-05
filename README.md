# Ceylon Aura — Full-Stack Demo Storefront

A resortwear/clothing brand demo site showing a real **front end → backend → database** flow:

- **Frontend** — React 18 + Vite, plain CSS (no build-step Tailwind), `lucide-react` icons
- **Backend** — Node.js + Express REST API
- **Database** — a JSON file (`server/db.json`) read/written by the API. Swap it for
  Postgres/MongoDB/etc. later without touching the frontend — only `server/db.js` would change.

```
ceylon-aura/
├── server/            Express API
│   ├── db.json         "database" file (products, orders, subscribers)
│   ├── db.js           tiny read/write helper around db.json
│   ├── index.js        app entry, mounts routes, starts the server
│   └── routes/
│       ├── products.js
│       ├── orders.js
│       └── subscribers.js
└── client/            React (Vite) frontend
    └── src/
        ├── App.jsx
        ├── api.js             fetch wrapper that calls the Express API
        ├── data.js            static copy (timeline, testimonials)
        ├── context/CartContext.jsx
        └── components/
            ├── Navbar.jsx
            ├── Hero.jsx
            ├── Story.jsx
            ├── Products.jsx
            ├── ProductCard.jsx
            ├── Testimonials.jsx
            ├── Newsletter.jsx
            ├── Footer.jsx
            └── CartDrawer.jsx
```

## Running it locally (in VS Code)

You need two terminals open at once — one for the backend, one for the frontend.
Open the project folder in VS Code, then use **Terminal → New Terminal** twice.

### 1. Start the backend (Terminal 1)

```bash
cd server
npm install
npm run dev
```

This starts the API at **http://localhost:5000**. You should see:
`Ceylon Aura API running at http://localhost:5000`

Try it in a browser: http://localhost:5000/api/products should return the product list as JSON.

### 2. Start the frontend (Terminal 2)

```bash
cd client
npm install
npm run dev
```

This starts Vite at **http://localhost:5173** — open that URL in your browser.
The site will fetch products, place orders, and subscribe emails through the backend
you started in step 1.

> If you see "Could not reach the backend" on the site, make sure the server
> terminal is still running on port 5000.

## How the "full stack" connection works

1. **Front end** — `Products.jsx` calls `api.getProducts()` on page load.
2. **Backend** — that hits `GET /api/products` on the Express server (`routes/products.js`).
3. **Database** — the route reads `server/db.json` and returns the product array.
4. Adding items to the cart, placing an order (`CartDrawer.jsx` → `POST /api/orders`), and
   subscribing to the newsletter (`Newsletter.jsx` → `POST /api/subscribers`) all follow the
   same pattern: frontend calls `api.js` → Express route → reads/writes `db.json`.
5. Open `server/db.json` after placing an order or subscribing — you'll see the new
   order or email saved there. That's your "database" updating in real time.

The shopping cart itself is kept in the browser (`localStorage`, via `CartContext.jsx`) since
it doesn't need to be shared between devices — only orders and subscribers go through the API.

## Environment variables

`client/.env` sets where the frontend looks for the API:

```
VITE_API_URL=http://localhost:5000/api
```

Change this if you deploy the backend somewhere else (see below).

## Deploying

- **Frontend** — deploys easily to Vercel or Netlify (`npm run build` in `client/`, deploy the
  `dist/` folder). Set `VITE_API_URL` to your deployed backend's URL as an environment variable.
- **Backend** — a file-based JSON database doesn't survive redeploys on serverless platforms
  like Vercel. Deploy the Express server to something with a persistent filesystem (Render,
  Railway, an actual VPS) — or swap `db.js` for a real database once you're ready to go live.

## Notes

All product names, prices, testimonials, and images (via picsum.photos placeholders) are
for demonstration only — this is a fictional brand built as a learning project.
