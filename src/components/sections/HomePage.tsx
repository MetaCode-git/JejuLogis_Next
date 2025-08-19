'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Carousel } from '@/components/ui/carousel';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { useCompany } from '@/contexts/CompanyContext';
import { PageLoading } from '@/components/common/LoadingSpinner';
import { EstimateModal } from '@/components/ui/estimate-modal';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Calculator, Phone, Building, Shield } from 'lucide-react';

export function HomePage() {
  const { config, loading, error } = useCompany();
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);

  if (loading) {
    return <PageLoading message="페이지를 불러오는 중..." />;
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">페이지를 불러올 수 없습니다</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>다시 시도</Button>
        </div>
      </div>
    );
  }

  // 캐러셀 슬라이드 데이터
  const heroSlides = [
    {
      id: '1',
      image: '/assets/images/new_banner/pc_01.jpg',
      title: '안전한 제주 차량탁송',
      description: '전문 운송진과 함께하는 믿을 수 있는 서비스'
    },
    {
      id: '2',
      image: '/assets/images/new_banner/pc_02.jpg', 
      title: '24시간 번개대리',
      description: '언제 어디서나 빠르고 안전한 대리운전'
    },
    {
      id: '3',
      image: '/assets/images/new_banner/pc_03.jpg',
      title: '차량위탁 서비스',
      description: '소중한 차량을 안전하게 보관해드립니다'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel
          slides={heroSlides}
          aspectRatio="banner"
          autoPlay
          autoPlayInterval={4000}
          className="h-[400px] md:h-[500px]"
        />
        
        {/* Call to Action Overlay */}
        <div className="absolute inset-0 flex items-end pb-16">
          <ResponsiveContainer>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <EnhancedButton
                size="lg"
                gradient
                icon={Calculator}
                iconPosition="left"
                className="text-white shadow-lg"
                onClick={() => setIsEstimateModalOpen(true)}
              >
                견적조회
              </EnhancedButton>
              <EnhancedButton
                size="lg"
                gradient
                icon={Calculator}
                iconPosition="left"
                className="text-white shadow-lg"
                asChild
              >
                <Link href="/estimate">견적 신청하기</Link>
              </EnhancedButton>
              <EnhancedButton
                size="lg"
                variant="outline"
                className="bg-white/90 hover:bg-white border-white"
                asChild
              >
                <Link href="/company">서비스 둘러보기</Link>
              </EnhancedButton>
            </div>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="bg-red-600 text-white py-4">
        <ResponsiveContainer>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5" />
              <div>
                <span className="font-bold">{config.company.phone}</span>
                <span className="ml-4 text-red-100">{config.company.businessHours}</span>
              </div>
            </div>
            <EnhancedButton
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-red-600"
              icon={Phone}
              onClick={() => window.open(`tel:${config.company.phone}`)}
            >
              지금 전화하기
            </EnhancedButton>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <ResponsiveContainer>
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            주요 서비스
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.services.vehicleTransport && (
              <ServiceCard 
                title="차량 견적"
                description="빠르고 정확한 탁송 견적"
                image="/assets/images/reservation.png"
                href="/estimate"
                color="red"
                icon={Calculator}
              />
            )}

            {config.services.designatedDriver && (
              <ServiceCard 
                title={config.designatedDriver.name}
                description="24시간 대리운전 서비스"
                image="/assets/images/designated_driver_service.png"
                href="/driver"
                color="blue"
                icon={Phone}
              />
            )}

            {config.services.consignment && (
              <ServiceCard 
                title="차량 위탁"
                description="안전한 차량 위탁 서비스"
                image="/assets/images/consign.png"
                href="/consign"
                color="green"
                icon={Building}
              />
            )}

            {config.services.insurance && (
              <ServiceCard 
                title="탁송 보험"
                description="차량 운송 보험 안내"
                image="/assets/images/insurance.png"
                href="/insurance"
                color="purple"
                icon={Shield}
              />
            )}
          </div>
        </ResponsiveContainer>
      </section>

      {/* Company Info */}
      <section className="py-16">
        <ResponsiveContainer maxWidth="2xl">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">회사 정보</h3>
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">연락처</h4>
                  <p className="text-gray-600">전화: {config.company.phone}</p>
                  <p className="text-gray-600">이메일: {config.company.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">영업시간</h4>
                  <p className="text-gray-600">{config.company.businessHours}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-gray-900 mb-2">주소</h4>
                  <p className="text-gray-600">{config.company.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ResponsiveContainer>
      </section>

      {/* Estimate Modal */}
      <EstimateModal 
        open={isEstimateModalOpen}
        onOpenChange={setIsEstimateModalOpen}
      />
    </div>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  color: 'red' | 'blue' | 'green' | 'purple';
  icon: React.ComponentType<{ className?: string }>;
}

function ServiceCard({ title, description, image, href, color, icon: Icon }: ServiceCardProps) {
  const colorClasses = {
    red: 'bg-red-100 hover:bg-red-200',
    blue: 'bg-blue-100 hover:bg-blue-200', 
    green: 'bg-green-100 hover:bg-green-200',
    purple: 'bg-purple-100 hover:bg-purple-200'
  };

  const iconColorClasses = {
    red: 'text-red-600',
    blue: 'text-blue-600',
    green: 'text-green-600', 
    purple: 'text-purple-600'
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
      <CardHeader className="text-center pb-4">
        <div className={`w-16 h-16 mx-auto mb-4 ${colorClasses[color]} rounded-full flex items-center justify-center transition-colors`}>
          <Icon className={`w-8 h-8 ${iconColorClasses[color]}`} />
        </div>
        <CardTitle className="text-lg mb-2">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center pt-0">
        <EnhancedButton 
          variant="outline" 
          size="sm"
          className={`border-${color.toLowerCase()}-200 hover:bg-${color.toLowerCase()}-50`}
          asChild
        >
          <Link href={href}>자세히 보기</Link>
        </EnhancedButton>
      </CardContent>
    </Card>
  );
}