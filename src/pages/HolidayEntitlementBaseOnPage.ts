import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import testData from "../utils/holiday_entitlement_base_on_data.json";

const pageData = testData.holidayEntitlementBaseOn;
type EntitlementBaseOption = "option_1" | "option_2" | "option_3" | "option_4" | "option_5";

export class HolidayEntitlementBaseOnPage extends BasePage {
  public static readonly path = pageData.urlPath;

  private readonly caption: Locator;
  private readonly heading: Locator;
  private readonly hint: Locator;
  private readonly options: Record<EntitlementBaseOption, Locator>;
  public readonly continueButton: Locator;
  private readonly startAgainLink: Locator;
  private readonly changeLink: Locator;

  public constructor(page: Page) {
    super(page);

    this.caption = this.page.getByText(pageData.caption, { exact: true });
    this.heading = this.page.getByRole("heading", {
      level: 1,
      name: pageData.heading
    });
    this.hint = this.page.getByText(pageData.hint);
    this.options = {
      option_1: this.page.getByRole("radio", { name: pageData.option_1.option }),
      option_2: this.page.getByRole("radio", { name: pageData.option_2.option }),
      option_3: this.page.getByRole("radio", { name: pageData.option_3.option }),
      option_4: this.page.getByRole("radio", { name: pageData.option_4.option }),
      option_5: this.page.getByRole("radio", { name: pageData.option_5.option })
    };
    this.continueButton = this.page.getByRole("button", {
      name: pageData.continueButton
    });
    this.startAgainLink = this.page.getByRole("link", {
      name: pageData.startAgainLink
    });
    this.changeLink = this.page.getByRole("link", {
      name: pageData.changeLink
    });
  }

  public async navigate(): Promise<void> {
    await this.open(HolidayEntitlementBaseOnPage.path);
  }

  public async expectPageElements(): Promise<void> {
    await this.expectElementVisible(this.caption);
    await expect.soft(this.heading).toHaveText(pageData.heading);
    await this.expectElementVisible(this.options.option_1);
    await this.expectElementVisible(this.options.option_2);
    await this.expectElementVisible(this.options.option_3);
    await this.expectElementVisible(this.options.option_4);
    await this.expectElementVisible(this.options.option_5);
    await this.expectElementVisible(this.continueButton);
    await this.expectElementVisible(this.startAgainLink);
    await this.expectElementVisible(this.changeLink);
  }

  public async selectEntitlementBaseOption(option: EntitlementBaseOption): Promise<void> {
    await this.options[option].check();
  }
}
