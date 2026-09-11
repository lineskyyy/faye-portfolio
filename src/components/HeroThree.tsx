import { useEffect, useRef, useState, type CSSProperties } from "react";
import ElasticMesh from "./ElasticMesh";

const BUTTON_HOVER_CLASSES =
  "transition-[transform,box-shadow,background-color] duration-200 ease-out shadow-lg hover:shadow-[#fe497b]/60 hover:-translate-y-0.5 active:scale-[0.98]";

const TRANSITION_CLASSES =
  "transition-[transform,background-color,color] duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]";

// const clamp = (value: number, min: number, max: number) =>
//   Math.min(Math.max(value, min), max);

export default function HeroThree() {
  const heroRef = useRef<HTMLElement>(null);
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
      const progress = window.scrollY > 0 ? 1 : 0;
      setScrollProgress(progress);
      /* const progress = clamp(
        window.scrollY / (window.innerHeight * 0.35),
        0,
        1,
      );
      */
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
        className="relative isolate flex w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#1e5247] to-[#9cb080]"
        style={shellStyle}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_78%_18%,rgba(255,244,231,0.16),transparent_28%),radial-gradient(circle_at_15%_82%,rgba(203,41,87,0.14),transparent_32%)]"
        />

        <div
          className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-28 text-center sm:px-6 lg:px-8"
          style={contentStyle}
        >
          <div
            className={`flex items-center justify-center gap-4 mb-4 ${
              isVisible ? "fade-up" : "opacity-0"
            }`}
          >
            <span className="flex-shrink-0">
              <img
                src="/public/images/logob.png"
                alt="SNGM logo"
                className="h-24 w-24 object-contain sm:h-32 sm:w-32"
              />
            </span>

            <h1
              className={`text-6xl font-bold leading-none tracking-[0.12em] text-[#fff4e7] sm:text-8xl xl:text-9xl ${
                isVisible ? "fade-up fade-up-delay-1" : "opacity-0"
              }`}
            >
              PORTFOLIO
            </h1>
          </div>

          <div
            className={`mb-4 w-full max-w-6xl ${
              isVisible ? "fade-up" : "opacity-0"
            }`}
          >
            <div className="mx-auto aspect-[896/294] w-full">
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
                resolution={22}
                interaction="hover"
                enabled
                style={{ touchAction: "pan-y" }}
              />
            </div>
          </div>

          <p
            className={`mb-4 max-w-2xl text-lg leading-relaxed text-[#fff4e7] sm:text-xl ${
              isVisible ? "fade-up fade-up-delay-2" : "opacity-0"
            }`}
          >
            Welcome to my creative world!
          </p>

          <div
            className={`flex flex-col justify-center gap-4 sm:flex-row ${
              isVisible ? "fade-up fade-up-delay-3" : "opacity-0"
            }`}
          >
            <a
              href="#work"
              className={`rounded-full bg-[#cb2957] px-8 py-3 font-semibold text-[#fff4e7] ${BUTTON_HOVER_CLASSES}`}
            >
              View My Work
            </a>
            <a
              href="/Sophia_Miranda_Resume.pdf"
              download="Sophia_Miranda_Resume.pdf"
              className={`rounded-full px-8 py-3 font-semibold text-[#fff4e7] hover:bg-accent hover:text-accent-foreground ${TRANSITION_CLASSES}`}
            >
              View My Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
