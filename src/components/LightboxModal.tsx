import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PhotoSlot } from '../types/keepsake';
import { SatinBow } from './RibbonMotif';

interface LightboxModalProps {
  photos: [PhotoSlot, PhotoSlot];
  activePhotoId: PhotoSlot['id'] | null;
  onClose: () => void;
  onSelectPhoto: (id: PhotoSlot['id']) => void;
}

export function LightboxModal({
  photos,
  activePhotoId,
  onClose,
  onSelectPhoto,
}: LightboxModalProps) {
  useEffect(() => {
    if (!activePhotoId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        onSelectPhoto(activePhotoId === 'pic-1' ? 'pic-2' : 'pic-1');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoId, onClose, onSelectPhoto]);

  if (!activePhotoId) return null;

  const currentPhoto = photos.find((p) => p.id === activePhotoId) ?? photos[0];
  const otherId: PhotoSlot['id'] = currentPhoto.id === 'pic-1' ? 'pic-2' : 'pic-1';

  return (
    <div
      className="fixed inset-0 z-50 bg-[#241118]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={currentPhoto.title}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl border border-[#E5C0CC] bg-[#FFF9FB] text-[#3B1E28] p-5 sm:p-7 shadow-[0_20px_50px_rgba(74,25,42,0.28)] grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close picture viewer"
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-lg border border-[#E5C0CC] bg-white text-[#3B1E28] hover:bg-[#FAF0F3] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45473]"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        <div className="flex items-center justify-center">
          <div className="w-full rounded-xl p-1.5 border border-dashed border-[#E6BDC9] bg-[#FDF1F5]/75">
            <div className="rounded-lg overflow-hidden border border-[#F0D7E0] bg-white">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                referrerPolicy="no-referrer"
                className="w-full max-h-[68vh] h-auto object-contain block"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 py-1 pr-2">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <SatinBow className="w-9 h-6 shrink-0" color="#C85D7C" />
              <p className="font-display italic text-lg font-bold text-[#9E3B58]">
                {currentPhoto.label}
              </p>
            </div>
            <h3 className="font-display text-3xl font-bold leading-tight mb-3">
              {currentPhoto.title}
            </h3>
            <p className="text-sm leading-relaxed text-[#664651]">
              {currentPhoto.caption}
            </p>
          </div>

          <div className="pt-4 border-t border-[#EBD6DD] flex items-center justify-between">
            <span className="font-mono text-[11px] tabular-nums text-[#745660]">
              {currentPhoto.id === 'pic-1' ? '01 / 02' : '02 / 02'}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectPhoto(otherId)}
                aria-label="Previous photo"
                className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg border border-[#E5C0CC] text-[#3B1E28] hover:bg-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                Prev
              </button>
              <button
                type="button"
                onClick={() => onSelectPhoto(otherId)}
                aria-label="Next photo"
                className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg bg-[#B84C6C] hover:bg-[#9E3B58] text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
