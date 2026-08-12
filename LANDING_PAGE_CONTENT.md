# SkyMetrics — Landing Page Content Inventory

> Single source of truth for all user-facing copy. Update here first, then apply changes to the corresponding component.

---

## SEO / Meta (BaseLayout)

**Component:** `src/layouts/BaseLayout.astro`

| Field | Current value |
|---|---|
| `<title>` | SkyMetrics \| Automated Thermal Drone Analytics for Solar Farms |
| `<meta name="description">` | SkyMetrics transforms thermographic drone inspections into georeferenced anomaly maps and IEC-compliant O&M reports. Recover lost yield with AI-driven thermal defect detection. |
| OG title | SkyMetrics \| AI-Powered Thermal Analytics for Solar PV |
| OG description | Upload raw radiometric drone imagery and receive detailed IEC-compliant anomaly reports within hours. Protect your Performance Ratio. |
| Twitter title | SkyMetrics \| AI-Powered Thermal Analytics for Solar PV |
| Twitter description | Upload raw radiometric drone imagery and receive detailed IEC-compliant anomaly reports within hours. Protect your Performance Ratio. |

### JSON-LD Schema
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SkyMetrics",
  "applicationCategory": "BusinessApplication",
  "url": "https://skymetrics.cloud",
  "description": "Automated thermal analytics and AI anomaly detection for utility-scale solar PV inspection. Turn raw drone thermography into actionable O&M repair plans.",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "category": "SaaS" }
}
```

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

### Trust badges (single row, below CTAs)
| Primary text | Subtitle | Icon |
|---|---|---|
| IEC 62446-3 Compliant | Thermal Standards | Star/standard |
| Anthropic Vision AI | Automated Diagnostics | Shield |
| Sub-Meter GPS | PostGIS Geospatial Pinpointing | Location pin |

### Dashboard mock card (right column)
| Element | Text |
|---|---|
| Window title bar | SkyMetrics — Inspection #INS-2847 (12.4 MW Solar Array) |
| Status indicator | Radiometric Analysis Active |
| Fault overlay labels | `broken_diode ⚠`, `dead_cell`, `soiling` |
| Fault summary badge | 3 anomalies detected (IEC 62446-3) |
| Stat 1 | **12** · Thermal frames ingested |
| Stat 2 | **1** · Critical (ΔT > 15°C) |
| Stat 3 | **PDF** · Executive report ready |
| Notification title | Vision AI Radiometric Analysis Complete |
| Notification subtitle | GPS anomaly map + PDF report generated |

---

## Key Features

**Component:** `src/components/sections/Features.astro`

### Section header
- **Tag pill:** Platform Features
- **h2:** Enterprise Architecture. **Production-Ready.**
- **Subheading:** SkyMetrics Core is built for enterprise utility-scale solar — backed by rigorous automated testing, zero TypeScript errors, and an end-to-end cloud pipeline combining Vision AI, PostGIS spatial indexing, and Google Cloud infrastructure.

### Feature cards (6)

**1. Radiometric Fault & Delta Detection**
- Tag: Vision AI Engine
- Description: Analyzes raw thermal frames to extract pixel-level temperature readings and classify core anomalies — broken diodes, dead cells, soiling, and string disconnections — complete with calibrated ΔT severity scoring.
- Stats: 4 Fault Classes · Exact ΔT Metrics

**2. Sub-Meter GPS Anomaly Mapping**
- Tag: PostGIS + Leaflet
- Description: Every anomaly is persisted with precise WGS-84 GPS coordinates in a PostGIS spatial database. Interactive Leaflet maps allow field O&M technicians to navigate directly to damaged modules via spatial bounding queries.
- Stats: WGS-84 Coordinate System · GiST Spatial Index

**3. Executive Inspection Reports**
- Tag: PDFKit Engine
- Description: Generates publication-grade PDF reports instantly — featuring site anomaly summaries, module-level thermal metrics, temperature deltas (ΔT), severity rankings, and exact GPS coordinates for field intervention.
- Stats: Instant PDF Export · ΔT > 15°C Threshold

**4. High-Throughput Batch Ingestion**
- Tag: GCS Signed URLs
- Description: Stream up to 100 thermal frames simultaneously or upload single ZIP archives directly from DJI/FLIR software via Google Cloud Storage signed URLs. Per-file failure isolation ensures seamless batch processing.
- Stats: 100 Frames/Batch · Native ZIP Archive

**5. Automated Critical Hotspot Alerts**
- Tag: Real-Time Webhooks
- Description: When an anomaly breaches the industry-standard 15°C temperature delta threshold for crystalline silicon PV, the platform immediately triggers automated webhooks to alert your asset management system.
- Stats: Instant Webhook Dispatch · IEC 62446-3 Aligned

**6. Enterprise REST API & System Integration**
- Tag: OpenAPI 3.0.3
- Description: Complete REST API with OpenAPI 3.0.3 specifications and interactive Swagger documentation. Seamlessly export structured anomaly payloads directly into your existing CMMS, asset management, or O&M platforms.
- Stats: OpenAPI 3.0.3 Spec · Async 202 Ingestion

---

## How It Works

**Component:** `src/components/sections/HowItWorks.astro`

### Section header
- **Tag pill:** Automated Workflow
- **h2:** Direct Ingestion. AI Analytics. **Instant Reports.**
- **Subheading:** Stream raw radiometric drone imagery into actionable intelligence — from cloud upload to sub-meter GPS mapping and executive PDF reporting in minutes.

### Step 01 — 1. Direct Cloud Storage Ingestion
- **Subtitle:** Batch upload up to 100 radiometric images or ZIP
- **Description:** Upload radiometric drone imagery directly from your flight operations. Drop individual radiometric JPG/TIFF files or single ZIP archives exported from FLIR or DJI Thermal software. Files stream securely to Google Cloud Storage via signed URLs, keeping backend memory completely neutral.
- **Detail bullets:**
  - Drag-and-drop or batch file picker
  - Up to 100 radiometric images or 1 ZIP archive per run
  - Direct-to-GCS signed URL streaming
  - Isolated per-file error handling

### Step 02 — 2. Vision AI Radiometric Extraction
- **Subtitle:** Asynchronous processing via Google Cloud Tasks
- **Description:** The API acknowledges uploads with an instant 202 Accepted. Google Cloud Tasks dispatches the batch asynchronously, calling Anthropic Vision AI to extract pixel-level temperature data, calculate deltas (ΔT), and classify structural anomalies into structured JSON payloads.
- **Detail bullets:**
  - Anthropic Vision AI model execution
  - Detects: broken_diode, dead_cell, soiling, disconnection
  - Calibrated severity: Low / Medium / Critical
  - ΔT > 15°C auto-flagged (IEC 62446-3 standard)

### Step 03 — 3. GIS Mapping, PDF Reports & Webhooks
- **Subtitle:** Sub-meter map + executive PDF + webhooks
- **Description:** Extracted data is indexed in PostGIS and rendered on an interactive Leaflet map with module-level GPS pins. An executive PDF report is compiled instantly, while severe thermal hot spots fire automated webhook notifications.
- **Detail bullets:**
  - Interactive Leaflet GPS map with spatial filters
  - PostGIS GiST spatial indexing (WGS-84)
  - Executive PDF report generated automatically
  - Real-time webhook dispatch for critical anomalies

### Tech stack banner (bottom)
- **h4:** Built on Modern, Battle-Tested Infrastructure
- **Stack string:** Node.js 24 · TypeScript 6 · Fastify 5 · PostgreSQL 16 + PostGIS 3.4 · Google Cloud Storage & Tasks · Svelte 5 · Leaflet.js · PDFKit · Anthropic Vision AI
- **CTA button:** Request Access → `#contact`

