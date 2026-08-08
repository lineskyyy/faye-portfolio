import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  // Kept for future use (currently commented out rendering)
  // const skills = [
  //   {
  //     category: "Design",
  //     items: [
  //       "UI/UX Design",
  //       "Digital Illustration",
  //       "Motion Graphics",
  //       "Brand Identity",
  //     ],
  //   },
  //   {
  //     category: "Development",
  //     items: [
  //       "Web Design",
  //       "Interactive Media",
  //       "Animation",
  //       "Creative Coding",
  //     ],
  //   },
  //   {
  //     category: "Tools",
  //     items: [
  //       "Adobe Creative Suite",
  //       "Figma",
  //       "Blender",
  //       "After Effects",
  //     ],
  //   },
  // ];

  return (
    <section ref={ref} id="about" className="py-20 px-6 bg-gradient-to-b from-[#9cb080] to-[#1e5247]">
      <div className="max-w-6xl mx-auto">
        {/* 2-Column Grid starting at the very top */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Header + Bio Texts */}
          <div className="space-y-8">
            {/* Section Header (Now nested here to align with the image top) */}
            <div className={`${isVisible ? "fade-up" : "opacity-0"}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                About <span className="text-sred">Me</span>
              </h2>
              {/* Artistic separator */}
              <div className="w-16 h-1 bg-gradient-to-r from-tred to-accent rounded-full"></div>
            </div>

            {/* Bio Paragraphs */}
            <div
              className={`${isVisible ? "fade-up fade-up-delay-1" : "opacity-0"} space-y-6`}
            >
              {/* Main paragraph */}
              <p className="text-[30px] text-foreground leading-relaxed">
                I'm a passionate Multimedia Arts graduate with a deep love for
                visual storytelling and creative expression. My journey spans
                digital design, animation, and interactive media creation.
              </p>
              {/* Secondary paragraph */}
              <p className="text-[20px] text-muted-foreground leading-relaxed">
                With a strong foundation in both artistic principles and
                technical skills, I create work that's not only visually
                stunning but also purposeful and engaging. I believe in the
                power of design to communicate, inspire, and transform.
              </p>
            </div>
          </div>

          {/* Right Column: Image */}
          <div
            className={`flex justify-center ${isVisible ? "fade-up" : "opacity-0"}`}
          >
            {/* Constrained container to prevent the image from expanding too large on wide screens */}
            <div className="w-full max-w-md">
              <img
                src="/public/images/id.png"
                alt="Multimedia Artist Profile"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
