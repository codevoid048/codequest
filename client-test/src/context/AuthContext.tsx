import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Define the context type
interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Function to fetch user data from the backend
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
      console.log(res.data.user);
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Authentication check failed:", error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async () => {
    await fetchUser();
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
