'use client';

import React, { useState } from 'react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { DatePicker } from '@/components/ui/date-picker';
import { Carousel } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StepProgress } from '@/components/ui/step-progress';
import { SearchBox } from '@/components/ui/search-box';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Calendar, Search, Download, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function ComponentsTestPage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  // 캐러셀 데이터
  const carouselSlides = [
    {
      id: '1',
      image: '/assets/images/new_banner/pc_01.jpg',
      title: '제주탁송 서비스',
      description: '안전하고 빠른 차량 운송'
    },
    {
      id: '2', 
      image: '/assets/images/new_banner/pc_02.jpg',
      title: '번개 대리운전',
      description: '24시간 언제든지'
    },
    {
      id: '3',
      image: '/assets/images/new_banner/pc_03.jpg',
      title: '차량 위탁',
      description: '믿을 수 있는 서비스'
    }
  ];

  // 진행 단계 데이터
  const steps = [
    { id: '1', title: '차량 정보', description: '차량 선택', completed: true },
    { id: '2', title: '운송 정보', description: '출발/도착지', current: true },
    { id: '3', title: '연락처', description: '고객 정보' },
    { id: '4', title: '견적 완료', description: '최종 확인' }
  ];

  const handleButtonTest = async () => {
    setLoading(true);
    toast.success('버튼 테스트 시작!');
    
    // 2초 후 완료
    setTimeout(() => {
      setLoading(false);
      toast.success('테스트 완료!');
    }, 2000);
  };

  // 모의 주소 검색
  const handleAddressSearch = async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // 지연 시뮬레이션
    
    return [
      {
        id: '1',
        address: '제주특별자치도 제주시 ' + query,
        roadAddress: '제주특별자치도 제주시 중앙로 ' + query + '번길',
        zipcode: '63166'
      },
      {
        id: '2', 
        address: '제주특별자치도 서귀포시 ' + query,
        roadAddress: '제주특별자치도 서귀포시 중정로 ' + query,
        zipcode: '63565'
      }
    ];
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8">
        <ResponsiveContainer>
          <div className="space-y-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                컴포넌트 테스트 페이지
              </h1>
              <p className="text-gray-600">
                개발된 UI 컴포넌트들을 테스트해볼 수 있습니다
              </p>
            </div>

            {/* Enhanced Button */}
            <Card>
              <CardHeader>
                <CardTitle>Enhanced Button</CardTitle>
                <CardDescription>다양한 버튼 스타일과 상태</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <EnhancedButton>기본 버튼</EnhancedButton>
                  <EnhancedButton variant="outline">아웃라인</EnhancedButton>
                  <EnhancedButton variant="destructive">삭제</EnhancedButton>
                  <EnhancedButton gradient>그라데이션</EnhancedButton>
                  <EnhancedButton icon={Phone} iconPosition="left">
                    전화하기
                  </EnhancedButton>
                  <EnhancedButton 
                    icon={Download} 
                    iconPosition="right" 
                    variant="outline"
                  >
                    다운로드
                  </EnhancedButton>
                  <EnhancedButton
                    loading={loading}
                    loadingText="처리중..."
                    onClick={handleButtonTest}
                  >
                    로딩 테스트
                  </EnhancedButton>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Input */}
            <Card>
              <CardHeader>
                <CardTitle>Enhanced Input</CardTitle>
                <CardDescription>다양한 입력 필드 타입</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EnhancedInput
                    label="이름"
                    placeholder="이름을 입력하세요"
                    required
                    icon={<Star className="w-4 h-4" />}
                  />
                  <EnhancedInput
                    label="이메일"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    icon={<Mail className="w-4 h-4" />}
                    description="유효한 이메일 주소를 입력하세요"
                  />
                  <EnhancedInput
                    label="전화번호"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    formatPhoneNumber
                    placeholder="전화번호를 입력하세요"
                    icon={<Phone className="w-4 h-4" />}
                  />
                  <EnhancedInput
                    label="비밀번호"
                    type="password"
                    showPasswordToggle
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Date Picker */}
            <Card>
              <CardHeader>
                <CardTitle>Date Picker</CardTitle>
                <CardDescription>날짜 선택 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-md">
                  <DatePicker
                    label="탁송 희망일"
                    date={selectedDate}
                    onDateChange={setSelectedDate}
                    placeholder="날짜를 선택하세요"
                    minDate={new Date()}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Carousel */}
            <Card>
              <CardHeader>
                <CardTitle>Carousel</CardTitle>
                <CardDescription>이미지 슬라이더</CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel
                  slides={carouselSlides}
                  aspectRatio="banner"
                  autoPlay
                  autoPlayInterval={3000}
                />
              </CardContent>
            </Card>

            {/* Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Tabs</CardTitle>
                <CardDescription>탭 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="transport" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="transport">차량 탁송</TabsTrigger>
                    <TabsTrigger value="driver">대리운전</TabsTrigger>
                    <TabsTrigger value="consign">차량 위탁</TabsTrigger>
                  </TabsList>
                  <TabsContent value="transport" className="mt-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">차량 탁송 서비스</h3>
                      <p className="text-gray-600">안전하고 빠른 제주도 차량 운송 서비스입니다.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="driver" className="mt-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">번개 대리운전</h3>
                      <p className="text-gray-600">24시간 언제든지 이용 가능한 대리운전 서비스입니다.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="consign" className="mt-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">차량 위탁</h3>
                      <p className="text-gray-600">믿을 수 있는 차량 위탁 서비스를 제공합니다.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Step Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Step Progress</CardTitle>
                <CardDescription>진행 단계 표시</CardDescription>
              </CardHeader>
              <CardContent>
                <StepProgress steps={steps} />
              </CardContent>
            </Card>

            {/* Accordion */}
            <Card>
              <CardHeader>
                <CardTitle>Accordion</CardTitle>
                <CardDescription>자주 묻는 질문 (FAQ)</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>탁송 비용은 얼마인가요?</AccordionTrigger>
                    <AccordionContent>
                      차량 크기, 운송 거리, 날짜 등에 따라 비용이 달라집니다. 
                      정확한 견적은 견적 신청을 통해 확인하실 수 있습니다.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>얼마나 걸리나요?</AccordionTrigger>
                    <AccordionContent>
                      일반적으로 제주도 내 운송은 2-4시간, 육지 간 운송은 1-2일 소요됩니다.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>보험은 어떻게 되나요?</AccordionTrigger>
                    <AccordionContent>
                      모든 운송 차량은 종합보험에 가입되어 있으며, 
                      운송 중 발생할 수 있는 사고에 대해 보상해드립니다.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Search Box */}
            <Card>
              <CardHeader>
                <CardTitle>Search Box</CardTitle>
                <CardDescription>주소 검색 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-md">
                  <SearchBox
                    value={searchValue}
                    onChange={setSearchValue}
                    onSearch={handleAddressSearch}
                    placeholder="주소를 검색하세요 (예: 중앙로)"
                    onSelect={(result) => {
                      toast.success(`선택된 주소: ${result.roadAddress}`);
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>테스트 상태</CardTitle>
                <CardDescription>현재 선택된 값들</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">선택된 날짜:</Badge>
                    <span>{selectedDate ? selectedDate.toLocaleDateString('ko-KR') : '없음'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">전화번호:</Badge>
                    <span>{phoneNumber || '없음'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">검색값:</Badge>
                    <span>{searchValue || '없음'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ResponsiveContainer>
      </main>
      <Footer />
    </>
  );
}