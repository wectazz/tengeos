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
      install_guide_title: "Инструкция по установке"
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
      install_guide_title: "Installation Guide"
    }
  };

  // Language auto-detection & initialization
  let currentLang = localStorage.getItem('tenge_lang');
  if (!currentLang) {
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
  const countAll = document.getElementById('count-all');
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

  // Theme Initialization
  const savedTheme = localStorage.getItem('tenge_theme') || 'dark-theme';
  document.body.className = savedTheme;

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light-theme' : 'dark-theme';
    document.body.className = newTheme;
    localStorage.setItem('tenge_theme', newTheme);
    showToast(isDark ? TRANSLATIONS[currentLang].toast_theme_light : TRANSLATIONS[currentLang].toast_theme_dark, 'info');
  });

  // --- Interactive Canvas Background with Floating Particles & Mouse Connection ---
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    const particleCount = Math.min(Math.floor((width * height) / 15000), 75);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 1.5 + 1
      });
    }

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

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
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
        <div class="device-img-wrap" style="height: 220px;">
          <img src="${device.image}" alt="${device.name}" loading="lazy">
          <span class="device-badge-overlay">${device.codename}</span>
        </div>
        <div class="device-content">
          <div class="device-title-row">
            <h2 class="device-name">${device.name}</h2>
            <span class="device-status">${device.status[currentLang]}</span>
          </div>
          <p class="device-tagline">${device.tagline[currentLang]}</p>
          
          <div class="specs-mini-list">
            <div class="spec-item">
              <span class="spec-label">${t.specs_soc}</span>
              <span class="spec-value">${device.specs.soc.split(' ')[0]} ${device.specs.soc.split(' ')[1]}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">${t.specs_screen}</span>
              <span class="spec-value">${device.specs.screen.split(' ')[1]}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">${t.specs_ram}</span>
              <span class="spec-value">${device.specs.ram}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">${t.specs_battery}</span>
              <span class="spec-value">${device.specs.battery}</span>
            </div>
          </div>

          <div class="device-footer">
            <span class="firmware-count">${device.firmwares.length} ${t.firmware_count_text}</span>
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
        <h2>${device.name}</h2>
        <p>${device.tagline[currentLang]}</p>
        <div class="banner-specs-badges">
          <span class="spec-badge">Codename: ${device.codename}</span>
          <span class="spec-badge">${device.specs.soc}</span>
          <span class="spec-badge">${device.specs.battery}</span>
        </div>
      </div>
      <div class="banner-right" id="clickable-banner" title="Banner preview" style="cursor: pointer;">
        <img src="${device.image}" alt="${device.name} Banner">
      </div>
    `;

    const clickableBanner = document.getElementById('clickable-banner');
    if (clickableBanner) {
      clickableBanner.addEventListener('click', () => {
        const firstFw = device.firmwares[0];
        activeLightboxScreenshots = [
          { url: device.image },
          ...(firstFw ? firstFw.screenshots : [])
        ];
        currentScreenshotIndex = 0;
        openLightbox();
      });
    }

    // Filter & count
    let firmwares = device.firmwares;
    if (countAll) {
      countAll.textContent = firmwares.length;
    }

    if (currentFilter !== 'all') {
      firmwares = firmwares.filter(f => f.category.toLowerCase().includes(currentFilter.toLowerCase()));
    }

    firmwareListContainer.innerHTML = '';

    if (firmwares.length === 0) {
      firmwareListContainer.innerHTML = `
        <div style="text-align: center; padding: 4rem; color: var(--text-secondary);">
          <p>No firmwares found in this category.</p>
        </div>
      `;
      return;
    }

    firmwares.forEach(fw => {
      const card = document.createElement('div');
      card.className = 'firmware-card';

      const screenshotsHtml = fw.screenshots.map((shot, idx) => `
        <div class="screenshot-thumb" data-fw-id="${fw.id}" data-index="${idx}" title="Screenshot ${idx + 1}">
          <img src="${shot.url}" alt="Screenshot ${idx + 1}" loading="lazy">
        </div>
      `).join('');

      const changelogHtml = fw.changelog[currentLang].map(item => `<li>${item}</li>`).join('');
      const notesList = fw.notes[currentLang];
      const notesHtml = notesList && notesList.length > 0 ? notesList.map(n => `<li>${n}</li>`).join('') : `<li>${t.no_notes}</li>`;
      
      const bugsList = fw.bugs[currentLang];
      const bugsHtml = bugsList && bugsList.length > 0 ? bugsList.map(b => `<li>${b}</li>`).join('') : `<li>${t.no_bugs}</li>`;

      const downloadsHtml = fw.downloads.map(dl => `
        <a href="${dl.url}" target="_blank" rel="noopener" class="btn ${dl.primary ? 'btn-primary' : 'btn-secondary'} download-trigger" data-name="${dl.name}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          ${dl.name}
        </a>
      `).join('');

      card.innerHTML = `
        <div class="firmware-header-row">
          <div class="firmware-title-group">
            <h3>${fw.name}</h3>
            <div class="firmware-badges">
              <span class="fw-badge category">${fw.category}</span>
              <span class="fw-badge version">${fw.version}</span>
              <span class="fw-badge status">${fw.status}</span>
            </div>
          </div>
          <button class="btn btn-primary install-guide-btn" data-fw-id="${fw.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 12 12 12 8"></polyline><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            ${t.install_guide}
          </button>
        </div>

        <div class="firmware-meta-grid">
          <div class="meta-item">
            <span class="meta-label">${t.android_os}</span>
            <span class="meta-val">${fw.androidVersion}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${t.security_patch}</span>
            <span class="meta-val">${fw.securityPatch}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${t.release_date}</span>
            <span class="meta-val">${fw.buildDate[currentLang]}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${t.maintainer}</span>
            <span class="meta-val">${fw.maintainer}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${t.size}</span>
            <span class="meta-val">${fw.fileSize}</span>
          </div>
          <div class="meta-item" style="cursor: pointer;" title="Copy SHA-256" id="copy-hash-${fw.id}">
            <span class="meta-label">SHA-256 Checksum 📋</span>
            <span class="meta-val mono" style="color: var(--accent);">${fw.sha256.substring(0, 12)}...</span>
          </div>
        </div>

        <div class="firmware-highlight">
          <strong>${t.features_highlight}</strong> ${fw.highlight[currentLang]}
        </div>

        <div class="info-tabs-container" style="margin-bottom: 1.5rem;">
          <div class="info-tabs-header" style="display: flex; gap: 0.75rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap;">
            <button class="info-tab-btn active" data-tab="changelog-${fw.id}" data-color="accent">${t.changelog_tab}</button>
            <button class="info-tab-btn" data-tab="notes-${fw.id}" data-color="warning">${t.notes_tab}</button>
            <button class="info-tab-btn" data-tab="bugs-${fw.id}" data-color="danger">${t.bugs_tab}</button>
          </div>

          <div class="info-tab-content active" id="changelog-${fw.id}">
            <ul class="changelog-list">
              ${changelogHtml}
            </ul>
          </div>
          <div class="info-tab-content" id="notes-${fw.id}" style="display: none;">
            <ul class="changelog-list" style="color: var(--warning);">
              ${notesHtml}
            </ul>
          </div>
          <div class="info-tab-content" id="bugs-${fw.id}" style="display: none;">
            <ul class="changelog-list" style="color: #ef4444;">
              ${bugsHtml}
            </ul>
          </div>
        </div>

        ${fw.screenshots && fw.screenshots.length > 0 ? `
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

      // Color-coded tab switching logic
      const tabBtns = card.querySelectorAll('.info-tab-btn');
      
      function applyTabStyles(activeBtn) {
        tabBtns.forEach(b => {
          b.style.background = 'var(--bg-secondary)';
          b.style.color = 'var(--text-secondary)';
          b.style.borderColor = 'var(--border-color)';
          b.style.boxShadow = 'none';
        });

        const colorType = activeBtn.getAttribute('data-color');
        if (colorType === 'accent') {
          activeBtn.style.background = '#3b82f6';
          activeBtn.style.color = '#fff';
          activeBtn.style.borderColor = '#3b82f6';
          activeBtn.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
        } else if (colorType === 'warning') {
          activeBtn.style.background = '#f59e0b';
          activeBtn.style.color = '#fff';
          activeBtn.style.borderColor = '#f59e0b';
          activeBtn.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
        } else if (colorType === 'danger') {
          activeBtn.style.background = '#ef4444';
          activeBtn.style.color = '#fff';
          activeBtn.style.borderColor = '#ef4444';
          activeBtn.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
        }
      }

      tabBtns.forEach(btn => {
        btn.style.background = 'var(--bg-secondary)';
        btn.style.border = '1px solid var(--border-color)';
        btn.style.color = 'var(--text-secondary)';
        btn.style.padding = '0.5rem 1.1rem';
        btn.style.borderRadius = 'var(--radius-full)';
        btn.style.fontSize = '0.825rem';
        btn.style.fontWeight = '600';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'var(--transition)';

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

      // Copy SHA-256 event listener
      const copyEl = card.querySelector(`#copy-hash-${fw.id}`);
      if (copyEl) {
        copyEl.addEventListener('click', () => {
          navigator.clipboard.writeText(fw.sha256);
          showToast(t.toast_copied, 'success');
        });
      }

      // Screenshot thumbnail click events
      const thumbs = card.querySelectorAll('.screenshot-thumb');
      thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
          const imgIndex = parseInt(thumb.getAttribute('data-index'), 10);
          activeLightboxScreenshots = [
            { url: device.image },
            ...fw.screenshots
          ];
          currentScreenshotIndex = imgIndex + 1;
          openLightbox();
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
          showToast(`Redirecting to download: ${dlName}`, 'success');
        });
      });

      firmwareListContainer.appendChild(card);
    });
  }

  // Router based on location.hash
  function handleRoute() {
    const hash = window.location.hash || '#devices';

    if (hash === '#devices' || hash === '') {
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
        updateFilterTabsUI();
        renderFirmwares(deviceId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.hash = '#devices';
      }
    }
  }

  // Filter tabs click
  filterTabsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-tab')) {
      filterTabsContainer.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.getAttribute('data-filter');
      if (currentDeviceId) {
        renderFirmwares(currentDeviceId);
      }
    }
  });

  function updateFilterTabsUI() {
    filterTabsContainer.querySelectorAll('.filter-tab').forEach(t => {
      if (t.getAttribute('data-filter') === currentFilter) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
  }

  backToDevicesBtn.addEventListener('click', () => {
    window.location.hash = '#devices';
  });

  // Lightbox functions
  function openLightbox() {
    if (!activeLightboxScreenshots.length) return;
    updateLightboxImage();
    lightboxModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    const shot = activeLightboxScreenshots[currentScreenshotIndex];
    lightboxImg.src = shot.url;
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
    installModalSubtitle.textContent = `Type: ${fw.type} • Version ${fw.version}`;
    
    installModalSteps.innerHTML = '';
    
    const htmlContent = currentLang === 'ru' ? `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.2rem;">
          <h4 style="color: var(--accent); margin-bottom: 0.75rem; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            ⚡ FASTBOOT Установка:
          </h4>
          <ol style="padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.875rem; color: var(--text-primary);">
            <li>Распакуйте загруженный архиватор с прошивкой на ПК.</li>
            <li>Убедитесь, что телефон подключен к компьютеру в режиме Fastboot (Bootloader).</li>
            <li>Перейдите в распакованную папку с прошивкой (папка ROM).</li>
            <li>Запустите скрипт <code>.bat</code> (для Windows) или <code>.sh</code> (для Linux/macOS) — доступна чистая или грязная установка.</li>
            <li>Дождитесь окончания процесса прошивки (телефон перезагрузится автоматически).</li>
            <li>Установите менеджер рут-прав при необходимости (рекомендуется non-fenrir).</li>
          </ol>
        </div>

        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.2rem;">
          <h4 style="color: var(--success); margin-bottom: 0.75rem; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            🔄 RECOVERY Установка:
          </h4>
          <ol style="padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.875rem; color: var(--text-primary);">
            <li>Перезагрузите устройство в кастомное рекавери (например, OrangeFox).</li>
            <li>Выберите архив прошивки и сделайте свайп (Swipe to flash ROM).</li>
            <li>После завершения прошивки перезагрузите устройство обратно в рекавери (Reboot to Recovery).</li>
            <li>Произведите сброс данных (Wipe Data / Format Data).</li>
            <li>Перезагрузите устройство в систему (Reboot to System).</li>
          </ol>
        </div>
      </div>
    ` : `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.2rem;">
          <h4 style="color: var(--accent); margin-bottom: 0.75rem; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            ⚡ FASTBOOT Installation:
          </h4>
          <ol style="padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.875rem; color: var(--text-primary);">
            <li>Extract the downloaded archive on your PC.</li>
            <li>Ensure your phone is connected to PC and in Fastboot mode (bootloader).</li>
            <li>Navigate to the ROM folder.</li>
            <li>Launch <code>.bat</code> (Windows) or <code>.sh</code> (Linux/macOS) script (clean or dirty flash).</li>
            <li>Wait until it finishes and the device restarts automatically.</li>
            <li>Install your preferred root manager if needed (non-fenrir).</li>
          </ol>
        </div>

        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.2rem;">
          <h4 style="color: var(--success); margin-bottom: 0.75rem; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            🔄 RECOVERY Installation:
          </h4>
          <ol style="padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.875rem; color: var(--text-primary);">
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
    document.body.style.overflow = 'hidden';
  }

  function closeInstallModal() {
    installModal.classList.remove('open');
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
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      globalSearchInput.focus();
    }
  });

  // Toast Notification System
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : 'ℹ️'}</span>
      <span>${message}</span>
    `;
    document.getElementById('toast-container').appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  globalSearchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (q.length > 1) {
      if ('poco x6 pro'.includes(q) || 'duchamp'.includes(q) || 'tengeos'.includes(q)) {
        window.location.hash = '#device/poco-x6-pro';
      }
    }
  });

  window.addEventListener('hashchange', handleRoute);
  
  // Initial startup
  updateLanguageUI();
  handleRoute();
});
