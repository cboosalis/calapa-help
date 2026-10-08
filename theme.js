(() => {
  const key = 'calapa-theme-v1';
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  try { const saved = localStorage.getItem(key); if (['light','dark'].includes(saved)) theme = saved; } catch {}
  document.documentElement.dataset.theme = theme;
  window.setMentorTheme = value => {
    document.documentElement.dataset.theme = value;
    try { localStorage.setItem(key, value); } catch {}
  };
})();
