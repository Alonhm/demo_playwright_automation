import exp from "constants";
import { UrlsTypes,WaitTimes,HomePageXPaths,ExpectedValuesForRoles,MaximizeWindowDesktop,MaximizeWindowMobile } from "./utilstypes";

export const urlsValues: UrlsTypes = {
    signInPageUrl: "https://www.netflix.com/",
    homePageUrl: "https://www.netflix.com/browse",
};

export const waitTimeValues: WaitTimes = {
    defaultTimeOut: 1000, // default timeout for all wait times
};

export const xpathHomePageValues: HomePageXPaths = {
    moviesMenuXpath: "xpath=//*[text()='Peliculas']/../..",
    genereXpath: "xpath=//div[@class='nfDropDown open theme-lakira']",
    intrigeXpath: "xpath=//*[text()='Intrigue cinema']/../..",
    ourSelectionMoviesCardXpath: "xpath=//div[@id='row-1']",
    whoIsWatchingProfileXpath: "xpath=//li[@class='profile'][1]//a[@tabindex='0']",
}

export const expectedValuesForRoles:ExpectedValuesForRoles = {
    linkProfile: "Alon",
    whoIsWatching: "Who's watching now?",   
    signInbutton: "Sign In", 
    signInButtonHasText: "Sign In",
    inputEmailAddress: "Email or mobile number",
    inputPassword: "Password",
}

export const maximizeWindowDesktop: MaximizeWindowDesktop = {
    width: 1920,
    height: 1080,
}

export const maximizeWindowMobile: MaximizeWindowMobile = {
    width: 375,                 
    height: 667,
}