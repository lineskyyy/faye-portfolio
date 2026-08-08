import { useState } from "react";

const skills = [
  { name: "Adobe Illustrator", icon: "/public/images/ai.png" }, 
  { name: "Adobe Lightroom", icon: "/public/images/al.png" },
  { name: "Adobe Photoshop", icon: "/public/images/ap.png" }, // Fixed typo "Aobe" to "Adobe"
  { name: "Adobe Premiere", icon: "/public/images/pr.png" },
  { name: "Canva", icon: "/public/images/canva.png" },
  { name: "Clip Studio Paint", icon: "/public/images/csp.png" },
];

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollContainerPadding = "px-6 md:px-32";

  // Helper function to check if the icon string is a URL/path or just an emoji/text
  const isImagePath = (iconPath: string) => {
    return iconPath.startsWith("/") || iconPath.startsWith("http") || iconPath.includes(".");
  };

  return (
    <section id="skills" className="pt-32 px-6 md:px-16 relative">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-sred">Tools</span> &{" "}
          <span className="text-foreground">Technologies</span>
        </h2> 

        {/* Desktop marquee (md+) */}
        <div className="hidden md:relative md:block h-auto pt-12 pb-24 overflow-hidden">
          <div className={`flex gap-12 animate-scroll ${scrollContainerPadding} z-10`}>
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={index}
                className="flex-shrink-0 relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                <div
                  className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-pred backdrop-blur-md text-foreground px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap z-20 border border-tred shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all duration-300 ${
                    hoveredIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {skill.name}
                </div>

                {/* Icon container with hover glow */}
                <div className="w-20 h-20 flex items-center justify-center text-5xl relative cursor-pointer transition-transform duration-300 ease-out group-hover:scale-125">
                  <div className="absolute inset-0 bg-accent/10 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-accent/20 shadow-[0_0_25px_rgba(20,184,166,0.3)]" />

                  {isImagePath(skill.icon) ? (
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-12 h-12 relative z-10 select-none object-contain"
                    />
                  ) : (
                    <span className="relative z-10 select-none">
                      {skill.icon}
                    </span>
                  )}
                </div>

                {/* Reflection */}
                <div
                  className="absolute left-0 w-20 h-20 flex items-center justify-center text-5xl opacity-40 pointer-events-none select-none"
                  style={{
                    top: "calc(100% + 6px)",
                    transform: "scaleY(-1)",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 80%)",
                    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 80%)",
                  }}
                >
                  {isImagePath(skill.icon) ? (
                    <img
                      src={skill.icon}
                      alt={`${skill.name} reflection`}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <span>{skill.icon}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile marquee */}
        <div className="md:hidden relative h-auto pt-8 pb-12 overflow-hidden">
          <div className={`flex gap-6 animate-scroll ${scrollContainerPadding} z-10`}>
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-28 relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                <div
                  className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-pred backdrop-blur-md text-foreground px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap z-20 border border-primary/30 shadow-[0_0_16px_rgba(20,184,166,0.35)] transition-all duration-300 ${
                    hoveredIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {skill.name}
                </div>

                {/* Icon container */}
                <div className="w-20 h-20 flex items-center justify-center text-4xl relative cursor-pointer transition-transform duration-300 ease-out group-hover:scale-110 mx-auto">
                  <div className="absolute inset-0 bg-accent/10 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-accent/20" />
                  
                  {isImagePath(skill.icon) ? (
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-12 h-12 relative z-10 select-none object-contain"
                    />
                  ) : (
                    <span className="relative z-10 select-none">
                      {skill.icon}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}