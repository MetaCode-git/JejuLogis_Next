import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jejuLogisApi } from '@/lib/jejulogis-api';
import { toast } from 'sonner';
import type { EstimateResult } from '@/stores/useEstimateStore';
import type { Vehicle, EstimateResponse } from '@/types/api';

// 견적 요청 데이터 타입
export interface EstimateRequest {
  vehicleCategory: string;
  vehicleModel?: string;
  departureAddress: string;
  arrivalAddress: string;
  transportDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  specialRequests?: string;
}

// 견적 목록 조회
export function useEstimates() {
  return useQuery({
    queryKey: ['estimates'],
    queryFn: async () => {
      return await jejuLogisApi.getEstimateList();
    },
    staleTime: 5 * 60 * 1000, // 5분간 신선하다고 간주
  });
}

// 차량 목록 조회
export function useCarList() {
  return useQuery({
    queryKey: ['carList'],
    queryFn: async () => {
      return await jejuLogisApi.getCarList();
    },
    staleTime: 30 * 60 * 1000, // 30분간 신선하다고 간주
  });
}

// 차량 검색
export function useCarSearch(query: string) {
  return useQuery({
    queryKey: ['carSearch', query],
    queryFn: async () => {
      if (!query || query.length < 1) return [];
      return await jejuLogisApi.findCar(query);
    },
    enabled: query.length >= 1,
    staleTime: 5 * 60 * 1000,
  });
}

// 견적 계산
export function useCalculateEstimate() {
  return useMutation({
    mutationFn: async ({ estimateData, vehicleName }: { estimateData: any, vehicleName: string }) => {
      return await jejuLogisApi.calculateEstimate(estimateData, vehicleName);
    },
    onError: (error: any) => {
      console.error('견적 계산 실패:', error);
      toast.error(error.message || '견적 계산 중 오류가 발생했습니다.');
    },
  });
}

// 견적 저장
export function useSaveEstimate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (estimateData: any) => {
      return await jejuLogisApi.saveEstimate(estimateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] });
      toast.success('견적이 저장되었습니다!');
    },
    onError: (error: any) => {
      console.error('견적 저장 실패:', error);
      toast.error(error.message || '견적 저장 중 오류가 발생했습니다.');
    },
  });
}

// 필터링된 견적 조회
export function useFilteredEstimates() {
  return useMutation({
    mutationFn: async (filters: any) => {
      return await jejuLogisApi.getFilteredEstimateList(filters);
    },
    onError: (error: any) => {
      console.error('필터링된 견적 조회 실패:', error);
      toast.error(error.message || '견적 조회 중 오류가 발생했습니다.');
    },
  });
}

// 견적 수정
export function useUpdateEstimate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (estimateData: any) => {
      return await jejuLogisApi.updateEstimate(estimateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] });
      toast.success('견적이 수정되었습니다!');
    },
    onError: (error: any) => {
      console.error('견적 수정 실패:', error);
      toast.error(error.message || '견적 수정 중 오류가 발생했습니다.');
    },
  });
}