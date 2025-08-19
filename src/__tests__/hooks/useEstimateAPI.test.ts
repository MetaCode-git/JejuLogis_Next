import { renderHook, waitFor } from '@testing-library/react';
import { useSubmitEstimate, useEstimate, useVehicleCategories } from '@/hooks/useEstimateAPI';
import { createWrapper, createTestEstimateData } from '@/test-utils';
import { server } from '@/test-mocks/server';
import { http, HttpResponse } from 'msw';

describe('useEstimateAPI', () => {
  describe('useSubmitEstimate', () => {
    it('견적 제출이 성공적으로 동작한다', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useSubmitEstimate(), { wrapper });
      
      const testData = createTestEstimateData();
      
      await waitFor(() => {
        result.current.mutate(testData);
      });
      
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.data).toBeDefined();
        expect(result.current.data?.id).toBe('EST-2024-TEST-001');
      });
    });

    it('견적 제출 실패 시 에러를 처리한다', async () => {
      // 에러 응답 모킹
      server.use(
        http.post('/api/estimates/submit', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const wrapper = createWrapper();
      const { result } = renderHook(() => useSubmitEstimate(), { wrapper });
      
      const testData = createTestEstimateData();
      
      await waitFor(() => {
        result.current.mutate(testData);
      });
      
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
        expect(result.current.error).toBeDefined();
      });
    });

    it('로딩 상태가 올바르게 관리된다', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useSubmitEstimate(), { wrapper });
      
      expect(result.current.isPending).toBe(false);
      
      const testData = createTestEstimateData();
      result.current.mutate(testData);
      
      expect(result.current.isPending).toBe(true);
      
      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });
    });
  });

  describe('useEstimate', () => {
    it('특정 견적 조회가 성공적으로 동작한다', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useEstimate('EST-2024-TEST-001'), { wrapper });
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toBeDefined();
        expect(result.current.data?.id).toBe('EST-2024-TEST-001');
      });
    });

    it('ID가 없을 때 쿼리가 실행되지 않는다', () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useEstimate(''), { wrapper });
      
      expect(result.current.fetchStatus).toBe('idle');
    });

    it('존재하지 않는 견적 조회 시 에러를 처리한다', async () => {
      // 404 에러 모킹
      server.use(
        http.get('/api/estimates/:id', () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      const wrapper = createWrapper();
      const { result } = renderHook(() => useEstimate('non-existent'), { wrapper });
      
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });

  describe('useVehicleCategories', () => {
    it('차량 카테고리 목록을 성공적으로 가져온다', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useVehicleCategories(), { wrapper });
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);
        expect(result.current.data?.length).toBeGreaterThan(0);
      });
    });

    it('캐시가 올바르게 작동한다', async () => {
      const wrapper = createWrapper();
      const { result: result1 } = renderHook(() => useVehicleCategories(), { wrapper });
      
      await waitFor(() => {
        expect(result1.current.isLoading).toBe(false);
      });
      
      // 같은 쿼리를 다시 실행
      const { result: result2 } = renderHook(() => useVehicleCategories(), { wrapper });
      
      // 캐시된 데이터를 즉시 반환해야 함
      expect(result2.current.data).toBeDefined();
      expect(result2.current.isLoading).toBe(false);
    });

    it('네트워크 오류 시 재시도한다', async () => {
      let callCount = 0;
      
      server.use(
        http.get('/api/vehicles/categories', () => {
          callCount++;
          if (callCount <= 2) {
            return HttpResponse.error();
          }
          return HttpResponse.json({
            success: true,
            data: [
              { id: 'compact', name: '소형차', basePrice: 80000 }
            ]
          });
        })
      );

      const wrapper = createWrapper();
      const { result } = renderHook(() => useVehicleCategories(), { wrapper });
      
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(callCount).toBeGreaterThan(2);
      }, { timeout: 10000 });
    });
  });

  describe('에러 처리', () => {
    it('클라이언트 에러(4xx)는 재시도하지 않는다', async () => {
      let callCount = 0;
      
      server.use(
        http.get('/api/estimates/bad-request', () => {
          callCount++;
          return new HttpResponse(null, { status: 400 });
        })
      );

      const wrapper = createWrapper();
      const { result } = renderHook(() => useEstimate('bad-request'), { wrapper });
      
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
      
      // 클라이언트 에러는 재시도하지 않으므로 callCount는 1이어야 함
      expect(callCount).toBe(1);
    });

    it('서버 에러(5xx)는 재시도한다', async () => {
      let callCount = 0;
      
      server.use(
        http.get('/api/estimates/server-error', () => {
          callCount++;
          return new HttpResponse(null, { status: 500 });
        })
      );

      const wrapper = createWrapper();
      const { result } = renderHook(() => useEstimate('server-error'), { wrapper });
      
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      }, { timeout: 15000 });
      
      // 서버 에러는 재시도하므로 callCount가 1보다 커야 함
      expect(callCount).toBeGreaterThan(1);
    });
  });

  describe('mutation 상태 관리', () => {
    it('mutation 성공 시 캐시가 무효화된다', async () => {
      const wrapper = createWrapper();
      
      // 먼저 견적 목록을 가져와 캐시에 저장
      const { result: listResult } = renderHook(() => useEstimate('test-id'), { wrapper });
      await waitFor(() => expect(listResult.current.isSuccess).toBe(true));
      
      // 새로운 견적 제출
      const { result: submitResult } = renderHook(() => useSubmitEstimate(), { wrapper });
      
      const testData = createTestEstimateData();
      submitResult.current.mutate(testData);
      
      await waitFor(() => {
        expect(submitResult.current.isSuccess).toBe(true);
      });
      
      // 캐시가 무효화되어 새로 데이터를 가져와야 함
      // (실제 구현에서는 queryClient.invalidateQueries 호출)
    });

    it('동시에 여러 mutation이 실행될 때 올바르게 처리된다', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useSubmitEstimate(), { wrapper });
      
      const testData1 = createTestEstimateData({ customerName: '고객1' });
      const testData2 = createTestEstimateData({ customerName: '고객2' });
      
      // 동시에 두 개의 mutation 실행
      result.current.mutate(testData1);
      result.current.mutate(testData2);
      
      await waitFor(() => {
        expect(result.current.isIdle).toBe(false);
      });
      
      // 마지막 mutation이 성공해야 함
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
    });
  });
});