---

## Benefits / Metrics

**Component:** `src/components/sections/Metrics.astro`

### Section header
- **Tag pill:** Platform Credentials
- **h2:** Enterprise Credentials. **Battle-Tested Reliability.**
- **Subheading:** SkyMetrics Core v1.5.0 is built on enterprise-grade infrastructure — validated with automated test suites, fully documented APIs, and real cloud services ready for scale.

### KPI cards (4)

| Value | Label | Description |
|---|---|---|
| 423 | Automated Quality Checks | 398 backend (Jest) + 25 frontend (Vitest) test suites passing with 0 TypeScript errors for maximum platform stability |
| 4 | Core PV Anomaly Classes | Bypass diode failures, dead cells, soiling accumulation, and string disconnections classified with automated severity scoring |
| 100 | Radiometric Images / Batch | Stream up to 100 raw radiometric thermal files or a single ZIP archive per run with isolated error handling |
| ΔT > 15°C | Critical Alert Threshold | IEC 62446-3 temperature delta standard for crystalline silicon PV — severe hotspots fire instant webhook payloads |

### Technology Stack grid
- **Heading:** Technology Stack
- **Subheading:** Built with proven, high-performance infrastructure

| Name | Description |
|---|---|
| Claude Vision | Anthropic AI model for thermal image analysis and radiometric anomaly detection |
| PostGIS | Spatial indexing database for precise WGS-84 GPS anomaly positioning |
| Google Cloud Tasks | Asynchronous task queue for high-throughput batch processing |
| Svelte 5 | Reactive admin dashboard interface with real-time inspection polling |
| Leaflet.js | High-performance interactive GPS anomaly mapping with spatial filters |
| PDFKit | Dynamic generation of publication-grade PDF inspection reports |

