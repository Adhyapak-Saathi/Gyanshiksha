# Gyan Shiksha V3

## Scope
Gujarati Medium, Std. 6–12 only.
Special focus: Std. 10 and Std. 12 Board Exam.

## Technology
- HTML5
- Custom CSS (responsive UI/UX)
- Vanilla JavaScript
- SVG
- Python development scripts (`tools/`) for validation/build tasks
- GitHub Pages deployment

## Important
GitHub Pages does not execute PHP or Python on the server.
PHP/Python can be used for local/build automation or later on a backend host, but the live GitHub Pages website remains static.

## AdSense
Ad placeholders are included, but **no AdSense script or publisher ID is included**.
Real ad code should be added only after AdSense approval and final policy/privacy review.

## V3.1 Improvements
- Removed placeholder Gyan Shiksha email until domain setup
- Added client-side section search
- Improved mobile menu accessibility and body scroll handling
- Moved first AdSense placeholder below useful Quick Access content
- Added mobile/performance CSS refinements
- Added robots meta to indexable pages

## Current Home Page
The grade row and subject row have been intentionally removed.
Homepage now uses:
1. Hero
2. Ad placeholder
3. Quick Access
4. Board Exam Updates / Latest Updates / Study Guidance
5. Bottom Ad placeholder
6. Footer

## V3.2
- Expanded Board Exam page with useful evergreen preparation guidance
- Expanded Study Material page with resource-library and learning-flow structure
- Added AdSense placeholders only after meaningful content blocks
- Marked unfinished content pages `noindex,follow` until real content is added
- Removed fake placeholder email from shared utility bars

## V3.3
- Integrated existing Google Apps Script Quiz Saathi web app into `quiz.html`
- Added full-screen fallback link
- Updated CSP `frame-src` for Google Apps Script
- Added privacy guidance before the embedded quiz
- Reserved AdSense space after the quiz instead of near answer controls
- Quiz page is now indexable because it provides functional learning content

Quiz Web App:
`https://script.google.com/macros/s/AKfycbxM88Z2cZ1gVuXFU22R1ebiKmZywSqxPyr_VY669V_scB0eEdahGdSsRJn4AVzqQY4LXQ/exec`

## V3.4
- Kept existing Quiz Saathi student/school information flow unchanged
- Added `quiz-player.html` so Focus Mode stays on a Gyan Shiksha URL
- Removed the visible direct Google Apps Script full-screen link from the Quiz page
- Updated Privacy Policy to disclose current Quiz Saathi data collection/storage flow
- Google Apps Script remains the backend inside an iframe; the browser address stays on Gyan Shiksha

## V3.5
- Added functional browser-based educational games with three modes
- Games page is now indexable and stores only local best scores
- Converted Blog from placeholders into three original evergreen study guides
- Added individual indexable article pages for board planning, revision and self-test guidance
- Improved Updates page but kept it `noindex` until verified current updates are available
- Sitemap generator now excludes pages marked `noindex`
- Search index now includes the new study-guidance articles
