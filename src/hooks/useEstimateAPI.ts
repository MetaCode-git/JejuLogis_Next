import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, API_ENDPOINTS } from '@/lib/api';
import { toast } from 'sonner';
import type { EstimateResult } from '@/stores/useEstimateStore';

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
      const response = await api.get<EstimateResult[]>(API_ENDPOINTS.estimates);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5분간 신선하다고 간주
  });
}

// 특정 견적 조회
export function useEstimate(id: string) {
  return useQuery({
    queryKey: ['estimate', id],
    queryFn: async () => {
      const response = await api.get<EstimateResult>(API_ENDPOINTS.estimateById(id));
      return response.data;
    },
    enabled: !!id, // id가 있을 때만 실행
  });
}

// 견적 제출
export function useSubmitEstimate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (estimateData: EstimateRequest) => {
      const response = await api.post<EstimateResult>(
        API_ENDPOINTS.submitEstimate,
        estimateData
      );
      return response.data;
    },
    onSuccess: (data) => {
      // 성공 시 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['estimates'] });
      toast.success('견적 신청이 완료되었습니다!');
      return data;
    },
    onError: (error: any) => {
      console.error('견적 제출 실패:', error);
      toast.error(error.message || '견적 신청 중 오류가 발생했습니다.');
    },
  });
}

// 차량 카테고리 조회
export function useVehicleCategories() {
  return useQuery({
    queryKey: ['vehicleCategories'],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.vehicleCategories);
      return response.data;
    },
    staleTime: 30 * 60 * 1000, // 30분간 신선하다고 간주 (자주 변경되지 않음)
  });
}

// 주소 검색
export function useAddressSearch(query: string) {
  return useQuery({
    queryKey: ['addressSearch', query],
    queryFn: async () => {
      if (!query || query.length < 2) return [];
      
      const response = await api.get(`${API_ENDPOINTS.addressSearch}?q=${encodeURIComponent(query)}`);
      return response.data;
    },
    enabled: query.length >= 2, // 2글자 이상일 때만 검색
    staleTime: 10 * 60 * 1000, // 10분간 신선하다고 간주
  });
}

// 견적 취소
export function useCancelEstimate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (estimateId: string) => {
      const response = await api.delete(`${API_ENDPOINTS.estimates}/${estimateId}/cancel`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] });
      toast.success('견적이 취소되었습니다.');
    },
    onError: (error: any) => {
      console.error('견적 취소 실패:', error);
      toast.error(error.message || '견적 취소 중 오류가 발생했습니다.');
    },
  });
}

// 견적 확정
export function useConfirmEstimate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (estimateId: string) => {
      const response = await api.post(`${API_ENDPOINTS.estimates}/${estimateId}/confirm`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] });
      toast.success('견적이 확정되었습니다!');
      toast.info('담당자가 곧 연락드리겠습니다.');
    },
    onError: (error: any) => {
      console.error('견적 확정 실패:', error);
      toast.error(error.message || '견적 확정 중 오류가 발생했습니다.');
    },
  });
}