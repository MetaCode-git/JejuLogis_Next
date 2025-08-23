"use client"

import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Car, Calculator, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { jejuLogisApi } from '@/lib/jejulogis-api';
import type { Vehicle, EstimateRequest, SimpleEstimateResponse } from '@/types/api';

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

  // 견적 결과
  const [estimateResult, setEstimateResult] = useState<SimpleEstimateResponse | null>(null);

  // Debounce refs
  const vehicleTimeoutRef = useRef<NodeJS.Timeout>();

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

  // 차량 선택
  const handleVehicleSelect = (vehicle: Vehicle) => {
    console.log('🚗 차량 선택:', vehicle);
    setSelectedVehicle(vehicle);
    setVehicleQuery(vehicle.name); // vehicle.name이 차량명
    setVehicleResults([]);
    console.log('🚗 차량 선택 완료, selectedVehicle 상태 업데이트됨');
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
      title="견적 조회"
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
                onClick={() => {
                  // 탁송 신청 페이지로 이동
                  const vehicleInfo = selectedVehicle ? `${selectedVehicle.maker} ${selectedVehicle.name}` : '';
                  const params = new URLSearchParams({
                    vehicle: vehicleInfo,
                    departure: departureAddress,
                    arrival: arrivalAddress,
                    cost: estimateResult.cost.toString()
                  });
                  
                  router.push(`/transport-apply?${params.toString()}`);
                  onClose(); // BottomSheet 닫기
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
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Car className="w-4 h-4" />
                차종
              </label>
              <div className="relative">
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
              
              {/* 차량 검색 결과 - Floating Dropdown */}
              {vehicleResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto" style={{ maxHeight: '250px' }}>
                  <div className="p-2 text-xs text-gray-500 bg-gray-50 border-b">
                    검색 결과 ({vehicleResults.length}개)
                  </div>
                  {vehicleResults.map((vehicle) => (
                    <button
                      key={vehicle.id}
                      onClick={() => handleVehicleSelect(vehicle)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="font-medium text-gray-900">{vehicle.maker} {vehicle.name}</div>
                      <div className="text-sm text-gray-500">{vehicle.type} • 일반: {vehicle.priceNormal.toLocaleString()}원</div>
                    </button>
                  ))}
                </div>
              )}
              
              {/* 검색 결과가 없을 때 */}
              {vehicleQuery.trim() && !isSearchingVehicle && vehicleResults.length === 0 && !selectedVehicle && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="p-4 text-center text-gray-500 text-sm">
                    &apos;{vehicleQuery}&apos;에 대한 검색 결과가 없습니다.
                  </div>
                </div>
              )}
            </div>
            
            {/* 출발지 입력 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-500" />
                출발지
              </label>
              <Input
                placeholder="출발지를 입력하세요 (예: 서울특별시 강남구)"
                value={departureAddress}
                onChange={(e) => setDepartureAddress(e.target.value)}
              />
            </div>

            {/* 도착지 입력 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                도착지
              </label>
              <Input
                placeholder="도착지를 입력하세요 (예: 제주특별자치도 제주시)"
                value={arrivalAddress}
                onChange={(e) => setArrivalAddress(e.target.value)}
              />
            </div>

            {/* 선택 상태 디버그 정보 */}
            <div className="pt-2 text-xs text-gray-500 space-y-1">
              <div>차량 선택: {selectedVehicle ? '✅ 완료' : '❌ 미선택'}</div>
              <div>출발지 입력: {departureAddress.trim() ? '✅ 완료' : '❌ 미입력'}</div>
              <div>도착지 입력: {arrivalAddress.trim() ? '✅ 완료' : '❌ 미입력'}</div>
            </div>

            {/* 테스트용 주소 입력 버튼 */}
            <div className="pt-2">
              <Button 
                onClick={() => {
                  // 테스트 차량 목록
                  const testVehicles = ['그랜저', '아반테', '아이오닉'];
                  const randomVehicle = testVehicles[Math.floor(Math.random() * testVehicles.length)];
                  
                  // 차량 검색 및 선택
                  setVehicleQuery(randomVehicle);
                  
                  // 임시 차량 객체 생성 (실제 검색 결과와 유사한 형태)
                  const mockVehicle: Vehicle = {
                    id: Math.floor(Math.random() * 1000),
                    type: '국산차',
                    maker: '현대',
                    name: randomVehicle,
                    priceNormal: 150000,
                    priceExtra: 180000
                  };
                  setSelectedVehicle(mockVehicle);
                  
                  // 주소 입력
                  setDepartureAddress('경기도 용인시 기흥구 진산로 124');
                  setArrivalAddress('제주특별자치도 서귀포시 가가로 14');
                }}
                variant="outline"
                size="sm"
                className="w-full text-xs py-1 h-8 text-gray-600"
              >
                🚗📍 차종+주소 입력 (테스트용)
              </Button>
            </div>

            {/* 견적 계산 버튼 */}
            <div className="pt-4">
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
              
              {/* 버튼 비활성화 이유 표시 */}
              {(!selectedVehicle || !departureAddress.trim() || !arrivalAddress.trim()) && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  {!selectedVehicle && '차종을 선택하세요. '}
                  {!departureAddress.trim() && '출발지를 입력하세요. '}
                  {!arrivalAddress.trim() && '도착지를 입력하세요.'}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </BottomSheet>
  );
}