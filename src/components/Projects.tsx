import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useScrollRevealProgress } from "../hooks/useScrollRevealProgress";
import BorderGlow from "./ui/BorderGlowProps";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  hoverImage?: string;
  tags: string[];
  tab: string;
};

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();

  // 1. Progress when scrolling INTO the Projects section
  const { progress: entryProgress, reduceMotion } = useScrollRevealProgress("work");

  // 2. Progress when scrolling OUT OF Projects into Skills
  const { progress: exitProgress } = useScrollRevealProgress("skills");

  // Calculate exit effect with threshold delay so blur doesn't trigger immediately
  const exitThreshold = 0.25; // Delays exit effect start until 25% scrolled into next section
  const delayedExit = Math.max(0, (exitProgress - exitThreshold) / (1 - exitThreshold));

  // 3. Combine entry reveal animation with delayed exit blur/fade out effect
  const projectsRevealStyle: CSSProperties | undefined = reduceMotion
    ? undefined
    : {
        opacity: (0.78 + entryProgress * 0.22) * (1 - delayedExit * 0.58),
        filter: `blur(${delayedExit * 11}px)`,
        transform: `translate3d(0, ${(1 - entryProgress) * 60 - delayedExit * 44}px, 0) scale(${
          (0.965 + entryProgress * 0.035) * (1 - delayedExit * 0.025)
        })`,
        transformOrigin: "center top",
        willChange: "filter, opacity, transform",
      };

  const projects: Project[] = [
    {
      id: 1,
      title: "Digital Illustrations",
      category: "Category of the Project",
      description: "Single sentence description here.",
      image: "/projects/illustrations/ALUCARD SHATTERED.jpg",
      hoverImage: "/projects/illustrations/DEATH NOTE FINAL MIRANDA.jpg",
      tags: ["Illustration", "Digital Art", "Concept Art"],
      tab: "illustrations",
    },
    {
      id: 2,
      title: "Presentations",
      category: "Animation",
      description:
        "Animated sequences and motion graphics for brand storytelling.",
      image: "/projects/presentations/presentation1/p1.png",
      hoverImage: "/projects/presentations/presentation1/p3.png",
      tags: ["Animation", "Motion Graphics", "Branding"],
      tab: "presentations",
    },
    {
      id: 3,
      title: "Graphic Designs",
      category: "3D Art",
      description: "Character modeling and design for digital media projects.",
      image: "/projects/graphicd/p9.jpg",
      hoverImage: "/projects/graphicd/p7.jpg",
      tags: ["3D Art", "Character Design", "Modeling"],
      tab: "graphic-design",
    },
    {
      id: 4,
      title: "Branding",
      category: "Web Design",
      description:
        "An immersive web experience combining design and interactive elements.",
      image: "/projects/branding/p11.jpg",
      hoverImage: "/projects/branding/p9.jpg",
      tags: ["Web Design", "Interactive", "UX/UI"],
      tab: "branding",
    },
  ];

  const handleCardClick = (tab: string) => {
    navigate(`/work?tab=${tab}`);
  };

  return (
    <section ref={ref} id="work" className="px-6 pb-12 md:px-8">
      {/* Updated max-width from max-w-4xl to max-w-6xl for consistency with About.tsx */}
      <div className="mx-auto max-w-6xl" style={projectsRevealStyle}>
        {/* Header */}
        <div
          className={`mb-6 md:mb-8 ${reduceMotion ? "opacity-100" : isVisible ? "fade-up" : "opacity-0"}`}
        >
          <h2 className="font-heading mb-4 text-4xl font-bold md:text-5xl">
            Featured <span className="text-tred">Work</span>
          </h2>
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-sred to-accent" />
        </div>

        {/* 
          Grid scaled down:
          - Mobile: height 280px
          - Small Laptop (lg): 180px fixed rows (down from 220px)
          - Large Desktop (xl): 280px fixed rows (down from 380px)
        */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-3.5 md:overflow-visible md:p-0 lg:grid-cols-[repeat(20,minmax(0,1fr))] lg:grid-rows-[180px_180px] xl:grid-rows-[280px_280px]">
          {projects.map((project, index) => {
            const cardLayout = [
              "lg:col-start-1 lg:col-span-12",
              "lg:col-start-13 lg:col-span-8",
              "lg:col-start-1 lg:col-span-8",
              "lg:col-start-9 lg:col-span-12",
            ][index];

            return (
              <button
                type="button"
                key={project.id}
                onClick={() => handleCardClick(project.tab)}
                aria-label={`View ${project.title}`}
                className={`group relative h-full min-h-[280px] w-[80vw] max-w-[280px] shrink-0 snap-center overflow-hidden rounded-xl text-left outline-none transition-[transform,opacity] duration-300 will-change-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background md:min-h-0 md:w-auto md:max-w-none md:shrink ${
                  cardLayout
                } ${
                  isVisible
                    ? "fade-up opacity-100"
                    : "opacity-0"
                }`}
                style={{
                  animationDelay: isVisible ? `${(index + 1) * 0.1}s` : "0s",
                }}
              >
                {/* BorderGlow overlay */}
                <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-xl">
                  <BorderGlow
                    glowColor="255, 255, 255"
                    glowRadius={16}
                    glowIntensity={0.5}
                  />
                </div>

                {/* Card image contents */}
                <img
                  src={project.image || "/placeholder.svg"}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                />
                {project.hoverImage && (
                  <img
                    src={project.hoverImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:scale-105 group-hover:opacity-100 group-focus-visible:scale-105 group-focus-visible:opacity-100"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/5 to-black/25" />

                {/* Card Labels & Titles */}
                <div className="absolute left-0 top-0 z-10 p-3.5 lg:p-4 xl:p-5">
                  <p className="mb-0.5 text-[11px] font-medium tracking-wide text-white/80 md:mb-1">
                    {project.category}
                  </p>

                  <h3 className="max-w-[18rem] text-base font-semibold leading-tight text-white sm:text-lg lg:text-lg xl:text-xl">
                    {project.title}
                  </h3>
                </div>

                <span className="absolute bottom-3 right-3 z-10 translate-y-2 rounded-full border border-white/60 bg-black/10 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:bottom-4 md:right-4 md:px-3 md:py-1.5">
                  View details
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}