export interface AdminLoginRequest {
  loginId: string;
  password: string; // Base64 encoded
}

export interface AdminLoginResponse {
  id: number;
  loginId: string;
  name: string;
  role: AdminRole;
  message: string;
}

export interface AdminUser {
  id: number;
  loginId: string;
  name: string;
  role: AdminRole;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum AdminRole {
  SUPER_ADMIN = 0, // 최고관리자 - 모든 권한
  ADMIN = 1        // 관리자 - 조회 권한
}

export interface AdminState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  isAutoLogin: boolean;
  accessToken?: string;
  refreshToken?: string;
}

export interface AdminActions {
  login: (loginId: string, password: string, autoLogin?: boolean) => Promise<boolean>;
  logout: () => void;
  setAutoLogin: (autoLogin: boolean) => void;
  checkAuthStatus: () => boolean;
  refreshAuth: () => Promise<boolean>;
}

export interface EstimateStatus {
  WAITING: 0;    // 탁송대기
  RUNNING: 1;    // �송중
  COMPLETED: 2;  // 탁송완료
  CANCELED: 3;   // 탁송취소
}

export const ESTIMATE_STATUS = {
  WAITING: 0,    // 탁송대기
  RUNNING: 1,    // 탁송중
  COMPLETED: 2,  // 탁송완료
  CANCELED: 3,   // 탁송취소
} as const;

export const ESTIMATE_STATUS_LABELS = {
  [ESTIMATE_STATUS.WAITING]: '탁송대기',
  [ESTIMATE_STATUS.RUNNING]: '탁송중',
  [ESTIMATE_STATUS.COMPLETED]: '탁송완료',
  [ESTIMATE_STATUS.CANCELED]: '탁송취소',
} as const;

export interface EstimateFilter {
  showWaiting: boolean;
  showRunning: boolean;
  showCompleted: boolean;
  showCanceled: boolean;
}

export interface AdminEstimate {
  id: number;
  companyKey: string;
  departure: string;
  arrival: string;
  carName: string;
  carNumber?: string;
  transportDate: string;
  cost: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  memo?: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminEstimateListParams {
  companyKey?: string;
  status?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface AdminEstimateUpdateRequest {
  companyKey?: string;
  departure?: string;
  arrival?: string;
  carName?: string;
  carNumber?: string;
  transportDate?: string;
  cost?: number;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  memo?: string;
  status?: number;
}

export interface AdminApiError {
  timestamp: string;
  status: string;
  code: string;
  message: string;
}

export interface AdminApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

// 기존 Flutter 애플리케이션과의 호환성을 위한 타입
export interface LegacyAdminCredentials {
  key: string;      // 'JEJULOGIS' 또는 'ADMIN'
  password: string; // 'wpwn0011@'
  phone: string;    // '010-2325-0866'
}

export const DEFAULT_ADMIN_CREDENTIALS: LegacyAdminCredentials = {
  key: 'JEJULOGIS',
  password: 'wpwn0011@',
  phone: '010-2325-0866'
};