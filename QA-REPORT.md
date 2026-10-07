# Gyan Shiksha Professional QA Report — V3.9

Date: 7 October 2026

## Release status
GitHub Pages build/deploy for V3.8 completed successfully before this QA pass.

## Fixed in V3.9

### Content integrity
- Removed remaining public claims for unavailable Model Papers/Updates/Study Material from Home/footer messaging.
- About page now distinguishes live features from future sections.
- Search suggestions no longer mention an unavailable Model Paper section.

### UX & accessibility
- Home information rows are now real links instead of visually clickable-looking static blocks.
- Search supports keyboard navigation and Escape behavior.
- Mobile menu updates its accessible Open/Close label and no longer steals focus on unrelated Escape presses.
- Improved text contrast and Search button contrast.
- Fixed Study Plan heading hierarchy.
- Added game progress semantics, selected-mode state and live question announcements.
- Added an accessible H1 to Quiz Focus Mode.

### SEO & sharing
- Improved Home and Board Exam metadata.
- Added explicit robots metadata to Terms.
- Switched social preview from SVG to a 1200×630 PNG.
- Added OG image dimensions/type/alt plus Twitter summary-card metadata.
- Added author/review information, breadcrumbs and related links to all six study-guide articles.
- Added raster PWA icons and useful app shortcuts.

### Performance
- External content images now reserve width/height to reduce layout shift.
- Unsplash preconnect is limited to the two pages that actually render Unsplash assets.
- Home hero image is preloaded.
- Standard Quiz iframe is lazy-loaded; Focus Mode remains the dedicated full-screen path.

### Privacy & security
- Privacy Policy now discloses game localStorage, hosting/service processing and third-party media requests.
- Removed unnecessary clipboard iframe permission.
- Tightened CSP image/frame permissions.
- Added `security.html`, root `security.txt`, and `.well-known/security.txt`.

## Still manual / next phase
1. Change the GitHub repository description; it still mentions old Psychology/TAT content.
2. The current repository is a fork of `Gyanshiksha/Gyanshiksha`, which is why GitHub defaults cross-fork pull requests. Consider an independent repo after custom-domain migration.
3. Set a custom Gyan Shiksha domain and dedicated domain email before the final brand/AdSense phase.
4. Test one complete Quiz submission on a real phone and confirm the score reaches Google Sheets.
5. Run PageSpeed Insights and Search Console URL Inspection after V3.9 is deployed.
6. Continue adding genuinely useful original educational content before applying for AdSense. Avoid mass-producing generic articles.
