'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { DatePicker } from '@/components/ui/date-picker';
import { SearchBox } from '@/components/ui/search-box';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepProgress } from '@/components/ui/step-progress';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { useCompany } from '@/contexts/CompanyContext';
import { Car, MapPin, Calendar, Phone, Mail, User } from 'lucide-react';
import { toast } from 'sonner';

// 견적 단계 정의
const steps = [
  { id: '1', title: '차량 정보', description: '차종 및 크기', current: true },
  { id: '2', title: '운송 정보', description: '출발/도착지 및 날짜' },
  { id: '3', title: '연락처 정보', description: '고객 정보 입력' },
  { id: '4', title: '견적 완료', description: '최종 확인' }
];

// 차량 카테고리 정의
const vehicleCategories = [
  { id: 'compact', name: '소형차', description: '경차, 소형' },
  { id: 'midsize', name: '중형차', description: '준중형, 중형' },
  { id: 'large', name: '대형차', description: '준대형, 대형' },
  { id: 'suv', name: 'SUV', description: '소형/중형/대형 SUV' },
  { id: 'luxury', name: '수입/고급차', description: '벤츠, BMW, 아우디 등' },
  { id: 'truck', name: '화물차', description: '1톤, 2.5톤 등' }
];

interface EstimateFormData {
  vehicleCategory: string;
  vehicleModel: string;
  departureAddress: string;
  arrivalAddress: string;
  transportDate: Date | undefined;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  specialRequests: string;
}

