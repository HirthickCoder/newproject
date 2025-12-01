import { LogLevel } from '@azure/msal-browser';

// MSAL configuration
export const msalConfig = {
  auth: {
    clientId: '830f9aae-5333-4d48-9a3e-ed986da9d658', // Your Azure AD App Registration ID
    authority: 'https://login.microsoftonline.com/db0e245c-23e1-40d6-af1f-283fa2cea8a8', // Your tenant ID
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
        }
      },
      logLevel: LogLevel.Info
    }
  }
};

// Scopes for MSAL request
export const loginRequest = {
  scopes: ['openid', 'profile', 'User.Read'],
  prompt: 'select_account'
};

// Graph API endpoints
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me'
};