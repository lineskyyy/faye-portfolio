import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileText,
  X,
  Loader2,
  Info,
} from "lucide-react";

export interface GalleryProject {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  images: string[];
  pdfUrl?: string; // Optional PDF file path
  tags: string[];
  year: string;
  tools: string[];
  link: string;
  github: string;
}

export default function Gallery({ currentProject }: { currentProject: GalleryProject }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const images = currentProject.images || [];
  const hasPdf = Boolean(currentProject.pdfUrl);

  const goTo = useCallback(
    (dir: number) => {
      setIsLoading(true);
      setSelectedIndex((prev) => (prev + dir + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft") goTo(-1);
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, goTo]);

  if (images.length === 0 && !hasPdf) return null;

  return (
    <div className="relative w-full">
      {/* Action Button: Opens Presentation View or Image Lightbox */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setIsLoading(true);
            setIsOpen(true);
          }}
          aria-label={hasPdf ? "View full PDF presentation" : "Open gallery in fullscreen"}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-105 text-sm font-medium backdrop-blur-sm"
        >
          {hasPdf ? <FileText size={16} /> : <Maximize2 size={16} />}
          {hasPdf ? "View Presentation Deck" : "Expand View"}
        </button>
      </div>

      {/* 3D Carousel Stage */}
      <div
        className="relative w-full h-[240px] sm:h-[340px] md:h-[440px]"
        style={{ perspective: "2000px" }}
      >
        {images.map((img, i) => {
          const total = images.length;
          const relativeIndex = (i - selectedIndex + total) % total;
          const offset =
            relativeIndex <= total / 2 ? relativeIndex : relativeIndex - total;
          const isSelected = i === selectedIndex;

          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 cursor-pointer"
              style={{
                transform: `
                  translate(-50%, -50%)
                  translateX(${offset * 150}px)
                  translateZ(${isSelected ? "120px" : "0px"})
                  rotateY(${offset * -25}deg)
                  scale(${isSelected ? 1.05 : 0.9})
                  translateY(${isSelected ? "0px" : "12px"})
                `,
                zIndex: 20 - Math.abs(offset),
                opacity: Math.abs(offset) > 2 ? 0 : 1,
                transition:
                  "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease",
              }}
              onClick={() => {
                setIsLoading(true);
                setSelectedIndex(i);
              }}
            >
              <img
                src={img || "/placeholder.svg"}
                alt={`${currentProject.title} preview ${i + 1}`}
                className="w-[78vw] sm:w-[280px] md:w-[340px] h-[150px] sm:h-[190px] md:h-[240px] object-cover rounded-xl border border-accent/20 shadow-[0_0_40px_rgba(255,186,8,0.25)] mx-auto"
              />
              <div
                className="absolute left-0 right-0"
                style={{ top: "calc(100% + 8px)" }}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt=""
                  className="w-[78vw] sm:w-[280px] md:w-[340px] h-[60px] sm:h-[80px] md:h-[100px] object-cover object-bottom rounded-xl scale-y-[-1] mx-auto"
                  style={{
                    opacity: isSelected ? 0.4 : 0.3,
                    maskImage:
                      "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-6 mt-16">
          <button
            onClick={() => goTo(-1)}
            aria-label="Previous image"
            className="p-3 rounded-full bg-secondary/10 border border-secondary/30 text-secondary hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => goTo(1)}
            aria-label="Next image"
            className="p-3 rounded-full bg-secondary/10 border border-secondary/30 text-secondary hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Thumbnail Bar */}
      {images.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                setIsLoading(true);
                setSelectedIndex(i);
              }}
              aria-label={`View page ${i + 1}`}
              className={`w-14 h-10 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                i === selectedIndex
                  ? "border-primary scale-110 shadow-[0_0_12px_rgba(255,186,8,0.5)]"
                  : "border-secondary/30 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img || "/placeholder.svg"}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Page-by-Page Fullscreen Presentation Modal */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in"
            onClick={() => setIsOpen(false)}
          >
            {/* Modal Header */}
            <div
              className="w-full flex items-center justify-between shrink-0 z-10 pb-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h3 className="text-white font-semibold text-base sm:text-lg flex items-center gap-2">
                  {currentProject.title}
                  {hasPdf && (
                    <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full border border-accent/30 font-normal">
                      Presentation Mode
                    </span>
                  )}
                </h3>
                <p className="text-xs text-white/60">
                  Page {selectedIndex + 1} of {images.length}
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Stage: Displays Page-by-Page with Loader & File Size Notice */}
            <div
              className="relative flex-1 w-full h-full min-h-0 flex flex-col items-center justify-center my-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Loading Indicator */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20 bg-black/40 backdrop-blur-sm rounded-lg">
                  <Loader2 size={36} className="text-accent animate-spin" />
                  <p className="text-sm text-white/80 font-medium">Loading slide...</p>
                </div>
              )}

              {/* Full-screen Page View */}
              <img
                key={selectedIndex}
                src={images[selectedIndex] || "/placeholder.svg"}
                alt={`${currentProject.title} page ${selectedIndex + 1}`}
                onLoad={() => setIsLoading(false)}
                className={`max-h-[75vh] max-w-[88vw] w-auto h-auto object-contain rounded-lg shadow-2xl transition-all duration-300 ${
                  isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              />

              {/* Side Page-by-Page Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => goTo(-1)}
                    aria-label="Previous page"
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all duration-200 backdrop-blur-md shadow-lg hover:scale-110"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={() => goTo(1)}
                    aria-label="Next page"
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all duration-200 backdrop-blur-md shadow-lg hover:scale-110"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
            </div>

            {/* File Load Notice & Slide Strip */}
            <div
              className="w-full shrink-0 flex flex-col items-center gap-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* File Loading Notice */}
              <div className="flex items-center gap-2 text-xs text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Info size={14} className="text-accent shrink-0" />
                <span>Note: Some presentation pages may take a moment to load as file sizes are large.</span>
              </div>

              {/* Thumbnail Strip for Direct Page Jump */}
              {images.length > 1 && (
                <div className="w-full overflow-x-auto py-1 flex items-center justify-center gap-2 sm:gap-3 no-scrollbar">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setIsLoading(true);
                        setSelectedIndex(i);
                      }}
                      aria-label={`Jump to page ${i + 1}`}
                      className={`relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                        i === selectedIndex
                          ? "ring-2 ring-primary scale-105 opacity-100 shadow-[0_0_12px_rgba(255,186,8,0.4)]"
                          : "opacity-40 hover:opacity-80"
                      }`}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}