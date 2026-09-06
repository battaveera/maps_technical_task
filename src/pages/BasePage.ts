import { expect, type Locator, type Page } from "@playwright/test";

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  protected async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  public async expectElementVisible(element: Locator): Promise<void> {
    await expect.soft(element).toBeVisible();
  }

  public async clickButton(button: Locator): Promise<void> {
    await button.click();
  }
}
