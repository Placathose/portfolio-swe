'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-black text-2xl font-bold hover:opacity-80 transition-opacity duration-300">
            BW
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-8">
            <li>
              <Link 
                href="/projects" 
                className="text-black text-lg font-medium hover:underline underline-offset-4 transition-all duration-300 ease-in-out"
              >
                Project
              </Link>
            </li>
            <li>
              <Link 
                href="/blog" 
                className="text-black text-lg font-medium hover:underline underline-offset-4 transition-all duration-300 ease-in-out"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                href="/shopify" 
                className="text-black text-lg font-medium hover:underline underline-offset-4 transition-all duration-300 ease-in-out"
              >
                Shopify
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
