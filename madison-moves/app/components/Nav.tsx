'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '../config/site';
import Icon from './Icon';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#service-area', label: 'Service Area' },
  { href: '#booking', label: 'Book Now' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-brass/20">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 md:h-20"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="font-serif text-xl md:text-2xl font-bold text-deepsea tracking-tight"
        >
          {siteConfig.businessName}
          <span className="block text-[0.6rem] md:text-xs font-sans font-medium tracking-[0.2em] uppercase text-brass">
            {siteConfig.tagline}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-deepsea/80 hover:text-brass font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${siteConfig.contact.phoneHref}`}
            className="inline-flex items-center gap-2 bg-deepsea text-cream px-5 py-2.5 rounded-full font-semibold hover:bg-teal transition-colors shadow-sm"
          >
            <Icon name="phone" className="w-4 h-4" />
            Call Now
          </a>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-deepsea"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} className="w-7 h-7" />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-brass/20 bg-cream px-4 pb-6 pt-2 flex flex-col gap-1"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-deepsea font-medium border-b border-brass/10 last:border-b-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${siteConfig.contact.phoneHref}`}
            className="mt-4 inline-flex items-center justify-center gap-2 bg-deepsea text-cream px-5 py-3 rounded-full font-semibold"
          >
            <Icon name="phone" className="w-4 h-4" />
            Call Now
          </a>
        </div>
      )}
    </header>
  );
}
