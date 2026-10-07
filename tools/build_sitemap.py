from pathlib import Path
from xml.sax.saxutils import escape

BASE_URL = "https://adhyapak-saathi.github.io/Gyanshiksha"
ROOT = Path(__file__).resolve().parents[1]

pages = sorted(
    p.name for p in ROOT.glob("*.html")
    if p.name != "404.html"
)

lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for name in pages:
    url = BASE_URL + ("/" if name == "index.html" else f"/{name}")
    lines.append(f"  <url><loc>{escape(url)}</loc></url>")
lines.append("</urlset>")

(ROOT / "sitemap.xml").write_text("\\n".join(lines) + "\\n", encoding="utf-8")
print(f"Generated sitemap for {len(pages)} pages.")
