# Faye Portfolio - Presentations Gallery Implementation

## Steps
- [x] Review existing components (Gallery, Presentations, DigitalIllustration, ProjectPage)
- [x] Confirm plan with user
- [x] Enhance `Gallery.tsx` to render actual PDF page-by-page (fit to screen) when a `pdfUrl` is present; change button text to "View PDF"
- [x] Update `Presentations.tsx` to use `<Gallery>` with folder images as carousel thumbnails and fix pdf paths
- [x] Add dedicated PDF loading state (hides carousel while the real PDF renders, fixes cross-deck bleed)
- [x] Simplify the loading spinner (smaller, lighter) to reduce lag
- [x] Add percentage progress indicator below the rendering spinner
- [x] Verify build passes with `npm run build`

