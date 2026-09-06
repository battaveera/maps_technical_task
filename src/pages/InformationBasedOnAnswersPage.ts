import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { UiDriver } from "../support/UiDriver";
import testData from "../utils/information_based_on_answers_data.json";

const pageData = testData.informationBasedOnAnswers;

export class InformationBasedOnAnswersPage extends BasePage {
  private readonly page: Page;
  private readonly caption: Locator;
  private readonly heading: Locator;
  private readonly summaryText: Locator;
  private readonly guidanceLink: Locator;
  private readonly yourAnswersHeading: Locator;
  private readonly startAgainLink: Locator;
  private readonly summaryList: Locator;

  public constructor(page: Page) {
    super(new UiDriver(page));

    this.page = page;
    this.caption = this.page.locator(
      "span.govuk-caption-xl:has-text('Calculate holiday entitlement:')"
    );
    this.heading = this.page.getByRole("heading", {
      level: 1,
      name: /Information based on your answers/
    });
    this.summaryText = this.page.getByText(pageData.summaryText, {
      exact: true
    });
    this.guidanceLink = this.page.getByRole("link", {
      name: pageData.guidanceLink
    });
    this.yourAnswersHeading = this.page.getByRole("heading", {
      level: 2,
      name: pageData.yourAnswersHeading
    });
    this.startAgainLink = this.page.getByRole("link", {
      name: pageData.startAgainLink
    });
    this.summaryList = this.page.locator("dl.govuk-summary-list");
  }

  public async navigate(): Promise<void> {
    await this.open(
      "/calculate-your-holiday-entitlement/y/regular/days-worked-per-week/full-year/5.0"
    );
  }

  public async expectPageElements(): Promise<void> {
    await this.expectElementVisible(this.caption);
    await this.expectElementVisible(this.heading);
    await this.expectElementVisible(this.summaryText);
    await this.expectElementVisible(this.guidanceLink);
    await this.expectElementVisible(this.yourAnswersHeading);
    await this.expectElementVisible(this.startAgainLink);
    await this.expectElementVisible(this.summaryList);
  }

  public async expectSummaryRow(
    questionText: string,
    answerValue: string
  ): Promise<void> {
    const row = this.page.locator("div.govuk-summary-list__row", {
      has: this.page.locator("dt.govuk-summary-list__key", {
        hasText: questionText
      })
    });
    await this.expectElementVisible(row);

    const answerElement = row.locator("dd.govuk-summary-list__value", {
      hasText: answerValue
    });
    await this.expectElementVisible(answerElement);
  }

  public async clickChangeLink(questionText: string): Promise<void> {
    const row = this.page.locator("div.govuk-summary-list__row", {
      has: this.page.locator("dt.govuk-summary-list__key", {
        hasText: questionText
      })
    });
    await row.getByRole("link", { name: "Change" }).click();
  }

  public async clickStartAgain(): Promise<void> {
    await this.clickButton(this.startAgainLink);
  }

  public async clickGuidanceLink(): Promise<void> {
    await this.clickButton(this.guidanceLink);
  }
}
