"""Packs the Hush Tab Mixer extension (hush/tab-mixer/) into hush/hush-tab-mixer.zip.
The zip is the same every time for the same files, so it can be checked in.
Usage: python3 tools/build-tab-mixer.py          (write the zip)
       python3 tools/build-tab-mixer.py --check  (fail if the zip is out of date)"""
import io, json, pathlib, sys, zipfile
root = pathlib.Path(__file__).resolve().parent.parent
src, out = root / 'hush' / 'tab-mixer', root / 'hush' / 'hush-tab-mixer.zip'
manifest = json.loads((src / 'manifest.json').read_text())
for f in [manifest['action']['default_popup'], manifest['background']['service_worker'], *manifest['icons'].values()]:
    assert (src / f).exists(), f'manifest points to a missing file: {f}'
buf = io.BytesIO()
with zipfile.ZipFile(buf, 'w', zipfile.ZIP_DEFLATED) as z:
    for f in sorted(p for p in src.rglob('*') if p.is_file()):
        info = zipfile.ZipInfo('hush-tab-mixer/' + f.relative_to(src).as_posix(), date_time=(2026, 1, 1, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        z.writestr(info, f.read_bytes())
data = buf.getvalue()
if '--check' in sys.argv:
    if not out.exists() or out.read_bytes() != data:
        sys.exit('hush/hush-tab-mixer.zip is out of date: run python3 tools/build-tab-mixer.py')
    print('tab mixer zip is up to date, version', manifest['version'])
else:
    out.write_bytes(data)
    print(out, len(data) // 1024, 'KB, version', manifest['version'])
