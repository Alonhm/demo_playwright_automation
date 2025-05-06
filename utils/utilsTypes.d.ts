export interface UrlsTypes {
    signInPageUrl: string;  
    homePageUrl: string;
}

export interface WaitTimes {
    defaultTimeOut: number;  
}

export interface HomePageXPaths {
    moviesMenuXpath: string;
    genereXpath: string;    
    intrigeXpath: string;
    ourSelectionMoviesCardXpath: string;
    whoIsWatchingProfileXpath: string;
}

export interface ExpectedValuesForRoles {
    linkProfile: string;
    whoIsWatching: string; 
    signInbutton: string;   
    signInButtonHasText: string;
    inputEmailAddress: string;
    inputPassword: string;
}

export interface MaximizeWindowDesktop {
    width: number;
    height: number;
}

export interface MaximizeWindowMobile {
    width: number;
    height: number;
}