import { execSync } from "node:child_process";

export default function generateAllureReport(): void {
  const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
  execSync(
    `${npxCommand} allure generate test-reports/allure-results --clean -o test-reports/allure-report`,
    { stdio: "inherit" }
  );
}
