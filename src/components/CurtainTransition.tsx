import { motion, type Variants } from "framer-motion";

interface CurtainTransitionProps {
  isTransitioning: boolean;
  onCovered: () => void;
  onTransitionComplete: () => void;
  tabLabel: string;
}

const NUM_BLINDS = 5;

const blindVariants: Variants = {
  initial: {
    scaleY: 0,
    originY: 0,
  },
  animate: (i: number) => ({
    scaleY: [0, 1, 1, 0],
    originY: [0, 0, 1, 1],
    transition: {
      duration: 1.0,
      times: [0, 0.35, 0.65, 1],
      delay: i * 0.03,
      ease: [0.77, 0, 0.175, 1] as [number, number, number, number],
    },
  }),
};

const textVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: [0, 1, 1, 0],
    scale: [0.95, 1, 1.03, 1.05],
    transition: {
      duration: 0.5,
      delay: 0.35,
      times: [0, 0.25, 0.75, 1],
      ease: "easeInOut",
    },
  },
};

export default function CurtainTransition({
  isTransitioning,
  onCovered,
  onTransitionComplete,
  tabLabel,
}: CurtainTransitionProps) {
  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex w-full h-full overflow-hidden">
      {/* Vertical Blinds */}
      {Array.from({ length: NUM_BLINDS }).map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={blindVariants}
          initial="initial"
          animate="animate"
          onUpdate={(latest) => {
            // Trigger content swap at index 0 when scaleY hits 1 (screen fully covered)
            if (i === 0 && (latest.scaleY as number) >= 0.99) {
              onCovered();
            }
          }}
          onAnimationComplete={i === NUM_BLINDS - 1 ? onTransitionComplete : undefined}
          className="h-full bg-about-ink flex-1 border-r border-white/5 last:border-r-0"
        />
      ))}

      {/* Responsive Overlay Label */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
        <motion.span
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-tred tracking-tight uppercase leading-none max-w-full break-words"
        >
          {tabLabel}
        </motion.span>
      </div>
    </div>
  );
}