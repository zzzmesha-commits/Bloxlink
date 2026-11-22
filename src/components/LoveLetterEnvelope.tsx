import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import type { LoveLetterData } from '../types/keepsake';
import { SatinBow } from './RibbonMotif';

interface LoveLetterEnvelopeProps {
  letter: LoveLetterData;
}

function SealHeart({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 14.2s-5.6-3.5-6.9-7.1C.3 4.8 1.9 2.5 4.3 2.5c1.5 0 2.8.8 3.7 2 .9-1.2 2.2-2 3.7-2 2.4 0 4 2.3 3.2 4.6-1.3 3.6-6.9 7.1-6.9 7.1z" />
    </svg>
  );
}

function LetterCornerPearl({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-white via-[#FCEEF3] to-[#D9A7B8] border border-[#E4BBC8] shadow-2xs ${className}`}
    />
  );
}

export function LoveLetterEnvelope({ letter }: LoveLetterEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section
      aria-label="Love letter envelope"
      className="mt-14 sm:mt-16 w-full flex flex-col items-center"
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isOpen ? (
          <motion.button
            key="closed-envelope"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-expanded={false}
            aria-label={`${letter.envelopeLabel}. ${letter.envelopeHint}`}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.9, y: 10 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.08, y: -8 }
            }
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03, y: -4 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.28, ease: easeCurve }}
            className="group relative w-full max-w-sm rounded-2xl border border-[#E5C0CC] hover:border-[#C45473] bg-gradient-to-b from-[#FFFDFD] via-[#FFF8FA] to-[#FDF0F4] p-3 shadow-[0_14px_34px_rgba(166,58,89,0.14)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C45473]"
          >
            {/* Satin bow crest matching the framed couple portraits */}
            <div className="flex justify-center -mt-8 mb-1 pointer-events-none">
              <SatinBow className="w-14 h-9 drop-shadow-xs" color="#C85D7C" />
            </div>

            {/* Inner stitched envelope stationery frame */}
            <div className="relative w-full min-h-[198px] rounded-xl border border-dashed border-[#E6BDC9] bg-[#FFFBFD] overflow-hidden flex flex-col items-center justify-end pb-6 pt-24 px-6">
              {/* Envelope flap & pocket geometry */}
              <svg
                viewBox="0 0 360 200"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                {/* Lower side & bottom pocket folds */}
                <path
                  d="M0 200 L145 104 L215 104 L360 200"
                  fill="#FDF2F6"
                  fillOpacity="0.65"
                  stroke="#E8C7D2"
                  strokeWidth="1.2"
                />
                <path
                  d="M0 0 L150 105 M360 0 L210 105"
                  stroke="#EBD1DA"
                  strokeWidth="1.1"
                />
                {/* Top triangular envelope flap */}
                <path
                  d="M0 0 L180 118 L360 0 Z"
                  fill="#FAF0F4"
                  stroke="#DFB3C1"
                  strokeWidth="1.5"
                />
                <path
                  d="M14 4 L180 110 L346 4"
                  fill="none"
                  stroke="#F2DCE4"
                  strokeWidth="1"
                />
              </svg>

              {/* Rose wax heart seal centered on the flap tip */}
              <span
                aria-hidden="true"
                className="relative z-10 -mt-12 mb-5 w-11 h-11 rounded-full bg-gradient-to-br from-[#D46282] via-[#B44162] to-[#872441] border-2 border-[#F8D9E3] shadow-[0_6px_14px_rgba(140,40,69,0.28)] flex items-center justify-center text-[#FFF7F9] transition-transform duration-200 ease-out group-hover:scale-110"
              >
                <SealHeart className="w-4 h-4" />
              </span>

              {/* Handwritten cursive recipient label on envelope front */}
              <p className="relative z-10 font-cursive text-2xl sm:text-[1.7rem] font-semibold leading-tight text-[#8E304B] group-hover:text-[#752039] transition-colors">
                {letter.envelopeLabel}
              </p>
              <span className="relative z-10 mt-1 text-xs font-medium tracking-wide text-[#7E5B67]">
                {letter.envelopeHint}
              </span>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="opened-letter"
            role="region"
            aria-label="Love letter message"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.72, y: 24 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.8, y: 16 }
            }
            transition={{ duration: 0.48, ease: easeCurve }}
            className="relative w-full max-w-lg"
          >
            {/* Subtle open envelope pocket cradling the bottom of the letter */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-3 left-4 right-4 h-20 rounded-b-2xl border border-[#E5C0CC] bg-gradient-to-b from-[#FAF0F4] to-[#F6E2EA] shadow-[0_14px_34px_rgba(166,58,89,0.14)]"
            />

            {/* Scaled-up stationery letter sheet */}
            <div className="relative rounded-2xl border border-[#E5C0CC] bg-[#FFFDFD] p-4 sm:p-5 shadow-[0_20px_48px_rgba(166,58,89,0.16)]">
              {/* Coquette Satin Bow Crest */}
              <div className="flex justify-center -mt-9 mb-1 pointer-events-none">
                <SatinBow className="w-16 h-10 drop-shadow-xs" color="#C85D7C" />
              </div>

              {/* Close button top-right */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fold love letter"
                className="absolute top-3.5 right-3.5 w-9 h-9 rounded-lg border border-[#E5C0CC] bg-[#FFF9FB] text-[#752039] hover:bg-[#FAF0F3] hover:border-[#C45473] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45473]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>

              {/* Corner pearls */}
              <LetterCornerPearl className="top-2.5 left-2.5" />
              <LetterCornerPearl className="bottom-2.5 left-2.5" />
              <LetterCornerPearl className="bottom-2.5 right-2.5" />

              {/* Stitched stationery border */}
              <div className="rounded-xl border border-dashed border-[#E6BDC9] bg-gradient-to-b from-[#FFFDFD] to-[#FFF7FA] px-6 py-7 sm:px-9 sm:py-8 text-left">
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.36, delay: prefersReducedMotion ? 0 : 0.14, ease: easeCurve }}
                >
                  <p className="font-cursive text-3xl sm:text-[2rem] font-bold text-[#9E3B58] mb-4">
                    {letter.salutation}
                  </p>

                  <div className="space-y-4">
                    {letter.paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className="font-cursive text-[1.45rem] sm:text-[1.625rem] font-medium leading-[1.58] text-[#4A2230]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-7 pt-5 border-t border-[#F0D7E0] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <p className="font-cursive text-2xl font-semibold text-[#9E3B58]">
                        {letter.signOff}
                      </p>
                      <p className="font-cursive text-[1.65rem] font-bold text-[#752039] inline-flex items-center gap-2 mt-0.5">
                        <span>{letter.signature}</span>
                        <SealHeart className="w-3.5 h-3.5 text-[#C85475] shrink-0" />
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="self-start sm:self-auto py-2 px-4 rounded-lg border border-[#E5C0CC] hover:border-[#C45473] bg-[#FFF9FB] hover:bg-[#FAF0F3] text-[#752039] text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45473]"
                    >
                      Fold letter
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
