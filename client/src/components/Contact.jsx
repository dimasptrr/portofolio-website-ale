import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, AlertCircle, Loader2, Phone, Mail, MapPin } from 'lucide-react';

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  // Client-side cooldown: prevent re-submit for 60 seconds after success
  const [cooldown, setCooldown] = useState(0);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (status.error) setStatus((prev) => ({ ...prev, error: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });

      // Start 60-second cooldown to prevent spam re-submission
      setCooldown(60);
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) { clearInterval(timer); return 0; }
          return prev - 1;
        });
      }, 1000);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#fec84b', '#ff708f', '#12b76a', '#3b82f6'],
        });
      } catch {
        // ignore
      }

      // Reset success banner after 6 seconds
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 6000);
    } catch (err) {
      console.error('Contact error:', err);
      setStatus({
        loading: false,
        success: false,
        error: err.message || 'Something went wrong. Please try again.',
      });
    }
  };

  const email = profile?.email || 'aliyahsalsabila31@gmail.com';
  const phone = profile?.phone || '+62 812-1692-1314';
  const whatsappUrl = profile?.whatsappUrl || 'https://wa.me/6281216921314';
  const location = profile?.location || 'Malang / Probolinggo, East Java, Indonesia';
  const availability = profile?.availability || 'Available for Opportunities';

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto" id="contact">
      <div className="relative bg-white border-2 border-zinc-900 rounded-2xl p-6 sm:p-10 shadow-[8px_8px_0px_#111]">
        {/* Tape in top center */}
        <div className="tape-strip -top-3 left-1/2 -translate-x-1/2"></div>

        {/* Postcard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b-2 border-dashed border-zinc-300 gap-4">
          <div>
            <span className="font-hand text-2xl text-zinc-700">get in touch!</span>
            <h3 className="text-3xl font-extrabold text-zinc-900">
              Let's Connect &amp; Collaborate
            </h3>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto bg-emerald-50 border border-emerald-300 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {availability}
          </div>
        </div>

        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left details column */}
          <div className="md:col-span-5 space-y-4">
            <p className="text-zinc-600 text-sm leading-relaxed">
              Interested in discussing career opportunities, corporate internships, financial administration projects, or organizational partnerships? My inbox is always open.
            </p>

            {/* Direct Email */}
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Direct Email
              </div>
              <a
                className="text-sm font-bold text-zinc-900 hover:text-blue-600 transition-colors flex items-center gap-2"
                href={`mailto:${email}`}
              >
                <Mail className="w-4 h-4 text-zinc-600" /> {email}
              </a>
            </div>

            {/* Direct WhatsApp / Phone */}
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                WhatsApp / Mobile
              </div>
              <a
                className="text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-2"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-4 h-4 text-emerald-600" /> {phone}
              </a>
            </div>

            {/* Base Station */}
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Base Location
              </div>
              <div className="text-sm font-semibold text-zinc-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" /> {location}
              </div>
            </div>

            {/* Social sticker links (NO DRIBBBLE) */}
            <div className="pt-3 flex flex-wrap items-center gap-2">
              <a
                className="bg-[#0077b5] text-white text-xs font-bold px-3 py-1.5 rounded border border-zinc-900 shadow-[1px_1px_0px_#111] hover:scale-105 transition-transform flex items-center gap-1.5"
                href="https://www.linkedin.com/in/aliyah-salsabila-putri"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                className="bg-[#25D366] text-white text-xs font-bold px-3 py-1.5 rounded border border-zinc-900 shadow-[1px_1px_0px_#111] hover:scale-105 transition-transform flex items-center gap-1.5"
                href={whatsappUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                💬 WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Right form column */}
          <form className="md:col-span-7 space-y-4" onSubmit={handleSubmit}>
            {status.success && (
              <div className="p-3 bg-emerald-50 border-2 border-emerald-500 rounded-lg flex items-center gap-2 text-emerald-900 text-xs font-bold animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Message received! Aliyah will get back to your email shortly. 🎉</span>
              </div>
            )}

            {status.error && (
              <div className="p-3 bg-red-50 border-2 border-red-500 rounded-lg flex items-center gap-2 text-red-900 text-xs font-bold animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                className="w-full rounded-lg border-2 border-zinc-300 focus:border-zinc-900 focus:ring-0 text-sm px-3.5 py-2.5 transition-colors bg-[#faf9f5]"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex Johnson"
                required
                type="text"
                maxLength={100}
                disabled={status.loading || cooldown > 0}
              />
            </div>

            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1"
                htmlFor="email"
              >
                Your Email Address
              </label>
              <input
                className="w-full rounded-lg border-2 border-zinc-300 focus:border-zinc-900 focus:ring-0 text-sm px-3.5 py-2.5 transition-colors bg-[#faf9f5]"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                required
                type="email"
                maxLength={254}
                disabled={status.loading || cooldown > 0}
              />
            </div>

            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1"
                htmlFor="message"
              >
                Message / Inquiry
              </label>
              <textarea
                className="w-full rounded-lg border-2 border-zinc-300 focus:border-zinc-900 focus:ring-0 text-sm px-3.5 py-2.5 transition-colors bg-[#faf9f5]"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share details about your internship role, project scope, or simply say hello..."
                required
                rows={4}
                maxLength={3000}
                disabled={status.loading || cooldown > 0}
              ></textarea>
            </div>

            <button
              className="w-full bg-zinc-950 text-white font-mono text-xs font-bold tracking-widest uppercase py-3.5 rounded-md hover:bg-zinc-800 sticker-shadow transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              type="submit"
              disabled={status.loading || cooldown > 0}
            >
              {status.loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  SENDING MESSAGE...
                </>
              ) : cooldown > 0 ? (
                <>⏳ PLEASE WAIT {cooldown}s...</>
              ) : (
                <>SEND MESSAGE ↗</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
