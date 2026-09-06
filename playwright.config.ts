import { defineConfig, devices } from "@playwright/test";

const reportFolder = `test-reports/${new Date().toISOString().replace(/[:.]/g, "-")}`;

export default defineConfig({
  testDir: "./src/tests",
  globalTeardown: "./src/support/generateAllureReport.ts",
  fullyParallel: true,
  workers: 1,
  retries: 1,
  reporter: [
    ["list"],
    ["html", { outputFolder: reportFolder, open: "never" }],
    ["allure-playwright", { resultsDir: "test-reports/allure-results" }]
  ],
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "https://www.gov.uk",
    headless: false,
    trace: "on-first-retry"
  }
});
