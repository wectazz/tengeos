# AGENTS.md

Static firmware-hub site (GitHub Pages). No build, no deps, no tests, no lint.

## Structure
- `index.html` — markup shell; views (`#devices-view`, `#firmwares-view`), modals, footer. Scripts loaded in order: `js/data.js` then `js/app.js`.
- `js/data.js` — single source of truth: `DEVICES_DATA` (device specs, `firmwares[]`, downloads, `sha256`, screenshots).
- `js/app.js` — SPA render + hash router (`#devices`, `#device/<id>`), `TRANSLATIONS` dict, theme/lang, lightbox, install modal.
- `css/style.css` — all styles; theme via `body.dark-theme` / `body.light-theme`.
- `data/screenshots_<version>/` — `banner.png` (device card + hero) + screenshots referenced by relative path.

## Run / preview
No toolchain. Serve over HTTP (relative asset paths), e.g. `python3 -m http.server` in repo root, then open `http://localhost:8000`.

## Conventions that break if missed
- Every user-facing string needs `ru` + `en`: in `data.js` (`tagline`, `status`, `buildDate`, `highlight`, `notes`, `changelog`, `bugs`, screenshot `title`) and in `app.js` `TRANSLATIONS` + `data-i18n` / `data-i18n-placeholder` in `index.html`. Rendering does `fw.changelog[currentLang].map(...)` — a missing locale throws.
- New firmware = append to `firmwares[]` in `data.js` with matching `id`, `category`, `version`, `downloads[]` (`{name, url, size, primary}`). Filter tabs (`renderFilterTabs` in `app.js`) are generated from distinct `fw.category` values with per-category counts — no manual tab wiring needed; static tabs in `index.html` are only a no-JS fallback.
- Screenshot/lightbox quirk: lightbox list is `[device.image, ...fw.screenshots]`; thumbnail click uses `index + 1`. Keep `device.image` valid.
- State keys: `localStorage` `tenge_lang` (`ru`/`en`, auto-detected from `navigator.language`), `tenge_theme`. View switching is `.active` class + `location.hash`; `handleRoute()` resets filter to `all` on device navigation.
- Site language default in markup is Russian (`lang="ru"`); keep RU as primary when editing copy.