---

## Call to Action / Contact Form

**Component:** `src/components/sections/CallToAction.astro`

### Left column — headline block
- **Tag pill:** Request Your Inspection
- **h2:** Recover Lost Yield on **Your Solar Assets**
- **Subheading:** Undetected thermal anomalies can reduce solar plant efficiency by 15% to 25%. Automated thermographic analytics identify defects early to protect your Performance Ratio (PR).

### Left column — benefit bullets (4)

| Icon | Title | Description |
|---|---|---|
| ⚡ | Rapid 48h Delivery | Full georeferenced anomaly maps and executive PDF reports delivered within two days of flight upload. |
| 🎯 | Tailored Radiometric Thresholds | Customized temperature deltas (ΔT) calibrated to your site's PV module technology and array geometry. |
| 📊 | Prioritized Action Plan | Actionable maintenance report categorized by IEC severity levels to optimize field O&M intervention costs. |
| 🔄 | Historical Benchmark Tracking | Track thermal degradation over time across recurring drone inspections to verify component repairs. |

### Right column — contact form
- **Form title (h3):** Request a Demo
- **Form subtitle:** Fast setup · Response within 2 business hours
- **Success title:** Request received!
- **Success subtitle:** We will contact you within 2 business hours.
- **Error message:** Unable to submit request. Please try again or contact us directly at contact@skymetrics.cloud.

**Form fields:**

| Field | Label | Placeholder | Required |
|---|---|---|---|
| First name | First name | Your name | Yes |
| Company | Company | Your company | No |
| Work email | Work email | you@company.com | Yes |
| Installed capacity | Installed capacity (MW) | Select a range | Yes |
| Message | Message (optional) | Tell us about your solar farm or drone inspection operations… | No |

**Capacity dropdown options:** 1 – 10 MW · 10 – 50 MW · 50 – 200 MW · 200 MW+

**Submit button:** Request Free Demo (loading state: Sending…)

**Legal line:** By submitting, you accept our [privacy policy](/privacy).

---

## Footer

**Component:** `src/components/sections/Footer.astro`

### Brand column
- **Logo:** SkyMetrics (blue icon — `#4A90C4 → #3A7AB0` gradient, matches navbar)
- **Tagline:** Automated thermal analytics and AI anomaly detection for utility-scale solar PV inspection. Turn raw drone thermography into actionable O&M repair plans.
- **Social links:** LinkedIn · Twitter · GitHub (all `href="#"` — placeholder)

### Product links (→ `#features`)
- Thermographic AI
- Radiometric Mapping
- IEC Anomaly Reports
- CAD & GIS Exports

### Solutions links (→ `#contact`)
- Utility Solar Operators
- O&M Service Providers
- Drone Service Providers
- Asset Managers

### Company links
- About SkyMetrics → `#`
- Blog & Insights → `#`
- Documentation → `#`
- Contact → `#contact`

