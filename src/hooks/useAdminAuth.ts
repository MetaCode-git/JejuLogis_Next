'use client';

import { useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAdminStore } from '@/stores/useAdminStore';
import { 
  AdminLoginRequest, 
  AdminLoginResponse, 
  AdminUser,
  AdminApiResponse,
  AdminApiError,
  DEFAULT_ADMIN_CREDENTIALS 
} from '@/types/admin';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jejulogis.kro.kr';

interface LoginParams {
  loginId: string;
  password: string;
  autoLogin?: boolean;
}

export const useAdminAuth = () => {
  const {
    isAuthenticated,
    user,
    isAutoLogin,
    login: storeLogin,
    logout: storeLogout,
    setAutoLogin,
    checkAuthStatus,
  } = useAdminStore();

  // Login mutation
  const loginMutation = useMutation<AdminLoginResponse, AdminApiError, LoginParams>({
    mutationFn: async ({ loginId, password }: LoginParams) => {
      // Base64 encode password as required by API
      const encodedPassword = btoa(password);
      
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginId,
          password: encodedPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: 로그인에 실패했습니다.`);
      }

      const data: AdminApiResponse<AdminLoginResponse> = await response.json();
      return data.data;
    },
    onSuccess: (data, variables) => {
      // Update admin store
      const userData: AdminUser = {
        id: data.id,
        loginId: data.loginId,
        name: data.name,
        role: data.role,
      };

      useAdminStore.setState({
        isAuthenticated: true,
        user: userData,
        isAutoLogin: variables.autoLogin || false,
      });

      // Set auto-login preference
      if (variables.autoLogin) {
        setAutoLogin(true);
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
      useAdminStore.setState({
        isAuthenticated: false,
        user: null,
      });
    },
  });

  // Login function
  const login = useCallback(async (loginId: string, password: string, autoLogin = false) => {
    try {
      await loginMutation.mutateAsync({ loginId, password, autoLogin });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, [loginMutation]);

  // Logout function
  const logout = useCallback(() => {
    storeLogout();
  }, [storeLogout]);

  // Validate credentials against legacy format (fallback only)
  const validateLegacyCredentials = useCallback((loginId: string, password: string) => {
    const { key, password: legacyPassword } = DEFAULT_ADMIN_CREDENTIALS;
    
    // Check if credentials match legacy format
    const isValidAdmin = loginId.toUpperCase() === 'ADMIN' && password === legacyPassword;
    const isValidJejuLogis = loginId.toUpperCase() === key.toUpperCase() && password === legacyPassword;
    
    return isValidAdmin || isValidJejuLogis;
  }, []);

  // Login with real API
  const loginWithLegacyCredentials = useCallback(async (loginId: string, password: string, autoLogin = false) => {
    console.log('🚀 Starting API login with:', { loginId, autoLogin });
    
    try {
      // First try real API login
      const success = await login(loginId, password, autoLogin);
      
      if (success) {
        console.log('✅ API login successful');
        return true;
      }
      
      console.log('❌ API login failed, trying fallback validation');
      
      // Fallback: validate against legacy credentials for development
      if (!validateLegacyCredentials(loginId, password)) {
        throw new Error('잘못된 관리자 계정 정보입니다.');
      }
      
      console.warn('⚠️ Using fallback legacy authentication');
      
      const userData: AdminUser = {
        id: 1,
        loginId: loginId.toUpperCase() === 'ADMIN' ? 'admin' : loginId,
        name: loginId.toUpperCase() === 'ADMIN' ? '시스템관리자' : '제주탁송',
        role: loginId.toUpperCase() === 'ADMIN' ? 0 : 1, // 0: SUPER_ADMIN, 1: ADMIN
      };

      useAdminStore.setState({
        isAuthenticated: true,
        user: userData,
        isAutoLogin: autoLogin,
      });

      if (autoLogin) {
        setAutoLogin(true);
      }

      return true;
    } catch (error) {
      console.error('❌ Login failed:', error);
      return false;
    }
  }, [login, validateLegacyCredentials, setAutoLogin]);

  // Check for auto-login on app initialization
  const checkAutoLogin = useCallback(() => {
    if (typeof window !== 'undefined') {
      const autoLoginStored = localStorage.getItem('AUTO_LOGIN');
      if (autoLoginStored === 'true' && !isAuthenticated) {
        // In a real app, you would restore the session here
        // For now, we'll just set the auto-login flag
        setAutoLogin(true);
        return true;
      }
    }
    return false;
  }, [isAuthenticated, setAutoLogin]);

  // Initialize auth state on mount
  useEffect(() => {
    checkAutoLogin();
  }, [checkAutoLogin]);

  return {
    // State
    isAuthenticated,
    user,
    isAutoLogin,
    
    // Actions
    login,
    loginWithLegacyCredentials,
    logout,
    setAutoLogin,
    checkAuthStatus,
    validateLegacyCredentials,
    
    // API States
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    
    // Helper methods
    isAdmin: user?.role === 0 || user?.role === 1,
    isSuperAdmin: user?.role === 0,
    canManageAll: user?.role === 0,
    
    // Legacy support
    DEFAULT_ADMIN_CREDENTIALS,
  };
};