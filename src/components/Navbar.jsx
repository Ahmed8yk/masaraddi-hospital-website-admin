import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, MapPin, Activity, Clock, ShieldCheck, Stethoscope } from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';
import { HospitalLogo } from './HospitalLogo.jsx';

export const Navbar = ({ onOpenAdmin }) => {
  const { data } = useHospitalData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['home', 'services', 'doctors', 'facilities', 'gallery', 'service-area', 'faq', 'contact'];
      const scrollPos = window.scrollY + 120;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Doctors', href: '#doctors', id: 'doctors' },
    { name: 'Facilities', href: '#facilities', id: 'facilities' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Service Area', href: '#service-area', id: 'service-area' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      {/* Top Micro-Bar (visible on lg screens for clean clinical trust) */}
      <div className={`hidden lg:block transition-all duration-300 ${
        isScrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'bg-[#050A14]/90 border-b border-white/[0.06] py-1.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">Emergency Neurological Care Available</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3 h-3 text-sky-400" />
              <span>OPD: 10:00 AM – 4:00 PM &amp; 6:00 PM – 8:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-sky-400" />
              <span>Rotary Circle, Navanagar Road, Bagalkot</span>
            </span>
            <span className="text-slate-600">•</span>
            <a
              href={`tel:${data.contact.phone}`}
              className="text-sky-300 hover:text-white font-semibold transition-colors"
            >
              Direct OPD Desk: {data.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Floating / Glass Navigation */}
      <div className={`transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080E1A]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.35)] py-2.5'
          : 'bg-[#080E1A]/80 backdrop-blur-lg border-b border-white/[0.05] py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* Official Hospital Brand Logo & Verified Identity */}
            <a
              href="#home"
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="Masaraddi Neuro Care Centre Home"
            >
              <div className="relative">
                <HospitalLogo 
                  className="w-11 h-11 sm:w-12 sm:h-12 group-hover:scale-105 transition-transform duration-200 drop-shadow-[0_2px_10px_rgba(21,88,166,0.35)]" 
                  priority={true} 
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#080E1A]" title="Emergency Care Open" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold tracking-tight text-white text-base sm:text-lg font-outfit uppercase">
                    Masaraddi
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-500/20 border border-rose-400/30 text-rose-300">
                    Neuro Care
                  </span>
                </div>
                <span className="text-[11px] text-slate-300 font-medium">
                  Bagalkot &bull; Dr. Shivkumar Masaraddi
                </span>
              </div>
            </a>

            {/* Modern Center Navigation Links with Active Indicator */}
            <nav className="hidden lg:flex items-center p-1 bg-white/[0.03] rounded-full border border-white/[0.06] backdrop-blur-sm shadow-inner" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 text-xs xl:text-[13px] font-semibold rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-sky-500/20 text-sky-300 shadow-sm border border-sky-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Quick Contact Action Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href={`https://wa.me/${data.contact.whatsappNumber}?text=${encodeURIComponent(
                  data.contact.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                title="WhatsApp Hospital Desk"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${data.contact.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-sky-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                title="Call Masaraddi Neuro Care Center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hospital</span>
              </a>

              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-sky-300 hover:text-white border border-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
                  title="Open Admin Portal"
                  aria-label="Open Admin Portal"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Admin</span>
                </button>
              )}
            </div>

            {/* Mobile Actions: Call & Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${data.contact.phone}`}
                className="p-2.5 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300 hover:text-white transition-colors"
                aria-label="Call Hospital"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-slate-200 hover:text-white focus:outline-none"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-sky-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Backdrop & Slide-Down Card Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 lg:hidden mx-3 mt-2 bg-[#080E1A]/98 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-2xl shadow-black/80 max-h-[82vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <HospitalLogo className="w-8 h-8" />
                <div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">Masaraddi Neuro Care</span>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    24/7 Emergency Care
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-slate-400 hover:text-white p-1 rounded-lg bg-white/5 cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 py-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                      isActive
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Quick OPD & Mobile CTAs */}
            <div className="pt-3 border-t border-white/[0.08] space-y-2.5">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>OPD Hours</span>
                </span>
                <span className="font-bold text-sky-300">10AM–4PM &bull; 6PM–8PM</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${data.contact.phone}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-sky-900/40 active:scale-95 transition-transform"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Hospital</span>
                </a>

                <a
                  href={`https://wa.me/${data.contact.whatsappNumber}?text=${encodeURIComponent(
                    data.contact.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold text-xs active:scale-95 transition-transform"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {onOpenAdmin && (
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-white py-1 cursor-pointer font-semibold"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Hospital Staff &amp; Admin Login</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};
