import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { locatorsAndRolesForNetflix } from "../../utils/utilsValues";

export default class NetflixHomepage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnUserProfile() {
    await this.page
      .getByRole("link", { name: locatorsAndRolesForNetflix.linkProfile })
      .isVisible();
    await this.page
      .getByRole("link", { name: locatorsAndRolesForNetflix.linkProfile })
      .click();
  }

  //this method will navigate to the Netflix home page
  // and click on the movies menu
  async clickMoviesMenu() {
    await this.page.locator(locatorsAndRolesForNetflix.moviesMenu).isVisible();
    await this.page.locator(locatorsAndRolesForNetflix.moviesMenu).click();
  }

  //this method will click on the genre menu
  // and open the genre page
  // and select the Intrigue cinema menu
  async openGenreMenu() {
    await this.page.locator(locatorsAndRolesForNetflix.genereMenu).isVisible();
    await this.page.locator(locatorsAndRolesForNetflix.genereMenu).click();
  }

  //this method will click on the Intrigue cinema menu
  // and open the Intrigue cinema page
  async clickIntrige() {
    await this.page
      .locator(locatorsAndRolesForNetflix.genereMenuOpen)
      .isVisible();

    await this.page.locator(locatorsAndRolesForNetflix.intrigeMenu).isVisible();
    await this.page.locator(locatorsAndRolesForNetflix.intrigeMenu).click();
  }

  //this method will verify the movie card titles
  // and take a screenshot of the first movie card
  // and print the movie card title
  async verifyOurSelectionMoviesTitles() {
    // this.explicitWaitManager.waitForElementToBeVisible(this.moviesMenuXpath);
    //select the first movie card
    const movieCards = await this.page
      .locator(locatorsAndRolesForNetflix.ourSelectionMoviesCard)
      .all();

    const firstThreeMovieCards = movieCards.slice(0, 3);

    for (let key in firstThreeMovieCards) {
    
      const movieCardTitle = firstThreeMovieCards[key].locator("p");
      const movieCardImage = firstThreeMovieCards[key].locator("img");

      await expect(movieCardTitle)
        .toBeVisible()
        .catch((error) => {
          console.log("Error: ", error);
          console.log("Movie card title is not visible");
          console.log("Screenshot taken");
          this.page.screenshot({
            path: `screenshots/NetflixMovieCardTitleError${key}.png`,
            animations: "allow",
          });
        });

      await expect(movieCardImage)
        .toBeVisible()
        .catch((error) => {
          console.log("Error: ", error);
          console.log("Movie card image is not visible");
          console.log("Screenshot taken");
          this.page.screenshot({
            path: `screenshots/NetflixMovieCardImageError${key}.png`,
            animations: "allow",
          });
        });

      console.log(`Movie card: ${await movieCardTitle.textContent()} screenshot taken`);
      await firstThreeMovieCards[key].screenshot({
        path: `screenshots/MovieCardScreenshot_${ await movieCardTitle.textContent()}.png`,
        omitBackground: true,
        animations: "allow",
      });
      
    }
  }

  async closeBrowser() {
    await this.page.close();
  }
  async closeContext() {
    await this.page.context().close();
  }
}
