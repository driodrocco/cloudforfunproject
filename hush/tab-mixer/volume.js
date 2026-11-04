// Shared by the popup and the background worker: sets and remembers each tab's volume.

// Runs inside the web page (all frames). Sets every audio and video element to `vol` (0 to 1),
// and makes media that starts later (new players, or audio created in code) use the same level.
// Must stay self-contained: Chrome copies this function into the page.
export function pageSetVolume(vol) {
  window.__hushTabVolume = vol;
  const apply = el => { try { el.volume = vol; } catch (e) { /* some players block changes */ } };
  document.querySelectorAll('audio, video').forEach(apply);
  if (window.__hushTabMixer) return;
  window.__hushTabMixer = true;
  const play = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function (...args) {
    if (typeof window.__hushTabVolume === 'number') { try { this.volume = window.__hushTabVolume; } catch (e) { /* ignore */ } }
    return play.apply(this, args);
  };
  new MutationObserver(changes => {
    for (const c of changes) for (const n of c.addedNodes) {
      if (n.nodeType !== 1) continue;
      if (n.matches('audio, video')) apply(n);
      n.querySelectorAll('audio, video').forEach(apply);
    }
  }).observe(document.documentElement || document, { childList: true, subtree: true });
}

const key = tabId => 'vol:' + tabId;

export async function getTabVolume(tabId) {
  const v = (await chrome.storage.session.get(key(tabId)))[key(tabId)];
  return typeof v === 'number' ? v : 1;
}

// Returns true if the page accepted the change. Browser pages (settings, the extension store) cannot be changed.
export async function setTabVolume(tabId, vol) {
  await chrome.storage.session.set({ [key(tabId)]: vol });
  try {
    await chrome.scripting.executeScript({ target: { tabId, allFrames: true }, world: 'MAIN', func: pageSetVolume, args: [vol] });
    return true;
  } catch (e) {
    return false;
  }
}

export async function forgetTab(tabId) {
  await chrome.storage.session.remove(key(tabId));
}
