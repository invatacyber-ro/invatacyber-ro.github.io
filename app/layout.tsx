import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { getSite } from '@/lib/content';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  keywords: [
    'securitate cibernetica',
    'cybersecurity Romania',
    'comunitate cybersecurity',
    'pentesting',
    'CTF Romania',
    'invata cybersecurity',
    'hacking etic',
  ],
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [{ url: '/img/og-image.jpg', width: 1254, height: 1254, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ['/img/og-image.jpg'],
  },
  icons: {
    icon: [{ url: '/img/logo-shield.png', type: 'image/png' }],
    apple: '/img/logo-shield.png',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#0a1421',
  colorScheme: 'dark' as const,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Sari la conținut
        </a>
        {children}
      </body>
    </html>
  );
}
