/**
 * Firmware Repository Data (Bilingual: Russian & English support)
 * Device: POCO X6 Pro 5G only (TengeOS 4.0.0.12.XPTCNXM)
 */

const DEVICES_DATA = {
  "poco-x6-pro": {
    id: "poco-x6-pro",
    name: "POCO X6 Pro 5G",
    codename: "duchamp",
    tagline: {
      ru: "Флагманская производительность MediaTek Dimensity 8300-Ultra с оптимизацией TengeOS",
      en: "Flagship-tier MediaTek Dimensity 8300-Ultra Performance with TengeOS Customization"
    },
    status: {
      ru: "Активная поддержка",
      en: "Active Support"
    },
    specs: {
      soc: "MediaTek Dimensity 8300-Ultra (4nm)",
      screen: "6.67\" AMOLED 1.5K 120Hz HDR10+ Dolby Vision",
      ram: "8GB / 12GB LPDDR5X",
      storage: "256GB / 512GB UFS 4.0",
      battery: "5000 mAh / 67W Turbo Charge",
      camera: "64 MP (OIS) + 8 MP (UW) + 2 MP (Macro)"
    },
    image: "data/screenshots_4.0.0.12.xptcnxm/banner.png",
    firmwares: [
      {
        id: "tengeos-4-0-0-12",
        name: "TengeOS 4.0.0.12.XPTCNXM",
        category: "HyperOS 4",
        version: "4.0.0.12.XPTCNXM",
        androidVersion: "Android 17",
        securityPatch: "2026-09-01",
        buildDate: {
          ru: "06 сентября 2026 в 23:07",
          en: "September 06, 2026 at 23:07"
        },
        maintainer: "@wectazz",
        type: "Hybrid (Fastboot / Recovery)",
        fileSize: "5.51 GB",
        sha256: "de5dec625962d575af609e7245f3ed009d3673d0ac57ecea463e0d2df7a0c0cf",
        status: "Beta / Stable",
        highlight: {
          ru: "Порт с Xiaomi 17T, Android 17",
          en: "Port from Xiaomi 17T, Android 17"
        },
        notes: {
          ru: [
            "Рекомендуется чистая установка",
            "Для исправления работы камеры при смене профилей Leica используйте это",
            "Для полноэкранного AOD рекомендуется использовать опцию 10 секунд",
            "Для уменьшения ограничения частоты процессора и настройки cpusects используйте это",
            "Портировано с Xiaomi 17T",
            "Прохождение CTS? Используйте это",
            "Гибридная прошивка (recovery/fastboot)",
            "Уже встроена ReSukiSU с поддержкой susfs"
          ],
          en: [
            "Recommended clean flash",
            "To fix camera when u changed leica profiles, use this",
            "For fullscreen aod recommended to use 10 sec option",
            "To Reduce cpu clamping and cpuxets, use this",
            "Port from Xiaomi 17T",
            "CTS? Use this",
            "Hybrid rom (recovery/fastboot)",
            "Already with ReSukiSU with susfs"
          ]
        },
        bugs: {
          ru: [
            "Всё еще присутствуют баги с полноэкранным AOD, поэтому рекомендуется НЕ использовать его",
            "Сообщайте о найденных багах, это бета-версия HyperOS"
          ],
          en: [
            "Still have some bugs with fullscreen aod, so i recommended to NOT use it",
            "You tell me, this is beta hos"
          ]
        },
        changelog: {
          ru: [
            "Исправлено отключение звука уведомлений по умолчанию",
            "Исправлено ограничение частоты экрана в 60 Гц",
            "Vulkan включен по умолчанию",
            "Интегрирован аудиодвижок ViperFX",
            "Разблокирована запись в системные разделы system/product (RW)",
            "Исправления DSV и обход flag secure",
            "Исправлена работа уведомлений (выберите режим 'без ограничений' для батареи приложения и включите автозапуск)",
            "Исправлена вибрация",
            "Поддержка отображения 5 или 7 иконок уведомлений в статус-баре",
            "Встроено кастомное рекавери OrangeFox",
            "Модифицированный установщик пакетов",
            "Встроен Game Spoof для игр",
            "Улучшенные текстуры",
            "Выбор частоты обновления экрана 60/90/120 FPS",
            "Исправлен сброс тем оформления",
            "Улучшенная клавиатура Gboard",
            "Интегрирован инструментарий Kaorios toolbox",
            "Безлимитное облако Google Фото",
            "Очищен системный мусор (Debloated)",
            "Разблокирована папка хранения данных (/data)",
            "Добавлены модифицированные приложения (редактор галереи, проводник, запись экрана, диктофон)",
            "Отображение VoLTE и VoNR в статус-баре"
          ],
          en: [
            "Fixed notification muted by default",
            "Fixed 60 hz limit",
            "Vulkan enabled by default",
            "ViperFX sound engine integrated",
            "RW (product, system) partitions enabled",
            "DSV and flag secure tweaks",
            "Notifications fixed (pick no restrictions for battery for app and turn on autostart)",
            "Vibro fixed",
            "5, 7 notification icons in status bar support",
            "OrangeFox recovery included",
            "Modded package installer",
            "Game Spoof enabled",
            "Advanced textures",
            "60/90/120 fps selection",
            "Fixed theme reset bug",
            "Enhanced gboard",
            "Kaorios toolbox integrated",
            "Unlimited google photos backup",
            "Debloated unnecessary system apps",
            "Decrypted (/data) storage",
            "Added modded apps (gallery editor, file explorer, screen recorder, sound recorder)",
            "VoLTE and VoNR visible in status bar"
          ]
        },
        screenshots: [
          { title: { ru: "Мастер настройки", en: "Setup Wizard" }, url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-36-30-150_com.android.provision.jpg" },
          { title: { ru: "Настройки устройства", en: "Settings" }, url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-37-21-978_com.android.settings.jpg" },
          { title: { ru: "Рабочий стол MiUI Home", en: "MiUI Home Launcher" }, url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-54-36-751_com.miui.home.jpg" },
          { title: { ru: "Виджеты и темы", en: "Widgets & Themes" }, url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-54-38-021_com.miui.home.jpg" },
          { title: { ru: "Интерфейс системы", en: "System UI" }, url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-54-42-450_com.miui.home.jpg" },
          { title: { ru: "Камера (Leica / Pro)", en: "Leica Camera Pro" }, url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-55-37-347_com.android.camera.jpg" },
          { title: { ru: "Режимы съемки", en: "Camera Modes" }, url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-55-52-995_com.android.camera.jpg" },
          { title: { ru: "Настройки камеры", en: "Camera Settings" }, url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-56-16-921_com.android.camera.jpg" },
          { title: { ru: "Kaorios Toolbox", en: "Kaorios Toolbox" }, url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-59-33-520_com.kousei.kaorios.jpg" },
          { title: { ru: "Параметры дисплея", en: "Display Parameters" }, url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-23-00-07-019_com.android.settings.jpg" },
          { title: { ru: "Always-on Display", en: "Always-on Display" }, url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-23-00-13-054_com.miui.aod.jpg" }
        ],
        downloads: [
          { name: "Google Drive (5.51 GB)", url: "https://drive.google.com/file/d/1XzxHYckzPQJDqv4QFIjtviG59k4PmnnB/view?usp=sharing", icon: "cloud-arrow-down", size: "5.51 GB", primary: true }
        ]
      }
    ]
  }
};