### Legal links
- Privacy Policy → `/privacy`
- Terms of Service → `/terms`
- Security & Compliance → `#`
- Cookie Settings → `/cookies`

### Bottom bar
- **Copyright:** © {year} SkyMetrics. All rights reserved.
- **Legal links:** Privacy policy (`/privacy`) · Terms of service (`/terms`) · Cookies (`/cookies`)

---

## About Page

**Page:** `src/pages/about.astro` → `/about`

| Field | Value |
|---|---|
| `<title>` | About — SkyMetrics |
| `<meta name="description">` | SkyMetrics is a B2B platform for automated thermographic inspection of utility-scale solar PV farms, built on Anthropic Vision AI, PostGIS, and Google Cloud. |

**Nav:** Same sticky bar as legal pages — blue logo (`#4A90C4 → #3A7AB0`) + "Back to home" link.

**Tag pill:** Company

**h1:** About SkyMetrics

**Subheading:** Automated thermal analytics and AI anomaly detection for utility-scale solar PV inspection.

### Sections

**Our Mission**
> Undetected thermal anomalies silently erode solar farm performance — reducing energy yield by up to 25% before a single technician sets foot on site. SkyMetrics was built to change that. We give solar asset owners and O&M teams the tools to turn raw drone thermography into precise, IEC-compliant inspection reports in minutes, not days.

**What We Do** (6 bullets)
- AI-powered fault classification — broken diodes, dead cells, soiling, and string disconnections.
- Calibrated ΔT severity scoring aligned to IEC 62446-3 crystalline silicon thresholds.
- Sub-meter GPS anomaly maps with PostGIS spatial indexing and interactive Leaflet visualisation.
- Publication-grade PDF inspection reports with module-level temperature deltas and field coordinates.
- Real-time webhook alerts when critical hotspots (ΔT > 15°C) are detected.
- Full REST API with OpenAPI 3.0.3 documentation for integration with CMMS and asset management platforms.

**Technology** (2-column card grid)

| Name | Description |
|---|---|
| Anthropic Vision AI | Radiometric fault extraction and anomaly classification |
| PostGIS + Leaflet.js | WGS-84 GPS indexing and interactive anomaly mapping |
| Google Cloud Storage & Tasks | Signed URL ingestion and async batch processing |
| Node.js 24 + Fastify 5 | High-throughput REST API with OpenAPI 3.0.3 |
| PostgreSQL 16 + PostGIS 3.4 | Spatial database with GiST indexed anomaly records |
| PDFKit | Dynamic generation of publication-grade inspection reports |

**Who We Serve** (4 bullets)

| Segment | Description |
|---|---|
| Utility Solar Operators | Monitor and protect the Performance Ratio of large-scale PV plants. |
| O&M Service Providers | Deliver IEC-compliant inspection reports to your clients faster and at lower cost. |
| Drone Service Providers | Automate post-flight analysis and transform raw thermal footage into structured deliverables. |
| Asset Managers | Benchmark thermal degradation across your portfolio and prioritise capital expenditure. |

**Company**
> SkyMetrics is headquartered in Gdańsk, Poland, operating as a GDPR-compliant B2B SaaS platform under Polish and EU law.

Address block:
```
SkyMetrics
Gdańsk, Poland
Email: contact@skymetrics.cloud
```

**Get in Touch**
> Ready to automate your thermographic inspections? Request a demo and we will respond within 2 business hours.

CTA button: Request a Demo → `/#contact`

---

## Legal Pages

All three legal pages share the same layout: sticky nav with back-to-home link, `Legal` pill tag, `h1` title, `Last updated: August 10, 2026`, and a white card divided into numbered sections.

### Shared company address block

Appears in Privacy Policy (§1 Data Controller) and Cookie Policy (§7 Contact):

```
SkyMetrics
Gdańsk, Poland
Email: contact@skymetrics.cloud
```

---

## Privacy Policy

**Page:** `src/pages/privacy.astro` → `/privacy`

| Field | Value |
|---|---|
| `<title>` | Privacy Policy — SkyMetrics |
| `<meta name="description">` | Privacy policy for SkyMetrics. Learn how we collect, use, and protect your personal data in compliance with GDPR. |
| Last updated | August 10, 2026 |

