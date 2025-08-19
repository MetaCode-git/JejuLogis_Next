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
  Shield, Phone, CheckCircle, AlertTriangle, CreditCard, Clock, 
  FileText, Car, Users, Building, Award, Star, DollarSign 
} from 'lucide-react';

export function InsurancePage() {
  const { config, loading } = useCompany();

  if (loading || !config) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">로딩중...</div>;
  }

  const insuranceTypes = [
    {
      icon: Car,
      title: '운송보험',
      description: '차량 운송 중 발생할 수 있는 모든 손해를 보장',
      coverage: [
        '차량 손상 및 파손',
        '화재, 폭발, 절도',
        '자연재해 (태풍, 홍수 등)',
        '운송 중 교통사고'
      ],
      limit: '차량 가격의 100%까지',
      premium: '운송비의 1-3%'
    },
    {
      icon: Building,
      title: '시설배상보험',
      description: '보관 시설에서 발생하는 사고에 대한 배상보험',
      coverage: [
        '보관 중 차량 손상',
        '시설 화재로 인한 손해',
        '도난 및 절도',
        '시설 관리상 과실'
      ],
      limit: '사고당 최대 5억원',
      premium: '연간 200만원 (전체)'
    },
    {
      icon: Users,
      title: '종업원배상보험',
      description: '운송 및 관리 직원의 업무상 사고 보장',
      coverage: [
        '업무 중 부상 치료비',
        '장애 발생 시 보상',
        '사망 시 유족 보상',
        '법적 배상 책임'
      ],
      limit: '사고당 최대 3억원',
      premium: '월 50만원'
    }
  ];

  const claimProcess = [
    {
      step: 1,
      title: '사고 발생 신고',
      description: '사고 발생 즉시 당사 및 보험사에 신고',
      timeframe: '사고 발생 즉시'
    },
    {
      step: 2,
      title: '현장 조사',
      description: '보험사 조사원의 현장 조사 및 손해 확인',
      timeframe: '신고 후 24시간 이내'
    },
    {
      step: 3,
      title: '손해 사정',
      description: '전문 사정사의 손해액 산정 및 보상 범위 결정',
      timeframe: '조사 완료 후 3-5일'
    },
    {
      step: 4,
      title: '보상금 지급',
      description: '확정된 손해액에 따른 보상금 지급',
      timeframe: '사정 완료 후 7-14일'
    }
  ];

  const coverageDetails = [
    {
      category: '차량 손해',
      items: [
        { type: '전손', coverage: '차량 시가 100%', note: '수리불가 또는 수리비가 시가의 80% 초과시' },
        { type: '분손', coverage: '실제 수리비 100%', note: '부품비, 공임비, 도장비 포함' },
        { type: '도난', coverage: '차량 시가 100%', note: '신고 후 30일 경과시 전손 처리' }
      ]
    },
    {
      category: '부대비용',
      items: [
        { type: '견인비', coverage: '실비 100%', note: '사고 현장에서 정비소까지' },
        { type: '보관비', coverage: '1일 5만원 한도', note: '최대 30일까지 지원' },
        { type: '대차비', coverage: '1일 10만원 한도', note: '수리 기간 중 대차 이용시' }
      ]
    }
  ];

  const faqs = [
    {
      question: '보험 가입은 필수인가요?',
      answer: '네, 모든 운송 및 위탁 서비스는 보험 가입이 필수입니다. 고객의 소중한 차량을 보호하기 위해 당사에서 일괄적으로 보험에 가입하여 서비스를 제공합니다.'
    },
    {
      question: '보험료는 누가 부담하나요?',
      answer: '운송보험료는 서비스 이용료에 포함되어 있어 고객이 별도로 부담하실 필요가 없습니다. 시설배상보험과 종업원배상보험은 당사에서 부담합니다.'
    },
    {
      question: '사고 발생시 어떻게 해야 하나요?',
      answer: '사고 발생 즉시 당사 고객센터(064-123-4567)로 연락주시면, 보험사 신고와 현장 조사를 신속히 진행해드립니다. 24시간 사고 접수가 가능합니다.'
    },
    {
      question: '보상 한도는 어떻게 되나요?',
      answer: '차량의 실제 시가를 기준으로 100% 보상해드립니다. 고가 차량의 경우 사전에 차량 가치를 평가하여 보험 가입액을 조정합니다.'
    },
    {
      question: '보상받지 못하는 경우가 있나요?',
      answer: '고의 또는 중과실, 무면허 운전, 음주운전 등 약관에서 정한 면책사유에 해당하는 경우 보상이 제한될 수 있습니다. 자연재해는 보상 대상입니다.'
    },
    {
      question: '보험금 지급은 얼마나 걸리나요?',
      answer: '사고 신고 후 평균 2-3주 내에 보험금이 지급됩니다. 단순한 사고의 경우 1주일 내 지급도 가능하며, 복잡한 사안은 추가 시간이 필요할 수 있습니다.'
    }
  ];

  const exclusions = [
    '고의 또는 중대한 과실로 인한 사고',
    '무면허, 음주, 약물복용 상태에서 발생한 사고',  
    '전쟁, 내란, 폭동으로 인한 손해',
    '핵위험으로 인한 손해',
    '차량 내 개인 소지품 분실',
    '정상적인 사용으로 인한 마모, 부식'
  ];

  const benefits = [
    {
      icon: Shield,
      title: '완전 보장',
      description: '차량 시가의 100%까지 완전 보장',
      highlight: '무제한 보장'
    },
    {
      icon: Clock,
      title: '신속 처리',
      description: '24시간 사고 접수 및 신속한 보상 처리',
      highlight: '평균 2주 지급'
    },
    {
      icon: Award,
      title: '우수 보험사',
      description: '신뢰할 수 있는 대형 보험사와 제휴',
      highlight: '재무건전성 우수'
    },
    {
      icon: DollarSign,
      title: '합리적 비용',
      description: '서비스 이용료에 포함된 보험료',
      highlight: '추가 부담 없음'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-20">
        <ResponsiveContainer>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-jua">
              보험 안내
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              완벽한 보장으로 안전한 운송 서비스
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-lg py-2 px-4">
                <Shield className="w-4 h-4 mr-2" />
                100% 완전 보장
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4">
                <Clock className="w-4 h-4 mr-2" />
                24시간 접수
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4">
                <Award className="w-4 h-4 mr-2" />
                대형 보험사 제휴
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton
                size="lg"
                variant="secondary"
                className="bg-white text-indigo-600 hover:bg-gray-100"
                icon={Phone}
                onClick={() => window.open(`tel:${config.company.phone}`)}
              >
                보험 상담: {config.company.phone}
              </EnhancedButton>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* 보장 혜택 */}
      <section className="py-16">
        <ResponsiveContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">왜 제주탁송 보험인가요?</h2>
            <p className="text-gray-600">안전하고 신뢰할 수 있는 4가지 보장 혜택</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <benefit.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{benefit.description}</p>
                  <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                    {benefit.highlight}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </ResponsiveContainer>
      </section>

      {/* 보험 유형 */}
      <section className="py-16 bg-white">
        <ResponsiveContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">보험 종류 및 보장 내용</h2>
            <p className="text-gray-600">다양한 보험으로 완벽한 보장</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {insuranceTypes.map((insurance, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <insurance.icon className="w-12 h-12 text-indigo-600 mb-4" />
                  <CardTitle>{insurance.title}</CardTitle>
                  <CardDescription>{insurance.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">보장 내용</h4>
                      <ul className="space-y-1">
                        {insurance.coverage.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center text-sm">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 pt-3 border-t">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">보장 한도:</span>
                        <span className="font-medium text-indigo-600">{insurance.limit}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">보험료:</span>
                        <span className="font-medium">{insurance.premium}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ResponsiveContainer>
      </section>

      {/* 상세 정보 탭 */}
      <section className="py-16">
        <ResponsiveContainer>
          <Tabs defaultValue="coverage" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="coverage">보장 범위</TabsTrigger>
              <TabsTrigger value="process">보상 절차</TabsTrigger>
              <TabsTrigger value="exclusions">면책 사항</TabsTrigger>
              <TabsTrigger value="partners">제휴 보험사</TabsTrigger>
            </TabsList>
            
            <TabsContent value="coverage" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>상세 보장 범위</CardTitle>
                  <CardDescription>사고 유형별 보장 내용과 한도</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {coverageDetails.map((section, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-lg mb-4 text-indigo-700">{section.category}</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-200 rounded-lg">
                            <thead>
                              <tr className="bg-indigo-50">
                                <th className="border border-gray-200 p-3 text-left">구분</th>
                                <th className="border border-gray-200 p-3 text-left">보장 내용</th>
                                <th className="border border-gray-200 p-3 text-left">비고</th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.items.map((item, itemIndex) => (
                                <tr key={itemIndex} className={itemIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="border border-gray-200 p-3 font-medium">{item.type}</td>
                                  <td className="border border-gray-200 p-3 text-indigo-600 font-semibold">
                                    {item.coverage}
                                  </td>
                                  <td className="border border-gray-200 p-3 text-sm text-gray-600">
                                    {item.note}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="process" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>사고 처리 및 보상 절차</CardTitle>
                  <CardDescription>신속하고 정확한 4단계 보상 프로세스</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {claimProcess.map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                          {step.step}
                        </div>
                        <h4 className="font-semibold mb-2">{step.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                        <Badge variant="outline" className="text-indigo-600 border-indigo-200 text-xs">
                          {step.timeframe}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-800 mb-3">24시간 사고 신고센터</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-blue-800">{config.company.phone}</div>
                          <div className="text-sm text-blue-600">당사 고객센터</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-blue-800">1588-0000</div>
                          <div className="text-sm text-blue-600">보험사 직통</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="exclusions" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                    보상 제외 사항 (면책)
                  </CardTitle>
                  <CardDescription>다음의 경우 보상이 제한될 수 있습니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {exclusions.map((exclusion, index) => (
                        <div key={index} className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
                          <AlertTriangle className="w-4 h-4 text-red-500 mr-3 mt-0.5" />
                          <span className="text-sm text-red-800">{exclusion}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">참고사항</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• 위 사항에 해당하는 경우라도 고객과의 협의를 통해 일부 보상이 가능할 수 있습니다</li>
                        <li>• 자세한 면책 조항은 보험 약관을 참고하시기 바랍니다</li>
                        <li>• 사고 발생시 정확한 사실 관계 확인 후 보상 여부가 결정됩니다</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="partners" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>제휴 보험사</CardTitle>
                  <CardDescription>신뢰할 수 있는 대형 보험사와의 파트너십</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Building className="w-6 h-6 text-blue-600 mr-3" />
                          <h4 className="font-semibold">삼성화재해상보험</h4>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 운송보험 전문</li>
                          <li>• 신속한 사고 처리</li>
                          <li>• 전국 네트워크 보유</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Building className="w-6 h-6 text-green-600 mr-3" />
                          <h4 className="font-semibold">현대해상화재보험</h4>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 시설배상책임보험</li>
                          <li>• 24시간 고객 서비스</li>
                          <li>• 우수한 재무건전성</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">보험사 선택 기준</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-sm">재무건전성 평가 A등급 이상</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-sm">운송보험 전문성 보유</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-sm">신속한 보상 처리 시스템</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-sm">전국 서비스 네트워크</span>
                        </li>
                      </ul>
                      
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-semibold mb-2">보험 문의</h5>
                        <p className="text-sm text-gray-600 mb-2">
                          보험 관련 자세한 상담은 고객센터로 연락주세요
                        </p>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm font-medium">{config.company.phone}</span>
                        </div>
                      </div>
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
        <ResponsiveContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">보험 관련 자주 묻는 질문</h2>
            <p className="text-gray-600">보험에 대한 궁금한 점들</p>
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
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <ResponsiveContainer>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">안심하고 이용하세요</h2>
            <p className="text-xl mb-8 opacity-90">
              완벽한 보험 보장으로 소중한 차량을 안전하게
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton
                size="lg"
                variant="secondary"
                className="bg-white text-indigo-600 hover:bg-gray-100"
                asChild
              >
                <a href="/estimate">견적 신청하기</a>
              </EnhancedButton>
              <EnhancedButton
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-indigo-600"
                icon={Phone}
                onClick={() => window.open(`tel:${config.company.phone}`)}
              >
                보험 상담: {config.company.phone}
              </EnhancedButton>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-indigo-100">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">100% 완전 보장</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="text-sm">대형 보험사 제휴</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">24시간 접수</span>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </section>
    </div>
  );
}