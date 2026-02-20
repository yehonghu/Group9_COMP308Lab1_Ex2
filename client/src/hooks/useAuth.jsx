// Custom Hook: useAuth
// Manages authentication state across the application
// Provides user data, login, register, and logout functions

import { useState, useEffect, createContext, useContext } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../services/auth.service';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login function
  const login = async (username, password) => {
    const data = await loginUser(username, password);
    setUser(data.user);
    return data;
  };

  // Register function
  const register = async (username, password) => {
    const data = await registerUser(username, password);
    setUser(data.user);
    return data;
  };

  // Logout function
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
