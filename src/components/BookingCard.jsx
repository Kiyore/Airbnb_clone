import React, { useState } from 'react';
import { Tag, ChevronDown, Plus, Minus, Flag } from 'lucide-react';

export default function BookingCard({
  pricing,
  checkIn,
  checkOut,
  guests,
  onGuestChange,
  onOpenCalendar,
  onReserve
}) {
  const [guestsDropdownOpen, setGuestsDropdownOpen] = useState(false);
  const [discountClaimed, setDiscountClaimed] = useState(false);

  const totalGuests = guests.adults + guests.children;

  const formatDate = (date, defaultStr) => {
    if (!date) return defaultStr;
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${m}/${d}/${y}`;
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = checkOut.getTime() - checkIn.getTime();
      return Math.round(diffTime / (1000 * 60 * 60 * 24)) || 5;
    }
    return 5;
  };

  const nights = calculateNights();
  const totalPrice = discountClaimed 
    ? Math.round(pricing.totalFor5Nights * 0.9) 
    : pricing.totalFor5Nights;

  return (
    <div className="sticky top-28 space-y-4">
      {/* 10% Discount Claim Banner (Reference Parity) */}
      <div className="bg-white border border-[#DDDDDD] rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/images/discount.svg" alt="" className="w-8 h-8 object-contain shrink-0" />
          <div>
            <div className="text-sm font-semibold text-[#222222]">
              Get 10% off your next stay.
            </div>
            <a href="#" className="text-xs text-[#222222] underline font-medium hover:text-black">
              Terms apply
            </a>
          </div>
        </div>

        <button
          onClick={() => setDiscountClaimed(!discountClaimed)}
          className={`py-1.5 px-4 rounded-lg text-xs font-semibold transition ${
            discountClaimed
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-100 text-[#222222] hover:bg-gray-200'
          }`}
        >
          {discountClaimed ? 'Claimed' : 'Claim'}
        </button>
      </div>

      {/* Main Reservation Card */}
      <div className="bg-white border border-[#DDDDDD] rounded-2xl p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
        {/* Header: Price for nights */}
        <div className="mb-6">
          <span className="text-[22px] font-extrabold text-[#222222] underline">
            {pricing.currency}{totalPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[16px] text-[#222222] font-normal ml-2">
            for {nights} nights
          </span>
        </div>

        {/* Date & Guest Input Box */}
        <div className="border border-[#717171] rounded-xl overflow-hidden mb-4">
          {/* Dates Row */}
          <div className="grid grid-cols-2 divide-x divide-[#717171] border-b border-[#717171]">
            <button
              onClick={onOpenCalendar}
              className="p-3 text-left hover:bg-gray-50 transition focus:outline-none"
            >
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#222222]">
                CHECK-IN
              </div>
              <div className="text-sm font-medium text-[#222222]">
                {formatDate(checkIn, '10/18/2026')}
              </div>
            </button>

            <button
              onClick={onOpenCalendar}
              className="p-3 text-left hover:bg-gray-50 transition focus:outline-none"
            >
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#222222]">
                CHECKOUT
              </div>
              <div className="text-sm font-medium text-[#222222]">
                {formatDate(checkOut, '10/23/2026')}
              </div>
            </button>
          </div>

          {/* Guests Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setGuestsDropdownOpen(!guestsDropdownOpen)}
              className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50 transition focus:outline-none"
              aria-expanded={guestsDropdownOpen}
            >
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#222222]">
                  GUESTS
                </div>
                <div className="text-sm font-medium text-[#222222]">
                  {totalGuests} guest{totalGuests > 1 ? 's' : ''}
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#222222] transition-transform ${guestsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Stepper Popover */}
            {guestsDropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border border-[#EBEBEB] shadow-xl rounded-xl p-4 z-40 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#222222]">Adults</div>
                    <div className="text-xs text-[#717171]">Age 13+</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={guests.adults <= 1}
                      onClick={() => onGuestChange('adults', -1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{guests.adults}</span>
                    <button
                      disabled={guests.adults + guests.children >= 3}
                      onClick={() => onGuestChange('adults', 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#222222]">Children</div>
                    <div className="text-xs text-[#717171]">Ages 2–12</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={guests.children <= 0}
                      onClick={() => onGuestChange('children', -1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{guests.children}</span>
                    <button
                      disabled={guests.adults + guests.children >= 3}
                      onClick={() => onGuestChange('children', 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right pt-2 border-t border-gray-100">
                  <button
                    onClick={() => setGuestsDropdownOpen(false)}
                    className="text-sm font-semibold underline text-black hover:opacity-80"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Free cancellation banner */}
        <div className="bg-[#F7F7F7] rounded-xl py-3 px-4 text-center text-xs text-[#222222] mb-4">
          Free cancellation before <strong>17 October</strong>
        </div>

        {/* Reserve CTA Button */}
        <button
          onClick={onReserve}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-base bg-[#E00B41] hover:bg-[#D70466] active:scale-98 transition shadow-[0_2px_4px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF385C]"
        >
          Reserve
        </button>

        <p className="text-center text-xs text-[#717171] mt-3">
          You won't be charged yet
        </p>
      </div>

      {/* Report Listing */}
      <div className="flex items-center justify-center gap-2 text-xs text-[#717171] hover:text-black transition cursor-pointer">
        <img src="/svgs/icon-14.svg" alt="" className="w-3.5 h-3.5" />
        <span className="underline font-medium">Report this listing</span>
      </div>
    </div>
  );
}
