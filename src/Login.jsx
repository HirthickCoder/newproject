import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';

const Login = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch(e => {
      console.error('Login failed:', e);
    });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: '#f3f2f1'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#1b1b1b' }}>Sign In</h2>
        <p style={{ marginBottom: '30px', color: '#616161' }}>to continue to Hirthick-App-Dev</p>
        
        <button 
          onClick={handleLogin}
          style={{
            backgroundColor: '#2F2F2F',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            margin: '0 auto',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#252525'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2F2F2F'}
        >
          <img 
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMSIgaGVpZ2h0PSIyMSIgdmlld0JveD0iMCAwIDIxIDIxIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTIuNSAxMC41SDBWMEgxMi41VjEwLjVaIiBmaWxsPSIjRjI1MEEyMiIvPjxwYXRoIGQ9Ik0yMSAxMC41SDguNVYwSDFWMTkuNUMxIDIwLjMyODQgMS42NzE1NyAyMSAyLjUgMjFIMjFWMTEuNUMxMS4yMzg2IDExLjUgMTEuNDgyMjMgMTEuMjIzOSAxMS41IDExVjEwLjVaIiBmaWxsPSIjN0ZCQTAwIi8+PHBhdGggZD0iTTEwLjUgMjFIOC41VjEwLjVIMjFWMTkuNUMyMSAyMC4zMjg0IDIwLjMyODQgMjEgMTkuNSAyMUgxMC41WiIgZmlsbD0iIzBBMTRGRiIvPjxwYXRoIGQ9Ik0xMi41IDIxSDguNVYxMS41SDIxVjE5LjVDMjEgMjAuMzI4NCAyMC4zMjg0IDIxIDE5LjUgMjFIMTIuNVoiIGZpbGw9IiNGRkIwMDAiLz48L3N2Zz4="
            alt="Microsoft"
            style={{
              height: '20px',
              marginRight: '10px'
            }}
          />
          Sign in with Microsoft
        </button>
      </div>
    </div>
  );
};

export default Login;
