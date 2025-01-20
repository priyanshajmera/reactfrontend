import React, { ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { logout } from '../utils/logout';


// Define the structure of the decoded JWT payload
interface JwtPayload {
  exp: number; // Expiration timestamp in seconds
}



// Utility function to check if the token is valid
const isTokenValid = (): boolean => {
  const token = localStorage.getItem('token'); // Replace 'jwtToken' with your key
  if (!token) return false;

  try {
    const decoded: JwtPayload = jwtDecode(token); // Decode the token
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    return decoded.exp > currentTime; // Token is valid if expiration is in the future
  } catch (error) {
    return false; // If decoding fails, treat token as invalid
  }
};

// Props for AuthGuard
interface AuthGuardProps {
  children: ReactNode;
}

// AuthGuard Component
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isLoggedIn = isTokenValid();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    // Redirect unauthenticated users to login page
    logout(navigate)
    
  }

  return <>{children}</>; // Render children for authenticated users
};

export default AuthGuard;
