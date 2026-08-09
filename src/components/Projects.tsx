import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Link } from "react-router-dom";

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation();

  const projects = [
    {
      id: 1,
      title: "Digital Illustrations",
      category: "Category of the Project",
      description: "Single sentence description here.",
      image: "/projects/illustrations/ALUCARD SHATTERED.jpg",
      hoverImage: "/projects/illustrations/DEATH NOTE FINAL MIRANDA.jpg",
      tags: ["Illustration", "Digital Art", "Concept Art"],
      tab: "illustrations",
    },
    {
      id: 2,
      title: "Presentations",
      category: "Animation",
      description:
        "Animated sequences and motion graphics for brand storytelling.",
      image: "/projects/presentations/presentation1/p4.png",
      hoverImage: "/projects/presentations/presentation1/p3.png",
      tags: ["Animation", "Motion Graphics", "Branding"],
      tab: "presentations",
    },
    {
      id: 3,
      title: "Branding",
      category: "Web Design",
      description:
        "An immersive web experience combining design and interactive elements.",
      image: "/projects/branding/p5.jpg",
      hoverImage: "/projects/branding/p9.jpg",
      tags: ["Web Design", "Interactive", "UX/UI"],
      tab: "branding",
    },
    {
      id: 4,
      title: "Graphic Designs",
      category: "3D Art",
      description: "Character modeling and design for digital media projects.",
      image: "/projects/graphicd/p9.jpg",
      hoverImage: "/projects/graphicd/p10.jpg",
      tags: ["3D Art", "Character Design", "Modeling"],
      tab: "graphic-design",
    },
  ];

  return (
    <section ref={ref} id="work" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`mb-16 ${isVisible ? "fade-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-tred">Work</span>
          </h2>
          {/* Artistic separator */}
          <div className="w-16 h-1 bg-gradient-to-r from-sred to-accent rounded-full"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            // Card with enhanced card-hover utility and scroll animation
            <Link
              to={`/work?tab=${project.tab}`}
              key={project.id}
              className={`group card-float rounded-xl overflow-hidden bg-secondary/10 border border-secondary/30 hover:-translate-y-2${
                isVisible ? "fade-up" : "opacity-0"
              }`}
              style={{
                animationDelay: isVisible ? `${(index + 1) * 0.1}s` : "0s",
              }}
            >
              {/* Image Container */}
              {/* <div className="relative overflow-hidden h-64 bg-background/20"> */}
              <div className="relative aspect-[3/2] overflow-hidden bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-accent hover:shadow-[0_0_40px_rgba(20,184,166,0.4)] hover:bg-card/80 group/image">
                {/* Main Image */}
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  // Image scale on hover for dynamic effect
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    project.hoverImage
                      ? "group-hover/image:opacity-0"
                      : "hover:scale-105"
                  }`}
                  // className="w-full h-full object-cover group-hover:scale-[1.05] smooth-transition"
                />
                {/* Hover image - slides in on hover */}
                {project.hoverImage && (
                  <img
                    src={project.hoverImage}
                    alt={`${project.title} hover`}
                    // className="slide-image absolute inset-0 w-full h-full object-cover"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 group-hover/image:opacity-100 group-hover/image:scale-105"
                  />
                )}
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 smooth-transition flex items-center justify-center">
                  <span className="text-pred font-bold text-lg p-4 border-2 border-pred rounded-full hover:bg-pred/20 smooth-transition">
                    View Details
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6">
                <span className="text-xs font-semibold text-pred uppercase tracking-widest">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-2 text-foreground group-hover:text-tred smooth-transition">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {project.description}
                </p>
                {/* Tags - Cleaner, more rounded look */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary/20 text-accent rounded-full text-sm font-medium hover:bg-secondary/50 smooth-transition cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
