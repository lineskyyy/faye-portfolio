import { useEffect, useRef, useState, type CSSProperties } from "react";
import ElasticMesh from "./ElasticMesh";
import MoltenMetal from "./MoltenMetal";

const BUTTON_HOVER_CLASSES =
  "transition-[transform,box-shadow,background-color] duration-200 ease-out shadow-lg hover:shadow-[#fe497b]/60 hover:-translate-y-0.5 active:scale-[0.98]";

const TRANSITION_CLASSES =
  "transition-[transform,background-color,color] duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]";

type QualityTier = "low" | "balanced" | "high";

type MoltenQuality = {
  speed: number;
  detail: number;
  glow: number;
  swirl: number;
  mouseStrength: number;
  targetFps: number;
  meshResolution: number;
};

const MOLTEN_QUALITY: Record<QualityTier, MoltenQuality> = {
  low: {
    speed: 0.18,
    detail: 2,
    glow: 1.05,
    swirl: 1.15,
    mouseStrength: 0.1,
    targetFps: 30,
    meshResolution: 18,
  },
  balanced: {
    speed: 0.22,
    detail: 3,
    glow: 1.15,
    swirl: 1.5,
    mouseStrength: 0.2,
    targetFps: 45,
    meshResolution: 22,
  },
  high: {
    speed: 0.25,
    detail: 5,
    glow: 1.2,
    swirl: 2,
    mouseStrength: 0.3,
    targetFps: 60,
    meshResolution: 26,
  },
};

export default function HeroFive() {
  const heroRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [qualityTier, setQualityTier] = useState<QualityTier>("balanced");

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

    const device = navigator as Navigator & { deviceMemory?: number };
    const cores = device.hardwareConcurrency || 4;
    const memory = device.deviceMemory;
    const isHighPower = cores >= 8 && (memory === undefined || memory >= 8);
    const isLowPower = cores <= 4 || (memory !== undefined && memory <= 4);
    setQualityTier(isHighPower ? "high" : isLowPower ? "low" : "balanced");

    const loadFrame = requestAnimationFrame(() => {
      setIsLoaded(true);
      setIsVisible(true);
    });

    let scrollFrame = 0;
    const updateScrollProgress = () => {
      scrollFrame = 0;
      const progress = window.scrollY > 0 ? 1 : 0;
      setScrollProgress(progress);
    };

    const handleScroll = () => {
      if (!scrollFrame) {
        scrollFrame = requestAnimationFrame(updateScrollProgress);
      }
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

  const quality = MOLTEN_QUALITY[qualityTier];
  const edgeSpace = 8 * (1 - scrollProgress);

  const heroHeight = `calc(100vh - ${edgeSpace * 2}px)`;
  const radius = Math.round(32 * (1 - scrollProgress));
  const shellTransform = prefersReducedMotion
    ? "none"
    : isLoaded
      ? "none"
      : "translate3d(0, 18px, 0) scale(0.97)";
  const contentTransform = prefersReducedMotion
    ? "none"
    : `translate3d(0, ${scrollProgress * -10}px, 0)`;

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
    transform: shellTransform,
    boxShadow: `0 24px 80px rgba(30, 82, 71, ${0.24 * (1 - scrollProgress)})`,
    transition: prefersReducedMotion
      ? "none"
      : "border-radius 260ms cubic-bezier(0.23, 1, 0.32, 1), transform 360ms cubic-bezier(0.23, 1, 0.32, 1), opacity 520ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 260ms cubic-bezier(0.23, 1, 0.32, 1)",
    transformOrigin: "center top",
  };

  const contentStyle: CSSProperties = {
    minHeight: heroHeight,
    transform: contentTransform,
    transition: prefersReducedMotion
      ? "none"
      : "transform 260ms cubic-bezier(0.23, 1, 0.32, 1)",
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-beige"
      style={sectionStyle}
    >
      <div
        className="relative isolate flex w-full items-center z-10 justify-center overflow-hidden bg-gradient-to-b from-[#1e5247] to-[#9cb080]"
        style={shellStyle}
      >
        <MoltenMetal
          className="pointer-events-none absolute inset-0 z-0"
          color1="#1e5247"
          color2="#9cb080"
          color3="#f1e2d1"
          speed={quality.speed}
          scale={3.5}
          detail={quality.detail}
          glow={quality.glow}
          coreSize={0.09}
          swirl={quality.swirl}
          fold={-0.18}
          blackPoint={0.08}
          brightness={1.15}
          colorMode="molten"
          grain={false}
          mouseInteraction
          mouseStrength={quality.mouseStrength}
          targetFps={quality.targetFps}
          opacity={0.72}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
        />

        {/* Main Content Container */}
        <div
          className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-8 text-center sm:px-6 lg:px-8 [@media(max-height:800px)]:py-4"
          style={contentStyle}
        >
          {/* Header Title Section */}
          <div
            className={`flex w-full items-center justify-center gap-2 mb-2 sm:gap-3 ${
              isVisible ? "fade-up" : "opacity-0"
            }`}
          >
            <span className="hidden sm:inline-block flex-shrink-0">
              <img
                src="/public/images/logob.png"
                alt="SNGM logo"
                className="h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16 lg:h-20 lg:w-20 xl:h-28 xl:w-28 2xl:h-32 2xl:w-32"
              />
            </span>

            <h1
              className={`font-heading text-4xl font-bold leading-none tracking-wider text-[#fff4e7] sm:text-5xl lg:text-6xl xl:text-8xl 2xl:text-9xl ${
                isVisible ? "fade-up fade-up-delay-1" : "opacity-0"
              }`}
            >
              PORTFOLIO
            </h1>
          </div>

          {/* Elastic Mesh Wrapper */}
          <div
            className={`mb-4 sm:mb-6 w-full max-w-[56rem] lg:max-w-[64rem] xl:max-w-[76rem] px-1 ${
              isVisible ? "fade-up" : "opacity-0"
            }`}
          >
            <div className="mx-auto aspect-[896/294] w-full overflow-hidden [@media(max-height:800px)]:max-w-[54rem]">
              <ElasticMesh
                image="/public/images/hero2.png"
                className="h-full w-full"
                showGrid={false}
                borderRadius={24}
                stiffness={0.06}
                damping={0.22}
                grabRadius={0.5}
                pull={0.28}
                wobble={4}
                tilt={8}
                shading={0.35}
                resolution={quality.meshResolution}
                interaction="hover"
                enabled
                style={{ touchAction: "pan-y" }}
              />
            </div>
          </div>

          <p
            className={`mb-4 sm:mb-6 max-w-xl px-1 text-base sm:text-lg lg:text-xl leading-relaxed text-[#fff4e7] ${
              isVisible ? "fade-up fade-up-delay-2" : "opacity-0"
            }`}
          >
            Welcome to my creative world!
          </p>

          <div
            className={`flex w-full max-w-xs flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4 ${
              isVisible ? "fade-up fade-up-delay-3" : "opacity-0"
            }`}
          >
            <a
              href="#work"
              className={`w-full rounded-full bg-[#cb2957] px-6 py-3 font-semibold text-[#fff4e7] sm:w-auto sm:px-8 ${BUTTON_HOVER_CLASSES}`}
            >
              View My Work
            </a>
            <a
              href="/Sophia_Miranda_Resume.pdf"
              download="Sophia_Miranda_Resume.pdf"
              className={`w-full border border-beige rounded-full px-6 py-3 font-semibold sm:w-auto sm:px-8 text-[#fff4e7] hover:bg-accent hover:text-accent-foreground ${TRANSITION_CLASSES}`}
            >
              View My Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}