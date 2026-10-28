import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { amenityIconMap } from './Amenities';

export default function AmenitiesModal({ isOpen, onClose, amenities }) {
  if (!isOpen) return null;

  // Group by category
  const categories = [...new Set(amenities.map((a) => a.category))];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#222222]">
            What this place offers
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition focus:outline-none"
            aria-label="Close amenities modal"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Scrollable list */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {categories.map((cat) => {
            const catAmenities = amenities.filter((a) => a.category === cat);
            return (
              <div key={cat} className="space-y-4">
                <h4 className="font-bold text-lg text-[#222222] pb-2 border-b border-gray-100">
                  {cat}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {catAmenities.map((a, idx) => {
                    const IconComponent = amenityIconMap[a.icon] || Sparkles;
                    return (
                      <div key={idx} className="flex items-center gap-4 text-sm text-[#222222]">
                        <IconComponent className="w-5 h-5 stroke-[1.8] text-gray-700 shrink-0" />
                        <span>{a.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
