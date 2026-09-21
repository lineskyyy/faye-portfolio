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
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [activeGalleryProject, setActiveGalleryProject] =
    useState<GalleryProject | null>(null);

  // Reference container to programmatically invoke the Gallery view
  const galleryContainerRef = useRef<HTMLDivElement>(null);

  const handleOpenPdfGallery = (project: PresentationItem) => {
    // 1. Map presentation item into Gallery-compliant object structure
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

    // 2. Trigger Gallery open viewer action via simulated button click
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

      {/* Focus Slice Accordion Carousel */}
      <div
        className="flex flex-col md:flex-row gap-3 h-[480px] sm:h-[540px] md:h-[560px] w-full overflow-hidden rounded-2xl"
        onMouseLeave={() => setActiveIndex(null)}
      >
        {projects.map((project, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={project.id}
              onMouseEnter={() => setActiveIndex(index)}
              className={`relative overflow-hidden rounded-xl transition-[flex-grow] duration-500 ease-in-out cursor-pointer group ${
                isActive ? "flex-[6] md:flex-[8]" : "flex-[1]"
              }`}
            >
              {/* Blurred Background Image */}
              {isActive && (
                <img
                  src={project.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover scale-110 blur-xl opacity-60 pointer-events-none"
                />
              )}

              {/* Main Display Image */}
              <img
                src={project.image}
                alt={project.title}
                className={`relative z-10 inset-0 h-full w-full transition-all duration-500 ease-out ${
                  isActive
                    ? "object-contain drop-shadow-2xl"
                    : "absolute object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105"
                }`}
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 pointer-events-none ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Hover Details & Arrow Actions */}
              {isActive && (
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex items-end justify-between gap-4 text-white z-30 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-white drop-shadow-md">
                      {project.title}
                    </h3>

                    <button
                      type="button"
                      onClick={() => handleOpenPdfGallery(project)}
                      className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold tracking-wide text-[#fff4e7] hover:text-sred transition-colors duration-200 text-left"
                    >
                      <span>View full presentation</span>
                      <ArrowUpRight size={18} />
                    </button>
                  </div>

                  {/* Arrow Action Button -> Triggers Gallery Viewer */}
                  <button
                    type="button"
                    onClick={() => handleOpenPdfGallery(project)}
                    aria-label={`Open ${project.title} presentation`}
                    className="p-3.5 sm:p-4 rounded-full bg-white/20 hover:bg-sred text-white backdrop-blur-md transition-all duration-300 transform hover:scale-110 shrink-0"
                  >
                    <ArrowUpRight size={22} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
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