### Sections

| # | Title | Key content |
|---|---|---|
| — | Intro | GDPR commitment, skymetrics.cloud, demo form context |
| 1 | Data Controller | SkyMetrics · Gdańsk, Poland · contact@skymetrics.cloud |
| 2 | Data We Collect | First name, company, work email, installed capacity (MW), optional message; server logs via Vercel |
| 3 | Legal Basis for Processing | Legitimate interest (Art. 6(1)(f) GDPR) |
| 4 | How We Use Your Data | Respond within 2 hours, inspection proposal, follow-up; no marketing / profiling / automated decisions |
| 5 | Third-Party Data Processors | Web3Forms (form handler) · Vercel (hosting) |
| 6 | Data Retention | 12 months; deleted if no contract; contract data retained per law |
| 7 | Your Rights Under GDPR | Access · Rectification · Erasure · Restriction · Portability · Objection; contact UODO at uodo.gov.pl |
| 8 | Cookies | No tracking/analytics/advertising cookies; Vercel technical cookies only |
| 9 | Changes to This Policy | "Last updated" date reflects latest version |
| 10 | Contact | contact@skymetrics.cloud |

---

## Terms of Service

**Page:** `src/pages/terms.astro` → `/terms`

| Field | Value |
|---|---|
| `<title>` | Terms of Service — SkyMetrics |
| `<meta name="description">` | Terms of service for SkyMetrics. Read the conditions governing the use of our AI-powered thermal inspection platform. |
| Last updated | August 10, 2026 |

### Sections

| # | Title | Key content |
|---|---|---|
| — | Intro | Governs access to skymetrics.cloud and the Platform |
| 1 | Description of Services | Claude Vision AI, fault classification, GPS maps, PDF reports, batch upload (100 images / ZIP), webhooks (ΔT > 15°C), REST API (OpenAPI 3.0.3) |
| 2 | Access and Accounts | Granted after demo + service agreement; client responsible for credentials |
| 3 | Acceptable Use | No reverse-engineering, no redistribution, no malware, PV-only use |
| 4 | Intellectual Property | Platform IP owned by SkyMetrics; client owns uploaded images; reports licensed for internal use |
| 5 | Pricing and Payment | Agreed individually in writing; EUR excl. VAT; access suspended if unpaid |
| 6 | Platform Availability | Best-effort; no liability for third-party (GCP, Vercel, Anthropic) downtime |
| 7 | Disclaimer of Warranties | "As is"; AI results probabilistic; engineer validation required |
| 8 | Limitation of Liability | No indirect/consequential damages; aggregate cap = fees paid in prior 3 months |
| 9 | Termination | 30 days' written notice; immediate suspension for breach/non-payment |
| 10 | Governing Law and Disputes | Polish law + EU law; courts of **Gdańsk, Poland** |
| 11 | Changes to These Terms | 14 days' notice to active clients before material changes |
| 12 | Contact | contact@skymetrics.cloud |

---

## Cookie Policy

**Page:** `src/pages/cookies.astro` → `/cookies`

| Field | Value |
|---|---|
| `<title>` | Cookie Policy — SkyMetrics |
| `<meta name="description">` | Cookie policy for SkyMetrics. Learn which cookies we use and how to control them. |
| Last updated | August 10, 2026 |

### Sections

| # | Title | Key content |
|---|---|---|
| — | Intro | Privacy-first: no tracking, analytics, or advertising cookies |
| 1 | What Are Cookies | Definition of session vs. persistent cookies |
| 2 | Cookies We Use | **Strictly necessary** (always active): `__vercel_live_token` (session), `_vercel_jwt` (session) · **Analytics & tracking**: Not used |
| 3 | Third-Party Cookies | Vercel edge routing only; Web3Forms does not set cookies |
| 4 | Why We Have No Cookie Banner | Only strictly necessary cookies → no consent required under ePrivacy / GDPR |
| 5 | How to Control Cookies | Browser settings for Chrome, Firefox, Safari, Edge |
| 6 | Changes to This Policy | "Last updated" date reflects latest version |
| 7 | Contact | contact@skymetrics.cloud · SkyMetrics · Gdańsk, Poland |
