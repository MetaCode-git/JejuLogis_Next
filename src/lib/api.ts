// API 기본 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// API 에러 타입
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API 응답 타입
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// API 요청 설정
interface RequestConfig extends RequestInit {
  timeout?: number;
}

// API 클라이언트
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { timeout = 10000, ...fetchConfig } = config;

    // 기본 헤더 설정
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // AbortController로 타임아웃 구현
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...fetchConfig,
        headers: {
          ...defaultHeaders,
          ...fetchConfig.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // HTTP 에러 처리
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // JSON 파싱 실패 시 기본 메시지 사용
        }

        throw new ApiError(errorMessage, response.status, response.statusText);
      }

      // 응답이 비어있는 경우 처리
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return {
          data: null as T,
          success: true,
        };
      }
    } catch (error) {
      clearTimeout(timeoutId);

      // AbortError (타임아웃)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('요청 시간이 초과되었습니다', 408, 'Request Timeout');
      }

      // 네트워크 에러
      if (error instanceof Error && !navigator.onLine) {
        throw new ApiError('네트워크 연결을 확인해주세요', 0, 'Network Error');
      }

      // 기타 에러
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다',
        0,
        'Unknown Error'
      );
    }
  }

  // GET 요청
  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  // POST 요청
  async post<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT 요청
  async put<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PATCH 요청
  async patch<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE 요청
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

// 기본 API 클라이언트 인스턴스
export const api = new ApiClient();

// API 엔드포인트 상수들
export const API_ENDPOINTS = {
  // 견적 관련
  estimates: '/estimates',
  estimateById: (id: string) => `/estimates/${id}`,
  submitEstimate: '/estimates/submit',
  
  // 차량 관련
  vehicles: '/vehicles',
  vehicleCategories: '/vehicles/categories',
  
  // 고객 관련
  customers: '/customers',
  
  // 회사 설정
  companyConfig: '/config/company',
  
  // 주소 검색
  addressSearch: '/address/search',
  
  // 파일 업로드
  upload: '/upload',
} as const;