# SkyMetrics — Landing Page Content Inventory

> Single source of truth for all user-facing copy. Update here first, then apply changes to the corresponding component.

---

## SEO / Meta (BaseLayout)

**Component:** `src/layouts/BaseLayout.astro`

| Field | Current value |
|---|---|
| `<title>` | SkyMetrics — AI-Powered Drone Thermographic Inspection for Solar Farms |
| `<meta name="description">` | Detect panel defects in hours, not weeks. SkyMetrics combines drone thermography and AI to deliver actionable inspection reports for utility-scale solar farms. |
| OG title | (same as `<title>`) |
| OG description | (same as `<meta name="description">`) |
| Twitter title | (same as `<title>`) |
| Twitter description | (same as `<meta name="description">`) |

---

## Header / Navigation

**Component:** `src/components/sections/Header.astro`

**Logo:** SkyMetrics (wordmark with blue icon — `#4A90C4 → #3A7AB0` gradient)

**Nav links:**
- Features → `#features`
- How It Works → `#how-it-works`
- Benefits → `#benefits`

**CTA button (desktop + mobile):** Request a Demo → `#contact`

---

## Hero Section

**Component:** `src/components/sections/Hero.astro`

### Headline (h1)
> AI-Powered **Thermal Analytics** for Solar PV **Inspections**

- "Thermal Analytics" rendered in solar/orange (`#E09E50`)
- "Inspections" rendered in mint (`#8CBDB9`)

### Body copy (p)
> Upload drone thermal images and let AI automatically extract precise radiometric temperature data and classify faults — broken diodes, dead cells, soiling, and disconnections — with GPS-georeferenced anomaly maps and instant PDF reports. No manual image review required.

### CTA buttons
| Label | Target |
|---|---|
| Request a Demo | `#contact` |
| See How It Works | `#how-it-works` |

### Trust badges (below CTAs)
| Badge text | Icon |
|---|---|
| 423 tests · 0 errors | Checkmark |
| Claude Vision AI | Shield |
| PostGIS geospatial | Location pin |

### Dashboard mock card (right column)
| Element | Text |
|---|---|
| Window title bar | SkyMetrics — Inspection #INS-2847 |
| Status indicator | Processing |
| Fault overlay labels | `broken_diode ⚠`, `dead_cell`, `dirt` |
| Fault badge | 3 faults detected |
| Stat — panels | **12** · Panels scanned |
| Stat — critical | **1** · Critical (ΔT >15°C) |
| Stat — report | **PDF** · Report ready |
| Notification title | Claude Vision analysis complete |
| Notification sub | GPS map + PDF report generated automatically |

---

## Key Features

**Component:** `src/components/sections/Features.astro`

### Section header
- **Tag pill:** Platform Features
- **h2:** Everything built. **Everything working.**
- **Subheading:** SkyMetrics Core is a production-ready B2B platform — 423 automated tests, 0 TypeScript errors — combining Claude Vision AI, PostGIS geospatial indexing, and Google Cloud infrastructure.

### Feature cards (6)

**1. Automated Fault Detection**
- Tag: Claude Vision AI
- Description: Every thermal image is analyzed by Claude Vision (Anthropic). The model classifies four fault types — broken diodes, dead cells, dirt, and disconnections — with severity levels from low to critical. No manual review needed.
- Stats: 4 Fault types · 3 Severity levels

**2. GPS-Georeferenced Anomaly Map**
- Tag: PostGIS + Leaflet
- Description: Each detected fault is persisted with exact GPS coordinates in a PostGIS-enabled PostgreSQL database. The interactive Leaflet.js map lets field technicians locate any anomaly instantly using bounding-box spatial queries.
- Stats: WGS-84 Coordinate system · GiST Spatial index

**3. Instant Inspection Reports**
- Tag: PDF Reports
- Description: Every completed inspection generates a downloadable PDF report via PDFKit — anomaly summary, panel-level detail, temperature deltas, severity classifications, and GPS coordinates for every fault found.
- Stats: PDF Instant download · ΔT 15°C Critical threshold

