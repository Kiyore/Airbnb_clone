import React from 'react';
import { LayoutGrid } from 'lucide-react';

export default function HeroGrid({ photos, onOpenTour, onOpenLightbox }) {
  const heroPhotos = photos.slice(0, 5);

  return (
    <section className="relative my-4" aria-label="Photo gallery preview">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] md:h-[480px] rounded-2xl overflow-hidden">
        {/* Main large photo (col 1 & 2, span 2 rows) */}
        {heroPhotos[0] && (
          <div
            onClick={() => onOpenTour(0)}
            className="col-span-2 row-span-2 relative cursor-pointer group overflow-hidden bg-gray-100"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenTour(0)}
            aria-label={`View photo 1: ${heroPhotos[0].title}`}
          >
            <img
              src={heroPhotos[0].url}
              alt={heroPhotos[0].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200" />
          </div>
        )}

        {/* Top-middle photo (col 3, row 1) */}
        {heroPhotos[1] && (
          <div
            onClick={() => onOpenTour(1)}
            className="col-span-1 row-span-1 relative cursor-pointer group overflow-hidden bg-gray-100"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenTour(1)}
            aria-label={`View photo 2: ${heroPhotos[1].title}`}
          >
            <img
              src={heroPhotos[1].url}
              alt={heroPhotos[1].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200" />
          </div>
        )}

        {/* Top-right photo (col 4, row 1) */}
        {heroPhotos[2] && (
          <div
            onClick={() => onOpenTour(2)}
            className="col-span-1 row-span-1 relative cursor-pointer group overflow-hidden bg-gray-100"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenTour(2)}
            aria-label={`View photo 3: ${heroPhotos[2].title}`}
          >
            <img
              src={heroPhotos[2].url}
              alt={heroPhotos[2].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200" />
          </div>
        )}

        {/* Bottom-middle photo (col 3, row 2) */}
        {heroPhotos[3] && (
          <div
            onClick={() => onOpenTour(3)}
            className="col-span-1 row-span-1 relative cursor-pointer group overflow-hidden bg-gray-100"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenTour(3)}
            aria-label={`View photo 4: ${heroPhotos[3].title}`}
          >
            <img
              src={heroPhotos[3].url}
              alt={heroPhotos[3].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200" />
          </div>
        )}

        {/* Bottom-right photo (col 4, row 2) */}
        {heroPhotos[4] && (
          <div
            onClick={() => onOpenTour(4)}
            className="col-span-1 row-span-1 relative cursor-pointer group overflow-hidden bg-gray-100"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenTour(4)}
            aria-label={`View photo 5: ${heroPhotos[4].title}`}
          >
            <img
              src={heroPhotos[4].url}
              alt={heroPhotos[4].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200" />
          </div>
        )}
      </div>

      {/* "Show all photos" floating button */}
      <button
        onClick={() => onOpenTour(0)}
        className="absolute bottom-6 right-6 z-10 flex items-center gap-2 bg-white text-[#222222] text-sm font-semibold py-2 px-3.5 rounded-lg border border-black shadow-[0_2px_4px_rgba(0,0,0,0.18)] hover:bg-[#F7F7F7] active:scale-95 transition"
      >
        <img src="/svgs/icon-6.svg" alt="" className="w-4 h-4" />
        <span>Show all {photos.length} photos</span>
      </button>
    </section>
  );
}
