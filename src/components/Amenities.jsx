import React from 'react';
import {
  Bath, ShowerHead, Sparkles, Wind, BedDouble, Shirt, Sun,
  Tv, AirVent, Fan, ShieldAlert, Wifi, Laptop, Utensils,
  Refrigerator, Microwave, Coffee, TreePine, Waves, Car, Zap, Building
} from 'lucide-react';

export const amenityIconMap = {
  Bath, ShowerHead, Sparkles, Wind, BedDouble, Shirt, Sun,
  Tv, AirVent, Fan, ShieldAlert, Wifi, Laptop, Utensils,
  Refrigerator, Microwave, Coffee, TreePine, Waves, Car, Zap, Building
};

export default function Amenities({ amenities, onShowAll }) {
  // Display first 10 amenities on the main page
  const displayedAmenities = amenities.slice(0, 10);

  return (
    <div className="py-8 border-b border-[#EBEBEB]">
      <h3 className="text-[22px] font-semibold text-[#222222] mb-6">
        What this place offers
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
        {displayedAmenities.map((amenity, idx) => {
          const IconComponent = amenityIconMap[amenity.icon] || Sparkles;
          return (
            <div key={idx} className="flex items-center gap-4 text-[#222222]">
              <div className="text-[#222222] shrink-0">
                <IconComponent className="w-6 h-6 stroke-[1.7]" />
              </div>
              <span className="text-[16px]">{amenity.name}</span>
            </div>
          );
        })}
      </div>

      <button
        onClick={onShowAll}
        className="py-3 px-6 border border-black rounded-lg text-sm font-semibold hover:bg-[#F7F7F7] active:scale-98 transition focus:outline-none focus:ring-2 focus:ring-black"
      >
        Show all {amenities.length} amenities
      </button>
    </div>
  );
}
