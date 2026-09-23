import Gallery, { type GalleryProject } from "./Gallery";

// Digital Illustration project compilation data
const projects: GalleryProject[] = [
  {
    id: 2,
    title: "Consume Zine",
    category: "Digital Illustration",
    description:
      "For one of my major classes in college, we were tasked to create a zine featuring the works we did during the semester. I had two LED lights and a dream.",
    fullDescription:
      "I am incredibly proud of how this zine turned out. Thank you to my beloved friends, Shane and Line, for helping my vision come to life.",
    images: [
      "/projects/presentations/presentation1/p1.png",
      "/projects/presentations/presentation1/p2.png",
      "/projects/presentations/presentation1/p3.png",
      "/projects/presentations/presentation1/p4.png",
      "/projects/presentations/presentation1/p5.png",
    ],
    pdfUrl: "/projects/presentations/presentation1/zine.pdf",
    tags: ["Presentation", "Zine", "Editorial Design"],
    year: "2024",
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Clip Studio Paint"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Spectrovert Mockups",
    category: "Digital Illustration",
    description: "",
    fullDescription:
      "This was a mock company that I created for one of my marketing classes. You can actually see the pitch I made for this company, Spectrovert, in the Presentations section. This is essentially what the print campaign would look like if that company existed in real life. I loved how clean it turned out.",
    images: [
      "/projects/graphicd/p7.jpg",
      "/projects/graphicd/p8.jpg",
      "/projects/graphicd/p9.jpg",
    ],
    tags: ["Illustration", "Digital Art", "Concept Art"],
    year: "2023",
    tools: ["Adobe Illustrator", "Canva"],
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Kodah All Cars",
    category: "Digital Illustration",
    description: "",
    fullDescription:
      "A simple yet effective design for a car dealership in the Philippines.",
    images: ["/projects/graphicd/p10.jpg"],
    tags: ["Automotive", "Vector Art", "Digital Illustration"],
    year: "2023",
    tools: ["Adobe Photoshop", "Canva"],
    link: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Birthday Invitations",
    category: "Digital Illustration",
    description: "",
    fullDescription:
      "Every year for my birthday celebration, I like to create a personal invitation and send it to my friends. It adds a bit of whimsy to my life and I look forward to designing it once May rolls around.",
    images: ["/projects/graphicd/p11.jpg"],
    tags: ["Poster Design", "Typography", "Digital Painting"],
    year: "2023",
    tools: ["Canva"],
    link: "#",
    github: "#",
  },
];

export default function GraphicDesign() {
  return (
    <div className="space-y-28">
      {projects.map((project) => {
        const isSingleImage = project.images.length === 1;
        const isBirthdayPoster = project.title === "Birthday Invitations";

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
                    <h1 className="text-3xl sm:text-5xl md:text-7xl text-pred font-extrabold md:mb-4 leading-tight">
                      {project.title}
                    </h1>
                  </div>

                  <div className="border-t border-secondary/20">
                    {/* <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-pred">
                      Project Overview
                    </h2> */}
                    <p className="text-base xs:text-lg sm:text-xl text-about-ink leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </div>

                  <div className="bg-about-ink/10 p-5 rounded-xl border border-about-ink/30 space-y-3 text-sm">
                    <h3 className="text-2xl font-bold text-sred mb-2">
                      Tools Used
                    </h3>
                    <ul className="text-md text-about-ink/80 list-disc list-inside ml-2 space-y-1">
                      {project.tools.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                    {/* <p className="flex items-center gap-3 text-foreground">
                      <span className="font-semibold text-about-ink/80">
                        Year:
                      </span>{" "}
                      <span className="text-sred font-medium">
                        {project.year}
                      </span>
                    </p>
                    <div className="pt-2 border-t border-secondary/20">
                      <h3 className="text-about-ink/80 font-semibold mb-1">
                        Tools Used:
                      </h3>
                      <p className="text-about-ink/80">
                        {project.tools.join(", ")}
                      </p>
                    </div> */}
                  </div>
                </div>

                {/* Visual Showcase Frame */}
                <div
                  className={`lg:col-span-7 flex justify-center ${
                    isBirthdayPoster ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="w-full">
                    <Gallery currentProject={project} fitImage />
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Standard Top-Down Layout for Multi-Image Projects
        return (
          <section key={project.id} className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <h1 className="text-3xl xs:text-3xl sm:text-5xl md:text-7xl text-pred font-extrabold sm:mb-2 md:mb-4 leading-tight">
                {project.title}
              </h1>
            </div>

            <div className="mb-16">
              <Gallery currentProject={project} fitImage />
            </div>

            <div className="grid lg:grid-cols-3 gap-10 mb-16">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-pred border-b border-secondary/20 pb-2">
                  Project Overview
                </h2>
                <p className="text-md xs:text-lg sm:text-xl md:text-2xl text-about-ink leading-relaxed">
                  {project.description}
                </p>
                <p className="text-md xs:text-lg sm:text-xl md:text-2xl text-about-ink leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              <div className="space-y-8">
                <div className="bg-about-ink/10 p-6 rounded-xl border border-about-ink/30">
                  <h3 className="text-2xl font-bold text-sred mb-4">
                    Tools Used
                  </h3>
                  <ul className="text-md text-about-ink/80 list-disc list-inside ml-2 space-y-1">
                    {project.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                  {/* <div className="space-y-3 text-sm">
                    <p className="flex items-center gap-3 text-foreground">
                      <span className="font-semibold text-about-ink/80">
                        Year:
                      </span>{" "}
                      <span className="text-sred font-medium">
                        {project.year}
                      </span>
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
                  </div> */}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
