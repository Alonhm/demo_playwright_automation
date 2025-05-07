import { test } from "@playwright/test";
import GmailSignInPage from "../../Pages/GmailPages/GmailSignInPage";   

const validEmail = process.env.GMAIL_VALID_EMAIL || "NOT PICKING UP ENV VARIABLES";
const validPassword =
  process.env.GMAIL_VALID_PASSWORD || "NOT PICKING UP ENV VARIABLES";

// Given the user is on the Gmail sign in page
// When the user fills the email address and clicks on the next button
// And fills the password and clicks on the next button
// Then the user should be signed in successfully
// And the user should see the inbox page
// And the user should see the inbox header
test("Verify Gmail inbox after SignIn ", async ({ page }) => {
    const gmailSignInPage = new GmailSignInPage(page);
    await gmailSignInPage.checkSucessfullSignIn(validEmail, validPassword);
});
