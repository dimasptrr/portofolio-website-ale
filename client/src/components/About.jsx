import React from 'react';

export default function About({ profile, education }) {
  const bio = profile?.bio || '';
  const outdoorsImg = profile?.avatars?.outdoors || "/ale profile.jpeg";

  const edu = education || {};

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto border-b border-[#e2decb]" id="about">
      {/* Hand written section tag */}
      <div className="text-center sm:text-left mb-4">
        <span className="font-hand text-3xl sm:text-4xl text-zinc-800 -rotate-3 inline-block">
          about me &amp; education!
        </span>
      </div>

      {/* Centered Header box: "profile & background" */}
      <div className="text-center mb-12">
        <div className="inline-block sketch-box-black px-8 py-2 bg-white/70 shadow-sm transform -rotate-1">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-wide">
            profile &amp; background
          </h3>
        </div>
      </div>

      {/* Grid Layout: Left polaroid & Right bio statement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14 max-w-5xl mx-auto">
        {/* Left Polaroid Photo (Portrait) */}
        <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
          <div className="relative bg-white p-3.5 pb-6 shadow-xl border-2 border-zinc-900 rounded-sm transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 max-w-xs group cursor-pointer">
            {/* Washi tape at top left corner */}
            <div className="tape-strip tape-strip-blue -top-3.5 -left-4 -rotate-45"></div>
            {/* Washi tape at top right corner */}
            <div className="tape-strip -top-3.5 -right-4 rotate-45"></div>
            
            <div className="aspect-[4/5] overflow-hidden bg-zinc-100 rounded-sm border border-zinc-200">
              <img
                alt="Aliyah portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={outdoorsImg}
              />
            </div>
            <p className="font-hand text-center text-zinc-700 text-lg mt-3 font-bold">Aliyah S. P. • 2026</p>
          </div>
        </div>

        {/* Right Engaging Bio Statement */}
        <div className="lg:col-span-7 px-2 sm:px-6 order-1 lg:order-2">
          <div className="bg-white/80 border-2 border-zinc-900 rounded-2xl p-6 sm:p-8 shadow-[5px_5px_0px_#111] relative">
            {/* Decorative washi tape */}
            <div className="tape-strip -top-3 right-8 rotate-3"></div>

            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-3">
              About Aliyah
            </span>

            <p className="font-hand text-xl sm:text-2xl text-zinc-800 leading-relaxed text-justify">
              {bio}
            </p>

            <div className="mt-6 pt-4 border-t-2 border-dashed border-zinc-200 flex items-center justify-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
              <span className="bg-[#fec84b] text-zinc-900 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-full border border-zinc-900 shadow-sm whitespace-nowrap text-center">
                ✨ Financial Administration
              </span>
              <span className="bg-[#a6e8cf] text-zinc-900 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-full border border-zinc-900 shadow-sm whitespace-nowrap text-center">
                📊 Budgeting &amp; LPJ
              </span>
              <span className="bg-[#ff708f] text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-full border border-zinc-900 shadow-sm whitespace-nowrap text-center">
                🎯 Business Operations
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Education Showcase Card (Postcard / Notebook format) */}
      <div className="relative bg-white border-2 border-zinc-900 rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#111] max-w-3xl mx-auto">
        <div className="tape-strip -top-3 left-1/2 -translate-x-1/2"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b-2 border-dashed border-zinc-300 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#fec84b] border-2 border-zinc-900 flex items-center justify-center text-2xl shadow-sm">
              🎓
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Higher Education</span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-zinc-900">
                {edu.institution}
              </h4>
            </div>
          </div>
          <div className="bg-emerald-100 border border-emerald-400 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            GPA: {edu.gpa}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-700">
          <div className="space-y-2">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase text-zinc-400 block">Degree &amp; Major</span>
              <span className="font-bold text-zinc-900">{edu.degree}</span>
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase text-zinc-400 block">Faculty &amp; Campus</span>
              <span className="font-semibold">{edu.campus}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase text-zinc-400 block">Academic Period</span>
              <span className="font-semibold text-zinc-800">{edu.period}</span>
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase text-zinc-400 block">Key Focus &amp; Competencies</span>
              <span className="font-semibold text-zinc-800">{edu.focus || "Finance, Accounting, and Business Operations"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
