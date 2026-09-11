import Gallery, { type GalleryProject } from "./Gallery";

// Presentation project compilation data (PDF-based decks with folder page images)
const projects: GalleryProject[] = [
 
  {
    id: 2,
    title: "Merlin Deck",
    category: "Presentation",
    description:
      "A zine-style presentation exploring creative layouts and editorial design approaches.",
    fullDescription:
      "A zine-style presentation that experiments with editorial layouts, mixed media, and DIY aesthetics. It explores how unconventional page structures can create a distinctive rhythm and personality for visual storytelling.",
    images: [
      "/projects/presentations/presentation2/p1.png",
      "/projects/presentations/presentation2/p2.png",
      "/projects/presentations/presentation2/p3.png",
      "/projects/presentations/presentation2/p4.png",
      "/projects/presentations/presentation2/p5.png",
    ],
    pdfUrl: "/projects/presentations/presentation2/merlin.pdf",
    tags: ["Presentation", "Infographic", "Editorial Design"],
    year: "2024",
    tools: ["Canva"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Infographic",
    category: "Presentation",
    description:
      "A zine-style presentation exploring creative layouts and editorial design approaches.",
    fullDescription:
      "A zine-style presentation that experiments with editorial layouts, mixed media, and DIY aesthetics. It explores how unconventional page structures can create a distinctive rhythm and personality for visual storytelling.",
    images: [
      "/projects/presentations/presentation3/p1.png",
      "/projects/presentations/presentation3/p2.png",
      "/projects/presentations/presentation3/p3.png",
      "/projects/presentations/presentation3/p4.png",
      "/projects/presentations/presentation3/p5.png",
    ],
    pdfUrl: "/projects/presentations/presentation3/infographic.pdf",
    tags: ["Presentation", "Infographic", "Editorial Design"],
    year: "2024",
    tools: ["Canva"],
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Midterm Pitch",
    category: "Presentation",
    description:
      "A zine-style presentation exploring creative layouts and editorial design approaches.",
    fullDescription:
      "A zine-style presentation that experiments with editorial layouts, mixed media, and DIY aesthetics. It explores how unconventional page structures can create a distinctive rhythm and personality for visual storytelling.",
    images: [
      "/projects/presentations/presentation4/p1.jpg",
      "/projects/presentations/presentation4/p2.jpg",
      "/projects/presentations/presentation4/p3.jpg",
      "/projects/presentations/presentation4/p4.jpg",
      "/projects/presentations/presentation4/p5.jpg",
    ],
    pdfUrl: "/projects/presentations/presentation4/midtermpitch.pdf",
    tags: ["Presentation", "Midterm Pitch", "Editorial Design"],
    year: "2024",
    tools: ["Canva"],
    link: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Brand Book",
    category: "Presentation",
    description:
      "A zine-style presentation exploring creative layouts and editorial design approaches.",
    fullDescription:
      "A zine-style presentation that experiments with editorial layouts, mixed media, and DIY aesthetics. It explores how unconventional page structures can create a distinctive rhythm and personality for visual storytelling.",
    images: [
      "/projects/presentations/presentation5/p1.jpg",
      "/projects/presentations/presentation5/p2.jpg",
      "/projects/presentations/presentation5/p3.jpg",
      "/projects/presentations/presentation5/p4.jpg",
      "/projects/presentations/presentation5/p5.jpg",
    ],
    pdfUrl: "/projects/presentations/presentation5/brandbook.pdf",
    tags: ["Presentation", "Brand Book", "Editorial Design"],
    year: "2024",
    tools: ["Canva"],
    link: "#",
    github: "#",
  },
  {
    id: 6,
    title: "Semiotics",
    category: "Presentation",
    description:
      "A zine-style presentation exploring creative layouts and editorial design approaches.",
    fullDescription:
      "A zine-style presentation that experiments with editorial layouts, mixed media, and DIY aesthetics. It explores how unconventional page structures can create a distinctive rhythm and personality for visual storytelling.",
    images: [
      "/projects/presentations/presentation6/p1.jpg",
      "/projects/presentations/presentation6/p2.jpg",
      "/projects/presentations/presentation6/p3.jpg",
      "/projects/presentations/presentation6/p4.jpg",
      "/projects/presentations/presentation6/p5.jpg",
    ],
    pdfUrl: "/projects/presentations/presentation6/semiotics.pdf",
    tags: ["Presentation", "Semiotics", "Editorial Design"],
    year: "2024",
    tools: ["Canva"],
    link: "#",
    github: "#",
  },
];

export default function Presentations() {
  return (
    <div className="space-y-20">
      {projects.map((project) => (
        <section key={project.id} className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            {/* Title */}
            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl text-pred font-extrabold mb-4 leading-tight">
              {project.title}
            </h1>
            {/* Short Description */}
            {/* <p className="text-xl text-about-ink max-w-4xl">
              {project.description}
            </p> */}
          </div>

          {/* Gallery Showcase - 3D carousel of presentation page images */}
          <div className="mb-16">
            <Gallery currentProject={project} />
          </div>

          {/* Details Grid */}
          <div className="grid lg:grid-cols-3 gap-10 mb-16">
            {/* Full Description & Context */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold text-pred border-b border-secondary/20 pb-2">
                Project Overview
              </h2>
              <p className="text-lg text-about-ink leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Metadata & CTAs */}
            <div className="space-y-8">
              {/* Metadata Card */}
              <div className="bg-about-ink/10 p-6 rounded-xl border border-about-ink/30">
                <h3 className="text-2xl font-bold text-sred mb-4">
                  Details
                </h3>
                <div className="space-y-3 text-sm">
                  {/* <p className="flex items-center gap-3 text-foreground">
                    <span className="font-semibold text-about-ink/80">Category:</span>{" "}
                    <span className="text-sred font-medium">{project.category}</span>
                  </p> */}
                  <p className="flex items-center gap-3 text-foreground">
                    <span className="font-semibold text-about-ink/80">Year:</span> 
                    <span className="text-sred font-medium">{project.year}</span>
                  </p>
                  <div className="pt-2 border-t border-secondary/20">
                    <h4 className="text-about-ink/80 font-semibold mb-2">
                      Tools Used:
                    </h4>
                    <ul className="text-about-ink/80 list-disc list-inside ml-2 space-y-1">
                      {project.tools.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tags Section */}
              {/* <div className="space-y-3">
                <h3 className="text-xl font-bold text-sred">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-about-ink/20 text-about-ink rounded-full text-sm font-medium hover:bg-primary/50 hover:text-primary-foreground smooth-transition cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

