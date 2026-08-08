import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

const TRANSITION_CLASSES = "transition-all duration-300 ease-in-out" // NEW CONSTANT

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-transparent backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        <Link
          to="/"
          // REPLACED smooth-transition
          className={`text-2xl font-bold bg-gradient-to-r from-pred to-secondary bg-clip-text text-transparent hover:from-accent hover:to-pred ${TRANSITION_CLASSES}`}
        >
          <img
                src="/public/images/logow.png"
                alt="sngm"
                className="w-15 h-15 object-contain"
              />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) =>
            item.href.startsWith("#") ? (
              <a
                key={item.label}
                href={item.href}
                // REPLACED smooth-transition
                className={`text-lg font-medium text-foreground hover:text-sred ${TRANSITION_CLASSES}`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                // REPLACED smooth-transition
                className={`text-lg font-medium text-foreground hover:text-sred ${TRANSITION_CLASSES}`}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          // REPLACED smooth-transition
          className={`md:hidden p-2 hover:bg-secondary/20 rounded-lg ${TRANSITION_CLASSES}`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-secondary/30 md:hidden">
            <div className="flex flex-col gap-4 p-6">
              {navItems.map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    // REPLACED smooth-transition
                    className={`text-sm font-medium text-foreground hover:text-primary ${TRANSITION_CLASSES}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    // REPLACED smooth-transition
                    className={`text-sm font-medium text-foreground hover:text-primary ${TRANSITION_CLASSES}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}