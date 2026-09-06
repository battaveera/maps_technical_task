import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { UiDriver } from "../support/UiDriver";
import testData from "../utils/employee_work_hours_data.json";

const pageData = testData.employeeWorkHours;
type WorkHoursOption = "option_yes" | "option_no";

export class EmployeeWorkHoursPage extends BasePage {
  public static readonly path = pageData.urlPath;

  private readonly page: Page;
  private readonly caption: Locator;
  private readonly heading: Locator;
  private readonly hint: Locator;
  private readonly options: Record<WorkHoursOption, Locator>;
  public readonly continueButton: Locator;

  public constructor(page: Page) {
    super(new UiDriver(page));

    this.page = page;
    this.caption = this.page.getByText(pageData.caption, { exact: true });
    this.heading = this.page.getByRole("heading", {
      level: 1,
      name: pageData.heading
    });
    this.hint = this.page.getByText(pageData.hint, { exact: true });
    this.options = {
      option_yes: this.page.getByRole("radio", { name: pageData.option_yes.option }),
      option_no: this.page.getByRole("radio", { name: pageData.option_no.option })
    };
    this.continueButton = this.page.getByRole("button", {
      name: pageData.continueButton
    });
  }

  public async navigate(): Promise<void> {
    await this.open(EmployeeWorkHoursPage.path);
  }

  public async expectPageElements(): Promise<void> {
    await this.expectElementVisible(this.caption);
    await expect.soft(this.heading).toHaveText(pageData.heading);
    await this.expectElementVisible(this.hint);
    await this.expectElementVisible(this.options.option_yes);
    await this.expectElementVisible(this.options.option_no);
    await this.expectElementVisible(this.continueButton);
  }

  public async selectWorkHoursOption(option: WorkHoursOption): Promise<void> {
    await this.options[option].check();
  }
}
