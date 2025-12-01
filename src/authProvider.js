import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './auth-config';

// Initialize MSAL
export const msalInstance = new PublicClientApplication(msalConfig);

// Account selection logic
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

export const getAccessToken = async () => {
  const request = {
    scopes: ['User.Read'],
    account: msalInstance.getActiveAccount()
  };

  try {
    const response = await msalInstance.acquireTokenSilent(request);
    return response.accessToken;
  } catch (error) {
    if (error.name === 'InteractionRequiredAuthError') {
      return msalInstance.acquireTokenPopup(request)
        .then(response => response.accessToken)
        .catch(err => {
          console.error('Failed to get token interactively', err);
          return null;
        });
    }
    console.error('Failed to get token silently', error);
    return null;
  }
};
