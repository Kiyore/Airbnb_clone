import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Share, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LightboxModal({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onIndexChange,
  isSaved,
  onToggleSave,
  onShare
}) {
  const [direction, setDirection] = useState(0);
  const activeThumbRef = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length]);

  // Lock body scroll
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

  // Scroll active thumbnail into view
  useEffect(() => {
    if (activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [currentIndex]);

  if (!isOpen || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  const handlePrev = () => {
    setDirection(-1);
    onIndexChange((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setDirection(1);
    onIndexChange((currentIndex + 1) % photos.length);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0f0f0f] text-white flex flex-col justify-between select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Top Header Bar */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-white/10 z-20 bg-[#0f0f0f]/80 backdrop-blur-sm">
        {/* Left: Close button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 p-2 rounded-full hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close lightbox (Escape)"
        >
          <X className="w-5 h-5" />
          <span className="text-xs font-semibold tracking-wide hidden sm:inline">Close</span>
        </button>

        {/* Center: Counter Indicator */}
        <div className="text-sm font-semibold tracking-wider text-gray-300">
          {currentIndex + 1} / {photos.length}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onShare}
            className="p-2 rounded-full hover:bg-white/10 transition"
            aria-label="Share photo"
          >
            <Share className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleSave}
            className="p-2 rounded-full hover:bg-white/10 transition"
            aria-label="Save photo"
          >
            <Heart
              className={`w-4 h-4 ${isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-white'}`}
            />
          </button>
        </div>
      </header>

      {/* Main Photo Viewer Area with Arrows */}
      <main className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white shadow-xl"
          aria-label="Previous photo (Left arrow)"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Animated Image Container */}
        <div className="relative max-w-5xl max-h-[70vh] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center"
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.title}
                className="max-h-[64vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white shadow-xl"
          aria-label="Next photo (Right arrow)"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>
      </main>

      {/* Bottom Bar: Caption and Thumbnail Scroller */}
      <footer className="border-t border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md px-6 py-3 z-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-2">
          {/* Caption */}
          <div className="text-sm font-medium text-gray-200 text-center truncate max-w-xl">
            {currentPhoto.title}
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full">
            {photos.map((p, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={p.id}
                  ref={isActive ? activeThumbRef : null}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    onIndexChange(idx);
                  }}
                  className={`relative shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${
                    isActive
                      ? 'border-white scale-110 ring-2 ring-white/50 opacity-100'
                      : 'border-transparent opacity-40 hover:opacity-80'
                  }`}
                  aria-label={`Jump to photo ${idx + 1}`}
                >
                  <img src={p.url} alt="" className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
