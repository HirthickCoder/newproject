import React, { useEffect } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../auth-config';
import { useNavigate } from 'react-router-dom';

// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f3f2f1',
    padding: '20px',
    textAlign: 'center'
  },
  loginBox: {
    backgroundColor: 'white',
    padding: '48px',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    display: 'inline-block',
    textAlign: 'center',
    maxWidth: '440px',
    width: '100%'
  },
  title: {
    color: '#1b1b1b',
    fontSize: '24px',
    fontWeight: '600',
    margin: '0 0 8px 0'
  },
  subtitle: {
    color: '#616161',
    margin: '0 0 24px 0',
    fontSize: '14px'
  },
  microsoftButton: {
    backgroundColor: '#2F2F2F',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '2px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
    marginBottom: '16px'
  },
  microsoftButtonHover: {
    backgroundColor: '#252525'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '16px 0',
    color: '#616161',
    fontSize: '14px'
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e0e0e0'
  },
  dividerText: {
    margin: '0 16px',
    color: '#616161',
    fontSize: '14px'
  },
  footer: {
    marginTop: '24px',
    color: '#616161',
    fontSize: '12px',
    textAlign: 'center',
    maxWidth: '480px',
    padding: '0 20px'
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '8px'
  },
  link: {
    color: '#616161',
    textDecoration: 'none'
  },
  linkHover: {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
};

const Login = () => {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if we're coming back from a redirect
        const handleRedirect = async () => {
            try {
                const accounts = instance.getAllAccounts();
                if (accounts.length > 0) {
                    // User is signed in
                    navigate('/');
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };

        handleRedirect();
    }, [instance, navigate]);

    const handleLogin = () => {
        // This will redirect to the Microsoft login page
        instance.loginRedirect(loginRequest).catch(error => {
            console.error('Login failed:', error);
        });
    };
    
    // Add hover effect handlers
    const handleMouseOver = (e) => {
        e.currentTarget.style.backgroundColor = styles.microsoftButtonHover.backgroundColor;
    };
    
    const handleMouseOut = (e) => {
        e.currentTarget.style.backgroundColor = styles.microsoftButton.backgroundColor;
    };
    
    const handleLinkHover = (e) => {
        e.currentTarget.style.textDecoration = 'underline';
    };
    
    const handleLinkLeave = (e) => {
        e.currentTarget.style.textDecoration = 'none';
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <div style={{ marginBottom: '24px' }}>
                    <h1 style={styles.title}>Sign in</h1>
                    <p style={styles.subtitle}>to continue to Hirthick-App-Dev</p>
                </div>

                <div>
                    <button
                        onClick={handleLogin}
                        style={styles.microsoftButton}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >
                        <img 
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMSIgaGVpZ2h0PSIyMSIgdmlld0JveD0iMCAwIDIxIDIxIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTIuNSAxMC41SDBWMEgxMi41VjEwLjVaIiBmaWxsPSIjRjI1MEEyMiIvPjxwYXRoIGQ9Ik0yMSAxMC41SDguNVYwSDFWMTkuNUMxIDIwLjMyODQgMS42NzE1NyAyMSAyLjUgMjFIMjFWMTEuNUMxMS4yMzg2IDExLjUgMTEuNDgyMjMgMTEuMjIzOSAxMS41IDExVjEwLjVaIiBmaWxsPSIjN0ZCQTAwIi8+PHBhdGggZD0iMTAuNSAyMUg4LjVWMTAuNUgyMVYxOS41QzIxIDIwLjMyODQgMjAuMzI4NCAyMSAxOS41IDIxSDEwLjVaIiBmaWxsPSIjMDBBNEVGIi8+PHBhdGggZD0iTTEyLjUgMjFIOC41VjExLjVIMjFWMTkuNUMyMSAyMC4zMjg0IDIwLjMyODQgMjEgMTkuNSAyMUgxMi41WiIgZmlsbD0iI0ZGQjAwMCIvPjwvc3ZnPg=="
                            alt="Microsoft" 
                            style={{ 
                                height: '20px', 
                                marginRight: '10px' 
                            }} 
                        />
                        Sign in with Microsoft
                    </button>
                </div>
                
                <div style={styles.divider}>
                    <div style={styles.dividerLine}></div>
                    <span style={styles.dividerText}>or</span>
                    <div style={styles.dividerLine}></div>
                </div>
                
                <div>
                    <p style={{ color: '#616161', fontSize: '14px', textAlign: 'center' }}>
                        You will be redirected to the Microsoft login page
                    </p>
                </div>
            </div>
            
            <div style={styles.footer}>
                <div style={styles.footerLinks}>
                    <a 
                        href="#" 
                        style={styles.link}
                        onMouseOver={handleLinkHover}
                        onMouseLeave={handleLinkLeave}
                    >
                        Terms of use
                    </a>
                    <a 
                        href="#" 
                        style={styles.link}
                        onMouseOver={handleLinkHover}
                        onMouseLeave={handleLinkLeave}
                    >
                        Privacy & cookies
                    </a>
                </div>
                <div>© {new Date().getFullYear()} Microsoft</div>
            </div>
        </div>
    );
};

export default Login;
