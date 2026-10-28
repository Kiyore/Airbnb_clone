import React from 'react';
import { Fan, DoorOpen, UtensilsCrossed } from 'lucide-react';

export default function Highlights({ highlights }) {
  return (
    <div className="py-6 border-b border-[#EBEBEB] space-y-6">
      {/* 1. Outdoor entertainment */}
      <div className="flex items-start gap-6">
        <div className="text-[#222222] mt-0.5 shrink-0">
          {/* Outdoor entertainment / hot tub steam icon */}
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M4 18h24c-1 7-5 10-12 10S5 25 4 18z" />
            <path d="M9 13c0-3 2-4 2-7" />
            <path d="M16 13c0-3 2-4 2-7" />
            <path d="M23 13c0-3 2-4 2-7" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-base text-[#222222]">
            Outdoor entertainment
          </h3>
          <p className="text-sm text-[#717171] mt-0.5 leading-relaxed">
            The pool and alfresco dining are great for summer trips.
          </p>
        </div>
      </div>

      {/* 2. Designed for staying cool */}
      <div className="flex items-start gap-6">
        <div className="text-[#222222] mt-0.5 shrink-0">
          {/* Ceiling fan icon */}
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="16" cy="16" r="3" />
            <path d="M16 13C16 7 20 4 23 4c1 0 1 2 0 4-2 3-5 5-7 5z" />
            <path d="M19 16c6 0 9 4 9 7 0 1-2 1-4 0-3-2-5-5-5-7z" />
            <path d="M16 19c0 6-4 9-7 9-1 0-1-2 0-4 2-3 5-5 7-5z" />
            <path d="M13 16c-6 0-9-4-9-7 0-1 2-1 4 0 3 2 5 5 5 7z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-base text-[#222222]">
            Designed for staying cool
          </h3>
          <p className="text-sm text-[#717171] mt-0.5 leading-relaxed">
            Beat the heat with the A/C and ceiling fan.
          </p>
        </div>
      </div>

      {/* 3. Self check-in */}
      <div className="flex items-start gap-6">
        <div className="text-[#222222] mt-0.5 shrink-0">
          {/* Door icon */}
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <rect x="7" y="4" width="18" height="24" rx="2" />
            <circle cx="12" cy="16" r="1.5" fill="currentColor" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-base text-[#222222]">
            Self check-in
          </h3>
          <p className="text-sm text-[#717171] mt-0.5 leading-relaxed">
            You can check in with the building staff.
          </p>
        </div>
      </div>
    </div>
  );
}
