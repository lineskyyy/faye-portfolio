# Fix Gallery.tsx Errors

## Errors Identified
1. **TS2724**: `Compress` is not exported from `lucide-react` v0.546.0 → use `Minimize` instead
2. **TS2307**: `framer-motion` module not installed (only used here) → remove dependency
3. **TS7006**: `_` and `info` params in `onDragEnd` have implicit `any` type

## Plan
- [x] Create TODO.md
- [x] Replace `framer-motion` import with CSS-based animations
- [x] Replace `motion.div`/`AnimatePresence`/`motion.img` with plain elements + CSS transitions
- [x] Replace `Compress` icon with `Minimize`
- [x] Replace framer-motion drag with native pointer-events swipe handler
- [x] Add CSS keyframes to index.css for modal & image transitions
- [x] Verify with `npx tsc -b` ✅ Passed (TSC_RESULT=0)
