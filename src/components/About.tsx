import { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import {
  useScrollRevealProgress,
  useScrollWordProgress,
} from "../hooks/useScrollRevealProgress";

const mainParagraph =
  "Hi, it’s Sophia! I am a Digital Artist based in the Philippines with over 3 years of experience in the creative design field. I mostly specialize in Graphic Design, Branding and Illustrations."
const secondParagraph =
   " "
const MAIN_HIGHLIGHT_END = 0.42;
const ID_REVEAL_START = 0.16;
const ID_REVEAL_END = MAIN_HIGHLIGHT_END;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

export default function About() {
  const { ref, isVisible } = useScrollAnimation();
  const { progress: aboutTransitionProgress, reduceMotion } =
    useScrollRevealProgress("work");
  const { progress: wordProgress } = useScrollWordProgress("about");

  const handoffProgress = aboutTransitionProgress;

  const aboutRevealStyle: CSSProperties | undefined = reduceMotion
    ? undefined
    : {
        opacity: 1 - handoffProgress * 0.58,
        filter: `blur(${handoffProgress * 11}px)`,
        transform: `translate3d(0, ${handoffProgress * -44}px, 0) scale(${1 - handoffProgress * 0.025})`,
        transformOrigin: "center top",
        willChange: "filter, opacity, transform",
      };

  // Retained ID sliding transition logic
  const idRevealProgress = reduceMotion
    ? 1
    : clamp(
        (wordProgress - ID_REVEAL_START) / (ID_REVEAL_END - ID_REVEAL_START),
      );
  const idStyle: CSSProperties | undefined = reduceMotion
    ? undefined
    : {
        transform: `translate3d(0, ${(idRevealProgress - 1) * 100}%, 0)`,
        willChange: "transform",
      };

  return (
    <section
      ref={ref}
      id="about"
      className={`relative mt-15 px-6 pt-15 ${reduceMotion ? "" : "min-h-[190vh]"}`}
    >
      <div
        className={
          reduceMotion
            ? "relative"
            : "relative sticky top-0 flex min-h-screen items-center"
        }
      >
        <div
          className="relative mt-20 mx-auto w-full max-w-6xl"
          style={aboutRevealStyle}
        >
          <div className="grid items-start gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <div
                className={`${reduceMotion ? "opacity-100" : isVisible ? "fade-up" : "opacity-0"}`}
              >
                <h2 className="font-heading mb-4 text-4xl font-bold md:text-5xl">
                  About <span className="text-sred">Me</span>
                </h2>
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-tred to-accent" />
              </div>

              <div
                className={`${reduceMotion ? "opacity-100" : isVisible ? "fade-up fade-up-delay-1" : "opacity-0"}`}
              >
                {/* Static text paragraph rendering without dynamic highlighting or crossfade */}
                <div className="space-y-6">
                  <p className="font-body text-justify text-[20px] md:text-[24px] lg:text-[30px] font-medium leading-[1.15] tracking-[-0.025em] text-[var(--color-about-ink)]">
                    {mainParagraph}
                  </p>
                  <p className="font-body text-justify text-[20px] md:text-[24px] lg:text-[30px] font-medium leading-[1.35] tracking-[-0.015em] text-[var(--color-about-ink)]">
                    {secondParagraph}
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-3 rounded-full border border-sred/70 px-5 py-3 font-body text-sm font-semibold tracking-wide text-sred transition-colors duration-200 hover:border-tred hover:text-tred focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tred focus-visible:ring-offset-4 focus-visible:ring-offset-beige"
                  >
                    <span>Know more about me</span>
                    <span aria-hidden="true" className="text-lg leading-none">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden justify-center opacity-100 md:flex">
              <div className="w-full max-w-md overflow-hidden">
                <img
                  src="/images/id.png"
                  alt="Multimedia Artist Profile"
                  className="h-full w-full object-contain"
                  style={idStyle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
