import React from 'react';
import { createRoot } from 'react-dom/client';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import App from './App';
import './index.css';

// MSAL initialization
try {
  const msalInstance = new PublicClientApplication(msalConfig);
  
  // Account selection logic
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    // If there are signed-in users, set the first user as active
    msalInstance.setActiveAccount(accounts[0]);
  }

  // Handle redirect response
  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
      const account = event.payload.account;
      if (account) {
        msalInstance.setActiveAccount(account);
      }
    } else if (event.eventType === EventType.LOGIN_FAILURE) {
      console.error('Login failed:', event);
    }
  });

  // Check if we're in the middle of a redirect
  msalInstance.handleRedirectPromise()
    .then((response) => {
      if (response) {
        // Handle successful redirect
        msalInstance.setActiveAccount(response.account);
      }
    })
    .catch((error) => {
      console.error('Error during redirect handling:', error);
    });

  // Render the app
  const root = createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error initializing MSAL:', error);
  // Render the app without MSAL if there's an error
  const root = createRoot(document.getElementById('root'));
  root.render(
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Application Error</h1>
      <p>Failed to initialize authentication. Please try again later.</p>
      <p>Error details: {error.message}</p>
    </div>
  );
}