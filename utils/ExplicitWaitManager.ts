import type { Page } from "@playwright/test";
import { waitTimeValues } from "./utilsValues";

export default class ExplicitWaitManager {
  private page: Page;
  private defaultTimeout: number = waitTimeValues.defaultTimeOut || 2000 // default timeout for all wait times

  constructor(page: Page) {
    this.page = page;
  }

  async explictWait() {
    await this.page.waitForTimeout(this.defaultTimeout);
  }
}