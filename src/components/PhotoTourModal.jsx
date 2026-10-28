import React, { useEffect, useState } from 'react';

export default function PhotoTourModal({
  isOpen,
  onClose,
  tourSections,
  onSelectPhotoForLightbox,
  onShare
}) {
  const [activeSectionId, setActiveSectionId] = useState(tourSections?.[0]?.id || 'living-1');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Active section tracker on scroll using IntersectionObserver
  useEffect(() => {
    if (!isOpen || !tourSections) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('tour-sec-', '');
            setActiveSectionId(id);
          }
        });
      },
      { rootMargin: '-10% 0px -65% 0px' }
    );

    tourSections.forEach((sec) => {
      const el = document.getElementById(`tour-sec-${sec.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isOpen, tourSections]);

  if (!isOpen || !tourSections) return null;

  // Flatten photos for lightbox index tracking
  const allPhotos = tourSections.flatMap((s) => s.photos);

  const handleScrollTo = (id) => {
    setActiveSectionId(id);
    const elem = document.getElementById(`tour-sec-${id}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Full screen photo tour"
    >
      {/* Sticky Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EBEBEB]">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Back button (icon-28.svg) */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-gray-100 transition focus:outline-none"
            aria-label="Close photo tour"
          >
            <img src="/svgs/icon-28.svg" alt="Back" className="w-4 h-4" />
          </button>

          {/* Center: Title "Photo tour" */}
          <h1 className="text-base font-bold text-[#222222]">
            Photo tour
          </h1>

          {/* Right: Share icon (icon-4.svg) */}
          <button
            onClick={onShare}
            className="p-2.5 rounded-full hover:bg-gray-100 transition focus:outline-none"
            aria-label="Share listing"
          >
            <img src="/svgs/icon-4.svg" alt="Share" className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1140px] mx-auto px-6 py-8">
        {/* Top Category Thumbnails Grid */}
        <div className="mb-14">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-3">
            {tourSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleScrollTo(sec.id)}
                className="group flex flex-col items-start text-left focus:outline-none"
              >
                <div
                  className={`w-full aspect-[4/3] rounded-xl overflow-hidden mb-2 border-2 transition ${
                    activeSectionId === sec.id
                      ? 'border-black ring-1 ring-black'
                      : 'border-transparent opacity-80 group-hover:opacity-100'
                  }`}
                >
                  <img
                    src={sec.thumb}
                    alt={sec.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <span className="text-xs font-semibold text-[#222222] line-clamp-1 leading-tight group-hover:underline">
                  {sec.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Room Sections (Exact 2-Column Split: Sticky Frozen Title/Specs on left, Photos on right) */}
        <div className="space-y-24">
          {tourSections.map((sec) => (
            <section
              key={sec.id}
              id={`tour-sec-${sec.id}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start scroll-mt-24 pt-8 border-t border-[#EBEBEB] first:border-t-0"
            >
              {/* Left Column: Title & Subtitle (Sticky Pinned - Freezes at top while section photos scroll, slides off when next section arrives) */}
              <div className="md:col-span-4 md:sticky md:top-24 space-y-2 pb-6 z-10 bg-white md:bg-transparent">
                <h2 className="text-2xl md:text-3xl font-bold text-[#222222] tracking-tight">
                  {sec.title}
                </h2>
                <p className="text-sm text-[#717171] leading-relaxed">
                  {sec.subtitle}
                </p>
              </div>

              {/* Right Column: Editorial Photo Layout */}
              <div className="md:col-span-8 space-y-4">
                {/* Photo 1: Large Wide Top Photo */}
                {sec.photos[0] && (
                  <div
                    onClick={() => {
                      const globalIdx = allPhotos.findIndex((p) => p.id === sec.photos[0].id);
                      onSelectPhotoForLightbox(globalIdx >= 0 ? globalIdx : 0);
                    }}
                    className="cursor-pointer group overflow-hidden rounded-2xl bg-gray-100 aspect-[16/10] relative shadow-sm"
                  >
                    <img
                      src={sec.photos[0].url}
                      alt={sec.photos[0].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                )}

                {/* If exactly 2 photos: show second photo wide */}
                {sec.photos.length === 2 && (
                  <div
                    onClick={() => {
                      const globalIdx = allPhotos.findIndex((p) => p.id === sec.photos[1].id);
                      onSelectPhotoForLightbox(globalIdx >= 0 ? globalIdx : 0);
                    }}
                    className="cursor-pointer group overflow-hidden rounded-2xl bg-gray-100 aspect-[16/10] relative shadow-sm"
                  >
                    <img
                      src={sec.photos[1].url}
                      alt={sec.photos[1].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                )}

                {/* If 3 or more photos: show photos 2 & 3 side-by-side */}
                {sec.photos.length >= 3 && (
                  <div className="grid grid-cols-2 gap-4">
                    {sec.photos.slice(1, 3).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          const globalIdx = allPhotos.findIndex((item) => item.id === p.id);
                          onSelectPhotoForLightbox(globalIdx >= 0 ? globalIdx : 0);
                        }}
                        className="cursor-pointer group overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] relative shadow-sm"
                      >
                        <img
                          src={p.url}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Photo 4+: Any additional photos shown full-width */}
                {sec.photos.slice(3).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      const globalIdx = allPhotos.findIndex((item) => item.id === p.id);
                      onSelectPhotoForLightbox(globalIdx >= 0 ? globalIdx : 0);
                    }}
                    className="cursor-pointer group overflow-hidden rounded-2xl bg-gray-100 aspect-[16/10] relative shadow-sm"
                  >
                    <img
                      src={p.url}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
