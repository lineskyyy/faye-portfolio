import type { CSSProperties } from "react";

interface LanyardProps {
  progress: number;
  reduceMotion?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

/**
 * Scroll-scripted lanyard inspired by the ReactBits Lanyard component.
 * Unlike the original, this version intentionally has no pointer/drag state:
 * the card drops as the About paragraph reveals and settles with a small bounce.
 */
export default function Lanyard({
  progress,
  reduceMotion = false,
  imageSrc = "/images/id.png",
  imageAlt = "Multimedia Arts graduate ID card",
}: LanyardProps) {
  const normalizedProgress = clamp(progress);
  const dropProgress = reduceMotion
    ? 1
    : easeOutCubic(clamp(normalizedProgress * 1.12));
  const remaining = 1 - dropProgress;
  const bounce = reduceMotion
    ? 0
    : Math.sin(dropProgress * Math.PI * 4.5) * Math.pow(remaining, 1.65) * 18;
  const swing = reduceMotion
    ? 0
    : Math.sin(dropProgress * Math.PI * 3.2) * Math.pow(remaining, 1.4) * 8;
  const cardY = -124 * remaining + bounce;
  const cardRotation = -5.5 * remaining + swing;
  const strapRotation = reduceMotion
    ? 0
    : Math.sin(dropProgress * Math.PI * 2.4) * Math.pow(remaining, 1.2) * 2.5;

  const strapStyle: CSSProperties = {
    transform: `translate3d(0, ${remaining * -8}px, 0) rotate(${strapRotation}deg)`,
    transformOrigin: "50% 0",
    willChange: "transform",
  };

  const cardStyle: CSSProperties = {
    transform: `translate3d(-50%, ${cardY}px, 0) rotate(${cardRotation}deg)`,
    transformOrigin: "50% 18px",
    willChange: "transform",
  };

  return (
    <div
      className="relative mx-auto h-[500px] w-full max-w-[340px] select-none"
      aria-label="Animated multimedia artist ID card"
    >
      <div
        className="absolute left-1/2 top-5 z-10 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-[#1e5247] bg-[#f8e8d8] shadow-[0_4px_10px_rgba(30,82,71,0.22)]"
        aria-hidden="true"
      />

      <svg
        className="absolute inset-x-0 top-0 z-0 h-[360px] w-full overflow-visible"
        viewBox="0 0 340 360"
        fill="none"
        role="presentation"
        aria-hidden="true"
        style={strapStyle}
      >
        <path
          d="M170 27 C170 95 170 133 116 169 C72 198 75 250 123 274 C155 290 201 279 218 245"
          stroke="#1e5247"
          strokeWidth="23"
          strokeLinecap="round"
        />
        <path
          d="M170 27 C170 95 170 133 116 169 C72 198 75 250 123 274 C155 290 201 279 218 245"
          stroke="#9cb080"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M170 27 C170 95 170 133 116 169 C72 198 75 250 123 274 C155 290 201 279 218 245"
          stroke="#c5d0a4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="3 12"
          opacity="0.9"
        />
      </svg>

      <div
        className="absolute left-1/2 top-[245px] z-20 w-[218px]"
        style={cardStyle}
      >
        <div className="relative aspect-[0.705] overflow-hidden rounded-[18px] border-[5px] border-[#f7f0e7] bg-[#f7f0e7] shadow-[0_24px_35px_rgba(30,82,71,0.22),0_4px_8px_rgba(30,82,71,0.18)]">
          <div className="absolute left-1/2 top-[-12px] z-20 h-7 w-14 -translate-x-1/2 rounded-b-xl border-4 border-t-0 border-[#d6c9b9] bg-[#eee2d3] shadow-sm" />
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[#1e5247]/20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#1e5247]/40 to-transparent" />
        </div>
        <div className="mx-auto mt-[-2px] h-2 w-24 rounded-b-full bg-[#a99986] shadow-[0_4px_5px_rgba(30,82,71,0.14)]" />
      </div>
    </div>
  );
}
