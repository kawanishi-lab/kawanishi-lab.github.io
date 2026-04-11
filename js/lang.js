// Language Toggle Script
(function () {
  const STORAGE_KEY = 'pil-lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'ja';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  function applyLang(lang) {
    document.querySelectorAll('[data-ja]').forEach(el => {
      el.textContent = lang === 'ja' ? el.getAttribute('data-ja') : el.getAttribute('data-en');
    });

    document.querySelectorAll('[data-lang-ja]').forEach(el => {
      el.style.display = lang === 'ja' ? '' : 'none';
    });
    document.querySelectorAll('[data-lang-en]').forEach(el => {
      el.style.display = lang === 'en' ? '' : 'none';
    });

    // Update toggle buttons
    document.querySelectorAll('.lang-toggle .btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    document.documentElement.lang = lang;
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    const lang = getLang();
    applyLang(lang);

    document.querySelectorAll('.lang-toggle .btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setLang(btn.getAttribute('data-lang'));
      });
    });
  });

  // Expose globally
  window.PILLang = { setLang, getLang };
})();
