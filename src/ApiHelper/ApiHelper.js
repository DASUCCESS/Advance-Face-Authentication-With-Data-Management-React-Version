import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'http://localhost:8000/api';  

// This is an helper function to get the JWT token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem('access_token');
  return token;
};


export const registerUser = async (username, faceImage) => {
  try {
    const response = await axios.post(`${BASE_URL}/register/`, {
      username,
      image: faceImage,  
    });
    return response.data;  
  } catch (error) {
    
    if (error.response) {
      throw new Error(error.response.data.error || 'Registration failed');
    } else {
      throw new Error('Network error or server is not reachable');
    }
  }
};


export const loginUser = async (username, faceImage) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/`, {
      username,
      image: faceImage, 
    });

    if (response.status === 200) {
 
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      console.log('Tokens saved:', response.data.access, response.data.refresh);  

      // This section is a powerful check that ensures token is still active 
      //   (I use this for debugging the codes to ensure token is working well)
      const accessToken = response.data.access;
      const decoded = jwtDecode(accessToken);

      const isExpired = decoded.exp * 1000 < Date.now();  
      if (isExpired) {
        console.log('Token is expired');
      } else {
        console.log('Token is valid');
      }

      return response.data;
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'An error occurred during login.');
  }
};

// Get user information
export const getUserData = async () => {
    const token = localStorage.getItem('access_token');  
  
    if (!token) {
      throw new Error('No token found');
    }
  
    try {
      const response = await axios.get(`${BASE_URL}/user_info/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Authorization Header:', `Bearer ${token}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error(error.response?.data?.error || 'An error occurred.');
    }
  };
  

// Get list of user data items
export const getUserDataItems = async () => {
  const token = getAuthToken();
  try {
    const response = await axios.get(`${BASE_URL}/user_data/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'An error occurred.');
  }
};

// Create new user data
export const createData = async (data) => {
  const token = getAuthToken();
  console.log('Create Data - Token:', token, 'Data:', data); 
  try {
    const response = await axios.post(`${BASE_URL}/user_data/create/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'An error occurred.');
  }
};

// Update user data
export const updateData = async (id, data) => {
  const token = getAuthToken();
  console.log('Update Data - Token:', token, 'ID:', id, 'Data:', data);  
  try {
    const response = await axios.put(`${BASE_URL}/user_data/${id}/update/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'An error occurred.');
  }
};

// Delete user data
export const deleteData = async (id) => {
  const token = getAuthToken();
  console.log('Delete Data - Token:', token, 'ID:', id); 
  try {
    await axios.delete(`${BASE_URL}/user_data/${id}/delete/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'An error occurred.');
  }
};

// Log out function 
export const logoutUser = () => {
  console.log('Logging out user...'); 
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  } catch (error) {
    console.error('An error occurred during logout:', error);
  }
};
