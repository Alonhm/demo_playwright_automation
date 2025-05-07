import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { expectedValuesForRoles } from "../utils/utilsValues";

export default class NetflixHomepage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnUserProfile() {
    await this.page.getByRole("link", { name: expectedValuesForRoles.linkProfile }).isVisible();
    await this.page.getByRole("link", { name: expectedValuesForRoles.linkProfile }).click();
  }

  //this method will navigate to the Netflix home page
  // and click on the movies menu
  async clickMoviesMenu() {
    await this.page.locator(expectedValuesForRoles.moviesMenu).isVisible();
    await this.page.locator(expectedValuesForRoles.moviesMenu).click();
  }

  //this method will click on the genre menu
  // and open the genre page
  // and select the Intrigue cinema menu
  async openGenreMenu() {
    await this.page.locator(expectedValuesForRoles.genereMenu).isVisible();
    await this.page.locator(expectedValuesForRoles.genereMenu).click();
  }

  //this method will click on the Intrigue cinema menu
  // and open the Intrigue cinema page
  async clickIntrige() {
    await this.page.locator(expectedValuesForRoles.genereMenuOpen).isVisible();

    await this.page.locator(expectedValuesForRoles.intrigeMenu).isVisible();
    await this.page.locator(expectedValuesForRoles.intrigeMenu).click();
  }

  //this method will verify the movie card titles
  // and take a screenshot of the first movie card
  // and print the movie card title
  async verifyOurSelectionMoviesTitles() {
   // this.explicitWaitManager.waitForElementToBeVisible(this.moviesMenuXpath);
   //select the first movie card
    const movieCards =  await this.page.locator(expectedValuesForRoles.ourSelectionMoviesCard).all();

    const firstThreeMovieCards = movieCards.slice(0, 3);
  

    for (let key in firstThreeMovieCards) {
      const movieCardTitle = firstThreeMovieCards[key].locator("p");
      const movieCardImage = firstThreeMovieCards[key].locator("img");

      // print the movie card title
      console.log("[Netflix: Intrigue Movies, Our selection movies titles: ", movieCardTitle.textContent(), "]");
      // take a screenshot of the movie card
      await movieCardImage.screenshot({ path: `./movieCard${key}.png` });
    }

  }

}