**4. Upload 100 Images or a ZIP**
- Tag: Batch Upload
- Description: Drone operators upload up to 100 thermal images at once — or drop a single ZIP from their FLIR software. Files go directly to Google Cloud Storage via signed URLs. One failed image never aborts the rest of the batch.
- Stats: 100 Images per batch · ZIP Archive support

**5. Critical Fault Notifications**
- Tag: Real-Time Alerts
- Description: When an anomaly is classified as critical or exceeds the 15°C temperature delta threshold (industry standard for crystalline silicon PV), the alert system fires immediately — console log plus webhook POST to any configured endpoint.
- Stats: Webhook Alert delivery · Instant On detection

**6. Fully Documented API**
- Tag: REST API
- Description: Complete REST API with OpenAPI 3.0.3 documentation (Swagger UI at /docs). Integrate SkyMetrics into your existing SCADA, CMMS, or monitoring platform. Async batch analysis returns 202 Accepted immediately.
- Stats: OpenAPI 3.0.3 spec · 202 Async response

---

## How It Works

**Component:** `src/components/sections/HowItWorks.astro`

### Section header
- **Tag pill:** How It Works
- **h2:** Upload. Analyze. Report. **Fully automated.**
- **Subheading:** From thermal image upload to GPS-mapped anomaly report — no manual review, no waiting, no guesswork.

### Step 01 — Upload Thermal Images
- **Subtitle:** Batch upload — up to 100 images or a ZIP
- **Description:** Drone operators upload thermal images through the Svelte 5 admin dashboard. Select individual JPG/PNG files or drop a single ZIP exported from FLIR software. Files upload directly to Google Cloud Storage via signed URLs — the server stays memory-neutral regardless of batch size.
- **Detail bullets:**
  - Drag-and-drop or file browser upload
  - Up to 100 images or 1 ZIP per batch
  - Direct-to-GCS signed URL upload
  - Per-file failure isolation — one bad image never aborts the batch

### Step 02 — Claude AI Classifies Faults
- **Subtitle:** Async processing via Google Cloud Tasks
- **Description:** The API returns 202 Accepted immediately. Google Cloud Tasks dispatches the batch asynchronously. Claude Vision (claude-sonnet-4-6) analyzes each thermal image and returns a structured JSON result: fault type, severity, cell temperature, ambient temperature, and description.
- **Detail bullets:**
  - Claude Vision (Anthropic) per image
  - Detects: broken_diode, dead_cell, dirt, disconnection
  - Severity: low / medium / critical
  - ΔT > 15°C auto-flagged as critical (industry standard)

### Step 03 — Map, Report & Alerts
- **Subtitle:** GPS map + PDF report + webhook alerts
- **Description:** Results are persisted in PostGIS (WGS-84 coordinates) and surfaced in the admin dashboard as an interactive Leaflet.js map with panel-level markers. A PDF report is generated automatically. Critical faults (ΔT > 15°C) trigger instant webhook notifications.
- **Detail bullets:**
  - Leaflet.js interactive GPS anomaly map
  - Bounding-box spatial queries (PostGIS GiST index)
  - PDF report downloadable from the dashboard
  - Webhook alert for critical-severity faults

### Tech stack callout (bottom)
- **h4:** Built on proven infrastructure
- **Stack string:** Node.js 24 · TypeScript 6 · Fastify 5 · PostgreSQL 16 + PostGIS 3.4 · Google Cloud Storage & Tasks · Svelte 5 · Leaflet.js · PDFKit · Anthropic Claude Vision
- **CTA button:** Request access → `#contact`

---

## Benefits / Metrics

**Component:** `src/components/sections/Metrics.astro`

### Section header
- **Tag pill:** Platform by the numbers
- **h2:** Production-ready. **No guesswork.**
- **Subheading:** SkyMetrics Core v1.5.0 ships with a complete test suite, a documented API, and real infrastructure — not a prototype.

### KPI cards (4)

