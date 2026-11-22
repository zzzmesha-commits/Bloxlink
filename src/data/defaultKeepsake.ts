import type { CoupleKeepsakeData } from '../types/keepsake';

export const DEFAULT_PIC_1 =
  'https://media.discordapp.net/attachments/1572227440267362434/1573643033415651379/Screenshot_2026-11-21_181440.png?ex=6b02c0c8&is=6b016f48&hm=7c90aca4864cd503b6013004f7550f62e8605aa3c11d970f0a0373d4f2042b56&format=webp&quality=lossless';
export const DEFAULT_PIC_2 =
  'https://media.discordapp.net/attachments/1572227440267362434/1573645760166240296/image.png?ex=6b02c352&is=6b0171d2&hm=985a47d0fec9730885e33e6571c55e52a074692b93114297dc7ea9aed17f8a5b&format=webp&quality=lossless';

export const DEFAULT_KEEPSAKE_DATA: CoupleKeepsakeData = {
  titleLine1: 'lavi',
  titleLine2: 'nd com',
  photos: [
    {
      id: 'pic-1',
      src: DEFAULT_PIC_1,
      label: 'lavi',
      title: 'i love u baby com',
      caption: 'i love you baby lavi mwa',
      alt: 'Lavi',
    },
    {
      id: 'pic-2',
      src: DEFAULT_PIC_2,
      label: 'com',
      title: 'i love u baby lavi mwa',
      caption: 'lavi baby',
      alt: 'Com portrait memory',
    },
  ],
  loveLetter: {
    envelopeLabel: 'For lavi & com',
    envelopeHint: 'Click to open my note',
    salutation: 'My sweetest love,',
    paragraphs: [
      'Every little moment with you feels like my favorite page in a story I never want to end. Even on the quietest days, just knowing you are mine makes everything softer, warmer, and infinitely brighter.',
      'Thank you for being my safe place, my favorite laugh, and the person my heart reaches for first. No matter where time carries us, I am endlessly grateful that it is you and me.',
    ],
    signOff: 'Always & forever yours,',
    signature: 'with all my love',
  },
};
