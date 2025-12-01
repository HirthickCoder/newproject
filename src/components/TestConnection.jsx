import { useState, useEffect } from 'react';
import { Button, Typography, Box, CircularProgress, Paper } from '@mui/material';

export default function TestConnection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/api/test');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Test connection failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="60vh"
      p={3}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
        <Typography variant="h5" gutterBottom align="center">
          Test Backend Connection
        </Typography>
        
        <Box display="flex" flexDirection="column" gap={2} mt={3}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={testConnection}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Testing...' : 'Test Connection'}
          </Button>
          
          {data && (
            <Box mt={2} p={2} bgcolor="success.light" borderRadius={1}>
              <Typography color="success.contrastText">
                Success! Received: {JSON.stringify(data)}
              </Typography>
            </Box>
          )}
          
          {error && (
            <Box mt={2} p={2} bgcolor="error.light" borderRadius={1}>
              <Typography color="error.contrastText">
                Error: {error}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
