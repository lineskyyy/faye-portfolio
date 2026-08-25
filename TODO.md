# Portfolio Component Updates

## Digital Illustration
- [x] Add `fitImage` prop support to `Gallery.tsx` (object-contain + larger cards for full image fit)
- [x] Update `DigitalIllustration.tsx`:
  - [x] Replace Digital Canvas Series `<Gallery>` with a looped-moving marquee (pauses on hover)
  - [x] Pass `fitImage` to the Characters Design Showcase `<Gallery>`
- [x] Verify: build & typecheck pass (`npm run build`, `npx tsc -b`)

## Graphic Design
- [x] Single-image layout for "Kodah All Cars" (id 4) & "Birthday Poster" (id 5):
  - [x] Render single image full-fit (object-contain), enlarged, no excess carousel space
  - [x] Verify build passes
