"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

interface ProductGalleryProps {
  images: string[];
  title: string;
  badge?: string | null;
  badgeBg?: string;
}

export default function ProductGallery({
  images,
  title,
  badge,
  badgeBg = "bg-[#4A3F35]",
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeImage = images[selectedIndex] || images[0] || "";

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Scroll active thumbnail into view smoothly
  useEffect(() => {
    if (thumbnailRefs.current[selectedIndex]) {
      thumbnailRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [selectedIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isLightboxOpen, handlePrev, handleNext]);

  if (!images || images.length === 0) return null;

  const lightboxModal = isLightboxOpen && (
    <div
      className="fixed inset-0 z-[999999] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-8 animate-in fade-in duration-200 select-none"
      onClick={() => setIsLightboxOpen(false)}
    >
      {/* TOP BAR */}
      <div
        className="w-full max-w-6xl flex items-center justify-between text-white z-20 pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg tracking-wide">{title}</span>
          <span className="text-white/60 text-sm font-medium">
            ({selectedIndex + 1} / {images.length})
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsLightboxOpen(false)}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          aria-label="Kapat"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* MAIN MODAL IMAGE WITH ARROWS */}
      <div
        className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-110 z-20"
            aria-label="Önceki"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div className="relative max-h-[75vh] max-w-full flex items-center justify-center">
          <img
            src={activeImage}
            alt={`${title} büyük görünüm`}
            className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-200"
          />
        </div>

        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-110 z-20"
            aria-label="Sonraki"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* BOTTOM THUMBNAILS IN LIGHTBOX */}
      {images.length > 1 && (
        <div
          className="w-full max-w-3xl flex items-center justify-center gap-3 overflow-x-auto py-3 shrink-0 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 transition-all duration-200 bg-stone-900 ${
                idx === selectedIndex
                  ? "ring-2 ring-[#B95B32] ring-offset-2 ring-offset-black opacity-100 scale-105 shadow-lg"
                  : "opacity-50 hover:opacity-90 border border-white/20"
              }`}
            >
              <img
                src={img}
                alt={`Küçük görsel ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-4 select-none">
      
      {/* GALLERY CONTAINER: DESKTOP SIDE-BY-SIDE (Generous, un-cramped side rail + Main Image) */}
      <div className="flex flex-col-reverse md:flex-row gap-5 lg:gap-8 items-start w-full">
        
        {/* THUMBNAILS STRIP:
            - Desktop: Spacious vertical rail on the left with clean margins and breathing room.
            - Mobile: Clean horizontal scroll below main image.
        */}
        {images.length > 1 && (
          <div className="w-full md:w-auto shrink-0 flex md:flex-col gap-3.5 overflow-x-auto md:overflow-y-auto md:max-h-[640px] p-2 md:p-2.5 md:mr-2 scrollbar-thin scrollbar-thumb-stone-200">
            {images.map((img, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  ref={(el) => {
                    thumbnailRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`group relative shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden transition-all duration-200 bg-[#F5EFE8] block ${
                    isSelected
                      ? "ring-2 ring-[#B95B32] ring-offset-2 ring-offset-[#FAF7F2] shadow-sm opacity-100 scale-[1.02]"
                      : "border border-[#E4DBD0] opacity-75 hover:opacity-100 hover:scale-[1.02] hover:border-[#B95B32]/40"
                  }`}
                  aria-label={`${title} görsel ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${title} küçük resim ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                  />
                  {/* Subtle active accent indicator */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#B95B32]/10 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* MAIN LARGE IMAGE */}
        <div className="relative flex-1 w-full aspect-[4/5] md:aspect-auto md:h-[640px] bg-[#F7F4F0] rounded-2xl overflow-hidden border border-[#EBE4DC] shadow-[0_4px_24px_rgba(74,63,53,0.05)] group">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="w-full h-full cursor-zoom-in relative focus:outline-none flex items-center justify-center"
            aria-label={`${title} görselini tam ekran büyüt`}
          >
            <img
              src={activeImage}
              alt={`${title} - Görsel ${selectedIndex + 1}`}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>

          {/* BADGE */}
          {badge && (
            <div
              className={`absolute top-4 left-4 ${badgeBg} text-white text-[10px] font-semibold tracking-widest px-3 py-1.5 rounded-full uppercase shadow-sm pointer-events-none z-10`}
            >
              {badge}
            </div>
          )}

          {/* IMAGE COUNTER PILL */}
          {images.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/45 backdrop-blur-md text-white text-[11px] font-medium tracking-wider px-3 py-1 rounded-full pointer-events-none z-10">
              {selectedIndex + 1} / {images.length}
            </div>
          )}

          {/* HOVER ZOOM HINT PILL */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white backdrop-blur-md text-[#4A3F35] text-[11px] font-medium px-3.5 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-all duration-200 hover:scale-105 z-10"
          >
            <svg
              className="w-3.5 h-3.5 text-[#B95B32]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
              />
            </svg>
            <span className="hidden sm:inline">Büyüt</span>
          </button>

          {/* PREV / NEXT ARROWS */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#4A3F35] shadow-md flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 z-10 focus:opacity-100"
                aria-label="Önceki görsel"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#4A3F35] shadow-md flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 z-10 focus:opacity-100"
                aria-label="Sonraki görsel"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX (Rendered into document.body to avoid parent stacking issues) */}
      {mounted && lightboxModal && createPortal(lightboxModal, document.body)}
    </div>
  );
}
