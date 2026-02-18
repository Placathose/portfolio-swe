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
                href="https://rb.brucewyatt.space"
                className="text-black text-lg font-medium hover:underline underline-offset-4 transition-all duration-300 ease-in-out"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="https://www.urbancustomz.com"
                className="relative text-black text-lg font-medium hover:underline underline-offset-4 transition-all duration-300 ease-in-out group"
              >
                Shopify
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out pointer-events-none z-10">
                  One of my website in Production
                  <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
