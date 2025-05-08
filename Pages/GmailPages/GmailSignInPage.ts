import { expect, Page } from "@playwright/test";
import { urlsValues, locatorsAndRolesForGmail } from "../../utils/utilsValues";
import WindowManager from "../../utils/WindowManager";
import ExplicitWaitManager from "../../utils/ExplicitWaitManager";

export default class GmailSignInPage {
  private page: Page;
  private url = urlsValues.gmailSignInPageUrl;
  private windowManager: WindowManager;
  private explicitWaitManager: ExplicitWaitManager;

  constructor(page: Page) {
    this.page = page;
    this.windowManager = new WindowManager(page);
    this.explicitWaitManager = new ExplicitWaitManager(page);
  }

  async navigateToSignInPage() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState("networkidle"); // Wait for the page to load completely before proceeding.
    
  }

  async fillEmailAddress(value: string) {
    // Wait for the email input field to be visible before filling it because the page might take some time to load due to Google security checks.
    await this.page.locator(locatorsAndRolesForGmail.email).isVisible();
    /*await this.page.mouse.move(45, 245); // Move the mouse to the top left corner of the screen to avoid any potential interference with the password field.
    await this.page.mouse.down(); // Simulate a mouse click to ensure the password field is focused.
    await this.page.mouse.up(); // Release the mouse button.
    await this.page.keyboard.type(value, { delay: 100 }); // Type the password with a delay of 100ms between each keystroke.*/
    await this.page.fill(locatorsAndRolesForGmail.email, value); // Type the email with a delay of 100ms between each keystroke.
  }

  async clickNextButton() {
    await this.page
      .getByRole("button", { name: locatorsAndRolesForGmail.nextButton })
      .isVisible();
    await this.page
      .getByRole("button", { name: locatorsAndRolesForGmail.nextButton })
      .click();
    await this.explicitWaitManager.explictWait();
  }

  async fillEmailAddressPassword(value: string) {
    await this.page.locator(locatorsAndRolesForGmail.password).isVisible();
    /* await this.page.mouse.move(45, 245); // Move the mouse to the top left corner of the screen to avoid any potential interference with the password field.
    await this.page.mouse.down(); // Simulate a mouse click to ensure the password field is focused.
    await this.page.mouse.up(); // Release the mouse button.
    await this.page.keyboard.type(value, { delay: 100 }); // Type the password with a delay of 100ms between each keystroke.*/
    await this.page.fill(locatorsAndRolesForGmail.password, value); // Type the password with a delay of 100ms between each keystroke.
  }

  async checkInboxPage() {
    await this.page.locator(locatorsAndRolesForGmail.inboxHeader).isVisible();
    const inboxVisible = this.page.locator(
      locatorsAndRolesForGmail.inboxHeader
    );

    expect(inboxVisible).toBe(true);
    inboxVisible.screenshot({
      path: "../../test-results/gmailtestscreenshots/gmailInbox.png",
    });
  }

  async checkSucessfullSignIn(username: string, password: string) {
    await this.navigateToSignInPage();
    await this.fillEmailAddress(username);
    await this.clickNextButton();
    await this.fillEmailAddressPassword(password);
    await this.clickNextButton();
    await this.checkInboxPage();
    await this.closeBrowser();
    await this.closeContext();
  }

  async closeBrowser() {
    await this.page.close();
  }
  async closeContext() {
    await this.page.context().close();
  }
}
