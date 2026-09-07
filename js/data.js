/**
 * Firmware Repository Data
 * Device: POCO X6 Pro 5G only (TengeOS 4.0.0.12.XPTCNXM)
 * Includes official Google Drive download link (5.51 GB) and clean Fastboot/Recovery instructions.
 */

const DEVICES_DATA = {
  "poco-x6-pro": {
    id: "poco-x6-pro",
    name: "POCO X6 Pro 5G",
    codename: "duchamp",
    tagline: "Flagship-tier MediaTek Dimensity 8300-Ultra Performance with TengeOS Customization",
    status: "Active Support",
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
        buildDate: "06 сентября 2026 в 23:07",
        maintainer: "@wectazz",
        type: "Hybrid (Fastboot / Recovery)",
        fileSize: "5.51 GB",
        sha256: "de5dec625962d575af609e7245f3ed009d3673d0ac57ecea463e0d2df7a0c0cf",
        status: "Beta / Stable",
        highlight: "Port from Xiaomi 17T, Android 17",
        notes: [
          "Recommended clean flash",
          "To fix camera when u changed leica profiles, use this",
          "For fullscreen aod recommended to use 10 sec option",
          "To Reduce cpu clamping and cpuxets, use this",
          "Port from Xiaomi 17T",
          "CTS? Use this",
          "Hybrid rom (recovery/fastboot)",
          "Already with ReSukiSU with susfs"
        ],
        bugs: [
          "Still have some bugs with fullscreen aod, so i recommended to NOT use it",
          "You tell me, this is beta hos"
        ],
        changelog: [
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
        ],
        screenshots: [
          { title: "Мастер настройки", url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-36-30-150_com.android.provision.jpg" },
          { title: "Настройки устройства", url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-37-21-978_com.android.settings.jpg" },
          { title: "Рабочий стол MiUI Home", url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-54-36-751_com.miui.home.jpg" },
          { title: "Виджеты и темы", url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-54-38-021_com.miui.home.jpg" },
          { title: "Интерфейс системы", url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-54-42-450_com.miui.home.jpg" },
          { title: "Камера (Leica / Pro)", url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-55-37-347_com.android.camera.jpg" },
          { title: "Режимы съемки", url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-55-52-995_com.android.camera.jpg" },
          { title: "Настройки камеры", url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-56-16-921_com.android.camera.jpg" },
          { title: "Kaorios Toolbox", url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-22-59-33-520_com.kousei.kaorios.jpg" },
          { title: "Параметры дисплея", url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-23-00-07-019_com.android.settings.jpg" },
          { title: "Always-on Display", url: "data/screenshots_4.0.0.12.xptcnxm/Screenshot_2026-09-06-23-00-13-054_com.miui.aod.jpg" }
        ],
        downloads: [
          { name: "Google Drive (5.51 GB)", url: "https://drive.google.com/file/d/1XzxHYckzPQJDqv4QFIjtviG59k4PmnnB/view?usp=sharing", icon: "cloud-arrow-down", size: "5.51 GB", primary: true }      
        ],
        installation: [
          "FASTBOOT:",
          "1. Extract zip file",
          "2. Make sure your phone plugged to PC and in fastboot mode (bootloader)",
          "3. Go to folder ROM",
          "4. Launch .bat or .sh (clean or dirty flash)",
          "5. Wait until it finishes and it will restart automatically",
          "6. Install root manager you have chosen for root (non-fenrir)",
          "RECOVERY:",
          "1. Reboot to recovery (example, ofox)",
          "2. Swipe ROM",
          "3. Reboot to recovery",
          "4. Wipe data",
          "5. Reboot to system"
        ]
      }
    ]
  }
};
