import { useState, type CSSProperties } from "react"

interface Bubble {
  id: number
  x: number
  y: number
  size: 48 | 84 | 132 | 196
  duration: number
  delay: number
  opacity: number
  driftX: number
  driftY: number
  rotation: number
}

const BUBBLE_SIZES: Bubble["size"][] = [48, 84, 132, 196]
const BUBBLE_COUNT = 34

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min

const createBubbles = (): Bubble[] =>
  Array.from({ length: BUBBLE_COUNT }, (_, id) => ({
    id,
    // Spread bubbles over the full 300vh background, with a little bleed at the edges.
    x: randomBetween(-8, 98),
    y: randomBetween(-4, 142),
    size: BUBBLE_SIZES[Math.floor(Math.random() * BUBBLE_SIZES.length)],
    duration: randomBetween(18, 42),
    delay: randomBetween(-38, 0),
    opacity: randomBetween(0.14, 0.34),
    driftX: randomBetween(-42, 42),
    driftY: randomBetween(-34, 34),
    rotation: randomBetween(-18, 18),
  }))

export default function FloatingElements() {
  const [bubbles] = useState<Bubble[]>(createBubbles)

  return (
    <div
      className="fixed inset-0 h-screen w-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <style>{`
        @keyframes bubbleFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(var(--bubble-rotation)) scale(0.94);
          }
          25% {
            transform: translate3d(var(--bubble-drift-x), calc(var(--bubble-drift-y) * -0.45), 0)
              rotate(calc(var(--bubble-rotation) + 7deg)) scale(1.02);
          }
          50% {
            transform: translate3d(calc(var(--bubble-drift-x) * -0.6), var(--bubble-drift-y), 0)
              rotate(calc(var(--bubble-rotation) - 5deg)) scale(0.98);
          }
          75% {
            transform: translate3d(calc(var(--bubble-drift-x) * 0.45), calc(var(--bubble-drift-y) * 0.5), 0)
              rotate(calc(var(--bubble-rotation) + 4deg)) scale(1.04);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-bubble {
            animation: none !important;
          }
        }
      `}</style>

      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute portfolio-bubble"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
          }}
        >
          <img
            src="/images/bubbles.png"
            alt=""
            className="h-full w-full select-none object-contain"
            style={{
              opacity: bubble.opacity,
              animation: `bubbleFloat ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
              mixBlendMode: "screen",
              filter: "saturate(0.9) brightness(1.08) contrast(0.96) blur(0.15px)",
              willChange: "transform, opacity",
              // CSS custom properties let each bubble follow its own unique path.
              ["--bubble-drift-x" as string]: `${bubble.driftX}px`,
              ["--bubble-drift-y" as string]: `${bubble.driftY}px`,
              ["--bubble-rotation" as string]: `${bubble.rotation}deg`,
            } as CSSProperties}
          />
        </div>
      ))}
    </div>
  )
}
