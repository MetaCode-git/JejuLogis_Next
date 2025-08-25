'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { useCompany } from '@/contexts/CompanyContext';
import { Car, Search, CheckCircle, Star, Fuel, Users, Package, Phone, Clock } from 'lucide-react';
import { toast } from 'sonner';

// 차량 카테고리 정의
const vehicleCategories = [
  {
    id: 'compact',
    name: '경차/소형차',
    description: '모닝, 스파크, 레이 등',
    basePrice: 80000,
    examples: ['기아 모닝', '쉐보레 스파크', '기아 레이', '현대 i10'],
    features: ['연비 우수', '도심 주차 용이', '합리적 비용'],
    icon: '🚗',
    dimensions: '길이 3.6m 이하'
  },
  {
    id: 'midsize',
    name: '준중형/중형차',
    description: '아반떼, 소나타, K5 등',
    basePrice: 120000,
    examples: ['현대 아반떼', '현대 소나타', '기아 K5', '현대 그랜저'],
    features: ['균형잡힌 성능', '넓은 실내공간', '대중적 선택'],
    icon: '🚙',
    dimensions: '길이 4.3-4.9m'
  },
  {
    id: 'large',
    name: '대형차',
    description: '그랜저, K9, 제네시스 등',
    basePrice: 150000,
    examples: ['현대 그랜저', '기아 K9', '제네시스 G80', '제네시스 G90'],
    features: ['프리미엄 품질', '최고급 편의사양', '비즈니스 전용'],
    icon: '🚐',
    dimensions: '길이 4.9m 이상'
  },
  {
    id: 'suv-compact',
    name: '소형/중형 SUV',
    description: '투싼, 스포티지, 코나 등',
    basePrice: 130000,
    examples: ['현대 투싼', '기아 스포티지', '현대 코나', '기아 니로'],
    features: ['높은 시야', '실용적 공간', '도심/야외 겸용'],
    icon: '🚗',
    dimensions: '길이 4.2-4.6m'
  },
  {
    id: 'suv-large',
    name: '대형 SUV',
    description: '싸나이, 모하비, 팰리세이드 등',
    basePrice: 180000,
    examples: ['현대 싸나이', '기아 모하비', '현대 팰리세이드', '기아 텔루라이드'],
    features: ['대용량 적재', '7인승 좌석', '강력한 성능'],
    icon: '🚛',
    dimensions: '길이 4.8m 이상'
  },
  {
    id: 'luxury',
    name: '수입/고급차',
    description: '벤츠, BMW, 아우디 등',
    basePrice: 250000,
    examples: ['벤츠 E클래스', 'BMW 5시리즈', '아우디 A6', '렉서스 ES'],
    features: ['최고급 마감', '첨단 기술', '프리미엄 브랜드'],
    icon: '💎',
    dimensions: '브랜드별 상이'
  },
  {
    id: 'van',
    name: '승합차',
    description: '카니발, 스타렉스 등',
    basePrice: 160000,
    examples: ['기아 카니발', '현대 스타렉스', '기아 봉고3', '현대 그랜드 스타렉스'],
    features: ['대인원 수용', '대용량 화물', '다목적 활용'],
    icon: '🚌',
    dimensions: '11인승 이하'
  },
  {
    id: 'truck',
    name: '화물차',
    description: '1톤, 2.5톤 등',
    basePrice: 200000,
    examples: ['현대 포터', '기아 봉고3', '현대 마이티', '현대 메가트럭'],
    features: ['대용량 적재', '상업용 특화', '내구성 우수'],
    icon: '🚚',
    dimensions: '적재량별 상이'
  }
];

interface SelectedVehicle {
  category: string;
  customModel?: string;
  estimatedPrice: number;
}

