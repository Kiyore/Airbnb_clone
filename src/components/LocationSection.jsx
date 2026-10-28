import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export default function LocationSection({ locationDetails }) {
  return (
    <section className="py-10 border-b border-[#EBEBEB]">
      <h3 className="text-[22px] font-semibold text-[#222222] mb-2">
        Where you'll be
      </h3>
      <p className="text-base text-[#222222] mb-6">
        {locationDetails.address}
      </p>

      {/* Styled Interactive Map Preview */}
      <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-[#DDDDDD] bg-[#EBF0F3] mb-6 shadow-sm">
        {/* Subtle Map Styling Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
        
        {/* Map Elements (Candolim Beach, Roads, Coastline representation) */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-blue-100/60 border-r border-blue-200 flex items-center justify-center">
          <span className="text-blue-500 font-bold text-xs uppercase tracking-widest -rotate-90 select-none">
            Arabian Sea (Candolim Beach)
          </span>
        </div>

        {/* Center Custom Pin Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          {/* Subtle pulsating radius circle */}
          <div className="w-32 h-32 rounded-full bg-[#FF385C]/15 border border-[#FF385C]/40 animate-pulse flex items-center justify-center">
            {/* Airbnb pin marker */}
            <div className="w-12 h-12 rounded-full bg-[#FF385C] text-white flex items-center justify-center shadow-lg border-2 border-white transform transition hover:scale-110">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-white">
                <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.256-3.235 7.806-7.5 7.806-3.08 0-5.77-1.89-6.9-4.708l-.1-.282-.1.282C13.77 29.916 11.08 31.806 8 31.806c-4.265 0-7.5-3.55-7.5-7.806 0-1.127.311-2.285.971-3.711l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C10.537 1.963 11.992 1 14 1z" />
              </svg>
            </div>
          </div>
          <span className="mt-2 text-xs font-bold text-[#222222] bg-white px-2.5 py-1 rounded-full shadow border border-gray-200">
            Mirashya UG10 (Candolim)
          </span>
        </div>

        {/* Map controls */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md border border-gray-200 p-2 flex items-center gap-2 text-xs font-semibold text-gray-700">
          <Navigation className="w-4 h-4 text-[#FF385C]" />
          <span>900m to Candolim Beach</span>
        </div>
      </div>

      <p className="text-sm text-[#222222] leading-relaxed max-w-3xl">
        {locationDetails.neighborhood}
      </p>
    </section>
  );
}
