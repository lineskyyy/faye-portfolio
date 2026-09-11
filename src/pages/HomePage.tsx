import Navigation from "../components/Navigation";
// import Hero from "../components/Hero"
// import HeroFour from "../components/HeroFour";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import FloatingElements from "../components/FloatingElements";
import HeroFive from "../components/HeroFive";
import HeroSix from "../components/HeroSix";
// import { useState, useEffect } from "react";
// import HeroTwo from "../components/HeroTwo"
// import HeroThree from "../components/HeroThree";


export default function HomePage() {
  

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-beige text-foreground">
      <Navigation />
      <main>
        {/* <Hero /> */}
        {/* <HeroTwo /> */}
        {/* <HeroThree /> */}
        {/* <HeroFour /> */}
        {/* <HeroFive /> */}
        <HeroSix />
        <FloatingElements />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
