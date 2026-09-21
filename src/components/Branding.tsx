import Gallery, { type GalleryProject } from "./Gallery";

// Digital Illustration project compilation data
const projects: GalleryProject[] = [
  {
    id: 1,
    title: "Buyani",
    category: "Digital Illustration",
    description:
      "A collection of digital paintings exploring themes of nature and abstraction.",
    fullDescription:
      "During my mentorship in Cumbria Ridge, I was tasked to handle Buyani’s social media page. Buyani is a digital service platform for a bunch of communities in Cavite and I utilized my skills in marketing to find a cohesive look for Buyani’s branding.",
    images: [
      "/projects/branding/p1.jpg",
      "/projects/branding/p2.jpg",
      "/projects/branding/p3.jpg",
      "/projects/branding/p4.jpg",
      "/projects/branding/p5.jpg",
      "/projects/branding/p6.jpg",
      "/projects/branding/p7.jpg",
      "/projects/branding/p8.jpg",
    ],
    tags: ["Illustration", "Digital Art", "Concept Art"],
    year: "2023",
    tools: ["Adobe Photoshop", "Canva"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Publicis: Lucky Me",
    category: "Digital Illustration",
    description:
      "A collection of digital paintings exploring themes of nature and abstraction.",
    fullDescription:
      "This was a fun prompt! It was Valentines and we were assigned to create social media postings for Lucky Me’s new Labuyo line. I busted out my illustration skills for this and drew the singers behind the famous songs used to make Labuyo flavored puns.",
    images: [
      "/projects/branding/p9.jpg",
      "/projects/branding/p10.jpg",
      "/projects/branding/p11.jpg",
    ],
    tags: ["Illustration", "Digital Art", "Concept Art"],
    year: "2023",
    tools: ["Adobe Photoshop", "Clip Studio Paint"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Publicis: Skelan",
    category: "Digital Illustration",
    description:
      "A collection of digital paintings exploring themes of nature and abstraction.",
    fullDescription:
      " Now this was something new to me, because I’ve never had the target market set to older audiences before. There had to be certain adjustments, both in copy and design, to get the audience’s attention. It was a great learning experience for me overall.",
    images: [
      "/projects/branding/p12.jpg",
      "/projects/branding/p13.jpg",
      "/projects/branding/p14.jpg",
    ],
    tags: ["Illustration", "Digital Art", "Concept Art"],
    year: "2023",
    tools: ["Adobe Photoshop"],
    link: "#",
    github: "#",
  },
];

export default function Branding() {
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

          {/* Gallery Showcase - 3D carousel of project images */}
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
                <h3 className="text-2xl font-bold text-sred mb-4">Details</h3>
                <div className="space-y-3 text-sm">
                  {/* <p className="flex items-center gap-3 text-foreground">
                    <span className="font-semibold text-about-ink/80">Category:</span>{" "}
                    <span className="text-sred font-medium">{project.category}</span>
                  </p> */}
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
