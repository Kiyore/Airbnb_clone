import React from 'react';
import { X, CheckCircle2, Calendar, Users, MapPin, Sparkles } from 'lucide-react';

export default function ReservationSuccessModal({
  isOpen,
  onClose,
  title,
  checkIn,
  checkOut,
  guests,
  pricing
}) {
  if (!isOpen) return null;

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = checkOut.getTime() - checkIn.getTime();
      return Math.round(diffTime / (1000 * 60 * 60 * 24)) || 1;
    }
    return 3;
  };

  const nights = calculateNights();
  const total = pricing.basePrice * nights + pricing.cleaningFee + pricing.serviceFee;

  const formatDate = (d) => {
    if (!d) return 'Nov 1, 2026';
    return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <CheckCircle2 className="w-10 h-10 stroke-[2]" />
          </div>
          <h3 className="text-2xl font-bold text-[#222222]">
            Reservation Confirmed!
          </h3>
          <p className="text-sm text-[#717171] mt-1">
            You're heading to Candolim, Goa!
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4 mb-6 text-sm">
          <div className="font-semibold text-base text-[#222222] border-b border-gray-200 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF385C]" />
            <span>{title}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
            <span>{formatDate(checkIn)} – {formatDate(checkOut)} ({nights} nights)</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Users className="w-4 h-4 text-gray-500 shrink-0" />
            <span>{guests.adults + guests.children} guests {guests.infants > 0 ? `(${guests.infants} infant)` : ''}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
            <span>Candolim, North Goa, India</span>
          </div>

          <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-base text-[#222222]">
            <span>Total Amount</span>
            <span className="text-[#FF385C]">{pricing.currency}{total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-[#222222] text-white font-semibold rounded-xl hover:bg-black transition active:scale-98"
        >
          View Itinerary
        </button>
      </div>
    </div>
  );
}
