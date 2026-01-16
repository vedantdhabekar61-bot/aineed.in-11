import './globals.css';
import type { Metadata } from 'next';
import { AuthWrapper } from '../components/AuthWrapper';

export const metadata: Metadata = {
  title: 'aineed. - Find the right AI tool',
  description: 'An AI-powered search engine that recommends the best AI tools for your specific problems.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen font-sans flex flex-col relative overflow-x-hidden bg-slate-50 text-slate-900">
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </body>
    </html>
  );
}