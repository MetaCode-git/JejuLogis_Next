import { useCallback } from 'react';
import { toast } from 'sonner';
import { ApiError } from '@/lib/api';

interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  fallbackMessage?: string;
}

export function useErrorHandler() {
  const handleError = useCallback((
    error: unknown,
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showToast = true,
      logError = true,
      fallbackMessage = '알 수 없는 오류가 발생했습니다.'
    } = options;

    let errorMessage = fallbackMessage;
    let errorCode: number | undefined;

    // ApiError 처리
    if (error instanceof ApiError) {
      errorMessage = error.message;
      errorCode = error.status;
    }
    // 네트워크 에러
    else if (error instanceof Error && error.message === 'Failed to fetch') {
      errorMessage = '네트워크 연결을 확인해주세요.';
    }
    // 기타 Error 객체
    else if (error instanceof Error) {
      errorMessage = error.message;
    }
    // 문자열 에러
    else if (typeof error === 'string') {
      errorMessage = error;
    }

    // 콘솔에 에러 로그
    if (logError) {
      console.error('Error occurred:', error);
    }

    // 토스트 메시지 표시
    if (showToast) {
      // 에러 유형에 따른 토스트 타입 결정
      if (errorCode && errorCode >= 400 && errorCode < 500) {
        toast.warning(errorMessage);
      } else {
        toast.error(errorMessage);
      }
    }

    return {
      message: errorMessage,
      code: errorCode,
      isClientError: errorCode ? errorCode >= 400 && errorCode < 500 : false,
      isServerError: errorCode ? errorCode >= 500 : false,
      isNetworkError: !navigator.onLine || error instanceof Error && error.message === 'Failed to fetch'
    };
  }, []);

  // Query 에러 전용 핸들러
  const handleQueryError = useCallback((error: unknown) => {
    return handleError(error, {
      showToast: true,
      logError: true,
      fallbackMessage: '데이터를 불러오는 중 오류가 발생했습니다.'
    });
  }, [handleError]);

  // Mutation 에러 전용 핸들러
  const handleMutationError = useCallback((error: unknown) => {
    return handleError(error, {
      showToast: true,
      logError: true,
      fallbackMessage: '요청 처리 중 오류가 발생했습니다.'
    });
  }, [handleError]);

  // 폼 검증 에러 핸들러
  const handleFormError = useCallback((errors: Record<string, any>) => {
    const errorMessages = Object.values(errors)
      .flat()
      .filter(Boolean)
      .join(', ');

    if (errorMessages) {
      toast.error(`입력 오류: ${errorMessages}`);
    }

    return errorMessages;
  }, []);

  return {
    handleError,
    handleQueryError,
    handleMutationError,
    handleFormError,
  };
}

// React Query 에러 핸들링을 위한 유틸리티 훅
export function useQueryErrorHandler() {
  const { handleQueryError } = useErrorHandler();

  return useCallback((error: unknown) => {
    const result = handleQueryError(error);
    
    // 네트워크 에러인 경우 재시도 안내
    if (result.isNetworkError) {
      toast.info('네트워크 연결 후 자동으로 다시 시도됩니다.', {
        duration: 5000,
      });
    }

    return result;
  }, [handleQueryError]);
}

// 전역 에러 처리를 위한 훅
export function useGlobalErrorHandler() {
  const { handleError } = useErrorHandler();

  // 전역 에러 핸들러 설정
  const setupGlobalHandlers = useCallback(() => {
    // Unhandled Promise Rejection 처리
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      handleError(event.reason, {
        showToast: true,
        logError: true,
        fallbackMessage: '예상치 못한 오류가 발생했습니다.'
      });
      event.preventDefault();
    });

    // JavaScript 런타임 에러 처리
    window.addEventListener('error', (event) => {
      console.error('JavaScript error:', event.error);
      handleError(event.error, {
        showToast: true,
        logError: true,
        fallbackMessage: '스크립트 오류가 발생했습니다.'
      });
    });
  }, [handleError]);

  return { setupGlobalHandlers };
}