// Keeps each tab at the volume you chose when the page reloads or moves to a new page.
import { getTabVolume, setTabVolume, forgetTab } from './volume.js';

chrome.tabs.onUpdated.addListener(async (tabId, info) => {
  if (info.status !== 'complete') return;
  const vol = await getTabVolume(tabId);
  if (vol !== 1) await setTabVolume(tabId, vol);
});

chrome.tabs.onRemoved.addListener(tabId => { forgetTab(tabId); });
