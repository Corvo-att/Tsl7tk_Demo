---
name: tsl7tk Automotive Utility Design System
project: tsl7tk
tagline: "Your car, taken care of. | Car Repair & Roadside Assistance"
colors:
  # Core Brand Palette (from Styleboard & Coolors)
  brand-primary: '#17365D'      # Oxford Navy (60% Usage)
  brand-accent: '#790D16'       # Dark Wine / Dark Red (10% Usage)
  surface-canvas: '#F4F6F9'     # Platinum / Light Gray (20% Usage)
  neutral-slate: '#8A9AA6'      # Cool Steel / Gray (5% Usage)
  neutral-charcoal: '#1F2937'   # Jet Black / Charcoal (5% Usage)
  surface-pure: '#FFFFFF'       # Crisp White Cards & Sheets

  # Extended M3 / System Tokens
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#43474e'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#435f89'
  primary: '#002043'
  on-primary: '#ffffff'
  primary-container: '#17365d'
  on-primary-container: '#84a0cd'
  inverse-primary: '#acc8f7'
  secondary: '#aa3435'
  on-secondary: '#ffffff'
  secondary-container: '#fe716e'
  on-secondary-container: '#700411'
  tertiary: '#002705'
  on-tertiary: '#ffffff'
  tertiary-container: '#003f0b'
  on-tertiary-container: '#60af5e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#acc8f7'
  on-primary-fixed: '#001c3b'
  on-primary-fixed-variant: '#2b486f'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3af'
  on-secondary-fixed: '#410005'
  on-secondary-fixed-variant: '#891b20'
  tertiary-fixed: '#a3f69c'
  tertiary-fixed-dim: '#88d982'
  on-tertiary-fixed: '#002204'
  on-tertiary-fixed-variant: '#005312'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  display-brand:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

# tsl7tk Design System

## 1. Brand Identity & Style Direction

**tsl7tk** is an Egyptian automotive utility and on-demand roadside assistance & maintenance application. Its visual identity combines mechanical dependability with high-efficiency utility, reassuring motorists facing unexpected vehicle issues while providing frictionless access to trusted mechanics, spare parts, and vehicle management.

### Brand Marks & Naming
- **Brand Name:** `tsl7tk` (Updated from *Tasla7tak*)
- **Wordmark Styling:** Heavy geometric sans-serif construction (`Plus Jakarta Sans` ExtraBold). For dual-tone brand lockups, `tsl` is rendered in **Oxford Navy (`#17365D`)** and `7tk` is highlighted in **Dark Wine Red (`#790D16`)**.
- **Logo Mark:** A sleek, dynamic automotive silhouette in **Oxford Navy (`#17365D`)** underscored by an integrated double-ended mechanic's wrench in **Dark Wine (`#790D16`)** forming the lower chassis and wheel arches.
- **Core Taglines:**
  - *Primary UI Tagline:* "Your car, taken care of."
  - *Full Brand Descriptor:* "CAR REPAIR & ROADSIDE ASSISTANCE"

### Design Pillars
The design language blends **Corporate Modern** with **Automotive Tactile Ergonomics**:
1. **Trust & Precision:** Structured, high-contrast layouts anchored by deep navy headers and crisp white cards prevent cognitive overload during stressful automotive breakdowns.
2. **Urgent Actionability:** High-energy dark red accents highlight critical calls-to-action, roadside emergencies, active filters, and vital automotive alerts.
3. **Speed & Dynamism:** Clean geometric display headings paired with stable, highly legible interface typography built for outdoor daytime readability.

---

## 2. Color System & Proportions

The **tsl7tk** palette balances authoritative engineering stability with high-priority automotive signals.

### Core Brand Palette

| Role | Name | Hex | RGB | Usage & Application |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | **Oxford Navy** | `#17365D` | `rgb(23, 54, 93)` | Top app bars, hero banners, primary buttons, service icons, core brand identity. |
| **Accent** | **Dark Wine** | `#790D16` | `rgb(121, 13, 22)` | High-priority CTAs ("Book a Service"), active tabs, action arrows, toggles, urgent alerts. |
| **Background** | **Platinum / Light Gray** | `#F4F6F9` | `rgb(244, 246, 249)` | App background canvas, utility tile fills, search input backgrounds. |
| **Neutral** | **Cool Steel / Gray** | `#8A9AA6` | `rgb(138, 154, 166)` | Secondary metadata, distance tags, input placeholders, inactive bottom nav icons, subtle dividers. |
| **Ink / Text** | **Jet Black / Charcoal** | `#1F2937` | `rgb(31, 41, 55)` | Primary headings, card titles, body copy, and numeric readouts. |
| **Surface** | **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | Elevated cards, mechanic listings, bottom sheets, and modal containers. |

