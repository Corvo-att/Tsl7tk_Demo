# tsl7tk — Smart Automotive Services Platform (Front-End & DSS Demo)

> **"Your car, taken care of. | عربيتك في أمان."**  
> **Project Code:** MIS-26/27 – 1 • Egyptian Russian University (Faculty of Management, Economics, and Business Technology)

A clickable, **mobile-first** React + TypeScript + Tailwind CSS v4 front-end prototype strictly implementing [`tsl7tk_design_system.md`](./tsl7tk_design_system.md) and the driver-side modules + **Diagnostic Decision Support System (DSS)** specified in *Chapter 1*.

> **Disclaimer:** All providers, spare parts, prices, ratings, GPS pins, and DSS likelihood weights in this repository are **demo records** (`Demo data` / `بيانات تجريبية`) created strictly to showcase the end-to-end UX and architecture.

---

## Key Features & Chapter 1 Module Mapping

| Route | Feature / Module (Ch. 1 Table 8.1) | Highlights |
| :--- | :--- | :--- |
| `/` | **Home Dashboard** (§6.1) | Deep Oxford Navy (`#17365D`) hero with diagonal Dark Wine (`#790D16`) ribbons, floating search bar, overlapping `24px` white sheet, 2×2 utility service grid, DSS prompt card, and SOS banner |
| `/diagnose` | **AI Chatbot + Diagnostic DSS** (§10.3) | Natural-language symptom intake (English, Arabic & Franco-Arabic keywords) + deterministic mechanic-validated rule tree across 6 fault categories, horizontal cause likelihood bars, urgency pills, mandatory advisory disclaimer, and deep-linked CTAs |
| `/mechanics` | **Mechanics Directory & Filters** (§6.2) | Sticky search & horizontal filter chips (`Nearby`, `Rating`, `Service Type`), verified & top-rated badges |
| `/mechanics/:id` | **Vendor Profile** (§6.3) | `220px` hero header, overlapping `24px` sheet, `Call` / `Chat` / `Directions` squircle action bar, segmented tabs (`About`, `Services`, `Reviews`), abuse reporting, and sticky `"Book a Service"` CTA |
| `/book/:providerId` | **Service Booking** | Garage vehicle selector, service selector, preferred time, notes, and instant request creation |
| `/parts` | **Spare-Parts Locator & Delivery** | Search by OEM part number or name, `New` vs. `Used / Imported` filter (SDG 12 reuse), visible `"Updated Xm ago"` timestamps (§7.5), and third-party courier delivery request modal |
| `/map` | **Interactive Cairo Map** | Leaflet + OpenStreetMap centered on Greater Cairo with custom rating pins and bottom-sheet preview card |
| `/requests` | **Request Tracking & Verified Reviews** | Segmented tabs (`Active`, `Completed`, `Cancelled`), live simulated provider acceptance (`Pending → Accepted → Completed`), and verified review submission gated strictly to completed requests (§8.7) |
| `/garage` & `/garage/fuel` | **Vehicle Garage, Maintenance & Fuel Log** | Multi-vehicle selector, add-vehicle sheet, mileage maintenance reminders, and Recharts `L/100km` fuel efficiency trend |
| `/sos` | **Emergency Roadside Assistance** | Pulsing Dark Wine (`#790D16`) SOS button with 4-step live flatbed tow-truck ETA tracker |
| `/styleguide` | **Design System & Token Gallery** | Live showcase of the 60/20/10/10 color rule, typography tokens, buttons, inputs, badges, and alerts |

---

## Bilingual (EN / AR) & Full RTL Support

Tap the **`عربي / EN`** button in the Home header, DSS header, Profile screen, or Desktop sidebar at any time to switch between **English (`dir="ltr"`)** and **Arabic (`dir="rtl"`)** with Eastern Arabic numerals (`١٢٣`) and Egyptian Pound formatting (`ج.م`).

---

## Local Development

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Start development server
npm run dev

# 3. Run Vitest DSS rule-engine unit tests
npm run test

# 4. Typecheck & build production bundle
npm run typecheck
npm run build
```

---

## GitHub Hosting & Vercel Auto-Deployment

1. Push this repository to GitHub (`main` branch).
2. In [Vercel](https://vercel.com), click **Add New → Project** and import your GitHub repository.
3. Vercel automatically detects the **Vite** framework preset (`Build Command: npm run build`, `Output Directory: dist`).
4. [`vercel.json`](./vercel.json) is pre-configured with SPA rewrites so deep links (`/diagnose`, `/mechanics/prov-1`, `/parts`, `/styleguide`) work on refresh.

