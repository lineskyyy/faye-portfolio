import { useScrollAnimation } from "../hooks/useScrollAnimation";

// NEW CONSTANT for the hover effect
const BUTTON_HOVER_CLASSES =
  "transition-all duration-300 ease-in-out shadow-lg hover:shadow-[#fe497b] hover:translate-y-[-2px]";
const TRANSITION_CLASSES = "transition-all duration-300 ease-in-out";

export default function Hero() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center pt-20 px-6 bg-gradient-to-b from-[#1e5247] to-[#9cb080]"
    >
      {/* 1. Parent container freed up to max-w-6xl so the hero image can expand, with items-center keeping everything centered */}
      <div className="w-full max-w-6xl mx-auto text-center flex flex-col items-center px-4">
        {/* 2. Added justify-center to keep the logo + text row perfectly centered */}
        <div
          className={`flex items-center justify-center gap-4 mb-6 ${isVisible ? "fade-up" : "opacity-0"}`}
        >
          <span className="flex-shrink-0">
            <img
              src="/public/images/logob.png"
              alt="sngm"
              className="w-30 h-30 object-contain"
            />
          </span>

          {/* 3. Added -mr-[30px] (negative margin-right) to pull the text back to a perfect optical center */}
          <h1
            className={`text-8xl md:text-9xl font-bold text-[#fff4e7] tracking-[30px] -mr-[30px] leading-none ${isVisible ? "fade-up fade-up-delay-1" : "opacity-0"}`}
          >
            PORTFOLIO
          </h1>
        </div>

        {/* 4. Removed duplicate nesting wrapper so the hero image scales centered inside the parent */}
        <div className={`w-full mb-8 ${isVisible ? "fade-up" : "opacity-0"}`}>
          <img
            src="/public/images/hero2.png"
            alt="Multimedia Artist Profile"
            className="w-full h-auto object-contain mx-auto"
          />
        </div>

        {/* 5. Paragraph remains at max-w-2xl so the reading line length is comfortable */}
        <p
          className={`text-lg md:text-xl text-[#fff4e7] mb-8 max-w-2xl mx-auto leading-relaxed ${isVisible ? "fade-up fade-up-delay-2" : "opacity-0"}`}
        >
          I am Soph and I'm a soap. I am Soph and I'm a soap. I am Soph and I'm
          a soap. I am Soph and I'm a soap. I am Soph and I'm a soap. I am Soph
          and I'm a soap.
        </p>

        {/* Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center ${isVisible ? "fade-up fade-up-delay-3" : "opacity-0"}`}
        >
          <a
            href="#work"
            className={`px-8 py-3 bg-[#cb2957] text-[#fff4e7] rounded-full font-semibold ${BUTTON_HOVER_CLASSES}`}
          >
            View My Work
          </a>
          <a
            // href="#contact"
            download="Sophia_Miranda_Resume.pdf"
            className={`px-8 py-3 text-[#fff4e7] rounded-full font-semibold hover:bg-accent hover:text-accent-foreground ${TRANSITION_CLASSES}`}
          >
            View My Resume
          </a>
        </div>
      </div>
    </section>
  );
}
