
import { createContext, useState, useEffect, useContext } from 'react';
import { loginUser as apiLoginUser, registerUser as apiRegisterUser, logoutUser as apiLogoutUser, getCurrentUser } from '@/lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  // Login user
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const success = await apiLoginUser(email, password);
      if (success) {
        const userInfo = getCurrentUser();
        setUser(userInfo);
      }
      setIsLoading(false);
      return success;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  // Register user
  const register = async (name, email, password, mobile) => {
    setIsLoading(true);
    try {
      const success = await apiRegisterUser(name, email, password, mobile);
      setIsLoading(false);
      return success;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  // Logout user
  const logout = () => {
    apiLogoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
