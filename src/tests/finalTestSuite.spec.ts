import { test, expect } from "@playwright/test";
import { CalculateHolidayEntitlementPage } from "../pages/CalculateHolidayEntitlementPage";
import { EmployeeWorkHoursPage } from "../pages/EmployeeWorkHoursPage";
import { HolidayEntitlementBaseOnPage } from "../pages/HolidayEntitlementBaseOnPage";
import { WorkOutHolidayPage } from "../pages/WorkOutHolidayPage";
import { DaysWorkedPerWeekPage } from "../pages/DaysWorkedPerWeekPage";
import { InformationBasedOnAnswersPage } from "../pages/InformationBasedOnAnswersPage";
import { endToEndFlow } from "../support/E2EFlowHelper";
import testData from "../utils/information_based_on_answers_data.json";

const pageData = testData.informationBasedOnAnswers;
 const expectedPages = {
    employeeWorkHours: EmployeeWorkHoursPage,
    holidayEntitlementBaseOn: HolidayEntitlementBaseOnPage,
    workOutHoliday: WorkOutHolidayPage,
    daysWorkedPerWeek: DaysWorkedPerWeekPage
  };

test.describe("Holiday Entitlement Calculator - End to End", () => {
  test("Calculate holiday entitlement for 5 days working option", async ({
    page
  }) => {
    await endToEndFlow(page, "5");
  });

  test.skip("Calculate holiday entitlement for 3.5 days working option", async ({
    page
  }) => {
    await endToEndFlow(page, "3.5");
  });

  test("Validate start again link returns to home page from results", async ({
    page
  }) => {
    await endToEndFlow(page, "5");

    const resultsPage = new InformationBasedOnAnswersPage(page);
    await resultsPage.expectPageElements();
    await resultsPage.clickStartAgain();

    expect(page.url()).toContain("/calculate-your-holiday-entitlement");
    const newHomePage = new CalculateHolidayEntitlementPage(page);
    await newHomePage.expectHomePageElements();
  });

  test("Validate change links from information page open the respective answer pages", async ({
    page
  }) => {
    for (const { linkName, expectedPage: expectedPageKey } of pageData.changeLinkCases) {
      await endToEndFlow(page, "5");
      const resultsPage = new InformationBasedOnAnswersPage(page);
      await resultsPage.expectPageElements();
      await resultsPage.clickChangeLink(linkName);
      const ExpectedPage = expectedPages[expectedPageKey as keyof typeof expectedPages];
      await new ExpectedPage(page).expectPageElements();
    }
  });
});
