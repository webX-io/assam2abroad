/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: (type?: any) => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'German Classes', href: '#classes' },
    { name: 'Ausbildung', href: '#ausbildung' },
    { name: 'Bachelor’s', href: '#bachelors' },
    { name: 'Master’s', href: '#masters' },
    { name: 'Opportunity Card', href: '#opportunity-card' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <>
      {/* Top utility notification bar */}
      <div className="bg-sleek-navy-dark text-slate-300 py-1.5 px-4 text-xs font-sans border-b border-white/5 z-40 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Admissions Open for 2026 Batch</span>
            </span>
            <span className="hidden md:inline text-white/10">|</span>
            <span className="hidden md:inline">German Classes A1-B2 & Consulting</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+919362603585" className="hover:text-sleek-yellow transition flex items-center space-x-1">
              <Phone className="w-3.5 h-3.5 text-sleek-yellow" />
              <span>+91 9362603585</span>
            </a>
            <span className="text-white/10">|</span>
            <span className="flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-sleek-red" />
              <span className="text-slate-300">Guwahati ⇄ Germany</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-sleek-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
            : 'bg-sleek-navy border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-3 group">
              <div className="bg-white p-1 rounded shadow-md group-hover:scale-105 transition-transform">
                <div className="w-8 h-5 flex flex-col">
                  <div className="h-1/3 bg-black"></div>
                  <div className="h-1/3 bg-sleek-red"></div>
                  <div className="h-1/3 bg-sleek-yellow"></div>
                </div>
              </div>
              <div>
                <span className="font-display text-xl font-extrabold tracking-tight text-white block">
                  Assam<span className="text-sleek-yellow">2</span>Abroad
                </span>
                <span className="text-[9px] text-slate-300 tracking-widest uppercase block font-semibold -mt-1">
                  Dream | Learn | Succeed
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-2 rounded-lg text-[13px] font-semibold text-slate-200 hover:text-sleek-yellow hover:bg-white/5 transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Enquire CTA Desktop */}
            <div className="hidden lg:block">
              <button
                onClick={() => onOpenEnquiry('General Enquiry')}
                className="bg-sleek-red hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-red-600/20 active:scale-[0.98]"
              >
                Enquire Now
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-sleek-navy/98 backdrop-blur-lg border-b border-white/10 py-4 px-6 shadow-xl animate-fade-in z-50">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-sleek-yellow hover:bg-white/5 transition"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenEnquiry('General Enquiry');
                  }}
                  className="w-full bg-sleek-red hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs tracking-wider uppercase transition text-center"
                >
                  Enquire Now
                </button>
                <div className="flex justify-between items-center px-4 text-xs text-slate-300">
                  <span>Admissions Support:</span>
                  <a href="tel:+919362603585" className="text-sleek-yellow font-bold hover:underline">
                    +91 9362603585
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
