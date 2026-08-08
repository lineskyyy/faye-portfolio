import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileText,
  FileX,
  X,
  Info,
} from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Configure the pdf.js worker for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

// Renders all pages of a PDF into image data URLs (fitted to the viewport)
async function renderPdfPages(
  url: string,
  onProgress?: (percent: number) => void,
): Promise<string[]> {
  const loadingTask = pdfjsLib.getDocument({ url });
  const pdf = await loadingTask.promise;
  const pages: string[] = [];
  const total = pdf.numPages;

  for (let i = 1; i <= total; i++) {
    const page = await pdf.getPage(i);
    const viewport1 = page.getViewport({ scale: 1 });
    const baseScale = Math.min(1600 / viewport1.width, 1600 / viewport1.height);
    const viewport = page.getViewport({ scale: Math.max(baseScale, 1) });

    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      pages.push("");
      continue;
    }

    await page.render({ canvas, canvasContext: ctx, viewport }).promise;
    pages.push(canvas.toDataURL("image/jpeg", 0.92));

    // Report progress after each page (start at 10% so the bar moves immediately)
    if (onProgress) {
      onProgress(Math.round((i / total) * 100));
    }
  }

  return pages;
}

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

export default function Gallery({
  currentProject,
}: {
  currentProject?: GalleryProject;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [pdfPages, setPdfPages] = useState<string[]>([]);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [progress, setProgress] = useState(0);
  const requestedUrlRef = useRef<string | null>(null);

  // Safely extract properties using optional chaining
  const images = currentProject?.images || [];
  const hasPdf = Boolean(currentProject?.pdfUrl);

  const goTo = useCallback(
    (dir: number) => {
      if (pdfPages.length > 0) {
        setSelectedIndex(
          (prev) => (prev + dir + pdfPages.length) % pdfPages.length,
        );
        return;
      }
      setSelectedIndex((prev) => (prev + dir + images.length) % images.length);
    },
    [images.length, pdfPages.length],
  );

  const openViewer = useCallback(() => {
    setSelectedIndex(0);
    setIsOpen(true);

    if (hasPdf && currentProject?.pdfUrl) {
      // Guard against stale async results from a previously requested PDF.
const url = currentProject.pdfUrl;
      requestedUrlRef.current = url;
      setPdfError(false);
      setPdfPages([]);
      setPdfLoading(true);
      setProgress(0);

      // Skip rendering if already cached for this URL
      renderPdfPages(url, (percent) => {
        if (requestedUrlRef.current === url) setProgress(percent);
      })
        .then((rendered) => {
          // Only apply state if this is still the most recent request.
          if (requestedUrlRef.current === url && rendered.length > 0) {
            setPdfPages(rendered);
          }
        })
        .catch((err) => {
          console.error("PDF.js failed to render PDF:", err);
          if (requestedUrlRef.current === url) {
            setPdfError(true);
          }
        })
        .finally(() => {
          if (requestedUrlRef.current === url) {
            setPdfLoading(false);
          }
        });
    }
  }, [hasPdf, currentProject?.pdfUrl]);

  const close = useCallback(() => {
    setIsOpen(false);
    requestedUrlRef.current = null;
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft") goTo(-1);
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, goTo, close]);

  // Guard clause: Return early if currentProject is undefined or lacks assets
  if (!currentProject || (images.length === 0 && !hasPdf)) return null;

  // When viewing a PDF in the modal we show PDF pages; otherwise preview images.
  const isPdfView = hasPdf && isOpen;
  const isPdfLoading = isPdfView && (pdfLoading || pdfPages.length === 0);
  const displayImages = isPdfView && pdfPages.length > 0 ? pdfPages : images;
  const displayCount = displayImages.length;

  return (
    <div className="relative w-full">
      {/* Action Button: Opens Fullscreen Presentation View or Image Lightbox */}
      <div className="flex justify-end mb-4">
        <button
          onClick={openViewer}
          aria-label={
            hasPdf ? "View full PDF presentation" : "Open gallery in fullscreen"
          }
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary hover:bg-tred/20 hover:text-tred transition-all duration-300 hover:scale-105 text-sm font-medium backdrop-blur-sm"
        >
          {hasPdf ? <FileText size={16} /> : <Maximize2 size={16} />}
          {hasPdf ? "View PDF" : "Expand View"}
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
              onClick={() => setSelectedIndex(i)}
            >
              <img
                src={img || "/placeholder.svg"}
                alt={`${currentProject?.title ?? "Project"} preview ${i + 1}`}
                className="w-[78vw] sm:w-[280px] md:w-[340px] h-[150px] sm:h-[190px] md:h-[240px] object-cover rounded-xl border border-accent/20 shadow-[0_0_20px_rgba(254,73,123,0.4)] mx-auto"
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
            className="p-3 rounded-full bg-secondary/10 border border-secondary/30 text-secondary hover:bg-pred/20 hover:text-tred transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => goTo(1)}
            aria-label="Next image"
            className="p-3 rounded-full bg-secondary/10 border border-secondary/30 text-secondary hover:bg-pred/20 hover:text-tred transition-all duration-300 hover:scale-110"
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
              onClick={() => setSelectedIndex(i)}
              aria-label={`View page ${i + 1}`}
              className={`w-14 h-10 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                i === selectedIndex
                  ? "border-pred scale-110 shadow-[0_0_20px_rgba(254,73,123,0.4)]"
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
            onClick={close}
          >
            {/* Modal Header */}
            <div
              className="w-full flex items-center justify-between shrink-0 z-10 pb-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h3 className="text-white font-semibold text-base sm:text-lg flex items-center gap-2">
                  {currentProject?.title}
                  {hasPdf && (
                    <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full border border-accent/30 font-normal">
                      Presentation Mode
                    </span>
                  )}
                </h3>
                <p className="text-xs text-white/60">
                  {isPdfLoading
                    ? "Loading presentation..."
                    : `Page ${Math.min(selectedIndex + 1, displayCount || 1)} of ${
                        displayCount || 1
                      }`}
                </p>
              </div>

              <button
                onClick={close}
                aria-label="Close modal"
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Stage: Whole page fitted to screen */}
            <div
              className="relative flex-1 w-full h-full min-h-0 my-2 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
{/* Loading state: hide all slides to avoid showing misleading images */}
              {isPdfLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20 bg-black/80 backdrop-blur-sm rounded-lg">
                  <span
                    className="smooth-spinner"
                    role="status"
                    aria-label="Loading"
                  />
                  <p className="text-sm text-white/80 font-medium text-center px-6">
                    Rendering presentation pages, some PDF may take a while to
                    load...
                  </p>
                  {/* Percentage progress bar */}
                  <div className="w-56 max-w-[70vw]">
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
                        style={{ width: `${Math.max(progress, 4)}%` }}
                      />
                    </div>
                    <p className="text-xs text-white/70 text-center mt-2 font-semibold tabular-nums">
                      {progress > 0 ? `${progress}%` : "Preparing..."}
                    </p>
                  </div>
                </div>
              )}

              {/* Error state */}
              {isPdfView && pdfError && !pdfLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20 bg-black/80 backdrop-blur-sm rounded-lg text-center px-6">
                  <FileX size={40} className="text-accent" />
                  <p className="text-sm text-white/80 font-medium max-w-md">
                    Unable to load the PDF presentation.
                  </p>
                </div>
              )}

              {/* Slide display (images for non-PDF lightbox, or PDF pages when loaded) */}
              {displayImages.length > 0 && !isPdfLoading && (
                <img
                  key={selectedIndex}
                  src={displayImages[selectedIndex] || "/placeholder.svg"}
                  alt={`${currentProject?.title ?? "Project"} page ${
                    selectedIndex + 1
                  }`}
                  className="absolute inset-0 m-auto max-h-full max-w-full object-contain rounded-lg shadow-2xl animate-in fade-in"
                />
              )}

              {/* Side Page-by-Page Navigation Buttons */}
              {displayCount > 1 && (
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
              {hasPdf && !isPdfLoading && !pdfError && (
                <div className="flex items-center gap-2 text-xs text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Info size={14} className="text-accent shrink-0" />
                  <span>
                    Viewing the presentation deck page-by-page, fitted to the
                    screen.
                  </span>
                </div>
              )}

              {/* Thumbnail Strip for Direct Page Jump */}
              {displayCount > 1 && !isPdfLoading && (
                <div className="w-full overflow-x-auto py-1 flex items-center justify-center gap-2 sm:gap-3 no-scrollbar">
                  {displayImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedIndex(i)}
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
          document.body,
        )}
    </div>
  );
}
