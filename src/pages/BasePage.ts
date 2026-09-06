import { expect, type Locator } from "@playwright/test";
import type { UiDriver } from "../support/UiDriver";

export abstract class BasePage {
  protected constructor(protected readonly driver: UiDriver) {}

  protected async open(url: string): Promise<void> {
    await this.driver.navigate(url);
  }

  public async expectElementVisible(element: Locator): Promise<void> {
    await expect.soft(element).toBeVisible();
  }

  public async clickButton(button: Locator): Promise<void> {
    await button.click();
  }
}
