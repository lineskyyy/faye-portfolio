import { useEffect, useState, type CSSProperties } from "react";
import ElasticMesh from "./ElasticMesh";

const QUALITY_RESOLUTION = {
  low: 18,
  balanced: 22,
  high: 26,
} as const;

type QualityTier = keyof typeof QUALITY_RESOLUTION;

const ACTION_BASE =
  "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-[0.03em] transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out active:scale-[0.98]";

export default function HeroFour() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [qualityTier, setQualityTier] = useState<QualityTier>("balanced");

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      const reduced = motionQuery.matches;
      setPrefersReducedMotion(reduced);
      if (reduced) {
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
      setScrollProgress(window.scrollY > 0 ? 1 : 0);
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

  const edgeSpace = 8 * (1 - scrollProgress);
  const heroHeight = `calc(100vh - ${edgeSpace * 2}px)`;
  const radius = Math.round(32 * (1 - scrollProgress));
  const resolution = QUALITY_RESOLUTION[qualityTier];

  const sectionStyle: CSSProperties = {
    padding: `${edgeSpace}px`,
    transition: prefersReducedMotion
      ? "none"
      : "padding 480ms cubic-bezier(0.23, 1, 0.32, 1)",
  };

  const shellStyle: CSSProperties = {
    minHeight: heroHeight,
    borderRadius: `${radius}px`,
    opacity: isLoaded ? 1 : 0,
    transform: prefersReducedMotion
      ? "none"
      : isLoaded
        ? "none"
        : "translate3d(0, 20px, 0) scale(0.98)",
    boxShadow: `0 30px 90px rgba(16, 42, 37, ${0.3 * (1 - scrollProgress)})`,
    transition: prefersReducedMotion
      ? "none"
      : "border-radius 420ms cubic-bezier(0.23, 1, 0.32, 1), transform 650ms cubic-bezier(0.23, 1, 0.32, 1), opacity 650ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 420ms cubic-bezier(0.23, 1, 0.32, 1)",
  };

  const contentStyle: CSSProperties = {
    minHeight: heroHeight,
    transform: prefersReducedMotion
      ? "none"
      : `translate3d(0, ${scrollProgress * -8}px, 0)`,
    transition: prefersReducedMotion
      ? "none"
      : "transform 420ms cubic-bezier(0.23, 1, 0.32, 1)",
  };

  const reveal = (delay = "") => (isVisible ? `fade-up ${delay}` : "opacity-0");

  return (
    <section
      id="hero"
      aria-label="Sophia Miranda creative portfolio"
      className="relative min-h-screen w-full overflow-hidden bg-beige"
      style={sectionStyle}
    >
      <div
        className="relative isolate min-h-full w-full overflow-hidden bg-[#102d28] text-[#f1e2d1]"
        style={shellStyle}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-48 -top-48 z-0 h-[34rem] w-[34rem] rounded-full bg-[#cb2957]/20 blur-3xl motion-safe:animate-[float_14s_ease-in-out_infinite]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-56 -right-48 z-0 h-[38rem] w-[38rem] rounded-full bg-[#9cb080]/20 blur-3xl motion-safe:animate-[float_18s_ease-in-out_infinite]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-30 [background-image:linear-gradient(rgba(241,226,209,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(241,226,209,0.06)_1px,transparent_1px)] [background-size:4rem_4rem]"
        />

        <div
          className="relative z-10 mx-auto flex min-h-full w-full max-w-[96rem] flex-col px-5 py-[clamp(1.5rem,5vh,4rem)] sm:px-8 lg:px-14 xl:px-20"
          style={contentStyle}
        >
          {/* <header className={`flex items-center justify-between ${reveal()}`}>
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src="/public/images/logob.png"
                alt="SNGM logo"
                className="h-12 w-12 object-contain sm:h-14 sm:w-14"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f1e2d1]">
                  SNGM
                </p>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-[#f1e2d1]/50">
                  Multimedia arts
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-4 text-right sm:flex">
              <span className="h-2 w-2 rounded-full bg-[#cb2957] shadow-[0_0_18px_rgba(203,41,87,0.8)]" />
              <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#f1e2d1]/65">
                Available for selected projects
              </p>
            </div>
          </header> */}

          <main className="flex flex-1 flex-col justify-center py-12 lg:py-10">
            <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
              <div className="relative z-20 lg:pb-8">
                <div className={`mb-6 flex items-center gap-3 ${reveal()}`}>
                  <span className="h-px w-8 bg-[#cb2957]" />
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#f1e2d1]/60">
                    Portfolio / 2025
                  </span>
                </div>

                <h1
                  className={`font-heading max-w-2xl text-[clamp(3.3rem,8.5vw,8.4rem)] font-bold uppercase leading-[0.82] tracking-[-0.065em] text-[#f1e2d1] ${reveal("fade-up-delay-1")}`}
                >
                  Cock
                  <span className="block pl-[0.12em] text-[#cb2957]">
                    & Balls
                  </span>
                  <span className="block pl-[0.24em]">Scrotum.</span>
                </h1>

                <p
                  className={`mt-7 max-w-sm text-base leading-relaxed text-[#f1e2d1]/72 sm:text-lg ${reveal("fade-up-delay-2")}`}
                >
                  A tactile practice in moving image, design, and visual
                  storytelling—built with curiosity and intention.
                </p>
              </div>

              <div className={`relative z-10 ${reveal("fade-up-delay-1")}`}>
                <div className="mb-3 flex items-end justify-between px-1 text-[0.6rem] uppercase tracking-[0.25em] text-[#f1e2d1]/50">
                  <span>Featured study</span>
                  <span className="text-[#cb2957]">01 / 04</span>
                </div>

                {/* Changed aspect ratio from wide 896/294 to model-friendly proportions */}
                <div className="relative aspect-square max-w-lg  ml-auto h-auto w-full overflow-hidden rounded-[clamp(1.25rem,3vw,2.5rem)] bg-[#172b27] shadow-[0_26px_80px_rgba(0,0,0,0.34)] ring-1 ring-[#f1e2d1]/20">
                  <ElasticMesh
                    image="/public/images/logob.png"
                    className="h-full w-full"
                    showGrid={false}
                    borderRadius={28}
                    stiffness={0.06}
                    damping={0.22}
                    grabRadius={0.5}
                    pull={0.28}
                    wobble={4}
                    tilt={8}
                    shading={0.35}
                    resolution={resolution}
                    interaction="hover"
                    enabled
                    style={{ touchAction: "pan-y" }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#f1e2d1]/20 pt-3 text-[0.6rem] uppercase tracking-[0.22em] text-[#f1e2d1]/50">
                  <span>Motion / image / identity</span>
                  <span className="hidden sm:inline">Hover / Drag surface</span>
                </div>
              </div>
            </div>
          </main>

          <footer
            className={`flex flex-col gap-6 border-t border-[#f1e2d1]/20 pt-5 sm:flex-row sm:items-end sm:justify-between ${reveal("fade-up-delay-3")}`}
          >
            <div className="max-w-xs">
              <p className="text-xs uppercase tracking-[0.2em] text-[#f1e2d1]/50">
                Visual worlds for curious people.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#work"
                className={`${ACTION_BASE} bg-[#cb2957] text-[#f1e2d1] shadow-[0_12px_30px_rgba(203,41,87,0.24)] hover:-translate-y-1 hover:bg-[#dd3162] hover:shadow-[0_16px_36px_rgba(203,41,87,0.38)]`}
              >
                Explore my work
              </a>
              <a
                href="/Sophia_Miranda_Resume.pdf"
                download="Sophia_Miranda_Resume.pdf"
                className={`${ACTION_BASE} border border-[#f1e2d1]/30 text-[#f1e2d1] hover:-translate-y-1 hover:border-[#f1e2d1] hover:bg-[#f1e2d1]/10`}
              >
                Download résumé
              </a>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
