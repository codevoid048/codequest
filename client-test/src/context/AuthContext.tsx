import React, { createContext, useState, useEffect, ReactNode } from "react";



// Define the context and its types
interface AuthContextType {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<any | null>(JSON.parse(localStorage.getItem("user") || "null"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token); // Persist the token in localStorage
    } else {
      localStorage.removeItem("token");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Persist the user data in localStorage
    } else {
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const login = (newToken: string, userData: any) => {
    setToken(newToken);
    setUser(userData); // Set the user data when the user logs in
    console.log("user",userData);
  };
 
  const logout = () => {
    setToken(null);
    setUser(null); // Clear user data on logout
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
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
