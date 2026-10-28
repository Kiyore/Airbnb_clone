# Airbnb Clone — Romantic Jacuzzi 1BHK Candolim | Mirashya UG10

A pixel-perfect, production-grade recreation of the Airbnb listing page for **Romantic Jacuzzi 1BHK Candolim | Mirashya UG10** based on the reference: [https://airbnb-clone-umber-two.vercel.app](https://airbnb-clone-umber-two.vercel.app).

Built for the **Playpower Take-Home Assessment**.

---

## 🌟 What Was Built

The project replicates the reference design across all three core views with 100% visual and behavioral parity:

### 1. Listing Page
- **Navigation Bar**: Airbnb logo, search bar ("Anywhere | Any week | Add guests"), and user navigation pill.
- **Header Actions**: Dynamic wishlist save toggle (with floating toast notifications) and share popup with link copy and social actions.
- **Hero Photo Grid**: Signature 5-photo grid (1 primary + 4 secondary) with rounded exterior corners, hover dimming, and a floating **"Show all 12 photos"** button.
- **Property Overview**: "Guest favourite" badge card with gold laurels, 4.92 rating score, 48 reviews, and host stats.
- **Highlights**: Key property perks (Private Jacuzzi, Swimming Pool, 150 Mbps Dedicated Workspace, Self Check-in).
- **Interactive Calendar**: Dual-month calendar date picker allowing custom check-in and checkout selection, automatic night calculation, and date range highlighting.
- **Sticky Booking Card**: Pinned desktop reservation card with real-time price calculation, guest counter steppers (Adults, Children, Infants), and animated "Reserve" button with confirmation modal.
- **Amenities**: Categorized list with icons and a "Show all 24 amenities" modal.
- **Reviews**: Categorical progress bars (Cleanliness, Accuracy, Communication, Location, Check-in, Value) and verified guest cards.
- **Location & Map**: Candolim beach proximity, neighborhood guide, and styled map pin.

### 2. Photo Tour View (Overlay View 1)
- Full-screen gallery overlay opened by clicking **"Show all photos"** or any hero image.
- Fixed header with back button `←`, interactive room category tabs ("Living room", "Bedroom", "Jacuzzi", "Kitchen", etc.), and a top horizontal mini-thumbnail rail.
- Editorial masonry layout presenting high-resolution property photography with descriptions.
- Clicking any photo opens the **Lightbox View** starting at that photo.

### 3. Lightbox View (Overlay View 2)
- Theater dark mode (`#0f0f0f`) single-photo viewer.
- Real-time photo counter (`X / 12`).
- Smooth directional slide/fade transitions powered by Framer Motion.
- Prev/Next chevron buttons and full **keyboard navigation**:
  - `ArrowLeft`: Previous photo
  - `ArrowRight`: Next photo
  - `Escape`: Close viewer
- Interactive thumbnail carousel at the bottom with auto-scroll into view.

### 4. Production Architecture Diagram & Scaling Strategy
- Integrated interactive Architecture Modal accessible via the top banner or user menu.
- Complete SVG vector diagram in `public/architecture-diagram.svg`.
- Full engineering architecture write-up in `ARCHITECTURE.md` covering Edge CDN, GraphQL Federation, Uber H3 geospatial search, Redis Redlock booking orchestration, and sharded PostgreSQL via Vitess.

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation & Development
```bash
# 1. Install dependencies
npm install

# 2. Start the local development server (http://localhost:3000)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## 🛠️ Tech Stack
- **Frontend Framework**: React 18 + Vite 5
- **Styling**: Tailwind CSS 3 (configured with Airbnb color tokens & spacing)
- **Icons**: Lucide React
- **Animations & Transitions**: Framer Motion
- **Architecture**: Domain-driven component decomposition & modular mock data

---

## 🤖 Modern AI Workflow & Sub-Agents
This implementation was developed using an AI-assisted engineering workflow:
- **Sub-Agent Configs**: Found in `.agents/` (`code-quality-agent.yaml`, `ui-fidelity-agent.yaml`, `architecture-agent.yaml`).
- **Audit Skill**: Found in `.skills/airbnb-clone-audit/SKILL.md`.
- **Sequence of Prompts**: Documented step-by-step in `PROMPTS_SEQUENCE.md`.

---

## 📦 Deliverables Checklist
- [x] Listing Page with full layout, spacing, typography, and interactive booking
- [x] Full-screen Photo Tour overlay with category tabs & thumbnail strip
- [x] Single-photo Lightbox overlay with arrow buttons, keyboard `←/→` & `Esc`
- [x] High-resolution downloaded property photography in `public/photos/`
- [x] High-level Production Vacation-Rental Marketplace Architecture Diagram (`ARCHITECTURE.md` & `public/architecture-diagram.svg`)
- [x] AI sub-agent & skill configuration files in `.agents/` and `.skills/`
- [x] Sequence of prompts used for AI development in `PROMPTS_SEQUENCE.md`
- [x] Zipped submission package `airbnb-clone-submission.zip`
