'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { DatePicker } from '@/components/ui/date-picker';
import { SearchBox } from '@/components/ui/search-box';
import { StepProgress } from '@/components/ui/step-progress';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { useEstimateStore } from '@/stores/useEstimateStore';
import { useSubmitEstimate, useAddressSearch } from '@/hooks/useEstimateAPI';
import { 
  estimateSchema, 
  vehicleInfoSchema, 
  transportInfoSchema, 
  customerInfoSchema,
  type EstimateForm 
} from '@/lib/validations';
import { Car, MapPin, Calendar, Phone, Mail, User, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// 차량 카테고리 정의 (기존과 동일하지만 validation 추가)
const vehicleCategories = [
  { id: 'compact', name: '소형차', description: '모닝, 스파크, 레이 등', basePrice: 80000 },
  { id: 'midsize', name: '준중형/중형차', description: '아반떼, 소나타, K5 등', basePrice: 120000 },
  { id: 'large', name: '대형차', description: '그랜저, K9, 제네시스 등', basePrice: 150000 },
  { id: 'suv-compact', name: '소형/중형 SUV', description: '투싼, 스포티지, 코나 등', basePrice: 130000 },
  { id: 'suv-large', name: '대형 SUV', description: '싸나이, 모하비, 팰리세이드 등', basePrice: 180000 },
  { id: 'luxury', name: '수입/고급차', description: '벤츠, BMW, 아우디 등', basePrice: 250000 },
];

const steps = [
  { id: '1', title: '차량 정보', description: '차종 및 모델 선택' },
  { id: '2', title: '운송 정보', description: '출발지/도착지 및 날짜' },
  { id: '3', title: '연락처 정보', description: '고객 정보 입력' },
  { id: '4', title: '견적 완료', description: '최종 확인 및 제출' }
];

export function EnhancedEstimateForm() {
  const {
    currentStep,
    vehicleInfo,
    transportInfo,
    customerInfo,
    setCurrentStep,
    setVehicleInfo,
    setTransportInfo,
    setCustomerInfo,
    nextStep,
    previousStep,
    canProceedToNext,
    getTotalSteps
  } = useEstimateStore();

  const submitEstimateMutation = useSubmitEstimate();

  // 전체 폼 관리
  const form = useForm<EstimateForm>({
    resolver: zodResolver(estimateSchema),
    mode: 'onChange',
    defaultValues: {
      vehicle: vehicleInfo || { category: '', customModel: '' },
      transport: transportInfo || { 
        departureAddress: '', 
        arrivalAddress: '', 
        transportDate: undefined 
      },
      customer: customerInfo || { 
        name: '', 
        phone: '', 
        email: '', 
        specialRequests: '' 
      },
    }
  });

  // 단계별 폼 관리
  const vehicleForm = useForm({
    resolver: zodResolver(vehicleInfoSchema),
    mode: 'onChange',
    defaultValues: vehicleInfo || { category: '', customModel: '' }
  });

  const transportForm = useForm({
    resolver: zodResolver(transportInfoSchema),
    mode: 'onChange',
    defaultValues: transportInfo || { 
      departureAddress: '', 
      arrivalAddress: '', 
      transportDate: undefined 
    }
  });

  const customerForm = useForm({
    resolver: zodResolver(customerInfoSchema),
    mode: 'onChange',
    defaultValues: customerInfo || { 
      name: '', 
      phone: '', 
      email: '', 
      specialRequests: '' 
    }
  });

  // 주소 검색 상태
  const [addressSearchQuery, setAddressSearchQuery] = React.useState('');
  const { data: addressResults } = useAddressSearch(addressSearchQuery);

  // 현재 단계의 진행 상태
  const currentSteps = steps.map((step, index) => ({
    ...step,
    completed: index < currentStep,
    current: index === currentStep
  }));

  // 차량 선택 핸들러
  const handleVehicleSelect = (categoryId: string) => {
    const category = vehicleCategories.find(c => c.id === categoryId);
    if (category) {
      const vehicleData = {
        category: categoryId,
        customModel: vehicleForm.getValues('customModel') || ''
      };
      
      vehicleForm.setValue('category', categoryId);
      setVehicleInfo({
        ...vehicleData,
        categoryName: category.name,
        basePrice: category.basePrice
      });
    }
  };

  // 다음 단계로 이동
  const handleNext = async () => {
    let isValid = false;

    switch (currentStep) {
      case 0: // 차량 정보
        isValid = await vehicleForm.trigger();
        if (isValid) {
          const vehicleData = vehicleForm.getValues();
          const category = vehicleCategories.find(c => c.id === vehicleData.category);
          setVehicleInfo({
            ...vehicleData,
            categoryName: category?.name,
            basePrice: category?.basePrice || 0
          });
        }
        break;
      case 1: // 운송 정보
        isValid = await transportForm.trigger();
        if (isValid) {
          setTransportInfo(transportForm.getValues());
        }
        break;
      case 2: // 고객 정보
        isValid = await customerForm.trigger();
        if (isValid) {
          setCustomerInfo(customerForm.getValues());
        }
        break;
    }

    if (isValid) {
      nextStep();
    } else {
      toast.error('입력한 정보를 확인해주세요.');
    }
  };

  // 견적 제출
  const handleSubmit = async () => {
    if (!vehicleInfo || !transportInfo || !customerInfo) {
      toast.error('모든 정보를 입력해주세요.');
      return;
    }

    try {
      const submitData = {
        vehicleCategory: vehicleInfo.category,
        vehicleModel: vehicleInfo.customModel || '',
        departureAddress: transportInfo.departureAddress,
        arrivalAddress: transportInfo.arrivalAddress,
        transportDate: transportInfo.transportDate!.toISOString(),
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email || undefined,
        specialRequests: customerInfo.specialRequests || undefined,
      };

      const result = await submitEstimateMutation.mutateAsync(submitData);
      
      // 성공 시 결과 페이지로 이동
      window.location.href = `/estimate/result?id=${result.id}`;
      
    } catch (error) {
      console.error('견적 제출 실패:', error);
    }
  };

  // 주소 검색 핸들러
  const handleAddressSearch = async (query: string) => {
    setAddressSearchQuery(query);
    // 실제로는 API 호출 결과 반환
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
      <ResponsiveContainer>
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
                      차량 종류를 선택하세요 *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {vehicleCategories.map((category) => (
                        <Card
                          key={category.id}
                          className={`cursor-pointer transition-all ${
                            vehicleForm.watch('category') === category.id
                              ? 'ring-2 ring-red-500 bg-red-50'
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => handleVehicleSelect(category.id)}
                        >
                          <CardContent className="p-4 flex items-center space-x-3">
                            <Car className="w-6 h-6 text-gray-400" />
                            <div className="flex-1">
                              <h3 className="font-medium">{category.name}</h3>
                              <p className="text-sm text-gray-500">{category.description}</p>
                              <Badge variant="outline" className="mt-1 text-red-600 border-red-200">
                                ₩{category.basePrice.toLocaleString()}~
                              </Badge>
                            </div>
                            {vehicleForm.watch('category') === category.id && (
                              <CheckCircle className="w-5 h-5 text-red-500" />
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {vehicleForm.formState.errors.category && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {vehicleForm.formState.errors.category.message}
                      </p>
                    )}
                  </div>

                  <Controller
                    control={vehicleForm.control}
                    name="customModel"
                    render={({ field }) => (
                      <EnhancedInput
                        {...field}
                        label="차량 모델 (선택사항)"
                        placeholder="예: 현대 아반떼 2023년형"
                        icon={<Car className="w-4 h-4" />}
                        error={vehicleForm.formState.errors.customModel?.message}
                      />
                    )}
                  />
                </div>
              )}

              {/* 2단계: 운송 정보 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <Controller
                    control={transportForm.control}
                    name="departureAddress"
                    render={({ field }) => (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          출발지 주소 *
                        </label>
                        <SearchBox
                          value={field.value}
                          onChange={field.onChange}
                          onSearch={handleAddressSearch}
                          placeholder="출발지 주소를 검색하세요"
                          onSelect={(result) => field.onChange(result.roadAddress)}
                        />
                        {transportForm.formState.errors.departureAddress && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {transportForm.formState.errors.departureAddress.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    control={transportForm.control}
                    name="arrivalAddress"
                    render={({ field }) => (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          도착지 주소 *
                        </label>
                        <SearchBox
                          value={field.value}
                          onChange={field.onChange}
                          onSearch={handleAddressSearch}
                          placeholder="도착지 주소를 검색하세요"
                          onSelect={(result) => field.onChange(result.roadAddress)}
                        />
                        {transportForm.formState.errors.arrivalAddress && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {transportForm.formState.errors.arrivalAddress.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    control={transportForm.control}
                    name="transportDate"
                    render={({ field }) => (
                      <DatePicker
                        label="희망 운송일 *"
                        date={field.value}
                        onDateChange={field.onChange}
                        minDate={new Date()}
                        placeholder="운송 희망일을 선택하세요"
                        required
                        error={transportForm.formState.errors.transportDate?.message}
                      />
                    )}
                  />
                </div>
              )}

              {/* 3단계: 연락처 정보 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Controller
                      control={customerForm.control}
                      name="name"
                      render={({ field }) => (
                        <EnhancedInput
                          {...field}
                          label="고객명 *"
                          placeholder="이름을 입력하세요"
                          icon={<User className="w-4 h-4" />}
                          required
                          error={customerForm.formState.errors.name?.message}
                        />
                      )}
                    />

                    <Controller
                      control={customerForm.control}
                      name="phone"
                      render={({ field }) => (
                        <EnhancedInput
                          {...field}
                          label="연락처 *"
                          type="tel"
                          formatPhoneNumber
                          placeholder="전화번호를 입력하세요"
                          icon={<Phone className="w-4 h-4" />}
                          required
                          error={customerForm.formState.errors.phone?.message}
                        />
                      )}
                    />
                  </div>

                  <Controller
                    control={customerForm.control}
                    name="email"
                    render={({ field }) => (
                      <EnhancedInput
                        {...field}
                        label="이메일 (선택사항)"
                        type="email"
                        placeholder="이메일을 입력하세요"
                        icon={<Mail className="w-4 h-4" />}
                        error={customerForm.formState.errors.email?.message}
                      />
                    )}
                  />

                  <Controller
                    control={customerForm.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          특별 요청사항 (선택사항)
                        </label>
                        <textarea
                          {...field}
                          className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="추가 요청사항이 있으시면 입력해주세요"
                        />
                        {customerForm.formState.errors.specialRequests && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {customerForm.formState.errors.specialRequests.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              )}

              {/* 4단계: 완료 */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium mb-4">신청 내용 확인</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">차량:</span> {vehicleInfo?.categoryName}
                        {vehicleInfo?.customModel && ` (${vehicleInfo.customModel})`}
                      </div>
                      <div>
                        <span className="font-medium">운송일:</span>{' '}
                        {transportInfo?.transportDate?.toLocaleDateString('ko-KR') || '미선택'}
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium">운송 구간:</span><br />
                        출발: {transportInfo?.departureAddress || '미입력'}<br />
                        도착: {transportInfo?.arrivalAddress || '미입력'}
                      </div>
                      <div>
                        <span className="font-medium">고객명:</span> {customerInfo?.name}
                      </div>
                      <div>
                        <span className="font-medium">연락처:</span> {customerInfo?.phone}
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
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={currentStep === 0}
                >
                  이전
                </EnhancedButton>

                <div className="flex space-x-4">
                  {currentStep < getTotalSteps() - 1 ? (
                    <EnhancedButton onClick={handleNext}>
                      다음
                    </EnhancedButton>
                  ) : (
                    <EnhancedButton
                      loading={submitEstimateMutation.isPending}
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
        </div>
      </ResponsiveContainer>
    </div>
  );
}