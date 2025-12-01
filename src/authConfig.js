// MSAL configuration for TCE (Thiagarajar College of Engineering)
export const msalConfig = {
  auth: {
    clientId: '830f9aae-5333-4d48-9a3e-ed986da9d658', // Your Azure AD App ID
    authority: 'https://login.microsoftonline.com/db0e245c-23e1-40d6-af1f-283fa2cea8a8', // TCE Tenant ID
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: 'sessionStorage', // or 'localStorage' for persistent login
    storeAuthStateInCookie: true // Required for IE11
  }
};

// Add scopes for Microsoft Graph API
export const loginRequest = {
  scopes: [
    'openid',
    'profile',
    'User.Read',
    'email',
    'offline_access'
  ],
  prompt: 'select_account' // Forces account selection
};

// Add more scopes if you need to access Microsoft Graph API
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphMailEndpoint: 'https://graph.microsoft.com/v1.0/me/messages'
};