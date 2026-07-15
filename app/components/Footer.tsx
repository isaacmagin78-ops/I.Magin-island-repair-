import { services, siteConfig } from '../config/site';
import Icon from './Icon';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deepsea text-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-serif text-xl font-bold text-cream mb-2">
            {siteConfig.businessName}
          </p>
          <p className="text-sm mb-4">{siteConfig.tagline}</p>
          <p className="text-sm leading-relaxed mb-4">{siteConfig.description}</p>
          {(siteConfig.social.instagram || siteConfig.social.tiktok || siteConfig.social.facebook) && (
            <div className="flex items-center gap-3">
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-brass hover:text-deepsea transition-colors">
                  <Icon name="instagram" className="w-4 h-4" />
                </a>
              )}
              {siteConfig.social.tiktok && (
                <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-brass hover:text-deepsea transition-colors">
                  <Icon name="tiktok" className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-cream mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <a href="#services" className="hover:text-brass transition-colors">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-cream mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Icon name="phone" className="w-4 h-4 text-brass" />
              <a href={`tel:${siteConfig.contact.phoneHref}`} className="hover:text-brass transition-colors">
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="mail" className="w-4 h-4 text-brass" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-brass transition-colors">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="map-pin" className="w-4 h-4 text-brass mt-0.5" />
              <span>{siteConfig.contact.areaServed}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-cream mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-brass transition-colors">Meet Madison</a></li>
            <li><a href="#testimonials" className="hover:text-brass transition-colors">Testimonials</a></li>
            <li><a href="#service-area" className="hover:text-brass transition-colors">Service Area</a></li>
            <li><a href="#booking" className="hover:text-brass transition-colors">Book Now</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 space-y-2">
        {siteConfig.partner.name && (
          <p className="text-center text-xs text-cream/50 px-4">
            In partnership with{' '}
            {siteConfig.partner.url ? (
              <a
                href={siteConfig.partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass hover:underline"
              >
                {siteConfig.partner.name}
              </a>
            ) : (
              <span className="text-cream/70">{siteConfig.partner.name}</span>
            )}
          </p>
        )}
        <p className="text-center text-xs text-cream/50 px-4">
          &copy; {year} {siteConfig.businessName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
