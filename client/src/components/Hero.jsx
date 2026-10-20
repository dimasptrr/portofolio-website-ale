import React from 'react';

export default function Hero({ profile, education }) {
  const name = profile?.name || 'ALIYAH';
  const fullName = profile?.fullName || 'Aliyah Salsabila Putri';
  const role = profile?.role || 'Business Admin & Finance';
  const location = profile?.location || 'Malang / Probolinggo, ID';
  const headline = profile?.headline || 'I manage finance & operations that drive real business impact.';
  const gpa = education?.gpa || '3.89 / 4.00';
  const portraitImg = profile?.avatars?.outdoors || '/ale profile.jpeg';

  return (
    <section className="relative pt-10 pb-16 md:py-20 px-4 overflow-hidden border-b border-[#e2decb]" id="hero">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Text, Name, Headline & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top playful pill tags */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-4">
              <span className="bg-[#a6e8cf] text-zinc-900 border border-zinc-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider sticker-shadow-sm transform -rotate-2 hover:rotate-0 transition-transform">
                {role}
              </span>

              {/* Hand-drawn "my name is" label with double sketch underline */}
              <div className="relative inline-block px-1">
                <span className="font-hand text-xl sm:text-2xl text-zinc-800 select-none">my name is</span>
                <div className="w-12 h-1 bg-zinc-800 mx-auto rounded-full mt-0.5"></div>
                <div className="w-8 h-0.5 bg-zinc-800 mx-auto rounded-full mt-0.5"></div>
              </div>

              <span className="bg-[#fde68a] text-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider sticker-shadow-sm transform rotate-2 hover:rotate-0 transition-transform">
                GPA {gpa}
              </span>
            </div>

            {/* Main Pixel Typography Box (ALIYAH) */}
            <div className="relative inline-block my-3 group max-w-full">
              {/* Hand drawn orange sketch box enclosing the name (No redundant subtitle) */}
              <div className="sketch-box px-8 py-5 sm:px-12 sm:py-7 bg-white/40 backdrop-blur-[1px] shadow-sm transition-transform group-hover:scale-[1.01]">
                <h1 className="font-pixel text-5xl sm:text-7xl md:text-8xl text-zinc-900 tracking-wider select-none font-bold leading-none">
                  {name}
                </h1>
              </div>

              {/* Annotation: "Finance & Admin" on bottom left with arrow */}
              <div className="absolute -bottom-5 -left-2 sm:-left-6 flex items-center gap-1.5 z-20">
                <div className="bg-[#fec84b] text-zinc-900 font-script text-sm sm:text-lg font-bold px-2.5 py-0.5 rounded-sm border border-zinc-800 sticker-shadow-sm transform -rotate-3 hover:rotate-0 transition-transform">
                  Finance &amp; Admin
                </div>
                <svg className="w-6 h-6 text-zinc-800 -rotate-12 hidden sm:block" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>

              {/* Annotation: "Malang, ID" on bottom right with arrow */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 flex items-center gap-1 z-20">
                <svg className="w-6 h-6 text-zinc-800 rotate-180 hidden sm:block" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <div className="bg-[#a6e8cf] text-zinc-900 font-script text-sm sm:text-lg font-bold px-2.5 py-0.5 rounded-sm border border-zinc-800 sticker-shadow-sm transform rotate-2 hover:rotate-0 transition-transform">
                  {location}
                </div>
              </div>
            </div>

            {/* Clean Headline Statement */}
            <div className="mt-7 mb-2">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                {headline}
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base mt-3 max-w-xl font-hand text-xl leading-relaxed">
                Specialized in finance, budgeting, proposal &amp; LPJ accountability, and organizational workflow coordination.
              </p>
              {profile?.status && (
                <span className="inline-block mt-3 bg-[#a6e8cf] border border-zinc-900 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  {profile.status}
                </span>
              )}
            </div>

            {/* CTA Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                className="inline-flex items-center gap-2.5 bg-zinc-950 text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase px-6 py-3.5 rounded-md hover:bg-zinc-800 sticker-shadow transition-all hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
                href="#contact"
              >
                <span className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-xs text-white">
                  ✉
                </span>
                GET IN TOUCH
              </a>

              <a
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase px-5 py-3.5 rounded-md hover:bg-[#1eb956] border-2 border-zinc-900 sticker-shadow transition-all hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
                href="https://wa.me/6281216921314"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>💬</span> WHATSAPP ME
              </a>
            </div>

          </div>

          {/* Right Column: Prominent Portrait Photo Frame with User's Uploaded Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative max-w-sm w-full group">
              
              {/* Top Washi Tape */}
              <div className="tape-strip tape-strip-blue -top-3.5 left-1/2 -translate-x-1/2 z-20"></div>

              {/* Rotating Circular Stamp Badge on top right */}
              <div className="absolute -top-4 -right-4 z-20 w-20 h-20 rounded-full border-2 border-dashed border-zinc-900 bg-[#fde68a] flex items-center justify-center text-[9px] font-mono font-extrabold uppercase text-zinc-900 text-center shadow-[2px_2px_0px_#111] transform rotate-12 group-hover:rotate-45 transition-transform duration-500">
                ★ FIA UB ★<br />2024-2028
              </div>

              {/* Main Photo Card with Arch Top */}
              <div className="relative bg-white p-3.5 pb-6 border-3 border-zinc-900 rounded-t-[140px] rounded-b-2xl shadow-[8px_8px_0px_#111] overflow-hidden group-hover:-translate-y-1 transition-all duration-300">
                
                {/* Arch Photo Container */}
                <div className="aspect-[4/5] rounded-t-[130px] rounded-b-lg overflow-hidden bg-zinc-100 border border-zinc-200 relative">
                  <img
                    src={portraitImg}
                    alt={fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Bottom Plaque / Name Banner */}
                <div className="mt-4 pt-3 border-t-2 border-dashed border-zinc-300 flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-zinc-900 text-base sm:text-lg block leading-tight">
                      {fullName}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                      {role}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#12b76a] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    ✓
                  </div>
                </div>

              </div>

              {/* Bottom Decorative Tag / Sticker (Plain Yellow Box Without Text) */}
              <div className="absolute -bottom-3 -left-3 z-20">
                <span className="wavy-badge bg-[#fec84b] border border-zinc-900 shadow-[2px_2px_0px_#111] transform -rotate-3 inline-block w-20 h-5 sm:w-24 sm:h-6"></span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
