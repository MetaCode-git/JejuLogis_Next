"use client"

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Car, Calculator, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { jejuLogisApi } from '@/lib/jejulogis-api';
import type { Vehicle, EstimateRequest, SimpleEstimateResponse } from '@/types/api';
// 주소 검색 API 타입
interface AddressResult {
  address: string;
  roadAddress: string;
  jibunAddress: string;
  zonecode: string;
  buildingName?: string;
}

// Next.js API Route를 통한 실제 주소 검색 함수
const searchKoreanAddress = async (query: string): Promise<AddressResult[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`/api/address-search?query=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      console.error('주소 검색 API 에러:', data.error);
      return [];
    }

    return data.results || [];
    
  } catch (error) {
    console.error('주소 검색 API 에러:', error);
    return [];
  }
};

// Portal을 사용한 Floating Dropdown 컴포넌트 (주소용)
const FloatingAddressDropdown = ({ 
  inputRef, 
  results, 
  isVisible, 
  onSelect, 
  searchQuery,
  isSearching 
}: {
  inputRef: React.RefObject<HTMLDivElement | null>;
  results: AddressResult[];
  isVisible: boolean;
  onSelect: (address: AddressResult) => void;
  searchQuery: string;
  isSearching: boolean;
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (inputRef.current && isVisible) {
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 10, // 입력 필드 위쪽에 10px 간격
        left: rect.left,
        width: rect.width
      });
    }
  }, [inputRef, isVisible]);

  if (!isVisible || typeof window === 'undefined') return null;

  const dropdownContent = (
    <div 
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto"
      style={{ 
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        maxHeight: '250px',
        transform: 'translateY(-100%)'
      }}
    >
      {results.length > 0 ? (
        <>
          <div className="p-2 text-xs text-gray-500 bg-gray-50 border-b">
            검색 결과 ({results.length}개)
          </div>
          {results.map((address, index) => (
            <button
              key={index}
              onClick={() => onSelect(address)}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="font-medium text-gray-900">
                {address.jibunAddress || address.address}
              </div>
              {address.jibunAddress && address.roadAddress && address.jibunAddress !== address.roadAddress && (
                <div className="text-sm text-gray-500">({address.roadAddress})</div>
              )}
              {address.buildingName && address.buildingName.trim() && (
                <div className="text-xs text-blue-600">{address.buildingName}</div>
              )}
              <div className="text-xs text-gray-400">우편번호: {address.zonecode}</div>
            </button>
          ))}
        </>
      ) : searchQuery.trim() && !isSearching ? (
        <div className="p-4 text-center text-gray-500 text-sm">
          &apos;{searchQuery}&apos;에 대한 검색 결과가 없습니다.
        </div>
      ) : null}
    </div>
  );

  return createPortal(dropdownContent, document.body);
};

// Portal을 사용한 Floating Dropdown 컴포넌트 (차량용)
const FloatingVehicleDropdown = ({ 
  inputRef, 
  results, 
  isVisible, 
  onSelect
}: {
  inputRef: React.RefObject<HTMLDivElement | null>;
  results: Vehicle[];
  isVisible: boolean;
  onSelect: (vehicle: Vehicle) => void;
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (inputRef.current && isVisible) {
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 10, // 입력 필드 위쪽에 10px 간격
        left: rect.left,
        width: rect.width
      });
    }
  }, [inputRef, isVisible]);

  if (!isVisible || typeof window === 'undefined' || results.length === 0) return null;

  const dropdownContent = (
    <div 
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto"
      style={{ 
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        maxHeight: '250px',
        transform: 'translateY(-100%)'
      }}
    >
      <div className="p-2 text-xs text-gray-500 bg-gray-50 border-b">
        검색 결과 ({results.length}개)
      </div>
      {results.map((vehicle) => (
        <button
          key={vehicle.id}
          onClick={() => onSelect(vehicle)}
          className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
        >
          <div className="font-medium text-gray-900">{vehicle.maker} {vehicle.name}</div>
          <div className="text-sm text-gray-500">{vehicle.type} • 일반: {vehicle.priceNormal.toLocaleString()}원</div>
        </button>
      ))}
    </div>
  );

  return createPortal(dropdownContent, document.body);
};

interface EstimateBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EstimateBottomSheet({ isOpen, onClose }: EstimateBottomSheetProps) {
  const router = useRouter();
  
  // 폼 상태
  const [vehicleQuery, setVehicleQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [departureAddress, setDepartureAddress] = useState('');
  const [arrivalAddress, setArrivalAddress] = useState('');

  // 검색 결과
  const [vehicleResults, setVehicleResults] = useState<Vehicle[]>([]);

  // 로딩 상태
  const [isSearchingVehicle, setIsSearchingVehicle] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // 견적 결과
  const [estimateResult, setEstimateResult] = useState<SimpleEstimateResponse | null>(null);

  // 주소 검색 상태
  const [addressSearchMode, setAddressSearchMode] = useState<'departure' | 'arrival' | null>(null);
  const [addressSearchQuery, setAddressSearchQuery] = useState('');
  const [addressResults, setAddressResults] = useState<AddressResult[]>([]);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);

  // Debounce refs
  const vehicleTimeoutRef = useRef<NodeJS.Timeout>();
  const addressTimeoutRef = useRef<NodeJS.Timeout>();
  
  // 입력 필드 ref들 (Portal 위치 계산용)
  const vehicleInputRef = useRef<HTMLDivElement>(null);
  const departureInputRef = useRef<HTMLDivElement>(null);
  const arrivalInputRef = useRef<HTMLDivElement>(null);

  // 견적 결과 변화 감지
  useEffect(() => {
    console.log('🎯 estimateResult 상태 변화:', {
      estimateResult,
      hasResult: !!estimateResult,
      cost: estimateResult?.cost,
      costType: typeof estimateResult?.cost
    });
  }, [estimateResult]);

  // 차량 검색 debounce
  useEffect(() => {
    if (vehicleTimeoutRef.current) {
      clearTimeout(vehicleTimeoutRef.current);
    }

    if (vehicleQuery.trim() && !selectedVehicle) {
      setIsSearchingVehicle(true);
      vehicleTimeoutRef.current = setTimeout(async () => {
        try {
          console.log('🔍 차량 검색 시작:', vehicleQuery);
          const results = await jejuLogisApi.findCar(vehicleQuery);
          console.log('🔍 차량 검색 결과:', {
            query: vehicleQuery,
            results: results,
            resultsLength: results.length
          });
          setVehicleResults(results);
        } catch (error) {
          console.error('차량 검색 에러:', error);
          setVehicleResults([]);
        } finally {
          setIsSearchingVehicle(false);
        }
      }, 300);
    } else if (!vehicleQuery.trim()) {
      setVehicleResults([]);
      setSelectedVehicle(null);
    }

    return () => {
      if (vehicleTimeoutRef.current) {
        clearTimeout(vehicleTimeoutRef.current);
      }
    };
  }, [vehicleQuery, selectedVehicle]);

  // 주소 검색 debounce
  useEffect(() => {
    if (addressTimeoutRef.current) {
      clearTimeout(addressTimeoutRef.current);
    }

    if (addressSearchQuery.trim() && addressSearchMode) {
      setIsSearchingAddress(true);
      addressTimeoutRef.current = setTimeout(async () => {
        try {
          console.log('🏠 주소 검색 시작:', addressSearchQuery);
          const results = await searchKoreanAddress(addressSearchQuery);
          console.log('🏠 주소 검색 결과:', results);
          setAddressResults(results);
        } catch (error) {
          console.error('주소 검색 에러:', error);
          setAddressResults([]);
        } finally {
          setIsSearchingAddress(false);
        }
      }, 300);
    } else if (!addressSearchQuery.trim()) {
      setAddressResults([]);
    }

    return () => {
      if (addressTimeoutRef.current) {
        clearTimeout(addressTimeoutRef.current);
      }
    };
  }, [addressSearchQuery, addressSearchMode]);

  // ESC 키로 주소 검색 모드 종료
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && addressSearchMode) {
        setAddressSearchMode(null);
        setAddressSearchQuery('');
        setAddressResults([]);
      }
    };

    if (addressSearchMode) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [addressSearchMode]);

  // 차량 선택
  const handleVehicleSelect = (vehicle: Vehicle) => {
    console.log('🚗 차량 선택:', vehicle);
    setSelectedVehicle(vehicle);
    setVehicleQuery(vehicle.name); // vehicle.name이 차량명
    setVehicleResults([]);
    console.log('🚗 차량 선택 완료, selectedVehicle 상태 업데이트됨');
  };

  // 주소 선택
  const handleAddressSelect = (address: AddressResult) => {
    console.log('🏠 주소 선택:', address);
    const selectedAddress = address.jibunAddress || address.address;
    
    if (addressSearchMode === 'departure') {
      setDepartureAddress(selectedAddress);
    } else if (addressSearchMode === 'arrival') {
      setArrivalAddress(selectedAddress);
    }
    
    // 검색 모드 종료
    setAddressSearchMode(null);
    setAddressSearchQuery('');
    setAddressResults([]);
    console.log('🏠 주소 선택 완료');
  };

  // 주소 검색 시작
  const handleAddressSearchStart = (mode: 'departure' | 'arrival') => {
    setAddressSearchMode(mode);
    setAddressSearchQuery('');
    setAddressResults([]);
  };

  // 견적 계산
  const handleCalculateEstimate = async () => {
    if (!selectedVehicle || !departureAddress.trim() || !arrivalAddress.trim()) {
      alert('차종, 출발지, 도착지를 모두 입력해주세요.');
      return;
    }

    setIsCalculating(true);
    try {
      const estimateData: EstimateRequest = {
        departure_address: departureAddress.trim(),
        arrival_address: arrivalAddress.trim(),
        transport_date: new Date().toISOString().split('T')[0],
      };

      const result = await jejuLogisApi.calculateEstimate(estimateData, selectedVehicle.name);
      console.log('💰 견적 계산 결과:', result);
      console.log('💰 결과 타입:', typeof result);
      console.log('💰 cost 값:', result.cost);
      console.log('💰 cost 타입:', typeof result.cost);
      setEstimateResult(result);
    } catch (error) {
      console.error('견적 계산 에러:', error);
      alert('견적 계산 중 오류가 발생했습니다.');
    } finally {
      setIsCalculating(false);
    }
  };

  // 폼 초기화
  const resetForm = () => {
    setVehicleQuery('');
    setSelectedVehicle(null);
    setDepartureAddress('');
    setArrivalAddress('');
    setVehicleResults([]);
    setEstimateResult(null);
    setIsNavigating(false);
    // 주소 검색 상태 초기화
    setAddressSearchMode(null);
    setAddressSearchQuery('');
    setAddressResults([]);
  };

  // 바텀시트 닫기
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      title="간편 견적 조회"
      maxHeight="85vh"
      className="pb-safe"
    >
      <div className="space-y-6 pt-4">
        {/* 견적 결과가 있으면 결과 표시 */}
        {estimateResult ? (
          <div className="space-y-6">
            {/* 성공 메시지 */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-green-600 font-medium mb-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  ✅
                </div>
                견적 계산 완료
              </div>
            </div>

            {/* 선택 정보 요약 */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                🚗 <span className="font-medium">{selectedVehicle?.maker} {selectedVehicle?.name}</span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  📍 <span className="font-medium text-green-600">출발지</span> <span>{departureAddress}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  🏁 <span className="font-medium text-red-600">도착지</span> <span>{arrivalAddress}</span>
                </div>
              </div>
            </div>

            {/* 탁송 비용 강조 */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center">
              <div className="text-lg font-medium mb-2">탁송 비용</div>
              <div className="text-3xl font-bold">
                ₩ {estimateResult?.cost ? estimateResult.cost.toLocaleString() : '0'}원
              </div>
              {/* 디버그 정보 */}
              <div className="text-xs mt-2 opacity-75">
                Debug: cost={estimateResult?.cost}, type={typeof estimateResult?.cost}
              </div>
            </div>

            {/* 추가 정보 */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center justify-center gap-2">
                  💡 <span>예상 배송: 1-2일</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  🛡️ <span>안전 보험 포함</span>
                </div>
              </div>
            </div>
            
            {/* 액션 버튼들 */}
            <div className="space-y-3">
              <Button 
                className="w-full h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700"
                disabled={isNavigating}
                onClick={async () => {
                  setIsNavigating(true);
                  
                  // 최소 250ms 대기 시간 보장
                  const [_, navigationResult] = await Promise.all([
                    new Promise(resolve => setTimeout(resolve, 250)),
                    (async () => {
                      // 탁송 신청 페이지로 이동
                      const vehicleInfo = selectedVehicle ? `${selectedVehicle.maker} ${selectedVehicle.name}` : '';
                      const params = new URLSearchParams({
                        vehicle: vehicleInfo,
                        departure: departureAddress,
                        arrival: arrivalAddress,
                        cost: estimateResult.cost.toString()
                      });
                      
                      return router.push(`/transport-apply?${params.toString()}`);
                    })()
                  ]);
                  
                  // 페이지 전환 완료 후 BottomSheet 닫기
                  onClose();
                  setIsNavigating(false);
                }}
              >
                탁송 신청하기
              </Button>
              
              <Button 
                onClick={resetForm} 
                variant="outline" 
                className="w-full"
              >
                다시 계산
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 차종 선택 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Car className="w-4 h-4" />
                차종 *
              </label>
              <div className="relative" ref={vehicleInputRef}>
                <Input
                  placeholder="차종을 입력하세요 (예: 소나타, 그랜저)"
                  value={vehicleQuery}
                  onChange={(e) => setVehicleQuery(e.target.value)}
                  className={selectedVehicle ? 'border-green-500 bg-green-50' : ''}
                />
                {isSearchingVehicle && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
                )}
              </div>
            </div>
            
            {/* 출발지 입력 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-500" />
                출발지 *
              </label>
              {addressSearchMode === 'departure' ? (
                <div className="relative" ref={departureInputRef}>
                  <Input
                    placeholder="출발지를 검색하세요..."
                    value={addressSearchQuery}
                    onChange={(e) => setAddressSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {isSearchingAddress && (
                    <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
                  )}
                </div>
              ) : (
                <div
                  ref={departureInputRef}
                  onClick={() => handleAddressSearchStart('departure')}
                  className="cursor-pointer"
                >
                  <Input
                    placeholder="출발지를 검색하세요 🔍"
                    value={departureAddress}
                    readOnly
                    className="cursor-pointer hover:border-green-500 transition-colors"
                  />
                </div>
              )}
            </div>

            {/* 도착지 입력 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                도착지 *
              </label>
              {addressSearchMode === 'arrival' ? (
                <div className="relative" ref={arrivalInputRef}>
                  <Input
                    placeholder="도착지를 검색하세요..."
                    value={addressSearchQuery}
                    onChange={(e) => setAddressSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {isSearchingAddress && (
                    <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
                  )}
                </div>
              ) : (
                <div
                  ref={arrivalInputRef}
                  onClick={() => handleAddressSearchStart('arrival')}
                  className="cursor-pointer"
                >
                  <Input
                    placeholder="도착지를 검색하세요 🔍"
                    value={arrivalAddress}
                    readOnly
                    className="cursor-pointer hover:border-red-500 transition-colors"
                  />
                </div>
              )}
            </div>

            {/* 빠른 테스트 버튼 */}
            <div className="pt-4">
              <Button 
                onClick={() => {
                  // 랜덤 데이터 설정
                  const testVehicles = ['벨로스터', '맥스크루즈', 'g70', 'k5', '아이오닉'];
                  const testDepartures = [
                    '경기도 화성시 산척동 699',
                    '경기도 용인시 기흥구 보정동 266-4',
                    '서울특별시 강남구 역삼동 823-22 성곡빌딩'
                  ];
                  const testArrivals = [
                    '제주특별자치도 제주시 한림읍 협재리 1791 협재교회',
                    '제주특별자치도 서귀포시 안덕면 서광리 산39 제주항공우주박물관'
                  ];
                  
                  const randomVehicle = testVehicles[Math.floor(Math.random() * testVehicles.length)];
                  const randomDeparture = testDepartures[Math.floor(Math.random() * testDepartures.length)];
                  const randomArrival = testArrivals[Math.floor(Math.random() * testArrivals.length)];
                  
                  // 차량 설정 (임시 객체 생성)
                  setSelectedVehicle({
                    id: '999',
                    name: randomVehicle,
                    maker: '',
                    type: 'test',
                    priceNormal: 0,
                    priceExpress: 0
                  });
                  setVehicleQuery(randomVehicle);
                  
                  // 주소 설정
                  setDepartureAddress(randomDeparture);
                  setArrivalAddress(randomArrival);
                }}
                variant="outline"
                className="w-full h-10 mb-3 text-sm"
              >
                🎲 빠른 테스트 (랜덤 데이터)
              </Button>
            </div>

            {/* 견적 계산 버튼 */}
            <div>
              <Button 
                onClick={handleCalculateEstimate}
                disabled={!selectedVehicle || !departureAddress.trim() || !arrivalAddress.trim() || isCalculating}
                className="w-full h-12"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    견적 계산 중...
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4 mr-2" />
                    견적 계산하기
                  </>
                )}
              </Button>
              
            </div>
          </div>
        )}
      </div>

      {/* Portal로 렌더링되는 차량 검색 Dropdown */}
      <FloatingVehicleDropdown
        inputRef={vehicleInputRef}
        results={vehicleResults}
        isVisible={vehicleResults.length > 0}
        onSelect={handleVehicleSelect}
      />

      {/* Portal로 렌더링되는 주소 검색 Dropdown */}
      <FloatingAddressDropdown
        inputRef={addressSearchMode === 'departure' ? departureInputRef : arrivalInputRef}
        results={addressResults}
        isVisible={!!addressSearchMode && (addressResults.length > 0 || (!!addressSearchQuery.trim() && !isSearchingAddress))}
        onSelect={handleAddressSelect}
        searchQuery={addressSearchQuery}
        isSearching={isSearchingAddress}
      />

      {/* 전체 화면 로딩 오버레이 */}
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] bg-black/30 flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-white" />
        </div>
      )}
    </BottomSheet>
  );
}