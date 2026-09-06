import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { UiDriver } from "../support/UiDriver";
import testData from "../utils/work_out_holiday_data.json";

const pageData = testData.workOutHoliday;
type HolidayCalculationOption = "option_1" | "option_2" | "option_3" | "option_4";

export class WorkOutHolidayPage extends BasePage {
  public static readonly path = pageData.urlPath;

  private readonly page: Page;
  private readonly caption: Locator;
  private readonly heading: Locator;
  private readonly options: Record<HolidayCalculationOption, Locator>;
  public readonly continueButton: Locator;
  private readonly startAgainLink: Locator;

  public constructor(page: Page) {
    super(new UiDriver(page));

    this.page = page;
    this.caption = this.page.getByText(pageData.caption, { exact: true });
    this.heading = this.page.getByRole("heading", {
      level: 1,
      name: pageData.heading
    });
    this.options = {
      option_1: this.page.getByRole("radio", { name: pageData.option_1.option }),
      option_2: this.page.getByRole("radio", { name: pageData.option_2.option }),
      option_3: this.page.getByRole("radio", { name: pageData.option_3.option }),
      option_4: this.page.getByRole("radio", { name: pageData.option_4.option })
    };
    this.continueButton = this.page.getByRole("button", {
      name: pageData.continueButton
    });
    this.startAgainLink = this.page.getByRole("link", {
      name: pageData.startAgainLink
    });
  }

  public async navigate(): Promise<void> {
    await this.open(WorkOutHolidayPage.path);
  }

  public async expectPageElements(): Promise<void> {
    await this.expectElementVisible(this.caption);
    await expect.soft(this.heading).toHaveText(pageData.heading);
    await this.expectElementVisible(this.options.option_1);
    await this.expectElementVisible(this.options.option_2);
    await this.expectElementVisible(this.options.option_3);
    await this.expectElementVisible(this.options.option_4);
    await this.expectElementVisible(this.continueButton);
    await this.expectElementVisible(this.startAgainLink);
  }

  public async selectHolidayCalculationOption(option: HolidayCalculationOption): Promise<void> {
    await this.options[option].check();
  }
}
