import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'College Launch OS',
  description: 'A guided family launch system for college preparation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
