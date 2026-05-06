# CineBook — Movie Ticket Booking Web App

A modern, full-featured movie ticket booking single-page application built with React, Redux Toolkit, and a JSON-Server mock backend. Browse latest releases, preview upcoming movies, explore events, and book tickets with QR code generation.

![Status](https://img.shields.io/badge/status-active-success) ![React](https://img.shields.io/badge/React-19-blue) ![Redux](https://img.shields.io/badge/Redux_Toolkit-2.x-purple)

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [How It Works](#how-it-works)
5. [Setup & Installation](#setup--installation)
6. [Running the App](#running-the-app)
7. [Available Scripts](#available-scripts)
8. [API Reference (json-server)](#api-reference-json-server)
9. [State Management Flow](#state-management-flow)
10. [Routing](#routing)
11. [Styling & Theming](#styling--theming)
12. [Push to GitHub](#push-to-github)
13. [Future Enhancements](#future-enhancements)
14. [Troubleshooting](#troubleshooting)

---

## Features

- Browse latest and upcoming movies with responsive grid layout
- View detailed movie information including cast, plot, duration, language, rating
- View tiered ticket pricing (Normal / Superior / Sofa)
- Book tickets via a simple form (name, date, show timing, seats)
- QR code generation for confirmed bookings using `qrcode.react`
- Browse upcoming events with images, descriptions, and locations
- Modern dark cinematic UI with gradient accents
- Fully responsive layout (mobile to desktop)
- Centralized state management via Redux Toolkit
- Mock REST API powered by JSON-Server

---

## Tech Stack

| Layer | Technology | Why |
| --- | --- | --- |
| UI Library | **React 19** | Component-based, declarative UI |
| Routing | **React Router DOM v7** | Client-side navigation, dynamic params |
| State | **Redux Toolkit + react-redux** | Predictable global state, async thunks |
| HTTP | **Axios** | Promise-based HTTP client |
| Mock API | **json-server** | Zero-config REST API from a JSON file |
| QR Codes | **qrcode.react** | Render QR codes for ticket booking |
| Styling | **Vanilla CSS (custom theme)** | Custom CSS variables, no UI library bloat |
| Build | **react-scripts (CRA)** | Standard CRA tooling |

---

## Project Structure

```
my-web-app-movie/
├── public/                      # Static assets served at root
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── EventCard.jsx
│   │   ├── Loader.jsx
│   │   ├── MovieCard.jsx        # Card used in Latest & Upcoming grids
│   │   └── Navbar.jsx
│   ├── pages/                   # Route-level components
│   │   ├── Home.jsx             # Landing page with hero
│   │   ├── LatestMovies.jsx     # Grid of latest releases
│   │   ├── UpcomingMovies.jsx   # Grid of upcoming releases
│   │   ├── MovieDetails.jsx     # Single movie detail with pricing
│   │   ├── BookingPage.jsx      # Booking form
│   │   ├── FinalTicketPage.jsx  # Ticket with QR code
│   │   └── Events.jsx           # Event listings
│   ├── redux/                   # Redux Toolkit store + slices
│   │   ├── store.js             # configureStore
│   │   └── movieSlice.js        # Slice + async thunks
│   ├── services/                # External integrations
│   │   └── api.js               # Axios instance + endpoints
│   ├── App.js                   # Routes + Navbar
│   ├── index.js                 # React entry point
│   └── index.css                # Global theme + component styles
├── db.json                      # Mock database (json-server)
├── package.json                 # Dependencies + scripts
└── README.md                    # This file
```

---

## How It Works

### High-level flow

1. The user opens the app in the browser at `http://localhost:3000`.
2. React mounts `<App />` inside `<BrowserRouter>` and `<Provider>` (Redux).
3. Based on the URL, React Router renders the matching page.
4. Pages dispatch Redux thunks on mount to fetch data from `json-server` running at `http://localhost:5000`.
5. Axios calls the mock API; the response populates the Redux store.
6. Components subscribe to the store via `useSelector` and re-render with fresh data.

### Two servers in development

- **Frontend (port 3000):** React dev server (`react-scripts start`).
- **Backend (port 5000):** `json-server --watch db.json --port 5000` — provides REST endpoints from `db.json`.

Both must be running simultaneously in separate terminals.

---

## Setup & Installation

### Prerequisites

- **Node.js** v16 or higher (v18+ recommended)
- **npm** v8 or higher

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/my-web-app-movie.git
cd my-web-app-movie
```

### 2. Install dependencies

```bash
npm install
```

This installs React, Redux Toolkit, React Router, Axios, json-server, qrcode.react, and dev tooling. Takes 2-5 minutes the first time.

---

## Running the App

You need **two terminals** running concurrently.

### Terminal 1 — Mock API (json-server)

```bash
npm run server
```

This starts json-server on `http://localhost:5000`, watching `db.json` for changes (hot reload on edit).

Expected output:
```
JSON Server started on PORT :5000
Resources
  http://localhost:5000/latest
  http://localhost:5000/upcomingMovies
  http://localhost:5000/events
```

### Terminal 2 — React frontend

```bash
npm start
```

This starts the dev server on `http://localhost:3000` and opens it in your browser automatically.

---

## Available Scripts

| Script | Purpose |
| --- | --- |
| `npm start` | Run React dev server (http://localhost:3000) |
| `npm run server` | Run json-server mock backend (http://localhost:5000) |
| `npm run build` | Production build to `/build` |
| `npm test` | Run tests in interactive watch mode |
| `npm run eject` | Eject from CRA (one-way) |

---

## API Reference (json-server)

| Method | Endpoint | Returns |
| --- | --- | --- |
| GET | `/latest` | Array of latest movies |
| GET | `/latest/:id` | Single latest movie |
| GET | `/upcomingMovies` | Array of upcoming movies |
| GET | `/upcomingMovies/:id` | Single upcoming movie |
| GET | `/events` | Array of events |

### Sample movie object

```json
{
  "id": 1,
  "title": "Thor",
  "image": "https://...",
  "genre": "Action, Adventure, Comedy",
  "director": "Taika Waititi",
  "stars": "Chris Hemsworth, ...",
  "plot": "Thor is imprisoned on the planet Sakaar...",
  "language": "English",
  "rating": "8.2",
  "duration": "2h 10m",
  "releasedDate": "2017-11-03",
  "currency": "INR",
  "prices": { "normal": 200, "superior": 300, "sofa": 600 }
}
```

---

## State Management Flow

The app uses **Redux Toolkit** with a single `movies` slice handling all data: latest movies, upcoming movies, events, single movie details, plus shared `loading` and `error` state.

### Async thunks defined in `src/redux/movieSlice.js`

- `fetchLatestMovies` — calls `getLatestMovies()` from api.js
- `fetchUpcomingMovies` — calls `getUpcomingMovies()`
- `fetchEvents` — calls `getEvents()`
- `fetchMovieDetails(id)` — fetches both lists, finds movie by id (works for both latest and upcoming)

### Lifecycle of a fetch

```
Component mounts
   │
   ├── useEffect → dispatch(fetchLatestMovies())
   │
   ├── thunk: pending → state.loading = true
   │
   ├── axios calls http://localhost:5000/latest
   │
   ├── thunk: fulfilled → state.latestMovies = response.data
   │                       state.loading = false
   │
   └── Component re-renders with new data via useSelector
```

### Reading state in any component

```jsx
const { latestMovies, loading, error } = useSelector((state) => state.movies);
```

---

## Routing

Configured in `src/App.js` using React Router DOM v7.

| Path | Component | Purpose |
| --- | --- | --- |
| `/` | `<Home />` | Landing page with hero |
| `/latest` | `<LatestMovies />` | Latest releases grid |
| `/upcoming` | `<UpcomingMovies />` | Upcoming releases grid |
| `/events` | `<Events />` | Event listings |
| `/movie/:id` | `<MovieDetails />` | Single movie info |
| `/book/:id` | `<BookingPage />` | Booking form |
| `/ticket` | `<FinalTicketPage />` | Confirmation + QR (data passed via `useLocation`) |

`<NavLink>` is used in the navbar so the active route is automatically highlighted.

---

## Styling & Theming

All styling lives in `src/index.css`. The theme uses CSS custom properties so colors can be tweaked in one place.

### Key CSS variables

```css
--bg: #0f1117;          /* page background */
--surface: #1c2030;     /* card background */
--border: #2a3046;      /* card / input borders */
--text: #e6e9f2;        /* main text */
--text-dim: #9aa3b8;    /* secondary text */
--primary: #e63946;     /* CTA red */
--accent: #f5b301;      /* gold accent */
```

### Reusable classes

- `.container` — max-width wrapper (1200px)
- `.btn`, `.btn-primary`, `.btn-ghost` — button variants
- `.movie-card` — movie poster card with hover lift
- `.event-card` — event card with image
- `.form-card` — centered booking form card
- `.ticket` — split-design ticket layout
- `.spinner` — animated loading spinner

Typography uses Google Fonts (Inter for body, Poppins for headings).

---

## Push to GitHub

### One-time setup

1. Create an empty repo on https://github.com/new (no README, no .gitignore, no license — your local copy already has them).
2. Copy the HTTPS URL it gives you, e.g. `https://github.com/<your-username>/my-web-app-movie.git`.

### From your project folder

```bash
git add .
git commit -m "Initial commit: movie ticket booking app"
git branch -M main
git remote add origin https://github.com/<your-username>/my-web-app-movie.git
git push -u origin main
```

`node_modules/` is excluded by `.gitignore`, so the upload is fast (~1-2 MB).

### Subsequent updates

```bash
git add .
git commit -m "describe what you changed"
git push
```

---

## Future Enhancements

Ideas to extend the project as a portfolio piece:

- **Authentication** — Login / register flow with JWT, protected booking routes
- **Persistent bookings** — POST bookings to `/transactions` endpoint, view booking history
- **Real backend** — Replace json-server with Express + MongoDB
- **Seat selection UI** — Visual seat grid instead of just a count
- **Payment gateway** — Razorpay / Stripe test integration
- **Search & filters** — Filter movies by genre, language, rating
- **Movie trailers** — Embed YouTube trailers in MovieDetails
- **Skeleton loaders** — Replace plain spinner with shimmer placeholders
- **Unit tests** — Jest + React Testing Library for components and slices
- **Deploy** — Vercel / Netlify (frontend) + Render / Railway (backend)

---

## Troubleshooting

### "Network Error" or `ERR_CONNECTION_REFUSED`

`json-server` isn't running. Open Terminal 1 and run `npm run server`.

### Port 5000 already in use

Another process is using port 5000. Either stop that process or change the port in:

- `package.json` → `"server": "json-server --watch db.json --port 5001"`
- `src/services/api.js` → `baseURL: "http://localhost:5001"`

### `node_modules` missing

After cloning a fresh copy, always run `npm install` first.

### CSS not loading (raw HTML look)

Make sure `src/index.js` has `import "./index.css";` at the top.

### Movie poster images don't load

External CDN URLs (Wikipedia) may occasionally fail. The `<img>` `onError` handler in `MovieCard.jsx` and `MovieDetails.jsx` falls back to a styled placeholder automatically — no broken image icon will be shown.

---

## License

This project is for educational and portfolio purposes.
