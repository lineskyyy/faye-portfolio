import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useRef, useState } from "react";


import { Link } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useScrollRevealProgress } from "../hooks/useScrollRevealProgress";

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

type CardState = "idle" | "opening" | "open" | "closing";

export default function Projects() {
    const { ref, isVisible } = useScrollAnimation();
  const { progress, reduceMotion } = useScrollRevealProgress("work");

  const projectsRevealStyle: CSSProperties | undefined = reduceMotion
    ? undefined
    : {
        opacity: 0.78 + progress * 0.22,
        transform: `translate3d(0, ${(1 - progress) * 60}px, 0) scale(${0.965 + progress * 0.035})`,
        transformOrigin: "center top",
        willChange: "opacity, transform",
      };

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeRect, setActiveRect] = useState<DOMRect | null>(null);
  const [cardState, setCardState] = useState<CardState>("idle");
  const closeTimer = useRef<number | null>(null);

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
      image: "/projects/presentations/presentation1/p4.png",
      hoverImage: "/projects/presentations/presentation1/p3.png",
      tags: ["Animation", "Motion Graphics", "Branding"],
      tab: "presentations",
    },
    {
      id: 3,
      title: "Branding",
      category: "Web Design",
      description:
        "An immersive web experience combining design and interactive elements.",
      image: "/projects/branding/p5.jpg",
      hoverImage: "/projects/branding/p9.jpg",
      tags: ["Web Design", "Interactive", "UX/UI"],
      tab: "branding",
    },
    {
      id: 4,
      title: "Graphic Designs",
      category: "3D Art",
      description: "Character modeling and design for digital media projects.",
      image: "/projects/graphicd/p9.jpg",
      hoverImage: "/projects/graphicd/p10.jpg",
      tags: ["3D Art", "Character Design", "Modeling"],
      tab: "graphic-design",
    },
  ];

  const openProject = (
    project: Project,
    event: ReactMouseEvent<HTMLButtonElement>,
  ) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);

    setActiveProject(project);
    setActiveRect(event.currentTarget.getBoundingClientRect());
    setCardState("opening");
  };

  const closeProject = () => {
    if (!activeProject || cardState === "closing") return;

    setCardState("closing");
    closeTimer.current = window.setTimeout(() => {
      setActiveProject(null);
      setActiveRect(null);
      setCardState("idle");
    }, 420);
  };

  useEffect(() => {
    if (!activeProject || cardState !== "opening") return;

    const frame = window.requestAnimationFrame(() => setCardState("open"));
    return () => window.cancelAnimationFrame(frame);
  }, [activeProject, cardState]);

  useEffect(() => {
    if (!activeProject) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeProject, cardState]);

  return (
    <section ref={ref} id="work" className="px-6 pb-15 md:px-8">
            <div className="mx-auto max-w-5xl" style={projectsRevealStyle}>

        <div className={`mb-10 ${reduceMotion ? "opacity-100" : isVisible ? "fade-up" : "opacity-0"}`}>
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Featured <span className="text-tred">Work</span>
          </h2>
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-sred to-accent" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(20,minmax(0,1fr))] lg:grid-rows-[380px_380px]">
          {projects.map((project, index) => {
            const cardLayout = [
              "lg:col-start-1 lg:col-span-12",
              "lg:col-start-13 lg:col-span-8",
              "lg:col-start-1 lg:col-span-8",
              "lg:col-start-9 lg:col-span-12",
            ][index];
            const isActive = activeProject?.id === project.id;

            return (
              <button
                type="button"
                key={project.id}
                onClick={(event) => openProject(project, event)}
                aria-label={`Open ${project.title}`}
                aria-hidden={isActive}
                className={`group relative min-h-[300px] overflow-hidden rounded-2xl text-left outline-none transition-[transform,opacity] duration-300 will-change-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background lg:min-h-0 ${
                  cardLayout
                } ${
                  isActive
                    ? "pointer-events-none opacity-0"
                    : isVisible
                      ? "fade-up opacity-100"
                      : "opacity-0"
                }`}
                style={{
                  animationDelay: isVisible ? `${(index + 1) * 0.1}s` : "0s",
                }}
              >
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
                <div className="relative z-10 p-5 md:p-6">
                  <p className="mb-2 text-xs font-medium tracking-wide text-white/80">
                    {project.category}
                  </p>
                  <h3 className="max-w-[22rem] text-xl font-semibold leading-tight text-white md:text-2xl">
                    {project.title}
                  </h3>
                </div>
                <span className="absolute bottom-5 right-5 z-10 translate-y-2 rounded-full border border-white/60 bg-black/10 px-4 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  View details
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {activeProject && activeRect && (
        <div
          className={`fixed inset-0 z-50 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${
            cardState === "open" ? "opacity-100" : "opacity-0"
          }`}
          role="presentation"
          onClick={closeProject}
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-title-${activeProject.id}`}
            onClick={(event) => event.stopPropagation()}
            className={`fixed z-[51] overflow-hidden rounded-2xl bg-background shadow-2xl will-change-transform transition-[transform,width,height,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              cardState === "open"
                ? "left-1/2 top-1/2 h-[min(680px,calc(100vh-32px))] w-[min(760px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2"
                : ""
            }`}
            style={
              cardState !== "open"
                ? {
                    left: activeRect.left,
                    top: activeRect.top,
                    width: activeRect.width,
                    height: activeRect.height,
                    transform: "translate3d(0, 0, 0)",
                  }
                : undefined
            }
          >
            <div className="relative h-[220px] shrink-0 overflow-hidden md:h-[360px]">
              <img
                src={activeProject.image || "/placeholder.svg"}
                alt={activeProject.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-16 text-white transition-[opacity,transform] duration-300 delay-75 md:bottom-8 md:left-8">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-white/75">
                  {activeProject.category}
                </p>
                <h3
                  id={`project-title-${activeProject.id}`}
                  className="text-2xl font-bold md:text-4xl"
                >
                  {activeProject.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close project details"
                onClick={closeProject}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-xl text-white backdrop-blur-sm transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                ×
              </button>
            </div>

            <div
              className={`space-y-5 overflow-hidden p-6 transition-[opacity,transform,max-height] duration-300 ease-out md:p-8 ${
                cardState === "open"
                  ? "max-h-[360px] translate-y-0 opacity-100"
                  : "max-h-0 -translate-y-2 opacity-0"
              }`}
            >
              <p className="text-base leading-7 text-muted-foreground">
                {activeProject.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary/20 px-3 py-1 text-sm font-medium text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/work?tab=${activeProject.tab}`}
                onClick={closeProject}
                className="inline-flex rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-80"
              >
                Explore project
              </Link>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
