import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminInboxModal from './components/AdminInboxModal';

import portfolioData from '../../shared/portfolioData.json';

export default function App() {
  const data = portfolioData;
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  return (
    <div className="min-h-screen bg-notebook-paper text-zinc-900 font-sans selection:bg-yellow-200">
      {/* Navigation */}
      <Navbar
        onOpenInbox={import.meta.env.DEV ? () => setIsInboxOpen(true) : undefined}
      />

      <main>
        {/* Hero Section */}
        <Hero profile={data.profile} education={data.education} />

        {/* About & Education Section */}
        <About profile={data.profile} education={data.education} />

        {/* Experience Timeline */}
        <Experience experiences={data.experiences} />

        {/* Featured Projects / Portfolio */}
        <Projects projects={data.projects} />

        {/* Skills & Certifications */}
        <Skills skills={data.skills} certifications={data.certifications} />

        {/* Contact Postcard Form (Direct without Playground) */}
        <Contact
          profile={data.profile}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin Messages Inbox Modal */}
      {import.meta.env.DEV && (
        <AdminInboxModal
          isOpen={isInboxOpen}
          onClose={() => setIsInboxOpen(false)}
        />
      )}
    </div>
  );
}
