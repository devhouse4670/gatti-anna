import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, MapPin, Phone, Clock, CalendarRange } from 'lucide-react';

interface NavbarProps {
  lightTheme: boolean;
  setLightTheme: (val: boolean) => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ lightTheme, setLightTheme, activeSection, scrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll for transparency and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      // Background opaque toggle
      setIsScrolled(window.scrollY > 20);

      // Scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Signature Menu', id: 'menu' },
    { label: 'Our Story', id: 'about' },
    { label: 'Experience', id: 'gallery' },
    { label: 'Testimonials', id: 'reviews' },
    { label: 'Bookings', id: 'reserve' },
  ];

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-brand-secondary to-brand-accent z-[100] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-bar"
      />

      {/* Top Banner (Late night notice) */}
      <div className="bg-brand-secondary text-brand-bg text-[11px] font-mono py-1 px-4 text-center z-50 relative font-bold tracking-wider uppercase flex items-center justify-center gap-4 flex-wrap">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> Viman Nagar: Open 5:00 AM – 3:00 AM
        </span>
        <span className="hidden md:inline">•</span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" /> Pune's Ultimate Late-Night South Indian Hub
        </span>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-brand-bg/85 backdrop-blur-xl border-b border-white/5 shadow-lg' 
            : 'py-5 bg-transparent'
        }`}
        id="app-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')} 
            className="flex flex-col text-left group cursor-pointer"
            id="logo-button"
          >
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white group-hover:text-brand-accent transition-colors flex items-center gap-2">
              GATTI ANNA
              <span className="inline-block w-2 h-2 rounded-full bg-brand-accent animate-ping" />
            </span>
            <span className="text-[9px] font-mono tracking-widest text-brand-accent uppercase -mt-1 group-hover:text-white transition-colors">
              Pure South Authentic • Pune
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative py-1 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-brand-accent'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setLightTheme(!lightTheme)}
              className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-brand-accent transition-colors cursor-pointer"
              title={lightTheme ? 'Activate Night Cafe Mode' : 'Activate Day Mode'}
            >
              {lightTheme ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('reserve')}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-secondary to-brand-accent text-brand-bg font-semibold text-xs py-2.5 px-5 rounded-full hover:shadow-[0_0_20px_rgba(255,138,0,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer uppercase tracking-wider"
            >
              <CalendarRange className="w-4 h-4" /> Book Table
            </button>
          </div>

          {/* Mobile Actions and Burger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setLightTheme(!lightTheme)}
              className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-brand-accent transition-colors"
            >
              {lightTheme ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:text-brand-accent transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[88px] bg-brand-bg/95 backdrop-blur-2xl border-b border-white/10 z-40 lg:hidden py-6 px-4 shadow-2xl"
            id="mobile-drawer"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    scrollToSection(link.id);
                    setIsOpen(false);
                  }}
                  className={`py-2 text-left text-base font-semibold border-b border-white/5 ${
                    activeSection === link.id
                      ? 'text-brand-accent'
                      : 'text-zinc-300'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => {
                  scrollToSection('reserve');
                  setIsOpen(false);
                }}
                className="mt-4 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-brand-secondary to-brand-accent text-brand-bg py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-sm"
              >
                <CalendarRange className="w-4 h-4" /> Book Table Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
