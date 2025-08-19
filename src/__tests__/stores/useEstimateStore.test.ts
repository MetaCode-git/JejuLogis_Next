import { renderHook, act } from '@testing-library/react';
import { useEstimateStore, type VehicleInfo, type TransportInfo, type CustomerInfo } from '@/stores/useEstimateStore';

// 테스트 데이터
const mockVehicleInfo: VehicleInfo = {
  category: 'midsize',
  categoryName: '중형차',
  customModel: '현대 아반떼 2023년형',
  basePrice: 120000,
};

const mockTransportInfo: TransportInfo = {
  departureAddress: '제주특별자치도 제주시 연동 123-45',
  arrivalAddress: '제주특별자치도 서귀포시 중문동 67-89',
  transportDate: new Date('2024-03-15'),
  distance: 45,
  estimatedDuration: '2-3시간',
};

const mockCustomerInfo: CustomerInfo = {
  name: '테스트 고객',
  phone: '010-1234-5678',
  email: 'test@example.com',
  specialRequests: '조심히 운송해 주세요',
};

describe('useEstimateStore', () => {
  beforeEach(() => {
    // 각 테스트 전에 스토어 초기화
    const { result } = renderHook(() => useEstimateStore());
    act(() => {
      result.current.resetEstimate();
    });
  });

  it('초기 상태가 올바르게 설정된다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    expect(result.current.currentStep).toBe(0);
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.vehicleInfo).toBe(null);
    expect(result.current.transportInfo).toBe(null);
    expect(result.current.customerInfo).toBe(null);
    expect(result.current.estimateResult).toBe(null);
  });

  it('currentStep이 정상적으로 변경된다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    act(() => {
      result.current.setCurrentStep(2);
    });
    
    expect(result.current.currentStep).toBe(2);
  });

  it('vehicleInfo가 정상적으로 설정된다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    act(() => {
      result.current.setVehicleInfo(mockVehicleInfo);
    });
    
    expect(result.current.vehicleInfo).toEqual(mockVehicleInfo);
  });

  it('transportInfo가 정상적으로 설정된다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    act(() => {
      result.current.setTransportInfo(mockTransportInfo);
    });
    
    expect(result.current.transportInfo).toEqual(mockTransportInfo);
  });

  it('customerInfo가 정상적으로 설정된다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    act(() => {
      result.current.setCustomerInfo(mockCustomerInfo);
    });
    
    expect(result.current.customerInfo).toEqual(mockCustomerInfo);
  });

  it('nextStep이 정상적으로 작동한다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    // 초기 단계: 0
    expect(result.current.currentStep).toBe(0);
    
    act(() => {
      result.current.nextStep();
    });
    
    expect(result.current.currentStep).toBe(1);
    
    // 최대 단계를 넘지 않는지 확인
    act(() => {
      result.current.setCurrentStep(3); // 마지막 단계로 설정
      result.current.nextStep();
    });
    
    expect(result.current.currentStep).toBe(3); // 그대로 유지
  });

  it('previousStep이 정상적으로 작동한다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    act(() => {
      result.current.setCurrentStep(2);
    });
    
    expect(result.current.currentStep).toBe(2);
    
    act(() => {
      result.current.previousStep();
    });
    
    expect(result.current.currentStep).toBe(1);
    
    // 0보다 작아지지 않는지 확인
    act(() => {
      result.current.setCurrentStep(0);
      result.current.previousStep();
    });
    
    expect(result.current.currentStep).toBe(0);
  });

  it('getTotalSteps가 올바른 값을 반환한다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    expect(result.current.getTotalSteps()).toBe(4);
  });

  it('getProgressPercentage가 올바르게 계산된다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    // 0단계 = 0%
    expect(result.current.getProgressPercentage()).toBe(0);
    
    act(() => {
      result.current.setCurrentStep(1);
    });
    
    // 1단계 = 33%
    expect(result.current.getProgressPercentage()).toBe(33);
    
    act(() => {
      result.current.setCurrentStep(3);
    });
    
    // 3단계 = 100%
    expect(result.current.getProgressPercentage()).toBe(100);
  });

  it('isStepValid가 올바르게 검증한다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    // 초기 상태에서는 모든 단계가 유효하지 않음
    expect(result.current.isStepValid(0)).toBe(false);
    expect(result.current.isStepValid(1)).toBe(false);
    expect(result.current.isStepValid(2)).toBe(false);
    
    // 차량 정보 설정 후 0단계 유효
    act(() => {
      result.current.setVehicleInfo(mockVehicleInfo);
    });
    
    expect(result.current.isStepValid(0)).toBe(true);
    expect(result.current.isStepValid(1)).toBe(false);
    
    // 운송 정보 설정 후 1단계 유효
    act(() => {
      result.current.setTransportInfo(mockTransportInfo);
    });
    
    expect(result.current.isStepValid(1)).toBe(true);
    expect(result.current.isStepValid(2)).toBe(false);
    
    // 고객 정보 설정 후 2단계 유효
    act(() => {
      result.current.setCustomerInfo(mockCustomerInfo);
    });
    
    expect(result.current.isStepValid(2)).toBe(true);
  });

  it('canProceedToNext가 올바르게 판단한다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    // 초기 상태에서는 진행 불가
    expect(result.current.canProceedToNext()).toBe(false);
    
    // 차량 정보 설정 후 진행 가능
    act(() => {
      result.current.setVehicleInfo(mockVehicleInfo);
    });
    
    expect(result.current.canProceedToNext()).toBe(true);
    
    // 마지막 단계에서는 진행 불가
    act(() => {
      result.current.setCurrentStep(3);
    });
    
    expect(result.current.canProceedToNext()).toBe(false);
  });

  it('resetEstimate이 모든 상태를 초기화한다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    // 모든 정보 설정
    act(() => {
      result.current.setCurrentStep(2);
      result.current.setVehicleInfo(mockVehicleInfo);
      result.current.setTransportInfo(mockTransportInfo);
      result.current.setCustomerInfo(mockCustomerInfo);
    });
    
    // 리셋 실행
    act(() => {
      result.current.resetEstimate();
    });
    
    // 초기 상태로 돌아갔는지 확인
    expect(result.current.currentStep).toBe(0);
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.vehicleInfo).toBe(null);
    expect(result.current.transportInfo).toBe(null);
    expect(result.current.customerInfo).toBe(null);
    expect(result.current.estimateResult).toBe(null);
  });

  it('estimateResult 설정시 완료 상태가 변경된다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    const mockEstimateResult = {
      id: 'EST-2024-TEST-001',
      basePrice: 120000,
      totalPrice: 135000,
      additionalFees: [],
      discounts: [],
      createdAt: new Date().toISOString(),
      validUntil: new Date().toISOString(),
    };
    
    act(() => {
      result.current.setEstimateResult(mockEstimateResult);
    });
    
    expect(result.current.estimateResult).toEqual(mockEstimateResult);
    expect(result.current.isCompleted).toBe(true);
  });

  it('운송 정보 유효성 검증이 정확하다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    // 부분적으로 설정된 운송 정보
    const incompleteTransportInfo: TransportInfo = {
      departureAddress: '제주특별자치도 제주시 연동 123-45',
      arrivalAddress: '', // 빈 값
      transportDate: null, // null
    };
    
    act(() => {
      result.current.setTransportInfo(incompleteTransportInfo);
    });
    
    expect(result.current.isStepValid(1)).toBe(false);
  });

  it('고객 정보 유효성 검증이 정확하다', () => {
    const { result } = renderHook(() => useEstimateStore());
    
    // 부분적으로 설정된 고객 정보
    const incompleteCustomerInfo: CustomerInfo = {
      name: '', // 빈 이름
      phone: '010-1234-5678',
      email: 'test@example.com',
    };
    
    act(() => {
      result.current.setCustomerInfo(incompleteCustomerInfo);
    });
    
    expect(result.current.isStepValid(2)).toBe(false);
  });
});