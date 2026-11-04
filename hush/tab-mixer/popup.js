// Popup: one row per tab with a volume slider, mute button and a click-to-switch title.
import { getTabVolume, setTabVolume } from './volume.js';

const $ = id => document.getElementById(id);
const canScript = url => /^(https?|file):/.test(url || '');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
let currentTabId = null;
let scheduled = null;

async function rowHTML(tab) {
  const vol = Math.round((await getTabVolume(tab.id)) * 100);
  const muted = tab.mutedInfo && tab.mutedInfo.muted;
  const icon = /^(https?|data):/.test(tab.favIconUrl || '')
    ? `<img class="fav" src="${esc(tab.favIconUrl)}" alt="">`
    : `<span class="fav letter">${esc((tab.title || '?').trim().charAt(0).toUpperCase())}</span>`;
  const scriptable = canScript(tab.url);
  return `<li data-tab="${tab.id}" class="${muted ? 'muted' : ''}">
    <div class="top">
      ${icon}
      <button type="button" class="title" data-act="focus" title="Switch to this tab">${esc(tab.title || tab.url || 'Tab')}</button>
      <button type="button" class="mute" data-act="mute" aria-pressed="${!!muted}" aria-label="${muted ? 'Unmute' : 'Mute'} tab">${muted ? 'Muted' : 'Mute'}</button>
    </div>
    ${scriptable
      ? `<div class="vol"><input type="range" min="0" max="100" step="1" value="${vol}" data-act="vol" aria-label="Volume for ${esc(tab.title || 'tab')}"><output>${vol}%</output></div>`
      : '<p class="cant">Volume can\'t be changed on this page. Mute still works.</p>'}
  </li>`;
}

async function render() {
  const tabs = await chrome.tabs.query({});
  const [active] = await chrome.tabs.query({ active: true, currentWindow: true });
  currentTabId = active ? active.id : null;
  const playing = tabs.filter(t => t.audible || (t.mutedInfo && t.mutedInfo.muted));
  const others = tabs.filter(t => !playing.includes(t) && canScript(t.url));
  $('playing').innerHTML = (await Promise.all(playing.map(rowHTML))).join('');
  $('none-playing').hidden = playing.length > 0;
  $('others').innerHTML = (await Promise.all(others.map(rowHTML))).join('');
  $('others-count').textContent = `(${others.length})`;
}

// Apply slider changes at most every 80 ms so dragging stays smooth.
function setVolumeSoon(tabId, vol, row) {
  clearTimeout(scheduled);
  scheduled = setTimeout(async () => {
    const ok = await setTabVolume(tabId, vol);
    if (!ok && row) row.querySelector('.vol').outerHTML = '<p class="cant">This page blocked the change. Mute still works.</p>';
  }, 80);
}

document.addEventListener('input', e => {
  if (e.target.dataset.act !== 'vol') return;
  const row = e.target.closest('li'), v = Number(e.target.value);
  row.querySelector('output').textContent = v + '%';
  setVolumeSoon(Number(row.dataset.tab), v / 100, row);
});

document.addEventListener('click', async e => {
  const btn = e.target.closest('[data-act]');
  if (!btn || btn.dataset.act === 'vol') return;
  const tabId = Number(btn.closest('li').dataset.tab);
  if (btn.dataset.act === 'mute') {
    const tab = await chrome.tabs.get(tabId);
    await chrome.tabs.update(tabId, { muted: !(tab.mutedInfo && tab.mutedInfo.muted) });
    render();
  } else if (btn.dataset.act === 'focus') {
    const tab = await chrome.tabs.update(tabId, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  }
});

$('mute-others').addEventListener('click', async () => {
  const tabs = await chrome.tabs.query({ audible: true });
  await Promise.all(tabs.filter(t => t.id !== currentTabId).map(t => chrome.tabs.update(t.id, { muted: true })));
  render();
});

$('unmute-all').addEventListener('click', async () => {
  const tabs = await chrome.tabs.query({});
  await Promise.all(tabs.filter(t => t.mutedInfo && t.mutedInfo.muted).map(t => chrome.tabs.update(t.id, { muted: false })));
  render();
});

// Refresh when a tab starts or stops playing, but not while a slider is being dragged.
chrome.tabs.onUpdated.addListener((id, info) => {
  if (('audible' in info || 'mutedInfo' in info || 'title' in info) && !document.activeElement.matches('input[type=range]')) render();
});
chrome.tabs.onRemoved.addListener(render);

render();
