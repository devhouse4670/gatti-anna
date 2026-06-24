import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, Flame, ShieldAlert, Heart, Share2, Info, ChevronRight, Check } from 'lucide-react';
import { MenuItem } from '../types';

interface DishCardProps {
  dish: MenuItem;
  lightTheme: boolean;
  onOrderClick: (dishName: string) => void;
}

export default function DishCard({ dish, lightTheme, onOrderClick }: DishCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // Customization state
  const [spiciness, setSpiciness] = useState('Medium');
  const [extraGhee, setExtraGhee] = useState(false);
  const [withGunpowder, setWithGunpowder] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized cursor coordinate from center of card (-1 to 1)
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Map to maximum 12 degrees rotation
    const rX = -(mouseY / (height / 2)) * 10;
    const rY = (mouseX / (width / 2)) * 10;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      setShowDetails(false);
      onOrderClick(`${dish.name} (${spiciness} Spice${extraGhee ? ' + Extra Ghee' : ''})`);
    }, 1200);
  };

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative group cursor-pointer h-full"
        style={{ perspective: 1000 }}
        onClick={() => setShowDetails(true)}
        id={`dish-${dish.id}`}
      >
        <motion.div
          animate={{
            rotateX: rotateX,
            rotateY: rotateY,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 25 }}
          className={`h-full rounded-3xl overflow-hidden glass-panel flex flex-col justify-between transition-all duration-300 ${
            isHovered 
              ? 'border-brand-accent/40 shadow-[0_15px_40px_rgba(255,200,87,0.15)] bg-zinc-900/90' 
              : 'border-white/5 bg-[#121212]'
          }`}
        >
          {/* Dish Image Container */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={dish.image}
              alt={dish.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/35" />

            {/* Tags overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
              {dish.isPopular && (
                <span className="flex items-center gap-1 bg-brand-accent text-brand-bg font-mono font-bold text-[9px] uppercase px-2 py-0.5 rounded-full tracking-wider">
                  <Sparkles className="w-2.5 h-2.5" /> Best Seller
                </span>
              )}
              {dish.isSpicy && (
                <span className="flex items-center gap-1 bg-red-600 text-white font-mono font-bold text-[9px] uppercase px-2 py-0.5 rounded-full tracking-wider">
                  <Flame className="w-2.5 h-2.5" /> Spicy
                </span>
              )}
            </div>

            {/* Preparation time overlay */}
            {dish.preparationTime && (
              <span className="absolute bottom-3 right-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-md text-zinc-300 font-mono text-[10px] px-2.5 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5 text-brand-accent" /> {dish.preparationTime}
              </span>
            )}
          </div>

          {/* Dish Content */}
          <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-brand-accent transition-colors">
                  {dish.name}
                </h3>
                <span className="text-lg font-mono font-bold text-brand-accent whitespace-nowrap">
                  ₹{dish.price}
                </span>
              </div>
              <p className="text-xs text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                {dish.description}
              </p>
            </div>

            {/* Footer with dietary tags and detail link */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                {dish.isVegan && (
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-[10px] text-emerald-400 font-bold" title="Vegan">
                    V
                  </span>
                )}
                {dish.isGlutenFree && (
                  <span className="w-5 h-5 rounded-full bg-blue-950 border border-blue-500/40 flex items-center justify-center text-[10px] text-blue-400 font-bold" title="Gluten-Free">
                    GF
                  </span>
                )}
              </div>
              <span className="text-xs font-mono font-medium text-brand-accent group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                Customize <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dynamic Detailing Modal Overlay (AnimatePresence) */}
      <AnimatePresence>
        {showDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetails(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Cover Image */}
              <div className="relative h-64 sm:h-72 w-full">
                <img
                  src={dish.image}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 p-2 bg-black/60 rounded-full border border-white/10 text-white hover:text-brand-accent hover:scale-105 transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Detail Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-mono tracking-widest text-brand-accent uppercase mb-1 block">
                      {dish.category.toUpperCase()}
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-white">
                      {dish.name}
                    </h2>
                  </div>
                  <span className="text-2xl font-mono font-bold text-brand-accent">
                    ₹{dish.price}
                  </span>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {dish.description}
                </p>

                {/* Micro Details (Prep time, Calories) */}
                <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-900/60 rounded-2xl border border-white/5 mb-6 text-center">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">TIME TO PREPARE</span>
                    <span className="text-sm font-semibold text-white">{dish.preparationTime || '7 mins'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">EST. CALORIES</span>
                    <span className="text-sm font-semibold text-white">{dish.calories || 280} kcal</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">DIETARY STATS</span>
                    <span className="text-sm font-semibold text-brand-accent">
                      {dish.isVegan ? 'Pure Veg / Vegan' : 'Vegetarian'}
                    </span>
                  </div>
                </div>

                {/* Gamified Customizers */}
                <div className="space-y-4 mb-6 pt-4 border-t border-white/5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Customize your Taste Preference
                  </h4>

                  {/* Spice Level Range Slider */}
                  <div className="p-4 bg-zinc-900/40 rounded-2xl border border-white/5">
                    <label className="text-xs font-mono text-zinc-400 block mb-3">
                      Spice Level: <span className="text-brand-accent font-bold">{spiciness}</span>
                    </label>
                    <div className="flex gap-2">
                      {['Mild', 'Medium', 'Authentic Podi', 'Pune Volcano'].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setSpiciness(level)}
                          className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                            spiciness === level
                              ? 'bg-brand-accent text-brand-bg border-brand-accent font-bold shadow-[0_0_12px_rgba(255,200,87,0.3)]'
                              : 'bg-zinc-900 border-white/5 text-zinc-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Extra Toggle Switches */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setExtraGhee(!extraGhee)}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        extraGhee 
                          ? 'bg-brand-secondary/15 border-brand-secondary/40 text-white' 
                          : 'bg-zinc-900/40 border-white/5 text-zinc-400 hover:border-white/10'
                      }`}
                    >
                      <div>
                        <span className="text-sm font-semibold block">Pour Pure Cow Ghee</span>
                        <span className="text-[10px] text-zinc-500">Classic melted copper ghee (+₹30)</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${extraGhee ? 'bg-brand-secondary border-brand-secondary text-brand-bg' : 'border-zinc-700'}`}>
                        {extraGhee && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setWithGunpowder(!withGunpowder)}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        withGunpowder 
                          ? 'bg-brand-secondary/15 border-brand-secondary/40 text-white' 
                          : 'bg-zinc-900/40 border-white/5 text-zinc-400 hover:border-white/10'
                      }`}
                    >
                      <div>
                        <span className="text-sm font-semibold block">Authentic Dry Gunpowder</span>
                        <span className="text-[10px] text-zinc-500">Traditional spicy sesame podi blend</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${withGunpowder ? 'bg-brand-secondary border-brand-secondary text-brand-bg' : 'border-zinc-700'}`}>
                        {withGunpowder && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Confirm Action Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-brand-secondary to-brand-accent text-brand-bg font-bold py-4 px-6 rounded-2xl hover:scale-[1.01] transition-all duration-300 disabled:opacity-90 text-sm tracking-wider uppercase cursor-pointer"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" /> Customized & Added to Order!
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Add Customized Dish • ₹{dish.price + (extraGhee ? 30 : 0)}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
