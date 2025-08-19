'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { useCompany } from '@/contexts/CompanyContext';
import { 
  Phone, Clock, MapPin, Shield, Star, Users, 
  Car, CreditCard, CheckCircle, AlertCircle 
} from 'lucide-react';

export function DriverPage() {
  const { config, loading } = useCompany();

  if (loading || !config) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">로딩중...</div>;
  }

  const features = [
    {
      icon: Clock,
      title: '24시간 운영',
      description: '언제든지 호출 가능한 24시간 서비스'
    },
    {
      icon: Users,
      title: '숙련된 기사진',
      description: '경력 5년 이상의 전문 대리기사'
    },
    {
      icon: Shield,
      title: '완전 보험',
      description: '종합보험 가입으로 안전 보장'
    },
    {
      icon: CreditCard,
      title: '합리적 요금',
      description: '투명하고 공정한 요금 체계'
    },
    {
      icon: Car,
      title: '모든 차종',
      description: '승용차부터 대형차까지 운전 가능'
    },
    {
      icon: Star,
      title: '고객 만족',
      description: '98% 고객 만족도 달성'
    }
  ];

  const serviceAreas = [
    '제주시 전 지역',
    '서귀포시 전 지역', 
    '한림읍, 애월읍',
    '조천읍, 구좌읍',
    '성산읍, 표선면',
    '남원읍, 안덕면'
  ];

  const priceInfo = [
    { distance: '기본요금 (5km 이내)', price: '15,000원', note: '심야 할증 20%' },
    { distance: '추가요금 (1km당)', price: '1,500원', note: '고속도로 톨비 별도' },
    { distance: '시간 대기료 (10분당)', price: '2,000원', note: '무료 대기 10분' },
    { distance: '장거리 할인', price: '협의', note: '50km 이상 시 할인' }
  ];

  const safetyRules = [
    '음주운전 절대 금지',
    '안전벨트 착용 의무',
    '교통법규 준수',
    '친절한 서비스 제공',
    '고객 차량 안전 관리',
    '개인정보 보호'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <ResponsiveContainer>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-jua">
              {config.designatedDriver.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              24시간 언제든지, 안전하고 빠른 대리운전
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
                icon={Phone}
                onClick={() => window.open(`tel:${config.designatedDriver.phone}`)}
              >
                지금 바로 호출: {config.designatedDriver.phone}
              </EnhancedButton>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* 주요 특징 */}
      <section className="py-16">
        <ResponsiveContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">왜 번개 대리운전인가요?</h2>
            <p className="text-gray-600">안전하고 신속한 서비스를 위한 6가지 약속</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0">
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ResponsiveContainer>
      </section>

      {/* 상세 정보 탭 */}
      <section className="py-16 bg-white">
        <ResponsiveContainer>
          <Tabs defaultValue="service" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="service">서비스 안내</TabsTrigger>
              <TabsTrigger value="area">서비스 지역</TabsTrigger>
              <TabsTrigger value="price">요금 안내</TabsTrigger>
              <TabsTrigger value="safety">안전 수칙</TabsTrigger>
            </TabsList>
            
            <TabsContent value="service" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      운영 시간
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">평일/주말</span>
                        <Badge variant="outline" className="text-blue-600 border-blue-200">
                          24시간 운영
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>• 365일 연중무휴 서비스</p>
                        <p>• 평균 대기시간: 15-30분</p>
                        <p>• 심야시간(22시~06시) 20% 할증</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Car className="w-5 h-5 mr-2 text-blue-600" />
                      운전 가능 차종
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">경차, 소형차, 중형차</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">대형차, SUV</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">승합차 (11인승 이하)</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">자동/수동 변속기 모두</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        <span className="text-sm">화물차는 사전 문의 필요</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>이용 방법</CardTitle>
                  <CardDescription>간단한 3단계로 대리운전을 호출하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                        1
                      </div>
                      <h4 className="font-semibold mb-2">전화 호출</h4>
                      <p className="text-sm text-gray-600">
                        {config.designatedDriver.phone}로<br />
                        전화하여 위치와 목적지 알려주세요
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                        2
                      </div>
                      <h4 className="font-semibold mb-2">기사 배치</h4>
                      <p className="text-sm text-gray-600">
                        가까운 곳의 기사가<br />
                        15-30분 내 도착합니다
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                        3
                      </div>
                      <h4 className="font-semibold mb-2">안전 운전</h4>
                      <p className="text-sm text-gray-600">
                        목적지까지<br />
                        안전하고 편안하게 모셔드립니다
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="area" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    서비스 제공 지역
                  </CardTitle>
                  <CardDescription>제주도 전 지역에서 서비스 제공</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {serviceAreas.map((area, index) => (
                      <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="font-medium">{area}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">특별 안내</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 도심 외곽 지역: 추가 시간이 소요될 수 있습니다</li>
                      <li>• 산간 지역: 기상 조건에 따라 서비스가 제한될 수 있습니다</li>
                      <li>• 공항/항구: 24시간 서비스 가능</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="price" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                    요금 체계
                  </CardTitle>
                  <CardDescription>투명하고 합리적인 요금 안내</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="bg-blue-50">
                          <th className="border border-gray-200 p-3 text-left">구분</th>
                          <th className="border border-gray-200 p-3 text-left">요금</th>
                          <th className="border border-gray-200 p-3 text-left">비고</th>
                        </tr>
                      </thead>
                      <tbody>
                        {priceInfo.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border border-gray-200 p-3">{item.distance}</td>
                            <td className="border border-gray-200 p-3 font-semibold text-blue-600">
                              {item.price}
                            </td>
                            <td className="border border-gray-200 p-3 text-sm text-gray-600">
                              {item.note}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">요금 안내</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• 결제 방법: 현금, 카드 모두 가능</li>
                      <li>• 영수증 발행 가능 (세금계산서 포함)</li>
                      <li>• 취소 수수료: 배차 후 취소 시 5,000원</li>
                      <li>• 대기료: 약속 시간 초과 시 10분당 2,000원</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="safety" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-blue-600" />
                      안전 수칙
                    </CardTitle>
                    <CardDescription>안전한 서비스를 위한 기본 원칙</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {safetyRules.map((rule, index) => (
                        <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <span className="text-sm">{rule}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>보험 및 보장</CardTitle>
                    <CardDescription>고객과 차량의 안전을 위한 완벽한 보장</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-1">종합보험 가입</h4>
                        <p className="text-sm text-green-600">
                          모든 대리기사는 종합보험에 가입되어 있어 사고 시 완전 보상
                        </p>
                      </div>
                      
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-1">신원보증</h4>
                        <p className="text-sm text-blue-600">
                          모든 기사진은 신원조회 및 운전경력 검증 완료
                        </p>
                      </div>
                      
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-1">24시간 고객센터</h4>
                        <p className="text-sm text-purple-600">
                          서비스 중 문제 발생 시 즉시 대응 가능한 고객센터 운영
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </ResponsiveContainer>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <ResponsiveContainer>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">지금 바로 대리운전을 호출하세요</h2>
            <p className="text-xl mb-8 opacity-90">
              24시간 언제든지, 안전하고 빠른 서비스
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
                icon={Phone}
                onClick={() => window.open(`tel:${config.designatedDriver.phone}`)}
              >
                지금 바로 호출: {config.designatedDriver.phone}
              </EnhancedButton>
            </div>
            <p className="mt-4 text-blue-100">
              평균 대기시간 15-30분 | 심야할증 20% (22시-06시)
            </p>
          </div>
        </ResponsiveContainer>
      </section>
    </div>
  );
}