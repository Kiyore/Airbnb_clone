# Sequence of Prompts for AI-Assisted Development

This document records the exact sequence of prompts, agent workflows, and iterative refinement instructions used to develop the pixel-perfect Airbnb listing clone for **Romantic Jacuzzi 1BHK Candolim | Mirashya UG10**.

---

## Phase 1: Reference Analysis & Asset Extraction

### Prompt 1.1: Spec Ingestion & Requirement Mapping
> *"Analyze the take-home assessment requirements from Playpower: replicate https://airbnb-clone-umber-two.vercel.app with desktop-only focus across three core views: Listing Page, Photo Tour, and Lightbox. Outline the UI layout, spacing grid, typography, colors, animations, accessibility rules, and system architecture deliverables."*

### Prompt 1.2: Asset & Photo Acquisition
> *"Inspect the reference listing for 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10'. Curate and download high-resolution photography covering all room categories: Living Room (mustard cushions & indoor plant), Master Bedroom (king bed & warm cove lighting), Private Jacuzzi (hydrotherapy spa tub), Modern Kitchenette, Full Bathroom with glass shower, Swimming Pool, and Complex Exterior. Save them into `public/photos/` with structured metadata."*

---

## Phase 2: Frontend Architecture & Foundation

### Prompt 2.1: Tech Stack Setup & Design Tokens
> *"Initialize a high-performance React application with Vite, Tailwind CSS, Lucide React, and Framer Motion. Configure Tailwind theme extensions for Airbnb signature brand tokens: `#FF385C` (Rausch primary), `#222222` (Charcoal text), `#717171` (Muted captions), `#DDDDDD` (Card borders), and custom box shadows (`0 6px 16px rgba(0,0,0,0.12)`)."*

### Prompt 2.2: Mock Data & Domain Modeling
> *"Create `src/data/listingData.js` modeling the complete entity structure for Mirashya UG10: property stats, Guest Favourite rating breakdown (Cleanliness 4.9, Accuracy 4.9, Communication 5.0, Location 4.8, Check-in 5.0, Value 4.8), 32 categorized amenities with icon mappings, host credentials (Superhost, 7 years hosting), and verified guest testimonials."*

---

## Phase 3: Core View 1 — Listing Page Implementation

### Prompt 3.1: Hero Photo Grid with Floating Action
> *"Build `HeroGrid.jsx` implementing Airbnb's signature 5-photo layout: 1 large photo spanning two rows on the left and a 2x2 grid on the right with rounded exterior corner radii. Implement hover dimming overlays and a floating 'Show all photos' button with a 9-dot grid icon that launches the Photo Tour overlay."*

### Prompt 3.2: Interactive Booking Engine & Sticky Widget
> *"Build `BookingCard.jsx` pinned via sticky positioning. Include real-time price calculation (`Base Price × Nights + Cleaning Fee + Service Fee`), interactive guest stepper (Adults, Children, Infants) with constraint validation, date range pickers synchronized with the calendar component, and a 'Reserve' CTA featuring Airbnb's pink-to-red gradient and hover sheen."*

### Prompt 3.3: Interactive Calendar, Amenities & Reviews
> *"Implement `CalendarPicker.jsx` with a dual-month display allowing custom check-in and checkout selection with automatic night calculation. Implement `Amenities.jsx` with category grouping and modal expansion, and `ReviewsSection.jsx` featuring categorical progress bars."*

---

## Phase 4: Core View 2 — Photo Tour Overlay

### Prompt 4.1: Editorial Full-Screen Gallery & Thumbnail Strip
> *"Build `PhotoTourModal.jsx` matching the reference screenshot in PDF Page 2. Include a sticky header with back arrow `←`, an active horizontal thumbnail scroller representing all property images, category filter pills ('Living room', 'Bedroom', 'Jacuzzi', etc.), and an editorial layout pairing full-width and side-by-side photos. Ensure clicking any photo triggers the Lightbox starting at that specific index."*

---

## Phase 5: Core View 3 — Lightbox Single-Photo Viewer

### Prompt 5.1: High-Fidelity Theater Mode & Keyboard Navigation
> *"Build `LightboxModal.jsx` matching PDF Page 2. Implement a full-screen dark theater mode (`#0f0f0f`), `X / Total` photo counter, circular translucent navigation chevrons (`‹` and `›`), and smooth directional slide animations using Framer Motion. Bind keyboard event listeners for `ArrowLeft` (previous), `ArrowRight` (next), and `Escape` (close), along with an auto-scrolling thumbnail rail at the bottom."*

---

## Phase 6: Production Architecture & System Scaling

### Prompt 6.1: Production-Scale Marketplace Architecture
> *"Design a high-availability, production-scale architecture diagram for a vacation-rental marketplace like Airbnb. Address: (1) Anycast Edge CDN & SSR at 300+ POPs, (2) GraphQL Gateway & Microservices, (3) Geospatial Search utilizing Uber H3 hexagonal indexing and OpenSearch, (4) Distributed Saga booking orchestration with Redis Redlock, and (5) Sharded PostgreSQL via Vitess and AWS S3 multi-region storage. Export as `public/architecture-diagram.svg` and provide an interactive modal inside the app."*

---

## Phase 7: Verification, Sub-Agent Configurations & Packaging

### Prompt 7.1: Multi-Agent Configurations & Quality Audit
> *"Configure AI sub-agents in `.agents/`: `code-quality-agent.yaml` for WCAG 2.1 AA and performance, `ui-fidelity-agent.yaml` for visual comparison, and `architecture-agent.yaml` for distributed systems verification. Provide `.skills/airbnb-clone-audit/SKILL.md` for automated test execution."*

### Prompt 7.2: Submission Packaging
> *"Bundle the complete source code, high-resolution assets, sub-agent configs, prompts sequence, and architecture diagram into a clean zip archive `airbnb-clone-submission.zip` for final take-home submission."*
