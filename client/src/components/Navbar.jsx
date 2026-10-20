import React, { useState } from 'react';
import { Inbox, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenInbox }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#f7f6f0]/95 backdrop-blur-sm border-b border-[#ded9c4]/70 px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left brand smiley / icon */}
        <a className="flex items-center gap-2 group" href="#hero" title="Aliyah's Portfolio">
          <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center text-white text-lg font-bold shadow-sm transform group-hover:rotate-12 transition-transform">
            ☻
          </div>
          <div className="flex flex-col text-left">
            <span className="font-pixel text-xs sm:text-sm tracking-wider text-zinc-900">
              ALIYAH S.P
            </span>
            <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline-block leading-none">
              Business Admin &amp; Finance
            </span>
          </div>
        </a>

        {/* Primary Navigation Links (Desktop) */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1.5">
          <a
            className="flex items-center gap-1.5 bg-[#fec84b] border border-zinc-900 text-zinc-900 px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#111] transition-transform hover:-translate-y-0.5"
            href="#hero"
          >
            <span>★</span> HOME
          </a>
          <a
            className="flex items-center gap-1.5 bg-white/70 hover:bg-white text-zinc-800 border border-zinc-300 hover:border-zinc-900 px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
            href="#about"
          >
            <span>👤</span> ABOUT
          </a>
          <a
            className="flex items-center gap-1.5 bg-white/70 hover:bg-white text-zinc-800 border border-zinc-300 hover:border-zinc-900 px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
            href="#experience"
          >
            <span>⌛</span> EXPERIENCE
          </a>
          <a
            className="flex items-center gap-1.5 bg-white/70 hover:bg-white text-zinc-800 border border-zinc-300 hover:border-zinc-900 px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
            href="#projects"
          >
            <span>⊞</span> PORTFOLIO
          </a>
          <a
            className="flex items-center gap-1.5 bg-white/70 hover:bg-white text-zinc-800 border border-zinc-300 hover:border-zinc-900 px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
            href="#skills"
          >
            <span>◆</span> SKILLS &amp; CERTS
          </a>
        </nav>

        {/* Right Action & Socials */}
        <div className="flex items-center gap-2">
          {/* LinkedIn Badge */}
          <a
            className="w-8 h-8 rounded-full bg-[#0077b5] text-white border border-zinc-800 flex items-center justify-center text-xs font-bold shadow-[1px_1px_0px_#111] hover:scale-110 transition-transform"
            href="https://www.linkedin.com/in/aliyah-salsabila-putri"
            rel="noopener noreferrer"
            target="_blank"
            title="LinkedIn Aliyah"
          >
            in
          </a>

          {/* WhatsApp Badge */}
          <a
            className="w-8 h-8 rounded-full bg-[#25D366] text-white border border-zinc-800 flex items-center justify-center text-xs font-bold shadow-[1px_1px_0px_#111] hover:scale-110 transition-transform"
            href="https://wa.me/6281216921314"
            rel="noopener noreferrer"
            target="_blank"
            title="WhatsApp Aliyah (+62 812-1692-1314)"
          >
            💬
          </a>

          {/* Contact CTA Button (Directly beside WhatsApp) */}
          <a
            className="flex items-center gap-1.5 bg-zinc-950 text-white hover:bg-zinc-800 px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#fec84b] transition-transform hover:-translate-y-0.5 ml-1"
            href="#contact"
          >
            <span>❤</span> CONTACT
          </a>

          {onOpenInbox && (
            <button
              onClick={onOpenInbox}
              className="hidden md:inline-flex items-center gap-1.5 bg-white text-zinc-800 border border-zinc-900 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 transition-transform"
            >
              <Inbox className="w-3.5 h-3.5" /> INBOX
            </button>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-800 hover:text-zinc-950 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-3 pb-2 border-t border-[#ded9c4]/70 mt-2 flex flex-col gap-2">
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 bg-[#fec84b] text-zinc-900 font-bold px-3 py-2 rounded-lg text-sm border border-zinc-900 shadow-sm"
            href="#hero"
          >
            <span>★</span> HOME
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 bg-white text-zinc-800 font-bold px-3 py-2 rounded-lg text-sm border border-zinc-300"
            href="#about"
          >
            <span>👤</span> ABOUT
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 bg-white text-zinc-800 font-bold px-3 py-2 rounded-lg text-sm border border-zinc-300"
            href="#experience"
          >
            <span>⌛</span> EXPERIENCE
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 bg-white text-zinc-800 font-bold px-3 py-2 rounded-lg text-sm border border-zinc-300"
            href="#projects"
          >
            <span>⊞</span> PORTFOLIO
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 bg-white text-zinc-800 font-bold px-3 py-2 rounded-lg text-sm border border-zinc-300"
            href="#skills"
          >
            <span>◆</span> SKILLS &amp; CERTS
          </a>
          {onOpenInbox && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInbox();
              }}
              className="flex items-center gap-2 bg-white text-zinc-800 font-bold px-3 py-2 rounded-lg text-sm border border-zinc-900"
            >
              <Inbox className="w-4 h-4" /> INBOX
            </button>
          )}
        </div>
      )}
    </header>
  );
}
