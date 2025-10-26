import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../utils/types';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../services/authService';

// Define the context type
interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateAuth: (user: User) => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  authState: { user: null, isAuthenticated: false },
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateAuth: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  // Check for existing user session on initial render
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setAuthState({
        user,
        isAuthenticated: true,
      });
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const user = loginUser(email, password);
      setAuthState({
        user,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string) => {
    try {
      const user = registerUser(email, password, name);
      setAuthState({
        user,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Update auth state
  const updateAuth = (user: User) => {
    setAuthState({
      user,
      isAuthenticated: true,
    });
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        register,
        logout,
        updateAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};