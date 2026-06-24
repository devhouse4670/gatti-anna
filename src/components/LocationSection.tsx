import { MapPin, Phone, Clock, Compass, Navigation, PhoneCall, Star } from 'lucide-react';

export default function LocationSection({ lightTheme }: { lightTheme: boolean }) {
  // Official Gatti Anna Viman Nagar coordinate / directions link
  const directionsUrl = "https://www.google.com/maps/dir//GATTI+ANNA+-+VIMAN+NAGAR+Shop+no.+3,+Phoenix+Marketcity,+Neco+Garden+Society,+Neco+Gdn+Rd,+Sakore+Nagar,+Viman+Nagar,+Pune,+Maharashtra+411014/@18.5630686,73.9161704,17z";
  const phoneNumber = "+919730311868";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="location-details">
      
      {/* Contact & Map Text Details (5 Columns) */}
      <div className="lg:col-span-5 text-left space-y-6">
        <div>
          <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest block mb-2">
            VISIT OUR DINER
          </span>
          <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-white">
            Find us in Viman Nagar
          </h3>
        </div>

        <p className="text-sm text-zinc-400 leading-relaxed">
          Nestled close to <span className="text-white font-semibold">Phoenix Marketcity</span> in Viman Nagar, Gatti Anna is the premier destination for students, corporate teams, and late-night culinary wanderers.
        </p>

        {/* Highlighted Address Card */}
        <div className="p-5 bg-zinc-900/60 rounded-2xl border border-white/5 space-y-4">
          <div className="flex gap-3 items-start">
            <MapPin className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono text-zinc-500 block uppercase">ADDRESS</span>
              <span className="text-sm text-zinc-200">
                Shop no. 3, Phoenix Marketcity, Neco Garden Society, Viman Nagar, Pune, Maharashtra 411014
              </span>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Clock className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono text-zinc-500 block uppercase">HOURS OF CRAVING</span>
              <span className="text-sm text-zinc-200 block">Open Everyday: 5:00 AM – 3:00 AM</span>
              <span className="text-[10px] text-zinc-500">Continuous slow-brewed coffee & hot griddle dosas</span>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Phone className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono text-zinc-500 block uppercase">CALL RESERVATION HOTLINE</span>
              <a 
                href={`tel:${phoneNumber}`} 
                className="text-sm text-zinc-200 hover:text-brand-accent transition-colors font-mono font-bold"
              >
                {phoneNumber}
              </a>
            </div>
          </div>
        </div>

        {/* Rating Banner */}
        <div className="flex items-center gap-3 p-4 bg-brand-accent/5 rounded-2xl border border-brand-accent/20">
          <div className="flex gap-0.5 text-brand-accent">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-brand-accent stroke-none" />
            ))}
          </div>
          <span className="text-xs text-zinc-300">
            <strong className="text-white">4.8 Rating</strong> (1,728+ Google Reviews verified)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-accent text-brand-bg font-bold text-xs uppercase px-6 py-3.5 rounded-xl hover:scale-105 transition-all cursor-pointer tracking-wider"
          >
            <Navigation className="w-4 h-4" /> Get Live Directions
          </a>
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center gap-2 bg-zinc-900 border border-white/10 text-white hover:text-brand-accent font-bold text-xs uppercase px-6 py-3.5 rounded-xl hover:scale-105 transition-all cursor-pointer tracking-wider"
          >
            <PhoneCall className="w-4 h-4" /> Direct Hotline Call
          </a>
        </div>
      </div>

      {/* Styled Interactive Location Map Card (7 Columns) */}
      <div className="lg:col-span-7 h-96 w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative bg-zinc-950">
        
        {/* Subtle decorative target overlay to give an aesthetic, customized Framer-look */}
        <div className="absolute inset-0 bg-[radial-gradient(#252525_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        {/* Styled Dark Google Maps Embed to feel incredibly professional */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3782.2612745741086!2d73.91617042578553!3d18.563068567905186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c12fc8ffffff%3A0xc3f58721c56ef9a8!2sGATTI%20ANNA%20-%20VIMAN%20NAGAR!5e0!3m2!1sen!2sin!4v1719224345213!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer"
          title="Gatti Anna Restaurant Pune Google Map Location"
          className="relative z-10 w-full h-full"
        />

        {/* Custom Marker Aura Pin */}
        <div className="absolute bottom-6 left-6 z-20 bg-black/85 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center gap-3 text-left">
          <div className="w-8 h-8 rounded-full bg-brand-accent text-brand-bg flex items-center justify-center font-bold">
            GA
          </div>
          <div>
            <h5 className="text-xs font-bold text-white font-serif">GATTI ANNA DINER</h5>
            <p className="text-[10px] text-zinc-400 font-mono">Opposite Neco Garden Soc.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
