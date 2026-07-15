import { siteConfig } from '../config/site';
import Icon from './Icon';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-deepsea via-teal to-deepsea text-cream"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0, transparent 45%), radial-gradient(circle at 80% 70%, rgba(201,162,91,0.5) 0, transparent 40%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
        <p className="uppercase tracking-[0.35em] text-brass text-xs md:text-sm font-semibold mb-5">
          {siteConfig.tagline}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
          Your Home, Cared For —
          <br className="hidden sm:block" /> Island Time, Every Time
        </h1>
        <p className="text-lg md:text-xl text-cream/85 max-w-2xl mx-auto mb-10">
          Madison Moves is South Florida&rsquo;s trusted home concierge for condo
          and island communities: cleaning, organizing, pet care, home watch,
          and more — handled by people you can rely on.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#booking"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brass text-deepsea font-semibold px-8 py-4 rounded-full hover:bg-brass-light transition-colors shadow-lg text-lg"
          >
            Book a Service
          </a>
          <a
            href={`tel:${siteConfig.contact.phoneHref}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-cream/70 text-cream font-semibold px-8 py-4 rounded-full hover:bg-cream/10 transition-colors text-lg"
          >
            <Icon name="phone" className="w-5 h-5" />
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </div>

      <svg
        aria-hidden="true"
        className="relative block w-full text-cream"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,32 C240,80 480,0 720,24 C960,48 1200,80 1440,32 L1440,80 L0,80 Z"
        />
      </svg>
    </section>
  );
}
