# 🧭 Aetheria — Agentic AI Travel Platform

**Aetheria** is a full-stack, production-ready Agentic AI web application that helps users discover, explore, and plan travel adventures with the help of an AI travel agent. Built as a complete demonstration of modern full-stack engineering combined with practical Large Language Model (LLM) integration — covering authentication, protected routes, database-driven listings, and AI-powered reasoning features.

> 🎓 Built for **Programming Hero — SCIC-13, Assignment 5: Project-2 Agentic AI**

---

## 🔗 Live Links

| Resource | Link |
|---|---|
| 🌐 Live Website | https://ai-project-client-side.vercel.app |
|
---

## 📌 Overview

Aetheria lets users browse curated adventure and travel packages, filter and search listings, view detailed itineraries, and — most importantly — interact with an **AI Travel Agent** that reasons over listings and user preferences to provide smart, context-aware travel guidance, going beyond simple text generation into genuine recommendation and assistance workflows.

---

## 🛠️ Technology Stack

### Frontend
| Category | Technology |
|---|---|
| Framework | React.js + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Auth | JWT-based auth + Google Sign-In (OAuth 2.0) |

### Backend
| Category | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT (`jsonwebtoken`) + `bcryptjs` password hashing |
| AI Provider | Google Gemini (`@google/generative-ai`) |

### Deployment
| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Vercel (Express app served as a serverless function via `@vercel/node`) |
| Database | MongoDB Atlas |

---

## 🎨 Design Principles

- Consistent color palette limited to 3 primary colors + 1 neutral tone
- Unified card design: equal height/width, consistent border radius and spacing across all listing cards
- Fully responsive layout — mobile, tablet, and desktop breakpoints
- No placeholder/lorem-ipsum content — all data is real, seeded, and dynamic
- Skeleton loaders on data-fetching states for a polished UX

---

## 🏠 Home / Landing Page

- **Navbar:** Sticky, fully responsive, route count adapts based on auth state (more routes visible when logged in)
- **Hero Section:** Constrained to ~60–70% viewport height with a clear call-to-action
- **7+ Content Sections:** Featured adventures, categories, statistics, testimonials, highlights, newsletter signup, and a final call-to-action
- **Footer:** Fully functional navigation, contact details, and social links

---

## 🗺️ Core Listing System

### Explore Page (`/explore`)
- Live **search bar** (keyword/country)
- **Filtering** by multiple fields — category, price range, minimum rating, difficulty
- **Sorting** options (e.g., newest, price)
- Pagination for browsing large result sets
- Skeleton loading state while listings are fetched

### Listing Cards
Each card displays:
- Cover image
- Title & short description
- Meta info (price, rating, location/duration)
- "View Details" call-to-action

All cards share identical dimensions, spacing, and border radius; desktop view renders **4 cards per row**.

### Details Page (`/listings/:id`)
- Publicly accessible (no login required)
- Multiple images/media gallery
- Structured sections: Overview, Key Information, Reviews & Ratings, Related Adventures

---

## 🔐 Authentication & Authorization

- Email/password **Login** and **Registration** with full client + server-side validation
- **Demo login** button for quick evaluation access
- **Google Sign-In** (OAuth 2.0) as a required social login option
- JWT-based session handling with protected route middleware
- Clean, minimal, professional auth UI

### Protected Routes
| Route | Access |
|---|---|
| `/items/add` | Logged-in users only — redirects to `/login` otherwise |
| `/items/manage` | Logged-in users only — table/grid view of the user's own listings with View & Delete actions |

---

## 🤖 Agentic AI Features

Aetheria implements Agentic AI capabilities that go beyond simple text generation, incorporating **context awareness, reasoning, and personalized recommendation**:

### 1. AI Smart Recommendation Engine
- Analyzes listing data and user-provided preferences (budget, interests, travel style) to generate **personalized travel recommendations**
- Context-aware: recommendations adapt based on filters and refinements the user applies
- Designed to improve relevance as more user interaction/preference data is provided

### 2. AI Travel Chat Assistant
- Conversational assistant embedded in the app, aware of application context (listings, categories, user queries)
- Maintains **conversation history** for coherent multi-turn interactions
- Supports follow-up reasoning (e.g., refining a trip plan based on prior answers)
- Powered by Google Gemini via a dedicated `/api/ai` backend route

> AI logic is isolated in the backend `aiRouter`, keeping prompt templates, context injection, and provider calls server-side and secure (no API keys exposed to the client).

---

## 📄 Additional Pages
- About
- Contact
- *(extend as needed — Blog, Help/Support, Privacy, Terms)*

---

## 📡 API Reference (Backend)

| Method | Route | Description | Auth Required |
|---|---|---|---|
| GET | `/health` | Server + database connection status | No |
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login with email/password | No |
| POST | `/api/auth/google` | Google OAuth sign-in | No |
| GET | `/api/listings` | Get all listings (supports search, filter, sort, pagination) | No |
| GET | `/api/listings/:id` | Get single listing details | No |
| POST | `/api/listings` | Create a new listing | ✅ Yes |
| DELETE | `/api/listings/:id` | Delete a listing | ✅ Yes |
| POST | `/api/ai/*` | AI recommendation & chat assistant endpoints | ✅ Yes |

---

## ⚙️ Environment Variables
keep all secret value

### Frontend (`Ai-project-client-side/.env`)
```dotenv
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
```

## 🚀 Local Development Setup

### 1. Clone the repositories
```bash
git clone <backend-repo-url> Ai-project-server-side
git clone <frontend-repo-url> Ai-project-client-side
```

### 2. Backend
```bash
cd Ai-project-server-side
npm install
npm run dev          # starts server with hot-reload
npm run seed         # optional: seed sample data
```

### 3. Frontend
```bash
cd Ai-project-client-side
npm install
npm run dev
```

### 4. Production build
```bash
# Backend
npm run build && npm start

# Frontend
npm run build && npm run preview
```

---

## ☁️ Deployment Notes

- **Backend** is deployed as a Vercel serverless function. The Express app is exported (`export default app`) instead of calling `app.listen()` in production; `vercel.json` routes all traffic into it.
- **MongoDB Atlas Network Access** is set to allow all IPs (`0.0.0.0/0`), since serverless functions don't have static IPs.
- The database connection is **awaited via middleware** before handling requests, preventing race conditions on cold starts. If MongoDB is unreachable, the app gracefully falls back to an in-memory data store so core functionality remains available.
- **Frontend** environment variables (`VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`) are configured per-environment (Preview/Production) in the Vercel dashboard, since Vite bakes them into the build at build time.
- **Google OAuth** requires the deployed frontend domain to be registered under *Authorized JavaScript origins* in Google Cloud Console.

---

## ✅ Assignment Requirement Checklist

- [x] TypeScript across frontend & backend
- [x] MongoDB database with Mongoose
- [x] JWT authentication + Google social login
- [x] Fully responsive, consistent UI (3-color palette)
- [x] Home page with navbar, hero, 7+ sections, footer
- [x] Listing page with search, filter, sort, pagination
- [x] Public details page
- [x] Protected Add Item / Manage Items pages
- [x] Skeleton loaders on data fetch
- [x] At least 2 substantial Agentic AI features (Recommendation Engine + Chat Assistant)
- [x] Deployed live (frontend + backend)

---

## 📝 License
This project was developed for academic submission (Programming Hero SCIC-13). Licensing terms can be added here if the project is made public/open source.

---

## 🙋 Author
**Salma Khandoker**
Built as part of the Agentic AI course project.