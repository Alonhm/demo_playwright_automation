import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { urlsValues,expectedValuesForRolesGmail } from "../../utils/utilsValues";
import  WindowManager  from "../../utils/WindowManager";
import ExplicitWaitManager from "../../utils/ExplicitWaitManager";

export default class GmailSignInPage {      
    
  private page: Page;
  private url= urlsValues.signInPageUrl;
  private windowManager: WindowManager;
  private explicitWaitManager: ExplicitWaitManager;

  constructor(page: Page) {
    this.page = page;
    this.windowManager = new WindowManager(page);
    this.explicitWaitManager = new ExplicitWaitManager(page);
  }

  async navigate() {
    await this.page.goto(this.url, {
      waitUntil: "load"});
  }
    async maximizeWindow() {
        this.windowManager.maximizeWindowMobile();
    }

    async fillEmailAddress(value: string) {
        await this.page.fill(expectedValuesForRolesGmail.email, value);
    }

    async clickNextButton() {
        await this.page.click(expectedValuesForRolesGmail.nextButton);
        await this.explicitWaitManager.explictWait();
    }

    async fillEmailAddressPassword(value: string) {
        await this.explicitWaitManager.explictWait();
        await this.page.fill(expectedValuesForRolesGmail.password, value);
    }

    async checkInboxPage() {
        await this.page.locator(expectedValuesForRolesGmail.inboxHeader).isVisible();
        const inboxVisible = this.page.locator(expectedValuesForRolesGmail.inboxHeader);
        expect(inboxVisible).toBe(true);
        inboxVisible.screenshot({ path: "../../test-results/gmailtestscreenshots/gmailInbox.png" });
    }

    async checkSucessfullSignIn(username: string, password: string) {
        await this.navigate();
        await this.maximizeWindow();
        await this.fillEmailAddress(username);
        await this.clickNextButton();
        await this.fillEmailAddressPassword(password);
        await this.clickNextButton();
        await this.checkInboxPage();
    }

    async closeBrowser() {
        await this.page.close();
    }
    async closeContext() {
        await this.page.context().close();
    }
}