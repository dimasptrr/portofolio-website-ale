import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#e2decb] py-8 px-4 text-center text-xs text-zinc-500 font-mono">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#fec84b] inline-block"></span>
          <span>ALIYAH SALSABILA PUTRI © 2026. Made with passion, React, Tailwind &amp; Express.</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-600">
          <button
            onClick={scrollToTop}
            className="hover:underline cursor-pointer font-mono"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
