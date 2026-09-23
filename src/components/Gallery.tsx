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
  pdfUrl?: string;
  tags: string[];
  year: string;
  tools: string[];
  link: string;
  github: string;
}

export default function Gallery({
  currentProject,
  fitImage = false,
}: {
  currentProject?: GalleryProject;
  fitImage?: boolean;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [pdfPages, setPdfPages] = useState<string[]>([]);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [progress, setProgress] = useState(0);
  const requestedUrlRef = useRef<string | null>(null);

  // Touch Swipe Handling for Mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const images = currentProject?.images || [];
  const hasPdf = Boolean(currentProject?.pdfUrl);
  const isZinePdf = currentProject?.pdfUrl?.endsWith("zine.pdf");

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

  // Swipe detection helpers
  const minSwipeDistance = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goTo(1);
    } else if (isRightSwipe) {
      goTo(-1);
    }
  };

  const openViewer = useCallback(() => {
    // If it's zine.pdf, open directly in a new tab instead of using the viewer
    if (isZinePdf && currentProject?.pdfUrl) {
      window.open(currentProject.pdfUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setSelectedIndex(0);
    setIsOpen(true);

    if (hasPdf && currentProject?.pdfUrl) {
      const url = currentProject.pdfUrl;
      requestedUrlRef.current = url;
      setPdfError(false);
      setPdfPages([]);
      setPdfLoading(true);
      setProgress(0);

      renderPdfPages(url, (percent) => {
        if (requestedUrlRef.current === url) setProgress(percent);
      })
        .then((rendered) => {
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
  }, [hasPdf, isZinePdf, currentProject?.pdfUrl]);

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

  if (!currentProject || (images.length === 0 && !hasPdf)) return null;

  const isPdfView = hasPdf && isOpen;
  const isPdfLoading = isPdfView && (pdfLoading || pdfPages.length === 0);
  const displayImages = isPdfView && pdfPages.length > 0 ? pdfPages : images;
  const displayCount = displayImages.length;

  return (
    <div className="relative w-full">
      {/* Action Button: PDF / Expand View */}
      {(hasPdf || images.length > 1) && (
        <div className="flex justify-end mb-4">
          {isZinePdf && currentProject?.pdfUrl ? (
            <a
              href={currentProject.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View zine PDF in a new tab"
              className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-about-ink/10 border border-about-ink/30 text-about-ink hover:bg-tred/20 hover:text-tred hover:border-tred transition-all duration-300 hover:scale-105 text-xs sm:text-sm font-medium backdrop-blur-sm"
            >
              <FileText size={16} />
              View PDF
            </a>
          ) : (
            <button
              onClick={openViewer}
              aria-label={
                hasPdf
                  ? "View full PDF presentation"
                  : "Open gallery in fullscreen"
              }
              className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-about-ink/10 border border-about-ink/30 text-about-ink hover:bg-tred/20 hover:text-tred hover:border-tred transition-all duration-300 hover:scale-105 text-xs sm:text-sm font-medium backdrop-blur-sm"
            >
              {hasPdf ? <FileText size={16} /> : <Maximize2 size={16} />}
              {hasPdf ? "View PDF" : "Expand View"}
            </button>
          )}
        </div>
      )}

      {/* Single Image View */}
      {images.length === 1 ? (
        <div
          className="relative w-fit mx-auto rounded-xl border border-accent/20 shadow-[0_0_30px_rgba(254,73,123,0.35)] overflow-hidden bg-black/40 cursor-pointer group"
          onClick={openViewer}
        >
          <img
            src={images[0] || "/placeholder.svg"}
            alt={`${currentProject?.title ?? "Project"}`}
            className="w-full max-h-[60vh] sm:max-h-[75vh] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <span className="text-xs sm:text-sm font-medium text-white/90 bg-black/50 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
              Tap to preview fullscreen
            </span>
          </div>
        </div>
      ) : (
        <>
          {/* MOBILE CAROUSEL: Touch Swipe Container (Hidden on sm and larger screens) */}
          <div className="block sm:hidden w-full">
            <div
              className="relative w-full overflow-hidden rounded-xl bg-black/20 p-2 border border-about-ink/20 touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
              >
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="w-full flex-shrink-0 flex items-center justify-center p-1"
                    onClick={openViewer}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${currentProject?.title ?? "Project"} slide ${i + 1}`}
                      className={`w-full max-h-[280px] rounded-lg ${
                        fitImage
                          ? "object-contain drop-shadow-md"
                          : "object-cover h-[220px] border border-accent/20 shadow-md"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Mobile Slide Counter Badge */}
              <div className="absolute top-3 right-3 bg-black/60 text-white/90 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 backdrop-blur-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            </div>

            {/* Mobile Pagination Indicators */}
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === selectedIndex
                      ? "w-6 bg-pred"
                      : "w-1.5 bg-about-ink/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* DESKTOP CAROUSEL: 3D Stage View (Hidden on mobile screens) */}
          <div
            className="hidden sm:block relative w-full h-[380px] md:h-[480px]"
            style={{ perspective: "2000px" }}
          >
            {images.map((img, i) => {
              const total = images.length;
              const relativeIndex = (i - selectedIndex + total) % total;
              const offset =
                relativeIndex <= total / 2
                  ? relativeIndex
                  : relativeIndex - total;
              const isSelected = i === selectedIndex;

              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 cursor-pointer group"
                  style={{
                    transform: `
          translate(-50%, -50%)
          translateX(${offset * 220}px)
          translateZ(${isSelected ? "140px" : "0px"})
          rotateY(${offset * -25}deg)
          scale(${isSelected ? 1.08 : 0.88})
          translateY(${isSelected ? "0px" : "16px"})
        `,
                    zIndex: 20 - Math.abs(offset),
                    opacity: Math.abs(offset) > 2 ? 0 : 1,
                    transition:
                      "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease",
                  }}
                  onClick={() => setSelectedIndex(i)}
                >
                  {/* Main Image */}
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${currentProject?.title ?? "Project"} preview ${i + 1}`}
                    className={`
          mx-auto transition-all duration-300
          ${
            fitImage
              ? "sm:w-[480px] md:w-[600px] sm:h-[360px] md:h-[440px] object-contain border-0 shadow-none filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
              : "rounded-xl border border-accent/20 shadow-[0_0_30px_rgba(254,73,123,0.35)] sm:w-[380px] md:w-[480px] sm:h-[300px] md:h-[380px] object-cover"
          }
        `}
                  />

                  {/* Matched Reflection */}
                  <div
                    className="absolute left-0 right-0 top-full pointer-events-none overflow-hidden"
                    style={{
                      height: fitImage ? "140px" : "110px",
                      marginTop: "4px",
                      maskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)",
                    }}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt=""
                      className={`
            mx-auto scale-y-[-1]
            ${
              fitImage
                ? "sm:w-[480px] md:w-[600px] sm:h-[360px] md:h-[440px] object-contain"
                : "sm:w-[380px] md:w-[480px] sm:h-[300px] md:h-[380px] object-cover"
            }
          `}
                      style={{
                        opacity: isSelected ? 0.4 : 0.25,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Controls Bar: Prev/Next Buttons */}
      {images.length > 1 && (
        <div className="relative z-30 flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-28">
          <button
            onClick={() => goTo(-1)}
            aria-label="Previous image"
            className="p-2.5 sm:p-3 rounded-full bg-about-ink/10 border border-about-ink/30 text-about-ink hover:bg-pred/20 hover:text-tred hover:border-tred transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={() => goTo(1)}
            aria-label="Next image"
            className="p-2.5 sm:p-3 rounded-full bg-about-ink/10 border border-about-ink/30 text-about-ink hover:bg-pred/20 hover:text-tred hover:border-tred transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}

      {/* Desktop Thumbnail Strip */}
      {images.length > 1 && (
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-3 mt-6">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`w-14 h-10 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                i === selectedIndex
                  ? fitImage
                    ? "border-none shadow-none filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
                    : "border-pred shadow-[0_0_30px_rgba(254,73,123,0.35)]"
                  : "opacity-40"
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

      {/* Fullscreen Modal View */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 select-none animate-in fade-in"
            onClick={close}
          >
            <div
              className="w-full flex items-center justify-between shrink-0 z-10 pb-2 sm:pb-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h3 className="text-white font-semibold text-sm sm:text-lg flex items-center gap-2">
                  {currentProject?.title}
                  {hasPdf && (
                    <span className="text-[10px] sm:text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full border border-accent/30 font-normal">
                      Presentation Mode
                    </span>
                  )}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/60">
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
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            <div
              className="relative flex-1 w-full h-full min-h-0 my-2 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {isPdfLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20 bg-black/80 backdrop-blur-sm rounded-lg">
                  <span
                    className="smooth-spinner"
                    role="status"
                    aria-label="Loading"
                  />
                  <p className="text-xs sm:text-sm text-white/80 font-medium text-center px-6">
                    Rendering presentation pages...
                  </p>
                  <div className="w-48 sm:w-56 max-w-[70vw]">
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
                        style={{ width: `${Math.max(progress, 4)}%` }}
                      />
                    </div>
                    <p className="text-[11px] sm:text-xs text-white/70 text-center mt-2 font-semibold tabular-nums">
                      {progress > 0 ? `${progress}%` : "Preparing..."}
                    </p>
                  </div>
                </div>
              )}

              {isPdfView && pdfError && !pdfLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20 bg-black/80 backdrop-blur-sm rounded-lg text-center px-6">
                  <FileX size={36} className="text-accent" />
                  <p className="text-xs sm:text-sm text-white/80 font-medium max-w-md">
                    Unable to load the PDF presentation.
                  </p>
                </div>
              )}

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

              {displayCount > 1 && (
                <>
                  <button
                    onClick={() => goTo(-1)}
                    aria-label="Previous page"
                    className="absolute left-1 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all duration-200 backdrop-blur-md shadow-lg hover:scale-110"
                  >
                    <ChevronLeft size={22} className="sm:w-7 sm:h-7" />
                  </button>
                  <button
                    onClick={() => goTo(1)}
                    aria-label="Next page"
                    className="absolute right-1 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all duration-200 backdrop-blur-md shadow-lg hover:scale-110"
                  >
                    <ChevronRight size={22} className="sm:w-7 sm:h-7" />
                  </button>
                </>
              )}
            </div>

            <div
              className="w-full shrink-0 flex flex-col items-center gap-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {hasPdf && !isPdfLoading && !pdfError && (
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Info size={14} className="text-accent shrink-0" />
                  <span>Viewing presentation deck page-by-page.</span>
                </div>
              )}

              {displayCount > 1 && !isPdfLoading && (
                <div className="w-full overflow-x-auto py-1 flex items-center justify-center gap-2 sm:gap-3 no-scrollbar">
                  {displayImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedIndex(i)}
                      aria-label={`Jump to page ${i + 1}`}
                      className={`relative flex-shrink-0 w-10 h-10 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-all duration-300 ${
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
