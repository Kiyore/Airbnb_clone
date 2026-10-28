import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function ThingsToKnow() {
  return (
    <section className="py-10 border-b border-[#EBEBEB]">
      <h3 className="text-[22px] font-semibold text-[#222222] mb-6">
        Things to know
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* House rules */}
        <div className="space-y-3">
          <h4 className="font-semibold text-base text-[#222222]">
            House rules
          </h4>
          <p className="text-[#222222]">Check-in after 2:00 pm</p>
          <p className="text-[#222222]">Checkout before 11:00 am</p>
          <p className="text-[#222222]">2 guests maximum</p>
          <button className="flex items-center gap-1 font-semibold underline text-[#222222] pt-2 hover:text-black">
            <span>Show more</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Safety & property */}
        <div className="space-y-3">
          <h4 className="font-semibold text-base text-[#222222]">
            Safety & property
          </h4>
          <p className="text-[#222222]">Smoke alarm fitted</p>
          <p className="text-[#222222]">Carbon monoxide alarm</p>
          <p className="text-[#222222]">Jacuzzi depth guidelines</p>
          <button className="flex items-center gap-1 font-semibold underline text-[#222222] pt-2 hover:text-black">
            <span>Show more</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Cancellation policy */}
        <div className="space-y-3">
          <h4 className="font-semibold text-base text-[#222222]">
            Cancellation policy
          </h4>
          <p className="text-[#222222]">
            Free cancellation for 48 hours. Cancel before check-in for a partial refund.
          </p>
          <p className="text-[#717171] text-xs">
            Review the Host's full cancellation policy which applies even if you cancel for illness.
          </p>
          <button className="flex items-center gap-1 font-semibold underline text-[#222222] pt-2 hover:text-black">
            <span>Show more</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
