'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AdminState, AdminActions, AdminUser, AdminRole, ESTIMATE_STATUS } from '@/types/admin';

interface EstimateFilterState {
  showWaiting: boolean;
  showRunning: boolean;
  showCompleted: boolean;
  showCanceled: boolean;
}

interface AdminStore extends AdminState, AdminActions {
  // Estimate Filter State
  estimateFilter: EstimateFilterState;
  setEstimateFilter: (filter: Partial<EstimateFilterState>) => void;
  updateEstimateFilter: () => void;
  
  // Helper methods
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
  canManageEstimates: () => boolean;
  getCompanyKey: () => string | null;
}

const defaultEstimateFilter: EstimateFilterState = {
  showWaiting: true,
  showRunning: true,
  showCompleted: true,
  showCanceled: true,
};

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      // Initial State
      isAuthenticated: false,
      user: null,
      isAutoLogin: false,
      accessToken: undefined,
      refreshToken: undefined,
      
      // Estimate Filter State
      estimateFilter: defaultEstimateFilter,

      // Authentication Actions
      login: async (loginId: string, password: string, autoLogin = false) => {
        try {
          // Base64 encode password as required by API
          const encodedPassword = btoa(password);
          
          // Call login API (will be implemented in useAdminAuth hook)
          const response = await fetch('/api/v0/admin/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              loginId,
              password: encodedPassword,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const userData = data.data as AdminUser;
            
            set({
              isAuthenticated: true,
              user: userData,
              isAutoLogin: autoLogin,
            });
            
            return true;
          }
          
          return false;
        } catch (error) {
          console.error('Login failed:', error);
          return false;
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          isAutoLogin: false,
          accessToken: undefined,
          refreshToken: undefined,
        });
        
        // Clear localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('AUTO_LOGIN');
        }
      },

      setAutoLogin: (autoLogin: boolean) => {
        set({ isAutoLogin: autoLogin });
        
        // Update localStorage
        if (typeof window !== 'undefined') {
          if (autoLogin) {
            localStorage.setItem('AUTO_LOGIN', 'true');
          } else {
            localStorage.removeItem('AUTO_LOGIN');
          }
        }
      },

      checkAuthStatus: () => {
        const { isAuthenticated, user } = get();
        
        // Check localStorage for auto-login
        if (typeof window !== 'undefined') {
          const autoLogin = localStorage.getItem('AUTO_LOGIN');
          if (autoLogin === 'true' && !isAuthenticated) {
            // Auto-login should be handled by useAdminAuth hook on app initialization
            set({ isAutoLogin: true });
          }
        }
        
        return isAuthenticated && user !== null;
      },

      refreshAuth: async () => {
        // TODO: Implement token refresh logic if needed
        return get().checkAuthStatus();
      },

      // Estimate Filter Actions
      setEstimateFilter: (filter: Partial<EstimateFilterState>) => {
        set((state) => ({
          estimateFilter: {
            ...state.estimateFilter,
            ...filter,
          },
        }));
      },

      updateEstimateFilter: () => {
        // This method can be called to trigger re-filtering
        // The actual filtering logic will be in the EstimateList component
        const { estimateFilter } = get();
        console.log('Updating estimate filter:', estimateFilter);
      },

      // Helper Methods
      isAdmin: () => {
        const { user } = get();
        return user?.role === AdminRole.ADMIN || user?.role === AdminRole.SUPER_ADMIN;
      },

      isSuperAdmin: () => {
        const { user } = get();
        return user?.role === AdminRole.SUPER_ADMIN;
      },

      canManageEstimates: () => {
        return get().isAdmin();
      },

      getCompanyKey: () => {
        const { user } = get();
        if (!user) return null;
        
        // Super admin can see all estimates
        if (user.role === AdminRole.SUPER_ADMIN) {
          return null; // null means all companies
        }
        
        // Regular admin sees only their company's estimates
        return user.loginId === 'JEJULOGIS' ? 'JEJULOGIS' : user.loginId;
      },
    }),
    {
      name: 'admin-store',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        isAutoLogin: state.isAutoLogin,
        estimateFilter: state.estimateFilter,
      }),
    }
  )
);

// Utility functions for estimate filtering
export const shouldShowEstimate = (status: number, filter: EstimateFilterState): boolean => {
  switch (status) {
    case ESTIMATE_STATUS.WAITING:
      return filter.showWaiting;
    case ESTIMATE_STATUS.RUNNING:
      return filter.showRunning;
    case ESTIMATE_STATUS.COMPLETED:
      return filter.showCompleted;
    case ESTIMATE_STATUS.CANCELED:
      return filter.showCanceled;
    default:
      return filter.showWaiting; // Default to waiting
  }
};