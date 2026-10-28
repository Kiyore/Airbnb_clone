---
name: airbnb-clone-audit
description: Automated verification and behavioral auditing skill for Airbnb listing UI clones, testing photo tour modals, lightbox keyboards, and booking calculations.
---

# Airbnb Clone Audit Skill

This skill provides automated checks and inspection procedures to verify complete visual and behavioral parity of the Airbnb listing clone against the reference specification.

## Core Verification Checkpoints

### 1. Listing Page Parity
- **Header**: Airbnb logo, search bar ("Anywhere | Any week | Add guests"), user menu.
- **Title & Badges**: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10", "Guest favourite", 4.92 rating score, 48 reviews.
- **Hero Grid**: 5-photo layout with rounded outer corners and floating "Show all 12 photos" button.
- **Sticky Booking Card**:
  - Live calculation: `Base Price x Nights + Cleaning Fee + Service Fee`.
  - Incremental guest stepper (Adults, Children, Infants).
  - Date picker sync with calendar view.
- **Amenities**: 2-column list of key amenities with SVG icons + modal popup.
- **Reviews**: Progress bars for all 6 categories (Cleanliness, Accuracy, Communication, Location, Check-in, Value).
- **Map & Location**: Candolim beach neighborhood context and styled pin marker.

### 2. Photo Tour Modal (Overlay View 1)
- Triggered by clicking any hero photo or "Show all photos".
- Header bar includes back arrow `←`, horizontal mini-thumbnail strip, and category filter tabs.
- Photos grouped by room categories ("Living room", "Bedroom", "Jacuzzi", "Kitchen", etc.).
- Clicking any photo transitions directly into the Lightbox view.

### 3. Lightbox Modal (Overlay View 2)
- Full-screen dark theater mode (`#0f0f0f`).
- `X / Total` photo counter.
- Left / Right chevron navigation.
- Full keyboard support:
  - `ArrowLeft`: Navigate to previous photo.
  - `ArrowRight`: Navigate to next photo.
  - `Escape`: Close lightbox modal.
- Active photo thumbnail carousel at the bottom with auto-scroll.

## Execution Command
```bash
npm run build
npm run preview
```
