'use client';

import { useState } from 'react';

export default function BioSection() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('hello@yume.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="w-full flex flex-row items-start justify-between">
      {/* Email Section. */}
      <div className="flex items-center gap-2 cursor-pointer group relative" onClick={copyToClipboard}>
        <p className="text-black text-[20px] font-medium group-hover:underline underline-offset-4 transition-all duration-300 ease-in-out">
          wyattgx@gmail.com
        </p>
        <div className="w-4 h-4 flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="1.668" y="1.668" width="12.222" height="12.222" />
            <path d="M17 6.11L18.332 6.11L18.332 18.332L6.109 18.332L6.109 17" />
          </svg>
        </div>
        <button
          className="absolute opacity-0 pointer-events-none"
          aria-label="Copy to clipboard"
        >
          Copy to Clipboard
        </button>
        {copied && (
          <span className="absolute -top-8 left-0 bg-black text-white text-xs px-2 py-1 rounded">
            Copied!
          </span>
        )}
      </div>

      {/* Bio Text */}
      <div className="flex-2 max-w-md ml-8">
        <p className="text-black text-[32px] leading-9 font-normal">
          I&apos;m a software engineer and Shopify freelancer. My values are in my code, teaching and creativity.
        </p>
      </div>
    </div>
  );
}
