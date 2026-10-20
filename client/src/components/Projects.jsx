import React, { useState } from 'react';
import ProjectModal from './ProjectModal';

export default function Projects({ projects = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['ALL', 'SYSTEMS', 'E-COMMERCE'];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter(
        (p) => p.category?.toUpperCase() === selectedCategory
      );

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto border-b border-[#e2decb]" id="projects">
      <div className="mb-8">
        <span className="font-hand text-2xl text-zinc-700 block">selected works</span>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Featured Projects &amp; Portfolio
        </h3>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <span className="text-xs font-mono font-bold text-zinc-500 uppercase mr-1">Filter:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all ${
              selectedCategory === cat
                ? 'bg-zinc-900 text-white border-zinc-900 shadow-[2px_2px_0px_#fec84b]'
                : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="relative bg-white border-2 border-zinc-900 rounded-xl p-5 shadow-[5px_5px_0px_#111] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#111] transition-all group flex flex-col justify-between"
          >
            {/* Top Tape Decor */}
            <div
              className={`tape-strip ${
                project.tapeColor === 'blue' ? 'tape-strip-blue' : ''
              } -top-3 left-1/2 -translate-x-1/2`}
            ></div>

            <div>
              {/* Image Container */}
              <div
                onClick={() => setActiveModalProject(project)}
                className="rounded-lg overflow-hidden border border-zinc-200 aspect-[16/10] mb-4 bg-zinc-100 cursor-pointer"
              >
                <img
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={project.image}
                  loading="lazy"
                />
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#fec84b] text-zinc-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-zinc-900">
                  {project.category}
                </span>
                <span className="bg-[#a6e8cf] text-zinc-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-zinc-900">
                  {project.platform}
                </span>
                <span className="text-xs font-mono text-zinc-500 ml-auto">{project.year}</span>
              </div>

              {/* Title */}
              <h4
                onClick={() => setActiveModalProject(project)}
                className="text-xl font-bold text-zinc-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
              >
                {project.title}
              </h4>

              {/* Description */}
              <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                {project.summary}
              </p>
            </div>

            {/* Bottom Meta & Action */}
            <div className="flex items-center justify-between pt-3 border-t border-dashed border-zinc-300 mt-2">
              <span className="font-script text-base text-zinc-700 font-bold">
                {project.metric}
              </span>
              <button
                onClick={() => setActiveModalProject(project)}
                className="font-mono text-xs font-bold text-blue-700 flex items-center gap-1 hover:underline cursor-pointer group-hover:translate-x-0.5 transition-transform"
              >
                CHECK THIS OUT <span>↗</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
