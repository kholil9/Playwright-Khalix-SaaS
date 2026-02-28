import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // 1. Setup Server Lokal
  webServer: {
    command: "pnpm run dev", 
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, 
  },
  
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: 'http://127.0.0.1:3000', // Konsisten pakai IP
    headless: false, 
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    bypassCSP: true, 
    launchOptions: {
      args: [
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    },
  },

  projects: [
    // 2. PROJECT SETUP: Khusus untuk Login
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/, // Akan mencari file auth.setup.ts
    },

    // 3. PROJECT UTAMA: Pakai kunci dari setup
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Ambil session dari sini
        storageState: "./tests/data/user.json", 
      },
      testMatch: /.*\.spec\.ts/,
      dependencies: ["setup"], // WAJIB jalankan setup dulu
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});