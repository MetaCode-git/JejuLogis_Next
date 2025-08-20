import { renderHook, waitFor } from '@testing-library/react';
import { 
  useEstimates, 
  useCarList, 
  useCarSearch, 
  useCalculateEstimate, 
  useSaveEstimate,
  useFilteredEstimates,
  useUpdateEstimate
} from '@/hooks/useEstimateAPI';
import { createWrapper, createTestEstimateData } from '@/test-utils';
import { server } from '@/test-mocks/server';
import { http, HttpResponse } from 'msw';

describe('useEstimateAPI', () => {
  describe('useEstimates', () => {
    it('견적 목록 조회가 성공적으로 동작한다', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useEstimates(), { wrapper });
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);
        expect(result.current.data?.length).toBeGreaterThan(0);
      });
    });

    it('견적 목록 조회 실패 시 에러를 처리한다', async () => {
      server.use(
        http.get('/api/estimates', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const wrapper = createWrapper();
      const { result } = renderHook(() => useEstimates(), { wrapper });
      
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });

  describe('useCarList', () => {
    it('차량 목록 조회가 성공적으로 동작한다', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useCarList(), { wrapper });
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toBeDefined();
        expect(result.current.data?.['국산차']).toBeDefined();
        expect(result.current.data?.['수입차']).toBeDefined();
      });
    });

    it('캐시가 올바르게 작동한다', async () => {
      const wrapper = createWrapper();
      const { result: result1 } = renderHook(() => useCarList(), { wrapper });
      
      await waitFor(() => {
        expect(result1.current.isLoading).toBe(false);
      });
      
      // 같은 쿼리를 다시 실행
      const { result: result2 } = renderHook(() => useCarList(), { wrapper });
      
      // 캐시된 데이터를 즉시 반환해야 함
      expect(result2.current.data).toBeDefined();
      expect(result2.current.isLoading).toBe(false);
    });
  });

  describe('useCarSearch', () => {
    it('차량 검색이 성공적으로 동작한다', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useCarSearch('소나타'), { wrapper });
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);
      });
    });

    it('빈 검색어일 때 쿼리가 실행되지 않는다', () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useCarSearch(''), { wrapper });
      
      expect(result.current.fetchStatus).toBe('idle');
    });
  });

  describe('useCalculateEstimate', () => {
    it('견적 계산이 성공적으로 동작한다', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useCalculateEstimate(), { wrapper });
      
      const estimateData = {
        departure_address: '서울특별시 강남구',
        arrival_address: '제주특별자치도 제주시',
        transport_date: '2024-01-15'
      };
      
      await waitFor(() => {
        result.current.mutate({ estimateData, vehicleName: '소나타' });
      });
      
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.data).toBeDefined();
        expect(result.current.data?.id).toBe('EST-CALC-001');
      });
    });

    it('견적 계산 실패 시 에러를 처리한다', async () => {
      server.use(
        http.get('/api/estimates/calculate', () => {
          return new HttpResponse(null, { status: 400 });
        })
      );

      const wrapper = createWrapper();
      const { result } = renderHook(() => useCalculateEstimate(), { wrapper });
      
      const estimateData = {
        departure_address: '서울특별시 강남구',
        arrival_address: '제주특별자치도 제주시',
        transport_date: '2024-01-15'
      };
      
      await waitFor(() => {
        result.current.mutate({ estimateData, vehicleName: '소나타' });
      });
      
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
        expect(result.current.error).toBeDefined();
      });
    });
  });

  describe('useSaveEstimate', () => {
    it('견적 저장이 성공적으로 동작한다', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useSaveEstimate(), { wrapper });
      
      const testData = createTestEstimateData();
      
      await waitFor(() => {
        result.current.mutate(testData);
      });
      
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.data).toBeDefined();
        expect(result.current.data?.id).toBe('EST-SAVE-001');
      });
    });

    it('견적 저장 실패 시 에러를 처리한다', async () => {
      server.use(
        http.post('/api/estimates/save', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const wrapper = createWrapper();
      const { result } = renderHook(() => useSaveEstimate(), { wrapper });
      
      const testData = createTestEstimateData();
      
      await waitFor(() => {
        result.current.mutate(testData);
      });
      
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
        expect(result.current.error).toBeDefined();
      });
    });
  });

  describe('useFilteredEstimates', () => {
    it('필터링된 견적 조회가 성공적으로 동작한다', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useFilteredEstimates(), { wrapper });
      
      const filters = { status: '확정', date_from: '2024-01-01' };
      
      await waitFor(() => {
        result.current.mutate(filters);
      });
      
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);
      });
    });
  });

  describe('useUpdateEstimate', () => {
    it('견적 수정이 성공적으로 동작한다', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useUpdateEstimate(), { wrapper });
      
      const updateData = { id: 'EST-001', total_price: 140000 };
      
      await waitFor(() => {
        result.current.mutate(updateData);
      });
      
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.data).toBeDefined();
        expect(result.current.data?.updated_at).toBeDefined();
      });
    });

    it('견적 수정 실패 시 에러를 처리한다', async () => {
      server.use(
        http.patch('/api/estimates', () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      const wrapper = createWrapper();
      const { result } = renderHook(() => useUpdateEstimate(), { wrapper });
      
      const updateData = { id: 'EST-001', total_price: 140000 };
      
      await waitFor(() => {
        result.current.mutate(updateData);
      });
      
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
        expect(result.current.error).toBeDefined();
      });
    });
  });

  describe('로딩 상태 관리', () => {
    it('mutation 로딩 상태가 올바르게 관리된다', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useSaveEstimate(), { wrapper });
      
      expect(result.current.isPending).toBe(false);
      
      const testData = createTestEstimateData();
      result.current.mutate(testData);
      
      expect(result.current.isPending).toBe(true);
      
      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });
    });

    it('query 로딩 상태가 올바르게 관리된다', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useEstimates(), { wrapper });
      
      expect(result.current.isLoading).toBe(true);
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isSuccess).toBe(true);
      });
    });
  });

  describe('에러 처리', () => {
    it('네트워크 오류 시 재시도한다', async () => {
      let callCount = 0;
      
      server.use(
        http.get('/api/car-list/total', () => {
          callCount++;
          if (callCount <= 2) {
            return HttpResponse.error();
          }
          return HttpResponse.json({
            success: true,
            data: { '국산차': [{ '현대': ['소나타'] }] }
          });
        })
      );

      const wrapper = createWrapper();
      const { result } = renderHook(() => useCarList(), { wrapper });
      
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(callCount).toBeGreaterThan(2);
      }, { timeout: 10000 });
    });

    it('클라이언트 에러(4xx)는 재시도하지 않는다', async () => {
      let callCount = 0;
      
      server.use(
        http.get('/api/estimates', () => {
          callCount++;
          return new HttpResponse(null, { status: 400 });
        })
      );

      const wrapper = createWrapper();
      const { result } = renderHook(() => useEstimates(), { wrapper });
      
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
      
      // 클라이언트 에러는 재시도하지 않으므로 callCount는 1이어야 함
      expect(callCount).toBe(1);
    });
  });
});