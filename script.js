// script.js
// Lightweight interactivity: nav toggle, theme toggle, contact form validation, smooth scroll

(() => {
  // Common DOM helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Update copyright year
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = $('.nav-toggle');
  const navList = $('#primary-nav');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });

    // Close nav when link clicked (mobile)
    navList.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && navList.classList.contains('show')) {
        navList.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Theme toggle (persist in localStorage)
  const themeToggle = $('#theme-toggle');
  const body = document.body;
  const THEME_KEY = 'gk_theme';
  const applyTheme = (theme) => {
    if (theme === 'light') {
      body.classList.add('light');
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      body.classList.remove('light');
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  };
  // load theme
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved || 'dark');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.classList.contains('light');
      const newTheme = isLight ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
    });
  }

  // Smooth scroll for internal links
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Simple contact form handling & validation
  const form = $('#contact-form');
  const status = $('#form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = '';

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      // Basic validation
      if (!name || !email || !message) {
        status.textContent = 'Please fill all required fields.';
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        return;
      }

      // Simulate sending (replace with real submission endpoint)
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simulated async delay (do not actually wait for external resources)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
        form.reset();
        status.textContent = 'Thanks! Your message has been sent (simulated).';
      }, 850);
    });
  }

  // Accessibility: focus outlines for keyboard users only
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('show-focus-outlines');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

})();
