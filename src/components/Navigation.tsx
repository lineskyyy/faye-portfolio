import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const TRANSITION_CLASSES =
  "transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isHeroPage, setIsHeroPage] = useState(false);

  useEffect(() => {
    let scrollFrame = 0;

    const updateScrollState = () => {
      scrollFrame = 0;
      setIsScrolled(window.scrollY > 16);

      const hero = document.getElementById("hero");
      setIsHeroPage(Boolean(hero));

      const heroBottom = hero?.getBoundingClientRect().bottom ?? window.innerHeight;
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

  const surfaceClasses = !isHeroPage
    ? "border-transparent bg-transparent text-pred shadow-none"
    : isPastHero
      ? "border-transparent bg-transparent text-pred shadow-none backdrop-blur-md"
      : "border-[#1e5247]/[0.08] bg-[#fff4e7] text-[#1e5247] shadow-sm";

  const linkClassName = !isHeroPage
    ? "inline-flex items-center rounded-md px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-pred hover:bg-pred/10 hover:text-pred"
    : isPastHero
      ? "inline-flex items-center rounded-md px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-pred hover:bg-pred/10 hover:text-pred"
      : "inline-flex items-center rounded-md px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[#1e5247] hover:bg-[#1e5247]/[0.08] hover:text-[#1e5247]";

  const ctaClassName = !isHeroPage
    ? "inline-flex items-center rounded-md bg-transparent px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-pred hover:bg-pred/10"
    : isPastHero
      ? "inline-flex items-center rounded-md bg-transparent px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-pred hover:bg-pred/10"
      : "inline-flex items-center rounded-md bg-[#1e5247] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[#fff4e7] hover:bg-[#163d35]";

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex max-w-7xl items-start justify-between px-3 transition-[padding] duration-300 ease-out sm:px-6 lg:px-8 ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <Link
          to="/"
          aria-label="SNGM home"
          className={`pointer-events-auto inline-flex items-center gap-3 rounded-xl border border-transparent bg-transparent px-3 py-2 text-xl font-medium tracking-tight hover:-translate-y-0.5 hover:shadow-md ${
            isHeroPage && !isPastHero ? "text-[#fff4e7]" : "text-pred"
          } ${TRANSITION_CLASSES}`}
        >
          <img
            src="/public/images/logow.png"
            alt="SNGM logo"
            className="h-20 w-20 object-contain sm:h-14 sm:w-14"
          />
          {/* <span className="hidden sm:inline">SNGM</span> */}
        </Link>

        <div
          className={`pointer-events-auto hidden items-center gap-1 rounded-xl border p-1.5 md:flex ${surfaceClasses} ${TRANSITION_CLASSES}`}
        >
          {navItems.map((item) =>
            item.href.startsWith("#") ? (
              <a key={item.label} href={item.href} className={linkClassName}>
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.href} className={linkClassName}>
                {item.label}
              </Link>
            ),
          )}
          <Link to="/contact" className={ctaClassName}>
            Get in touch
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className={`pointer-events-auto rounded-xl border p-3 hover:-translate-y-0.5 hover:shadow-md md:hidden ${surfaceClasses} ${TRANSITION_CLASSES}`}
        >
          {isOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
        </button>

        {isOpen && (
                    <div
            className={`pointer-events-auto absolute right-3 top-full mt-2 w-[min(18rem,calc(100vw-1.5rem))] rounded-2xl border p-2 shadow-xl md:hidden ${
              isHeroPage && !isPastHero
                ? "border-[#1e5247]/[0.08] bg-[#fff4e7] text-[#1e5247]"
                : "border-transparent bg-transparent text-pred"
            }`}>
            <div className="flex flex-col gap-1">
              {navItems.map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`${linkClassName} justify-start`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`${linkClassName} justify-start`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <Link
                to="/contact"
                className={ctaClassName}
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
