export interface UrlsTypes {
    signInPageUrl: string;  
    homePageUrl: string;
}

export interface WaitTimes {
    defaultTimeOut: number;  
}

export interface HomePageXPaths {
    ourSelectionMoviesCardXpath: string;
}

export interface ExpectedValuesForRoles {
    linkProfile: string;
    whoIsWatching: string; 
    signInbutton: string;   
    signInButtonHasText: string;
    inputEmailAddress: string;
    inputPassword: string;
    moviesMenu: string;
    genereMenu: string; 
    genereMenuOpen: string;
    intrigeMenu: string;
    ourSelectionMovies: string;  
}

export interface MaximizeWindowDesktop {
    width: number;
    height: number;
}

export interface MaximizeWindowMobile {
    width: number;
    height: number;
}