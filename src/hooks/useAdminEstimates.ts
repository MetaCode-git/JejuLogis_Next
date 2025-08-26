'use client';

import { useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminStore, shouldShowEstimate } from '@/stores/useAdminStore';
import {
  AdminEstimate,
  AdminEstimateListParams,
  AdminEstimateUpdateRequest,
  AdminApiResponse,
  AdminApiError,
  ESTIMATE_STATUS,
} from '@/types/admin';

// Use Next.js API proxy to avoid CORS issues
const ADMIN_API_BASE = '/api/proxy';

export const useAdminEstimates = () => {
  const queryClient = useQueryClient();
  const { user, estimateFilter, canManageEstimates, getCompanyKey } = useAdminStore();

  // Estimates list query
  const estimatesQuery = useQuery<AdminEstimate[], AdminApiError>({
    queryKey: ['admin-estimates', user?.id, getCompanyKey()],
    queryFn: async () => {
      if (!canManageEstimates() || !user) {
        throw new Error('권한이 없습니다.');
      }

      const companyKey = getCompanyKey();
      let url = `${ADMIN_API_BASE}/estimates`;
      
      // Add company filter for regular admins
      if (companyKey) {
        url += `?companyKey=${encodeURIComponent(companyKey)}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Id': user?.id.toString() || '',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: 견적 목록을 가져올 수 없습니다.`);
      }

      const data: AdminApiResponse<AdminEstimate[]> = await response.json();
      return data.data || [];
    },
    enabled: canManageEstimates() && !!user,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Filtered estimates based on status filter
  const filteredEstimates = useMemo(() => {
    if (!estimatesQuery.data) return [];
    
    return estimatesQuery.data.filter((estimate) =>
      shouldShowEstimate(estimate.status, estimateFilter)
    );
  }, [estimatesQuery.data, estimateFilter]);

  // Estimates by status queries
  const useEstimatesByStatus = (status: number) => {
    return useQuery<AdminEstimate[], AdminApiError>({
      queryKey: ['admin-estimates-status', status, user?.id],
      queryFn: async () => {
        if (!canManageEstimates()) {
          throw new Error('권한이 없습니다.');
        }

        const response = await fetch(
          `${ADMIN_API_BASE}/estimates/status/${status}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Admin-Id': user?.id.toString() || '',
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP ${response.status}: 견적 목록을 가져올 수 없습니다.`);
        }

        const data: AdminApiResponse<AdminEstimate[]> = await response.json();
        return data.data || [];
      },
      enabled: canManageEstimates() && !!user,
    });
  };

  // Individual estimate query
  const useEstimate = (estimateId: number) => {
    return useQuery<AdminEstimate, AdminApiError>({
      queryKey: ['admin-estimate', estimateId],
      queryFn: async () => {
        if (!canManageEstimates() || !user) {
          throw new Error('권한이 없습니다.');
        }

        const response = await fetch(
          `${ADMIN_API_BASE}/estimates/${estimateId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Admin-Id': user?.id.toString() || '',
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP ${response.status}: 견적을 찾을 수 없습니다.`);
        }

        const data: AdminApiResponse<AdminEstimate> = await response.json();
        return data.data;
      },
      enabled: canManageEstimates() && !!user && estimateId > 0,
    });
  };

  // Update estimate mutation
  const updateEstimateMutation = useMutation<
    AdminEstimate,
    AdminApiError,
    { estimateId: number; data: AdminEstimateUpdateRequest }
  >({
    mutationFn: async ({ estimateId, data }) => {
      if (!canManageEstimates()) {
        throw new Error('권한이 없습니다.');
      }

      const response = await fetch(
        `${ADMIN_API_BASE}/estimates/${estimateId}`,
        {
          method: 'POST', // API uses POST for updates
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Id': user?.id.toString() || '',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: 견적 수정에 실패했습니다.`);
      }

      const result: AdminApiResponse<{ id: number }> = await response.json();
      
      // Return the updated estimate (refetch it)
      const updatedResponse = await fetch(
        `${ADMIN_API_BASE}/estimates/${estimateId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Id': user?.id.toString() || '',
          },
        }
      );

      const updatedData: AdminApiResponse<AdminEstimate> = await updatedResponse.json();
      return updatedData.data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch estimates
      queryClient.invalidateQueries({ queryKey: ['admin-estimates'] });
      queryClient.invalidateQueries({ queryKey: ['admin-estimate', data.id] });
    },
  });

  // Update estimate status
  const updateEstimateStatus = useCallback(async (estimateId: number, status: number) => {
    if (!user) {
      console.error('No user available for status update');
      return false;
    }

    try {
      await updateEstimateMutation.mutateAsync({
        estimateId,
        data: { status },
      });
      return true;
    } catch (error) {
      console.error('Status update failed:', error);
      return false;
    }
  }, [updateEstimateMutation, user]);

  // Refresh estimates
  const refreshEstimates = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['admin-estimates'] });
  }, [queryClient]);

  // Statistics
  const estimateStats = useMemo(() => {
    if (!estimatesQuery.data) {
      return {
        total: 0,
        waiting: 0,
        running: 0,
        completed: 0,
        canceled: 0,
      };
    }

    const stats = {
      total: estimatesQuery.data.length,
      waiting: 0,
      running: 0,
      completed: 0,
      canceled: 0,
    };

    estimatesQuery.data.forEach((estimate) => {
      switch (estimate.status) {
        case ESTIMATE_STATUS.WAITING:
          stats.waiting++;
          break;
        case ESTIMATE_STATUS.RUNNING:
          stats.running++;
          break;
        case ESTIMATE_STATUS.COMPLETED:
          stats.completed++;
          break;
        case ESTIMATE_STATUS.CANCELED:
          stats.canceled++;
          break;
      }
    });

    return stats;
  }, [estimatesQuery.data]);

  return {
    // Data
    estimates: estimatesQuery.data || [],
    filteredEstimates,
    estimateStats,
    
    // Queries
    estimatesQuery,
    useEstimatesByStatus,
    useEstimate,
    
    // Mutations
    updateEstimate: updateEstimateMutation.mutateAsync,
    updateEstimateStatus,
    
    // States
    isLoading: estimatesQuery.isLoading,
    isError: estimatesQuery.isError,
    error: estimatesQuery.error,
    isUpdating: updateEstimateMutation.isPending,
    updateError: updateEstimateMutation.error,
    
    // Actions
    refreshEstimates,
    
    // Filters
    estimateFilter,
    setEstimateFilter: useAdminStore.getState().setEstimateFilter,
    updateEstimateFilter: useAdminStore.getState().updateEstimateFilter,
  };
};