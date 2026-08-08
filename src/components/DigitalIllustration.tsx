import Gallery, { type GalleryProject } from "./Gallery";

// Digital Illustration project compilation data
const projects: GalleryProject[] = [
  {
    id: 1,
    title: "Digital Canvas Series",
    category: "Digital Illustration",
    description:
      "A collection of digital paintings exploring themes of nature and abstraction.",
    fullDescription:
      "This series represents my exploration of digital painting techniques, combining traditional art principles with modern digital tools. Each piece tells a unique story through color, composition, and emotional depth. The core challenge was translating ephemeral concepts into vivid digital forms.",
    images: [
      "/projects/illustrations/bami.png",
      "/projects/illustrations/beef rendang.png",
      "/projects/illustrations/binakol.png",
      "/projects/illustrations/buntaa.png",
      "/projects/illustrations/chicken inasal.png",
      "/projects/illustrations/humba.png",
      "/projects/illustrations/inun-unan.png",
      "/projects/illustrations/kinilaw.png",
      "/projects/illustrations/la paz batchoy.png",
      "/projects/illustrations/lechon.png",
      "/projects/illustrations/lumpia.png",
      "/projects/illustrations/satti de zamboanga.png",
      "/projects/illustrations/sinuglaw.png",
      "/projects/illustrations/tiyula itum.png",
      "/projects/illustrations/utan.png",
    ],
    tags: ["Illustration", "Digital Art", "Concept Art"],
    year: "2023",
    tools: ["Procreate", "Adobe Photoshop", "Clip Studio Paint"],
    link: "#",
    github: "#",
  },

  {
      id: 2,
      title: "Characters Design Showcase",
      category: "Animation",
      description:
        "Animated sequences and motion graphics for brand storytelling.",
      fullDescription:
        "A comprehensive motion graphics project featuring animated sequences designed for brand storytelling. This work showcases smooth transitions, dynamic typography, and engaging visual narratives. It emphasizes fluid movement and impactful visual communication.",
      images: [
        "/projects/illustrations/ALUCARD SHATTERED.jpg",
        "/projects/illustrations/CHARACTER STUDY.png",
        "/projects/illustrations/THE GHOST CHARACTER.png",
        "/projects/illustrations/DEATH NOTE FINAL MIRANDA.jpg",
        "/projects/illustrations/miranda-poster.jpg",
      ],
      tags: ["Animation", "Motion Graphics", "Branding"],
      year: "2023",
      tools: ["After Effects", "Cinema 4D", "Adobe Premiere"],
      link: "#",
      github: "#",
    },
];

export default function DigitalIllustration() {
  return (
    <div className="space-y-20">
      {projects.map((project) => (
        <section key={project.id} className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            {/* Category Tag - Prominent */}
            <span className="text-sm font-semibold text-accent uppercase tracking-widest border border-primary/50 px-3 py-1 rounded-full mb-3 inline-block">
              {project.category}
            </span>
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              {project.title}
            </h1>
            {/* Short Description */}
            <p className="text-xl text-muted-foreground max-w-4xl">
              {project.description}
            </p>
          </div>

          {/* Gallery Showcase - 3D carousel of project images */}
          <div className="mb-16">
            <Gallery currentProject={project} />
          </div>

          {/* Details Grid */}
          <div className="grid lg:grid-cols-3 gap-10 mb-16">
            {/* Full Description & Context */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold text-foreground border-b border-secondary/20 pb-2">
                Project Overview
              </h2>
              <p className="text-lg text-foreground leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Metadata & CTAs */}
            <div className="space-y-8">
              {/* Metadata Card */}
              <div className="bg-secondary/10 p-6 rounded-xl border border-secondary/30">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Details
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-3 text-foreground">
                    <span className="font-semibold">Category:</span>{" "}
                    {project.category}
                  </p>
                  <p className="flex items-center gap-3 text-foreground">
                    <span className="font-semibold">Year:</span> {project.year}
                  </p>
                  <div className="pt-2 border-t border-secondary/20">
                    <h4 className="text-foreground font-semibold mb-2">
                      Tools Used:
                    </h4>
                    <ul className="text-muted-foreground list-disc list-inside ml-2 space-y-1">
                      {project.tools.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tags Section */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary/20 text-accent rounded-full text-sm font-medium hover:bg-primary/50 hover:text-primary-foreground smooth-transition cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
