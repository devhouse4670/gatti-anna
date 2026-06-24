import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TIMELINE_EVENTS } from '../data';
import { Calendar, Award, Compass, Heart, Users, Landmark } from 'lucide-react';

export default function TimelineSection({ lightTheme }: { lightTheme: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Icons array to pair with the years
  const stepIcons = [
    <Compass className="w-5 h-5" />, // Humble Cart
    <Landmark className="w-5 h-5" />, // Viman Nagar permanent
    <Award className="w-5 h-5" />,    // Viral Podi
    <Heart className="w-5 h-5" />      // Pune late-night sanctuary
  ];

  return (
    <div className="w-full" id="timeline-container">
      {/* Narrative Intro */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h3 className="font-serif text-3xl md:text-4xl text-white font-bold mb-4">
          The Legend of Gatti Anna
        </h3>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
          In South India, <span className="text-brand-accent font-semibold">"Gatti"</span> translates to strong, solid, or unshakeable, while <span className="text-brand-accent font-semibold">"Anna"</span> means older brother. We built our brand on this exact promise: solid hospitality, authentic recipes, and a warm, late-night haven open from <span className="text-white font-semibold">5:00 AM till 3:00 AM</span>. Here is how we brought the soul of Chennai and Bangalore highways to Pune.
        </p>
      </div>

      {/* Horizontal Steps Navigator */}
      <div className="relative max-w-4xl mx-auto px-4 mb-12">
        {/* Timeline Connecting Line */}
        <div className="absolute top-[26px] left-10 right-10 h-[2px] bg-zinc-800" />
        <div 
          className="absolute top-[26px] left-10 h-[2px] bg-brand-accent transition-all duration-500 ease-in-out"
          style={{ width: `${(activeIndex / (TIMELINE_EVENTS.length - 1)) * 88}%` }}
        />

        <div className="relative flex justify-between items-center">
          {TIMELINE_EVENTS.map((event, index) => {
            const isActive = index === activeIndex;
            const isCompleted = index < activeIndex;

            return (
              <button
                key={event.year}
                onClick={() => setActiveIndex(index)}
                className="flex flex-col items-center group focus:outline-none z-10 cursor-pointer"
              >
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 border ${
                    isActive 
                      ? 'bg-brand-accent text-brand-bg border-brand-accent scale-110 shadow-[0_0_20px_rgba(255,200,87,0.4)]' 
                      : isCompleted
                      ? 'bg-brand-secondary text-brand-bg border-brand-secondary'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {stepIcons[index]}
                </div>
                
                <span className={`mt-3 font-mono text-sm font-bold tracking-wider transition-colors duration-300 ${
                  isActive ? 'text-brand-accent' : 'text-zinc-500 group-hover:text-zinc-300'
                }`}>
                  {event.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Slide Area (AnimatePresence for smooth swap) */}
      <div className="max-w-5xl mx-auto bg-zinc-900/40 border border-white/5 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden min-h-[380px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Slide Image */}
            <div className="lg:col-span-5 h-64 sm:h-80 w-full rounded-2xl overflow-hidden relative shadow-lg">
              <img
                src={TIMELINE_EVENTS[activeIndex].image}
                alt={TIMELINE_EVENTS[activeIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/10" />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                  ESTABLISHED {TIMELINE_EVENTS[activeIndex].year}
                </span>
              </div>
            </div>

            {/* Slide Story Content */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest mb-2 block">
                OUR CHRONOLOGY
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {TIMELINE_EVENTS[activeIndex].title}
              </h4>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                {TIMELINE_EVENTS[activeIndex].description}
              </p>

              {/* Bonus details based on year */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 block">CREATIVE CORE</span>
                  <span className="text-xs font-semibold text-zinc-300">Traditional Cookery</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 block">PUNE PRESENCE</span>
                  <span className="text-xs font-semibold text-zinc-300">Viman Nagar Sanctuary</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Founder Quote */}
      <div className="max-w-3xl mx-auto mt-16 text-center border-t border-white/5 pt-12">
        <span className="font-serif italic text-lg sm:text-xl text-zinc-300 block max-w-2xl mx-auto mb-4">
          "At Gatti Anna, we do not believe that late-night food should be an afterthought of greasy leftovers. We toss every single dosa with the same pure ghee and standard of devotion at 2:00 AM as we do at sunrise."
        </span>
        <span className="font-mono text-xs text-brand-accent uppercase tracking-widest font-bold">
          — K. Venkatraman, Founder & Master Chef
        </span>
      </div>
    </div>
  );
}
