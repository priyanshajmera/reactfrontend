import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Ensure this is the default import
import { logout } from "../utils/logout";

// Define the structure of the decoded JWT payload
interface JwtPayload {
  exp: number; // Expiration timestamp in seconds
}

// Utility function to check if the token is valid
const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token); // Decode the token
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
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = isTokenValid();
      if (!isLoggedIn) {
        logout(navigate); // Redirect unauthenticated users
      }
    };

    checkAuth(); // Perform authentication check
  }, [navigate]); // Only run when `navigate` changes

  return <>{children}</>; // Render children for authenticated users
};

export default AuthGuard;
