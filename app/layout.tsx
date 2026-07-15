import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Send-Off — College Launch Checklist',
  description: 'A guided family launch system for college preparation',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%230A0C10" width="100" height="100"/><path fill="%23D4B057" d="M50 20 L70 50 L50 70 L30 50 Z M50 30 L60 50 L50 65 L40 50 Z"/></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
