(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const projectSearch = document.getElementById('projectSearch');
  const searchable = Array.from(document.querySelectorAll('.searchable'));

  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') {
    root.setAttribute('data-theme', stored);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
  syncToggleLabel();

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    syncToggleLabel();
  });

  function syncToggleLabel() {
    const theme = root.getAttribute('data-theme');
    toggle.querySelector('.theme-text').textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    toggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀' : '☾';
  }

  if (projectSearch) {
    projectSearch.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      searchable.forEach((card) => {
        const text = (card.dataset.search || card.textContent || '').toLowerCase();
        card.classList.toggle('search-hidden', q && !text.includes(q));
      });
    });
  }
})();
