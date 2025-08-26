// API 기본 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

// 서버 시작시 API 설정 로그
console.log('🔧 API Configuration:');
console.log('  - NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
console.log('  - Final API_BASE_URL:', API_BASE_URL);
console.log('  - Environment:', process.env.NODE_ENV);
console.log('  - Is production:', process.env.NODE_ENV === 'production');
console.log('='.repeat(50));

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
      const fullUrl = `${this.baseURL}${endpoint}`;
      console.log('🚀 API Request:', {
        baseURL: this.baseURL,
        endpoint: endpoint,
        fullUrl: fullUrl
      });
      
      const response = await fetch(fullUrl, {
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

// API 엔드포인트 상수들 - 실제 서버 API에 맞춰 수정
export const API_ENDPOINTS = {
  // 차량 관련
  carListTotal: '/api/v0/car-list/total',  // 차량 목록 확인
  carListSearch: (text: string) => `/api/v0/car-list/search?text=${encodeURIComponent(text)}`,  // 차량 검색
  
  // 견적 관련
  estimates: '/api/v0/estimates',  // 견적 목록 확인 & 수정 결과 확인
  estimatesCalculate: (dep: string, arr: string, name: string, date: string) => `/api/v0/estimates/calculate?dep=${encodeURIComponent(dep)}&arr=${encodeURIComponent(arr)}&name=${encodeURIComponent(name)}&date=${date}`,  // 견적 계산
  estimatesSave: '/api/v0/estimates/save',  // 견적 저장
  estimatesFiltered: '/api/v0/estimates/filtered',  // 필터링된 견적 조회
  estimatesById: (id: number) => `/api/v0/estimates/${id}`,  // 개별 견적 조회
  estimatesUpdate: (id: number) => `/api/v0/estimates/${id}`,  // 견적 수정
  estimatesByStatus: (status: number) => `/api/v0/estimates/status/${status}`,  // 상태별 견적 조회
  
  // 관리자 관련
  adminLogin: '/api/v0/admin/login',  // 관리자 로그인
  adminList: '/api/v0/admin',  // 관리자 목록 조회
  adminCreate: '/api/v0/admin',  // 관리자 등록
  adminById: (id: number) => `/api/v0/admin/${id}`,  // 관리자 상세 조회
  adminUpdate: (id: number) => `/api/v0/admin/${id}`,  // 관리자 정보 수정
  adminDelete: (id: number) => `/api/v0/admin/${id}`,  // 관리자 삭제
  
  // 공휴일 관련
  holidayCheck: (date: string) => `/api/v0/holidays/check?date=${date}`,  // 특정 날짜 공휴일 확인
  holidayMonth: (year: number, month: number) => `/api/v0/holidays/month?year=${year}&month=${month}`,  // 월별 공휴일 조회
} as const;