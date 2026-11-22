import React, { useState } from 'react';
import { DEFAULT_KEEPSAKE_DATA } from './data/defaultKeepsake';
import type { PhotoSlot } from './types/keepsake';
import { SatinBow } from './components/RibbonMotif';
import { LightboxModal } from './components/LightboxModal';
import { LoveLetterEnvelope } from './components/LoveLetterEnvelope';
import { CatCursorChase } from './components/CatCursorChase';
import { BackgroundMusic } from './components/BackgroundMusic';

function TinyHeart({ className = 'w-2.5 h-2.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 14.2s-5.6-3.5-6.9-7.1C.3 4.8 1.9 2.5 4.3 2.5c1.5 0 2.8.8 3.7 2 .9-1.2 2.2-2 3.7-2 2.4 0 4 2.3 3.2 4.6-1.3 3.6-6.9 7.1-6.9 7.1z" />
    </svg>
  );
}

function FrameCornerPearl({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-white via-[#FCEEF3] to-[#D9A7B8] border border-[#E4BBC8] shadow-2xs ${className}`}
    />
  );
}

export default function App() {
  const data = DEFAULT_KEEPSAKE_DATA;
  const [lightboxPhotoId, setLightboxPhotoId] = useState<PhotoSlot['id'] | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-14 relative overflow-hidden bg-[#FAF0F3] bg-[url('/src/assets/images/coquette_lace_backdrop_1795257317918.jpg')] bg-cover bg-center bg-no-repeat text-[#3B1E28]">
      <main className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        {/* Centered Stacked Title with Coquette Satin Bow & Delicate Floating Hearts */}
        <div className="relative flex flex-col items-center text-center select-none">
          <SatinBow className="w-16 h-10 mb-1" color="#B84868" />

          <h1
            className="font-display font-black tracking-[-0.02em] leading-[0.86] text-transparent bg-clip-text bg-gradient-to-b from-[#CE5B7C] via-[#A63A59] to-[#752039]"
            style={{ fontSize: 'clamp(3.5rem, 8.5vw, 6.25rem)' }}
          >
            <span className="block">{data.titleLine1}</span>
            <span className="block">{data.titleLine2}</span>
          </h1>

          {/* Subtle coquette floating heart accents */}
          <span
            aria-hidden="true"
            className="coquette-float absolute -left-8 bottom-6 text-[#C85475]"
          >
            <TinyHeart className="w-2.5 h-2.5" />
          </span>
          <span
            aria-hidden="true"
            className="coquette-float-delayed absolute -right-7 top-16 text-[#C85475]"
          >
            <TinyHeart className="w-2 h-2" />
          </span>
          <span
            aria-hidden="true"
            className="coquette-float absolute left-10 -bottom-4 text-[#A63A59]"
          >
            <TinyHeart className="w-2 h-2" />
          </span>
          <span
            aria-hidden="true"
            className="coquette-float-delayed absolute right-12 -bottom-5 text-[#A63A59]"
          >
            <TinyHeart className="w-2.5 h-2.5" />
          </span>
        </div>

        {/* Centered Row of 2 Coquette Framed Photograph Cards */}
        <section
          aria-label="Framed couple pictures"
          className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-10 items-stretch"
        >
          {data.photos.map((photo) => {
            const hasErr = Boolean(imageErrors[photo.id]);
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightboxPhotoId(photo.id)}
                className="group relative w-72 sm:w-80 flex flex-col items-center justify-between text-center rounded-2xl border border-[#E5C0CC] hover:border-[#C45473] bg-[#FFF9FB]/95 p-4 pb-5 shadow-[0_14px_34px_rgba(166,58,89,0.12)] transition-all duration-200 ease-out hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45473]"
              >
                {/* Coquette Satin Bow Crest on each photograph frame */}
                <div className="flex justify-center -mt-9 mb-1.5 pointer-events-none">
                  <SatinBow className="w-16 h-10 drop-shadow-xs" color="#C85D7C" />
                </div>

                {/* Pearl accents at the 4 frame corners */}
                <FrameCornerPearl className="top-2.5 left-2.5" />
                <FrameCornerPearl className="top-2.5 right-2.5" />
                <FrameCornerPearl className="bottom-2.5 left-2.5" />
                <FrameCornerPearl className="bottom-2.5 right-2.5" />

                <div className="flex-1 w-full flex items-center justify-center">
                  <div className="w-full rounded-xl p-1.5 border border-dashed border-[#E6BDC9] bg-[#FDF1F5]/75">
                    {!hasErr ? (
                      <div className="w-full rounded-lg overflow-hidden border border-[#F0D7E0] bg-white">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setImageErrors((prev) => ({ ...prev, [photo.id]: true }))
                          }
                          className="w-full h-auto max-h-72 object-contain block transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-square rounded-lg border border-[#F0D7E0] bg-white flex flex-col items-center justify-center p-4">
                        <SatinBow className="w-12 h-8 mb-2" color="#C45473" />
                        <span className="font-display italic text-base text-[#9E3B58]">
                          {photo.label}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-3 w-full">
                  <span className="h-px w-6 bg-[#E6C2CD]" aria-hidden="true" />
                  <span className="font-display italic text-xl font-bold tracking-wide text-[#9E3B58] group-hover:text-[#752039] transition-colors">
                    {photo.label}
                  </span>
                  <span className="h-px w-6 bg-[#E6C2CD]" aria-hidden="true" />
                </div>
              </button>
            );
          })}
        </section>

        <LoveLetterEnvelope letter={data.loveLetter} />
      </main>

      <LightboxModal
        photos={data.photos}
        activePhotoId={lightboxPhotoId}
        onClose={() => setLightboxPhotoId(null)}
        onSelectPhoto={(id) => setLightboxPhotoId(id)}
      />

      <CatCursorChase />

      <BackgroundMusic />
    </div>
  );
}