export function VehicleSelectPage() {
  const { config } = useCompany();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [customModel, setCustomModel] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVehicle, setSelectedVehicle] = useState<SelectedVehicle | null>(null);

  // 검색 필터링
  const filteredCategories = vehicleCategories.filter(category => 
    searchQuery === '' || 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.examples.some(example => example.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // 차량 선택 핸들러
  const handleVehicleSelect = (categoryId: string) => {
    const category = vehicleCategories.find(c => c.id === categoryId);
    if (category) {
      setSelectedCategory(categoryId);
      setSelectedVehicle({
        category: categoryId,
        customModel: customModel,
        estimatedPrice: category.basePrice
      });
    }
  };

  // 견적 요청으로 진행
  const handleProceedToEstimate = () => {
    if (!selectedVehicle) {
      toast.error('차량을 선택해주세요.');
      return;
    }

    const selectedCategoryData = vehicleCategories.find(c => c.id === selectedVehicle.category);
    
    // 선택한 차량 정보를 세션 스토리지에 저장
    const vehicleInfo = {
      category: selectedVehicle.category,
      categoryName: selectedCategoryData?.name,
      customModel: customModel || '',
      basePrice: selectedVehicle.estimatedPrice,
      timestamp: new Date().toISOString()
    };
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedVehicle', JSON.stringify(vehicleInfo));
    }

    toast.success('차량 선택이 완료되었습니다!');
    
    // 견적 신청 페이지로 이동
    window.location.href = '/estimate';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ResponsiveContainer maxWidth="1280">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              차량 종류 선택
            </h1>
            <p className="text-gray-600">
              운송할 차량의 종류를 선택하면 예상 견적을 확인할 수 있습니다
            </p>
          </div>

          {/* 검색 바 */}
          <div className="mb-8">
            <div className="max-w-md mx-auto">
              <EnhancedInput
                placeholder="차량 모델로 검색 (예: 아반떼, BMW, 카니발)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
          </div>

          {/* 차량 카테고리 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {filteredCategories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedCategory === category.id
                    ? 'ring-2 ring-red-500 bg-red-50'
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleVehicleSelect(category.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription className="text-sm">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="text-center">
                      <Badge variant="outline" className="text-red-600 border-red-200 font-semibold">
                        ₩{category.basePrice.toLocaleString()}~
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 font-medium">주요 특징:</div>
                      {category.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-2 border-t">
                      <div className="text-xs text-gray-500 font-medium mb-1">대표 차량:</div>
                      <div className="text-xs text-gray-600">
                        {category.examples.slice(0, 2).join(', ')}
                        {category.examples.length > 2 && ' 등'}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      <Package className="w-3 h-3 inline mr-1" />
                      {category.dimensions}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 선택된 차량 정보 및 상세 입력 */}
          {selectedCategory && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="w-5 h-5 mr-2 text-red-600" />
                  선택한 차량 정보
                </CardTitle>
                <CardDescription>
                  더 정확한 견적을 위해 구체적인 차량 모델을 입력해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">선택된 카테고리</h4>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">
                          {vehicleCategories.find(c => c.id === selectedCategory)?.icon}
                        </span>
                        <div>
                          <div className="font-semibold">
                            {vehicleCategories.find(c => c.id === selectedCategory)?.name}
                          </div>
                          <div className="text-sm text-red-600">
                            기본 요금: ₩{vehicleCategories.find(c => c.id === selectedCategory)?.basePrice.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">차량 모델 (선택사항)</h4>
                    <EnhancedInput
                      placeholder="예: 현대 아반떼 2023년형"
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      icon={<Car className="w-4 h-4" />}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      정확한 모델명을 입력하시면 더 정밀한 견적을 받으실 수 있습니다
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">예상 견적 정보</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-blue-600 font-medium">기본 운송료:</span>
                      <div className="font-semibold">
                        ₩{vehicleCategories.find(c => c.id === selectedCategory)?.basePrice.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">거리별 추가요금:</span>
                      <div className="text-xs text-blue-700">
                        • 제주도내: 무료<br/>
                        • 육지간: km당 ₩1,000
                      </div>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">할인 혜택:</span>
                      <div className="text-xs text-blue-700">
                        • 왕복할인: 10%<br/>
                        • 장기고객: 5-15%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 진행 버튼 */}
          <div className="text-center">
            <EnhancedButton
              size="lg"
              gradient
              disabled={!selectedCategory}
              onClick={handleProceedToEstimate}
              className="px-8"
            >
              견적 신청하기
            </EnhancedButton>
            
            {!selectedCategory && (
              <p className="text-sm text-gray-500 mt-2">
                차량을 선택하시면 견적 신청을 진행할 수 있습니다
              </p>
            )}
          </div>

          {/* 추가 정보 */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>차량 분류 기준 안내</CardTitle>
              <CardDescription>정확한 분류를 위한 참고 정보</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Car className="w-4 h-4 mr-2 text-blue-600" />
                    크기별 분류
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• <strong>경차:</strong> 배기량 1,000cc 이하, 길이 3.6m 이하</li>
                    <li>• <strong>소형:</strong> 배기량 1,600cc 이하, 길이 4.7m 이하</li>
                    <li>• <strong>중형:</strong> 배기량 2,000cc 이하, 길이 4.9m 이하</li>
                    <li>• <strong>대형:</strong> 배기량 2,000cc 초과 또는 길이 4.9m 초과</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    특별 주의사항
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 개조 차량이나 튜닝카는 사전 문의 필요</li>
                    <li>• 클래식카나 빈티지카는 별도 견적</li>
                    <li>• 전기차는 추가 안전 조치비 발생 가능</li>
                    <li>• 차량 상태에 따라 추가 요금 발생 가능</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    문의: {config?.company.phone}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    상담시간: {config?.company.businessHours}
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