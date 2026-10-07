from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
errors = []

for page in ROOT.glob("*.html"):
    text = page.read_text(encoding="utf-8")
    if "<title>" not in text:
        errors.append(f"{page.name}: missing title")
    if 'meta name="description"' not in text and page.name != "404.html":
        errors.append(f"{page.name}: missing meta description")
    for href in re.findall(r'href="([^"]+\\.html)"', text):
        if not (ROOT / href).exists():
            errors.append(f"{page.name}: broken internal link -> {href}")

if errors:
    print("\\n".join(errors))
    raise SystemExit(1)
print("Basic HTML checks passed.")
