export interface PhotoSlot {
  id: 'pic-1' | 'pic-2';
  src: string;
  label: string;
  title: string;
  caption: string;
  alt: string;
}

export interface LoveLetterData {
  envelopeLabel: string;
  envelopeHint: string;
  salutation: string;
  paragraphs: string[];
  signOff: string;
  signature: string;
}

export interface CoupleKeepsakeData {
  titleLine1: string;
  titleLine2: string;
  photos: [PhotoSlot, PhotoSlot];
  loveLetter: LoveLetterData;
}
