import React, { useState } from 'react';
import { X, Info, Search } from 'lucide-react';

/* --- SVG Icons matching Airbnb's exact iconography --- */

function SprayBottleIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#222222]">
      {/* Bottle body */}
      <path d="M10 14h10l-1.5 13a2 2 0 0 1-2 1.8h-3a2 2 0 0 1-2-1.8L10 14z" />
      {/* Neck */}
      <path d="M13 10h4v4h-4z" />
      {/* Spray head */}
      <path d="M12 7h8l2 3h-12l2-3z" />
      <path d="M11 10h-3v-1l3-2" />
      {/* Trigger */}
      <path d="M18 10v3" />
      {/* Spray dots */}
      <circle cx="7" cy="6" r="0.75" fill="currentColor" />
      <circle cx="5" cy="8" r="0.75" fill="currentColor" />
      <circle cx="8" cy="9" r="0.75" fill="currentColor" />
    </svg>
  );
}

function AccuracyCheckIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#222222]">
      <circle cx="16" cy="16" r="12" />
      <path d="M11 16.5l3.5 3.5 7-7" />
    </svg>
  );
}

function KeyCheckinIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#222222]">
      <circle cx="12" cy="12" r="6" />
      <path d="M16.5 16.5L25 25" />
      <path d="M22 22l2-2" />
      <path d="M24 24l2-2" />
    </svg>
  );
}

function CommunicationBubbleIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#222222]">
      <path d="M6 9a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-5l-6 5v-5H10a4 4 0 0 1-4-4V9z" />
    </svg>
  );
}

function LocationMapIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#222222]">
      <polygon points="6 8 13 5 19 8 26 5 26 24 19 27 13 24 6 27 6 8" />
      <line x1="13" y1="5" x2="13" y2="24" />
      <line x1="19" y1="8" x2="19" y2="27" />
    </svg>
  );
}

function ValueTagIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#222222]">
      <path d="M7 6h8l11 11-8 8L7 14V6z" />
      <circle cx="11" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}

