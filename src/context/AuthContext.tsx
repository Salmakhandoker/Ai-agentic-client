import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configure Axios Defaults
axios.defaults.baseURL = 'http://localhost:5000/api';

interface UserProfile {
  budget: number;
  interests: string[];
  climate: string;
  pace: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  profile: UserProfile;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  googleLogin: (email: string, username: string, googleId: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Set Authorization Header Helper
  const setAuthHeader = (jwtToken: string | null) => {
    if (jwtToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Load user from token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('aetheria_token');
      if (storedToken) {
        setToken(storedToken);
        setAuthHeader(storedToken);
        try {
          const res = await axios.get('/auth/me');
          setUser({
            id: res.data._id,
            username: res.data.username,
            email: res.data.email,
            profile: res.data.profile
          });
        } catch (error) {
          console.error('Invalid token or server down, logging out...');
          localStorage.removeItem('aetheria_token');
          setToken(null);
          setAuthHeader(null);
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post('/auth/login', { email, password });
    const { token: jwtToken, user: userData } = res.data;
    localStorage.setItem('aetheria_token', jwtToken);
    setToken(jwtToken);
    setAuthHeader(jwtToken);
    setUser(userData);
  };

  const register = async (username: string, email: string, password: string) => {
    const res = await axios.post('/auth/register', { username, email, password });
    const { token: jwtToken, user: userData } = res.data;
    localStorage.setItem('aetheria_token', jwtToken);
    setToken(jwtToken);
    setAuthHeader(jwtToken);
    setUser(userData);
  };

  const googleLogin = async (email: string, username: string, googleId: string) => {
    const res = await axios.post('/auth/google', { email, username, googleId });
    const { token: jwtToken, user: userData } = res.data;
    localStorage.setItem('aetheria_token', jwtToken);
    setToken(jwtToken);
    setAuthHeader(jwtToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('aetheria_token');
    setToken(null);
    setAuthHeader(null);
    setUser(null);
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    const res = await axios.put('/auth/profile', profileData);
    const { user: updatedUserData } = res.data;
    setUser(updatedUserData);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, googleLogin, logout, updateProfile }}>
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
