import exp from "constants";
import { UrlsTypes,WaitTimes,HomePageXPaths,ExpectedValuesForRoles,MaximizeWindowDesktop,MaximizeWindowMobile } from "./utilstypes";

export const urlsValues: UrlsTypes = {
    signInPageUrl: "https://www.netflix.com/",
    homePageUrl: "https://www.netflix.com/browse",
};

export const waitTimeValues: WaitTimes = {
    defaultTimeOut: 1000, // default timeout for all wait times
};


export const expectedValuesForRoles:ExpectedValuesForRoles = {
    linkProfile: "Alon",
    whoIsWatching: "h1.profile-gate-label",   
    signInbutton: "Sign In", 
    signInButtonHasText: "Sign In",
    inputEmailAddress: "Email or mobile number",
    inputPassword: "Password",
    moviesMenu: "a[href='/browse/genre/34399'][data-navigation-tab-name='genreCategory']",
    genereMenu: "div.nfDropDown.theme-lakira",
    genereMenuOpen: "div.nfDropDown.open.theme-lakira",
    intrigeMenu: "a[href='/browse/genre/8933?bc=34399'][class='sub-menu-link']",
    ourSelectionMoviesCard: "div.boxart-container",
}

export const maximizeWindowDesktop: MaximizeWindowDesktop = {
    width: 1920,
    height: 1080,
}

export const maximizeWindowMobile: MaximizeWindowMobile = {
    width: 375,                 
    height: 667,
}