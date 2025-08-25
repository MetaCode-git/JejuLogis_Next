'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { useCompany } from '@/contexts/CompanyContext';
import { 
  Phone, Shield, Clock, MapPin, Building, CreditCard, 
  CheckCircle, AlertTriangle, Car, Camera, FileText, Star 
} from 'lucide-react';

export function ConsignPage() {
  const { config, loading } = useCompany();

  if (loading || !config) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">로딩중...</div>;
  }

  const services = [
    {
      icon: Clock,
      title: '단기 위탁',
      description: '1개월 미만 단기간 차량 보관',
      features: ['최소 1일부터', '유연한 기간 설정', '24시간 출입 가능'],
      price: '일 15,000원부터'
    },
    {
      icon: Building,
      title: '장기 위탁',
      description: '1개월 이상 장기간 차량 보관',
      features: ['할인 혜택', '정기 점검 서비스', '월별 정산'],
      price: '월 300,000원부터'
    },
    {
      icon: Shield,
      title: '프리미엄 보관',
      description: '고급차 전용 실내 보관 서비스',
      features: ['실내 보관', '개별 관리', '보안 강화'],
      price: '월 500,000원부터'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: '완전 보안',
      description: '24시간 CCTV 감시와 보안 시스템'
    },
    {
      icon: Car,
      title: '정기 점검',
      description: '주기적인 차량 상태 점검 서비스'
    },
    {
      icon: Camera,
      title: '실시간 모니터링',
      description: '언제든지 차량 상태 확인 가능'
    },
    {
      icon: FileText,
      title: '투명한 관리',
      description: '보관 내역과 점검 기록 제공'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: '상담 및 계약',
      description: '위탁 기간과 조건 상담 후 계약 진행'
    },
    {
      step: 2,
      title: '차량 인수',
      description: '차량 상태 점검 후 안전한 보관 장소로 이동'
    },
    {
      step: 3,
      title: '보관 관리',
      description: '정기 점검과 관리를 통한 차량 상태 유지'
    },
    {
      step: 4,
      title: '차량 인도',
      description: '위탁 종료 시 완벽한 상태로 차량 인도'
    }
  ];

  const priceTable = [
    { period: '1일', price: '15,000원', note: '최소 이용 단위' },
    { period: '1주일 (7일)', price: '90,000원', note: '일일 요금 대비 14% 할인' },
    { period: '1개월 (30일)', price: '300,000원', note: '일일 요금 대비 33% 할인' },
    { period: '3개월', price: '800,000원', note: '월 요금 대비 11% 할인' },
    { period: '6개월', price: '1,500,000원', note: '월 요금 대비 17% 할인' },
    { period: '1년', price: '2,800,000원', note: '월 요금 대비 22% 할인' }
  ];

  const faqs = [
    {
      question: '위탁 가능한 차량에 제한이 있나요?',
      answer: '일반 승용차부터 SUV, 소형 화물차까지 대부분의 차량 위탁이 가능합니다. 대형 화물차나 특수 차량의 경우 사전 상담을 통해 가능 여부를 확인해드립니다.'
    },
    {
      question: '위탁 중 차량을 찾아갈 수 있나요?',
      answer: '24시간 전 사전 연락을 주시면 언제든지 차량을 찾아가실 수 있습니다. 단기 위탁의 경우 추가 비용 없이 이용 가능합니다.'
    },
    {
      question: '차량에 문제가 생기면 어떻게 되나요?',
      answer: '위탁 중 발생하는 모든 문제는 당사 책임 하에 완전 보상해드립니다. 또한 정기 점검을 통해 사전에 문제를 예방합니다.'
    },
    {
      question: '보험은 어떻게 되나요?',
      answer: '위탁 차량은 모두 종합보험에 가입되어 있어 화재, 도난, 파손 등 모든 사고에 대해 보상됩니다. 보험료는 위탁비에 포함되어 있습니다.'
    },
    {
      question: '결제는 어떻게 하나요?',
      answer: '현금, 계좌이체, 카드 결제 모두 가능합니다. 장기 위탁의 경우 월별 자동 결제 시스템도 이용하실 수 있습니다.'
    }
  ];

  const safetyFeatures = [
    '24시간 CCTV 감시 시스템',
    '출입 통제 보안 시스템', 
    '화재 감지 및 진압 시설',
    '정기적인 보안 순찰',
    '개별 차량 잠금 장치',
    '보험 가입 완료'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <ResponsiveContainer maxWidth="1280">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-jua">
              차량 위탁 서비스
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              안전하고 편리한 장단기 차량 보관 서비스
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton
                size="lg"
                variant="secondary"
                className="bg-white text-green-600 hover:bg-gray-100"
                icon={Phone}
                onClick={() => window.open(`tel:${config.company.phone}`)}
              >
                상담 신청: {config.company.phone}
              </EnhancedButton>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* 서비스 유형 */}
      <section className="py-16">
        <ResponsiveContainer maxWidth="1280">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">위탁 서비스 유형</h2>
            <p className="text-gray-600">다양한 기간과 요구사항에 맞는 위탁 서비스</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0">
                <CardHeader>
                  <service.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                    <div className="pt-4 border-t">
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {service.price}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ResponsiveContainer>
      </section>

      {/* 주요 특징 */}
      <section className="py-16 bg-white">
        <ResponsiveContainer maxWidth="1280">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">왜 제주탁송 위탁 서비스인가요?</h2>
            <p className="text-gray-600">안전하고 신뢰할 수 있는 4가지 핵심 서비스</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-md">
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ResponsiveContainer>
      </section>

      {/* 상세 정보 탭 */}
      <section className="py-16">
        <ResponsiveContainer maxWidth="1280">
          <Tabs defaultValue="process" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="process">이용 절차</TabsTrigger>
              <TabsTrigger value="price">요금 안내</TabsTrigger>
              <TabsTrigger value="safety">보안 시설</TabsTrigger>
              <TabsTrigger value="terms">이용 약관</TabsTrigger>
            </TabsList>
            
            <TabsContent value="process" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>위탁 서비스 이용 절차</CardTitle>
                  <CardDescription>간단한 4단계로 안전한 차량 위탁</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {processSteps.map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                          {step.step}
                        </div>
                        <h4 className="font-semibold mb-2">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">필수 준비물</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• 차량등록증 및 신분증</li>
                      <li>• 자동차보험증서</li>
                      <li>• 위탁 계약서 (현장 작성)</li>
                      <li>• 차량 열쇠 (스페어키 포함)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="price" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                    위탁 요금 안내
                  </CardTitle>
                  <CardDescription>기간별 할인 혜택으로 더욱 합리적인 가격</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="bg-green-50">
                          <th className="border border-gray-200 p-3 text-left">기간</th>
                          <th className="border border-gray-200 p-3 text-left">요금</th>
                          <th className="border border-gray-200 p-3 text-left">할인 혜택</th>
                        </tr>
                      </thead>
                      <tbody>
                        {priceTable.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border border-gray-200 p-3 font-medium">{item.period}</td>
                            <td className="border border-gray-200 p-3 font-semibold text-green-600">
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

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">포함 서비스</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• 보안 시설 이용</li>
                        <li>• 정기 점검 서비스</li>
                        <li>• 종합보험 가입</li>
                        <li>• 24시간 관리</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">추가 옵션</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• 세차 서비스: 월 50,000원</li>
                        <li>• 실내 보관: 월 +100,000원</li>
                        <li>• 배터리 관리: 월 20,000원</li>
                        <li>• 정기 시동: 무료</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="safety" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-600" />
                      보안 시설
                    </CardTitle>
                    <CardDescription>최첨단 보안 시설로 완벽한 차량 보호</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {safetyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>보관 환경</CardTitle>
                    <CardDescription>차량을 위한 최적의 보관 조건</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-1">실외 보관장</h4>
                        <p className="text-sm text-green-600">
                          넓은 공간과 통풍이 잘되는 야외 보관 시설
                        </p>
                      </div>
                      
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-1">실내 보관고</h4>
                        <p className="text-sm text-blue-600">
                          고급차 전용 실내 보관으로 완벽한 컨디션 유지
                        </p>
                      </div>
                      
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-1">정기 관리</h4>
                        <p className="text-sm text-purple-600">
                          주 1회 점검과 월 1회 시동을 통한 차량 관리
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="terms" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>이용 약관 및 주의사항</CardTitle>
                  <CardDescription>위탁 서비스 이용 전 반드시 확인해주세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">이용 조건</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• 차량 등록증과 신분증 확인 후 위탁 가능</li>
                        <li>• 자동차보험 가입 차량만 위탁 가능</li>
                        <li>• 차량 내 귀중품은 사전에 제거 필수</li>
                        <li>• 연료는 1/4 이상 유지 권장</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">취소 및 변경</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• 위탁 개시 24시간 전까지 무료 취소</li>
                        <li>• 기간 연장은 언제든지 가능</li>
                        <li>• 조기 종료 시 일할 계산으로 환불</li>
                        <li>• 변경 사항은 24시간 전 사전 연락</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        면책 사항
                      </h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• 차량 내 분실물에 대한 책임 불가</li>
                        <li>• 자연재해로 인한 손실은 보험사 약관 적용</li>
                        <li>• 위탁 기간 만료 후 7일 경과 시 추가 요금 발생</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </ResponsiveContainer>
      </section>

      {/* FAQ 섹션 */}
      <section className="py-16 bg-white">
        <ResponsiveContainer maxWidth="1280">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <p className="text-gray-600">위탁 서비스에 대한 궁금한 점들</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ResponsiveContainer>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <ResponsiveContainer maxWidth="1280">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">안전한 차량 위탁 서비스</h2>
            <p className="text-xl mb-8 opacity-90">
              소중한 차량을 믿고 맡겨주세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton
                size="lg"
                variant="secondary"
                className="bg-white text-green-600 hover:bg-gray-100"
                asChild
              >
                <a href="/estimate">견적 신청하기</a>
              </EnhancedButton>
              <EnhancedButton
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600"
                icon={Phone}
                onClick={() => window.open(`tel:${config.company.phone}`)}
              >
                상담 전화: {config.company.phone}
              </EnhancedButton>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-green-100">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span className="text-sm">고객 만족도 98%</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">완전 보험 보장</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">24시간 관리</span>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </section>
    </div>
  );
}