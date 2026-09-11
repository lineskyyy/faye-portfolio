import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import {
  useScrollRevealProgress,
  useScrollWordProgress,
} from "../hooks/useScrollRevealProgress";

const mainParagraph =
  "Hi, it’s Sophia! I am a Digital Artist based in the Philippines with over 3 years of experience in the creative design field. I mostly specialize in Graphic Design, Branding and Illustrations.";

const secondParagraph =
  "I graduated from De La Salle-College of Saint Benilde with a Bachelor’s Degree in Multimedia Arts. I was also a Junior Art Director Intern at Publicis and did a mentorship at Cumbria Ridge. With the experience I’ve gained from these opportunities, I know I have the skills to collaborate in a professional setting and create. And create. And create some more.";

const mainParagraphWords = mainParagraph.split(" ");
const secondParagraphWords = secondParagraph.split(" ");
const MAIN_HIGHLIGHT_END = 0.42;
const PARAGRAPH_CROSSFADE_END = 0.56;
const ID_REVEAL_START = 0.16;
const ID_REVEAL_END = MAIN_HIGHLIGHT_END;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

function HighlightedParagraph({
  words,
  progress,
  className,
  ariaLabel,
  style,
  ariaHidden,
}: {
  words: string[];
  progress: number;
  className: string;
  ariaLabel: string;
  style?: CSSProperties;
  ariaHidden?: boolean;
}) {
  const highlightedWordCount = Math.floor(progress * words.length);

  return (
    <p
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      style={style}
    >
      {words.map((word, index) => {
        const isHighlighted = index < highlightedWordCount;

        return (
          <span key={`${word}-${index}`}>
            <span
              className="inline transition-colors duration-150"
              style={{
                backgroundColor: "transparent",
                color: isHighlighted
                  ? "var(--color-about-ink)"
                  : "var(--color-about-ink-muted)",
              }}
            >
              {word}
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </p>
  );
}

export default function About() {
  const { ref, isVisible } = useScrollAnimation();
  const { progress: aboutTransitionProgress, reduceMotion } =
    useScrollRevealProgress("work");
  const { progress: wordProgress } = useScrollWordProgress("about");
  const idFrameRef = useRef<HTMLDivElement>(null);
  const aboutButtonRef = useRef<HTMLAnchorElement>(null);
  const [aboutButtonTop, setAboutButtonTop] = useState<number | null>(null);

  useEffect(() => {
    const measureButtonPosition = () => {
      const idFrame = idFrameRef.current;
      const button = aboutButtonRef.current;
      if (!button) return;

      // On mobile screens where the ID frame is hidden (offsetParent or dimensions are 0),
      // place the button directly beneath the text content.
      if (!idFrame || idFrame.offsetWidth === 0 || idFrame.offsetHeight === 0) {
        setAboutButtonTop(null);
        return;
      }

      setAboutButtonTop(idFrame.offsetTop + idFrame.offsetHeight - button.offsetHeight);
    };

    measureButtonPosition();
    window.addEventListener("resize", measureButtonPosition);
    const resizeObserver = new ResizeObserver(measureButtonPosition);
    if (idFrameRef.current) resizeObserver.observe(idFrameRef.current);
    if (aboutButtonRef.current) resizeObserver.observe(aboutButtonRef.current);

    return () => {
      window.removeEventListener("resize", measureButtonPosition);
      resizeObserver.disconnect();
    };
  }, []);

  const mainHighlightProgress = reduceMotion
    ? 1
    : clamp(wordProgress / MAIN_HIGHLIGHT_END);
  const paragraphCrossfadeProgress = reduceMotion
    ? 1
    : clamp(
        (wordProgress - MAIN_HIGHLIGHT_END) /
          (PARAGRAPH_CROSSFADE_END - MAIN_HIGHLIGHT_END),
      );
  const secondHighlightProgress = reduceMotion
    ? 1
    : clamp(
        (wordProgress - PARAGRAPH_CROSSFADE_END) /
          (1 - PARAGRAPH_CROSSFADE_END),
      );
  const bothParagraphsComplete = secondHighlightProgress >= 1;
  const handoffProgress = bothParagraphsComplete
    ? aboutTransitionProgress
    : 0;

  const aboutRevealStyle: CSSProperties | undefined = reduceMotion
    ? undefined
    : {
        opacity: 1 - handoffProgress * 0.58,
        filter: `blur(${handoffProgress * 11}px)`,
        transform: `translate3d(0, ${handoffProgress * -44}px, 0) scale(${1 - handoffProgress * 0.025})`,
        transformOrigin: "center top",
        willChange: "filter, opacity, transform",
      };

  const idRevealProgress = reduceMotion
    ? 1
    : clamp(
        (wordProgress - ID_REVEAL_START) /
          (ID_REVEAL_END - ID_REVEAL_START),
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
      {/* The sticky frame keeps the section pinned for scroll progress */}
      <div
        className={
          reduceMotion
            ? "relative"
            : "relative sticky top-0 flex min-h-screen items-center"
        }
      >
        <div
          className="relative mx-auto w-full max-w-6xl"
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
                {/* Both paragraphs share one grid cell so the crossfade does not change layout height. */}
                <div className="grid items-start">
                  <HighlightedParagraph
                    words={mainParagraphWords}
                    progress={mainHighlightProgress}
                    className="col-start-1 row-start-1 font-body text-justify text-[24px] md:text-[30px] font-medium leading-[1.15] tracking-[-0.025em]"
                    ariaLabel={mainParagraph}
                    ariaHidden={!reduceMotion && paragraphCrossfadeProgress >= 1}
                    style={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: 1 - paragraphCrossfadeProgress,
                            transition: "opacity 220ms ease-out",
                            pointerEvents:
                              paragraphCrossfadeProgress >= 1
                                ? "none"
                                : "auto",
                          }
                    }
                  />
                  <HighlightedParagraph
                    words={secondParagraphWords}
                    progress={secondHighlightProgress}
                    className="col-start-1 row-start-1 font-body text-justify text-[24px] md:text-[30px] font-medium leading-[1.35] tracking-[-0.015em]"
                    ariaLabel={secondParagraph}
                    ariaHidden={!reduceMotion && paragraphCrossfadeProgress < 1}
                    style={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: paragraphCrossfadeProgress,
                            transition: "opacity 220ms ease-out",
                            pointerEvents:
                              paragraphCrossfadeProgress < 1 ? "none" : "auto",
                          }
                    }
                  />
                </div>
              </div>
            </div>

            {/* Hidden on mobile, flexed on md screens and up */}
            <div className="hidden justify-center opacity-100 md:flex">
              <div
                ref={idFrameRef}
                className="w-full max-w-md overflow-hidden"
              >
                <img
                  src="/public/images/id.png"
                  alt="Multimedia Artist Profile"
                  className="h-full w-full object-contain"
                  style={idStyle}
                />
              </div>
            </div>
          </div>

          {/* Button placement wrapper: on desktop uses absolute positioning aligned to ID, on mobile falls back inline */}
          <div
            className={
              aboutButtonTop === null
                ? "mt-8"
                : "pointer-events-none absolute inset-x-0"
            }
            style={
              aboutButtonTop !== null
                ? { top: aboutButtonTop }
                : undefined
            }
          >
            <div className="mx-auto w-full max-w-6xl">
              <Link
                ref={aboutButtonRef}
                to="/about"
                className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-sred/70 px-5 py-3 font-body text-sm font-semibold tracking-wide text-sred transition-colors duration-200 hover:border-tred hover:text-tred focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tred focus-visible:ring-offset-4 focus-visible:ring-offset-beige"
              >
                <span>Know more about me</span>
                <span aria-hidden="true" className="text-lg leading-none">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}