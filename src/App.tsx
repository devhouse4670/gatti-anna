import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Coffee, Flame, Clock, Navigation, Phone, Heart, 
  ChevronLeft, ChevronRight, Star, Send, Instagram, Share2, 
  MapPin, Calendar, HeartHandshake, Check, ShieldCheck, FlameKindling
} from 'lucide-react';

// Data & Types
import { MENU_ITEMS, REVIEWS, GALLERY_ITEMS } from './data';
import { MenuItem, GalleryItem } from './types';

// Components
import Navbar from './components/Navbar';
import InteractiveSteamCanvas from './components/InteractiveSteamCanvas';
import AudioPlayer from './components/AudioPlayer';
import DishCard from './components/DishCard';
import TimelineSection from './components/TimelineSection';
import ReservationForm from './components/ReservationForm';
import LocationSection from './components/LocationSection';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [lightTheme, setLightTheme] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dosas' | 'coffees' | 'idli-vada' | 'specials'>('all');
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'interior' | 'outdoor' | 'culinary' | 'nightlife'>('all');
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Social proof simulations
  const [dinersCount, setDinersCount] = useState(24);
  const [dispatchedCount, setDispatchedCount] = useState(148);

  // Newsletter signup state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // References for scroll monitoring
  const sectionsRef = {
    home: useRef<HTMLElement>(null),
    menu: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    gallery: useRef<HTMLElement>(null),
    reviews: useRef<HTMLElement>(null),
    reserve: useRef<HTMLElement>(null),
  };

  // Intro loader simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Simulating live late-night orders & active tables counter
  useEffect(() => {
    const interval = setInterval(() => {
      setDinersCount((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return next > 35 ? 30 : next < 15 ? 18 : next;
      });
      setDispatchedCount((prev) => prev + (Math.random() > 0.4 ? 1 : 0));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Track global cursor for Framer-like follow glow
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Intersection Observer to update active navigation tab based on scroll position
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // trigger when section occupies central screen area
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    Object.values(sectionsRef).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionsRef).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [isLoading]);

  // Handle smooth scroll navigation anchors
  const scrollToSection = (id: string) => {
    const targetRef = sectionsRef[id as keyof typeof sectionsRef];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const handleDishOrderClick = (dishName: string) => {
    setToastMessage(`Added 1x ${dishName} to your live cart projection!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 3000);
  };

  // Filter lists
  const filteredMenuItems = selectedCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === selectedCategory || item.category === 'specials');

  const filteredGalleryItems = galleryFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === galleryFilter);

  // Review Slider Control
  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };
  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
        lightTheme ? 'light-theme bg-[#F9F6F0]' : 'bg-[#0D0D0D]'
      } font-sans selection:bg-brand-secondary selection:text-brand-bg`}
      id="app-root-container"
    >
      {/* 1. ANIMATED INTRO LOADING SPLASH */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#0D0D0D] z-[999] flex flex-col items-center justify-center text-center p-4"
            id="loading-splash-screen"
          >
            <div className="relative mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="w-24 h-24 rounded-full border-2 border-dashed border-brand-accent flex items-center justify-center"
              >
                <Coffee className="w-8 h-8 text-brand-accent" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-16 h-16 rounded-full bg-brand-accent/10 animate-ping absolute" />
              </div>
            </div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-serif font-bold text-white tracking-widest"
            >
              GATTI ANNA
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.8 }}
              transition={{ delay: 0.4 }}
              className="text-xs font-mono text-brand-accent uppercase tracking-[0.3em] mt-2"
            >
              Slow Drip Filter • Crispy Ghee Crepes
            </motion.p>
            
            <div className="w-48 h-[1px] bg-white/10 mt-6 relative overflow-hidden rounded-full">
              <motion.div 
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="absolute top-0 bottom-0 w-1/2 bg-brand-accent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. PERSISTENT GLASS NAV & TRACKERS */}
      <Navbar 
        lightTheme={lightTheme} 
        setLightTheme={setLightTheme} 
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* Interactive Sound Synth widget */}
      <AudioPlayer lightTheme={lightTheme} />

      {/* Reactive Mouse-Follow Spotlight Aura */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-20 hidden md:block"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 200, 87, 0.12), transparent 85%)`
        }}
      />

      {/* MAIN CONTENT CONTAINERS */}
      <main className="relative z-10">

        {/* SECTION 1: HERO CONTAINER */}
        <section 
          id="home" 
          ref={sectionsRef.home}
          className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-24 sm:py-32"
        >
          {/* Parallax Background Cover featuring generated image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/src/assets/images/gatti_anna_hero_dosa_1782301598217.jpg"
              alt="Crispy golden dosa"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-25 filter brightness-[0.3] scale-105"
            />
            {/* Dark radial glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/60 via-[#0D0D0D] to-[#0D0D0D]" />
          </div>

          {/* Interactive particles overlays */}
          <InteractiveSteamCanvas />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
            
            {/* Social Trust Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-brand-accent/15 border border-brand-accent/30 text-brand-accent px-4 py-1.5 rounded-full mb-6 font-mono text-xs font-bold uppercase tracking-wider"
            >
              <Flame className="w-3.5 h-3.5 animate-bounce" /> Voted Best South Indian late-night in Pune
            </motion.div>

            {/* Giant Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-white leading-[1.1] tracking-tight max-w-5xl mx-auto"
            >
              Authentic South Indian <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary">
                Dining in Pune
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-xl text-zinc-300 max-w-3xl mx-auto mt-6 leading-relaxed"
            >
              Open till <span className="text-brand-accent font-bold">3:00 AM</span> • Viman Nagar • Crisp Ghee Dosas • Slow Dripped Chicory Coffee • Wholesome Midnight Feasts
            </motion.p>

            {/* Action buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => scrollToSection('reserve')}
                className="w-full sm:w-auto bg-gradient-to-r from-brand-secondary to-brand-accent text-brand-bg font-bold text-sm uppercase px-8 py-4 rounded-full shadow-[0_0_20px_rgba(255,200,87,0.3)] hover:shadow-[0_0_35px_rgba(255,200,87,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer tracking-wider"
              >
                Reserve a Table
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="w-full sm:w-auto bg-zinc-900 border border-white/10 hover:border-white/20 text-white hover:text-brand-accent font-bold text-sm uppercase px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer tracking-wider"
              >
                View Our Menu
              </button>
            </motion.div>

            {/* Simulated Live Analytics Social Proof */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 1 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl mx-auto pt-8 border-t border-white/5 text-center font-mono"
            >
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-brand-accent block">{dinersCount}</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Active Tables Dining</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-white block">{dispatchedCount}</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Dosas Dispatched Tonight</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-2xl sm:text-3xl font-bold text-brand-secondary block">4.8★</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">1,720+ Google Reviews</span>
              </div>
            </motion.div>

          </div>

          {/* Bottom curve divider */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none z-10" />
        </section>


        {/* SECTION 2: SIGNATURE MENU CONTAINER */}
        <section 
          id="menu" 
          ref={sectionsRef.menu}
          className="py-24 sm:py-32 relative bg-[#0D0D0D]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Title */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-[0.2em] block mb-2">
                FROM THE COPPER GRIDDLES
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-white">
                Our Signature Dishes
              </h2>
              <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
                Experience South Indian comfort cooking refined for modern diners. Each recipe honors our classic Chennai and Bangalore heritage, tossed liberally with pure cow ghee and custom spices.
              </p>
            </div>

            {/* Menu Category Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {[
                { label: 'View All', id: 'all' },
                { label: 'Ghee Dosas', id: 'dosas' },
                { label: 'Traditional Coffee', id: 'coffees' },
                { label: 'Idli & Vada', id: 'idli-vada' },
                { label: 'Midnight Specials', id: 'specials' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-5 py-2.5 text-xs font-bold tracking-wider uppercase rounded-full transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-brand-accent text-brand-bg shadow-[0_4px_15px_rgba(255,200,87,0.35)]'
                      : 'bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Dishes Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredMenuItems.map((dish) => (
                  <motion.div
                    key={dish.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DishCard 
                      dish={dish} 
                      lightTheme={lightTheme} 
                      onOrderClick={handleDishOrderClick}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Menu Notice */}
            <div className="mt-12 p-6 bg-zinc-950 border border-white/5 rounded-3xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono">
                  <Clock className="w-4 h-4 text-brand-accent" /> Late Night Surcharges? NEVER.
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  We maintain identical menu prices from 5:00 AM breakfast opening through our 3:00 AM midnight closing. Fresh food is a continuous basic right.
                </p>
              </div>
              <button
                onClick={() => scrollToSection('reserve')}
                className="bg-brand-accent text-brand-bg font-bold text-[10px] uppercase tracking-widest px-5 py-3 rounded-xl hover:scale-105 transition-all whitespace-nowrap cursor-pointer"
              >
                Reserve Seat To Dine
              </button>
            </div>

          </div>
        </section>


        {/* SECTION 3: OUR STORY & TIMELINE CONTAINER */}
        <section 
          id="about" 
          ref={sectionsRef.about}
          className="py-24 sm:py-32 relative bg-[#121212]"
        >
          {/* Subtle decoration */}
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-secondary/5 rounded-full filter blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TimelineSection lightTheme={lightTheme} />
          </div>
        </section>


        {/* SECTION 4: PARALLAX GALLERY EXPERIENCE */}
        <section 
          id="gallery" 
          ref={sectionsRef.gallery}
          className="py-24 sm:py-32 relative bg-[#0D0D0D]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Gallery Intro */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-[0.2em] block mb-2">
                CULTURE & AMBIANCE
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-white">
                The Restaurant Experience
              </h2>
              <p className="text-sm text-zinc-400 mt-4">
                Step inside our vibrant wood-textured interiors and cool night seating layouts. Enjoy a visual preview of what makes dining at Viman Nagar past midnight an unmissable ritual.
              </p>
            </div>

            {/* Gallery Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {[
                { label: 'All Experiences', id: 'all' },
                { label: 'Rustic Interior', id: 'interior' },
                { label: 'Outdoor Vibe', id: 'outdoor' },
                { label: 'Culinary Craft', id: 'culinary' },
                { label: 'Lively Nightlife', id: 'nightlife' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setGalleryFilter(f.id as any)}
                  className={`px-4 py-2 text-[11px] font-bold tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                    galleryFilter === f.id
                      ? 'bg-zinc-100 text-black font-extrabold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredGalleryItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="relative group h-72 rounded-3xl overflow-hidden border border-white/5 cursor-pointer"
                  >
                    <img 
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Glassmorphic text cover (reveals on hover) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 transition-all duration-300">
                      <span className="text-[9px] font-mono font-bold text-brand-accent uppercase tracking-widest mb-1.5 block">
                        {item.category.toUpperCase()}
                      </span>
                      <h4 className="text-xl font-serif font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>
        </section>


        {/* SECTION 5: CUSTOMER REVIEWS CAROUSEL */}
        <section 
          id="reviews" 
          ref={sectionsRef.reviews}
          className="py-24 sm:py-32 relative bg-[#121212]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Reviews Title */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-[0.2em] block mb-2">
                VERIFIED GOOGLE TESTIMONIALS
              </span>
              <h2 className="text-4xl font-serif font-black text-white">
                What Pune Foodies Say
              </h2>
            </div>

            {/* Slider Showcase */}
            <div className="max-w-4xl mx-auto relative px-12">
              <div className="bg-[#181818] border border-white/5 rounded-3xl p-8 sm:p-12 text-left relative overflow-hidden shadow-xl">
                
                {/* Decorative Giant Quote */}
                <div className="absolute -top-6 -right-6 text-9xl font-serif text-brand-accent/5 pointer-events-none">
                  “
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReviewIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Star ratings */}
                    <div className="flex gap-1 text-brand-accent mb-6">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-5 h-5 fill-brand-accent stroke-none" />
                      ))}
                      <span className="ml-2 font-mono text-xs text-zinc-400 bg-white/5 px-2 py-0.5 rounded-md">
                        {REVIEWS[activeReviewIndex].source} Verified
                      </span>
                    </div>

                    {/* Review text */}
                    <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-sans font-light italic mb-8">
                      "{REVIEWS[activeReviewIndex].text}"
                    </p>

                    {/* Author profile */}
                    <div className="flex items-center gap-4">
                      <img
                        src={REVIEWS[activeReviewIndex].avatar}
                        alt={REVIEWS[activeReviewIndex].author}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {REVIEWS[activeReviewIndex].author}
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-500">
                          Pune Resident • Reviewed {REVIEWS[activeReviewIndex].date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Arrows */}
              <button
                onClick={prevReview}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900 text-white hover:text-brand-accent border border-white/5 cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900 text-white hover:text-brand-accent border border-white/5 cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Zomato & Google Overall stats */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-center font-mono text-zinc-500 text-xs">
              <div>
                <strong className="text-white text-base block">4.8 / 5.0★</strong> Google Diner Rating
              </div>
              <div className="hidden sm:block text-zinc-800">|</div>
              <div>
                <strong className="text-white text-base block">4.6 / 5.0★</strong> Zomato Delivery Rating
              </div>
              <div className="hidden sm:block text-zinc-800">|</div>
              <div>
                <strong className="text-white text-base block">98.4%</strong> Positive Social Media Sentiment
              </div>
            </div>

          </div>
        </section>


        {/* SECTION 6: RESERVATION BOOKINGS PANEL */}
        <section 
          id="reserve" 
          ref={sectionsRef.reserve}
          className="py-24 sm:py-32 relative bg-[#0D0D0D] border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ReservationForm lightTheme={lightTheme} />
          </div>
        </section>


        {/* SECTION 7: INTERACTIVE MAP & CONTACT */}
        <section className="py-24 sm:py-32 relative bg-[#121212] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LocationSection lightTheme={lightTheme} />
          </div>
        </section>

      </main>

      {/* 3. MODERN INSTAGRAM BENTO HIGHLIGHT */}
      <section className="py-16 bg-[#0D0D0D] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest block mb-2">
            JOIN US ON INSTAGRAM
          </span>
          <h4 className="font-serif text-2xl font-bold text-white mb-8">
            #GattiAnnaPune • Late-Night Moments
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400', tag: '#VimanNagar' },
              { img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400', tag: '#MidnightDosa' },
              { img: '/src/assets/images/gatti_anna_filter_coffee_1782301612069.jpg', tag: '#BrassFilterCoffee' },
              { img: '/src/assets/images/gatti_anna_hero_dosa_1782301598217.jpg', tag: '#PodiGheeIdli' }
            ].map((post, idx) => (
              <div key={idx} className="relative group rounded-2xl overflow-hidden h-48 cursor-pointer">
                <img 
                  src={post.img} 
                  alt="Insta post" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <Instagram className="w-6 h-6 text-brand-accent mb-2" />
                  <span className="font-mono text-xs text-white font-bold">{post.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PREMIUM COMPREHENSIVE FOOTER */}
      <footer className="bg-[#080808] border-t border-white/10 text-zinc-500 text-xs py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          
          {/* Diner summary */}
          <div className="space-y-4">
            <h5 className="font-serif text-xl font-bold text-white tracking-tight">
              GATTI ANNA
            </h5>
            <p className="text-zinc-400 leading-relaxed">
              Serving uncompromised, piping hot South Indian comfort food in Viman Nagar from sunrise breakfast till late-night cravings. Open 21 hours every day.
            </p>
            <div className="flex gap-3 text-zinc-400">
              <a href="#" className="hover:text-brand-accent"><Instagram className="w-4 h-4" /></a>
              <span className="text-zinc-800">•</span>
              <a href="#" className="hover:text-brand-accent"><Share2 className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h6 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h6>
            <ul className="space-y-2.5 text-zinc-400">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-brand-accent cursor-pointer">Back to Top</button></li>
              <li><button onClick={() => scrollToSection('menu')} className="hover:text-brand-accent cursor-pointer">Signature Menu</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-brand-accent cursor-pointer">History & Roots</button></li>
              <li><button onClick={() => scrollToSection('reserve')} className="hover:text-brand-accent cursor-pointer">Table Reservations</button></li>
            </ul>
          </div>

          {/* Late night times */}
          <div className="space-y-4">
            <h6 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Service Schedules
            </h6>
            <ul className="space-y-2 text-zinc-400 font-mono">
              <li>🌅 Breakfast: 5:00 AM – 11:30 AM</li>
              <li>☀️ Lunch & Snacks: 11:30 AM – 8:30 PM</li>
              <li>🌙 Midnight Diner: 8:30 PM – 3:00 AM</li>
              <li className="text-brand-accent">💡 Last Order accepted: 2:45 AM</li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="space-y-4">
            <h6 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Midnight Club Newsletter
            </h6>
            <p className="text-zinc-400 leading-relaxed">
              Get secret discounts, festive platter announcements, and free filter coffee vouchers.
            </p>
            {newsletterSubscribed ? (
              <p className="text-brand-accent font-bold font-mono text-[11px] uppercase flex items-center gap-1.5 py-1">
                <Check className="w-4 h-4 stroke-[3]" /> You are in the club! Check mail.
              </p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-zinc-900 border border-white/5 rounded-lg px-3 py-2 text-white text-xs w-full focus:border-brand-accent focus:outline-none placeholder:text-zinc-600"
                />
                <button
                  type="submit"
                  className="bg-brand-accent text-brand-bg px-3 rounded-lg font-bold flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Brand Copyright and Guidelines */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-[10px] font-mono uppercase tracking-wider">
          <span>© {new Date().getFullYear()} Gatti Anna Diner Pune. All Rights Reserved.</span>
          <span className="flex items-center gap-1.5 text-zinc-500">
            <ShieldCheck className="w-4.5 h-4.5 text-brand-accent" /> Designed with UI/UX Pro Max Framework
          </span>
        </div>
      </footer>

      {/* 5. STICKY QUICK-RESERVE CTA BAR */}
      <AnimatePresence>
        {activeSection !== 'reserve' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
          >
            {/* Quick booking icon badge */}
            <button
              onClick={() => scrollToSection('reserve')}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-secondary to-brand-accent text-brand-bg font-extrabold text-[10px] uppercase tracking-widest px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(255,138,0,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 stroke-[2.5]" /> Book table
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. FLOATING WHATSAPP HOTLINE CHAT BUTTON */}
      <a
        href="https://wa.me/919730311868?text=Hello%20Gatti%20Anna!%20I%20would%20like%20to%20inquire%20about%20ordering%20hot%20dosas%20or%20booking%20seats."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
        title="Chat on WhatsApp"
        id="whatsapp-floating-button"
      >
        {/* Simple crisp custom SVG for WhatsApp logo or custom design */}
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12.012 2C6.485 2 2 6.487 2 12.012c0 1.767.46 3.427 1.262 4.895l-1.341 4.903 5.022-1.317c1.42.776 3.033 1.214 4.749 1.214 5.527 0 10.013-4.487 10.013-10.012C22.025 6.487 17.539 2 12.012 2zm6.208 14.184c-.255.72-1.5 1.4-2.062 1.48-.52.073-1.2.14-3.48-.8-2.92-1.205-4.81-4.187-4.96-4.38-.15-.194-1.21-1.605-1.21-3.064 0-1.46.76-2.174 1.03-2.464.27-.29.58-.363.78-.363.2 0 .4 0 .57.01.18.01.42-.07.66.5.26.63.88 2.152.95 2.292.07.14.12.31.02.5-.09.19-.2.31-.38.52-.18.21-.39.46-.55.62-.18.18-.37.38-.16.73.21.35.93 1.536 2 2.484 1.38 1.226 2.54 1.613 2.9 1.76.36.15.57.12.79-.13.22-.25.93-1.08 1.18-1.45.25-.37.5-.31.84-.18.34.13 2.17 1.024 2.54 1.21.37.18.61.27.7.42.09.15.09.87-.16 1.59z"/>
        </svg>
      </a>

      {/* 7. FLOATING ACTION TOAST NOTIFICATIONS */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-brand-bg border border-brand-accent/40 text-brand-accent font-mono text-xs font-bold py-3.5 px-6 rounded-2xl shadow-2xl flex items-center gap-2 max-w-sm"
          >
            <Sparkles className="w-4 h-4 text-brand-accent animate-spin" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
