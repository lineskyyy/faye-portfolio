import { useEffect, useRef, useState, useMemo, type CSSProperties } from "react";

const BUTTON_HOVER_CLASSES =
  "transition-[transform,box-shadow,background-color] duration-200 ease-out shadow-lg hover:shadow-[#fe497b]/60 hover:-translate-y-0.5 active:scale-[0.98]";
const TRANSITION_CLASSES =
  "transition-[transform,background-color,color] duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]";

const baseImages = [
  "/projects/branding/p9.jpg",
  "/projects/branding/p10.jpg",
  "/projects/branding/p11.jpg",
  "/projects/graphicd/p7.jpg",
  "/projects/graphicd/p8.jpg",
  "/projects/graphicd/p9.jpg",
  "/projects/graphicd/p11.jpg",
  "/projects/illustrations/ALUCARD%20SHATTERED.jpg",
  "/projects/illustrations/miranda-poster.jpg",
  "/projects/illustrations/DEATH%20NOTE%20FINAL%20MIRANDA.jpg",
  "/projects/illustrations/CHARACTER%20STUDY.png",
  "/projects/illustrations/THE%20GHOST%20CHARACTER.png",
  "/projects/presentations/presentation1/p1.png",
  "/projects/presentations/presentation1/p3.png",
  "/projects/presentations/presentation1/p5.png",
];

