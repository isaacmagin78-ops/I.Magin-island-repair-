/**
 * ============================================================================
 * MADISON MOVES — BUSINESS CONFIGURATION
 * ============================================================================
 * This is the ONLY file you should need to edit to launch the site with your
 * real business details. Replace every "PASTE_" / "REPLACE_" placeholder
 * below with your real values, commit, and redeploy.
 * ============================================================================
 */

export const siteConfig = {
  businessName: 'Madison Moves',
  founderName: 'Madison',
  tagline: 'South Florida House Cleaning & Home Organizing',
  description:
    'Madison Moves is Madison’s personal house cleaning, organizing, and home assistant service for South Florida condos and homes — detail-obsessed, dependable, and easy to book.',

  /**
   * MADISON'S STORY
   * Shown in the "Meet Madison" section. This is real background provided by
   * the business owner, not marketing fabrication — edit freely as her story
   * evolves.
   */
  founderBio: [
    'I’m Madison — 29, born and raised with a strong work ethic and an eye for detail that doesn’t switch off.',
    'By day (and sometimes by night), I’m building flight hours toward a career as a commercial pilot. The same discipline that goes into a pre-flight checklist is what I bring into your home: nothing skipped, nothing out of place.',
    'House cleaning and organizing started as a way to fund my flight hours — it turned into something I genuinely love. I treat every home like it’s the only one on my schedule that day.',
  ],

  // Update to your live domain once deployed (used for canonical URLs & schema.org data).
  siteUrl: 'https://madisonmoves.vercel.app',

  contact: {
    // Real phone number in E.164-ish display format. Used for tel:/sms: links.
    phoneDisplay: '(555) 123-4567',
    phoneHref: '+15551234567',
    email: 'hello@madisonmoves.com',
    // General service area shown in copy/schema — replace with your real coverage.
    areaServed: 'South Florida (Miami-Dade, Broward & Palm Beach Counties)',
    address: {
      streetAddress: 'REPLACE_STREET_ADDRESS',
      addressLocality: 'REPLACE_CITY',
      addressRegion: 'FL',
      postalCode: 'REPLACE_ZIP',
      addressCountry: 'US',
    },
  },

  /**
   * SOCIAL LINKS
   * Leave blank to hide. Fill in to show a "Follow Madison" row in the hero
   * and footer — good for turning site visitors into social followers (and
   * vice versa).
   */
  social: {
    instagram: '',
    tiktok: '',
    facebook: '',
  },

  /**
   * GOOGLE MAP EMBED
   * No API key required. The default below uses Google's public "output=embed"
   * search-embed format centered on South Florida as a placeholder.
   * To point it at your own office/service area:
   *   1. Go to Google Maps and search your address or area.
   *   2. Click Share -> Embed a map -> copy the src="..." URL from the <iframe>.
   *   3. Paste that full src URL here (it will look like
   *      "https://www.google.com/maps/embed?pb=...").
   * Either a "pb=" embed URL or an "output=embed" query URL works.
   */
  mapEmbedSrc:
    'https://www.google.com/maps?q=South+Florida&output=embed',

  /**
   * STRIPE PAYMENT LINKS
   * Create real Payment Links at https://dashboard.stripe.com/payment-links
   * and paste them below. Leave a value as "PASTE_STRIPE_LINK_HERE" and the
   * button for that service will automatically show as "Coming Soon" and
   * route the visitor to the contact form instead of a broken/fake link.
   */
  stripeLinks: {
    depositGeneral: 'PASTE_STRIPE_LINK_HERE',
    homeCleaning: 'PASTE_STRIPE_LINK_HERE',
    organizing: 'PASTE_STRIPE_LINK_HERE',
    homeAssistant: 'PASTE_STRIPE_LINK_HERE',
  },

  /**
   * BOOKING FORM SUBMISSION ENDPOINT
   * The form works out-of-the-box with a "mailto:" fallback (opens the
   * visitor's email client with the request pre-filled) so nothing is
   * fabricated or broken by default.
   *
   * For real inbox delivery without building a backend, create a free form
   * at https://formspree.io, get your endpoint (https://formspree.io/f/XXXXXXX)
   * and paste it below — submissions will POST there instead.
   */
  formEndpoint: 'PASTE_FORMSPREE_ENDPOINT_HERE',
} as const;

export type StripeServiceKey = keyof typeof siteConfig.stripeLinks;

export function isPlaceholder(value: string): boolean {
  return (
    !value ||
    value.startsWith('PASTE_') ||
    value.startsWith('REPLACE_') ||
    value.trim().length === 0
  );
}

export const services = [
  {
    id: 'home-cleaning',
    name: 'House Cleaning',
    stripeKey: 'homeCleaning' as StripeServiceKey,
    description:
      'Detailed, reliable cleaning for condos and homes — recurring or one-time, always to a five-star standard.',
    icon: 'sparkles',
  },
  {
    id: 'organizing',
    name: 'Organizing',
    stripeKey: 'organizing' as StripeServiceKey,
    description:
      'Closets, pantries, garages, and whole-home organizing systems designed to actually stick.',
    icon: 'grid',
  },
  {
    id: 'home-assistant',
    name: 'Home Assistant',
    stripeKey: 'homeAssistant' as StripeServiceKey,
    description:
      'The extra pair of hands around the house — errands, grocery restocking, pet check-ins, and getting things done.',
    icon: 'heart',
  },
] as const;
