import { useEffect, useState } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => setReduceMotion(mediaQuery.matches);

    updateReducedMotion();
    mediaQuery.addEventListener?.("change", updateReducedMotion);

    return () => mediaQuery.removeEventListener?.("change", updateReducedMotion);
  }, []);

  return reduceMotion;
}

function useElementScrollProgress(
  targetId: string,
  calculateProgress: (target: HTMLElement, viewportHeight: number) => number,
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const target = document.getElementById(targetId);
      if (!target) return;

      const nextProgress = clamp(
        calculateProgress(target, window.innerHeight || 1),
        0,
        1,
      );

      setProgress((previousProgress) =>
        Math.abs(previousProgress - nextProgress) < 0.001
          ? previousProgress
          : nextProgress,
      );
    };

    const requestProgressUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    requestProgressUpdate();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [calculateProgress, targetId]);

  return progress;
}

/**
 * Maps a target section's viewport position to a reversible reveal progress.
 * Progress starts as the target approaches the viewport and completes before
 * its heading reaches the top, so the transition feels intentional.
 */
export function useScrollRevealProgress(targetId: string) {
  const reduceMotion = usePrefersReducedMotion();
  const progress = useElementScrollProgress(targetId, (target, viewportHeight) => {
    const start = viewportHeight * 0.92;
    const end = viewportHeight * 0.2;
    return (start - target.getBoundingClientRect().top) / (start - end);
  });

  return { progress, reduceMotion };
}

/**
 * Maps the scroll distance through a tall section to a 0–1 sequence.
 * This is used with a sticky inner frame so content can complete an
 * intentional reading interaction before the page continues downward.
 */
export function useScrollWordProgress(targetId: string) {
  const reduceMotion = usePrefersReducedMotion();
  const progress = useElementScrollProgress(targetId, (target, viewportHeight) => {
    const scrollDistance = Math.max(target.offsetHeight - viewportHeight, 1);
    return -target.getBoundingClientRect().top / scrollDistance;
  });

  return { progress, reduceMotion };
}
