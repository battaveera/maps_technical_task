import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { UiDriver } from "../support/UiDriver";
import testData from "../utils/calculate_holiday_entitlement_data.json";

const pageData = testData.calculateHolidayEntitlement;

export class CalculateHolidayEntitlementPage extends BasePage {
  public static readonly path = pageData.urlPath;

  private readonly page: Page;
  private readonly heading: Locator;
  private readonly description: Locator[];
  public readonly startNowButton: Locator;

  public constructor(page: Page) {
    super(new UiDriver(page));

    this.page = page;
    this.heading = this.page.getByRole("heading", {
      level: 1,
      name: pageData.heading
    });

    this.description = [
      this.page.getByText(pageData.description.intro, { exact: true }),
      this.page.getByText(pageData.description.fullLeaveYear, { exact: true }),
      this.page.getByText(pageData.description.partLeaveYear, { exact: true }),
      this.page.getByText(pageData.description.irregularHours, { exact: true })
    ];

    this.startNowButton = this.page.getByRole("button", {
      name: pageData.startNowButton.name
    });
  }

  public async navigate(): Promise<void> {
    await this.open(CalculateHolidayEntitlementPage.path);
  }

  public async expectHeading(): Promise<void> {
    await expect.soft(this.heading).toBeVisible();
    await expect.soft(this.heading).toHaveText(pageData.heading);
  }

  public async uiLabels(): Promise<void> {
    for (const text of this.description) {
      await expect.soft(text).toBeVisible();
    }
  }

  public async expectHomePageElements(): Promise<void> {
    await this.expectHeading();
    await this.uiLabels();
    await this.expectElementVisible(this.startNowButton);
  }
}
