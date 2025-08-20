"use client"

import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Car, Calculator, Loader2 } from 'lucide-react';
import { jejuLogisApi } from '@/lib/jejulogis-api';
import type { Vehicle, EstimateRequest, EstimateResponse, getVehicleManufacturer, getVehicleModel } from '@/types/api';

interface EstimateBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EstimateBottomSheet({ isOpen, onClose }: EstimateBottomSheetProps) {
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
  const [estimateResult, setEstimateResult] = useState<EstimateResponse | null>(null);

  // Debounce refs
  const vehicleTimeoutRef = useRef<NodeJS.Timeout>();

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
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">견적 결과</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">차종:</span>
                  <span className="font-medium">{estimateResult.vehicle_info.maker} {estimateResult.vehicle_info.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">출발지:</span>
                  <span className="font-medium text-right max-w-[200px] truncate">{estimateResult.departure_info.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">도착지:</span>
                  <span className="font-medium text-right max-w-[200px] truncate">{estimateResult.arrival_info.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">거리:</span>
                  <span className="font-medium">{estimateResult.distance}km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">예상 소요시간:</span>
                  <span className="font-medium">{estimateResult.estimated_duration}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">기본 요금:</span>
                  <span className="font-medium">{estimateResult.base_price.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">추가 요금:</span>
                  <span className="font-medium">{estimateResult.additional_fees.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-blue-600">
                  <span>총 견적금액:</span>
                  <span>{estimateResult.total_price.toLocaleString()}원</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={resetForm} variant="outline" className="flex-1">
                다시 조회
              </Button>
              <Button onClick={handleClose} className="flex-1">
                확인
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 차종 선택 */}
            <div className="space-y-2">
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
              
              {/* 차량 검색 결과 */}
              {vehicleResults.length > 0 && (
                <div className="border border-gray-200 rounded-md bg-white max-h-40 overflow-y-auto">
                  {vehicleResults.map((vehicle) => (
                    <button
                      key={vehicle.id}
                      onClick={() => handleVehicleSelect(vehicle)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium">{vehicle.maker} {vehicle.name}</div>
                      <div className="text-sm text-gray-500">{vehicle.type} • 일반: {vehicle.priceNormal.toLocaleString()}원</div>
                    </button>
                  ))}
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