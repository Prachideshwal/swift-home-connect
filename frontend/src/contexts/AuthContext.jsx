
import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, loginUser, registerUser, logoutUser } from '@/lib/api';
import { toast } from '@/components/ui/sonner';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const success = await loginUser(email, password);
    if (success) {
      setUser(getCurrentUser());
    }
    return success;
  };

  const register = async (name, email, password, mobile) => {
    const success = await registerUser(name, email, password, mobile);
    if (success) {
      // Auto login after successful registration
      localStorage.setItem("user", JSON.stringify({ email, name }));
      setUser({ email, name });
    }
    return success;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
