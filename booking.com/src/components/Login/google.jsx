// Google.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleButton = () => {
  const handleSuccess = async (response) => {
    try {
      // Send the Google token to your backend for verification and to create or retrieve the user
      const result = await axios.post('http://localhost:3000/auth/google/callback', {
        id_token: response.credential,
      });

      // Handle the result from your backend (e.g., store the JWT token, user info)
      console.log('User info:', result.data);
    } catch (error) {
      console.error('Error during Google authentication:', error);
    }
  };

  const handleError = (error) => {
    console.error('Google login failed:', error);
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
};

export default GoogleButton;
