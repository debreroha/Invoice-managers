'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [activeLink, setActiveLink] = useState('');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActiveLink(window.location.pathname);
    }
  }, []);

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    setMobileMenuOpen(false); // Close mobile menu on link click
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <html>
      <body>
        <div className="grid grid-cols-1 gap-4">
          <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="text-2xl font-bold"><Link href="/">Invoice Manager</Link></div>
            <button
              className="block md:hidden text-white"
              onClick={toggleMobileMenu}
            >
              ☰
            </button>
            <nav
              className={`${
                isMobileMenuOpen ? 'block' : 'hidden'
              } md:flex md:items-center md:space-x-6`}
            >
              <Link href="/">
                <span
                  className={`pl-3 hover:underline ${
                    activeLink === '/' ? 'text-yellow-400' : ''
                  }`}
                  onClick={() => handleLinkClick('/')}
                >
                  Home
                </span>
              </Link>
              <Link href="/invoices">
                <span
                  className={`pl-3 hover:underline ${
                    activeLink === '/invoices' ? 'text-yellow-400' : ''
                  }`}
                  onClick={() => handleLinkClick('/invoices')}
                >
                  View Invoices
                </span>
              </Link>
              <Link href="/invoices/create-invoice">
                <span
                  className={`pl-3 hover:underline ${
                    activeLink === '/invoices/create-invoice' ? 'text-yellow-400' : ''
                  }`}
                  onClick={() => handleLinkClick('/invoices/create-invoice')}
                >
                  Create Invoice
                </span>
              </Link>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
