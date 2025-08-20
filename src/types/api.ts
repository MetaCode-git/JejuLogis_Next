// API 관련 타입 정의 - 서버 API에 맞춰 수정

// 차량 관련 타입 - 서버 응답 구조에 맞춤
export interface Vehicle {
  id: number;
  type: string;        // "국산차", "수입차"
  maker: string;       // 제조사 (예: "현대")
  name: string;        // 차량명 (예: "그랜저")
  priceNormal: number; // 일반 가격
  priceExtra: number;  // 추가 가격
  createdAt?: string;
  updatedAt?: string;
}

// 기존 인터페이스와의 호환성을 위한 helper 함수들
export function getVehicleManufacturer(vehicle: Vehicle): string {
  return vehicle.maker;
}

export function getVehicleModel(vehicle: Vehicle): string {
  return vehicle.name;
}

// 차량 목록 응답 (GET /car-list/total)
export interface CarListResponse {
  [category: string]: Array<{
    [manufacturer: string]: string[];
  }>;
}

// 차량 검색 응답 (GET /car-list/search)
export interface CarSearchResponse {
  vehicles: Vehicle[];
  total?: number;
}

// 견적 관련 타입
export interface EstimateRequest {
  vehicle_id?: number;
  departure_address: string;
  departure_latitude?: number;
  departure_longitude?: number;
  arrival_address: string;
  arrival_latitude?: number;
  arrival_longitude?: number;
  transport_date?: string;
  additional_options?: string[];
}

// 견적 계산 응답 (GET /estimates/calculate)
export interface EstimateResponse {
  id: string;
  base_price: number;
  additional_fees: number;
  total_price: number;
  distance: number;
  estimated_duration: string;
  transport_date: string;
  vehicle_info: Vehicle;
  departure_info: AddressInfo;
  arrival_info: AddressInfo;
  created_at: string;
  updated_at?: string;
  status?: string;
}

// 견적 저장 요청 (POST /estimates/save)
export interface EstimateSaveRequest {
  departure_address: string;
  arrival_address: string;
  vehicle_name: string;
  transport_date: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  base_price: number;
  total_price: number;
  additional_notes?: string;
}

// 견적 필터 요청 (POST /estimates/filtered)
export interface EstimateFilterRequest {
  company?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
  vehicle_type?: string;
  min_price?: number;
  max_price?: number;
}

// 주소 관련 타입
export interface AddressInfo {
  address: string;
  latitude?: number;
  longitude?: number;
  postal_code?: string;
  detail_address?: string;
}

export interface AddressSearchResult {
  address: string;
  road_address: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  building_name?: string;
}

// API 응답 기본 구조
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// 에러 타입
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// 간단한 견적 응답 타입 (실제 서버 응답)
export interface SimpleEstimateResponse {
  cost: number;
}

// 견적 목록 응답 타입
export type EstimateListResponse = EstimateResponse[];

// 필터링된 견적 응답 타입
export type FilteredEstimateResponse = EstimateResponse[];