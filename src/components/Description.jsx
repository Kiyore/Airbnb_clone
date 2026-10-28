import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function Description({ description, sleepingArrangement }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="py-6 border-b border-[#EBEBEB]">
      <section className="space-y-4">
        <div className="text-[15px] md:text-[16px] text-[#222222] leading-relaxed space-y-3">
          <p>{description[0]}</p>
          {isExpanded && (
            <>
              <p>{description[1]}</p>
              <p>{description[2]}</p>
            </>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 font-semibold underline text-[#222222] hover:text-black py-1 focus:outline-none"
        >
          <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? '-rotate-90' : ''}`} />
        </button>
      </section>

      {/* Where you'll sleep (Reference Screenshot Parity) */}
      <section className="mt-10 pt-6">
        <h3 className="text-[22px] font-semibold text-[#222222] mb-6">
          Where you'll sleep
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          {sleepingArrangement.map((item, idx) => (
            <div key={idx} className="group">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-gray-100">
                <img
                  src={item.image}
                  alt={item.room}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h4 className="font-semibold text-base text-[#222222]">
                {item.room}
              </h4>
              <p className="text-sm text-[#717171] mt-0.5">
                {item.bedType}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
