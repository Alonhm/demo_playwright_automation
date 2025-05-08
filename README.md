# Netflix platform automated tests

This repository contains various tests which focus on covering common scenarios, user flows and sensitive procedures an end user might encounter

## How It Works

This repository makes use of Microsoft Playwright's framework and Typescript in order to develop automated tests which will be ran through a github actions pipeline on every Push (At the current time, CI/CD implementation is the final objective)

## How should it be done


Let's take as an example the following scenario:

> My name's Alonso, I want to be able to Sign In into Netflix with my personal account by inputting my Username and Password, when doing so and clicking the Sign In button, I know the application will redirect me to the home page
Taking this into account, then a test should be written in a way where: <br>

1. The Sign In button is clicked
2. The username and password of an existing user are inputted on the corresponding form fields
3. The "Sign In" button is clicked
4. The user is redirected to a different route in the application now that they are Authenticated

All of these are behaviours the user can clearly see in plain view and interact with

```ts
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
```


## File Structure

In order to keep clean and maintainable code for the tests, Pages and their their methods along with the most important selectors should be created each in a .ts file under the Pages directory.

While the tests folder is a little less straightforward, there should be a directory for each "Section" or set of userflows relating to anything. As an example, the signIn directory contains tests for cases where a user might signIn both successfully and unsuccessfully due to using correct and incorrect data for their credentials, each test written should cover a user flow vital to the behavior of the app.

## How to execute an specific test
After clone the repository and move in terminal to the base directory of this, you can execute something like this to indicate to playwright execute an specific test ts class with a different device and screen resolution, at this time -project="Mobile Safari" execute in chrome with user agent userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1' on iphone device emulator. 
Or for Netflix test exercise you use --project="chromium" to execute in desktop resoultion OR other for mobile devices like iPhone 14 Safari or Pixel 7 Chrome

```
npx playwright test signInGmailInbox.spec.ts --debug --project="Mobile Safari" 
or
npx playwright test homePageReadSuspenseMovies.spec.ts --debug --project="chromium"
or
npx playwright test homePageReadSuspenseMovies.spec.ts --debug --project="Mobile Chrome"
```

Playwright configuration file that interprets the above commands:
```
import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";
import path from "path";

config({ path: ".env" });

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    actionTimeout: 0,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "on",
  },

  /* Configure projects for major browsers */
  projects: [
     {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        contextOptions: {
          screen: { width: 1920, height: 1080 },
        },
      },
    },
    {
      name: "Mobile Chrome",
      use: {
        ...devices["pixel 7"],
        isMobile: true,
        headless: false,
      },
    }, 
    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 14"],
        isMobile: true,
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 18_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Mobile/15E148 Safari/604.1",
        contextOptions: {
          viewport: { width: 375, height: 812 },
        },
        headless: false,
      },
    },
  ],
});
```
Notice: the different view points configurations for the GMail test scenario