export default function ReviewsSection({ rating, reviewRatings, reviews, reviewTags }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [showHowReviewsWork, setShowHowReviewsWork] = useState(false);
  const [allReviewsOpen, setAllReviewsOpen] = useState(false);

  // Filter reviews based on selected tag
  const filteredReviews = selectedTag
    ? reviews.filter((r) => r.tags && r.tags.includes(selectedTag))
    : reviews;

  const distribution = reviewRatings?.distribution || [
    { stars: 5, percentage: 95 },
    { stars: 4, percentage: 5 },
    { stars: 3, percentage: 0 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ];

  return (
    <section id="reviews-section" className="py-12 border-b border-[#EBEBEB]">
      {/* ================= 1. GUEST FAVOURITE HERO WITH LAUREL WREATH ================= */}
      <div className="flex flex-col items-center justify-center text-center mb-10">
        {/* Large Score with Left and Right Laurel Leaves */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-3">
          <img
            src="/images/laurel-left.png"
            alt=""
            className="w-10 h-16 md:w-14 md:h-24 object-contain select-none"
          />
          <span className="text-[70px] md:text-[88px] font-black text-[#222222] tracking-tighter leading-none select-none">
            {rating.score.toFixed(2)}
          </span>
          <img
            src="/images/laurel-right.png"
            alt=""
            className="w-10 h-16 md:w-14 md:h-24 object-contain select-none"
          />
        </div>

        {/* Title */}
        <h2 className="text-[26px] md:text-[28px] font-bold text-[#222222] tracking-tight">
          Guest favourite
        </h2>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-[#717171] mt-1.5 max-w-md mx-auto leading-relaxed">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>

        {/* Underlined "How reviews work" link */}
        <button
          onClick={() => setShowHowReviewsWork(true)}
          className="text-xs md:text-sm font-semibold underline text-[#222222] hover:text-black mt-2 focus:outline-none"
        >
          How reviews work
        </button>
      </div>

      {/* ================= 2. SEVEN-COLUMN HORIZONTAL BREAKDOWN WITH DIVIDERS ================= */}
      <div className="border-t border-b border-[#EBEBEB] py-8 mb-8 overflow-x-auto no-scrollbar">
        <div className="min-w-[780px] grid grid-cols-7 divide-x divide-[#EBEBEB] text-left">
          {/* Column 1: Overall rating with 5-star distribution bars */}
          <div className="pr-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#222222] mb-3">
                Overall rating
              </div>
              <div className="space-y-1.5">
                {distribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 text-right font-medium text-[#222222] text-[11px]">
                      {item.stars}
                    </span>
                    <div className="flex-1 bg-[#EBEBEB] h-[5px] rounded-full overflow-hidden">
                      {item.percentage > 0 && (
                        <div
                          className="bg-[#222222] h-full rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Cleanliness */}
          <div className="px-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#222222]">Cleanliness</div>
              <div className="text-base font-extrabold text-[#222222] mt-1">
                {reviewRatings.cleanliness.toFixed(1)}
              </div>
            </div>
            <div className="pt-4 text-[#222222]">
              <SprayBottleIcon />
            </div>
          </div>

          {/* Column 3: Accuracy */}
          <div className="px-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#222222]">Accuracy</div>
              <div className="text-base font-extrabold text-[#222222] mt-1">
                {reviewRatings.accuracy.toFixed(1)}
              </div>
            </div>
            <div className="pt-4 text-[#222222]">
              <AccuracyCheckIcon />
            </div>
          </div>

          {/* Column 4: Check-in */}
          <div className="px-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#222222]">Check-in</div>
              <div className="text-base font-extrabold text-[#222222] mt-1">
                {reviewRatings.checkIn.toFixed(1)}
              </div>
            </div>
            <div className="pt-4 text-[#222222]">
              <KeyCheckinIcon />
            </div>
          </div>

          {/* Column 5: Communication */}
          <div className="px-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#222222]">Communication</div>
              <div className="text-base font-extrabold text-[#222222] mt-1">
                {reviewRatings.communication.toFixed(1)}
              </div>
            </div>
            <div className="pt-4 text-[#222222]">
              <CommunicationBubbleIcon />
            </div>
          </div>

          {/* Column 6: Location */}
          <div className="px-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#222222]">Location</div>
              <div className="text-base font-extrabold text-[#222222] mt-1">
                {reviewRatings.location.toFixed(1)}
              </div>
            </div>
            <div className="pt-4 text-[#222222]">
              <LocationMapIcon />
            </div>
          </div>

          {/* Column 7: Value */}
          <div className="pl-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#222222]">Value</div>
              <div className="text-base font-extrabold text-[#222222] mt-1">
                {reviewRatings.value.toFixed(1)}
              </div>
            </div>
            <div className="pt-4 text-[#222222]">
              <ValueTagIcon />
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. TOPIC FILTER PILLS ROW ================= */}
      {reviewTags && reviewTags.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {/* "All" button */}
            <button
              onClick={() => setSelectedTag(null)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition shrink-0 ${
                selectedTag === null
                  ? 'border-black bg-[#222222] text-white shadow-sm'
                  : 'border-[#DDDDDD] bg-white text-[#222222] hover:border-black'
              }`}
            >
              <span>All reviews</span>
              <span className="opacity-70 text-[11px]">{reviews.length}</span>
            </button>

            {/* Individual Tag Chips */}
            {reviewTags.map((tag) => {
              const isSelected = selectedTag === tag.label;
              return (
                <button
                  key={tag.label}
                  onClick={() => setSelectedTag(isSelected ? null : tag.label)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold border transition shrink-0 ${
                    isSelected
                      ? 'border-black bg-[#222222] text-white shadow-sm'
                      : 'border-[#DDDDDD] bg-white text-[#222222] hover:border-black'
                  }`}
                >
                  {tag.icon ? (
                    <img src={tag.icon} alt="" className="w-4 h-4 object-contain" />
                  ) : (
                    <span>{tag.emoji}</span>
                  )}
                  <span>{tag.label}</span>
                  <span className={`${isSelected ? 'text-gray-300' : 'text-[#717171]'} font-normal text-[11px]`}>
                    {tag.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= 4. GUEST REVIEWS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {filteredReviews.map((rev) => (
          <div key={rev.id} className="space-y-3">
            {/* User row */}
            <div className="flex items-center gap-3">
              <img
                src={rev.avatar}
                alt={rev.author}
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />
              <div>
                <h4 className="font-semibold text-base text-[#222222] leading-tight">
                  {rev.author}
                </h4>
                <p className="text-xs text-[#717171] mt-0.5">
                  {rev.location} · {rev.date}
                </p>
              </div>
            </div>

            {/* Rating Stars & Tags snippet */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-xs">
                {'★'.repeat(rev.rating)}
              </div>
              {rev.tags && (
                <div className="flex items-center gap-1.5">
                  {rev.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Review text */}
            <p className="text-sm text-[#222222] leading-relaxed">
              {rev.content}
            </p>
          </div>
        ))}
      </div>

      {/* Show all reviews CTA */}
      <div className="mt-10">
        <button
          onClick={() => setAllReviewsOpen(true)}
          className="py-3 px-6 border border-black rounded-lg text-sm font-semibold hover:bg-[#F7F7F7] active:scale-98 transition focus:outline-none focus:ring-2 focus:ring-black"
        >
          Show all {rating.reviewCount} reviews
        </button>
      </div>

      {/* ================= "HOW REVIEWS WORK" MODAL ================= */}
      {showHowReviewsWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setShowHowReviewsWork(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            <h3 className="text-xl font-bold text-[#222222] mb-3">
              How reviews work
            </h3>

            <p className="text-sm text-[#717171] leading-relaxed mb-6">
              Reviews on Airbnb are submitted by verified guests after completed stays. Ratings are evaluated across six core subcategories to calculate the overall quality score.
            </p>

            <div className="space-y-4 text-sm text-[#222222]">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div className="font-bold text-sm">Guest Favourite Criteria</div>
                <div className="text-xs text-[#717171] mt-1">
                  Only the top 10% of eligible listings on Airbnb receive the Guest Favourite badge. Qualifications require an overall rating of 4.9+ stars, low cancellation rates, and exceptional ratings for cleanliness and communication.
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div className="font-bold text-sm">Review Authenticity</div>
                <div className="text-xs text-[#717171] mt-1">
                  Reviews can only be left by guests who booked and completed their stay. Hosts and guests submit blind reviews within 14 days of checkout.
                </div>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setShowHowReviewsWork(false)}
                className="py-2.5 px-5 bg-black text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= "ALL REVIEWS" POPUP DRAWER/MODAL ================= */}
      {allReviewsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-100 relative overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#222222]">
                  ★ {rating.score.toFixed(2)} · {rating.reviewCount} reviews
                </span>
              </div>
              <button
                onClick={() => setAllReviewsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Close reviews dialog"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {reviews.map((r) => (
                <div key={r.id} className="pb-6 border-b border-gray-100 last:border-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-sm text-[#222222]">{r.author}</div>
                      <div className="text-xs text-[#717171]">{r.location} · {r.date}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{r.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
