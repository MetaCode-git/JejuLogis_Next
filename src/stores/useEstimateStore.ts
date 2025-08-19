import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 견적 관련 타입 정의
export interface VehicleInfo {
  category: string;
  categoryName?: string;
  customModel?: string;
  basePrice: number;
}

export interface TransportInfo {
  departureAddress: string;
  arrivalAddress: string;
  transportDate: Date | null;
  distance?: number;
  estimatedDuration?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  specialRequests?: string;
}

export interface EstimateResult {
  id: string;
  basePrice: number;
  totalPrice: number;
  additionalFees: Array<{
    name: string;
    amount: number;
    description: string;
  }>;
  discounts: Array<{
    name: string;
    amount: number;
    description: string;
  }>;
  createdAt: string;
  validUntil: string;
}

export interface EstimateState {
  // 견적 진행 상태
  currentStep: number;
  isCompleted: boolean;
  
  // 견적 데이터
  vehicleInfo: VehicleInfo | null;
  transportInfo: TransportInfo | null;
  customerInfo: CustomerInfo | null;
  estimateResult: EstimateResult | null;
  
  // 액션들
  setCurrentStep: (step: number) => void;
  setVehicleInfo: (info: VehicleInfo) => void;
  setTransportInfo: (info: TransportInfo) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  setEstimateResult: (result: EstimateResult) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetEstimate: () => void;
  
  // 계산된 값들
  getTotalSteps: () => number;
  getProgressPercentage: () => number;
  isStepValid: (step: number) => boolean;
  canProceedToNext: () => boolean;
}

const initialState = {
  currentStep: 0,
  isCompleted: false,
  vehicleInfo: null,
  transportInfo: null,
  customerInfo: null,
  estimateResult: null,
};

export const useEstimateStore = create<EstimateState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // 기본 액션들
      setCurrentStep: (step) => set({ currentStep: step }),
      
      setVehicleInfo: (info) => set({ vehicleInfo: info }),
      
      setTransportInfo: (info) => set({ transportInfo: info }),
      
      setCustomerInfo: (info) => set({ customerInfo: info }),
      
      setEstimateResult: (result) => set({ 
        estimateResult: result,
        isCompleted: true 
      }),
      
      nextStep: () => set((state) => ({ 
        currentStep: Math.min(state.currentStep + 1, get().getTotalSteps() - 1)
      })),
      
      previousStep: () => set((state) => ({ 
        currentStep: Math.max(state.currentStep - 1, 0)
      })),
      
      resetEstimate: () => set(initialState),
      
      // 계산된 값들
      getTotalSteps: () => 4, // 차량선택, 운송정보, 고객정보, 완료
      
      getProgressPercentage: () => {
        const current = get().currentStep;
        const total = get().getTotalSteps();
        return Math.round((current / (total - 1)) * 100);
      },
      
      isStepValid: (step) => {
        const state = get();
        switch (step) {
          case 0: // 차량 선택
            return state.vehicleInfo !== null;
          case 1: // 운송 정보
            return state.transportInfo !== null && 
                   state.transportInfo.departureAddress !== '' &&
                   state.transportInfo.arrivalAddress !== '' &&
                   state.transportInfo.transportDate !== null;
          case 2: // 고객 정보
            return state.customerInfo !== null &&
                   state.customerInfo.name !== '' &&
                   state.customerInfo.phone !== '';
          case 3: // 완료
            return state.estimateResult !== null;
          default:
            return false;
        }
      },
      
      canProceedToNext: () => {
        const current = get().currentStep;
        return get().isStepValid(current) && current < get().getTotalSteps() - 1;
      }
    }),
    {
      name: 'estimate-store',
      storage: createJSONStorage(() => localStorage),
      // 민감한 정보는 저장하지 않도록 일부 필드만 저장
      partialize: (state) => ({
        currentStep: state.currentStep,
        vehicleInfo: state.vehicleInfo,
        transportInfo: {
          ...state.transportInfo,
          transportDate: state.transportInfo?.transportDate?.toISOString() || null
        },
        // customerInfo는 보안상 저장하지 않음
        estimateResult: state.estimateResult,
      }),
      // 저장된 데이터를 불러올 때 날짜 복원
      onRehydrateStorage: () => (state) => {
        if (state?.transportInfo?.transportDate) {
          state.transportInfo.transportDate = new Date(state.transportInfo.transportDate);
        }
      },
    }
  )
);