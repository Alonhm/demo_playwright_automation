import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import {
  urlsValues,
  locatorsAndRolesForNetflix,
} from "../../utils/utilsValues";
import WindowManager from "../../utils/WindowManager";
import ExplicitWaitManager from "../../utils/ExplicitWaitManager";

// This class is used to sign in to Netflix
// It contains methods to navigate to the sign in page, maximize the window, click on the sign in button, fill the email address and password, and sign in
// It uses the Playwright library to interact with the page.
export default class NetflixSignInPage {
  private page: Page;
  private url = urlsValues.signInPageUrl;
  private windowManager: WindowManager;
  private explicitWaitManager: ExplicitWaitManager;

  constructor(page: Page) {
    this.page = page;
    this.windowManager = new WindowManager(page);
    this.explicitWaitManager = new ExplicitWaitManager(page);
  }

  async navigate() {
    await this.page.goto(this.url, {
      waitUntil: "load",
    });
  }

  async maximizeWindow() {
    this.windowManager.maximizeWindowDesktop();
  }

  async clickSignInButton() {
    await this.page
      .getByRole("button", { name: locatorsAndRolesForNetflix.signInbutton })
      .filter({ hasText: locatorsAndRolesForNetflix.signInButtonHasText })
      .isVisible();

    await this.page
      .getByRole("button", { name: locatorsAndRolesForNetflix.signInbutton })
      .filter({ hasText: locatorsAndRolesForNetflix.signInButtonHasText })
      .click();
  }

  async fillEmailAddress(value: string) {
    await expect(
      this.page.getByLabel(locatorsAndRolesForNetflix.inputEmailAddress)
    ).toBeVisible();

    await this.page
      .getByLabel(locatorsAndRolesForNetflix.inputEmailAddress)
      .fill(value);
  }

  async fillEmailAddressPassword(value: string) {
    await expect(
      this.page.getByLabel(locatorsAndRolesForNetflix.inputPassword)
    ).toBeVisible();

    await this.page
      .getByLabel(locatorsAndRolesForNetflix.inputPassword)
      .fill(value);
  }

  //This function is used to sign in to Netflix
  //It takes username and password as parameters
  //It first navigates to the Netflix homepage
  //Then it maximizes the window
  //Then it clicks on the sign in button
  //Then it waits for 1 second
  //Then it fills the email address and password
  //Then it clicks on the sign in button
  //Then it waits for the page to load
  //Then it checks if the URL is the home page URL
  //Then it checks if the heading is visible
  async signIn(username: string, password: string) {
    await this.navigate();
    await this.maximizeWindow();
    await this.clickSignInButton();
    await this.fillEmailAddress(username);
    await this.fillEmailAddressPassword(password);

    await this.page
      .getByRole("button", { name: locatorsAndRolesForNetflix.signInbutton })
      .filter({ hasText: locatorsAndRolesForNetflix.signInButtonHasText })
      .click();

    await this.explicitWaitManager.explictWait();
    await this.page.waitForLoadState("domcontentloaded", {
      timeout: 2000,
    });

    await expect(this.page)
      .toHaveURL(urlsValues.homePageUrl)
      .catch((error) => {
        console.log("Error: ", error);
        console.log("URL is not the home page URL");
        console.log("Screenshot taken");
        this.page.screenshot({
          path: "screenshots/NetflixSignInPageError.png",
          animations: "allow",
        });
      });

    const h1Element = this.page.locator(
      locatorsAndRolesForNetflix.whoIsWatching
    );

    await this.explicitWaitManager.explictWait();
    await expect(h1Element)
      .toBeAttached()
      .catch((error) => {
        console.log("Error: ", error);
        console.log("h1 element is not visible");
        console.log("Screenshot taken");
        this.page.screenshot({
          path: "screenshots/NetflixErrorWhoIsWatchingPage.png",
          animations: "allow",
        });
      });

    await h1Element.screenshot({
      path: "screenshots/NetflixWhoIsWatching.png",
      animations: "allow",
    });
    
    console.log("h1 element found & screenshot taken");
    await this.page.screenshot({
      path: "screenshots/NetflixWhoIsWatchingPage.png",
      animations: "allow",
    });
    console.log("Netflix Who is watching page screenshot taken");
  }

  async closeBrowser() {
    await this.page.close();
  }

  async closeContext() {
    await this.page.context().close();
  }
}
