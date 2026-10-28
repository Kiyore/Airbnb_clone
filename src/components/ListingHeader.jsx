import React from 'react';

export default function ListingHeader({ title, onShare, isSaved, onToggleSave }) {
  return (
    <div className="pt-6 pb-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <h1 className="text-[26px] font-semibold text-[#222222] tracking-tight leading-tight">
          {title}
        </h1>

        <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
          {/* Share button (icon-4.svg) */}
          <button
            onClick={onShare}
            className="flex items-center gap-2 py-2 px-3 text-sm font-semibold underline rounded-lg hover:bg-[#F7F7F7] transition focus:outline-none focus:ring-2 focus:ring-black"
          >
            <img src="/svgs/icon-4.svg" alt="" className="w-4 h-4" />
            <span>Share</span>
          </button>

          {/* Save / Wishlist button (icon-5.svg) */}
          <button
            onClick={onToggleSave}
            className="flex items-center gap-2 py-2 px-3 text-sm font-semibold underline rounded-lg hover:bg-[#F7F7F7] transition focus:outline-none focus:ring-2 focus:ring-black group"
          >
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                isSaved ? 'fill-[#FF385C] stroke-[#FF385C]' : 'fill-none stroke-[#222222]'
              }`}
              style={{ strokeWidth: 2 }}
            >
              <path d="m15.9998 28.6668c7.1667-4.8847 14.3334-10.8844 14.3334-18.1088 0-1.84951-.6993-3.69794-2.0988-5.10877-1.3996-1.4098-3.2332-2.11573-5.0679-2.11573-1.8336 0-3.6683.70593-5.0668 2.11573l-2.0999 2.11677-2.0988-2.11677c-1.3995-1.4098-3.2332-2.11573-5.06783-2.11573-1.83364 0-3.66831.70593-5.06683 2.11573-1.39955 1.41083-2.09984 3.25926-2.09984 5.10877 0 7.2244 7.16667 13.2241 14.3333 18.1088z" />
            </svg>
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
