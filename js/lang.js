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

    // Update page title
    const titleEl = document.querySelector('title[data-ja]');
    if (titleEl) {
      document.title = lang === 'ja' ? titleEl.getAttribute('data-ja') : titleEl.getAttribute('data-en');
    }

    // Update meta description
    const descEl = document.querySelector('meta[name="description"][data-ja]');
    if (descEl) {
      descEl.setAttribute('content', lang === 'ja' ? descEl.getAttribute('data-ja') : descEl.getAttribute('data-en'));
    }
  }

  // Detect language from URL path
  function getPageLang() {
    return window.location.pathname.includes('/en/') ? 'en' : 'ja';
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    const lang = getPageLang();
    applyLang(lang);

    document.querySelectorAll('.lang-toggle .btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Navigation is handled by onclick in the HTML; just update visual state
        setLang(btn.getAttribute('data-lang'));
      });
    });
  });

  // Expose globally
  window.PILLang = { setLang, getLang };
})();
