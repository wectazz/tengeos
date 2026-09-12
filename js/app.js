/**
 * TENGE OS - App Logic & SPA Router with Full i18n (Russian & English)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- i18n Translations Dictionary ---
  const TRANSLATIONS = {
    ru: {
      search_placeholder: "Поиск прошивок...",
      hero_badge_text: "Официальный репозиторий TengeOS",
      hero_title: "TengeOS Firmware Hub",
      hero_subtitle: "Сборки TengeOS на базе HyperOS с расширенными возможностями, высокой стабильностью и полной локализацией.",
      feature_perf_title: "Оптимизация производительности",
      feature_perf_desc: "Улучшенный троттлинг, разблокированные 90/120 FPS и чистый порт без лишнего мусора.",
      feature_security_title: "Контрольные суммы SHA-256",
      feature_security_desc: "100% гарантия целостности файлов архивов перед установкой.",
      back_to_devices: "К выбору устройства",
      all_builds: "Все сборки TengeOS",
      warning_note: "Рекомендуется чистая установка с форматированием данных",
      install_guide: "Инструкция по установке",
      step_by_step: "Пошаговое руководство",
      modal_ok_btn: "Понятно, всё готово",
      footer_title: "TENGE OS — Custom Project",
      footer_desc: "Разработано @wectazz. Все прошивки протестированы на стабильность работы в реальных условиях.",
      footer_link_telegram: "Telegram Канал",
      toast_copied: "SHA-256 хэш скопирован в буфер обмена!",
      toast_theme_dark: "Тема изменена на темную",
      toast_theme_light: "Тема изменена на светлую",
      toast_lang: "Язык переключен на русский",
      changelog_tab: "📝 Чейнджлог",
      notes_tab: "💡 Примечания (Notes)",
      bugs_tab: "⚠️ Известные баги (Bugs)",
      screenshots_title: "Скриншоты интерфейса:",
      specs_soc: "Процессор",
      specs_screen: "Дисплей",
      specs_ram: "Память",
      specs_battery: "Батарея",
      btn_open_firmwares: "Открыть прошивки",
      firmware_count_text: "сборка TengeOS",
      android_os: "Android OS",
      security_patch: "Патч безопасности",
      release_date: "Дата релиза",
      maintainer: "Мейнтейнер",
      size: "Размер",
      features_highlight: "Особенности сборки:",
      no_notes: "Нет особых примечаний",
      no_bugs: "Критических багов не обнаружено",
      no_firmwares: "В этой категории прошивок нет.",
      install_guide_title: "Инструкция по установке",
      type_label: "Тип",
      version_label: "Версия",
      toast_download: "Переход к загрузке:",
      toast_copy_fail: "Не удалось скопировать хэш",
      lightbox_alt: "Скриншот TengeOS"
    },
    en: {
      search_placeholder: "Search firmwares...",
      hero_badge_text: "Official TengeOS Repository",
      hero_title: "TengeOS Firmware Hub",
      hero_subtitle: "Custom TengeOS builds based on HyperOS with enhanced features, high stability and full localization.",
      feature_perf_title: "Performance Optimization",
      feature_perf_desc: "Improved thermal throttling, unlocked 90/120 FPS and clean debloated port.",
      feature_security_title: "SHA-256 Checksums",
      feature_security_desc: "100% integrity guarantee of archive files before installation.",
      back_to_devices: "Back to Devices",
      all_builds: "All TengeOS Builds",
      warning_note: "Clean flash with data formatting is recommended",
      install_guide: "Installation Guide",
      step_by_step: "Step-by-step tutorial",
      modal_ok_btn: "Got it, all set",
      footer_title: "TENGE OS — Custom Project",
      footer_desc: "Developed by @wectazz. All firmwares are thoroughly tested for daily driver stability.",
      footer_link_telegram: "Telegram Channel",
      toast_copied: "SHA-256 hash copied to clipboard!",
      toast_theme_dark: "Theme changed to dark",
      toast_theme_light: "Theme changed to light",
      toast_lang: "Language switched to English",
      changelog_tab: "📝 Changelog",
      notes_tab: "💡 Notes & Tips",
      bugs_tab: "⚠️ Known Bugs",
      screenshots_title: "Interface Screenshots:",
      specs_soc: "Processor",
      specs_screen: "Display",
      specs_ram: "Memory",
      specs_battery: "Battery",
      btn_open_firmwares: "Open Firmwares",
      firmware_count_text: "TengeOS build",
      android_os: "Android OS",
      security_patch: "Security Patch",
      release_date: "Release Date",
      maintainer: "Maintainer",
      size: "File Size",
      features_highlight: "Build Highlights:",
      no_notes: "No special notes",
      no_bugs: "No critical bugs found",
      no_firmwares: "No firmwares found in this category.",
      install_guide_title: "Installation Guide",
      type_label: "Type",
      version_label: "Version",
      toast_download: "Redirecting to download:",
      toast_copy_fail: "Failed to copy hash",
      lightbox_alt: "TengeOS screenshot"
    }
  };

  // Language auto-detection & initialization (validate stored value)
  let currentLang = localStorage.getItem('tenge_lang');
  if (currentLang !== 'ru' && currentLang !== 'en') {
    const sysLang = navigator.language || navigator.userLanguage || 'ru';
    currentLang = sysLang.startsWith('ru') ? 'ru' : 'en';
  }

  // DOM Elements
  const devicesView = document.getElementById('devices-view');
  const firmwaresView = document.getElementById('firmwares-view');
  const devicesContainer = document.getElementById('devices-container');
  const firmwareListContainer = document.getElementById('firmware-list-container');
  const deviceHeroBanner = document.getElementById('device-hero-banner');
  const crumbDeviceName = document.getElementById('crumb-device-name');
  const backToDevicesBtn = document.getElementById('back-to-devices-btn');
  const globalSearchInput = document.getElementById('global-search');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const langToggleBtn = document.getElementById('lang-toggle');
  const filterTabsContainer = document.getElementById('firmware-filter-tabs');

  // Lightbox Modal Elements
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');

  // Installation Modal Elements
  const installModal = document.getElementById('install-modal');
  const installModalTitle = document.getElementById('install-modal-title');
  const installModalSubtitle = document.getElementById('install-modal-subtitle');
  const installModalSteps = document.getElementById('install-modal-steps');
  const installModalClose = document.getElementById('install-modal-close');
  const installModalOk = document.getElementById('install-modal-ok');

  // State
  let currentDeviceId = null;
  let currentFilter = 'all';
  let activeLightboxScreenshots = [];
  let currentScreenshotIndex = 0;

  // Escape data-driven strings before injecting into innerHTML
  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  // Clipboard with fallback for non-secure contexts / older browsers
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        return ok;
      } catch (err2) {
        return false;
      }
    }
  }

  // Collect every screenshot of a device (banner first) for the lightbox
  function collectDeviceScreenshots(device) {
    const shots = [{ url: device.image }];
    (device.firmwares || []).forEach((fw) => {
      (fw.screenshots || []).forEach((shot) => shots.push(shot));
    });
    return shots;
  }

  function openScreenshots(shots, index) {
    if (!shots || !shots.length) return;
    activeLightboxScreenshots = shots;
    currentScreenshotIndex = Math.min(Math.max(index || 0, 0), shots.length - 1);
    openLightbox();
  }

  // Apply Language to Static Elements
  function updateLanguageUI() {
    if (langToggleBtn) {
      langToggleBtn.textContent = currentLang.toUpperCase();
    }
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[currentLang][key]) {
        el.textContent = TRANSLATIONS[currentLang][key];
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (TRANSLATIONS[currentLang][key]) {
        el.placeholder = TRANSLATIONS[currentLang][key];
      }
    });
    document.documentElement.lang = currentLang;
    const kbdHint = document.getElementById('search-shortcut-hint');
    if (kbdHint) {
      kbdHint.textContent = navigator.platform && /mac/i.test(navigator.platform) ? '⌘K' : 'Ctrl K';
    }
  }

  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('tenge_lang', currentLang);
    updateLanguageUI();
    showToast(TRANSLATIONS[currentLang].toast_lang, 'info');
    if (currentDeviceId) {
      renderFirmwares(currentDeviceId);
    } else {
      renderDevices();
    }
  });

  // Theme Initialization (validate stored value, don't wipe other body classes)
  const savedTheme = localStorage.getItem('tenge_theme');
  const initialTheme = savedTheme === 'light-theme' || savedTheme === 'dark-theme' ? savedTheme : 'dark-theme';
  document.body.classList.remove('dark-theme', 'light-theme');
  document.body.classList.add(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light-theme' : 'dark-theme';
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(newTheme);
    localStorage.setItem('tenge_theme', newTheme);
    showToast(isDark ? TRANSLATIONS[currentLang].toast_theme_light : TRANSLATIONS[currentLang].toast_theme_dark, 'info');
  });

  // --- Interactive Canvas Background with Floating Particles & Mouse Connection ---
  const canvas = document.getElementById('bg-canvas');
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    // Cap DPR for performance; drawing coordinates stay in CSS pixels
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles = [];
    let rafId = null;

    const mouse = { x: null, y: null, radius: 120 };

    function buildParticles() {
      const particleCount = Math.min(Math.floor((width * height) / 15000), 75);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 1.5 + 1
        });
      }
    }

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildParticles();
    }

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 150);
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      const isLight = document.body.classList.contains('light-theme');
      const dotColor = isLight ? 'rgba(37, 99, 235, 0.4)' : 'rgba(59, 130, 246, 0.5)';
      const lineColor = isLight ? 'rgba(37, 99, 235, ' : 'rgba(59, 130, 246, ';

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor + (1 - dist / 110) * 0.2 + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = lineColor + (1 - mdist / mouse.radius) * 0.4 + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();

            const angle = Math.atan2(mdy, mdx);
            p.x += Math.cos(angle) * 0.5;
            p.y += Math.sin(angle) * 0.5;
          }
        }
      });

      rafId = requestAnimationFrame(animateParticles);
    }

    function startParticles() {
      if (rafId === null && !document.hidden) {
        rafId = requestAnimationFrame(animateParticles);
      }
    }

    function stopParticles() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    // Don't burn CPU/GPU in background tabs
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopParticles();
      else startParticles();
    });

    resizeCanvas();
    startParticles();
  } else if (canvas) {
    canvas.style.display = 'none';
  }

  // Render Devices Grid (Page 1)
  function renderDevices() {
    devicesContainer.innerHTML = '';
    const t = TRANSLATIONS[currentLang];
    
    Object.values(DEVICES_DATA).forEach(device => {
      const card = document.createElement('div');
      card.className = 'device-card';
      card.setAttribute('data-device-id', device.id);

      card.innerHTML = `
        <div class="device-img-wrap">
          <img src="${esc(device.image)}" alt="${esc(device.name)}" loading="lazy">
          <span class="device-badge-overlay">${esc(device.codename)}</span>
        </div>
        <div class="device-content">
          <div class="device-title-row">
            <h2 class="device-name">${esc(device.name)}</h2>
            <span class="device-status">${esc(device.status[currentLang])}</span>
          </div>
          <p class="device-tagline">${esc(device.tagline[currentLang])}</p>

          <div class="specs-mini-list">
            <div class="spec-item">
              <span class="spec-label">${t.specs_soc}</span>
              <span class="spec-value">${esc(device.specs.soc)}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">${t.specs_screen}</span>
              <span class="spec-value">${esc(device.specs.screen)}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">${t.specs_ram}</span>
              <span class="spec-value">${esc(device.specs.ram)}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">${t.specs_battery}</span>
              <span class="spec-value">${esc(device.specs.battery)}</span>
            </div>
          </div>

          <div class="device-footer">
            <span class="firmware-count">${(device.firmwares || []).length} ${t.firmware_count_text}</span>
            <span class="btn-arrow">
              ${t.btn_open_firmwares}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        window.location.hash = `#device/${device.id}`;
      });

      devicesContainer.appendChild(card);
    });
  }

  // Render Device Firmwares (Page 2)
  function renderFirmwares(deviceId) {
    const device = DEVICES_DATA[deviceId];
    if (!device) {
      window.location.hash = '#devices';
      return;
    }

    currentDeviceId = deviceId;
    crumbDeviceName.textContent = device.name;
    const t = TRANSLATIONS[currentLang];

    // Render Hero Banner
    deviceHeroBanner.innerHTML = `
      <div class="banner-left">
        <h2>${esc(device.name)}</h2>
        <p>${esc(device.tagline[currentLang])}</p>
        <div class="banner-specs-badges">
          <span class="spec-badge">Codename: ${esc(device.codename)}</span>
          <span class="spec-badge">${esc(device.specs.soc)}</span>
          <span class="spec-badge">${esc(device.specs.battery)}</span>
        </div>
      </div>
      <div class="banner-right" id="clickable-banner" title="Banner preview">
        <img src="${esc(device.image)}" alt="${esc(device.name)} Banner">
      </div>
    `;

    const clickableBanner = document.getElementById('clickable-banner');
    if (clickableBanner) {
      clickableBanner.addEventListener('click', () => {
        openScreenshots(collectDeviceScreenshots(device), 0);
      });
    }

    // Filter & count (tabs are generated from actual firmware categories)
    renderFilterTabs(device);
    let firmwares = device.firmwares || [];

    if (currentFilter !== 'all') {
      const needle = currentFilter.toLowerCase();
      firmwares = firmwares.filter((f) => (f.category || '').toLowerCase().includes(needle));
    }

    firmwareListContainer.innerHTML = '';

    if (firmwares.length === 0) {
      firmwareListContainer.innerHTML = `
        <div style="text-align: center; padding: 4rem; color: var(--text-secondary);">
          <p>${esc(t.no_firmwares)}</p>
        </div>
      `;
      return;
    }

    firmwares.forEach(fw => {
      const card = document.createElement('div');
      card.className = 'firmware-card';

      const shots = fw.screenshots || [];
      const screenshotsHtml = shots.map((shot, idx) => `
        <div class="screenshot-thumb" data-fw-id="${esc(fw.id)}" data-index="${idx}" title="Screenshot ${idx + 1}">
          <img src="${esc(shot.url)}" alt="Screenshot ${idx + 1}" loading="lazy">
        </div>
      `).join('');

      const changelogList = (fw.changelog && fw.changelog[currentLang]) || [];
      const changelogHtml = changelogList.map(item => `<li>${esc(item)}</li>`).join('');
      const notesList = (fw.notes && fw.notes[currentLang]) || [];
      const notesHtml = notesList.length > 0 ? notesList.map(n => `<li>${esc(n)}</li>`).join('') : `<li>${esc(t.no_notes)}</li>`;

      const bugsList = (fw.bugs && fw.bugs[currentLang]) || [];
      const bugsHtml = bugsList.length > 0 ? bugsList.map(b => `<li>${esc(b)}</li>`).join('') : `<li>${esc(t.no_bugs)}</li>`;

      const shortHash = (fw.sha256 || '').substring(0, 12);
      const downloadsHtml = (fw.downloads || []).map(dl => `
        <a href="${esc(dl.url)}" target="_blank" rel="noopener" class="btn ${dl.primary ? 'btn-primary' : 'btn-secondary'} download-trigger" data-name="${esc(dl.name)}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          ${esc(dl.name)}
        </a>
      `).join('');

      card.innerHTML = `
        <div class="firmware-header-row">
          <div class="firmware-title-group">
            <h3>${esc(fw.name)}</h3>
            <div class="firmware-badges">
              <span class="fw-badge category">${esc(fw.category)}</span>
              <span class="fw-badge version">${esc(fw.version)}</span>
              <span class="fw-badge status">${esc(fw.status)}</span>
            </div>
          </div>
          <button class="btn btn-primary install-guide-btn" data-fw-id="${esc(fw.id)}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 12 12 12 8"></polyline><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            ${t.install_guide}
          </button>
        </div>

        <div class="firmware-meta-grid">
          <div class="meta-item">
            <span class="meta-label">${t.android_os}</span>
            <span class="meta-val">${esc(fw.androidVersion)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${t.security_patch}</span>
            <span class="meta-val">${esc(fw.securityPatch)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${t.release_date}</span>
            <span class="meta-val">${esc(fw.buildDate && fw.buildDate[currentLang])}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${t.maintainer}</span>
            <span class="meta-val">${esc(fw.maintainer)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${t.size}</span>
            <span class="meta-val">${esc(fw.fileSize)}</span>
          </div>
          <div class="meta-item meta-hash" title="Copy SHA-256" id="copy-hash-${esc(fw.id)}">
            <span class="meta-label">SHA-256 Checksum 📋</span>
            <span class="meta-val mono">${shortHash ? esc(shortHash) + '...' : '—'}</span>
          </div>
        </div>

        <div class="firmware-highlight">
          <strong>${t.features_highlight}</strong> ${esc(fw.highlight && fw.highlight[currentLang])}
        </div>

        <div class="info-tabs-container" style="margin-bottom: 1.5rem;">
          <div class="info-tabs-header">
            <button class="info-tab-btn active" data-tab="changelog-${esc(fw.id)}" data-color="accent">${t.changelog_tab}</button>
            <button class="info-tab-btn" data-tab="notes-${esc(fw.id)}" data-color="warning">${t.notes_tab}</button>
            <button class="info-tab-btn" data-tab="bugs-${esc(fw.id)}" data-color="danger">${t.bugs_tab}</button>
          </div>

          <div class="info-tab-content active" id="changelog-${esc(fw.id)}">
            <ul class="changelog-list">
              ${changelogHtml}
            </ul>
          </div>
          <div class="info-tab-content" id="notes-${esc(fw.id)}" style="display: none;">
            <ul class="changelog-list" style="color: var(--warning);">
              ${notesHtml}
            </ul>
          </div>
          <div class="info-tab-content" id="bugs-${esc(fw.id)}" style="display: none;">
            <ul class="changelog-list" style="color: #ef4444;">
              ${bugsHtml}
            </ul>
          </div>
        </div>

        ${shots.length > 0 ? `
          <div class="screenshots-section">
            <div class="screenshots-title">${t.screenshots_title}</div>
            <div class="screenshots-grid">
              ${screenshotsHtml}
            </div>
          </div>
        ` : ''}

        <div class="firmware-actions-row">
          <div class="download-buttons-group">
            ${downloadsHtml}
          </div>
        </div>
      `;

      // Color-coded tab switching logic (styles live in CSS: .info-tab-btn)
      const tabBtns = card.querySelectorAll('.info-tab-btn');
      const TAB_ACTIVE_CLASS = {
        accent: 'is-active-accent',
        warning: 'is-active-warning',
        danger: 'is-active-danger'
      };

      function applyTabStyles(activeBtn) {
        tabBtns.forEach((b) => {
          b.classList.remove('is-active-accent', 'is-active-warning', 'is-active-danger');
        });
        activeBtn.classList.add(TAB_ACTIVE_CLASS[activeBtn.getAttribute('data-color')] || 'is-active-accent');
      }

      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetTabId = btn.getAttribute('data-tab');
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          applyTabStyles(btn);

          const tabContents = card.querySelectorAll('.info-tab-content');
          tabContents.forEach(content => {
            if (content.id === targetTabId) {
              content.style.display = 'block';
            } else {
              content.style.display = 'none';
            }
          });
        });
      });

      applyTabStyles(card.querySelector('.info-tab-btn.active'));

      // Copy SHA-256 event listener (with fallback for non-secure contexts)
      const copyId = 'copy-hash-' + fw.id;
      const copyEl = card.querySelector('#' + (window.CSS && CSS.escape ? CSS.escape(copyId) : copyId));
      if (copyEl) {
        copyEl.addEventListener('click', async () => {
          const ok = await copyText(fw.sha256 || '');
          showToast(ok ? t.toast_copied : t.toast_copy_fail, ok ? 'success' : 'info');
        });
      }

      // Screenshot thumbnail click events
      const thumbs = card.querySelectorAll('.screenshot-thumb');
      thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
          const imgIndex = parseInt(thumb.getAttribute('data-index'), 10);
          openScreenshots([{ url: device.image }, ...(fw.screenshots || [])], imgIndex + 1);
        });
      });

      // Install Guide button
      const guideBtn = card.querySelector('.install-guide-btn');
      guideBtn.addEventListener('click', () => {
        openInstallModal(fw);
      });

      // Download button handler
      const dlBtns = card.querySelectorAll('.download-trigger');
      dlBtns.forEach(dlBtn => {
        dlBtn.addEventListener('click', () => {
          const dlName = dlBtn.getAttribute('data-name');
          showToast(`${t.toast_download} ${dlName}`, 'success');
        });
      });

      firmwareListContainer.appendChild(card);
    });
  }

  // Router based on location.hash
  function handleRoute() {
    const hash = window.location.hash || '#devices';

    if (hash === '#devices' || hash === '' || hash === '#') {
      devicesView.classList.add('active');
      firmwaresView.classList.remove('active');
      renderDevices();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (hash.startsWith('#device/')) {
      const deviceId = hash.replace('#device/', '');
      if (DEVICES_DATA[deviceId]) {
        devicesView.classList.remove('active');
        firmwaresView.classList.add('active');
        currentFilter = 'all';
        renderFirmwares(deviceId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.hash = '#devices';
      }
    }
  }

  // Build filter tabs from actual firmware categories (works for any new category)
  function renderFilterTabs(device) {
    if (!filterTabsContainer) return;
    const allFirmwares = device.firmwares || [];
    const categories = [...new Set(allFirmwares.map((f) => f.category).filter(Boolean))];
    const t = TRANSLATIONS[currentLang];
    filterTabsContainer.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = 'filter-tab' + (currentFilter === 'all' ? ' active' : '');
    allBtn.setAttribute('data-filter', 'all');
    allBtn.textContent = `${t.all_builds} (${allFirmwares.length})`;
    filterTabsContainer.appendChild(allBtn);

    categories.forEach((cat) => {
      const count = allFirmwares.filter((f) => f.category === cat).length;
      const btn = document.createElement('button');
      btn.className = 'filter-tab' + (currentFilter === cat ? ' active' : '');
      btn.setAttribute('data-filter', cat);
      btn.textContent = `${cat} (${count})`;
      filterTabsContainer.appendChild(btn);
    });
  }

  // Filter tabs click (delegated; .closest handles clicks on inner spans)
  filterTabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest ? e.target.closest('.filter-tab') : null;
    if (!tab || !filterTabsContainer.contains(tab)) return;
    currentFilter = tab.getAttribute('data-filter');
    if (currentDeviceId) {
      renderFirmwares(currentDeviceId);
    }
  });

  backToDevicesBtn.addEventListener('click', () => {
    window.location.hash = '#devices';
  });

  // Lightbox functions
  function openLightbox() {
    if (!activeLightboxScreenshots.length) return;
    updateLightboxImage();
    lightboxModal.classList.add('open');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('open');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    const shot = activeLightboxScreenshots[currentScreenshotIndex];
    if (!shot) return;
    lightboxImg.src = shot.url;
    const shotTitle = shot.title && (shot.title[currentLang] || shot.title.en || shot.title.ru);
    lightboxImg.alt = shotTitle || TRANSLATIONS[currentLang].lightbox_alt;
    lightboxCounter.textContent = `${currentScreenshotIndex + 1} / ${activeLightboxScreenshots.length}`;
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  lightboxPrev.addEventListener('click', () => {
    currentScreenshotIndex = (currentScreenshotIndex - 1 + activeLightboxScreenshots.length) % activeLightboxScreenshots.length;
    updateLightboxImage();
  });

  lightboxNext.addEventListener('click', () => {
    currentScreenshotIndex = (currentScreenshotIndex + 1) % activeLightboxScreenshots.length;
    updateLightboxImage();
  });

  // Installation Modal functions
  function openInstallModal(fw) {
    const t = TRANSLATIONS[currentLang];
    installModalTitle.textContent = `${t.install_guide}: ${fw.name}`;
    installModalSubtitle.textContent = `${t.type_label}: ${fw.type} • ${t.version_label} ${fw.version}`;
    
    installModalSteps.innerHTML = '';
    
    const htmlContent = currentLang === 'ru' ? `
      <div class="install-blocks">
        <div class="install-block install-block-fastboot">
          <h4>
            ⚡ FASTBOOT Установка:
          </h4>
          <ol class="install-steps">
            <li>Распакуйте загруженный архиватор с прошивкой на ПК.</li>
            <li>Убедитесь, что телефон подключен к компьютеру в режиме Fastboot (Bootloader).</li>
            <li>Перейдите в распакованную папку с прошивкой (папка ROM).</li>
            <li>Запустите скрипт <code>.bat</code> (для Windows) или <code>.sh</code> (для Linux/macOS) — доступна чистая или грязная установка.</li>
            <li>Дождитесь окончания процесса прошивки (телефон перезагрузится автоматически).</li>
            <li>Установите менеджер рут-прав при необходимости (рекомендуется non-fenrir).</li>
          </ol>
        </div>

        <div class="install-block install-block-recovery">
          <h4>
            🔄 RECOVERY Установка:
          </h4>
          <ol class="install-steps">
            <li>Перезагрузите устройство в кастомное рекавери (например, OrangeFox).</li>
            <li>Выберите архив прошивки и сделайте свайп (Swipe to flash ROM).</li>
            <li>После завершения прошивки перезагрузите устройство обратно в рекавери (Reboot to Recovery).</li>
            <li>Произведите сброс данных (Wipe Data / Format Data).</li>
            <li>Перезагрузите устройство в систему (Reboot to System).</li>
          </ol>
        </div>
      </div>
    ` : `
      <div class="install-blocks">
        <div class="install-block install-block-fastboot">
          <h4>
            ⚡ FASTBOOT Installation:
          </h4>
          <ol class="install-steps">
            <li>Extract the downloaded archive on your PC.</li>
            <li>Ensure your phone is connected to PC and in Fastboot mode (bootloader).</li>
            <li>Navigate to the ROM folder.</li>
            <li>Launch <code>.bat</code> (Windows) or <code>.sh</code> (Linux/macOS) script (clean or dirty flash).</li>
            <li>Wait until it finishes and the device restarts automatically.</li>
            <li>Install your preferred root manager if needed (non-fenrir).</li>
          </ol>
        </div>

        <div class="install-block install-block-recovery">
          <h4>
            🔄 RECOVERY Installation:
          </h4>
          <ol class="install-steps">
            <li>Reboot to custom recovery (e.g. OrangeFox).</li>
            <li>Swipe to flash ROM archive.</li>
            <li>Reboot back to recovery.</li>
            <li>Wipe / Format data.</li>
            <li>Reboot to system.</li>
          </ol>
        </div>
      </div>
    `;

    installModalSteps.innerHTML = htmlContent;
    installModal.classList.add('open');
    installModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeInstallModal() {
    installModal.classList.remove('open');
    installModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  installModalClose.addEventListener('click', closeInstallModal);
  installModalOk.addEventListener('click', closeInstallModal);
  installModal.addEventListener('click', (e) => {
    if (e.target === installModal) closeInstallModal();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeInstallModal();
    }
    if (lightboxModal.classList.contains('open')) {
      if (e.key === 'ArrowLeft') lightboxPrev.click();
      if (e.key === 'ArrowRight') lightboxNext.click();
    }
    if ((e.metaKey || e.ctrlKey) && e.key && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      globalSearchInput.focus();
    }
  });

  // Toast Notification System (capped, XSS-safe via textContent)
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    while (container.children.length >= 3) {
      container.firstChild.remove();
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = document.createElement('span');
    icon.textContent = type === 'success' ? '✓' : 'ℹ️';
    const text = document.createElement('span');
    text.textContent = message;
    toast.append(icon, text);
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('is-hiding');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Search matches the query against device metadata (all words must match)
  globalSearchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (q.length < 2) return;
    const words = q.split(/\s+/);
    const match = Object.values(DEVICES_DATA).find((device) => {
      const haystack = [
        device.name,
        device.codename,
        device.tagline && device.tagline.ru,
        device.tagline && device.tagline.en,
        ...((device.firmwares || []).flatMap((fw) => [fw.name, fw.version, fw.category]))
      ].filter(Boolean).join(' ').toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
    if (match) {
      window.location.hash = `#device/${match.id}`;
    }
  });

  window.addEventListener('hashchange', handleRoute);
  
  // Initial startup
  updateLanguageUI();
  handleRoute();
});
