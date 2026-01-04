import './globals.css';

import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import Script from 'next/script';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: 'AJ Tran - Software Engineer',
  description:
    'AJ Tran - Full-stack Software Engineer building scalable backends, smooth APIs, and intuitive frontends.',
  keywords: [
    'AJ Tran',
    'software engineer',
    'full-stack',
    'Ruby on Rails',
    'React',
    'TypeScript',
  ],
  authors: [{ name: 'AJ Tran' }],
  metadataBase: new URL('https://ajtran-dev.onrender.com'),
  openGraph: {
    title: 'AJ Tran - Software Engineer',
    description:
      'Full-stack engineer building scalable backends, smooth APIs, and intuitive frontends.',
    url: 'https://ajtran-dev.onrender.com/',
    siteName: 'AJ Tran Portfolio',
    images: [{ url: '/banner.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AJ Tran - Software Engineer',
    description:
      'Full-stack engineer building scalable backends, smooth APIs, and intuitive frontends.',
    images: ['/banner.png'],
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rubik.variable}>
      <head>
        <meta name="theme-color" content="#764ba2" />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
