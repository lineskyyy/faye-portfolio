import Gallery, { type GalleryProject } from "./Gallery";

// Digital Illustration project compilation data
const projects: GalleryProject[] = [
  {
    id: 3,
    title: "Mock ads",
    category: "Digital Illustration",
    description:
      "A collection of digital paintings exploring themes of nature and abstraction.",
    fullDescription:
      "This series represents my exploration of digital painting techniques, combining traditional art principles with modern digital tools. Each piece tells a unique story through color, composition, and emotional depth. The core challenge was translating ephemeral concepts into vivid digital forms.",
    images: [
      "/projects/graphicd/p7.jpg",
      "/projects/graphicd/p8.jpg",
      "/projects/graphicd/p9.jpg",
    ],
    tags: ["Illustration", "Digital Art", "Concept Art"],
    year: "2023",
    tools: ["Procreate", "Adobe Photoshop", "Clip Studio Paint"],
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Kodah All Cars",
    category: "Digital Illustration",
    description:
      "A detailed vector automotive artwork showcasing stylized car lineup concepts.",
    fullDescription:
      "This piece explores precision line work, silhouette styling, and automotive design aesthetics. Created to capture clean vehicle contours with high-impact lighting and contrast.",
    images: ["/projects/graphicd/p10.jpg"],
    tags: ["Automotive", "Vector Art", "Digital Illustration"],
    year: "2023",
    tools: ["Adobe Illustrator", "Photoshop"],
    link: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Birthday Poster",
    category: "Digital Illustration",
    description:
      "A customized illustrative event poster design combining typography and portrait art.",
    fullDescription:
      "Designed as a decorative celebration piece focused on vibrant color harmonies, dynamic dynamic typography layouts, and expressive visual elements.",
    images: ["/projects/graphicd/p11.jpg"],
    tags: ["Poster Design", "Typography", "Digital Painting"],
    year: "2023",
    tools: ["Procreate", "Adobe Photoshop"],
    link: "#",
    github: "#",
  },
];

export default function GraphicDesign() {
  return (
    <div className="space-y-28">
      {projects.map((project) => {
        const isSingleImage = project.images.length === 1;
        const isBirthdayPoster = project.title === "Birthday Poster";

        if (isSingleImage) {
          return (
            <section key={project.id} className="max-w-6xl mx-auto px-6">
              <div className="grid lg:grid-cols-12 gap-10 items-center">
                {/* Details & Metadata (Swaps order for Birthday Poster) */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isBirthdayPoster ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
                      {project.title}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <div className="border-t border-secondary/20 pt-4 space-y-4">
                    <h2 className="text-xl font-bold text-foreground">
                      Project Overview
                    </h2>
                    <p className="text-base text-foreground/90 leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </div>

                  <div className="bg-secondary/10 p-5 rounded-xl border border-secondary/30 space-y-3 text-sm">
                    <p className="flex items-center gap-3 text-foreground">
                      <span className="font-semibold">Category:</span>{" "}
                      {project.category}
                    </p>
                    <p className="flex items-center gap-3 text-foreground">
                      <span className="font-semibold">Year:</span> {project.year}
                    </p>
                    <div className="pt-2 border-t border-secondary/20">
                      <h3 className="text-foreground font-semibold mb-1">
                        Tools Used:
                      </h3>
                      <p className="text-muted-foreground">
                        {project.tools.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-secondary/20 text-accent rounded-full text-xs font-medium hover:bg-primary/50 hover:text-primary-foreground smooth-transition cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual Showcase Frame */}
                <div
                  className={`lg:col-span-7 flex justify-center ${
                    isBirthdayPoster ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="w-full">
                    <Gallery currentProject={project} />
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Standard Top-Down Layout for Multi-Image Projects (e.g. Mock Ads)
        return (
          <section key={project.id} className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl">
                {project.description}
              </p>
            </div>

            <div className="mb-16">
              <Gallery currentProject={project} />
            </div>

            <div className="grid lg:grid-cols-3 gap-10 mb-16">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-3xl font-bold text-foreground border-b border-secondary/20 pb-2">
                  Project Overview
                </h2>
                <p className="text-lg text-foreground leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              <div className="space-y-8">
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
        );
      })}
    </div>
  );
}