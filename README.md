# maps_technical_task

TypeScript workspace for the maps technical task.

## Setup

```bash
npm install
npx playwright install
```

## Scripts

- `npm run build` compiles TypeScript into `dist/`.
- `npm start` runs the compiled application.
- `npm run dev` watches for TypeScript changes.
- `npm test` runs all Playwright tests.
- `npm run test:headed` runs the Playwright tests with a visible browser.

## Page Object Model structure

```text
src/
	pages/       Base page and application page objects
	support/     Browser or UI driver contracts and adapters
	tests/       Test cases
	utils/       Shared test data and utilities
```

Page objects share common navigation and assertion behavior through
`src/pages/BasePage.ts` and use Playwright locators directly.

The GOV.UK Holiday Entitlement calculator is implemented in various pages in `src/pages/`
and covered by test suites
`src/tests/finalTestSuite.spec.ts` and
`src/tests/accessibilityTest.spec.ts`.

To run the two test specifications directly:

```bash
npx playwright test src/tests/finalTestSuite.spec.ts src/tests/accessibilityTest.spec.ts
```

The Playwright configuration uses one worker, one retry, and a visible browser.

## Test Reports

Each test run generates a timestamped Playwright HTML report under
`test-reports/`. Allure result files are written to
`test-reports/allure-results/`, and an Allure HTML report is generated
automatically at `test-reports/allure-report/`.

Open the Allure report through the Allure server rather than opening
`index.html` directly:

```bash
npx allure open test-reports/allure-report
```
The full suite currently reports a failure from the accessibility test when
the home page has Axe violations. The violation details are available in the
Playwright and Allure reports.