### Color Usage Ratio (`60 / 20 / 10 / 10` Rule)
- **60% Oxford Navy (`#17365D`):** Establishes brand authority across headers, primary navigation, and hero sections.
- **20% Platinum / Light Gray (`#F4F6F9` & `#FFFFFF`):** Provides breathing room, card separation, and clean scannability.
- **10% Dark Wine (`#790D16`):** Guides the user's eye strictly to interactive focal points and conversion triggers.
- **10% Cool Steel & Jet Black (`#8A9AA6` / `#1F2937`):** Grounds the typographic hierarchy and structural borders.

### Semantic & Status Colors
- **Success / Verified / Open:**
  - Foreground Text & Icon: `#2E7D32` (Forest Green)
  - Container Fill: `#E8F5E9` (Soft Mint)
  - *Usage:* "Request confirmed!" banners, `Verified` mechanic badges, and `Open` operating hours indicators.
- **Warning / Top Rated:**
  - Foreground Text & Icon: `#E65100` (Deep Amber) / `#F59E0B` (Star Gold)
  - Container Fill: `#FFF3E0` (Warm Cream)
  - *Usage:* `Top Rated` badges and review star ratings (note: summary review stars also utilize `#790D16` Dark Wine in specific brand components).
- **Error / Unavailable:**
  - Foreground Text & Icon: `#790D16` or `#BA1A1A`
  - Container Fill: `#FDE8E8` / `#FFDAD6` (Soft Rose)
  - *Usage:* "This provider is currently unavailable" alert banners and form validation errors.

---

## 3. Typography

Typography prioritizes instant glanceability under direct sunlight and high-stress roadside environments.

### Font Stack
- **Headings, Display & Labels:** `Plus Jakarta Sans` — Delivers geometric precision with friendly rounded terminals, balancing professional structure with approachable warmth.
- **Body Copy & Technical Data:** `Inter` — Provides neutral, high-x-height clarity for dense mechanical specs, customer reviews, distances, and operating hours.

### Typographic Scale

| Token | Font Family | Weight | Size | Line Height | Letter Spacing | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-brand` | Plus Jakarta Sans | `800` (ExtraBold) | `28px` | `34px` | `-0.02em` | Brand headers (`tsl7tk`), splash screens |
| `headline-lg` | Plus Jakarta Sans | `700` (Bold) | `26px` | `32px` | `0em` | Hero prompts (*"What does your car need today?"*) |
| `headline-md` | Plus Jakarta Sans | `700` (Bold) | `20px` | `26px` | `0em` | Screen titles (*"Mechanics"*, *"AutoFix Garage"*) |
| `headline-sm` | Plus Jakarta Sans | `600` (SemiBold) | `17px` | `22px` | `0em` | Section headers (*"About"*), card titles |
| `body-lg` | Inter | `400` (Regular) | `16px` | `24px` | `0em` | Primary descriptions, form input text |
| `body-md` | Inter | `400` (Regular) | `14px` | `20px` | `0em` | Mechanic specialties, service descriptions, alerts |
| `body-sm` | Inter | `400` (Regular) | `12px` | `16px` | `0em` | Operating hours, review counts, distance (`2.3 km`) |
| `label-lg` | Plus Jakarta Sans | `600` (SemiBold) | `14px` | `18px` | `0em` | Button labels, active tab headers |
| `label-md` | Plus Jakarta Sans | `600` (SemiBold) | `12px` | `16px` | `0em` | Filter chips (`Nearby`, `Rating`), quick action labels |
| `label-sm` | Plus Jakarta Sans | `700` (Bold) | `10px` | `12px` | `0.01em` | Status pills (`Verified`, `Top Rated`), bottom nav labels |

---

## 4. Elevation, Depth & Shapes

Visual hierarchy uses clean ambient light tinted specifically with **tsl7tk**'s navy tone (`#17365D`) rather than muddy neutral gray, grounding surfaces naturally.

### Elevation Levels
- **Level 0 (Base Canvas):** `#F4F6F9` light gray background or `#FFFFFF` sheet base with zero elevation.
- **Level 1 (Cards & Service Grids):** `#FFFFFF` or `#F4F6F9` containers with subtle ambient shadow:
  - `box-shadow: 0px 4px 12px rgba(23, 54, 93, 0.08);`
  - `border: 1px solid rgba(138, 154, 166, 0.15);`
