from pathlib import Path
import re
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
errors = []
html_pages = list(ROOT.glob("*.html"))

def robots_for(text):
    m = re.search(r'<meta\s+name="robots"\s+content="([^"]+)"', text, re.I)
    return m.group(1).lower() if m else ""

indexable = set()
noindex = set()

for page in html_pages:
    text = page.read_text(encoding="utf-8")

    if "<title>" not in text:
        errors.append(f"{page.name}: missing title")

    if page.name != "404.html" and 'meta name="description"' not in text:
        errors.append(f"{page.name}: missing meta description")

    if 'rel="manifest"' not in text:
        errors.append(f"{page.name}: manifest link missing")

    robots = robots_for(text)
    (noindex if "noindex" in robots else indexable).add(page.name)

    # Internal HTML links.
    for href in re.findall(r'href="([^"]+)"', text):
        if href.startswith(("mailto:", "#", "javascript:")):
            continue
        if href.startswith(("http://", "https://")):
            continue
        clean = href.split("#",1)[0].split("?",1)[0]
        if clean.endswith(".html") and not (ROOT / clean).exists():
            errors.append(f"{page.name}: broken internal link -> {href}")

    # Production pages should not expose development placeholders.
    if "noindex" not in robots:
        for forbidden in ["Coming Soon", "Library structure ready", "<time>Demo</time>"]:
            if forbidden in text:
                errors.append(f"{page.name}: production placeholder -> {forbidden}")

    if 'class="ad-wrap' in text or 'data-ad-slot=' in text:
        errors.append(f"{page.name}: pre-approval ad placeholder still present")

    # target=_blank requires noopener.
    for tag in re.findall(r'<a\b[^>]*target="_blank"[^>]*>', text, re.I):
        if 'rel="noopener' not in tag and 'rel="noreferrer' not in tag:
            errors.append(f"{page.name}: target=_blank without noopener")

# Sitemap consistency.
sitemap_path = ROOT / "sitemap.xml"
if sitemap_path.exists():
    sitemap = sitemap_path.read_text(encoding="utf-8")
    sitemap_files = set()
    for loc in re.findall(r"<loc>(.*?)</loc>", sitemap):
        path = urlparse(loc).path
        if path.endswith("/"):
            name = "index.html"
        else:
            name = path.split("/")[-1]
        sitemap_files.add(name)

    for name in noindex:
        if name in sitemap_files:
            errors.append(f"sitemap includes noindex page -> {name}")

    for name in indexable:
        if name == "404.html":
            continue
        if name not in sitemap_files:
            errors.append(f"sitemap missing indexable page -> {name}")
else:
    errors.append("sitemap.xml missing")

# Main navigation should not promote noindex/development pages.
for page in html_pages:
    text = page.read_text(encoding="utf-8")
    nav = re.search(r'<nav id="main-nav".*?</nav>', text, re.S)
    if not nav:
        continue
    for href in re.findall(r'href="([^"]+\.html)"', nav.group(0)):
        if href in noindex:
            errors.append(f"{page.name}: main nav links to noindex page -> {href}")

for required in ["robots.txt", "site.webmanifest", "security.txt"]:
    if not (ROOT / required).exists():
        errors.append(f"{required} missing")

if errors:
    print("\n".join(errors))
    raise SystemExit(1)

print(f"Launch validation passed: {len(html_pages)} HTML pages, {len(indexable)} indexable, {len(noindex)} noindex.")
