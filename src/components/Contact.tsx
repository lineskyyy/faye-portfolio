import { Mail, Linkedin, Instagram, Github } from "lucide-react"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

const BUTTON_HOVER_CLASSES =
  "transition-all duration-300 ease-in-out shadow-lg hover:shadow-[#fe497b] hover:translate-y-[-2px]";
export default function Contact() {
  const { ref, isVisible } = useScrollAnimation()

  const socialLinks = [
    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Github, href: "#", label: "GitHub" },
  ]

  return (
    <section ref={ref} id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isVisible ? "fade-up" : "opacity-0"}`}>
          Let's Create <span className="text-sred">Together</span>
        </h2>
        <p
          className={`text-lg text-muted-foreground mb-12 max-w-2xl mx-auto ${
            isVisible ? "fade-up fade-up-delay-1" : "opacity-0"
          }`}
        >
          I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
        </p>

        {/* Primary CTA Button - Using btn-hover for the lift and shadow effect */}
        <a
          href="mailto:hello@example.com"
          className={`inline-block px-8 py-4 bg-pred text-foreground rounded-full font-bold uppercase tracking-wider btn-hover mb-12 ${
            isVisible ? "fade-up fade-up-delay-2" : "opacity-0"
          } ${BUTTON_HOVER_CLASSES}`}
        >
          Send Me an Email
        </a>

        {/* Social Icons - Enhanced hover effect: primary background and scale */}
        <div className={`flex justify-center gap-6 ${isVisible ? "fade-up fade-up-delay-3" : "opacity-0"}`}>
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.label}
                href={social.href}
                // Enhanced styling: Secondary background, Accent icon color, Primary hover background
                className="p-3 bg-secondary/20 text-accent rounded-full hover:bg-pred hover:text-foreground smooth-transition hover:scale-110 shadow-lg"
                aria-label={social.label}
              >
                <Icon size={24} />
              </a>
            )
          })}
        </div>

        {/* Footer/Copyright */}
        <div className="mt-20 border-t border-secondary/20 pt-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SNGM Portfolio. Crafted with{" "}
            <span className="text-sred">Peasant Boy</span>.
          </p>
        </div>
      </div>
    </section>
  )
}