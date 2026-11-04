"""Builds one self-contained HTML file (CSS and JS inlined) for hosting as a single page.
Usage: python3 tools/build-single.py OUT.html"""
import re, sys, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
html = (root / 'index.html').read_text()
body = re.search(r'<body>(.*)</body>', html, re.S).group(1)
# Relative links only work on the website; in the single file, point them at hosted copies.
body = body.replace('href="docs-comparison-report.html"', 'href="https://claude.ai/artifact/5GH5q1NJbyPuAXS2po9kq2"').replace('href="hush/"', 'href="https://driodrocco.github.io/cloudforfunproject/hush/"')
css = (root / 'style.css').read_text()
scripts = re.findall(r'<script src="([^"]+)" defer></script>', html)
js = '\n'.join((root / s).read_text() for s in scripts)
icon = (root / 'favicon.svg').read_text()
fonts = re.search(r'<link rel="stylesheet" href="(https://fonts[^"]+)">', html).group(1)
out = f'''<title>Stepwise</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{fonts}">
<meta name="description" content="Practice questions, study guides and full-length practice exams for all 40 AP courses.">
<style>
{css}
</style>
{body}
<script>window.SW_NO_PRINT = true;</script>
<script>
{js}
</script>
'''
pathlib.Path(sys.argv[1]).write_text(out)
print(sys.argv[1], len(out) // 1024, 'KB')
