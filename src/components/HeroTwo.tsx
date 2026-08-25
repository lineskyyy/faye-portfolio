  import { useScrollAnimation } from "../hooks/useScrollAnimation";
  import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';

  const BUTTON_HOVER_CLASSES =
    "transition-all duration-300 ease-in-out shadow-lg hover:shadow-[#fe497b] hover:translate-y-[-2px]";
  const TRANSITION_CLASSES = "transition-all duration-300 ease-in-out";

  export default function Hero() {
    const { ref, isVisible } = useScrollAnimation();

    return (
      <section
        ref={ref}
        className="relative w-full min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden"
      >
        {/* Background Canvas Wrapper */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <ShaderGradientCanvas
            pointerEvents="none"
            pixelDensity={1}   // Prevents lag on high-DPI (Retina) screens
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            <ShaderGradient
              //  control="off"
              cDistance={3}
              color1="#f1e2d1"
              color2="#9cb080"
              color3="#1e5247"
              grain="off"
            />
          </ShaderGradientCanvas>
        </div>

        {/* Hero Content Layer */}
        <div className="relative z-10 w-full max-w-6xl mx-auto text-center flex flex-col items-center px-4">
          <div
            className={`flex items-center justify-center gap-4 mb-6 ${
              isVisible ? "fade-up" : "opacity-0"
            }`}
          >
            <span className="flex-shrink-0">
              <img
                src="/public/images/logob.png"
                alt="sngm"
                className="w-30 h-30 object-contain"
              />
            </span>

            <h1
              className={`text-8xl md:text-9xl font-bold text-[#fff4e7] tracking-[30px] -mr-[30px] leading-none ${
                isVisible ? "fade-up fade-up-delay-1" : "opacity-0"
              }`}
            >
              PORTFOLIO
            </h1>
          </div>

          <p
            className={`text-lg md:text-xl text-[#fff4e7] mb-8 max-w-2xl mx-auto leading-relaxed ${
              isVisible ? "fade-up fade-up-delay-2" : "opacity-0"
            }`}
          >
            I am Soph and I'm a soap. I am Soph and I'm a soap. I am Soph and I'm
            a soap. I am Soph and I'm a soap. I am Soph and I'm a soap. I am Soph
            and I'm a soap.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center ${
              isVisible ? "fade-up fade-up-delay-3" : "opacity-0"
            }`}
          >
            <a
              href="#work"
              className={`px-8 py-3 bg-[#cb2957] text-[#fff4e7] rounded-full font-semibold ${BUTTON_HOVER_CLASSES}`}
            >
              View My Work
            </a>
            <a
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