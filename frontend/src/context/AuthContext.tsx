'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import type { AuthUser } from '@/types';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (userId: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = Cookies.get('authToken');
    if (storedToken) {
      setToken(storedToken);
      fetchProfile(storedToken);
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async (authToken: string) => {
    try {
      const userData = await authService.getProfile(authToken);
      setUser(userData);
    } catch {
      Cookies.remove('authToken');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    const currentToken = Cookies.get('authToken');
    if (currentToken) {
      await fetchProfile(currentToken);
    }
  };

  const login = async (userId: string, password: string) => {
    const data = await authService.login({ userId, password });
    Cookies.set('authToken', data.access_token, { expires: 7 });
    setToken(data.access_token);
    setUser(data.user);
    if (data.user.isFirstLogin) {
      router.push('/admin/settings?tab=password&firstLogin=1');
    } else {
      router.push('/admin/dashboard');
    }
  };

  const logout = async () => {
    await authService.logout();
    Cookies.remove('authToken');
    setToken(null);
    setUser(null);
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        refreshUser,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
