// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './ErrorBoundary';
import { msalConfig } from './authConfig';
import App from './App';
import './index.css';

// MSAL   initialization
try {
  const msalInstance = new PublicClientApplication(msalConfig);
  
  // Account selection logic
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
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
        msalInstance.setActiveAccount(response.account);
      }
    })
    .catch((error) => {
      console.error('Error during redirect handling:', error);
    });

  // Debug log
  console.log('Rendering app with MSAL instance:', !!msalInstance);
  
  // Render the app
  const root = createRoot(document.getElementById('root'));
  try {
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <BrowserRouter>
            <MsalProvider instance={msalInstance}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </MsalProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering app:', error);
  }
} catch (error) {
  console.error('Error initializing MSAL:', error);
  // Render the app without MSAL if there's an error
  const root = createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
}