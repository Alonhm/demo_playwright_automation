import { test } from "@playwright/test";
import NetflixSignInPage from "../Pages/NetflixPages/NetflixSignInPage";
import NetflixHomePage from "../Pages/NetflixPages/NetflixHomePage";

const validEmail =
  process.env.NETFLIX_VALID_EMAIL || "NOT PICKING UP ENV VARIABLES";
const validPassword =
  process.env.NETFLIX_VALID_PASSWORD || "NOT PICKING UP ENV VARIABLES";

// this test will run before each test
//Given the user is on the Netflix sign in page
// When the user clicks on the sign in button
// And fills the email address and password
// And clicks on the sign in button
// Then the user should be signed in successfully
test.beforeEach(async ({ page }) => {
  const netflixSignInPage = new NetflixSignInPage(page);
  await netflixSignInPage.signIn(validEmail, validPassword);
});

// Given the user is on the Netflix home page
// When the user clicks on the movies menu
// And opens the genre menu
// And clicks on the Intrigue cinema menu
// Then the user should see the movie card titles
// And the user should take a screenshot of the first 3 movie cards
test("Verify suspense movies after SignIn ", async ({ page }) => {
  const netflixHomePage = new NetflixHomePage(page);
  await netflixHomePage.clickOnUserProfile();
  await netflixHomePage.clickMoviesMenu();
  await netflixHomePage.openGenreMenu();
  await netflixHomePage.clickIntrige();
  await netflixHomePage.verifyOurSelectionMoviesTitles();
  await netflixHomePage.closeBrowser();
});
