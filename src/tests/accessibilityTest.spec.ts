import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { CalculateHolidayEntitlementPage } from "../pages/CalculateHolidayEntitlementPage";

test.describe("Holiday Entitlement Calculator Home Page - Accessibility Test", () => {
  test("Validate home page WCAG Level A and AA accessibility", async ({
    page
  }, testInfo) => {
    const homePage = new CalculateHolidayEntitlementPage(page);
    await homePage.navigate();
    await homePage.expectHomePageElements();

    const levelAResults = await new AxeBuilder({ page })
      .withTags(["wcag2a"])
      .analyze();
    const levelAAResults = await new AxeBuilder({ page })
      .withTags(["wcag2aa"])
      .analyze();

    await testInfo.attach("WCAG Level A violations", {
      body: JSON.stringify(levelAResults.violations, null, 2),
      contentType: "application/json"
    });
    await testInfo.attach("WCAG Level AA violations", {
      body: JSON.stringify(levelAAResults.violations, null, 2),
      contentType: "application/json"
    });

    expect(levelAResults.violations, "WCAG Level A violations").toEqual([]);
    expect(levelAAResults.violations, "WCAG Level AA violations").toEqual([]);
  });
});
