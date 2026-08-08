import { useEffect, useState, useRef } from "react"

interface Bubble {
  id: number
  x: number // %
  y: number // %
  size: number // px
  duration: number // seconds
  delay: number // seconds
  opacity: number
  drift: number // px
}

// Bubble palette
const COLOR_PRIMARY = "#ffba08"
const COLOR_SECONDARY = "#c6abe8"
const COLOR_ACCENT = "#f9dbbd"

const bubbleGradientId = (id: number) => `bubbleGradient${id}`

export default function FloatingElements({ scrollY }: { scrollY: number }) {
  const [elements, setElements] = useState<Bubble[]>([])
  const mouse = useRef({ x: 0, y: 0, has: false })

  useEffect(() => {
    const newElements: Bubble[] = Array.from({ length: 34 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 90 + 24,
      duration: Math.random() * 22 + 16,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.26 + 0.14,
      drift: Math.random() * 60 + 10,
    }))

    setElements(newElements)
  }, [])

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      mouse.current.has = true
    }

    const handleLeave = () => {
      mouse.current.has = false
    }

    window.addEventListener("pointermove", handleMove, { passive: true })
    window.addEventListener("blur", handleLeave)

    return () => {
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("blur", handleLeave)
    }
  }, [])

  const renderBubble = (b: Bubble) => {
    // Pointer avoidance (no cursor-physics; just a convincing repulsion)
    // We convert bubble's left/top % into a pseudo-position relative to viewport.
    // This keeps it lightweight and works without refs per bubble.
    const vw = typeof window !== "undefined" ? window.innerWidth : 1
    const vh = typeof window !== "undefined" ? window.innerHeight : 1

    const bubbleCx = (b.x / 100) * vw
    const bubbleCy = (b.y / 100) * vh

    let repelX = 0
    let repelY = 0
    if (mouse.current.has) {
      const dx = bubbleCx - mouse.current.x
      const dy = bubbleCy - mouse.current.y
      const dist = Math.sqrt(dx * dx + dy * dy) || 1

      const radius = Math.min(260, 140 + b.size) // px influence
      const strength = Math.max(0, 1 - dist / radius)
      repelX = (dx / dist) * strength * (b.size * 0.45)
      repelY = (dy / dist) * strength * (b.size * 0.35)
    }

    const baseStyle: React.CSSProperties = {
      position: "absolute" as const,
      left: `${b.x}%`,
      top: `${b.y}%`,
      width: `${b.size}px`,
      height: `${b.size}px`,
      opacity: b.opacity,
      animation: `float ${b.duration}s ease-in-out ${b.delay}s infinite`,
      // keep existing scroll parallax feel + subtle drift, plus cursor repulsion
      // NOTE: float keyframes manipulate transform too, so repulsion must be stronger
      transform: `translateY(${scrollY * 0.25 + repelY * 0.35}px) translateX(${b.drift * 0.12 + repelX * 0.35}px)`,
      transition: "transform 0.05s ease-out, opacity 0.2s ease-out",
      filter: "saturate(1.35) contrast(1.08)",
    }


    return (
      <svg
        key={b.id}
        style={baseStyle}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={bubbleGradientId(b.id)} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor={COLOR_ACCENT} stopOpacity="1" />
            <stop offset="35%" stopColor={COLOR_SECONDARY} stopOpacity="0.6" />
            <stop offset="100%" stopColor={COLOR_PRIMARY} stopOpacity="0.35" />
          </radialGradient>
        </defs>

        {/* outer bubble */}
        <circle cx="50" cy="50" r="48" fill={`url(#${bubbleGradientId(b.id)})`} />

        {/* rim */}
        <circle cx="50" cy="50" r="48" stroke={COLOR_ACCENT} strokeWidth="1.3" opacity="0.55" />

        {/* highlight */}
        <path
          d="M30 34 C38 26, 49 25, 58 32"
          stroke={COLOR_ACCENT}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* secondary highlight */}
        <circle cx="38" cy="40" r="7" fill={COLOR_ACCENT} opacity="0.28" />
      </svg>
    )
  }

  return (
    <div className="absolute top-0 left-0 w-full h-[300vh] pointer-events-none overflow-hidden">
      {elements.map(renderBubble)}
    </div>
  )
}


