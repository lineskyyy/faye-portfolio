import ElasticMesh from "../components/ElasticMesh";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#1e5247] pt-16 pb-8 text-[#fff4e7]">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Main Footer Links & Info Grid */}
        <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-16">
          {/* Left Column: Brand Icon, Description & Social Icons */}
          <div className="max-w-md space-y-5">
            <img
              src="/images/logob.png"
              alt="Logo"
              className="h-14 w-14 object-contain"
            />
            <p className="text-sm font-normal leading-relaxed text-[#fff4e7]/80">
              Hi, it’s Sophia! I am a Digital Artist based in the Philippines
              with over 3 years of experience in the creative design field. I
              mostly specialize in Graphic Design, Branding and Illustrations.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 text-[#fff4e7]/80 pt-1">
              <a
                href="https://www.instagram.com/soapmiranda/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/sophia-miranda-75258a210/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              {/* <a
                href="https://dribbble.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Dribbble"
                className="transition-colors hover:text-white"
              >
                <Dribbble className="h-5 w-5" />
              </a> */}
              <a
                href="mailto:mirandasophia10@gmail.com"
                aria-label="Email"
                className="transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Link Groups */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-16">
            {/* Column 1 */}
            <div>
              <h3 className="mb-4 text-sm font-medium text-white">
                Navigation
              </h3>
              <ul className="space-y-3 text-sm text-[#fff4e7]/80">
                <li>
                  <a href="/" className="transition-colors hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="transition-colors hover:text-white"
                  >
                    About Me
                  </a>
                </li>
                <li>
                  <a
                    href="/work"
                    className="transition-colors hover:text-white"
                  >
                    Featured Work
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-4 text-sm font-medium text-white">Projects</h3>
              <ul className="space-y-3 text-sm text-[#fff4e7]/80">
                <li>
                  <a
                    href="/work?tab=illustrations"
                    className="transition-colors hover:text-white"
                  >
                    Illustrations
                  </a>
                </li>
                <li>
                  <a
                    href="/work?tab=presentations"
                    className="transition-colors hover:text-white"
                  >
                    Presentations
                  </a>
                </li>
                <li>
                  <a
                    href="/work?tab=branding"
                    className="transition-colors hover:text-white"
                  >
                    Branding
                  </a>
                </li>
                <li>
                  <a
                    href="/work?tab=graphic-design"
                    className="transition-colors hover:text-white"
                  >
                    Graphic Design
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-4 text-sm font-medium text-white">Resources</h3>
              <ul className="space-y-3 text-sm text-[#fff4e7]/80">
                <li>
                  <a
                    href="/Sophia_Miranda_Resume.pdf"
                    download="Sophia_Miranda_Resume.pdf"
                    className="transition-colors hover:text-white"
                  >
                    View Resume
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@example.com"
                    className="transition-colors hover:text-white"
                  >
                    Get in Touch
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Floating Mesh Image positioned relative to the divider line */}
        <div className="relative z-20 mt-12 sm:mt-16 -mb-3 sm:-mb-6 md:-mb-8 w-full pointer-events-auto flex justify-center">
          <div className="w-full max-w-[280px] sm:max-w-xl md:max-w-3xl lg:max-w-5xl aspect-[896/294]">
            <Link to="/about" className="block h-full w-full cursor-pointer">
              <ElasticMesh
                image="/images/hero2.png"
                className="h-full w-full object-bottom"
                showGrid={false}
                borderRadius={0}
                stiffness={0.06}
                damping={0.22}
                grabRadius={0.5}
                pull={0.28}
                wobble={4}
                tilt={8}
                shading={0.35}
                resolution={22}
                interaction="hover"
                enabled
                style={{ touchAction: "pan-y" }}
              />
            </Link>
          </div>
        </div>

        {/* Bottom Bar & Copyright Line */}
        <div className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-[#fff4e7]/15 pt-6 text-xs text-[#fff4e7]/60 sm:flex-row">
          <p>
            Copyright &copy; {currentYear} Sophia Miranda. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-[#fff4e7]/90">
              Terms & Conditions
            </a>
            <a href="#" className="transition-colors hover:text-[#fff4e7]/90">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}