import { useState } from "react";
import Gallery, { type GalleryProject } from "./Gallery";

// Digital Illustration project compilation data
const projects: GalleryProject[] = [
  {
    id: 1,
    title: "Digital Canvas Series",
    category: "Digital Illustration",
    description:
      "A rich visual collection of traditional Filipino culinary artworks rendered in vibrant digital mediums.",
    fullDescription:
      "This series represents my exploration of digital painting techniques, combining traditional art principles with modern digital tools. Each piece tells a unique story through color, composition, and emotional depth. The core challenge was translating ephemeral culinary concepts and textures into vivid digital forms.",
    images: [
      "/projects/illustrations/bami.png",
      "/projects/illustrations/beef rendang.png",
      "/projects/illustrations/binakol.png",
      "/projects/illustrations/buntaa.png",
      "/projects/illustrations/chicken inasal.png",
      "/projects/illustrations/humba.png",
      "/projects/illustrations/inun-unan.png",
      "/projects/illustrations/kinilaw.png",
      "/projects/illustrations/la paz batchoy.png",
      "/projects/illustrations/lechon.png",
      "/projects/illustrations/lumpia.png",
      "/projects/illustrations/satti de zamboanga.png",
      "/projects/illustrations/sinuglaw.png",
      "/projects/illustrations/tiyula itum.png",
      "/projects/illustrations/utan.png",
    ],
    tags: ["Food Illustration", "Digital Painting", "Culture & Art"],
    year: "2023",
    tools: ["Procreate", "Adobe Photoshop", "Clip Studio Paint"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Characters Design Showcase",
    category: "Animation & Concept Art",
    description:
      "Character concept studies, dynamic posters, and stylized figurative illustrations.",
    fullDescription:
      "A comprehensive character illustration series featuring dynamic figures, anime-inspired aesthetic studies, and dramatic key visual art. This work explores lighting contrast, bold silhouette design, and expressive character storytelling.",
    images: [
      "/projects/illustrations/ALUCARD SHATTERED.jpg",
      "/projects/illustrations/CHARACTER STUDY.png",
      "/projects/illustrations/THE GHOST CHARACTER.png",
      "/projects/illustrations/DEATH NOTE FINAL MIRANDA.jpg",
      "/projects/illustrations/miranda-poster.jpg",
    ],
    tags: ["Character Design", "Concept Art", "Digital Painting"],
    year: "2023",
    tools: ["Procreate", "Adobe Photoshop", "After Effects"],
    link: "#",
    github: "#",
  },
];

export default function DigitalIllustration() {
  // State to track which project is actively selected for modal viewing
  const [activeModalProject, setActiveModalProject] =
    useState<GalleryProject | null>(null);

  return (
    <div className="space-y-32 py-6">
      {/* Hidden Gallery Instance to handle Modal Preview for Marquee items */}
      {activeModalProject && (
        <div className="hidden">
          <Gallery currentProject={activeModalProject} />
        </div>
      )}

      {projects.map((project) => {
        const isFoodSeries = project.id === 1;

        return (
          <section key={project.id} className="max-w-6xl mx-auto px-6">
            {/* Header Block */}
            <div className="mb-10 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest bg-accent/10 border border-accent/30 px-3 py-1 rounded-full backdrop-blur-md">
                  {project.category}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {project.year}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
                {project.title}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Showcase Stage */}
            <div className="mb-14">
              {isFoodSeries ? (
                /* Infinite Smooth Marquee with Edge Fades & Hover Pause */
                <div className="rrelative w-full overflow-hidden py-2">
                  {/* Left & Right Gradient Mask Overlays */}
                  <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10" />
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10" />

                  <div className="flex gap-5 animate-scroll hover:[animation-play-state:paused] py-2">
                    {[...project.images, ...project.images].map((img, i) => {
                      const cleanName = img
                        .split("/")
                        .pop()
                        ?.replace(".png", "")
                        .replace(".jpg", "");

                      return (
                        <div
                          key={i}
                          onClick={() => setActiveModalProject(project)}
                          className="flex-shrink-0 w-[220px] sm:w-[260px] group cursor-pointer"
                        >
                          <div className="relative aspect-square overflow-hidden transition-all duration-300 group-hover:-translate-y-1">
                            <img
                              src={img}
                              alt={cleanName ?? "Illustration"}
                              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                            />
                            {/* Subtle Text Badge below/on hover without dark card background */}
                            <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center pb-1">
                              <span className="text-xs font-semibold text-white/90 bg-black/60 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md capitalize truncate max-w-[90%]">
                                {cleanName}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* 3D Gallery Stage for Character Designs */
                  <Gallery currentProject={project} fitImage />
              )}
            </div>

            {/* Details & Description Section */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Main Narrative (8 Cols) */}
              <div className="lg:col-span-8 bg-secondary/5 p-6 sm:p-8 rounded-2xl border border-secondary/20 space-y-4">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                  Project Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  {project.fullDescription}
                </p>
              </div>

              {/* Specs Sidebar (4 Cols) */}
              <div className="lg:col-span-4 bg-secondary/10 p-6 rounded-2xl border border-secondary/30 space-y-5">
                <h3 className="text-lg font-bold text-primary">
                  Specifications
                </h3>

                <div className="space-y-4 text-sm">
                  {/* Tools */}
                  <div>
                    <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-2">
                      Tools & Software
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 bg-background/60 border border-secondary/30 rounded-md text-xs font-medium text-foreground"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="pt-3 border-t border-secondary/20">
                    <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-2">
                      Tags
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-accent/15 border border-accent/30 text-accent rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
