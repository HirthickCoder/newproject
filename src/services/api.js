// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  },
  params: {
    _: Date.now()
  }
});

// Force no-cache for all requests
api.interceptors.request.use(config => {
  // Add timestamp to all GET requests
  if (config.method?.toLowerCase() === 'get') {
    config.params = {
      ...config.params,
      _: Date.now()
    };
  }
  return config;
});

// Add response interceptor to log responses
api.interceptors.response.use(
  response => {
    console.log('API Response:', response.config.url, response.data);
    return response;
  },
  error => {
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const getMenuItems = async () => {
  try {
    const response = await api.get('/menu/', {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      params: {
        _: Date.now()
      }
    });
    console.log('Fetched menu items:', response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error in getMenuItems:', error);
    throw error;
  }
};

export const updateMenuItem = async (id, data) => {
  try {
    const updateData = {
      name: data.name || '',
      description: data.description || '',
      price: data.price || 0,
      category: data.category || 'Uncategorized',
      image: data.image || '/images/default.jpg',
      popular: data.popular || false
    };
    console.log('Updating menu item:', id, updateData);
    const response = await api.put(`/menu/${id}`, updateData, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    console.log('Update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in updateMenuItem:', error.response?.data || error.message);
    throw error;
  }
};