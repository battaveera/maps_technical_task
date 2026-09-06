import { expect, Page } from "@playwright/test";
import { CalculateHolidayEntitlementPage } from "../pages/CalculateHolidayEntitlementPage";
import { EmployeeWorkHoursPage } from "../pages/EmployeeWorkHoursPage";
import { HolidayEntitlementBaseOnPage } from "../pages/HolidayEntitlementBaseOnPage";
import { WorkOutHolidayPage } from "../pages/WorkOutHolidayPage";
import { DaysWorkedPerWeekPage } from "../pages/DaysWorkedPerWeekPage";
import { InformationBasedOnAnswersPage } from "../pages/InformationBasedOnAnswersPage";
import employeeWorkHoursData from "../utils/employee_work_hours_data.json";
import holidayEntitlementBaseOnData from "../utils/holiday_entitlement_base_on_data.json";
import workOutHolidayData from "../utils/work_out_holiday_data.json";

const employeeWorkHoursTestData = employeeWorkHoursData.employeeWorkHours;
const holidayEntitlementBaseOnTestData =
  holidayEntitlementBaseOnData.holidayEntitlementBaseOn;
const workOutHolidayTestData = workOutHolidayData.workOutHoliday;

export async function endToEndFlow(
  page: Page,
  daysWorked: string
): Promise<void> {
  //Navigate to the home page and verify elements
  const homePage = new CalculateHolidayEntitlementPage(page);
  await homePage.navigate();
  await homePage.expectHomePageElements();

  //Click start now button to proceed to employee work hours
  await homePage.clickButton(homePage.startNowButton);
  expect(page.url()).toContain("/calculate-your-holiday-entitlement/y");

  //Select employee work hours option and continue
  const employeeWorkHoursPage = new EmployeeWorkHoursPage(page);
  await employeeWorkHoursPage.expectPageElements();
  await employeeWorkHoursPage.selectWorkHoursOption("option_no");
  await employeeWorkHoursPage.clickButton(employeeWorkHoursPage.continueButton);

  //Select holiday entitlement basis and continue
  const entitlementBasePage = new HolidayEntitlementBaseOnPage(page);
  await entitlementBasePage.expectPageElements();
  await entitlementBasePage.selectEntitlementBaseOption("option_1");
  await entitlementBasePage.clickButton(entitlementBasePage.continueButton);

  //Select holiday calculation period and continue
  const workOutHolidayPage = new WorkOutHolidayPage(page);
  await workOutHolidayPage.expectPageElements();
  await workOutHolidayPage.selectHolidayCalculationOption("option_1");
  await workOutHolidayPage.clickButton(workOutHolidayPage.continueButton);

  //Fill in days worked per week and continue
  const daysWorkedPage = new DaysWorkedPerWeekPage(page);
  await daysWorkedPage.expectPageElements();
  await daysWorkedPage.fillDaysWorked(daysWorked);
  await daysWorkedPage.clickContinue();

  //Verify final results page with all answers
  const resultsPage = new InformationBasedOnAnswersPage(page);
  // Verify heading is present
  const heading = page.getByRole("heading", {
    level: 1,
    name: /Information based on your answers/
  });
  await expect.soft(heading).toBeVisible();

  await resultsPage.expectSummaryRow(
    employeeWorkHoursTestData.heading,
    employeeWorkHoursTestData.option_no.option
  );
  await resultsPage.expectSummaryRow(
    holidayEntitlementBaseOnTestData.heading,
    holidayEntitlementBaseOnTestData.option_1.option
  );
  await resultsPage.expectSummaryRow(
    workOutHolidayTestData.heading,
    workOutHolidayTestData.option_1.option
  );
  await resultsPage.expectSummaryRow("Number of days worked per week?", daysWorked);
}
