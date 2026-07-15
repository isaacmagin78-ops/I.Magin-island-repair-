import { siteConfig } from '../config/site';
import Icon from './Icon';

const socialLinks = [
  { key: 'instagram', href: siteConfig.social.instagram, icon: 'instagram' as const, label: 'Instagram' },
  { key: 'tiktok', href: siteConfig.social.tiktok, icon: 'tiktok' as const, label: 'TikTok' },
];

export default function Hero() {
  const activeSocials = socialLinks.filter((s) => s.href);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-deepsea via-teal to-deepsea text-cream"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 15%, rgba(255,255,255,0.45) 0, transparent 40%), radial-gradient(circle at 85% 75%, rgba(201,162,91,0.55) 0, transparent 45%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.15) 0, transparent 50%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-brass/20 border-2 border-brass flex items-center justify-center mb-6 shadow-xl">
            <span className="font-serif text-4xl md:text-5xl font-bold text-brass">M</span>
          </div>

          <p className="uppercase tracking-[0.35em] text-brass text-xs md:text-sm font-semibold mb-4">
            Hi, I&rsquo;m {siteConfig.founderName} &mdash; {siteConfig.tagline}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Your Home, Cared For
            <br className="hidden sm:block" /> Like Island Time, Every Time
          </h1>
          <p className="text-lg md:text-xl text-cream/85 max-w-2xl mb-4">
            I&rsquo;m a South Florida house cleaner and organizer with a pilot&rsquo;s
            eye for detail &mdash; literally. When I&rsquo;m not cleaning, I&rsquo;m
            building flight hours toward becoming a commercial pilot. Same
            discipline, same checklist mindset, now applied to your home.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <a
              href="#booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brass text-deepsea font-semibold px-8 py-4 rounded-full hover:bg-brass-light transition-colors shadow-lg text-lg"
            >
              Book Madison
            </a>
            <a
              href={`tel:${siteConfig.contact.phoneHref}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-cream/70 text-cream font-semibold px-8 py-4 rounded-full hover:bg-cream/10 transition-colors text-lg"
            >
              <Icon name="phone" className="w-5 h-5" />
              {siteConfig.contact.phoneDisplay}
            </a>
          </div>

          {activeSocials.length > 0 && (
            <div className="flex items-center gap-4 mt-8">
              <span className="text-sm text-cream/60">Follow along:</span>
              {activeSocials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-brass hover:text-deepsea transition-colors"
                >
                  <Icon name={s.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          )}
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
