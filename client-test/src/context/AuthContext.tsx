/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
// Define the user type
interface User {
  id: string;
  email: string;
  name: string;
  [key: string]: any; // Allow dynamic properties
}

// Define the authentication context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
  fetchUser: () => Promise<void>; // Export fetchUser to allow manual refresh
  verificationString: string;
  setVerificationString: (verificationString: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
    const [verificationString, setVerificationString] = useState("")
  // Function to fetch user data from the backend
  const fetchUser = async () => {
    try {
      // const res = await axios.get("http://localhost:5000/api/auth/me", { 
      //   withCredentials: true 
      // });
      const storedToken = localStorage.getItem("auth_token");

    const res = await axios.get("http://localhost:5000/api/auth/me", {
      withCredentials: true,
      headers: { Authorization: `Bearer ${storedToken}` }, // Ensure token is sent
    });
      
    // console.log("API response:", res.data); // Log full response
    // console.log("Token from API:", res.data.token);

      if (res.data && res.data.user) {
        setUser(res.data.user);
        setIsAuthenticated(true);

        // Make sure we're getting the token correctly from the response
        const authToken = res.data.token || storedToken;
        setToken(authToken);

        // Also store token in localStorage for persistence
        if (authToken) {
          localStorage.setItem('auth_token', authToken);
        }
      }
      console.log("user after login:", user);
    } catch (error) {
      console.error("Authentication check failed:", error);
      setUser(null);
      setIsAuthenticated(false);
      setToken(null);
      localStorage.removeItem('auth_token');
    }
  };

  // Check for stored token on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(); // Validate the token by fetching user data
    } else {
      fetchUser(); // Try to fetch user data anyway (in case of cookie auth)
    }
  }, []);

  // Login function
  const login = async () => {
    await fetchUser();
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, {
        withCredentials: true
      });

      setUser(null);
      setIsAuthenticated(false);
      setToken(null);
      localStorage.removeItem('auth_token');

      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Create the context value object
  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    token,
    verificationString,
    setVerificationString,
    fetchUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use AuthContext
const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  // const storedToken = localStorage.getItem("auth_token");
  // console.log("Token in localStorage:", storedToken);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


export { AuthProvider, useAuth };