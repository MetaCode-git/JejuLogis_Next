import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 기본 캐시 시간: 5분
      staleTime: 5 * 60 * 1000,
      // 백그라운드에서 데이터 새로고침 비활성화
      refetchOnWindowFocus: false,
      // 에러 재시도 설정
      retry: (failureCount, error: any) => {
        // 4xx 에러는 재시도하지 않음
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // 최대 3회까지 재시도
        return failureCount < 3;
      },
      // 재시도 간격 (exponential backoff)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // 뮤테이션 에러 재시도 설정
      retry: (failureCount, error: any) => {
        // 클라이언트 에러는 재시도하지 않음
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // 네트워크 에러나 서버 에러만 1회 재시도
        return failureCount < 1;
      },
    },
  },
});