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
  tagline: 'South Florida Home Concierge',
  description:
    'Madison Moves is a South Florida home concierge service for condo and island communities — home cleaning, organizing, pet care, home watch, move-in concierge, airport assistance, grocery restocking, and senior assistance.',

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

  social: {
    facebook: '',
    instagram: '',
    google: '',
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
    petCare: 'PASTE_STRIPE_LINK_HERE',
    homeWatch: 'PASTE_STRIPE_LINK_HERE',
    moveInConcierge: 'PASTE_STRIPE_LINK_HERE',
    airportAssistance: 'PASTE_STRIPE_LINK_HERE',
    groceryRestocking: 'PASTE_STRIPE_LINK_HERE',
    seniorAssistance: 'PASTE_STRIPE_LINK_HERE',
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
    name: 'Home Cleaning',
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
      'Closets, pantries, garages and whole-home organizing systems designed to actually stick.',
    icon: 'grid',
  },
  {
    id: 'pet-care',
    name: 'Pet Care',
    stripeKey: 'petCare' as StripeServiceKey,
    description:
      'Trusted in-home pet sitting, dog walking, and check-ins so your companions are never alone.',
    icon: 'paw',
  },
  {
    id: 'home-watch',
    name: 'Home Watch',
    stripeKey: 'homeWatch' as StripeServiceKey,
    description:
      'Scheduled interior and exterior checks for seasonal residents — with photo reports after every visit.',
    icon: 'shield',
  },
  {
    id: 'move-in-concierge',
    name: 'Move-in Concierge',
    stripeKey: 'moveInConcierge' as StripeServiceKey,
    description:
      'Unpacking, setup, and settling-in support so your new condo feels like home from day one.',
    icon: 'key',
  },
  {
    id: 'airport-assistance',
    name: 'Airport Assistance',
    stripeKey: 'airportAssistance' as StripeServiceKey,
    description:
      'Reliable airport pickups and drop-offs for residents, guests, and family flying into South Florida.',
    icon: 'plane',
  },
  {
    id: 'grocery-restocking',
    name: 'Grocery Restocking',
    stripeKey: 'groceryRestocking' as StripeServiceKey,
    description:
      'Fridge and pantry stocked with your preferences before you even walk through the door.',
    icon: 'cart',
  },
  {
    id: 'senior-assistance',
    name: 'Senior Assistance',
    stripeKey: 'seniorAssistance' as StripeServiceKey,
    description:
      'Compassionate errands, companionship, and light assistance that help seniors stay independent at home.',
    icon: 'heart',
  },
] as const;
