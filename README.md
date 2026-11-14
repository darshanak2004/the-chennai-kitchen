# The Chennai Kitchen

Two separate apps in one repository:

| Folder | What it is | Stack |
| --- | --- | --- |
| `frontend/` | The website (Home, About, Gallery, Contact, admin panel) | React + Vite |
| `backend/` | Reservations, admin login, gallery and home-media records | Node + Express + Neon PostgreSQL |

## Features
- Scroll-driven biryani hero, grand-opening offer bar and poster popup (`frontend/public/poster.jpg`).
- Pages: Home (all sections), About, Gallery (full-screen viewer), Contact (booking, social links, FAQs).
- Table reservation: name, date, time, guests, special note. Saved to the database and sent to the admin's WhatsApp.
- Floating WhatsApp button, map for the Ambattur address, call numbers.
- Admin panel at `/admin`: Gallery, Home media (hero photo/video), Bookings, WhatsApp number.

## Run locally (Node 20+)
1. `cp backend/.env.example backend/.env` and fill it in (Neon connection string, admin password, secret).
2. `cp frontend/.env.example frontend/.env`
3. `npm run install:all`
4. `npm run dev` then open http://localhost:5173. The backend runs on port 4000 and Vite proxies `/api` to it.

You can also run each part on its own: `cd backend && npm install && npm run dev`, `cd frontend && npm install && npm run dev`.

## Database (Neon free tier)
Use the pooled connection string (host contains `-pooler`) as `DATABASE_URL`. Tables are created on first start, and the starter gallery is added once so every photo can be edited or deleted in the admin.

Only URLs are stored, never image files. Deleting an item in the admin removes its row from Neon straight away. The file stays on whichever host serves the URL (Cloudinary, ImageKit and so on), so delete it there too to free that storage.

## Staying up under traffic
- Public content is cached in memory for 30 seconds, so many visitors cost the database about one read per 30 seconds. If Neon is briefly unreachable, the last good copy is still served.
- Queries retry once while Neon's free compute wakes from sleep. Pool size, statement timeout and graceful shutdown are set.
- Responses are compressed, built assets are cached, and login and reservations are rate-limited per IP.
- `GET /api/health` is for uptime monitoring. Ping it every 5 minutes (UptimeRobot is free) so a free host does not go to sleep.

## Deploy
**Option A: one service (simplest, e.g. Render).** The backend serves the built frontend.
- Build command: `npm run build`   Start command: `npm start`
- Set every variable from `backend/.env.example`.

**Option B: two hosts.** Frontend on Netlify, Vercel or Cloudflare Pages, backend on Render or Railway.
- Frontend: root `frontend`, build `npm run build`, output `dist`, env `VITE_API_URL=https://your-backend-url`. Add a rewrite of all paths to `/index.html` so `/about`, `/gallery` and `/contact` open directly.
- Backend: root `backend`, start `npm start`, and set `ALLOWED_ORIGINS` to your frontend's address.

## Before launch
- Set `ADMIN_PASSWORD` and `ADMIN_TOKEN_SECRET` to long random values.
- Replace the placeholder social links in `frontend/src/main.jsx` (the `socials` list) with your real ones.
- Replace the placeholder About and FAQ text and the Unsplash gallery photos with your own.
- The offer ends 18 November 2026. Remove the popup and bar after that (search for `offerOpen` and `offer-bar`).
- The logo image spells "KITCHEN" with one N, while the header text reads "Kitchenn". Update whichever you want to match.
