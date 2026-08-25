import type { CSSProperties } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useScrollRevealProgress, useScrollWordProgress } from "../hooks/useScrollRevealProgress";

const mainParagraph =
  "I'm a passionate Multimedia Arts graduate with a deep love for visual storytelling and creative expression. My journey spans digital design, animation, and interactive media creation.";

const mainParagraphWords = mainParagraph.split(" ");

export default function About() {
  const { ref, isVisible } = useScrollAnimation();
  const { progress: aboutTransitionProgress } = useScrollRevealProgress("work");
  const { progress: wordProgress, reduceMotion } = useScrollWordProgress("about");
  const handoffProgress = wordProgress >= 1 ? aboutTransitionProgress : 0;

  const aboutRevealStyle: CSSProperties | undefined = reduceMotion
    ? undefined
    : {
        opacity: 1 - handoffProgress * 0.58,
        filter: `blur(${handoffProgress * 11}px)`,
        transform: `translate3d(0, ${handoffProgress * -44}px, 0) scale(${1 - handoffProgress * 0.025})`,
        transformOrigin: "center top",
        willChange: "filter, opacity, transform",
      };

  const highlightedWordCount = reduceMotion
    ? mainParagraphWords.length
    : Math.floor(wordProgress * mainParagraphWords.length);

  return (
    <section
      ref={ref}
      id="about"
      className={`relative mt-15 pt-15 px-6 ${reduceMotion ? "" : "min-h-[190vh]"}`}
    >
      {/* The sticky frame keeps the paragraph in view while each word is revealed. */}
      <div
        className={
          reduceMotion
            ? ""
            : "sticky top-0 flex min-h-screen items-center"
        }
      >
        <div className="max-w-6xl mx-auto w-full" style={aboutRevealStyle}>
          {/* 2-Column Grid starting at the very top */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column: Header + Bio Texts */}
            <div className="space-y-8">
              {/* Section Header (Now nested here to align with the image top) */}
              <div
                className={`${reduceMotion ? "opacity-100" : isVisible ? "fade-up" : "opacity-0"}`}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  About <span className="text-sred">Me</span>
                </h2>
                {/* Artistic separator */}
                <div className="w-16 h-1 bg-gradient-to-r from-tred to-accent rounded-full"></div>
              </div>

              {/* Bio Paragraphs */}
              <div
                className={`${reduceMotion ? "opacity-100" : isVisible ? "fade-up fade-up-delay-1" : "opacity-0"} space-y-6`}
              >
                {/* Main paragraph */}
                <p
                  className="text-[30px] text-foreground leading-relaxed"
                  aria-label={mainParagraph}
                >
                  {mainParagraphWords.map((word, index) => {
                    const isHighlighted = index < highlightedWordCount;

                    return (
                      <span key={`${word}-${index}`}>
                        <span
                          className="inline rounded-[0.2em] px-[0.08em] py-[0.02em] transition-colors duration-150"
                          style={{
                            backgroundColor: isHighlighted
                              ? "rgba(254, 73, 123, 0.92)"
                              : "transparent",
                            color: isHighlighted ? "#1e5247" : undefined,
                          }}
                        >
                          {word}
                        </span>
                        {index < mainParagraphWords.length - 1 ? " " : null}
                      </span>
                    );
                  })}
                </p>
                {/* Secondary paragraph */}
                <p className="text-[20px] text-muted-foreground leading-relaxed">
                  With a strong foundation in both artistic principles and
                  technical skills, I create work that's not only visually
                  stunning but also purposeful and engaging. I believe in the
                  power of design to communicate, inspire, and transform.
                </p>
              </div>
            </div>

            {/* Right Column: Image */}
            <div
              className={`flex justify-center ${reduceMotion ? "opacity-100" : isVisible ? "fade-up" : "opacity-0"}`}
            >
              {/* Constrained container to prevent the image from expanding too large on wide screens */}
              <div className="w-full max-w-md">
                <img
                  src="/public/images/id.png"
                  alt="Multimedia Artist Profile"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
