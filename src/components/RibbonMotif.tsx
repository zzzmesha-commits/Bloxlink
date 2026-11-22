import React from 'react';

export function SatinBow({ className = 'w-14 h-9', color = '#D47A92' }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left ribbon loop */}
      <path
        d="M57 32C45 14 21 8 13 21C6 32 19 46 39 39C48 36 54 34 57 32Z"
        fill={color}
        fillOpacity="0.22"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M53 31C42 22 25 21 20 27"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Right ribbon loop */}
      <path
        d="M63 32C75 14 99 8 107 21C114 32 101 46 81 39C72 36 66 34 63 32Z"
        fill={color}
        fillOpacity="0.22"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M67 31C78 22 95 21 100 27"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Left ribbon tail */}
      <path
        d="M56 36C49 48 42 58 32 66C36 60 40 53 42 46C46 43 52 39 56 36Z"
        fill={color}
        fillOpacity="0.16"
        stroke={color}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right ribbon tail */}
      <path
        d="M64 36C71 48 78 58 88 66C84 60 80 53 78 46C74 43 68 39 64 36Z"
        fill={color}
        fillOpacity="0.16"
        stroke={color}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center silk knot */}
      <rect
        x="53"
        y="25"
        width="14"
        height="13"
        rx="5"
        fill="#FDF9F9"
        stroke={color}
        strokeWidth="2.2"
      />
    </svg>
  );
}

export function LaceDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-2 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-[#EBD8DD]" />
      <SatinBow className="w-11 h-7 shrink-0" color="#C96D87" />
      <div className="h-px flex-1 bg-[#EBD8DD]" />
    </div>
  );
}
