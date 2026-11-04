/* Offline support for the website. On first visit it saves the app's files; after that,
 * pages load from the network when online (so updates show up) and from the saved copy
 * when offline. Not used inside the claude.ai version. */
const CACHE = 'stepwise-v1';
const CORE = [
  './', 'index.html', 'style.css', 'favicon.svg', 'manifest.webmanifest', 'docs-comparison-report.html',
  'icons/icon-192.png', 'icons/icon-512.png',
  'hush/', 'hush/index.html', 'hush/style.css', 'hush/app.js', 'hush/engine.js', 'hush/favicon.svg',
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Every script listed in index.html, so the whole app works offline.
    const html = await (await fetch('index.html', { cache: 'no-cache' })).text();
    const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
    await cache.addAll([...CORE, ...scripts]);
    // Font stylesheet too (font files are saved the first time they load). Without them the app
    // still works offline with system fonts, so a failure here is ignored.
    const fonts = (html.match(/<link rel="stylesheet" href="(https:\/\/fonts[^"]+)"/) || [])[1];
    if (fonts) await cache.add(new Request(fonts.replace(/&amp;/g, '&'), { mode: 'cors' })).catch(() => {});
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameSite = url.origin === self.location.origin;
  const fonts = /^fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameSite && !fonts) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(req);
      if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
      return res;
    } catch (err) {
      const saved = await cache.match(req, { ignoreSearch: true });
      if (saved) return saved;
      if (req.mode === 'navigate') return (await cache.match('index.html')) || Response.error();
      return Response.error();
    }
  })());
});
