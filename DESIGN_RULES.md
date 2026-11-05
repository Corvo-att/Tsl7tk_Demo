# tsl7tk Design System Enforcement Rules

This document maps [`tsl7tk_design_system.md`](./tsl7tk_design_system.md) to our Tailwind CSS v4 `@theme` configuration (`src/styles/index.css`) and UI component library (`src/components/ui/`).

## 1. Strict Color Guardrail (`--color-*: initial`)
Tailwind's default color palette (`red-*`, `blue-*`, `slate-*`, `gray-*`, etc.) is **disabled** via `--color-*: initial;` in `src/styles/index.css`. Only official `tsl7tk` design tokens exist:

### Core Brand Palette (60 / 20 / 10 / 10 Rule)
| Token | Hex | Target Ratio | Primary Usage |
| :--- | :--- | :--- | :--- |
| `brand-primary` | `#17365D` | **60%** | App bars, hero banners, primary buttons, service icons, brand identity |
| `surface-canvas` / `surface-pure` | `#F4F6F9` / `#FFFFFF` | **20%** | App background canvas, utility tile fills, elevated cards, bottom sheets |
| `brand-accent` | `#790D16` | **10%** | High-priority CTAs (`Book a Service`, `SOS`), active tabs, filter chips, action arrows, toggles |
| `neutral-slate` / `neutral-charcoal` | `#8A9AA6` / `#1F2937` | **10%** | Headings, body copy, distance tags, inactive bottom nav icons, borders |

### Semantic Status Tokens
- **Success / Verified / Open:** `status-success` (`#2E7D32`) on `status-success-bg` (`#E8F5E9`)
- **Warning / Top Rated:** `status-warning` (`#E65100`) & `status-star` (`#F59E0B`) on `status-warning-bg` (`#FFF3E0`)
- **Error / Unavailable:** `status-error` (`#BA1A1A` / `#790D16`) on `status-error-bg` (`#FDE8E8`)

## 2. Typography Tokens
- **Display & Headings (`font-display`):** `Plus Jakarta Sans` (English) / `IBM Plex Sans Arabic` (Arabic fallback)
- **Body & Technical Data (`font-body`):** `Inter` (English) / `IBM Plex Sans Arabic` (Arabic fallback)
- **Utility classes:**
  - `.text-display-brand` (`28px / 34px`, Weight `800`, `-0.02em`)
  - `.text-headline-lg` (`26px / 32px`, Weight `700`)
  - `.text-headline-md` (`20px / 26px`, Weight `700`)
  - `.text-headline-sm` (`17px / 22px`, Weight `600`)
  - `.text-body-lg` (`16px / 24px`, Weight `400`)
  - `.text-body-md` (`14px / 20px`, Weight `400`)
  - `.text-body-sm` (`12px / 16px`, Weight `400`)
  - `.text-label-lg` (`14px / 18px`, Weight `600`)
  - `.text-label-md` (`12px / 16px`, Weight `600`)
  - `.text-label-sm` (`10px / 12px`, Weight `700`, `0.01em`)

## 3. Navy-Tinted Elevation & Radii
- `shadow-e1`: `0px 4px 12px rgba(23, 54, 93, 0.08)` (Cards & Service Grids)
- `shadow-e2`: `0px 8px 24px rgba(23, 54, 93, 0.14)` (Floating Search & Modals)
- `shadow-e3`: `0px -4px 20px rgba(23, 54, 93, 0.10)` (Sticky Bottom Bars & Overlapping Sheets)
- Radii: `16px` (`rounded-2xl`) for cards/tiles, `12px` (`rounded-xl`) for buttons/inputs/thumbnails, `24px` (`rounded-t-[24px]`) for overlapping sheets, `9999px` (`rounded-full`) for pills/chips/toggles.

