import React from 'react';

interface MarkUpLogoProps {
  size?: number;
  className?: string;
  withText?: boolean;
  textColorClass?: string;
}

export default function MarkUpLogo({
  size = 36,
  className = '',
  withText = false,
  textColorClass = 'text-ink'
}: MarkUpLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Crisp scalable SVG replicating the uploaded circular Mark-Up logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer Purple Border Circle */}
        <circle cx="50" cy="50" r="46" fill="white" stroke="#A855F7" strokeWidth="1.2" />

        {/* Navy Blue Pill / Capsule */}
        <rect
          x="38"
          y="30"
          width="10.5"
          height="34"
          rx="5.25"
          fill="#0C1E5B"
          transform="rotate(-32 43.25 47)"
        />

        {/* Magenta Pill / Capsule */}
        <rect
          x="53.5"
          y="30"
          width="10.5"
          height="34"
          rx="5.25"
          fill="#AA008C"
          transform="rotate(-32 58.75 47)"
        />

        {/* Bottom-Left Yellow Dot */}
        <circle cx="31" cy="53" r="5.8" fill="#F3E61C" />

        {/* Top-Right Yellow-Magenta Arrow Circle */}
        <circle cx="69" cy="33" r="5.5" fill="#F3E61C" stroke="#F65DC2" strokeWidth="1.2" />
        
        {/* Pink Arrow Pointing Up */}
        <path
          d="M69 36 V30 M66.5 32.5 L69 30 L71.5 32.5"
          stroke="#F65DC2"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {withText && (
        <span className={`font-display text-xl font-black tracking-tight ${textColorClass}`}>
          Mark-Up
        </span>
      )}
    </div>
  );
}
