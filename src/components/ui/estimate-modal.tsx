'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Car, Calculator } from 'lucide-react';
import { toast } from 'sonner';

interface EstimateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EstimateModal({ open, onOpenChange }: EstimateModalProps) {
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    vehicle: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEstimate = () => {
    if (!formData.departure || !formData.destination || !formData.vehicle) {
      toast.error('모든 항목을 입력해주세요.');
      return;
    }

    // 간단한 견적 계산 로직 (실제로는 API 호출)
    const basePrice = 50000;
    const vehicleMultiplier = formData.vehicle.includes('소형') ? 1.0 : 
                            formData.vehicle.includes('중형') ? 1.2 : 1.5;
    const estimatedPrice = Math.floor(basePrice * vehicleMultiplier);

    toast.success(`예상 견적: ${estimatedPrice.toLocaleString()}원`, {
      duration: 5000,
      description: '정확한 견적은 상담을 통해 확인하세요.'
    });

    onOpenChange(false);
    
    // 폼 초기화
    setFormData({
      departure: '',
      destination: '',
      vehicle: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            간편조회
          </DialogTitle>
          <p className="text-gray-600 text-sm mt-2">
            목적지만 입력하면 바로 요금을 확인할 수 있어요
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* 출발지 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              출발지
            </label>
            <EnhancedInput
              placeholder="출발 위치를 입력하세요"
              value={formData.departure}
              onChange={(e) => handleInputChange('departure', e.target.value)}
              className="w-full"
            />
          </div>

          {/* 현재 위치로 설정 버튼 */}
          <div className="text-center">
            <div className="border-2 border-dashed border-blue-300 rounded-lg py-4 px-6">
              <MapPin className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <button 
                className="text-blue-600 text-sm hover:underline"
                onClick={() => {
                  // 현재 위치 설정 로직 (실제로는 geolocation API 사용)
                  toast.info('현재 위치를 확인중입니다...');
                  setTimeout(() => {
                    handleInputChange('departure', '현재 위치');
                    toast.success('현재 위치로 설정되었습니다.');
                  }, 1000);
                }}
              >
                현재 위치로 설정
              </button>
            </div>
          </div>

          {/* 목적지 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-black" />
              목적지
            </label>
            <EnhancedInput
              placeholder="도착 위치를 입력하세요"
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              className="w-full"
            />
          </div>

          {/* 차종 선택 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Car className="w-4 h-4 text-gray-600" />
              차종
            </label>
            <Select value={formData.vehicle} onValueChange={(value) => handleInputChange('vehicle', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="차종을 입력하세요 (예: 그랜저, 아반떼)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="소형차 (경차, 모닝 등)">소형차 (경차, 모닝 등)</SelectItem>
                <SelectItem value="중형차 (아반떼, 쏘나타 등)">중형차 (아반떼, 쏘나타 등)</SelectItem>
                <SelectItem value="대형차 (그랜저, 제네시스 등)">대형차 (그랜저, 제네시스 등)</SelectItem>
                <SelectItem value="SUV (투싼, 싼타페 등)">SUV (투싼, 싼타페 등)</SelectItem>
                <SelectItem value="승합차 (카니발, 스타리아 등)">승합차 (카니발, 스타리아 등)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 견적비용 확인 버튼 */}
          <EnhancedButton
            onClick={handleEstimate}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white"
            size="lg"
            icon={Calculator}
          >
            견적비용 확인
          </EnhancedButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}