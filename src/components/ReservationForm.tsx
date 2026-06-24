import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Phone, User, Clock, Check, Trash2, Sparkles, MessageSquare } from 'lucide-react';
import { Reservation } from '../types';

export default function ReservationForm({ lightTheme }: { lightTheme: boolean }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newlyCreated, setNewlyCreated] = useState<Reservation | null>(null);

  // Load existing reservations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gatti_anna_reservations');
    if (saved) {
      try {
        setReservations(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing reservations', e);
      }
    }
  }, []);

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date || !time) return;

    setIsSubmitting(true);

    // Simulate 1.5 seconds delay of premium database lookup & table assignment
    setTimeout(() => {
      const randomTable = Math.floor(Math.random() * 18) + 1;
      const newBooking: Reservation = {
        id: 'res-' + Math.random().toString(36).substr(2, 9),
        name,
        phone,
        guests,
        date,
        time,
        notes,
        status: 'confirmed',
        tableNumber: randomTable,
        createdAt: new Date().toLocaleDateString()
      };

      const updated = [newBooking, ...reservations];
      setReservations(updated);
      localStorage.setItem('gatti_anna_reservations', JSON.stringify(updated));
      
      setNewlyCreated(newBooking);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset fields
      setName('');
      setPhone('');
      setGuests(2);
      setDate('');
      setTime('');
      setNotes('');
    }, 1200);
  };

  const handleCancelReservation = (id: string) => {
    const filtered = reservations.filter(res => res.id !== id);
    setReservations(filtered);
    localStorage.setItem('gatti_anna_reservations', JSON.stringify(filtered));
    if (newlyCreated?.id === id) {
      setNewlyCreated(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="bookings-form-wrapper">
      
      {/* Reservation Form (7 Columns) */}
      <div className="lg:col-span-7 bg-zinc-900/50 border border-white/5 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl glass-panel relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="mb-8">
          <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest block mb-2">
            SECURE YOUR TABLE
          </span>
          <h3 className="font-serif text-3xl font-extrabold text-white">
            Late-Night Table Reservation
          </h3>
          <p className="text-xs text-zinc-400 mt-2">
            No reservation fee • Instant premium table layout assignment • Open till 3:00 AM
          </p>
        </div>

        <form onSubmit={handleCreateReservation} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 block uppercase">Your Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-950/80 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent focus:outline-none transition-all placeholder:text-zinc-600 font-sans"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 block uppercase">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit Mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-950/80 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent focus:outline-none transition-all placeholder:text-zinc-600 font-mono"
                />
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Guests Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 block uppercase">Guests</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-950/80 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num} className="bg-zinc-950">
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Input */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 block uppercase">Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-950/80 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent focus:outline-none transition-all font-sans cursor-pointer"
                />
              </div>
            </div>

            {/* Time Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 block uppercase">Time Slot</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <select
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-950/80 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent focus:outline-none transition-all appearance-none cursor-pointer font-sans"
                >
                  <option value="" disabled className="text-zinc-600">Select Time</option>
                  <optgroup label="Breakfast (5 AM - 11 AM)" className="bg-zinc-950 text-brand-accent">
                    <option value="05:00 AM">05:00 AM (Sunrise Opening)</option>
                    <option value="06:30 AM">06:30 AM</option>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                  </optgroup>
                  <optgroup label="Lunch & Evening" className="bg-zinc-950 text-white">
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:30 PM">01:30 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                  </optgroup>
                  <optgroup label="Late Night Cravings (9 PM - 3 AM)" className="bg-zinc-950 text-brand-secondary">
                    <option value="09:30 PM">09:30 PM</option>
                    <option value="11:00 PM">11:00 PM</option>
                    <option value="12:30 AM">12:30 AM</option>
                    <option value="01:30 AM">01:30 AM</option>
                    <option value="02:30 AM">02:30 AM (Last seating)</option>
                  </optgroup>
                </select>
              </div>
            </div>

          </div>

          {/* Cooking Notes */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 block uppercase">Special Requests / Seating Preferences</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
              <textarea
                rows={2}
                placeholder="e.g. Birthday celebration, prefer outdoor garden seating, make dosa extra podi-spicy!"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-zinc-950/80 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent focus:outline-none transition-all placeholder:text-zinc-600 font-sans"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-brand-secondary to-brand-accent text-brand-bg font-bold py-4 px-6 rounded-xl hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(255,138,0,0.3)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer uppercase text-xs tracking-wider"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-brand-bg border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-brand-bg" /> Confirm Table Reservation
              </>
            )}
          </button>
        </form>

        {/* Custom Toast Confirmation */}
        <AnimatePresence>
          {showSuccess && newlyCreated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-xl flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-emerald-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm text-white">Table Confirmed Successfully!</h4>
                <p className="text-xs mt-0.5">
                  Assigned <span className="font-bold text-brand-accent">Table #{newlyCreated.tableNumber}</span> under name <span className="font-semibold text-white">{newlyCreated.name}</span> for {newlyCreated.guests} guests on {newlyCreated.date} at {newlyCreated.time}.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="mt-2 text-[10px] underline hover:text-white uppercase font-mono tracking-widest font-bold cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Live active bookings listing (5 Columns) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-zinc-950 border border-white/5 p-6 rounded-3xl text-left">
          <h4 className="font-serif text-lg font-bold text-white mb-2 flex items-center gap-2">
            Your Active Bookings
            <span className="bg-brand-accent/20 text-brand-accent font-mono text-[10px] px-2 py-0.5 rounded-full">
              {reservations.length} total
            </span>
          </h4>
          <p className="text-xs text-zinc-500">
            Real-time client status simulator. Live-track assigned tables or cancel seats.
          </p>

          <div className="mt-6 space-y-4 max-h-[380px] overflow-y-auto no-scrollbar">
            <AnimatePresence initial={false}>
              {reservations.length === 0 ? (
                <div className="py-12 text-center text-zinc-600 border border-dashed border-white/5 rounded-2xl">
                  <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30 text-brand-accent" />
                  <p className="text-xs font-mono">NO ACTIVE RESERVATIONS FOUND</p>
                  <p className="text-[10px] mt-1 max-w-xs mx-auto">Fill the secure reservation planner to simulate real-time seating assignment.</p>
                </div>
              ) : (
                reservations.map((res) => (
                  <motion.div
                    key={res.id}
                    initial={{ opacity: 0, height: 0, margin: 0 }}
                    animate={{ opacity: 1, height: 'auto', margin: 'inherit' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-[#141414] rounded-2xl border border-white/10 relative group overflow-hidden"
                  >
                    {/* Gold Ribbon Tag */}
                    <div className="absolute top-0 right-0 bg-brand-accent text-brand-bg font-mono font-bold text-[9px] uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                      Confirmed
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{res.name}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-[10px] font-mono text-brand-accent">Table #{res.tableNumber}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-[11px] text-zinc-400 font-mono">
                        <div>📅 {res.date}</div>
                        <div>🕒 {res.time}</div>
                        <div>👥 {res.guests} people</div>
                        <div>📞 {res.phone}</div>
                      </div>

                      {res.notes && (
                        <p className="text-[10px] italic text-zinc-500 border-t border-white/5 pt-1.5 mt-1">
                          📝 {res.notes}
                        </p>
                      )}
                    </div>

                    {/* Cancel reservation handler */}
                    <button
                      onClick={() => handleCancelReservation(res.id)}
                      className="absolute bottom-4 right-4 p-1.5 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Cancel Booking"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Live Map Guidelines card */}
        <div className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 rounded-3xl text-left">
          <h5 className="font-mono text-xs font-bold text-brand-accent uppercase tracking-wider mb-2">
            Important Dining Guidelines
          </h5>
          <ul className="text-xs text-zinc-400 space-y-2 leading-relaxed">
            <li>• <strong className="text-zinc-200">Grace Period:</strong> We hold tables for up to 20 minutes past booking time before assigning to walk-ins.</li>
            <li>• <strong className="text-zinc-200">Midnight Rush:</strong> Expect high wait-times for walk-ins between 11:30 PM to 2:00 AM on weekends.</li>
            <li>• <strong className="text-zinc-200">Group Dining:</strong> Tables of over 8 people require telephonic coordination for custom platters.</li>
          </ul>
        </div>

      </div>

    </div>
  );
}
