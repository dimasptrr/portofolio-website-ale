import React, { useEffect } from 'react';
import { X, ExternalLink, Download, FileText } from 'lucide-react';

export default function CertificateModal({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const isPdf = item.file?.toLowerCase().endsWith('.pdf');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-[#f7f6f0] border-3 border-zinc-900 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-[8px_8px_0px_#111] z-10 p-5 sm:p-7">
        {/* Top Washi Tape */}
        <div className="tape-strip tape-strip-blue -top-3.5 left-1/2 -translate-x-1/2 z-20"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border-2 border-zinc-900 flex items-center justify-center text-zinc-900 hover:bg-zinc-100 shadow-[2px_2px_0px_#111] transition-transform active:scale-90 z-20"
          aria-label="Close certificate viewer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Information */}
        <div className="mb-4 pr-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-6 h-6 rounded-md bg-[#fec84b] border border-zinc-900 flex items-center justify-center text-xs font-bold shadow-sm">
              📜
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
              {item.category || item.issuer || 'Official Certificate / Proof'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">
            {item.subtitle || item.period || item.date}
          </p>
        </div>

        {/* Document Display Area */}
        <div className="rounded-xl overflow-hidden border-2 border-zinc-900 bg-zinc-100 shadow-[3px_3px_0px_#111] mb-5">
          {isPdf ? (
            <div className="p-8 text-center bg-white flex flex-col items-center justify-center min-h-[320px]">
              <div className="w-16 h-16 rounded-2xl bg-red-100 border-2 border-red-500 flex items-center justify-center text-red-600 mb-4 shadow-sm">
                <FileText className="w-8 h-8" />
              </div>
              <h4 className="font-extrabold text-zinc-900 text-lg mb-1">{item.title}</h4>
              <p className="text-xs text-zinc-500 font-mono mb-5 max-w-md">
                Official verified PDF credential document issued by {item.issuer || item.subtitle || 'Organising Body'}.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-950 text-white font-mono text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-lg border border-zinc-900 hover:bg-zinc-800 shadow-[2px_2px_0px_#fec84b] transition-all hover:-translate-y-0.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Full PDF
                </a>
                <a
                  href={item.file}
                  download
                  className="inline-flex items-center gap-2 bg-white text-zinc-900 font-mono text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-lg border-2 border-zinc-900 hover:bg-zinc-50 shadow-[2px_2px_0px_#111] transition-all hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          ) : (
            <div className="relative max-h-[75vh] flex items-center justify-center bg-zinc-900/5 p-3 overflow-auto">
              <img
                src={item.file}
                alt={item.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t-2 border-dashed border-zinc-300">
          <span className="font-hand text-base text-zinc-600">
            ★ Verified Documentation &amp; Certificate
          </span>
          <div className="flex items-center gap-2">
            <a
              href={item.file}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
            >
              Open in new tab <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
