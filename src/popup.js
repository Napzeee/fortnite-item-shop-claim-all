const SHOP = 'https://www.fortnite.com/item-shop';
const $ = (s) => document.querySelector(s);
const html = document.documentElement;

function setTheme(t, save = true) {
  html.dataset.theme = t;
  $('#theme').setAttribute('aria-checked', String(t === 'dark'));
  if (save) chrome.storage.local.set({ ptTheme: t });
}
chrome.storage.local.get('ptTheme').then(({ ptTheme }) => setTheme(ptTheme === 'light' ? 'light' : 'dark', false));
$('#theme').addEventListener('click', () => setTheme(html.dataset.theme === 'dark' ? 'light' : 'dark'));

async function findShopTab() {
  const tabs = await chrome.tabs.query({ url: 'https://www.fortnite.com/item-shop*' });
  if (!tabs.length) return null;
  const [active] = await chrome.tabs.query({ active: true, currentWindow: true });
  const score = (t) => (t.id === active?.id ? 4 : 0) + (/\/item-shop\/?([?#]|$)/.test(t.url || '') ? 2 : 0) + (t.windowId === active?.windowId ? 1 : 0);
  return tabs.sort((a, b) => score(b) - score(a))[0];
}
async function focus(tab) {
  await chrome.tabs.update(tab.id, { active: true });
  await chrome.windows.update(tab.windowId, { focused: true });
}
async function ask(tab, msg) {
  try { return await chrome.tabs.sendMessage(tab.id, msg); } catch (_) { return null; }
}

function showStatus(state, text, count) {
  const s = $('#status');
  s.dataset.state = state;
  s.hidden = state === 'idle';
  s.querySelector('.txt').textContent = text;
  const b = $('#claim .badge');
  b.hidden = !(count > 0);
  b.textContent = count > 0 ? count : '';
}

async function refresh() {
  const tab = await findShopTab();
  const r = tab ? await ask(tab, { type: 'pt:status' }) : null;
  if (r?.running) { showStatus('busy', 'Claiming right now…'); $('#claim').disabled = true; return; }
  $('#claim').disabled = false;
  if (r?.block === 'signin') showStatus('warn', 'Sign in on fortnite.com first');
  else if (r?.block === 'notoken') showStatus('warn', 'No Pirate Shop token on this account');
  else if (r && typeof r.free === 'number') {
    const until = r.until ? ` · until ${r.until}` : '';
    if (r.free > 0) showStatus('ready', `${r.free} free item${r.free === 1 ? '' : 's'} waiting${until}`, r.free);
    else showStatus('done', 'Everything’s claimed ✓');
  } else if (tab) {
    showStatus('idle', 'Item Shop is open');
  } else {
    showStatus('idle', 'Open the Item Shop to see what’s free');
  }
}

$('#open').addEventListener('click', async () => {
  const tab = await findShopTab();
  if (tab) await focus(tab);
  else await chrome.tabs.create({ url: SHOP });
  window.close();
});

$('#claim').addEventListener('click', async () => {
  $('#claim').disabled = true;
  const tab = await findShopTab();
  if (tab) {
    const r = await ask(tab, { type: 'pt:claim' });
    if (r?.ok) { await focus(tab); window.close(); return; }
    // content script isn't in that tab yet, reload it
    await chrome.tabs.update(tab.id, { url: `${SHOP}?ptclaim=1`, active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  } else {
    await chrome.tabs.create({ url: `${SHOP}?ptclaim=1` });
  }
  window.close();
});

refresh();
