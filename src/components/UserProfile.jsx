import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest, graphConfig } from '../auth-config';
import { Box, Typography, Avatar, CircularProgress, Paper } from '@mui/material';

export default function UserProfile() {
    const { instance, accounts } = useMsal();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (accounts.length > 0) {
                try {
                    setLoading(true);
                    const response = await instance.acquireTokenSilent({
                        ...loginRequest,
                        account: accounts[0]
                    });

                    const graphResponse = await fetch(graphConfig.graphMeEndpoint.uri, {
                        headers: {
                            'Authorization': `Bearer ${response.accessToken}`
                        }
                    });

                    if (!graphResponse.ok) {
                        throw new Error(`HTTP error! status: ${graphResponse.status}`);
                    }

                    const data = await graphResponse.json();
                    setUserData(data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError('Failed to load user profile. Please try again.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProfileData();
    }, [instance, accounts]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={2}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!userData) {
        return (
            <Box p={2}>
                <Typography>No user data available</Typography>
            </Box>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                <Avatar 
                    src={userData.userPrincipalName ? `https://graph.microsoft.com/v1.0/me/photo/$value` : undefined}
                    sx={{ width: 100, height: 100, mb: 2 }}
                >
                    {userData.displayName?.charAt(0) || 'U'}
                </Avatar>
                
                <Typography variant="h5" gutterBottom>
                    {userData.displayName || 'User'}
                </Typography>
                
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    {userData.jobTitle || 'No job title'}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {userData.mail || userData.userPrincipalName}
                </Typography>
                
                <Box mt={2} textAlign="left" width="100%">
                    <Typography variant="subtitle2" color="text.secondary">
                        Additional Information:
                    </Typography>
                    <Box component="pre" sx={{ 
                        mt: 1, 
                        p: 2, 
                        bgcolor: 'background.default', 
                        borderRadius: 1,
                        overflowX: 'auto',
                        fontSize: '0.8rem'
                    }}>
                        {JSON.stringify(userData, null, 2)}
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}
