import { useState } from "react";
import Gallery, { type GalleryProject } from "./Gallery";

// Digital Illustration project compilation data
const projects: GalleryProject[] = [
  {
    id: 1,
    title: "Food Design",
    category: "Digital Illustration",
    description:
      "A rich visual collection of traditional Filipino culinary artworks rendered in vibrant digital mediums.",
    fullDescription:
      "This was done for an assignment to highlight some of the dishes in different parts of the Philippines. I’ve never done food-specific illustrations before but it was a pleasant challenge. Is it bad to say that it turned out better than I thought?",
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
    tools: ["Clip Studio Paint"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Character Design",
    category: "Animation & Concept Art",
    description:
      "Character concept studies, dynamic posters, and stylized figurative illustrations.",
    fullDescription:
      "This is what I enjoy doing the most, I love creating characters or fan art of characters. Some of these I designed for a class, mainly video game development. And others are personal works.",
    images: [
      "/projects/illustrations/ALUCARD SHATTERED.jpg",
      "/projects/illustrations/CHARACTER STUDY.png",
      "/projects/illustrations/THE GHOST CHARACTER.png",
      "/projects/illustrations/DEATH NOTE FINAL MIRANDA.jpg",
      "/projects/illustrations/miranda-poster.jpg",
    ],
    tags: ["Character Design", "Concept Art", "Digital Painting"],
    year: "2023",
    tools: ["Clip Studio Paint"],
    link: "#",
    github: "#",
  },
];

export default function DigitalIllustration() {
  const [activeModalProject, setActiveModalProject] =
    useState<GalleryProject | null>(null);

  return (
    <div className="space-y-20">
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
            <div className="mb-12">
              <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl text-pred font-extrabold mb-4 leading-tight">
                {project.title}
              </h1>
            </div>

            {/* Showcase Stage */}
            <div className="mb-16">
              {isFoodSeries ? (
                /* Infinite Smooth Marquee with Edge Fades & Hover Pause */
                <div className="relative w-full overflow-hidden py-2">
                  <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-beige to-transparent z-10" />
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-beige to-transparent z-10" />

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

            {/* Details Grid */}
            <div className="grid lg:grid-cols-3 gap-10 mb-16">
              {/* Full Description & Context */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-3xl font-bold text-pred border-b border-secondary/20 pb-2">
                  Project Overview
                </h2>
                <p className="text-lg text-about-ink leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Metadata & CTAs */}
              <div className="space-y-8">
                {/* Metadata Card */}
                <div className="bg-about-ink/10 p-6 rounded-xl border border-about-ink/30">
                  <h3 className="text-2xl font-bold text-sred mb-4">Details</h3>
                  <div className="space-y-3 text-sm">
                    {/* <p className="flex items-center gap-3 text-foreground">
                      <span className="font-semibold text-about-ink/80">Category:</span>{" "}
                      <span className="text-sred font-medium">{project.category}</span>
                    </p> */}
                    <p className="flex items-center gap-3 text-foreground">
                      <span className="font-semibold text-about-ink/80">
                        Year:
                      </span>{" "}
                      <span className="text-sred font-medium">
                        {project.year}
                      </span>
                    </p>
                    <div className="pt-2 border-t border-secondary/20">
                      <h4 className="text-about-ink/80 font-semibold mb-2">
                        Tools Used:
                      </h4>
                      <ul className="text-about-ink/80 list-disc list-inside ml-2 space-y-1">
                        {project.tools.map((tool) => (
                          <li key={tool}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Tags Section */}
                {/* <div className="space-y-3">
                  <h3 className="text-xl font-bold text-sred">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-about-ink/20 text-about-ink rounded-full text-sm font-medium hover:bg-primary/50 hover:text-primary-foreground smooth-transition cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