export function EstimatePage() {
  const { config } = useCompany();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EstimateFormData>({
    vehicleCategory: '',
    vehicleModel: '',
    departureAddress: '',
    arrivalAddress: '',
    transportDate: undefined,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    specialRequests: ''
  });

  // 단계별 업데이트된 steps
  const currentSteps = steps.map((step, index) => ({
    ...step,
    completed: index < currentStep,
    current: index === currentStep
  }));

  // 폼 데이터 업데이트
  const updateFormData = (field: keyof EstimateFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 다음 단계로
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 이전 단계로
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 견적 신청 완료
  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // 여기서 실제 API 호출을 수행
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('견적 신청이 완료되었습니다!');
      toast.info('담당자가 곧 연락드리겠습니다.');
      
    } catch (error) {
      toast.error('견적 신청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 주소 검색 함수 (모의 데이터)
  const handleAddressSearch = async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      {
        id: '1',
        address: `제주특별자치도 제주시 ${query}`,
        roadAddress: `제주특별자치도 제주시 중앙로 ${query}번길`,
        zipcode: '63166'
      },
      {
        id: '2',
        address: `제주특별자치도 서귀포시 ${query}`,
        roadAddress: `제주특별자치도 서귀포시 중정로 ${query}`,  
        zipcode: '63565'
      }
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ResponsiveContainer maxWidth="1280">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              차량 탁송 견적 신청
            </h1>
            <p className="text-gray-600">
              정확한 정보를 입력해주시면 빠른 견적을 제공해드립니다
            </p>
          </div>

          {/* 진행 단계 */}
          <div className="mb-8">
            <StepProgress steps={currentSteps} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <CardDescription>{steps[currentStep].description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* 1단계: 차량 정보 */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      차량 종류를 선택하세요
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {vehicleCategories.map((category) => (
                        <Card
                          key={category.id}
                          className={`cursor-pointer transition-all ${
                            formData.vehicleCategory === category.id
                              ? 'ring-2 ring-red-500 bg-red-50'
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => updateFormData('vehicleCategory', category.id)}
                        >
                          <CardContent className="p-4 flex items-center space-x-3">
                            <Car className="w-6 h-6 text-gray-400" />
                            <div>
                              <h3 className="font-medium">{category.name}</h3>
                              <p className="text-sm text-gray-500">{category.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <EnhancedInput
                    label="차량 모델 (선택사항)"
                    placeholder="예: 아반떼, 소나타, BMW 3시리즈"
                    value={formData.vehicleModel}
                    onChange={(e) => updateFormData('vehicleModel', e.target.value)}
                    icon={<Car className="w-4 h-4" />}
                  />
                </div>
              )}

              {/* 2단계: 운송 정보 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <SearchBox
                    value={formData.departureAddress}
                    onChange={(value) => updateFormData('departureAddress', value)}
                    onSearch={handleAddressSearch}
                    placeholder="출발지 주소를 검색하세요"
                    onSelect={(result) => updateFormData('departureAddress', result.roadAddress)}
                  />

                  <SearchBox
                    value={formData.arrivalAddress}
                    onChange={(value) => updateFormData('arrivalAddress', value)}
                    onSearch={handleAddressSearch}
                    placeholder="도착지 주소를 검색하세요"
                    onSelect={(result) => updateFormData('arrivalAddress', result.roadAddress)}
                  />

                  <DatePicker
                    label="희망 운송일"
                    date={formData.transportDate}
                    onDateChange={(date) => updateFormData('transportDate', date)}
                    minDate={new Date()}
                    placeholder="운송 희망일을 선택하세요"
                    required
                  />
                </div>
              )}

              {/* 3단계: 연락처 정보 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <EnhancedInput
                      label="고객명"
                      placeholder="이름을 입력하세요"
                      value={formData.customerName}
                      onChange={(e) => updateFormData('customerName', e.target.value)}
                      icon={<User className="w-4 h-4" />}
                      required
                    />

                    <EnhancedInput
                      label="연락처"
                      type="tel"
                      formatPhoneNumber
                      placeholder="전화번호를 입력하세요"
                      value={formData.customerPhone}
                      onChange={(e) => updateFormData('customerPhone', e.target.value)}
                      icon={<Phone className="w-4 h-4" />}
                      required
                    />
                  </div>

                  <EnhancedInput
                    label="이메일 (선택사항)"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={formData.customerEmail}
                    onChange={(e) => updateFormData('customerEmail', e.target.value)}
                    icon={<Mail className="w-4 h-4" />}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      특별 요청사항 (선택사항)
                    </label>
                    <textarea
                      className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="추가 요청사항이 있으시면 입력해주세요"
                      value={formData.specialRequests}
                      onChange={(e) => updateFormData('specialRequests', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* 4단계: 완료 */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium mb-4">신청 내용 확인</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">차량:</span> {
                          vehicleCategories.find(c => c.id === formData.vehicleCategory)?.name
                        } {formData.vehicleModel && `(${formData.vehicleModel})`}
                      </div>
                      <div>
                        <span className="font-medium">운송일:</span> {
                          formData.transportDate?.toLocaleDateString('ko-KR') || '미선택'
                        }
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium">운송 구간:</span><br />
                        출발: {formData.departureAddress || '미입력'}<br />
                        도착: {formData.arrivalAddress || '미입력'}
                      </div>
                      <div>
                        <span className="font-medium">고객명:</span> {formData.customerName}
                      </div>
                      <div>
                        <span className="font-medium">연락처:</span> {formData.customerPhone}
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>안내사항:</strong><br />
                      • 견적 신청 후 1-2시간 내 담당자가 연락드립니다<br />
                      • 정확한 견적을 위해 차량 상태나 특이사항이 있으시면 통화시 말씀해주세요<br />
                      • 운송 일정은 날씨나 교통상황에 따라 조정될 수 있습니다
                    </p>
                  </div>
                </div>
              )}

              {/* 버튼 영역 */}
              <div className="flex justify-between pt-6">
                <EnhancedButton
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  이전
                </EnhancedButton>

                <div className="flex space-x-4">
                  {currentStep < steps.length - 1 ? (
                    <EnhancedButton
                      onClick={handleNext}
                      disabled={
                        (currentStep === 0 && !formData.vehicleCategory) ||
                        (currentStep === 1 && (!formData.departureAddress || !formData.arrivalAddress || !formData.transportDate)) ||
                        (currentStep === 2 && (!formData.customerName || !formData.customerPhone))
                      }
                    >
                      다음
                    </EnhancedButton>
                  ) : (
                    <EnhancedButton
                      loading={loading}
                      loadingText="신청중..."
                      onClick={handleSubmit}
                      gradient
                    >
                      견적 신청 완료
                    </EnhancedButton>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 연락처 안내 */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-medium mb-2">급하신 경우 직접 연락주세요</h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    {config?.company.phone}
                  </div>
                  <div className="text-gray-400 hidden sm:block">|</div>
                  <div className="text-gray-600">
                    {config?.company.businessHours}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ResponsiveContainer>
    </div>
  );
}