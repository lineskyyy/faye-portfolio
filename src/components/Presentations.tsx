import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Gallery, { type GalleryProject } from "./Gallery";

interface PresentationItem {
  id: number;
  title: string;
  image: string;
  pdfUrl: string;
}

const projects: PresentationItem[] = [
  {
    id: 1,
    title: "Spectrovert: The Pitch",
    image: "/projects/presentations/presentation4/p1.jpg",
    pdfUrl: "/projects/presentations/presentation4/midtermpitch.pdf",
  },
  {
    id: 2,
    title: "How NFT's Corrupt The World",
    image: "/projects/presentations/presentation2/p1.png",
    pdfUrl: "/projects/presentations/presentation2/merlin.pdf",
  },
  {
    id: 3,
    title: "Nueva Ecija: Brandbook",
    image: "/projects/presentations/presentation5/p1.jpg",
    pdfUrl: "/projects/presentations/presentation5/brandbook.pdf",
  },
  {
    id: 4,
    title: "Life + Death",
    image: "/projects/presentations/presentation6/p1.jpg",
    pdfUrl: "/projects/presentations/presentation6/semiotics.pdf",
  },
];

export default function Presentations() {
  const [activeGalleryProject, setActiveGalleryProject] =
    useState<GalleryProject | null>(null);

  // Reference container to programmatically invoke the Gallery view
  const galleryContainerRef = useRef<HTMLDivElement>(null);

  const handleOpenPdfGallery = (project: PresentationItem) => {
    // Map presentation item into Gallery-compliant object structure
    const galleryItem: GalleryProject = {
      id: project.id,
      title: project.title,
      category: "Presentation",
      description: "",
      fullDescription: "",
      images: [project.image],
      pdfUrl: project.pdfUrl,
      tags: ["Presentation"],
      year: "2024",
      tools: [],
      link: "",
      github: "",
    };

    setActiveGalleryProject(galleryItem);

    // Trigger Gallery open viewer action
    setTimeout(() => {
      if (galleryContainerRef.current) {
        const actionBtn = galleryContainerRef.current.querySelector(
          "button"
        ) as HTMLButtonElement | null;
        if (actionBtn) {
          actionBtn.click();
        }
      }
    }, 50);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl text-pred font-extrabold mb-4 leading-tight">
          PROJECTS
        </h1>
        <p className="text-xl text-about-ink max-w-4xl mb-4">
          Below are a series of presentation decks I made, showing a diversity of topics—from a simple brand book to a deep dive on semiotics.
        </p>
        <p className="text-xl text-about-ink max-w-4xl">
          I am a sucker for presentations with good visuals and I like to think it translates to my own works.
        </p>
      </div>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleOpenPdfGallery(project)}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#141414] cursor-pointer border border-white/10 shadow-md hover:shadow-2xl hover:border-pred/40 transition-all duration-300"
          >
            {/* 16:9 Presentation Frame */}
            <div className="relative w-full aspect-video overflow-hidden bg-black/60">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              
              {/* Subtle hover overlay badge */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-xs font-semibold text-white bg-black/70 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
                  Click to view full deck
                </span>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="p-5 flex items-center justify-between gap-4 bg-sred border-t border-white/5">
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-wide text-beige group-hover:text-about-ink transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-xs text-beige/70 mt-0.5">
                  Presentation Deck
                </p>
              </div>

              <div className="p-2.5 rounded-full bg-white/5 group-hover:bg-sred text-white transition-all duration-300 transform group-hover:scale-110 shrink-0 border border-white/10">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hidden Gallery Instance to drive PDF page-by-page rendering & portal modal */}
      <div ref={galleryContainerRef} className="hidden">
        {activeGalleryProject && (
          <Gallery currentProject={activeGalleryProject} />
        )}
      </div>
    </div>
  );
}