from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
OLD_BASE = "https://adhyapak-saathi.github.io/Gyanshiksha"

if len(sys.argv) != 2:
    raise SystemExit("Usage: python tools/update_base_url.py https://example.com")

new_base = sys.argv[1].rstrip("/")
if not re.match(r"^https://[A-Za-z0-9.-]+(?::\d+)?(?:/.*)?$", new_base):
    raise SystemExit("Base URL must be an https:// URL")

changed = []
for path in list(ROOT.glob("*.html")) + [ROOT / "robots.txt", ROOT / "security.txt", ROOT / ".well-known/security.txt", ROOT / "tools/build_sitemap.py"]:
    if not path.exists():
        continue
    text = path.read_text(encoding="utf-8")
    updated = text.replace(OLD_BASE, new_base)
    if updated != text:
        path.write_text(updated, encoding="utf-8")
        changed.append(str(path.relative_to(ROOT)))

print(f"Updated base URL in {len(changed)} files.")
print("Next: run `python tools/build_sitemap.py` and `python tools/validate_site.py`.")
