import { siteConfig } from '../config/site';
import Icon from './Icon';

export default function ContactBar() {
  const items = [
    {
      label: 'Call Now',
      sub: siteConfig.contact.phoneDisplay,
      href: `tel:${siteConfig.contact.phoneHref}`,
      icon: 'phone' as const,
    },
    {
      label: 'Text Us',
      sub: siteConfig.contact.phoneDisplay,
      href: `sms:${siteConfig.contact.phoneHref}`,
      icon: 'message' as const,
    },
    {
      label: 'Email Us',
      sub: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      icon: 'mail' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="flex items-center gap-4 p-5 rounded-2xl bg-deepsea/5 border border-brass/20 hover:bg-deepsea hover:text-cream transition-colors group focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
        >
          <span className="w-11 h-11 shrink-0 rounded-full bg-brass text-white flex items-center justify-center group-hover:bg-cream group-hover:text-deepsea transition-colors">
            <Icon name={item.icon} className="w-5 h-5" />
          </span>
          <span>
            <span className="block font-semibold text-deepsea group-hover:text-cream">
              {item.label}
            </span>
            <span className="block text-sm text-ink/60 group-hover:text-cream/80">
              {item.sub}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}
