import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function SubNavbar({ pricing, rating, onReserve, activeTab, onTabClick }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show subnavbar when scrolled past hero grid (~550px)
      if (window.scrollY > 550) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-[#EBEBEB] shadow-sm animate-in fade-in duration-200">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left Tabs */}
        <nav className="flex items-center gap-8 h-full">
          {[
            { id: 'photos', label: 'Photos', target: 'hero-section' },
            { id: 'amenities', label: 'Amenities', target: 'amenities-section' },
            { id: 'reviews', label: 'Reviews', target: 'reviews-section' },
            { id: 'location', label: 'Location', target: 'location-section' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.target, tab.id)}
              className={`h-full flex items-center text-sm font-semibold border-b-2 transition pt-1 ${
                activeTab === tab.id
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-600 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right Info & Reserve CTA */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-[#222222]">
              {pricing.currency}{pricing.totalFor5Nights.toLocaleString('en-IN')}{' '}
              <span className="font-normal text-xs text-[#717171]">for 5 nights</span>
            </div>
            <div className="flex items-center justify-end gap-1 text-xs font-semibold text-[#222222]">
              <Star className="w-3 h-3 fill-black stroke-black inline" />
              <span>{rating.score}</span>
              <span className="text-[#717171]">·</span>
              <span className="text-[#717171]">{rating.reviewCount} reviews</span>
            </div>
          </div>

          <button
            onClick={onReserve}
            className="py-3 px-6 bg-[#E00B41] hover:bg-[#D70466] active:scale-98 text-white text-sm font-bold rounded-lg transition shadow-sm"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
