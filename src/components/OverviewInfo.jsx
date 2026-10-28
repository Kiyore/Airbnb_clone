import React from 'react';
import { Star } from 'lucide-react';

export default function OverviewInfo({ subtitle, stats, rating, host, onScrollToReviews }) {
  return (
    <div className="py-6 border-b border-[#EBEBEB]">
      <h2 className="text-[22px] font-semibold text-[#222222]">
        {subtitle}
      </h2>
      <ol className="flex items-center gap-1.5 text-[15px] text-[#222222] mt-1 list-none p-0">
        <li>{stats.guests} guests</li>
        <li aria-hidden="true">·</li>
        <li>{stats.bedrooms} bedroom</li>
        <li aria-hidden="true">·</li>
        <li>{stats.beds} bed</li>
        <li aria-hidden="true">·</li>
        <li>{stats.baths} bathroom</li>
      </ol>

      {/* Guest Favourite Badge Card (Reference Image Parity) */}
      {rating.isGuestFavorite && (
        <div className="mt-6 p-5 border border-[#DDDDDD] rounded-2xl flex items-center justify-between gap-4 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          {/* Left: Laurel wreath with "Guest favourite" */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center text-[#222222]">
              <div className="w-5 h-8">
                <img src="/svgs/icon-7.svg" alt="" className="w-full h-full object-contain" />
              </div>
              <div className="text-center font-bold text-xs text-[#222222] px-1 leading-tight">
                Guest<br />favourite
              </div>
              <div className="w-5 h-8 -scale-x-100">
                <img src="/svgs/icon-7.svg" alt="" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {/* Center text */}
          <div className="text-sm text-[#222222] font-normal leading-relaxed max-w-sm hidden sm:block">
            One of the most loved homes on Airbnb, according to guests
          </div>

          {/* Right: Scores & Reviews link */}
          <div className="flex items-center gap-6 border-l border-[#EBEBEB] pl-6 shrink-0">
            <div className="text-center">
              <div className="text-xl font-extrabold text-[#222222]">
                {rating.score.toFixed(2)}
              </div>
              <div className="flex items-center justify-center text-xs text-black">
                ★★★★★
              </div>
            </div>

            <div className="h-8 w-[1px] bg-[#EBEBEB]" />

            <button
              onClick={onScrollToReviews}
              className="text-center hover:opacity-80 transition focus:outline-none"
            >
              <div className="text-xl font-extrabold text-[#222222] underline">
                {rating.reviewCount}
              </div>
              <div className="text-xs text-[#717171] underline font-medium">
                Reviews
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Host Snippet Card */}
      <div className="mt-6 flex items-center gap-4">
        <img
          src={host.avatar}
          alt={host.name}
          className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-200"
        />
        <div>
          <div className="font-semibold text-base text-[#222222]">
            Hosted by {host.name}
          </div>
          <div className="text-sm text-[#717171]">
            {host.yearsHosting} years hosting
          </div>
        </div>
      </div>
    </div>
  );
}
