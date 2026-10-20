import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, FileSpreadsheet } from 'lucide-react';
import CertificateModal from './CertificateModal';

export default function Skills({ skills, certifications }) {
  const [selectedCert, setSelectedCert] = useState(null);

  const handlePop = (e) => {
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { x, y },
        colors: ['#fec84b', '#ff708f', '#12b76a', '#3b82f6'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }
  };

  const { hardSkills = [], tools = [], softSkills = [], languages = [] } = skills || {};
  const certs = certifications || [];

  const renderToolLogo = (name) => {
    const lower = (name || '').toLowerCase();

    // Microsoft Excel
    if (lower.includes('excel')) {
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Microsoft Excel">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#107C41" />
          <path d="M14 2v6h6" fill="#185C37" />
          <path d="M14 2l6 6h-6V2z" fill="#33C481" />
          <rect x="3" y="9" width="11" height="11" rx="2" fill="#107C41" stroke="#FFFFFF" strokeWidth="1" />
          <path d="M6 12l5 5m0-5l-5 5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    }

    // Microsoft Word
    if (lower.includes('word')) {
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Microsoft Word">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#185ABD" />
          <path d="M14 2v6h6" fill="#0E3A75" />
          <path d="M14 2l6 6h-6V2z" fill="#41A5EE" />
          <rect x="3" y="9" width="11" height="11" rx="2" fill="#185ABD" stroke="#FFFFFF" strokeWidth="1" />
          <path d="M5.5 12.5l1.2 4 1.3-3 1.3 3 1.2-4" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }

    // Google Workspace
    if (lower.includes('google')) {
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-label="Google Workspace">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
      );
    }

    // Notion
    if (lower.includes('notion')) {
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Notion">
          <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.2" />
          <path d="M7 6.5H9.5M7 17.5H9.5M14.5 6.5H17M14.5 17.5H17" stroke="#18181B" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8.2 6.5V17.5M8.2 7.2L15.8 17.5M15.8 6.5V17.5" stroke="#18181B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }

    // PrestaShop
    if (lower.includes('prestashop')) {
      return (
        <svg className="w-4 h-4 shrink-0 text-[#DF0067]" viewBox="0 0 24 24" fill="currentColor" aria-label="PrestaShop">
          <path d="M11.558 1.034C5.174 1.034 0 6.21 0 12.592c0 1.258.201 2.47.574 3.597l.002-.007a12.415 12.415 0 01.53-1.787l.011-.03c.085-.222.179-.442.277-.66l.084-.181c.08-.171.165-.34.253-.507.036-.068.07-.136.108-.203.02-.038.044-.073.064-.11.094-.166.19-.332.29-.493l.075-.114c.125-.195.256-.386.393-.573l.035-.05c.144-.193.295-.38.451-.563l.1-.118c.155-.177.315-.35.481-.517l.099-.097a10.321 10.321 0 01.546-.503c.74-2.48 3.005-4.285 5.686-4.285 1.079 0 2.152.31 3.071.873a6.017 6.017 0 012.211 2.407l.007.015.04.074v.003l.004.002a9.925 9.925 0 011.567 1.198c.04.037.081.071.12.109.002 0 .006.005.007.006l-.002-.006-.001-.004v-.003l.042-.084c.377-2.384 1.43-4.102 2.67-4.102.934 0 1.762.975 2.276 2.476l.005.016.001.002c.145.158.287.331.424.521l.007.01.021.067-.02-.078c-1.542-4.569-5.863-7.857-10.952-7.857zM9.927 5.477C7.586 5.52 5.34 7.132 4.574 9.365l-.012.034a10.14 10.14 0 011.315-.895c2.806-1.656 6.479-1.646 9.278.016-.895-1.653-2.631-2.819-4.5-3.004a5.14 5.14 0 00-.728-.039zm9.834.5a1.36 1.36 0 00-.39.067c-1.265.562-1.719 2.073-2.031 3.303l-.016.072c.365-.62.808-1.215 1.396-1.642.835-.687 2.105-.655 2.916.053.308.326.141.008.031-.22-.342-.75-1.025-1.653-1.906-1.634zM21.67 7.98zm-9.32.335l-1.07 3.27-.002.005-.006.002-4.498 1.112h-.009l4.456 1.087c.105.11.227.205.36.28h.002c.042.024.085.045.129.065l.01.005c.041.018.083.033.126.047l.021.008c.04.013.08.023.12.032l.033.008a1.677 1.677 0 00.318.033 1.546 1.546 0 001.43-.948c.08-.186.123-.39.123-.604v-.011l-.001-.012c-.001-.054-.004-.107-.01-.16l-.001-.002a1.506 1.506 0 00-.026-.153l-.001-.004a1.511 1.511 0 00-.096-.288v-.003a1.521 1.521 0 00-.348-.49v-.003zm3.148.626c.048 1.008.036 2.046-.1 3.057-.17 2.018-1.19 3.798-1.972 5.616l-.03.08-.035.086c1.51-1.522 3.17-3.04 3.969-5.082.383-.636.118-1.342-.115-1.976-.17-.877-1.069-1.278-1.717-1.781zm6.172.572l-.588 2.688a1.764 1.764 0 00-.047.2c-.002.02-.007.04-.01.06a1.76 1.76 0 00-.016.222l-.002.031h.003c0 .628.297 1.136.663 1.137a.41.41 0 00.182-.045l.027-.015a.537.537 0 00.07-.047c.013-.01.024-.022.036-.033a.752.752 0 00.137-.168l.03-.054a1.23 1.23 0 00.052-.108l.017-.04c.02-.053.038-.108.053-.166l.002-.002.001-.003.404-.451-.407-.456v.001l-.02-.063zm-4.381.856c.69 1.716.85 3.707.091 5.43-.49 1.368-1.587 2.463-1.874 3.905.73.115 1.468.176 2.21.186 2.166.029 4.332-.42 6.284-1.365-2.04-2.869-4.121-5.755-6.711-8.156zm-4.948.977a.583.583 0 110 1.166.583.583 0 010-1.166zm9.352.37c.138 0 .249.19.249.426s-.111.426-.249.426c-.137 0-.248-.19-.248-.426 0-.235.11-.426.248-.426zm-4.044.184c-.016.112-.033.209-.05.29l-.006.023c-.01.05-.022.094-.033.128-.48 1.417-1.275 2.52-2.36 3.697-.147.16-.301.32-.459.484a58.883 58.883 0 01-1.196 1.205c-.112.11-.259.261-.425.436-.103.287-.22.61-.318.95-.044-.016-.086-.031-.131-.049-2.108-.815-3.519-1.904-3.519-1.904s1.086 1.414 2.915 2.74c.177.129.351.24.522.339-.075 1.194.452 2.34 2.83 2.682a4.81 4.81 0 001.228.008l-.01-.029a.062.062 0 00-.004-.01s-.167-.133-.379-.377a3.842 3.842 0 01-.584-.897 3.382 3.382 0 01-.266-.862 3.176 3.176 0 01-.006-.972c.017-.12.04-.241.072-.366.093-.374.255-.772.507-1.192l.002-.003.241-.404c1.103-1.86 1.797-3.275 1.506-5.441a8.943 8.943 0 00-.078-.476zm4.668.576zm.013.203l.003.036v.01c0 .013-.003.025-.003.038 0-.014.003-.028.003-.043 0-.014-.002-.026-.003-.04zm-.012.275v.001l-.002.01-.002.014.004-.025zm1.353 5.928c-2.553 1.138-5.44 1.44-8.192 1.007-.14 1.108.384 2.218 1.214 2.93l.012.01c2.703-.433 4.975-2.168 6.966-3.946z"/>
        </svg>
      );
    }

    // XAMPP
    if (lower.includes('xampp')) {
      return (
        <svg className="w-4 h-4 shrink-0 text-[#FB7A24]" viewBox="0 0 24 24" fill="currentColor" aria-label="XAMPP">
          <path d="M16.792 11.923c.113.043.226.079.334.128.45.203.715.553.748 1.044.041.634.044 1.271.002 1.905-.049.732-.725 1.292-1.483 1.271-.735-.021-1.369-.62-1.397-1.341-.017-.441-.003-.884-.006-1.326-.001-.239-.003-.242-.245-.243-1.363-.001-2.726.008-4.089-.003-.888-.007-1.421.482-1.471 1.46-.019.38-.1.727-.357 1.018-.397.451-.898.601-1.472.466-.554-.131-.867-.522-1.035-1.048-.117-.367-.056-.737.012-1.094.341-1.797 1.366-3.006 3.125-3.555.357-.112.731-.166 1.105-.166.94.001 1.881.001 2.821-.001.128 0 .257-.012.385-.021.702-.051 1.166-.511 1.22-1.352.004-.064 0-.129.001-.193.011-.788.605-1.396 1.393-1.425.787-.029 1.438.527 1.493 1.318.076 1.083-.265 2.046-.913 2.907-.078.106-.162.171-.189.278zM8.249 10.436c-.258-.008-.571.018-.882-.035-.536-.09-.876-.39-1.02-.916-.157-.573-.097-1.097.351-1.525.456-.434.996-.56 1.587-.315.52.216.859.731.89 1.293.025.467.003.913.007 1.357.001.116-.043.167-.161.165-.18-.001-.419.001-.712.001zM21.682 0H2.318C1.102 0 .116.986.116 2.202v19.317c0 1.37 1.111 2.481 2.481 2.481h18.807c1.37 0 2.481-1.111 2.481-2.481V2.202C23.884.986 22.898 0 21.682 0zm-1.557 12.473c.519.804.733 1.69.677 2.657-.108 1.886-1.413 3.474-3.25 3.916-2.585.623-4.566-.923-5.233-2.794-.109-.304-.16-.622-.224-.985-.068.414-.115.789-.264 1.134-.697 1.617-1.884 2.603-3.665 2.799-2.104.232-4.048-1.067-4.632-3.084-.25-.863-.175-1.747-.068-2.625.08-.653.321-1.268.632-1.848.057-.106.057-.184-.01-.285-.561-.845-.779-1.777-.7-2.784-.08-1.439.05-1.954.295-2.436.715-1.412 2.285-2.611 4.388-2.412 1.849.175 3.562 1.77 3.83 3.564.013.09.039.178.068.311.044-.241.076-.439.118-.636.344-1.63 1.94-3.335 4.201-3.357 2.292-.021 3.99 1.776 4.31 3.446.17.888.089 1.776-.103 2.663-.112.517-.31 1.008-.524 1.492-.128.289-.119.389-.037.517z"/>
        </svg>
      );
    }

    return <span>⚡</span>;
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto border-b border-[#e2decb]" id="skills">
      <div className="text-center mb-12">
        <span className="font-hand text-3xl text-zinc-800 -rotate-2 inline-block">
          competencies &amp; credentials
        </span>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Skills &amp; Certifications
        </h3>
        <p className="font-hand text-xl text-zinc-600 mt-1">
          Technical proficiencies, office tools, and verified credentials.
        </p>
      </div>

      {/* Grid: Hard Skills & Tools vs Soft Skills & Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Left Card: Hard Skills & Software Tools */}
        <div className="relative bg-white/90 border-2 border-zinc-900 rounded-2xl p-6 sm:p-8 shadow-[5px_5px_0px_#111]">
          <div className="tape-strip -top-3 left-10 -rotate-6"></div>
          
          <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-dashed border-zinc-300">
            <span className="text-2xl">📊</span>
            <div>
              <h4 className="font-bold text-lg text-zinc-900">Hard Skills &amp; Administration</h4>
              <p className="text-xs text-zinc-500 font-mono">Finance, Budgeting &amp; Archival Workflows</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 mb-6">
            {hardSkills.map((skill, idx) => (
              <button
                key={idx}
                onClick={handlePop}
                className="wavy-badge bg-[#fec84b] hover:bg-[#fed976] text-zinc-900 font-bold text-xs sm:text-sm px-4 py-2 shadow-[2px_2px_0px_#111] transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-left"
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Software Tools */}
          <div className="pt-3 border-t border-zinc-200">
            <h5 className="text-xs font-mono font-bold uppercase text-zinc-400 mb-3 tracking-wider flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              Software &amp; Digital Tools:
            </h5>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, idx) => (
                <span
                  key={idx}
                  onClick={handlePop}
                  className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-800 text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-[1px_1px_0px_#111] transition-all cursor-pointer hover:scale-105"
                >
                  {renderToolLogo(tool)}
                  <span>{tool}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Soft Skills & Languages */}
        <div className="relative bg-white/90 border-2 border-zinc-900 rounded-2xl p-6 sm:p-8 shadow-[5px_5px_0px_#111]">
          <div className="tape-strip tape-strip-blue -top-3 right-10 rotate-6"></div>

          <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-dashed border-zinc-300">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-bold text-lg text-zinc-900">Soft Skills &amp; Leadership</h4>
              <p className="text-xs text-zinc-500 font-mono">Coordination, Teamwork &amp; Languages</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 mb-6">
            {softSkills.map((skill, idx) => (
              <button
                key={idx}
                onClick={handlePop}
                className="wavy-badge bg-[#a6e8cf] hover:bg-[#bbf0dc] text-zinc-900 font-bold text-xs sm:text-sm px-4 py-2 shadow-[2px_2px_0px_#111] transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-left"
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Languages */}
          <div className="pt-3 border-t border-zinc-200">
            <h5 className="text-xs font-mono font-bold uppercase text-zinc-400 mb-3 tracking-wider flex items-center gap-1.5">
              🌐 Language Proficiency:
            </h5>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((language) => (
                <div key={language.name} className="bg-[#eff6ff] border border-zinc-800 p-2.5 rounded-lg shadow-sm">
                  <div className="font-bold text-xs text-zinc-900">{language.name}</div>
                  <div className="text-[11px] text-zinc-600 font-mono">{language.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Cards */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-600" />
            <h4 className="text-2xl font-extrabold text-zinc-900">Professional Certifications</h4>
          </div>
          <span className="font-hand text-lg text-zinc-600">{certs.length} Verified Credentials</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certs.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="bg-white border-2 border-zinc-900 rounded-xl p-5 shadow-[4px_4px_0px_#111] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111] transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <span
                  className="inline-block text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border border-zinc-800 mb-2"
                  style={{ backgroundColor: cert.badgeBg }}
                >
                  {cert.category}
                </span>
                <h5 className="font-bold text-sm text-zinc-900 leading-snug mb-2 group-hover:text-blue-700 transition-colors">
                  {cert.title}
                </h5>
              </div>

              <div>
                <div className="pt-3 border-t border-dashed border-zinc-200 mt-2 flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-700">{cert.issuer}</span>
                  <span className="font-mono text-zinc-500 text-[11px]">{cert.date}</span>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono font-bold text-blue-700">
                  <span>📜 View Credential</span>
                  <span>↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