const walls = ["left", "right", "top", "bottom"] as const;

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function TunnelArtwork() {
  const [isPaused, setIsPaused] = useState(false);
  const [zOffset, setZOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const animFrameRef = useRef<number | null>(null);
  const zOffsetRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const TOTAL_ITEMS = 32;
  const TUNNEL_DEPTH = 3600;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const items = useMemo(() => {
    return Array.from({ length: TOTAL_ITEMS }).map((_, i) => {
      const seed = i * 13.37 + 1;
      const imageIndex = Math.floor(pseudoRandom(seed) * baseImages.length);
      const wall = walls[Math.floor(pseudoRandom(seed + 1) * walls.length)];

      const isHorizontal = wall === "top" || wall === "bottom";

      // Uniform card proportions relative to viewport orientation
      const width = isHorizontal
        ? isMobile ? 220 : 440
        : isMobile ? 160 : 320;
      const height = isHorizontal
        ? isMobile ? 140 : 280
        : isMobile ? 240 : 480;

      // Restrict position range to prevent edge overflow
      const crossOffset = 15 + pseudoRandom(seed + 2) * 70;
      const z = -(pseudoRandom(seed + 3) * TUNNEL_DEPTH);

      return {
        id: i,
        src: baseImages[imageIndex],
        wall,
        crossOffset,
        z,
        width,
        height,
      };
    });
  }, [TOTAL_ITEMS, TUNNEL_DEPTH, isMobile]);

  const gridRings = useMemo(() => {
    const ringSpacing = 160;
    const count = Math.floor(TUNNEL_DEPTH / ringSpacing);
    return Array.from({ length: count }).map((_, i) => -(i * ringSpacing));
  }, [TUNNEL_DEPTH]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      const targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.targetX = targetX;
      mouseRef.current.targetY = targetY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      if (!isPaused) {
        zOffsetRef.current += delta * 0.12;
        setZOffset(zOffsetRef.current);
      }

      if (containerRef.current) {
        const rotateX = -mouse.y * 5;
        const rotateY = mouse.x * 5;
        containerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused]);

  const getItemStyle = (
    item: (typeof items)[number],
    currentZOffset: number
  ): CSSProperties => {
    const rawZ = item.z + currentZOffset;
    const wrappedZ = ((rawZ % TUNNEL_DEPTH) - TUNNEL_DEPTH) % TUNNEL_DEPTH;

    let opacity = 1;
    const backFade = -TUNNEL_DEPTH + 600;
    if (wrappedZ < backFade) {
      opacity = Math.max(0, (wrappedZ - (-TUNNEL_DEPTH)) / 600);
    } else if (wrappedZ > -300) {
      opacity = Math.max(0, -wrappedZ / 300);
    }

    const baseStyle: CSSProperties = {
      position: "absolute",
      width: `${item.width}px`,
      height: `${item.height}px`,
      willChange: "transform, opacity",
      opacity,
      pointerEvents: "none",
    };

    // Cleaned-up 3D rotations ensuring top/bottom planes lie flat along the tunnel axis
    switch (item.wall) {
      case "left":
        return {
          ...baseStyle,
          top: `${item.crossOffset}%`,
          left: 0,
          transformOrigin: "0% 50%",
          transform: `translate3d(0, -50%, ${wrappedZ}px) rotateY(90deg)`,
        };
      case "right":
        return {
          ...baseStyle,
          top: `${item.crossOffset}%`,
          right: 0,
          transformOrigin: "100% 50%",
          transform: `translate3d(0, -50%, ${wrappedZ}px) rotateY(-90deg)`,
        };
      case "top":
        return {
          ...baseStyle,
          left: `${item.crossOffset}%`,
          top: 0,
          transformOrigin: "50% 0%",
          transform: `translate3d(-50%, 0, ${wrappedZ}px) rotateX(-90deg)`,
        };
      case "bottom":
        return {
          ...baseStyle,
          left: `${item.crossOffset}%`,
          bottom: 0,
          transformOrigin: "50% 100%",
          transform: `translate3d(-50%, 0, ${wrappedZ}px) rotateX(90deg)`,
        };
      default:
        return baseStyle;
    }
  };

  const getRingStyle = (ringZ: number, currentZOffset: number): CSSProperties => {
    const rawZ = ringZ + currentZOffset;
    const wrappedZ = ((rawZ % TUNNEL_DEPTH) - TUNNEL_DEPTH) % TUNNEL_DEPTH;

    let opacity = 0.4;
    if (wrappedZ < -TUNNEL_DEPTH + 500) {
      opacity = Math.max(0, ((wrappedZ + TUNNEL_DEPTH) / 500) * 0.4);
    } else if (wrappedZ > -200) {
      opacity = Math.max(0, (-wrappedZ / 200) * 0.4);
    }

    return {
      position: "absolute",
      inset: 0,
      border: "1px solid rgba(255, 255, 255, 0.35)",
      transform: `translateZ(${wrappedZ}px)`,
      opacity,
      pointerEvents: "none",
      willChange: "transform, opacity",
    };
  };

  const gridPositions = [10, 20, 30, 40, 50, 60, 70, 80, 90];

  return (
    <div
      aria-label={isPaused ? "Image tunnel paused" : "Image tunnel animation"}
      className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1e5247] to-[#9cb080] cursor-pointer select-none"
      onClick={() => setIsPaused((prev) => !prev)}
    >
      <div
        className="relative h-full w-full"
        style={{
          perspective: isMobile ? "400px" : "600px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          ref={containerRef}
          className="absolute inset-0 h-full w-full [transform-style:preserve-3d]"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Longitudinal wireframe grid lines */}
          {gridPositions.map((pos) => (
            <div key={`lines-${pos}`}>
              <div
                className="absolute left-0 h-full border-l border-white/20 pointer-events-none"
                style={{
                  top: `${pos}%`,
                  width: `${TUNNEL_DEPTH}px`,
                  transform: "rotateY(90deg)",
                  transformOrigin: "0% 50%",
                }}
              />
              <div
                className="absolute right-0 h-full border-r border-white/20 pointer-events-none"
                style={{
                  top: `${pos}%`,
                  width: `${TUNNEL_DEPTH}px`,
                  transform: "rotateY(-90deg)",
                  transformOrigin: "100% 50%",
                }}
              />
              <div
                className="absolute top-0 w-full border-t border-white/20 pointer-events-none"
                style={{
                  left: `${pos}%`,
                  height: `${TUNNEL_DEPTH}px`,
                  transform: "rotateX(-90deg)",
                  transformOrigin: "50% 0%",
                }}
              />
              <div
                className="absolute bottom-0 w-full border-b border-white/20 pointer-events-none"
                style={{
                  left: `${pos}%`,
                  height: `${TUNNEL_DEPTH}px`,
                  transform: "rotateX(90deg)",
                  transformOrigin: "50% 100%",
                }}
              />
            </div>
          ))}

          {/* Wireframe depth ring boundaries */}
          {gridRings.map((ringZ, index) => (
            <div key={`ring-${index}`} style={getRingStyle(ringZ, zOffset)} />
          ))}

          {/* Scattered Wall Images */}
          {items.map((item) => (
            <div key={item.id} style={getItemStyle(item, zOffset)}>
              <img
                src={item.src}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover border border-white/40 shadow-[0_0_25px_rgba(0,0,0,0.6)] rounded-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="tunnel-vignette pointer-events-none absolute inset-0 z-20" />

      <div className="pointer-events-none absolute bottom-6 sm:bottom-8 inset-x-0 z-30 flex items-center justify-center text-center text-[#fff4e7]/70">
        <p className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase">
          Click anywhere to {isPaused ? "resume" : "pause"}
        </p>
      </div>

      <style>{`
        .tunnel-vignette {
          background: radial-gradient(circle at center, transparent 15%, rgba(30, 82, 71, 0.45) 60%, rgba(30, 82, 71, 0.95) 95%);
        }
      `}</style>
    </div>
  );
}

export default function HeroSix() {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionQuery.matches);
      if (motionQuery.matches) {
        setIsLoaded(true);
        setIsVisible(true);
      }
    };

    updateMotionPreference();
    const loadFrame = requestAnimationFrame(() => {
      setIsLoaded(true);
      setIsVisible(true);
    });

    let scrollFrame = 0;
    const updateScrollProgress = () => {
      scrollFrame = 0;
      setScrollProgress(window.scrollY > 0 ? 1 : 0);
    };
    const handleScroll = () => {
      if (!scrollFrame)
        scrollFrame = requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    motionQuery.addEventListener("change", updateMotionPreference);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(loadFrame);
      cancelAnimationFrame(scrollFrame);
      motionQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const edgeSpace = 8 * (1 - scrollProgress);
  const heroHeight = `calc(100vh - ${edgeSpace * 2}px)`;
  const radius = Math.round(32 * (1 - scrollProgress));
  const sectionStyle: CSSProperties = {
    padding: `${edgeSpace}px`,
    transition: prefersReducedMotion
      ? "none"
      : "padding 360ms cubic-bezier(0.23, 1, 0.32, 1)",
  };
  const shellStyle: CSSProperties = {
    minHeight: heroHeight,
    borderRadius: `${radius}px`,
    opacity: isLoaded ? 1 : 0,
    transition: prefersReducedMotion
      ? "none"
      : "border-radius 260ms cubic-bezier(0.23, 1, 0.32, 1), opacity 520ms cubic-bezier(0.23, 1, 0.32, 1)",
  };
  const contentStyle: CSSProperties = {
    minHeight: heroHeight,
    transform: prefersReducedMotion
      ? "none"
      : `translate3d(0, ${scrollProgress * -10}px, 0)`,
    transition: prefersReducedMotion
      ? "none"
      : "transform 260ms cubic-bezier(0.23, 1, 0.32, 1)",
  };

  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen w-full overflow-hidden bg-[#f1e2d1]"
      style={sectionStyle}
    >
      <div
        className="relative isolate z-10 flex w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#1e5247] to-[#9cb080]"
        style={shellStyle}
      >
        <TunnelArtwork />

        <div
          className="relative z-40 flex h-full min-h-[inherit] w-full flex-col items-center justify-between px-4 pb-16 pt-32 sm:pt-24 text-center sm:justify-center sm:py-8 sm:px-6 lg:px-8 pointer-events-none"
          style={contentStyle}
        >
          <div className="flex flex-col items-center justify-center sm:mb-0">
            <div
              className={`mb-2 flex w-full items-center justify-center gap-2 sm:gap-3 pointer-events-auto ${
                isVisible ? "fade-up" : "opacity-0"
              }`}
            >
              <span className="hidden shrink-0 sm:inline-block">
                <img
                  src="/images/logob.png"
                  alt="SNGM logo"
                  className="h-16 w-16 object-contain lg:h-20 lg:w-20 xl:h-28 xl:w-28"
                />
              </span>
              <h1
                className={`text-6xl font-bold leading-none tracking-wider text-shadow-lg text-[#fff4e7] sm:text-7xl lg:text-8xl ${
                  isVisible ? "fade-up fade-up-delay-1" : "opacity-0"
                }`}
              >
                <span className="inline sm:hidden">SNGM</span>
                <span className="hidden sm:inline">PORTFOLIO</span>
              </h1>
            </div>

            <p
              className={`mb-4 max-w-xl px-1 text-base leading-relaxed text-[#fff4e7] sm:mb-6 sm:text-lg lg:text-xl pointer-events-auto ${
                isVisible ? "fade-up fade-up-delay-2" : "opacity-0"
              }`}
            >
              Welcome to my creative world!
            </p>
          </div>

          <div
            className={`w-full max-w-xs sm:max-w-none flex flex-col justify-center gap-2.5 sm:w-auto sm:flex-row sm:gap-4 pointer-events-auto sm:mt-6 ${
              isVisible ? "fade-up fade-up-delay-3" : "opacity-0"
            }`}
          >
            <a
              href="#work"
              className={`w-full rounded-full bg-[#cb2957] px-5 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold text-[#fff4e7] sm:w-auto ${BUTTON_HOVER_CLASSES}`}
            >
              View My Work
            </a>
            <a
              href="/Sophia_Miranda_Resume.pdf"
              download="Sophia_Miranda_Resume.pdf"
              className={`w-full rounded-full border border-[#f1e2d1] px-5 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold text-[#fff4e7] sm:w-auto ${TRANSITION_CLASSES}`}
            >
              View My Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export { HeroSix, TunnelArtwork };