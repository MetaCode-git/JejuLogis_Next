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
  Phone, Mail, MapPin, Clock, Building, Users, Shield, 
  Truck, Star, Award, CheckCircle 
} from 'lucide-react';
import Image from 'next/image';

export function CompanyPage() {
  const { config, loading } = useCompany();

  if (loading || !config) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">로딩중...</div>;
  }

  const services = [
    {
      title: '차량 탁송',
      description: '제주도 내외 모든 지역으로 안전한 차량 운송',
      features: ['전문 운송진', '실시간 위치 추적', '완전 보험 보장'],
      icon: Truck
    },
    {
      title: '대리운전',
      description: '24시간 언제든지 이용 가능한 대리운전 서비스',
      features: ['24시간 운영', '숙련된 기사진', '합리적인 요금'],
      icon: Users
    },
    {
      title: '차량 위탁',
      description: '장기간 안전한 차량 보관 서비스',
      features: ['안전한 보관', '정기 점검', '24시간 보안'],
      icon: Shield
    }
  ];

  const faqs = [
    {
      question: '탁송 비용은 어떻게 계산되나요?',
      answer: '차량 크기, 운송 거리, 날짜, 추가 서비스 등을 종합적으로 고려하여 산정됩니다. 정확한 견적은 견적 신청을 통해 확인하실 수 있습니다.'
    },
    {
      question: '운송 중 차량에 문제가 생기면 어떻게 하나요?',
      answer: '모든 운송 차량은 종합보험에 가입되어 있으며, 운송 중 발생하는 모든 사고에 대해 완전 보상해드립니다. 또한 실시간 모니터링을 통해 안전을 관리합니다.'
    },
    {
      question: '운송 기간은 얼마나 걸리나요?',
      answer: '제주도 내 운송은 일반적으로 2-4시간, 육지 간 운송은 1-2일 정도 소요됩니다. 정확한 시간은 거리와 교통상황에 따라 달라집니다.'
    },
    {
      question: '예약 취소나 변경이 가능한가요?',
      answer: '운송 24시간 전까지는 무료 취소 및 변경이 가능합니다. 그 이후에는 부분 취소 수수료가 발생할 수 있습니다.'
    },
    {
      question: '운송 가능한 차량에 제한이 있나요?',
      answer: '일반 승용차부터 SUV, 소형 화물차까지 대부분의 차량 운송이 가능합니다. 대형 화물차나 특수 차량의 경우 사전 문의 바랍니다.'
    }
  ];

  const achievements = [
    { icon: Award, title: '10년+ 경력', description: '축적된 노하우와 경험' },
    { icon: Star, title: '고객 만족도 98%', description: '검증된 서비스 품질' },
    { icon: CheckCircle, title: '무사고 운송', description: '안전 제일 운송 서비스' },
    { icon: Users, title: '연간 5,000+', description: '많은 고객의 신뢰' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <ResponsiveContainer>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-jua">
              {config.company.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              믿을 수 있는 제주도 차량 운송 전문업체
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg py-2 px-4">
                <Building className="w-4 h-4 mr-2" />
                사업자등록번호: {config.company.businessNumber}
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4">
                <Users className="w-4 h-4 mr-2" />
                대표: {config.company.ownerName}
              </Badge>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* 실적 및 성과 */}
      <section className="py-16">
        <ResponsiveContainer>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <Card key={index} className="text-center border-0 shadow-md">
                <CardContent className="p-6">
                  <item.icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ResponsiveContainer>
      </section>

      {/* 주요 정보 탭 */}
      <section className="py-16 bg-white">
        <ResponsiveContainer>
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services">서비스 소개</TabsTrigger>
              <TabsTrigger value="company">회사 정보</TabsTrigger>
              <TabsTrigger value="contact">연락처</TabsTrigger>
            </TabsList>
            
            <TabsContent value="services" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <service.icon className="w-12 h-12 text-red-600 mb-4" />
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="company" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>회사 개요</CardTitle>
                  <CardDescription>
                    {config.company.name}의 상세 정보입니다
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">기본 정보</h3>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">회사명:</span> {config.company.name}</div>
                          <div><span className="font-medium">대표:</span> {config.company.ownerName}</div>
                          <div><span className="font-medium">사업자등록번호:</span> {config.company.businessNumber}</div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">계좌 정보</h3>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">은행:</span> {config.company.bankInfo.bankName}</div>
                          <div><span className="font-medium">계좌번호:</span> {config.company.bankInfo.accountNumber}</div>
                          <div><span className="font-medium">예금주:</span> {config.company.bankInfo.accountHolder}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">서비스 영역</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            제주도 전 지역 차량 탁송
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            제주↔육지 간 차량 운송
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            24시간 대리운전 서비스
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            장단기 차량 위탁 보관
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contact" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>연락처 정보</CardTitle>
                    <CardDescription>언제든지 문의해주세요</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="font-medium">{config.company.phone}</div>
                        <div className="text-sm text-gray-500">24시간 상담 가능</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="font-medium">{config.company.email}</div>
                        <div className="text-sm text-gray-500">이메일 문의</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="font-medium">{config.company.businessHours}</div>
                        <div className="text-sm text-gray-500">운영 시간</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-red-600 mt-1" />
                      <div>
                        <div className="font-medium">사업장 주소</div>
                        <div className="text-sm text-gray-600">{config.company.address}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>빠른 연락</CardTitle>
                    <CardDescription>즉시 상담을 원하시면</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <EnhancedButton
                      fullWidth
                      size="lg"
                      gradient
                      icon={Phone}
                      onClick={() => window.open(`tel:${config.company.phone}`)}
                    >
                      지금 전화하기
                    </EnhancedButton>
                    
                    <EnhancedButton
                      fullWidth
                      variant="outline"
                      icon={Mail}
                      onClick={() => window.open(`mailto:${config.company.email}`)}
                    >
                      이메일 보내기
                    </EnhancedButton>
                    
                    <div className="text-center text-sm text-gray-500 pt-4">
                      급하신 경우 전화 상담이 가장 빠릅니다
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </ResponsiveContainer>
      </section>

      {/* FAQ 섹션 */}
      <section className="py-16">
        <ResponsiveContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <p className="text-gray-600">궁금한 점이 있으시면 확인해보세요</p>
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
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <ResponsiveContainer>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">지금 바로 견적을 받아보세요</h2>
            <p className="text-xl mb-8 opacity-90">
              빠르고 정확한 견적으로 최적의 서비스를 제공합니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton
                size="lg"
                variant="secondary"
                className="bg-white text-red-600 hover:bg-gray-100"
                asChild
              >
                <a href="/estimate">견적 신청하기</a>
              </EnhancedButton>
              <EnhancedButton
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600"
                icon={Phone}
                onClick={() => window.open(`tel:${config.company.phone}`)}
              >
                바로 전화하기
              </EnhancedButton>
            </div>
          </div>
        </ResponsiveContainer>
      </section>
    </div>
  );
}