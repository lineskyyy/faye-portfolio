import type { CSSProperties } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useScrollRevealProgress } from "../hooks/useScrollRevealProgress";

type Skill = {
  name: string;
  icon: string;
};

const skills: Skill[] = [
  { name: "Adobe Illustrator", icon: "/images/ai.png" },
  { name: "Adobe Lightroom", icon: "/images/al.png" },
  { name: "Adobe Photoshop", icon: "/images/ap.png" },
  { name: "Adobe Premiere", icon: "/images/pr.png" },
  { name: "Canva", icon: "/images/canva.png" },
  { name: "Clip Studio Paint", icon: "/images/csp.png" },
];

const LOOP_SPEED = 100;
function isImagePath(iconPath: string) {
  return (
    iconPath.startsWith("/") ||
    iconPath.startsWith("http") ||
    iconPath.includes(".")
  );
}

function getWrappedOffset(offset: number, sequenceWidth: number) {
  return ((offset % sequenceWidth) + sequenceWidth) % sequenceWidth;
}

type SkillItemProps = {
  skill: Skill;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function SkillItem({
  skill,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: SkillItemProps) {
  const renderIcon = (isReflection = false) =>
    isImagePath(skill.icon) ? (
      <img
        src={skill.icon}
        alt={isReflection ? `${skill.name} reflection` : skill.name}
        aria-hidden={isReflection}
        draggable={false}
        className="w-40 h-40 object-contain select-none"
      />
    ) : (
      <span aria-hidden={isReflection} className="select-none">
        {skill.icon}
      </span>
    );

  return (
    <li
      className="relative flex h-20 w-20 shrink-0 items-center justify-center"
      role="listitem"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`absolute -top-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-tred bg-pred px-4 py-2 text-sm font-semibold text-foreground shadow-[0_0_20px_rgba(20,184,166,0.4)] backdrop-blur-md transition-all duration-200 ${
          isHovered
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        role="status"
        aria-live="polite"
      >
        {skill.name}
      </div>

      <div className="relative flex h-20 w-20 cursor-pointer items-center justify-center text-5xl transition-transform duration-300 ease-out hover:scale-125">
        <div className="absolute inset-0 rounded-xl border border-accent/20 bg-accent/10 opacity-0 shadow-[0_0_25px_rgba(20,184,166,0.3)] backdrop-blur-sm transition-opacity duration-300 hover:opacity-100" />
        <div className="relative z-10">{renderIcon()}</div>
      </div>

      <div
        className="pointer-events-none absolute left-0 top-[86px] flex h-20 w-20 items-center justify-center text-5xl opacity-40 select-none"
        aria-hidden="true"
        style={{
          transform: "scaleY(-1)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 80%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 80%)",
        }}
      >
        {renderIcon(true)}
      </div>
    </li>
  );
}

export default function Skills() {
  const { ref, isVisible } = useScrollAnimation();
  const { progress, reduceMotion } = useScrollRevealProgress("skills");

  const skillsRevealStyle: CSSProperties | undefined = reduceMotion
    ? undefined
    : {
        opacity: 0.78 + progress * 0.22,
        transform: `translate3d(0, ${(1 - progress) * 60}px, 0) scale(${0.965 + progress * 0.035})`,
        transformOrigin: "center top",
        willChange: "opacity, transform",
      };

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const [sequenceWidth, setSequenceWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(2);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const measureLoop = useCallback(() => {
    const viewportWidth = viewportRef.current?.clientWidth ?? 0;
    const measuredWidth = sequenceRef.current?.getBoundingClientRect().width ?? 0;

    if (measuredWidth > 0) {
      const nextSequenceWidth = Math.ceil(measuredWidth);
      setSequenceWidth(nextSequenceWidth);
      setCopyCount(
        Math.max(2, Math.ceil(viewportWidth / nextSequenceWidth) + 2),
      );
      offsetRef.current = getWrappedOffset(
        offsetRef.current,
        nextSequenceWidth,
      );
    }
  }, []);

  useLayoutEffect(() => {
    measureLoop();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measureLoop)
        : null;

    if (resizeObserver) {
      if (viewportRef.current) resizeObserver.observe(viewportRef.current);
      if (sequenceRef.current) resizeObserver.observe(sequenceRef.current);
    } else {
      window.addEventListener("resize", measureLoop);
    }

    const images = sequenceRef.current?.querySelectorAll("img") ?? [];
    images.forEach((image) => {
      image.addEventListener("load", measureLoop, { once: true });
      image.addEventListener("error", measureLoop, { once: true });
    });

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureLoop);
      images.forEach((image) => {
        image.removeEventListener("load", measureLoop);
        image.removeEventListener("error", measureLoop);
      });
    };
  }, [measureLoop, copyCount]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || sequenceWidth <= 0) return;

    let animationFrame = 0;
    let lastTimestamp: number | null = null;
    let velocity = 0;

    const animate = (timestamp: number) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;

      const deltaTime = Math.max(0, timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const targetVelocity = reduceMotion || hoveredKey ? 0 : LOOP_SPEED;
      const easingFactor = 1 - Math.exp(-deltaTime / 0.25);
      velocity += (targetVelocity - velocity) * easingFactor;

      offsetRef.current = getWrappedOffset(
        offsetRef.current + velocity * deltaTime,
        sequenceWidth,
      );
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      animationFrame = requestAnimationFrame(animate);
    };

    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      lastTimestamp = null;
    };
  }, [sequenceWidth, hoveredKey, reduceMotion]);

  return (
    <section ref={ref} id="skills" className="relative px-6 pt-32 md:px-16">
      <div className="container mx-auto" style={skillsRevealStyle}>
        <div
          className={`mb-16 text-center ${
            reduceMotion ? "opacity-100" : isVisible ? "fade-up" : "opacity-0"
          }`}
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            <span className="text-sred">Tools</span> &{" "}
            <span className="text-foreground">Technologies</span>
          </h2>
        </div>

        <div
          ref={viewportRef}
          className={`relative overflow-hidden pb-24 pt-12 transition-opacity duration-500 ${
            reduceMotion ? "opacity-100" : isVisible ? "fade-up opacity-100" : "opacity-0"
          }`}
          role="region"
          aria-label="Tools and technologies"
        >
          <div
            ref={trackRef}
            className="flex w-max select-none gap-20 will-change-transform"
          >
            {Array.from({ length: copyCount }, (_, copyIndex) => (
              <ul
                key={`skills-copy-${copyIndex}`}
                ref={copyIndex === 0 ? sequenceRef : undefined}
                className="flex shrink-0 items-center gap-6 pr-6 md:gap-30 md:pr-12"
                role="list"
                aria-hidden={copyIndex > 0}
              >
                {skills.map((skill, skillIndex) => {
                  const itemKey = `${copyIndex}-${skillIndex}`;
                  return (
                    <SkillItem
                      key={itemKey}
                      skill={skill}
                      isHovered={hoveredKey === itemKey}
                      onMouseEnter={() => setHoveredKey(itemKey)}
                      onMouseLeave={() => setHoveredKey(null)}
                    />
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}