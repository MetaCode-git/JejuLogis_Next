import { api, API_ENDPOINTS } from './api';
import type { Vehicle, VehicleSearchResponse, EstimateRequest, EstimateResponse, SimpleEstimateResponse, AddressSearchResult, EstimateSaveRequest, EstimateSaveResponse } from '@/types/api';

// 제주탁송 실제 API 서비스 - 정확한 엔드포인트
export class JejuLogisApiService {
  /**
   * 전체 차량 목록 조회
   * API: GET /car-list/total
   */
  async getCarList(): Promise<Vehicle[]> {
    try {
      const response = await api.get<Vehicle[]>(API_ENDPOINTS.carListTotal);
      return response.data || [];
    } catch (error) {
      console.error('차량 목록 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 차량 검색
   * API: GET /car-list/search?text=검색어
   * @param query 검색 키워드
   */
  async findCar(query: string): Promise<Vehicle[]> {
    if (!query || query.trim().length < 1) {
      return [];
    }

    try {
      const response = await api.get<Vehicle[]>(API_ENDPOINTS.carListSearch(query.trim()));
      console.log('🔍 차량 검색 API 응답:', {
        query: query.trim(),
        response: response,
        data: response.data,
        dataType: typeof response.data,
        dataLength: Array.isArray(response.data) ? response.data.length : 'not array'
      });
      
      // 서버가 직접 배열을 반환하는 경우와 {data: []} 형식을 모두 처리
      let vehicles: Vehicle[];
      
      if (Array.isArray(response)) {
        // 서버가 직접 배열을 반환하는 경우
        console.log('🔍 서버가 직접 배열 반환:', response);
        vehicles = response;
      } else if (response.data && Array.isArray(response.data)) {
        // {data: []} 형식인 경우
        console.log('🔍 응답이 data 래퍼 형식:', response.data);
        vehicles = response.data;
      } else if (Array.isArray(response.data)) {
        vehicles = response.data;
      } else {
        console.log('🔍 예상하지 못한 응답 형식, 빈 배열 반환');
        vehicles = [];
      }
      
      console.log('🔍 최종 차량 목록:', vehicles);
      return vehicles;
    } catch (error) {
      console.error('차량 검색 실패:', error);
      throw error;
    }
  }

  /**
   * 견적 계산
   * API: GET /estimates/calculate?dep={출발지}&arr={도착지}&name={차량명}&date={날짜}
   * @param estimateData 견적 요청 데이터
   * @param vehicleName 선택된 차량명 (예: "소나타", "G70")
   */
  async calculateEstimate(estimateData: EstimateRequest, vehicleName: string): Promise<SimpleEstimateResponse> {
    try {
      const date = estimateData.transport_date || new Date().toISOString().split('T')[0];
      const endpoint = API_ENDPOINTS.estimatesCalculate(
        estimateData.departure_address,
        estimateData.arrival_address,
        vehicleName,
        date
      );

      const response = await api.get<SimpleEstimateResponse>(endpoint);
      console.log('🔍 견적 계산 API 응답:', {
        endpoint,
        response: response,
        data: response.data,
        cost: response.data?.cost || response.cost
      });

      // 서버가 직접 {cost: number} 형태로 응답하는 경우와 {data: {cost: number}} 형태 모두 처리
      const cost = response.data?.cost || response.cost;
      return { cost: cost || 0 };
    } catch (error) {
      console.error('견적 계산 실패:', error);
      throw error;
    }
  }

  /**
   * 견적 저장 (탁송 신청)
   * API: POST /estimates/save
   * @param estimateData 저장할 견적 데이터
   */
  async saveEstimate(estimateData: EstimateSaveRequest): Promise<EstimateSaveResponse> {
    try {
      console.log('🔍 견적 저장 API 요청:', {
        endpoint: API_ENDPOINTS.estimatesSave,
        data: estimateData
      });

      const response = await api.post<EstimateSaveResponse>(API_ENDPOINTS.estimatesSave, estimateData);
      
      console.log('🔍 견적 저장 API 응답:', {
        response: response,
        data: response.data
      });

      // 서버가 직접 응답을 반환하는 경우와 {data: ...} 형태 모두 처리
      const result = response.data || response;
      return result;
    } catch (error) {
      console.error('견적 저장 실패:', error);
      throw error;
    }
  }

  /**
   * 전체 견적 목록 조회
   * API: GET /estimates
   */
  async getEstimateList(): Promise<EstimateResponse[]> {
    try {
      const response = await api.get<EstimateResponse[]>(API_ENDPOINTS.estimates);
      return response.data || [];
    } catch (error) {
      console.error('견적 목록 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 회사별 필터링된 견적 목록 조회
   * API: POST /estimates/filtered
   * @param filters 필터링 조건
   */
  async getFilteredEstimateList(filters: any): Promise<EstimateResponse[]> {
    try {
      const response = await api.post<EstimateResponse[]>(API_ENDPOINTS.estimatesFiltered, filters);
      return response.data || [];
    } catch (error) {
      console.error('필터링된 견적 목록 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 견적 수정
   * API: PATCH /estimates
   * @param estimateData 수정할 견적 데이터
   */
  async updateEstimate(estimateData: any): Promise<any> {
    try {
      const response = await api.patch<any>(API_ENDPOINTS.estimates, estimateData);
      return response.data;
    } catch (error) {
      console.error('견적 수정 실패:', error);
      throw error;
    }
  }

}

// 싱글톤 인스턴스
export const jejuLogisApi = new JejuLogisApiService();