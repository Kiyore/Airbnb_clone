import React from 'react';
import { Shield, GraduationCap } from 'lucide-react';

export default function HostProfile({ host }) {
  return (
    <section className="py-12 border-b border-[#EBEBEB]">
      <h3 className="text-[22px] font-semibold text-[#222222] mb-8">
        Meet your host
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Host Profile Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#DDDDDD] p-8 rounded-3xl shadow-[0_6px_16px_rgba(0,0,0,0.08)] flex items-center justify-between">
            {/* Avatar & Name */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <img
                  src={host.avatar}
                  alt={host.name}
                  className="w-24 h-24 rounded-full object-cover shadow-sm"
                />
                {/* Red verified checkmark badge at bottom-right */}
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#E00B41] text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                  </svg>
                </div>
              </div>

              <h4 className="text-2xl font-bold text-[#222222] leading-tight">
                {host.name}
              </h4>
              <p className="text-sm text-[#717171] mt-0.5">
                Host
              </p>
            </div>

            {/* Right Stats */}
            <div className="space-y-4 text-left border-l border-gray-100 pl-8">
              <div>
                <div className="text-xl font-bold text-[#222222]">
                  {host.reviews}
                </div>
                <div className="text-xs text-[#717171]">
                  Reviews
                </div>
              </div>

              <div className="w-full h-[1px] bg-[#EBEBEB]" />

              <div>
                <div className="text-xl font-bold text-[#222222]">
                  {host.rating}
                </div>
                <div className="text-xs text-[#717171]">
                  Rating
                </div>
              </div>

              <div className="w-full h-[1px] bg-[#EBEBEB]" />

              <div>
                <div className="text-xl font-bold text-[#222222]">
                  {host.yearsHosting}
                </div>
                <div className="text-xs text-[#717171]">
                  Years hosting
                </div>
              </div>
            </div>
          </div>

          {/* Details under card */}
          <div className="space-y-3 pt-2 text-sm text-[#222222]">
            <div className="flex items-center gap-3">
              {/* Balloon icon */}
              <span className="text-lg">🎈</span>
              <span>{host.born}</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-[#222222]" />
              <span>{host.school}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Co-Hosts & Host Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Co-Hosts */}
          <div>
            <h4 className="text-base font-bold text-[#222222] mb-4">
              Co-Hosts
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6">
              {host.coHosts.map((co, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {co.avatar ? (
                    <img
                      src={co.avatar}
                      alt={co.name}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className={`w-8 h-8 rounded-full ${co.bg} font-bold text-xs flex items-center justify-center shrink-0`}>
                      {co.initial}
                    </div>
                  )}
                  <span className="text-sm font-normal text-[#222222] truncate">
                    {co.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Host details */}
          <div className="space-y-2">
            <h4 className="text-base font-bold text-[#222222]">
              Host details
            </h4>
            <p className="text-sm text-[#222222]">
              Response rate: {host.responseRate}
            </p>
            <p className="text-sm text-[#222222]">
              Responds {host.responseTime}
            </p>

            <div className="pt-4">
              <button className="py-3 px-6 bg-[#F7F7F7] hover:bg-gray-200 text-[#222222] font-semibold text-sm rounded-lg transition active:scale-98">
                Message host
              </button>
            </div>
          </div>

          {/* Payment protection notice */}
          <div className="flex items-start gap-3 pt-4 border-t border-[#EBEBEB] text-xs text-[#717171] leading-relaxed">
            <Shield className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
            <span>
              To help protect your payment, always use Airbnb to send money and communicate with hosts.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
