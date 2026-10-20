import React, { useState, useMemo } from 'react';
import CertificateModal from './CertificateModal';

export default function Experience({ experiences = [] }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedCert, setSelectedCert] = useState(null);

  const filterCategories = ['ALL', 'WORK', 'ORGANISATIONS', 'COMMITTEES'];

  // Ensure strict chronological sort from newest to oldest
  const sortedExperiences = useMemo(() => {
    return [...experiences].sort((a, b) => {
      const orderA = a.sortOrder ?? 999;
      const orderB = b.sortOrder ?? 999;
      return orderA - orderB;
    });
  }, [experiences]);

  const filteredExperiences = activeFilter === 'ALL'
    ? sortedExperiences
    : sortedExperiences.filter((exp) => exp.category?.toUpperCase() === activeFilter);

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto border-b border-[#e2decb]" id="experience">
      <div className="text-center mb-10">
        <span className="font-hand text-3xl text-zinc-800 -rotate-2 inline-block">
          career &amp; leadership timeline
        </span>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900">
          Work &amp; Organisational Experience
        </h3>
        <p className="font-hand text-xl text-zinc-600 mt-1">
          Ordered from latest to earliest • Click certificates to view official credentials
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all ${
              activeFilter === cat
                ? 'bg-zinc-900 text-white border-zinc-900 shadow-[2px_2px_0px_#fec84b]'
                : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline Notebook Structure */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-dashed border-zinc-400 space-y-8 max-w-3xl mx-auto">
        {filteredExperiences.map((exp) => {
          // If points are provided, use them; otherwise split description by sentence
          const bulletPoints = exp.points && exp.points.length > 0
            ? exp.points
            : typeof exp.description === 'string'
              ? exp.description
                  .split(/(?<=\.)\s+/)
                  .map((s) => s.trim())
                  .filter((s) => s.length > 0)
              : [];

          return (
            <div key={exp.id} className="relative group">
              {/* Circle marker */}
              <div
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full border-2 border-zinc-900 flex items-center justify-center text-xs font-bold shadow-sm transform group-hover:scale-125 transition-transform"
                style={{ backgroundColor: exp.iconBg || '#fec84b' }}
              >
                {exp.icon || '★'}
              </div>

              <div className="bg-white/95 p-5 sm:p-6 rounded-xl border-2 border-zinc-900 shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#111] hover:-translate-y-0.5 transition-all">
                {/* Header row */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-700">
                      {exp.category || 'Organisations'}
                    </span>
                    <h4 className="text-lg font-extrabold text-zinc-900">
                      {exp.role}{' '}
                      <span className="text-zinc-500 font-semibold text-sm">
                        @{exp.company}
                      </span>
                    </h4>
                  </div>
                  <span
                    className="font-mono text-xs font-bold px-2.5 py-1 rounded-full border border-zinc-800 shrink-0"
                    style={{ backgroundColor: exp.badgeBg || '#a6e8cf' }}
                  >
                    {exp.period}
                  </span>
                </div>

                {/* Bullet Points Description */}
                <ul className="space-y-2 text-zinc-700 text-sm leading-relaxed my-3">
                  {bulletPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 mt-2 shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Certificate / Proof / Footage Button if available */}
                {exp.certificate && (
                  <div className="mt-4 pt-3 border-t border-dashed border-zinc-200 flex items-center justify-between">
                    <button
                      onClick={() => {
                        const isKpps = exp.role?.toLowerCase().includes('kpps') || exp.category === 'Work';
                        setSelectedCert({
                          title: isKpps ? `Footage — ${exp.role}` : `${exp.role} Certificate`,
                          subtitle: `@${exp.company} (${exp.period})`,
                          file: exp.certificate,
                          issuer: exp.company,
                          category: isKpps ? 'Work Footage' : exp.category,
                        });
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#fef08a] hover:bg-[#fde047] text-zinc-900 text-xs font-mono font-bold px-3 py-1.5 rounded-md border border-zinc-900 shadow-[2px_2px_0px_#111] active:translate-y-0.5 transition-all cursor-pointer"
                    >
                      <span>{(exp.role?.toLowerCase().includes('kpps') || exp.category === 'Work') ? '📷' : '📜'}</span>{' '}
                      {(exp.role?.toLowerCase().includes('kpps') || exp.category === 'Work')
                        ? 'Footage'
                        : 'View Certificate / Proof'}
                    </button>
                    <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
                      {(exp.role?.toLowerCase().includes('kpps') || exp.category === 'Work')
                        ? 'Work Documentation'
                        : 'Verified Document'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <CertificateModal
          item={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
}
