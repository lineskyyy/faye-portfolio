import Navigation from "../components/Navigation"
import Hero from "../components/Hero"
import About from "../components/About"
import Projects from "../components/Projects"
import Skills from "../components/Skills"
import Contact from "../components/Contact"
import FloatingElements from "../components/FloatingElements"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <FloatingElements scrollY={scrollY} />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}
