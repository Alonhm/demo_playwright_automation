import type { Page } from "@playwright/test";
import { maximizeWindowDesktop, maximizeWindowMobile } from "./utilsValues";

const RecaptchaOptions = {
  provider: {
    id: '2captcha',
    token: '16241f1a9cde07689998c214e80e2759',  // 2captcha token
  },
  visualFeedback: true,
};

export default class WindowManager {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async maximizeWindowDesktop() {
    await this.page.setViewportSize({
      width: maximizeWindowDesktop.width,
      height: maximizeWindowDesktop.width,
    });
    await this.page.bringToFront();
  }

  async maximizeWindowMobile() {
    await this.page.setViewportSize({
      width: maximizeWindowMobile.width,
      height: maximizeWindowMobile.width,
    });
    await this.page.bringToFront();
  }
}
