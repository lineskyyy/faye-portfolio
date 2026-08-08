import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import FloatingElements from "../components/FloatingElements";
import { ArrowLeft, Briefcase, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

// Define types for components
interface SkillGroup {
  category: string;
  items: string[];
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  details: string;
}

export default function AboutMePage() {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const { ref: mainRef, isVisible: mainVisible } = useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skills: SkillGroup[] = [
    {
      category: "Design",
      items: [
        "UI/UX Design",
        "Digital Illustration",
        "Motion Graphics",
        "Brand Identity",
        "Visual Storytelling",
        "Concept Art",
      ],
    },
    {
      category: "Development & Interactive",
      items: [
        "Web Design",
        "Interactive Media",
        "Animation",
        "Creative Coding",
        "Responsive Design",
        "User Experience",
      ],
    },
    {
      category: "Tools & Software",
      items: [
        "Adobe Creative Suite",
        "Figma",
        "Blender",
        "After Effects",
        "Procreate",
        "Cinema 4D",
      ],
    },
  ];

  const experience: Experience[] = [
    {
      title: "Junior Multimedia Designer",
      company: "Company Here",
      period: "2021 - Present",
      description:
        "Created engaging digital content and interactive experiences for diverse clients.",
    },
    {
      title: "Multimedia Artist",
      company: "Company Here",
      period: "2021 - 2025",
      description:
        "Created engaging digital content and interactive experiences for diverse clients.",
    },
    {
      title: "Freelance Designer",
      company: "Company Here",
      period: "2021 - Present",
      description:
        "Created engaging digital content and interactive experiences for diverse clients.",
    },
  ];

  const education: Education[] = [
    {
      degree: "Bachelor of Multimedia Arts",
      institution: "School University",
      year: "2025",
      details: "Specialized in Digital Animation and Interactive Media",
    },
    {
      degree: "Sample Certificate for MMA Stink",
      institution: "Stinky Institute",
      year: "2002",
      details: "Specialized in Digital Animation and Interactive Media",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <FloatingElements scrollY={scrollY} />
      <Navigation />

      <main className="pt-24 pb-20">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-secondary hover:text-primary smooth-transition mb-8 font-semibold"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Hero Section */}
        <section ref={mainRef} className="max-w-6xl mx-auto px-6 mb-20">
          <div className="flex flex-wrap justify-between items-start">
            <div
              className={`mb-8 ${
                mainVisible ? "fade-up" : "opacity-0"
              } order-first md:order-first`}
            >
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                A Little About <span className="text-primary">My Journey</span>
              </h1>
              {/* Artistic separator */}
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </div>

            <div
              className={`w-full md:w-auto mb-8 hidden md:block bg-secondary/10 rounded-xl p-6 text-center shadow-lg border border-secondary/30 ${
                mainVisible ? "fade-up fade-up-delay-2" : "opacity-0"
              } order-last`}
            >
              <img
                src="/images/Me.jpg"
                alt="Sophia Miranda"
                className="w-full h-auto rounded-lg mb-4"
                style={{ maxWidth: "200px" }}
              />
              <p className="text-sm text-muted-foreground">
                Sophia Nichole G. Miranda
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Bio */}
            <div
              className={`md:col-span-2 ${
                mainVisible ? "fade-up fade-up-delay-1" : "opacity-0"
              }`}
            >
              <p className="text-lg text-foreground mb-6 leading-relaxed border-l-4 border-primary/50 pl-4">
                I'm a passionate Multimedia Arts graduate with a deep love for
                visual storytelling and creative expression. My journey spans
                digital design, animation, and interactive media creation. With
                a strong foundation in both artistic principles and technical
                skills, I create work that's not only visually stunning but also
                purposeful and engaging.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I thrive on transforming complex ideas into simple, beautiful,
                and functional designs, always aiming to push the boundaries of
                what's possible in the digital space.
              </p>
            </div>

            {/* Image Placeholder / Quote */}
            <div
              className={`hidden md:block bg-secondary/10 rounded-xl p-6 text-center shadow-lg border border-secondary/30 ${
                mainVisible ? "fade-up fade-up-delay-2" : "opacity-0"
              }`}
            >
              <p className="text-xl font-medium text-accent italic">
                "Help, I'm still at the restaurant. Still sitting in a corner I
                haunt"
              </p>
              <p className="mt-4 text-primary font-semibold">- Taylor Swift</p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className={`mb-12 ${mainVisible ? "fade-up" : "opacity-0"}`}>
            <h2 className="text-4xl font-bold mb-4">
              Core <span className="text-secondary">Skills</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={skillGroup.category}
                // Enhanced card style for skill groups with card-hover
                className={`bg-secondary/10 rounded-xl p-6 border border-secondary/30 card-hover ${
                  mainVisible ? "fade-up" : "opacity-0"
                }`}
                style={{
                  animationDelay: mainVisible ? `${(index + 1) * 0.1}s` : "0s",
                }}
              >
                <h3 className="text-xl font-bold text-primary mb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    // Enhanced skill pill styling
                    <span
                      key={skill}
                      className="px-3 py-1 bg-secondary/20 text-accent rounded-full text-sm font-medium hover:bg-primary/50 hover:text-primary-foreground smooth-transition cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Education Section */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Experience Timeline */}
            <div>
              <div className={`mb-12 ${mainVisible ? "fade-up" : "opacity-0"}`}>
                <h2 className="text-4xl font-bold mb-4">
                  Professional <span className="text-primary">Experience</span>
                </h2>
              </div>
              <div className="space-y-6 relative border-l-4 border-secondary/30 pl-6">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className={`relative ${
                      mainVisible ? "fade-up" : "opacity-0"
                    }`}
                    style={{
                      animationDelay: mainVisible
                        ? `${(index + 1) * 0.1}s`
                        : "0s",
                    }}
                  >
                    {/* Timeline Dot with Primary color highlight */}
                    <div className="absolute -left-8 top-1.5 p-1 bg-background border-4 border-primary rounded-full">
                      <Briefcase size={16} className="text-primary" />
                    </div>
                    {/* Experience card with card-hover */}
                    <div className="bg-secondary/10 rounded-xl p-6 border border-secondary/30 card-hover">
                      <h3 className="text-xl font-bold mb-1 text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-primary font-semibold mb-1">
                        {exp.company}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3 italic">
                        {exp.period}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Timeline */}
            <div>
              <div
                className={`mb-12 ${
                  mainVisible ? "fade-up fade-up-delay-1" : "opacity-0"
                }`}
              >
                <h2 className="text-4xl font-bold mb-4">
                  Education &{" "}
                  <span className="text-primary">Certifications</span>
                </h2>
              </div>
              <div className="space-y-6 relative border-l-4 border-secondary/30 pl-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className={`relative ${
                      mainVisible ? "fade-up fade-up-delay-1" : "opacity-0"
                    }`}
                    style={{
                      animationDelay: mainVisible
                        ? `${(index + 1) * 0.1}s`
                        : "0s",
                    }}
                  >
                    {/* Timeline Dot with Primary color highlight */}
                    <div className="absolute -left-8 top-1.5 p-1 bg-background border-4 border-primary rounded-full">
                      <GraduationCap size={16} className="text-primary" />
                    </div>
                    {/* Education card with card-hover */}
                    <div className="bg-secondary/10 rounded-xl p-6 border border-secondary/30 card-hover">
                      <h3 className="text-xl font-bold mb-1 text-foreground">
                        {edu.degree}
                      </h3>
                      <p className="text-primary font-semibold mb-1">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3 italic">
                        {edu.year}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {edu.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Applied card-hover to the banner */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-12 border border-secondary/30 text-center card-hover">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Let's Create Something Amazing
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always interested in hearing about new projects and
              opportunities.
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full btn-hover uppercase tracking-wider"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
