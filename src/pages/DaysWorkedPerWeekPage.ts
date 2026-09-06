import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import testData from "../utils/days_worked_per_week_data.json";

const pageData = testData.daysWorkedPerWeek;

export class DaysWorkedPerWeekPage extends BasePage {
  private readonly caption: Locator;
  private readonly heading: Locator;
  private readonly daysInput: Locator;
  private readonly continueButton: Locator;
  private readonly startAgainLink: Locator;

  public constructor(page: Page) {
    super(page);

    this.caption = this.page.getByText(pageData.caption, {
      exact: true
    });
    this.heading = this.page.locator("label", { hasText: pageData.heading });
    this.daysInput = this.page.locator("input#response");
    this.continueButton = this.page.getByRole("button", {
      name: pageData.continueButton
    });
    this.startAgainLink = this.page.getByRole("link", {
      name: pageData.startAgainLink
    });
  }

  public async navigate(): Promise<void> {
    await this.open(
      "/calculate-your-holiday-entitlement/y/regular/days-worked-per-week/full-year"
    );
  }

  public async expectPageElements(): Promise<void> {
    await this.expectElementVisible(this.caption);
    await this.expectElementVisible(this.heading);
    await this.expectElementVisible(this.daysInput);
    await this.expectElementVisible(this.continueButton);
    await this.expectElementVisible(this.startAgainLink);
  }

  public async fillDaysWorked(days: string | number): Promise<void> {
    await this.daysInput.fill(String(days));
  }

  public async clickContinue(): Promise<void> {
    await this.clickButton(this.continueButton);
  }
}
