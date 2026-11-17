// content.js runs in the page so it can't use chrome.*, this passes stuff between it and the popup
(() => {
  const root = document.documentElement;

  const apply = (t) => { root.dataset.ptTheme = t === 'light' ? 'light' : 'dark'; };
  apply();
  chrome.storage.local.get('ptTheme').then(({ ptTheme }) => apply(ptTheme)).catch(() => apply());
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.ptTheme) apply(changes.ptTheme.newValue);
  });

  // react sometimes re-renders the page and wipes our theme off <html>, so put it back
  let keep = '';
  const restore = () => {
    if (root.dataset.ptTheme) keep = root.dataset.ptTheme;
    else if (keep) root.dataset.ptTheme = keep;
  };
  restore();
  new MutationObserver(restore).observe(root, { attributes: true, attributeFilter: ['data-pt-theme'] });

  chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
    if (msg?.type === 'pt:status') {
      const d = root.dataset;
      reply({
        ok: true,
        onShop: /^\/item-shop\/?$/.test(location.pathname),
        free: d.ptFree ? Number(d.ptFree) : d.ptFree === '0' ? 0 : null,
        until: d.ptUntil || '',
        running: !!d.ptRunning,
        block: d.ptBlock || '',
      });
    } else if (msg?.type === 'pt:claim') {
      document.dispatchEvent(new CustomEvent('pt:claim'));
      reply({ ok: true });
    }
  });
})();
