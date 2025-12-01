import { useState, useEffect, createContext, useContext } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../auth-config';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const { instance, accounts, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (inProgress === 'none') {
            if (accounts.length > 0) {
                const currentAccount = accounts[0];
                setUser({
                    name: currentAccount.name,
                    username: currentAccount.username,
                    // Add any other user properties you need
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        }
    }, [accounts, inProgress]);

    const login = async () => {
        try {
            setError(null);
            await instance.loginRedirect(loginRequest);
        } catch (e) {
            console.error('Login error:', e);
            setError('Failed to sign in. Please try again.');
            throw e;
        }
    };

    const logout = () => {
        try {
            instance.logoutRedirect({
                postLogoutRedirectUri: window.location.origin
            });
        } catch (e) {
            console.error('Logout error:', e);
            setError('Failed to sign out. Please try again.');
        }
    };

    const value = {
        isAuthenticated,
        user,
        loading,
        error,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
