import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lendora | Premium Peer-to-Peer Rental & Sharing Marketplace',
  description: 'Rent high-end camera gear, book creative studio spaces, and hire verified service professionals with secure escrow and $1M host insurance.',
  keywords: ['rental marketplace', 'peer to peer rental', 'camera rental', 'studio space booking', 'service marketplace', 'sharing economy'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