- **Level 2 (Floating Search & Modals):** Elevated white surfaces:
  - `box-shadow: 0px 8px 24px rgba(23, 54, 93, 0.14);`
- **Level 3 (Sticky Bottom Bars & Overlapping Profile Sheets):**
  - `box-shadow: 0px -4px 20px rgba(23, 54, 93, 0.10);`

### Border Radii (`rounded`)
- **Cards, Hero Bottom Sheets & Service Tiles:** `16px` (`1rem` / `rounded-2xl`) — Used on the 2x2 home utility grid and overlapping garage detail sheet.
- **Buttons & Form Inputs:** `12px` (`0.75rem` / `rounded-xl`) — Tactile, friendly corners for buttons, text areas, and dropdowns.
- **Thumbnails & Avatars:** `12px` (`0.75rem`) for 80x80px mechanic listing photos and 56x56px garage logos.
- **Status Chips, Filter Pills & Toggles:** `9999px` (`rounded-full`) — Full pill geometry for filter tags (`Nearby`), status badges (`Verified`), and circular icon buttons.

---

## 5. UI Components & Patterns

### 5.1 Buttons & Interactive Controls
- **Primary Button (Oxford Navy):**
  - Background: `#17365D` | Text: `#FFFFFF` | Height: `48px` | Radius: `12px` | Font: `label-lg`
  - Usage: Standard primary form submissions and navigation actions.
- **Secondary / High-Priority CTA Button (Dark Wine):**
  - Background: `#790D16` | Text: `#FFFFFF` | Height: `48px–52px` | Radius: `12px` | Font: `label-lg`
  - Usage: High-value conversions such as **"Book a Service"** or emergency roadside requests.
- **Outline Button:**
  - Background: `#FFFFFF` or `transparent` | Border: `1.5px solid #790D16` (or `#8A9AA6`) | Text: `#8A9AA6` or `#17365D` | Height: `48px` | Radius: `12px`.
- **Text Link:**
  - Text: `#790D16` (`label-lg`) paired with a right-pointing arrow icon (`→`).
- **Quick Action Squircle Buttons (Garage Profile):**
  - 3-column horizontal action bar featuring `64px × 56px` rounded rectangles (`12px` radius):
    - **Call:** Solid `#17365D` fill, white phone icon + "Call" label.
    - **Chat:** Solid `#790D16` fill, white chat bubble icon + "Chat" label.
    - **Directions:** Solid `#17365D` fill, white turn-arrow diamond icon + "Directions" label.

### 5.2 Input Fields & Form Controls
- **Hero Search Bar:**
  - Background: `#FFFFFF` (on Navy header) or `#F4F6F9` (on white sub-header) | Height: `48px` | Radius: `12px`
  - Left Icon: Magnifying glass (`#8A9AA6`) | Placeholder: *"Search mechanics, services, parts..."* (`#8A9AA6`).
- **Select / Dropdown Field:**
  - Background: `#F4F6F9` | Border: `1px solid rgba(138, 154, 166, 0.3)` | Height: `48px` | Radius: `12px`
  - Right Icon: Chevron down (`#17365D`).
- **Text Area (Multiline):**
  - Background: `#F4F6F9` | Border: `1px solid rgba(138, 154, 166, 0.3)` | Min-Height: `88px` | Radius: `12px` | Padding: `12px 16px`.
- **Toggle Switch ("Remember me"):**
  - Track (Active): `#790D16` (Dark Wine) | Thumb: `#FFFFFF` circle (`20px` diameter) | Track dimensions: `44px × 24px` (`9999px` radius).
  - Label: `#17365D` (`label-md`).

### 5.3 Cards & Content Containers
- **2x2 Home Utility Service Grid:**
  - Container: `#F4F6F9` fill, `16px` radius, `16px` internal padding.
  - Top-Left Icon: `32px` solid `#17365D` automotive glyph:
    - *Find a Mechanic* (Wrench)
    - *Spare Parts* (Gear/Cog)
    - *Book a Service* (Calendar with wrench)
    - *Fuel Log* (Fuel pump)
  - Typography: Title in `#17365D` (`headline-sm`), subtitle in `#8A9AA6` (`body-sm`).
  - Action Indicator: `28px` solid `#790D16` circular badge at bottom-left containing a white right arrow (`→`).
