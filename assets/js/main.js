/* ==========================================================================
   Balanced Ketamine – main.js (vanilla, no dependencies)
   1. Mobile navigation + dropdowns
   2. FAQ accordion
   3. Appointment modal (focus trap, Esc to close)
   4. Form validation
   5. YouTube click-to-load facades (performance)
   6. Scroll reveal animations
   7. Accessibility toolbar
   8. Footer year
   9. Cookie consent (banner, preferences, GPC, consent-gated map)
   ========================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.add('js');
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const mqMobile = window.matchMedia('(max-width: 1024px)');

  /* 1. MOBILE NAVIGATION + DROPDOWNS ------------------------------------- */
  const navToggle = $('.nav-toggle');
  const mainNav = $('#main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      mainNav.classList.toggle('is-open', !open);
    });
  }

  // Dropdown parents: buttons toggle; on mobile, parent links open the submenu on first tap.
  $$('.main-nav__item.has-sub').forEach((item) => {
    const trigger = item.querySelector('.main-nav__link');
    trigger.addEventListener('click', (e) => {
      const isButton = trigger.tagName === 'BUTTON';
      if (!isButton && !mqMobile.matches) return;           // desktop link → navigate
      if (!isButton && item.classList.contains('is-open')) return; // second tap → navigate
      e.preventDefault();
      const open = !item.classList.contains('is-open');
      $$('.main-nav__item.is-open').forEach((o) => { if (o !== item) setOpen(o, false); });
      setOpen(item, open);
    });
  });
  function setOpen(item, open) {
    item.classList.toggle('is-open', open);
    const btn = item.querySelector('button.main-nav__link');
    if (btn) btn.setAttribute('aria-expanded', String(open));
  }
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav__item.has-sub')) $$('.main-nav__item.is-open').forEach((o) => setOpen(o, false));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') $$('.main-nav__item.is-open').forEach((o) => setOpen(o, false));
  });

  // Sticky mobile header: offset equals the info row height so Book/Call + MENU stay pinned.
  const headerTop = $('.header-top');
  function setHeaderOffset() {
    if (headerTop) document.documentElement.style.setProperty('--header-top-offset', headerTop.offsetHeight + 'px');
  }
  setHeaderOffset();
  window.addEventListener('resize', setHeaderOffset, { passive: true });
  window.addEventListener('load', setHeaderOffset);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setHeaderOffset);

  /* 2. FAQ ACCORDION ------------------------------------------------------ */
  $$('[data-accordion]').forEach((acc) => {
    const triggers = $$('.accordion__trigger', acc);
    triggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        // Reference behaviour: one item open at a time.
        triggers.forEach((other) => { if (other !== btn) toggle(other, false); });
        toggle(btn, !expanded);
      });
    });
  });
  function toggle(btn, open) {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel || (btn.getAttribute('aria-expanded') === 'true') === open) return;
    btn.setAttribute('aria-expanded', String(open));
    if (open) {
      panel.hidden = false;
      panel.style.height = '0px';
      requestAnimationFrame(() => { panel.style.height = panel.scrollHeight + 'px'; });
      panel.addEventListener('transitionend', () => { panel.style.height = ''; }, { once: true });
    } else {
      panel.style.height = panel.scrollHeight + 'px';
      requestAnimationFrame(() => { panel.style.height = '0px'; });
      panel.addEventListener('transitionend', () => { panel.hidden = true; panel.style.height = ''; }, { once: true });
    }
  }

  /* 3. APPOINTMENT MODAL -------------------------------------------------- */
  let lastFocus = null;
  const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

  $$('[data-modal-open]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const modal = document.getElementById(el.dataset.modalOpen);
      if (!modal) return;                                    // fallback: follow href
      e.preventDefault();
      openModal(modal);
    });
  });
  function openModal(modal) {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    const first = $('input:not([disabled]), button', modal);
    if (first) first.focus();
    modal.addEventListener('keydown', trap);
  }
  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = '';
    modal.removeEventListener('keydown', trap);
    if (lastFocus) lastFocus.focus();
  }
  function trap(e) {
    const modal = e.currentTarget;
    if (e.key === 'Escape') { closeModal(modal); return; }
    if (e.key !== 'Tab') return;
    const items = $$(FOCUSABLE, modal).filter((n) => n.offsetParent !== null);
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  $$('[data-modal-close]').forEach((el) => el.addEventListener('click', () => closeModal(el.closest('.modal'))));

  /* 4. FORM VALIDATION ---------------------------------------------------- */
  $$('form.js-validate').forEach((form) => {
    const fields = $$('.form__input', form);
    fields.forEach((input) => {
      input.addEventListener('blur', () => validate(input));
      input.addEventListener('input', () => { if (input.closest('.has-error')) validate(input); });
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = $('.form__status', form);
      const invalid = fields.filter((f) => !validate(f));
      if (invalid.length) {
        invalid[0].focus();
        status.textContent = 'Please correct the highlighted fields.';
        return;
      }
      // TODO: replace with real submission (fetch to form endpoint / CRM).
      status.textContent = 'Thank you! Your request has been received. Our team will contact you shortly.';
      form.reset();
    });
  });
  function validate(input) {
    const value = input.value.trim();
    let ok = input.checkValidity() && (!input.required || value.length > 0);
    if (input.type === 'email' && value) ok = ok && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    const wrap = input.closest('.form__field');
    wrap.classList.toggle('has-error', !ok);
    input.setAttribute('aria-invalid', String(!ok));
    return ok;
  }

  /* 5. YOUTUBE FACADES ---------------------------------------------------- */
  // Renders a lightweight thumbnail + play button; the real iframe loads on click.
  $$('.video[data-youtube]').forEach((box) => {
    const id = box.dataset.youtube;
    const title = box.dataset.title || 'Video';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'video__btn';
    btn.setAttribute('aria-label', 'Play video: ' + title);
    btn.innerHTML =
      '<img src="https://i.ytimg.com/vi_webp/' + id + '/hqdefault.webp" width="480" height="360" loading="lazy" decoding="async" alt="">' +
      '<span class="video__play" aria-hidden="true"></span>';
    btn.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      box.replaceChildren(iframe);
      iframe.focus();
    });
    box.appendChild(btn);
  });

  /* 6. SCROLL REVEAL ------------------------------------------------------ */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* 7. ACCESSIBILITY TOOLBAR --------------------------------------------- */
  const a11yToggle = $('.a11y__toggle');
  const a11yPanel = $('#a11y-panel');
  const root = document.documentElement;
  const KEY = 'bk-a11y';
  let state = { size: 100, flags: [] };
  try { state = JSON.parse(localStorage.getItem(KEY)) || state; } catch (e) { /* storage unavailable */ }

  function applyA11y() {
    document.body.style.zoom = state.size === 100 ? '' : String(state.size / 100);
    ['grayscale', 'contrast', 'negative', 'light', 'underline', 'readable'].forEach((f) => {
      root.classList.toggle('a11y-' + f, state.flags.includes(f));
      const b = $('[data-a11y="' + f + '"]');
      if (b) b.setAttribute('aria-pressed', String(state.flags.includes(f)));
    });
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }
  if (a11yToggle && a11yPanel) {
    a11yToggle.addEventListener('click', () => {
      const open = a11yPanel.hidden;
      a11yPanel.hidden = !open;
      a11yToggle.setAttribute('aria-expanded', String(open));
    });
    $$('[data-a11y]', a11yPanel).forEach((b) => b.addEventListener('click', () => {
      const action = b.dataset.a11y;
      if (action === 'text-up') state.size = Math.min(state.size + 10, 150);
      else if (action === 'text-down') state.size = Math.max(state.size - 10, 80);
      else if (action === 'reset') state = { size: 100, flags: [] };
      else {
        // filters are mutually exclusive
        const filters = ['grayscale', 'contrast', 'negative'];
        const has = state.flags.includes(action);
        state.flags = state.flags.filter((f) => f !== action && !(filters.includes(action) && filters.includes(f)));
        if (!has) state.flags.push(action);
      }
      applyA11y();
    }));
    applyA11y();
  }

  /* 9. COOKIE CONSENT ----------------------------------------------------- */
  // Categories: necessary (always on), preferences, statistics, marketing.
  // Third-party scripts must only be loaded from loadConsented() below.
  const CONSENT_KEY = 'bk-consent';
  const CONSENT_VERSION = 1;
  const gpc = navigator.globalPrivacyControl === true;   // honour Global Privacy Control
  const banner = $('#consent-banner');
  const consentModal = $('#consent-modal');
  let consent = null;
  try { consent = JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch (e) { consent = null; }
  if (consent && consent.v !== CONSENT_VERSION) consent = null;

  function saveConsent(prefs) {
    consent = {
      v: CONSENT_VERSION,
      preferences: !!prefs.preferences,
      statistics: !!prefs.statistics,
      marketing: !!prefs.marketing && !gpc,
      date: new Date().toISOString()
    };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(consent)); } catch (e) { /* storage blocked */ }
    if (banner) banner.hidden = true;
    syncSwitches();
    loadConsented();
    document.dispatchEvent(new CustomEvent('bk:consent', { detail: consent }));
  }
  function syncSwitches() {
    if (!consentModal) return;
    ['preferences', 'statistics', 'marketing'].forEach((cat) => {
      const box = $('input[name="' + cat + '"]', consentModal);
      if (box) box.checked = !!(consent && consent[cat]);
    });
    const mk = $('input[name="marketing"]', consentModal);
    if (mk && gpc) { mk.checked = false; mk.disabled = true; }
    const note = $('.consent-gpc', consentModal);
    if (note) note.hidden = !gpc;
  }
  function loadConsented() {
    if (!consent) return;
    // Google Maps embeds set third-party cookies → marketing category.
    if (consent.marketing) $$('.map[data-map-src]').forEach(loadMap);
    // TODO (statistics): load Google Tag Manager here only when consent.statistics is true.
    // TODO (marketing): load Meta Pixel here only when consent.marketing is true.
  }
  function loadMap(box) {
    if (box.classList.contains('is-loaded')) return;
    const iframe = document.createElement('iframe');
    iframe.src = box.dataset.mapSrc;
    iframe.title = box.dataset.mapTitle || 'Map';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    box.appendChild(iframe);
    box.classList.add('is-loaded');
  }

  if (banner && !consent) banner.hidden = false;
  syncSwitches();
  loadConsented();

  const closeConsentModal = () => { if (consentModal && !consentModal.hidden) closeModal(consentModal); };
  $$('[data-consent="accept"]').forEach((b) => b.addEventListener('click', () => {
    saveConsent({ preferences: true, statistics: true, marketing: true });
    closeConsentModal();
  }));
  $$('[data-consent="reject"]').forEach((b) => b.addEventListener('click', () => {
    saveConsent({});
    closeConsentModal();
  }));
  $$('[data-consent="save"]').forEach((b) => b.addEventListener('click', () => {
    const val = (n) => { const i = $('input[name="' + n + '"]', consentModal); return !!(i && i.checked); };
    saveConsent({ preferences: val('preferences'), statistics: val('statistics'), marketing: val('marketing') });
    closeConsentModal();
  }));
  $$('[data-consent="manage"]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault();
    if (consentModal) { syncSwitches(); openModal(consentModal); }
  }));
  // "Accept marketing cookies & load map" button inside the map placeholder
  $$('[data-consent="map"]').forEach((b) => b.addEventListener('click', () => {
    saveConsent({
      preferences: consent ? consent.preferences : false,
      statistics: consent ? consent.statistics : false,
      marketing: true
    });
  }));
  // Live status line on the cookie policy page
  const statusEl = $('[data-consent-status]');
  function renderStatus() {
    if (!statusEl) return;
    statusEl.textContent = consent
      ? 'Your current choice (saved ' + new Date(consent.date).toLocaleDateString() + '): necessary – on; preferences – ' +
        (consent.preferences ? 'on' : 'off') + '; statistics – ' + (consent.statistics ? 'on' : 'off') +
        '; marketing – ' + (consent.marketing ? 'on' : 'off') + '.'
      : 'You have not made a cookie choice on this device yet.';
  }
  renderStatus();
  document.addEventListener('bk:consent', renderStatus);

  /* 8. FOOTER YEAR -------------------------------------------------------- */
  const year = $('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
