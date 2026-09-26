# Best-Place
Discover the finest cafes, rooftops, work hubs, and secret spots across districts with verified curator insights.

# 📍 BestPlace — Hyperlocal Spot & Experience Discovery Platform

> A curated discovery engine for specialty cafés, scenic rooftops, remote work sanctuaries, and hidden culinary gems.

[![Angular](https://img.shields.io/badge/Angular-21.2-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## ✨ Features

- **🧭 3-Step Guided Discovery Wizard**:
  - **District Selection**: Explore key districts (Coimbatore, Chennai, Nilgiris, Madurai, Trichy, Salem).
  - **Neighborhood Selection**: Filter by vibrant enclaves (R.S. Puram, Race Course, Peelamedu, etc.).
  - **Vibe & Category**: Tailor results by ambiance (aesthetic cafés, sunset decks, remote work hubs).
- **📊 Deep Place Dossiers & Smart Insights**:
  - **WiFi Telemetry**: Verified upload/download speeds & work-suitability scores.
  - **Noise Level Monitoring**: Decibel (dB) metrics and atmosphere indicator.
  - **Peak Time & Crowd Meter**: Best visiting hours and real-time crowd density.
  - **Curator Signature Verdicts**: Highlighting Instagram spot scores and hidden tips.
- **🗺️ Interactive Map Explorer**:
  - Geospatial pin exploration with instant place details and route directions.
- **📅 Table & Experience Booking**:
  - Interactive reservation modal with guest count, slot selection, and booking management.
- **🔖 Saved Dossiers & Bookmarking**:
  - One-click place bookmarking with state persistence.
- **⭐ Community Reviews & Ratings**:
  - Interactive review submission modal with custom score badges and curator notes.
- **🔍 Quick Search & Mobile Drawer Navigation**:
  - Universal search modal and responsive navigation designed for mobile and desktop.

---

## 🛠️ Tech Stack

- **Framework**: [Angular 21](https://angular.dev/) (Standalone Components, Signals, Modern Control Flow)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with PostCSS
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Icons & UI**: Custom SVG icon system & Glassmorphic Design System
- **State Management**: Reactive Angular Services & RxJS

---

## 📁 Project Architecture

```text
src/app/
├── core/
│   ├── mock-data/       # Mock datasets for districts, areas, places, & reviews
│   ├── models/          # TypeScript interfaces (Place, District, Booking, etc.)
│   └── services/        # Business logic (Discovery, Bookmarks, Bookings, Reviews)
├── features/
│   ├── discovery/       # Multi-step wizard (District, Area, Category, Curated List)
│   ├── home/            # Landing page with hero & featured spotlights
│   ├── map-explore/     # Geospatial interactive map view
│   ├── place-detail/    # Full Place Dossier & smart telemetry
│   ├── profile/         # User reservations & preferences
│   └── saved/           # Saved/Bookmarked collection
└── shared/
    └── components/      # Header, Footer, Modals (Search, Booking, Review), Cards
