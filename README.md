# Velvet Brew — full-stack café ordering platform

A premium café ordering website: customers browse the menu, add items to
a cart, and place an order either for takeaway or from a table. Kitchen
staff see new orders and update their status in real time.

## Tech stack

- **Frontend:** React (Vite), React Router, Axios, Socket.io-client
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.io
- **Auth:** JWT + bcrypt
- **Real-time:** order placement and status updates push instantly to
  connected clients over WebSockets

## Project structure

```
noir-and-gold/
├── client/     React frontend (Vite)
└── server/     Express API + MongoDB models
```

## Getting started

### 1. Backend

```bash
cd server
npm install
cp .env.example .env    # then fill in your Mongo URI and JWT secret
npm run seed             # inserts sample menu items
npm run create-admin     # creates a default admin login
npm run dev
```

Default admin login (change the password after first login):
```
Email: admin@velvetbrew.com
Password: admin123
```
Admin dashboard is at `/admin` on the frontend — log in at `/admin/login` first.

Server runs on `http://localhost:5000`.

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

App runs on `http://localhost:5173`.

## Features implemented

- Menu browsing with category filters (coffee, starters, desserts, ice creams, mains)
- Cart with quantity controls
- Guest or table-based checkout (no login required to order)
- Live order status tracking via WebSockets (pending → preparing → ready → served)
- JWT authentication (register/login) with admin role support
- Admin-protected routes for managing menu items and updating order status

## What to build next (good next steps for this project)

- Admin dashboard UI (the API routes already exist — `POST/PUT/DELETE /api/menu`, `GET /api/orders`, `PUT /api/orders/:id/status`)
- Stripe/Razorpay checkout integration
- QR-code table-session ordering (generate a QR per table linking to `/checkout?table=12`)
- Image uploads for menu items (Cloudinary or S3)
- Order history page (`GET /api/orders/mine` is already wired up)

## Environment variables (server/.env)

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/noir-and-gold
JWT_SECRET=your_secret_here
CLIENT_URL=http://localhost:5173
```

## Deploying (for your resume link)

- **Frontend:** Vercel or Netlify — set `VITE_API_URL` to your deployed backend URL
- **Backend:** Render or Railway — set the env vars above, plus a MongoDB Atlas connection string for `MONGO_URI`
