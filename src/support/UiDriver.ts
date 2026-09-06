import type { Page } from "@playwright/test";

export class UiDriver {
  public constructor(private readonly page: Page) {}

  public async click(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  public async fill(selector: string, value: string): Promise<void> {
    await this.page.locator(selector).fill(value);
  }

  public async getText(selector: string): Promise<string> {
    return (await this.page.locator(selector).textContent()) ?? "";
  }

  public async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
