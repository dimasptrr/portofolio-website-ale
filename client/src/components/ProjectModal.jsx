import React, { useEffect } from 'react';
import { X, CheckCircle, ExternalLink } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const details = project.details || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-[#f7f6f0] border-3 border-zinc-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[8px_8px_0px_#111] z-10 p-6 sm:p-8">
        {/* Washi tape decor */}
        <div className={`tape-strip ${project.tapeColor === 'blue' ? 'tape-strip-blue' : ''} -top-3 left-1/2 -translate-x-1/2`}></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-zinc-900 flex items-center justify-center text-zinc-900 hover:bg-zinc-100 shadow-[1px_1px_0px_#111] transition-transform active:scale-90"
          aria-label="Close case study details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-[#fec84b] text-zinc-900 text-xs font-bold px-3 py-1 rounded-full border border-zinc-900">
            {project.category}
          </span>
          <span className="bg-[#a6e8cf] text-zinc-900 text-xs font-bold px-3 py-1 rounded-full border border-zinc-900">
            {project.platform}
          </span>
          <span className="text-xs font-mono text-zinc-500 ml-auto mr-10 sm:mr-0">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-4 pr-6">
          {project.title}
        </h3>

        {/* Main Image */}
        <div className="rounded-xl overflow-hidden border-2 border-zinc-900 aspect-[16/9] mb-6 bg-zinc-200 shadow-[3px_3px_0px_#111]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-white rounded-lg border border-zinc-300 mb-6">
          <div>
            <div className="text-[10px] uppercase font-bold text-zinc-400">Client / Context</div>
            <div className="text-sm font-bold text-zinc-800">{details.client || 'Confidential'}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-zinc-400">Timeline</div>
            <div className="text-sm font-bold text-zinc-800">{details.timeline || '4 Months'}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-zinc-400">Role</div>
            <div className="text-sm font-bold text-zinc-800">{details.role || 'Project Lead'}</div>
          </div>
        </div>

        {/* Challenge & Solution */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="font-pixel text-sm uppercase tracking-wider text-zinc-900 mb-1">
              ⚡ The Challenge
            </h4>
            <p className="text-zinc-700 text-sm leading-relaxed bg-white/70 p-3 rounded-lg border border-zinc-200">
              {details.challenge || project.summary}
            </p>
          </div>

          <div>
            <h4 className="font-pixel text-sm uppercase tracking-wider text-zinc-900 mb-1">
              💡 Strategic &amp; Operational Solution
            </h4>
            <p className="text-zinc-700 text-sm leading-relaxed bg-white/70 p-3 rounded-lg border border-zinc-200">
              {details.solution || 'Implemented structured workflows, standardized reporting, and systematic tracking.'}
            </p>
          </div>
        </div>

        {/* Key Impact Metrics */}
        {details.impact && (
          <div className="mb-6">
            <h4 className="font-pixel text-sm uppercase tracking-wider text-zinc-900 mb-2">
              🎯 Measurable Results
            </h4>
            <div className="space-y-2">
              {details.impact.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-emerald-50/70 border border-emerald-200 p-2.5 rounded-lg text-xs font-semibold text-emerald-950">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deliverables tags */}
        {details.deliverables && (
          <div className="pt-4 border-t border-dashed border-zinc-300 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono font-bold text-zinc-500 mr-1">Deliverables:</span>
            {details.deliverables.map((item, idx) => (
              <span key={idx} className="bg-white border border-zinc-300 text-zinc-700 text-xs px-2.5 py-1 rounded-md font-medium">
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions: Metric on left, Access link in center, X close button on right */}
        <div className="mt-6 pt-4 border-t border-zinc-300 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-script text-xl text-zinc-800 font-bold shrink-0">
            {project.metric}
          </span>

          {/* Center: Access the project here link for Notion */}
          {(project.projectUrl || project.id === 'notion-himabis') ? (
            <a
              href={project.projectUrl || 'https://skitter-pleasure-87c.notion.site/Administrative-Bureau-2cd1761bba768056a9efd1d6495e6e7a?pvs=143'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#fec84b] hover:bg-[#fed976] text-zinc-900 border-2 border-zinc-900 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 active:translate-y-0 transition-all text-center"
            >
              <span>🔗</span> Access the project here <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <div></div>
          )}

          {/* Right: Close button with X logo */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border-2 border-zinc-900 flex items-center justify-center text-zinc-900 hover:bg-zinc-100 shadow-[2px_2px_0px_#111] transition-transform active:scale-90 shrink-0"
            aria-label="Close case study"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
