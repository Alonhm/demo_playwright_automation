export interface UrlsTypes {
    signInPageUrl: string;  
    homePageUrl: string;
    gmailSignInPageUrl: string;
}

export interface WaitTimes {
    defaultTimeOut: number;  
}


export interface ExpectedValuesForRolesNetflix {
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
    ourSelectionMoviesCard: string;  
}

export interface ExpectedValuesForRolesGmail {
 password: string;
 email: string; 
 nextButton: string;
 inboxHeader: string;
}

export interface MaximizeWindowDesktop {
    width: number;
    height: number;
}

export interface MaximizeWindowMobile {
    width: number;
    height: number;
}