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
    console.log("Filling email address...");
    // Wait for the email input field to be visible before filling it because the page might take some time to load due to Google security checks.
    await this.page
      .locator(locatorsAndRolesForGmail.email)
      .isVisible()
      .catch((error) => {
        console.log("Error: ", error);
        console.log("Email input field not visible, taking screenshot.");
        this.page.screenshot({
          path: "screenshots/GmailLoginErrorScreenshot.png",
          animations: "allow",
        });
      });
    await this.page.fill(locatorsAndRolesForGmail.email, value);
  }

  async clickNextButton() {
    console.log("Clicking next button...");
    await this.page
      .getByRole("button", { name: locatorsAndRolesForGmail.nextButton })
      .isVisible();
    await this.page
      .getByRole("button", { name: locatorsAndRolesForGmail.nextButton })
      .click();
    await this.explicitWaitManager.explictWait();
    await this.page.waitForLoadState("domcontentloaded", {
      timeout: 2000,
    });
  }

  async fillEmailAddressPassword(value: string) {
    console.log("Filling password...");
    await this.page
      .locator(locatorsAndRolesForGmail.password)
      .isVisible()
      .catch((error) => {
        console.log("Error: ", error);
        console.log("Password input field not visible, taking screenshot.");
        this.page.screenshot({
          path: "screenshots/GmailLoginErrorScreenshot.png",
          animations: "allow",
        });
      });
    await this.page.fill(locatorsAndRolesForGmail.password, value);
  }

  async checkInboxPage() {
    console.log("Checking inbox page...");

    await this.page.waitForLoadState("load", {
      timeout: 2000,
    });

    await this.page
      .getByRole("link", { name: locatorsAndRolesForGmail.inboxLink })
      .isVisible()
      .catch((error) => {
        console.log("Error: ", error);
        console.log("Inbox link not visible, taking screenshot.");
        this.page.screenshot({
          path: "screenshots/GmailScreenshot_InboxErrorPage.png",
          animations: "allow",
        });
      });

    await expect(
      this.page.getByRole("link", { name: locatorsAndRolesForGmail.inboxLink })
    )
      .toBeVisible()
      .catch((error) => {
        console.log("Error: ", error);
        console.log("Inbox link not visible, taking screenshot.");
        this.page.screenshot({
          path: "screenshots/GmailScreenshot_InboxErrorPage.png",
          animations: "allow",
        });
      }); // Check if the inbox header is visible after signing in.

    await this.page.screenshot({
      path: `screenshots/GmailScreenshot_InboxPage.png`,
      omitBackground: true,
      animations: "allow",
    });
  }
  async checkSucessfullSignIn(username: string, password: string) {
    await this.navigateToSignInPage();
    await this.fillEmailAddress(username);
    await this.clickNextButton();
    await this.fillEmailAddressPassword(password);
    await this.clickNextButton();

    if (await this.checkIfContextIsMobileViewPort()) {
      console.log("Mobile viewport detected");
      await this.clickNotInterestedLink();
      await this.checkSearchElement();
    } else {
      console.log("Desktop viewport detected");
      await this.checkInboxPage();
    }

    await this.closeBrowser();
  }

  async closeBrowser() {
    await this.page.close();
  }

  async checkIfContextIsMobileViewPort() {
    const context = this.page.context();
    const page = this.page;

    const viewport = page.viewportSize();

    if (viewport && viewport.width < 600) {
      return true;
    } else {
      return false;
    }
  }

  async clickNotInterestedLink() {
    console.log("Clicking Not Interested Link...");
    await this.page
      .getByRole("button", { name: locatorsAndRolesForGmail.notInterestedLink })
      .click();

    await this.page.waitForLoadState("load", {
      timeout: 500,
    });
  }

  async checkSearchElement() {
    console.log("Checking GMail Mobile Inbox...");

    await this.page.waitForLoadState("load", {
      timeout: 1000,
    });

    await this.page.getByRole('searchbox', { name: locatorsAndRolesForGmail.searchInput})
      .isVisible()
      .catch((error) => {
        console.log("Error: ", error);
        console.log("GMail Mobile Inbox not visible, taking screenshot.");
        this.page.screenshot({
          path: "screenshots/GmailMobileScreenshot_InboxErrorPage.png",
          animations: "allow",
        });
      });

    await expect(this.page.getByRole('searchbox', { name: locatorsAndRolesForGmail.searchInput }))
      .toBeVisible()
      .catch((error) => {
        console.log("Error: ", error);
        console.log("GMail Mobile Inbox not visible, taking screenshot.");
        this.page.screenshot({
          path: "screenshots/GmailScreenshot_InboxErrorPage.png",
          animations: "allow",
        });
      });

    await this.page.screenshot({
      path: `screenshots/GmailMobileScreenshot_InboxPage.png`,
      omitBackground: true,
      animations: "allow",
    });
  }
}
