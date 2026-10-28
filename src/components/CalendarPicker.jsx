import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPicker({ checkIn, checkOut, onDateChange, onClearDates }) {
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  // Helper to generate calendar days for a given month offset from current date
  const baseDate = new Date(2026, 9, 1); // October 2026

  const getMonthData = (offset) => {
    const d = new Date(baseDate.getFullYear(), baseDate.getMonth() + offset, 1);
    const monthName = d.toLocaleString('default', { month: 'long', year: 'numeric' });
    const firstDayIndex = d.getDay(); // 0 is Sunday
    const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(d.getFullYear(), d.getMonth(), day));
    }
    return { monthName, days };
  };

  const month1 = getMonthData(currentMonthOffset);
  const month2 = getMonthData(currentMonthOffset + 1);

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = checkOut.getTime() - checkIn.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  const nights = calculateNights();

  const handleDayClick = (date) => {
    if (!date) return;
    if (!checkIn || (checkIn && checkOut)) {
      onDateChange(date, null);
    } else if (checkIn && !checkOut) {
      if (date.getTime() < checkIn.getTime()) {
        onDateChange(date, null);
      } else if (date.getTime() === checkIn.getTime()) {
        // Same day -> not allowed for overnight stay
      } else {
        onDateChange(checkIn, date);
      }
    }
  };

  const isDaySelected = (date) => {
    if (!date) return false;
    const t = date.getTime();
    if (checkIn && t === checkIn.getTime()) return 'start';
    if (checkOut && t === checkOut.getTime()) return 'end';
    if (checkIn && checkOut && t > checkIn.getTime() && t < checkOut.getTime()) return 'range';
    return false;
  };

  const formatDateDisplay = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="py-8 border-b border-[#EBEBEB]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[22px] font-semibold text-[#222222]">
          {nights > 0 ? `${nights} nights in Candolim` : 'Select check-in date'}
        </h3>
        {checkIn && (
          <button
            onClick={onClearDates}
            className="text-sm font-semibold underline text-[#222222] hover:text-black focus:outline-none"
          >
            Clear dates
          </button>
        )}
      </div>

      <p className="text-sm text-[#717171] mb-6">
        {checkIn && checkOut
          ? `${formatDateDisplay(checkIn)} – ${formatDateDisplay(checkOut)}`
          : 'Add your travel dates for exact pricing and availability'}
      </p>

      {/* Two-Month Calendar View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Navigation arrows */}
        <button
          onClick={() => setCurrentMonthOffset((prev) => prev - 1)}
          className="absolute -top-12 left-0 p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-[#222222]" />
        </button>
        <button
          onClick={() => setCurrentMonthOffset((prev) => prev + 1)}
          className="absolute -top-12 right-0 p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-[#222222]" />
        </button>

        {[month1, month2].map((m, mIdx) => (
          <div key={mIdx} className="select-none">
            <div className="text-center font-bold text-base text-[#222222] mb-4">
              {m.monthName}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#717171] mb-2">
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {m.days.map((d, dIdx) => {
                if (!d) return <div key={dIdx} className="h-10"></div>;
                const status = isDaySelected(d);
                let btnClass = "h-10 w-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition cursor-pointer ";
                if (status === 'start' || status === 'end') {
                  btnClass += "bg-[#222222] text-white font-bold";
                } else if (status === 'range') {
                  btnClass += "bg-gray-100 text-[#222222] rounded-none";
                } else {
                  btnClass += "hover:border hover:border-black text-[#222222]";
                }

                return (
                  <button
                    key={dIdx}
                    onClick={() => handleDayClick(d)}
                    className={btnClass}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
