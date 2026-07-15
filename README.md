# Madison Moves — South Florida Home Concierge

A production-ready marketing + booking site for Madison Moves, a South
Florida home concierge business serving condo and island communities.

## Services

Home Cleaning · Organizing · Pet Care · Home Watch · Move-in Concierge ·
Airport Assistance · Grocery Restocking · Senior Assistance

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
npm run start
```

## Go-Live Checklist

Everything you need to change to launch with real business data lives in
**one file**: [`app/config/site.ts`](app/config/site.ts).

1. **Business info** — phone, email, service area, mailing address.
2. **Stripe Payment Links** — create real links at
   https://dashboard.stripe.com/payment-links and paste them into
   `stripeLinks`. Any link left as `PASTE_STRIPE_LINK_HERE` automatically
   renders as a "Coming Soon" button instead of a broken/fake link, so the
   site is never shipping a fabricated payment flow.
3. **Booking form delivery** — the form works immediately with a `mailto:`
   fallback (opens the visitor's email client, pre-filled). For direct
   inbox delivery without a backend, create a free form at
   https://formspree.io and paste your endpoint into `formEndpoint`.
4. **Google Map** — the default `mapEmbedSrc` shows a general South Florida
   view. Replace it with your own: Google Maps → search your address →
   Share → Embed a map → copy the `src="..."` URL.
5. **Site URL** — update `siteUrl` to your live domain once deployed (used
   for canonical links and structured data).

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom coastal-luxury theme: deep teal, sand, brass accents)
- `next/font` self-hosted Google Fonts (Playfair Display + Inter) — no
  runtime CDN dependency
- Static export-friendly — no database, no server required

## Structure

```
app/
├── config/site.ts       # ALL business config lives here
├── components/          # Nav, Hero, Services, About, Testimonials,
│                         # ServiceArea (map), Booking, BookingForm,
│                         # ContactBar, PaymentLinks, Footer, Icon, Reveal
├── layout.tsx            # SEO metadata + LocalBusiness JSON-LD schema
├── page.tsx               # Composes all sections
├── sitemap.ts / robots.ts # SEO routes
└── globals.css
```

## Accessibility

- Skip-to-content link, semantic landmarks (`header`, `nav`, `main`, `footer`)
- Visible focus states on every interactive element
- Form fields use associated `<label>`s, `aria-invalid`, and
  `aria-describedby` error messages
- Respects `prefers-reduced-motion`

## SEO

- Metadata + Open Graph + Twitter card tags targeting "South Florida Home
  Concierge"
- `LocalBusiness` JSON-LD structured data
- `sitemap.xml` and `robots.txt` generated automatically

## Testimonials

The testimonials section intentionally ships with clearly labeled
**"Customer Testimonial"** placeholders instead of fabricated quotes. Swap
them for real client feedback in `app/components/Testimonials.tsx` as
reviews come in.

## Deployment

1. Push to GitHub (already set up on this repo).
2. Import the repo at https://vercel.com/new.
3. No environment variables are required — all configuration lives in
   `app/config/site.ts`.
4. Deploy.
