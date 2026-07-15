import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from './config/site';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.businessName} | South Florida Home Concierge`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.description,
  keywords: [
    'South Florida home concierge',
    'condo home concierge Florida',
    'home cleaning South Florida',
    'home watch service Florida',
    'move-in concierge South Florida',
    'senior assistance South Florida',
    'pet care condo Florida',
    'grocery restocking service Florida',
  ],
  authors: [{ name: siteConfig.businessName }],
  openGraph: {
    type: 'website',
    url: siteConfig.siteUrl,
    title: `${siteConfig.businessName} | South Florida Home Concierge`,
    description: siteConfig.description,
    siteName: siteConfig.businessName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.businessName} | South Florida Home Concierge`,
    description: siteConfig.description,
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.businessName,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    telephone: siteConfig.contact.phoneHref,
    email: siteConfig.contact.email,
    areaServed: siteConfig.contact.areaServed,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.streetAddress,
      addressLocality: siteConfig.contact.address.addressLocality,
      addressRegion: siteConfig.contact.address.addressRegion,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.addressCountry,
    },
    priceRange: '$$',
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-cream text-ink font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-deepsea focus:text-cream focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
