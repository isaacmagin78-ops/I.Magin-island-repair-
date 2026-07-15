import { siteConfig } from '../config/site';
import Icon from './Icon';
import Reveal from './Reveal';

export default function ServiceArea() {
  return (
    <section id="service-area" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        <Reveal>
          <p className="uppercase tracking-[0.3em] text-brass text-xs font-semibold mb-3">
            Where I Work
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-deepsea mb-4">
            Proudly Serving {siteConfig.contact.areaServed}
          </h2>
          <p className="text-ink/70 text-lg leading-relaxed mb-6">
            From waterfront high-rises to gated island communities, I cover
            condos and homes throughout South Florida. Not sure if
            I&rsquo;m in your area? Reach out &mdash; I&rsquo;m always
            expanding.
          </p>
          <div className="flex items-start gap-3 text-ink/70">
            <Icon name="map-pin" className="w-5 h-5 text-brass shrink-0 mt-1" />
            <span>{siteConfig.contact.areaServed}</span>
          </div>
        </Reveal>

        <Reveal delay={120} className="rounded-3xl overflow-hidden shadow-xl border border-brass/15 aspect-video">
          <iframe
            title="Madison Moves service area map"
            src={siteConfig.mapEmbedSrc}
            className="w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </div>
    </section>
  );
}
