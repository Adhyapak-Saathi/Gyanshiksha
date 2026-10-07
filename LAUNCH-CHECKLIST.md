# Gyan Shiksha Launch Checklist

## Before merging V3 into main
- [ ] `python tools/validate_site.py` passes
- [ ] `node --check assets/js/app.js` passes
- [ ] `node --check assets/js/games.js` passes
- [ ] Quiz iframe loads and one complete attempt can be submitted
- [ ] Focus Mode keeps the browser on the Gyan Shiksha URL
- [ ] Games complete 10 questions on mobile
- [ ] Mobile menu opens/closes correctly
- [ ] Contact email is correct
- [ ] No development/demo/ad placeholder is visible

## Immediately after going live
- [ ] Open Home, Quiz, Games, Board Exam, Study Plan, Blog on a real phone
- [ ] Test one Quiz submission and confirm score reaches the Google Sheet
- [ ] Run PageSpeed Insights on Home, Quiz and Blog
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Inspect key URLs in Search Console
- [ ] Keep Study Material and Updates noindex until real resources/verified updates exist

## Before AdSense application
- [ ] Continue publishing substantial original student-useful content
- [ ] Verify Privacy, Terms, Disclaimer, Editorial Policy and Contact are accurate
- [ ] Ensure no copied PDFs/articles/images are used without permission
- [ ] Add real AdSense code only after the account/site setup requires it
- [ ] Add/update advertising and cookie disclosures based on the actual production configuration
- [ ] Add `ads.txt` only with the publisher information supplied by AdSense
