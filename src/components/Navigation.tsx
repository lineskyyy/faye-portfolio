import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Palette,
  Presentation,
  Briefcase,
  Layout,
} from "lucide-react";
import { Link } from "react-router-dom";

const TRANSITION_CLASSES =
  "transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out";

const WORK_CATEGORIES = [
  { key: "branding", label: "Branding", icon: Briefcase },
  { key: "graphic-design", label: "Graphic Design", icon: Layout },
  { key: "illustrations", label: "Digital Illustration", icon: Palette },
  { key: "presentations", label: "Presentations", icon: Presentation },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isHeroPage, setIsHeroPage] = useState(false);
  const [isWorkHovered, setIsWorkHovered] = useState(false);

  useEffect(() => {
    let scrollFrame = 0;

    const updateScrollState = () => {
      scrollFrame = 0;
      setIsScrolled(window.scrollY > 16);

      const hero = document.getElementById("hero");
      setIsHeroPage(Boolean(hero));

      const heroBottom =
        hero?.getBoundingClientRect().bottom ?? window.innerHeight;
      setIsPastHero(Boolean(hero) && heroBottom <= 80);
    };

    const handleScroll = () => {
      if (!scrollFrame) {
        scrollFrame = requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  // Classes for desktop pill navbar & mobile toggle button
  const surfaceClasses = !isHeroPage
    ? "border-[#1e5247]/[0.12] bg-[#fff4e7]/80 backdrop-blur-md text-pred shadow-sm"
    : isPastHero
      ? "border-transparent bg-transparent text-pred shadow-none backdrop-blur-md"
      : "border-[#1e5247]/[0.08] bg-[#fff4e7] text-[#1e5247] shadow-sm";

  const linkClassName = !isHeroPage
    ? "inline-flex items-center rounded-md px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-pred hover:bg-pred/10 hover:text-pred"
    : isPastHero
      ? "inline-flex items-center rounded-md px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-pred hover:bg-pred/10 hover:text-pred"
      : "inline-flex items-center rounded-md px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[#1e5247] hover:bg-[#1e5247]/[0.08] hover:text-[#1e5247]";

  const ctaClassName = !isHeroPage
    ? "inline-flex items-center rounded-md bg-pred px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[#fff4e7] hover:bg-pred/90"
    : isPastHero
      ? "inline-flex items-center rounded-md bg-pred px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[#fff4e7] hover:bg-pred/90"
      : "inline-flex items-center rounded-md bg-[#1e5247] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[#fff4e7] hover:bg-[#163d35]";

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-[padding] duration-300 ease-out sm:px-6 lg:px-8 ${
          isScrolled ? "py-2.5" : "py-4"
        }`}
      >
        <Link
          to="/"
          aria-label="SNGM home"
          className={`pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-transparent bg-transparent p-1.5 text-xl font-medium tracking-tight hover:-translate-y-0.5 ${
            isHeroPage && !isPastHero ? "text-[#fff4e7]" : "text-pred"
          } ${TRANSITION_CLASSES}`}
        >
          <img
            src="/images/logow.png"
            alt="SNGM logo"
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div
          className={`pointer-events-auto hidden items-center gap-1 rounded-xl border p-1.5 md:flex ${surfaceClasses} ${TRANSITION_CLASSES}`}
        >
          <Link to="/" className={linkClassName}>
            Home
          </Link>

          <Link to="/about" className={linkClassName}>
            About
          </Link>

          {/* Work Menu Item with Hover Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsWorkHovered(true)}
            onMouseLeave={() => setIsWorkHovered(false)}
          >
            <Link to="/work" className={`${linkClassName} gap-1.5`}>
              <span>Work</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  isWorkHovered ? "rotate-180" : ""
                }`}
              />
            </Link>

            {/* Hover Dropdown */}
            {isWorkHovered && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56">
                <div className="overflow-hidden rounded-xl border border-[#1e5247]/15 bg-[#fff4e7] p-1.5 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1e5247]/60">
                    Project Categories
                  </div>
                  {WORK_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.key}
                        to={`/work?tab=${cat.key}`}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#1e5247] transition-colors hover:bg-[#1e5247]/10"
                      >
                        <Icon size={16} className="text-[#1e5247]/70" />
                        <span>{cat.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link to="/contact" className={ctaClassName}>
            Get in touch
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className={`pointer-events-auto rounded-xl border p-2.5 hover:-translate-y-0.5 hover:shadow-md md:hidden ${surfaceClasses} ${TRANSITION_CLASSES}`}
        >
          {isOpen ? (
            <X size={20} strokeWidth={2} />
          ) : (
            <Menu size={20} strokeWidth={2} />
          )}
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="pointer-events-auto absolute right-4 top-full mt-2 w-[calc(100vw-2rem)] max-w-xs rounded-2xl border border-[#1e5247]/15 bg-[#fff4e7]/95 backdrop-blur-xl p-3 text-[#1e5247] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 md:hidden">
            <div className="flex flex-col gap-1.5">
              <Link
                to="/"
                className="inline-flex w-full items-center rounded-lg px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#1e5247] hover:bg-[#1e5247]/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/about"
                className="inline-flex w-full items-center rounded-lg px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#1e5247] hover:bg-[#1e5247]/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              {/* Mobile Work Accordion / List */}
              <div className="rounded-lg bg-[#1e5247]/5 p-2">
                <Link
                  to="/work"
                  className="inline-flex w-full items-center justify-between px-2 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#1e5247]"
                  onClick={() => setIsOpen(false)}
                >
                  <span>Work</span>
                  <span className="text-[10px] font-normal lowercase text-[#1e5247]/60">
                    view all
                  </span>
                </Link>
                <div className="mt-1 flex flex-col gap-1 pl-2 border-l-2 border-[#1e5247]/20">
                  {WORK_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.key}
                        to={`/work?tab=${cat.key}`}
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-[#1e5247] hover:bg-[#1e5247]/10 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon size={14} />
                        <span>{cat.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <hr className="my-1 border-[#1e5247]/10" />
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#1e5247] px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#fff4e7] shadow-sm hover:bg-[#163d35] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Get in touch
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
