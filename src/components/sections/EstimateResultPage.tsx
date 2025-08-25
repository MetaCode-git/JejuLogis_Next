'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { useCompany } from '@/contexts/CompanyContext';
import { 
  Phone, Mail, Download, Share2, Calculator, MapPin, 
  Calendar, Car, Clock, CreditCard, CheckCircle, 
  AlertCircle, Star, Shield, Truck 
} from 'lucide-react';
import { toast } from 'sonner';
import { useSaveEstimate } from '@/hooks/useEstimateAPI';
import type { EstimateSaveRequest } from '@/types/api';

interface EstimateData {
  vehicleCategory: string;
  vehicleModel: string;
  departureAddress: string;
  arrivalAddress: string;
  transportDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  specialRequests: string;
  estimateId: string;
  createdAt: string;
  basePrice: number;
  totalPrice: number;
  distance: number;
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
}

export function EstimateResultPage() {
  const { config } = useCompany();
  const [estimateData, setEstimateData] = useState<EstimateData | null>(null);
  const [loading, setLoading] = useState(true);
  const saveEstimateMutation = useSaveEstimate();

  useEffect(() => {
    // 실제로는 URL 파라미터나 API에서 데이터를 가져옴
    // 여기서는 모의 데이터 생성
    const mockEstimateData: EstimateData = {
      vehicleCategory: 'midsize',
      vehicleModel: '현대 아반떼 2023년형',
      departureAddress: '제주특별자치도 제주시 연동 123-45',
      arrivalAddress: '제주특별자치도 서귀포시 중문동 67-89',
      transportDate: '2024-03-15',
      customerName: '김제주',
      customerPhone: '010-1234-5678',
      customerEmail: 'kim@email.com',
      specialRequests: '차량을 조심히 운송해 주세요.',
      estimateId: 'EST-2024-0315-001',
      createdAt: new Date().toISOString(),
      basePrice: 120000,
      totalPrice: 135000,
      distance: 45,
      additionalFees: [
        { name: '보험료', amount: 10000, description: '운송보험 필수 가입' },
        { name: '연료비 할증', amount: 5000, description: '유가 상승으로 인한 할증' }
      ],
      discounts: [
        { name: '신규고객 할인', amount: 10000, description: '첫 이용 고객 특별 할인' }
      ]
    };

    setTimeout(() => {
      setEstimateData(mockEstimateData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDownloadPDF = () => {
    toast.success('견적서 PDF 다운로드가 준비되었습니다.');
    // 실제로는 PDF 생성 및 다운로드 로직
  };

  const handleShareEstimate = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '제주탁송 견적서',
          text: `견적 번호: ${estimateData?.estimateId}`,
          url: window.location.href,
        });
      } catch (error) {
        toast.error('공유에 실패했습니다.');
      }
    } else {
      // 링크 복사
      navigator.clipboard.writeText(window.location.href);
      toast.success('링크가 클립보드에 복사되었습니다.');
    }
  };

  const handleConfirmEstimate = async () => {
    if (!estimateData) {
      toast.error('견적 데이터를 찾을 수 없습니다.');
      return;
    }

    const saveData: EstimateSaveRequest = {
      companyKey: 'JEJULOGIS',
      departure: estimateData.departureAddress,
      arrival: estimateData.arrivalAddress,
      carName: estimateData.vehicleModel,
      transportDate: estimateData.transportDate,
      cost: estimateData.totalPrice,
      customerName: estimateData.customerName,
      customerPhone: estimateData.customerPhone,
      customerEmail: estimateData.customerEmail,
      memo: estimateData.specialRequests,
      status: 0
    };

    try {
      await saveEstimateMutation.mutateAsync(saveData);
    } catch (error) {
      console.error('견적 확정 실패:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">견적을 계산하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!estimateData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">견적 정보를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-6">견적 신청을 다시 해주시기 바랍니다.</p>
          <EnhancedButton asChild>
            <a href="/estimate">새 견적 신청</a>
          </EnhancedButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ResponsiveContainer maxWidth="1280">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              견적 계산 완료!
            </h1>
            <p className="text-gray-600">
              견적서가 성공적으로 생성되었습니다
            </p>
            <Badge variant="outline" className="mt-2">
              견적번호: {estimateData.estimateId}
            </Badge>
          </div>

          {/* 요약 카드 */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">총 견적 금액</CardTitle>
                  <CardDescription className="text-red-100">
                    부가세 포함 최종 금액
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">
                    ₩{estimateData.totalPrice.toLocaleString()}
                  </div>
                  <div className="text-red-100 text-sm">
                    기본요금 ₩{estimateData.basePrice.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 메인 정보 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 운송 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-red-600" />
                    운송 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">차량 정보</label>
                      <div className="flex items-center mt-1">
                        <Car className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-medium">{estimateData.vehicleModel}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">운송 거리</label>
                      <div className="flex items-center mt-1">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-medium">{estimateData.distance}km</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">출발지</label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        {estimateData.departureAddress}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">도착지</label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        {estimateData.arrivalAddress}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">희망 운송일</label>
                      <div className="flex items-center mt-1">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-medium">{new Date(estimateData.transportDate).toLocaleDateString('ko-KR')}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">예상 소요시간</label>
                      <div className="flex items-center mt-1">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-medium">2-4시간</span>
                      </div>
                    </div>
                  </div>

                  {estimateData.specialRequests && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">특별 요청사항</label>
                      <div className="mt-1 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        {estimateData.specialRequests}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 요금 세부내역 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2 text-red-600" />
                    요금 세부내역
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium">기본 운송료</span>
                      <span className="font-semibold">₩{estimateData.basePrice.toLocaleString()}</span>
                    </div>

                    {estimateData.additionalFees.map((fee, index) => (
                      <div key={index} className="flex justify-between items-center py-2 text-sm">
                        <div>
                          <span>{fee.name}</span>
                          <div className="text-xs text-gray-500">{fee.description}</div>
                        </div>
                        <span className="text-red-600">+₩{fee.amount.toLocaleString()}</span>
                      </div>
                    ))}

                    {estimateData.discounts.map((discount, index) => (
                      <div key={index} className="flex justify-between items-center py-2 text-sm">
                        <div>
                          <span className="text-green-600">{discount.name}</span>
                          <div className="text-xs text-gray-500">{discount.description}</div>
                        </div>
                        <span className="text-green-600">-₩{discount.amount.toLocaleString()}</span>
                      </div>
                    ))}

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">총 금액</span>
                        <span className="text-2xl font-bold text-red-600">
                          ₩{estimateData.totalPrice.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 text-right mt-1">부가세 포함</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 사이드바 */}
            <div className="space-y-6">
              {/* 액션 버튼들 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">견적 확정</CardTitle>
                  <CardDescription>견적을 확정하고 서비스를 신청하세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <EnhancedButton
                    fullWidth
                    gradient
                    onClick={handleConfirmEstimate}
                    className="text-base"
                    loading={saveEstimateMutation.isPending}
                    disabled={saveEstimateMutation.isPending}
                  >
                    {saveEstimateMutation.isPending ? '신청 중...' : '탁송 신청하기'}
                  </EnhancedButton>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <EnhancedButton
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadPDF}
                      icon={Download}
                    >
                      PDF 저장
                    </EnhancedButton>
                    <EnhancedButton
                      variant="outline"
                      size="sm"
                      onClick={handleShareEstimate}
                      icon={Share2}
                    >
                      공유하기
                    </EnhancedButton>
                  </div>
                </CardContent>
              </Card>

              {/* 고객 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">고객 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-500">고객명:</span>
                    <span className="ml-2 font-medium">{estimateData.customerName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">연락처:</span>
                    <span className="ml-2 font-medium">{estimateData.customerPhone}</span>
                  </div>
                  {estimateData.customerEmail && (
                    <div>
                      <span className="text-gray-500">이메일:</span>
                      <span className="ml-2 font-medium">{estimateData.customerEmail}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500">견적 일시:</span>
                    <span className="ml-2 font-medium">
                      {new Date(estimateData.createdAt).toLocaleString('ko-KR')}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* 연락처 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">문의 및 상담</CardTitle>
                  <CardDescription>추가 문의사항이 있으시면 연락주세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <EnhancedButton
                    fullWidth
                    variant="outline"
                    icon={Phone}
                    onClick={() => window.open(`tel:${config?.company.phone}`)}
                  >
                    전화 상담
                  </EnhancedButton>
                  <EnhancedButton
                    fullWidth
                    variant="outline"
                    icon={Mail}
                    onClick={() => window.open(`mailto:${config?.company.email}`)}
                  >
                    이메일 문의
                  </EnhancedButton>
                  
                  <div className="text-center text-xs text-gray-500 pt-2">
                    상담시간: {config?.company.businessHours}
                  </div>
                </CardContent>
              </Card>

              {/* 서비스 보장 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-green-600" />
                    서비스 보장
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>완전 보험 보장</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>실시간 위치 추적</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>전문 운송진</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>24시간 고객 지원</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 추가 안내 */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-4">견적 유효 기간 및 안내사항</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">견적 유효기간</h4>
                    <ul className="space-y-1">
                      <li>• 본 견적은 30일간 유효합니다</li>
                      <li>• 유가 및 요율 변동 시 가격 조정 가능</li>
                      <li>• 정확한 최종 견적은 차량 확인 후 확정</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">결제 및 취소</h4>
                    <ul className="space-y-1">
                      <li>• 현금, 카드, 계좌이체 가능</li>
                      <li>• 운송 24시간 전 취소 시 수수료 없음</li>
                      <li>• 당일 취소 시 30% 수수료 발생</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-center gap-4 text-blue-800">
                    <Star className="w-5 h-5" />
                    <span className="font-medium">고객 만족도 98% | 무사고 운송 | 신뢰의 10년 경력</span>
                    <Star className="w-5 h-5" />
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