| Value | Label | Description |
|---|---|---|
| 423 | Automated tests | 398 backend (Jest) + 25 frontend (Vitest) — 0 failures, 0 TypeScript errors across the entire codebase |
| 4 | Fault types detected | Broken diodes, dead cells, dirt accumulation, and disconnections — classified automatically by Claude Vision AI |
| 100 | Images per batch | Upload up to 100 thermal images or a single ZIP archive per inspection run, with per-file failure isolation |
| ΔT 15°C | Critical alert threshold | Industry-standard temperature delta for crystalline silicon PV — any anomaly above this triggers an instant webhook alert |

### Technology Stack (grid)

| Name | Description |
|---|---|
| Claude Vision | Anthropic AI model for thermal image analysis |
| PostGIS | Geospatial indexing for GPS anomaly coordinates |
| Google Cloud Tasks | Async batch processing queue |
| Svelte 5 | Admin dashboard with real-time polling |
| Leaflet.js | Interactive inspection location maps |
| PDFKit | Automatic inspection report generation |

- **Section heading:** Technology Stack
- **Section subheading:** Every component is production-grade and battle-tested

---

## Call to Action / Contact Form

**Component:** `src/components/sections/CallToAction.astro`

### Left column — headline block
- **Tag pill:** Request your inspection
- **h2:** Discover how much output **you're leaving on the table**
- **Subheading:** Most solar farms operate at 15–25% below optimal efficiency due to undetected faults. A thermographic inspection can recover all of that.

### Left column — benefit bullets (4)

| Icon | Title | Description |
|---|---|---|
| ⚡ | Diagnosis in 48h | Full report delivered in under two days from the inspection flight. |
| 🎯 | Tailored analysis | Adapted to your farm's specifics: panel technology, inverter setup, and array configuration. |
| 📊 | Maintenance plan | Receive a prioritized action plan with estimated ROI for each recommended intervention. |
| 🔄 | Ongoing follow-up | Periodic monitoring to verify anomaly fixes and prevent new faults from developing. |

### Right column — contact form
- **Form title (h3):** Request a Demo
- **Form subtitle:** No commitment · Response within 2 hours
- **Success message title:** Request received!
- **Success message sub:** We'll get back to you within 2 hours.
- **Error message:** Something went wrong. Please try again or email us directly.

**Form fields:**

| Field | Label | Placeholder | Required |
|---|---|---|---|
| First name | First name | Your name | Yes |
| Company | Company | Your company | No |
| Work email | Work email | you@company.com | Yes |
| Installed capacity | Installed capacity (MW) | Select a range | Yes |
| Message | Message (optional) | Tell us about your solar farm… | No |

**Capacity dropdown options:** 1 – 10 MW · 10 – 50 MW · 50 – 200 MW · 200 MW+

**Submit button:** Request a Free Demo (loading state: Sending…)

**Legal line:** By submitting you accept our [privacy policy](/privacy)

---

## Footer

**Component:** `src/components/sections/Footer.astro`

### Brand column
- **Logo:** SkyMetrics (orange icon — NOTE: currently still uses orange gradient, differs from navbar blue)
- **Tagline:** AI-powered thermal image processing for photovoltaic solar farms. Automated fault detection, GPS anomaly maps, and instant PDF reports.
- **Social links:** LinkedIn · Twitter · GitHub (all `href="#"` — placeholder)

### Platform links (→ `#features`)
- AI fault detection
- GPS anomaly map
- PDF reports
- Batch upload
- Webhook alerts
- REST API

### Company links (→ `#`)
- About us
- API documentation
- Blog
- Careers
- Press

### Contact column
- **Email:** skymetric.cloud@gmail.com
- **Location:** Warsaw, Poland · Serving clients across Europe
- **CTA button:** Request Demo → `#contact`

### Bottom bar
- **Copyright:** © {year} SkyMetrics. All rights reserved.
- **Legal links:** Privacy policy (`/privacy`) · Terms of service (`/terms`) · Cookies (`/cookies`)