- **Mechanic / Vendor Listing Card:**
  - Layout: Horizontal flex card on `#FFFFFF` canvas with bottom divider (`1px solid #F4F6F9`).
  - Left Media: `80px × 80px` rounded square (`12px` radius) real-world garage thumbnail.
  - Header Row: Star rating (`#F59E0B` star + `4.8 (124)` in `#1F2937`) on left; route icon + distance (`2.3 km` in `#8A9AA6`) on right.
  - Title & Tags: Garage name in `#17365D` (`headline-sm`), followed by dot-separated service tags (`General Service • Repairs • Diagnostics`) in `#8A9AA6`.
  - Operating Status: Green clock icon + `Open` (`#2E7D32`) + hours (`8:00 AM - 10:00 PM`).
  - Trust Badges Row: Pill badges (`Verified` in green `#E8F5E9`/`#2E7D32`, `Top Rated` in amber `#FFF3E0`/`#E65100`).

### 5.4 Filter Chips & Tab Bars
- **Horizontal Filter Bar:**
  - **Active Chip:** Solid `#790D16` background, `#FFFFFF` text (`Nearby`), `9999px` pill radius.
  - **Inactive Dropdown Chips:** `#F4F6F9` background, `#1F2937` text with trailing chevron (`Rating v`, `Service Type v`).
- **In-Page Segmented Tabs (`About` | `Services` | `Reviews`):**
  - Active Tab: Text in `#790D16` (`label-lg`) with a `2.5px` solid `#790D16` bottom indicator bar.
  - Inactive Tabs: Text in `#8A9AA6` (`label-lg`), full-width `1px solid #E5E7EB` baseline divider.

### 5.5 Feedback & Alert Banners
- **Error / Unavailable Alert:**
  - Container: `#FDE8E8` background, `12px` radius, `16px` padding.
  - Icon: Solid `#790D16` circle with white exclamation mark (`!`).
  - Text: `#790D16` (`label-md`).
- **Success / Confirmation Alert:**
  - Container: `#E8F5E9` background, `12px` radius, `16px` padding.
  - Icon: Outlined `#2E7D32` circle with checkmark (`✓`).
  - Title: `#1F2937` (`label-lg` — *"Request confirmed!"*) | Body: `#43474E` (`body-sm`).

### 5.6 Navigation & Iconography
- **Icon Style:** `2px` consistent stroke weight, rounded caps and joins. Primary icons use `#17365D` (Navy); active or alert-state icons use `#790D16` (Dark Wine); secondary utility icons use `#8A9AA6` (Slate Gray).
- **Bottom Navigation Bar:**
  - Surface: `#FFFFFF` background with subtle top border (`1px solid #E5E7EB`), `64px` height.
  - 5 Destinations:
    1. **Home** (House glyph)
    2. **Map** (Folded map glyph)
    3. **Requests** (Checklist document glyph)
    4. **Garage** (Front-facing car glyph)
    5. **Profile** (User silhouette glyph)
  - States: Active tab icon and label are rendered in **Dark Wine (`#790D16`)** (with solid icon fill where applicable); inactive tabs are rendered in **Cool Steel (`#8A9AA6`)** outline.

---

## 6. Screen Architecture & Layout Templates

1. **Home Dashboard (`tsl7tk`):**
   - Deep `#17365D` header featuring the `tsl7tk` wordmark, tagline, notification bell, headline prompt, floating search bar, and a dramatic dark automotive photography accent with diagonal `#790D16` graphic ribbons.
   - Overlapping `#FFFFFF` rounded top sheet (`24px` top radius) housing the 2x2 Utility Service Grid and bottom navigation bar.
2. **Directory / Search Results (`Mechanics`):**
   - Compact `#17365D` app bar with back arrow and screen title.
   - Sticky search & horizontal filter bar (`Nearby`, `Rating`, `Service Type`) over a scrollable vertical list of Mechanic Listing Cards.
3. **Vendor Profile (`AutoFix Garage`):**
   - Full-bleed hero photography header (`220px` height) with floating circular translucent back and favorite (`♥`) buttons.
   - Overlapping `#FFFFFF` sheet (`24px` top radius) featuring vendor logo avatar, title, rating summary, distance, trust badges, tabbed content (`About`, `Services`, `Reviews`), 3-button Quick Action row (`Call`, `Chat`, `Directions`), and a sticky full-width `#790D16` **"Book a Service"** CTA button.