import { useEffect, useRef, useState, type CSSProperties } from "react";
// import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

const BUTTON_HOVER_CLASSES =
  "transition-[transform,box-shadow,background-color] duration-200 ease-out shadow-lg hover:shadow-[#fe497b]/60 hover:-translate-y-0.5 active:scale-[0.98]";

const TRANSITION_CLASSES =
  "transition-[transform,background-color,color] duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]";

// const SHADER_CANVAS_STYLE: CSSProperties = {
//   position: "absolute",
//   inset: 0,
//   width: "100%",
//   height: "100%",
//   pointerEvents: "none",
// };

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function HeroTwo() {
  const heroRef = useRef<HTMLElement>(null);
  const [isShaderVisible, setIsShaderVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionQuery.matches);
      if (motionQuery.matches) {
        setIsLoaded(true);
      }
    };

    updateMotionPreference();

    const loadFrame = requestAnimationFrame(() => {
      setIsLoaded(true);
    });

    let scrollFrame = 0;
    const updateScrollProgress = () => {
      scrollFrame = 0;
      const progress = clamp(window.scrollY / (window.innerHeight * 0.9), 0, 1);
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

    const hero = heroRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setIsShaderVisible(entry.isIntersecting),
      { rootMargin: "120px 0px" },
    );

    if (hero) {
      observer.observe(hero);
    }

    return () => {
      cancelAnimationFrame(loadFrame);
      cancelAnimationFrame(scrollFrame);
      motionQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const shouldRenderShader = isShaderVisible && !prefersReducedMotion;
  const edgeSpace = 10 * (1 - scrollProgress);
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
        className="relative isolate w-full overflow-hidden bg-gradient-to-br from-[#1e5247] via-[#3e6f57] to-[#9cb080]"
        style={shellStyle}
      >
        {shouldRenderShader && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          >
            {/* <ShaderGradientCanvas
              pointerEvents="none"
              pixelDensity={0.75}
              style={SHADER_CANVAS_STYLE}
            >
              <ShaderGradient
                cDistance={3}
                color1="#f1e2d1"
                color2="#9cb080"
                color3="#1e5247"
                grain="off"
              />
            </ShaderGradientCanvas> */}
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_78%_18%,rgba(255,244,231,0.16),transparent_28%),radial-gradient(circle_at_15%_82%,rgba(203,41,87,0.14),transparent_32%)]"
        />

        <div
          className="relative z-10 w-full px-6 pb-36 pt-32 sm:px-10 lg:px-16 lg:pb-40 lg:pt-36"
          style={contentStyle}
        >
          <div className="fade-up max-w-5xl text-left">
            <div className="flex items-center gap-4 sm:gap-6">
              <img
                src="/public/images/logob.png"
                alt="SNGM logo"
                className="h-24 w-24 shrink-0 object-contain sm:h-36 sm:w-36 xl:h-40 xl:w-40"
              />

              <h1 className="text-6xl font-bold leading-none tracking-[0.12em] text-[#fff4e7] sm:text-8xl xl:text-9xl">
                PORTFOLIO
              </h1>
            </div>

            <p className="fade-up fade-up-delay-1 mt-8 ml-[7rem] max-w-xl text-left text-lg leading-relaxed text-[#fff4e7] sm:ml-[10.5rem] sm:text-xl xl:ml-[11.5rem]">
              I am Soph and I&apos;m a soap. I am Soph and I&apos;m a soap. I am
              Soph and I&apos;m a soap. I am Soph and I&apos;m a soap. I am Soph
              and I&apos;m a soap. I am Soph and I&apos;m a soap.
            </p>
          </div>

          <div className="fade-up fade-up-delay-2 absolute bottom-8 right-6 flex w-56 flex-col gap-3 sm:bottom-10 sm:right-10 lg:bottom-12 lg:right-16">
            <a
              href="#work"
              className={`w-full rounded-full bg-[#cb2957] px-8 py-3 text-center font-semibold text-[#fff4e7] ${BUTTON_HOVER_CLASSES}`}
            >
              View My Work
            </a>
            <a
              href="/Sophia_Miranda_Resume.pdf"
              download="Sophia_Miranda_Resume.pdf"
              className={`w-full rounded-full border border-[#fff4e7]/60 px-8 py-3 text-center font-semibold text-[#fff4e7] hover:bg-[#fff4e7] hover:text-[#1e5247] ${TRANSITION_CLASSES}`}
            >
              View My Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


