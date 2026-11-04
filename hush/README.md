# hush.

An ambient sound mixer that runs in your browser. Rain, thunder, wind, waves, a stream, birds, night crickets, a campfire, café murmur and white/pink/brown noise. Every sound is **synthesized live with the Web Audio API**, so there are no audio files, nothing to download and no loop you'll start to recognize.

No build step, no dependencies, no tracking. It's three small files.

## Features

- **12 sounds** you can layer, each with its own volume
- **Presets** (Rainy café, Campfire night, Ocean storm, Forest morning, Deep focus, Sleep), and you can save your own
- **Share links**: your mix is stored in the URL (`#rain=55&cafe=40`), so copy the link and send it to someone
- **Sleep / focus timer** that fades out gently
- **Shuffle** for a random mix
- Live spectrum visualizer that takes on the colors of your mix
- Dark and light themes, keyboard shortcuts, works on phones

| Key | Action |
| --- | --- |
| `Space` | Play / pause |
| `S` | Shuffle |
| `M` | Mute |

## Run it

Open `index.html` in a browser. That's all it needs.

To host it for free on **GitHub Pages**, go to *Settings → Pages*, set *Source* to *Deploy from a branch*, then pick `main` and `/ (root)`. It will be live at `https://<your-username>.github.io/hush/`.

## How the sounds are made

Everything comes from three looping noise buffers (white, pink, brown) and plain oscillators, shaped by filters and envelopes:

| Sound | Recipe |
| --- | --- |
| Rain | High-passed pink noise bed + ~30 tiny band-passed noise "droplets" per second, panned randomly |
| Thunder | Low-passed brown-noise swells with slow attacks, a bright crack, and trailing rumbles every 12–35 s |
| Wind | Band-passed pink noise whose pitch and level drift in gusts, plus a faint high-Q whistle |
| Waves | Brown noise whose low-pass filter and gain swell and recede every 6–11 s, with a hiss of "foam" at each crest |
| Stream | Pink-noise bed + random upward-sweeping sine "bubbles" |
| Birds | Randomized chirp phrases: 2–6 sine sweeps with different shapes, pitches and positions |
| Night | Three crickets at slightly different pitches chirping in triplets over a low hush |
| Campfire | Low brown-noise roar + Poisson-timed crackles and pops |
| Café | Six "talkers" (formant-like noise bands switching between speech and pauses at syllable rate), a room rumble, and the odd clink of a cup |

Event sounds are scheduled 1.5 s ahead, so they keep playing smoothly in a background tab.

### Tuning levels

`engine.js` has a `TRIM` table that evens out loudness between sounds. You can measure a sound without speakers from the browser console:

```js
const buf = await Engine.renderOffline('rain', 20);
const d = buf.getChannelData(0);
Math.sqrt(d.reduce((s, v) => s + v * v, 0) / d.length); // RMS, aim for ~0.1
```

## Files

- `index.html`: the page
- `engine.js`: the synthesizer (all the audio)
- `app.js`: the interface (cards, presets, share links, timer, visualizer)
- `style.css`: the styles

Icons are adapted from [Feather](https://feathericons.com) and [Lucide](https://lucide.dev) (MIT / ISC).

## License

MIT
