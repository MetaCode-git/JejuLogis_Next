'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, ShowOn, HideOn } from './ResponsiveContainer';
import { useCompany } from '@/contexts/CompanyContext';
import { Menu, X, Phone } from 'lucide-react';

export function Header() {
  const { config, loading } = useCompany();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading || !config) {
    return <HeaderSkeleton />;
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <ResponsiveContainer>
        <div className="flex items-center justify-between py-4">
          {/* Logo & Company Name */}
          <Link href="/" className="flex items-center space-x-4">
            <Image 
              src={config.company.logo} 
              alt={`${config.company.name} 로고`} 
              width={120} 
              height={40}
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{config.company.name}</h1>
              <p className="text-sm text-gray-500">제주도 차량 탁송 서비스</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <HideOn breakpoint="mobile">
            <nav className="flex items-center space-x-8">
              <Link href="/estimate" className="text-gray-700 hover:text-red-600 transition-colors">
                견적신청
              </Link>
              <Link href="/company" className="text-gray-700 hover:text-red-600 transition-colors">
                회사소개
              </Link>
              <Link href="/driver" className="text-gray-700 hover:text-red-600 transition-colors">
                대리운전
              </Link>
              <Link href="/consign" className="text-gray-700 hover:text-red-600 transition-colors">
                차량위탁
              </Link>
              <Link href="/insurance" className="text-gray-700 hover:text-red-600 transition-colors">
                보험안내
              </Link>
            </nav>
          </HideOn>

          {/* Contact & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-red-600 border-red-200">
              <Phone className="w-3 h-3 mr-1" />
              {config.company.phone}
            </Badge>

            {/* Mobile Menu Button */}
            <ShowOn breakpoint="mobile">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </ShowOn>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <ShowOn breakpoint="mobile">
            <nav className="border-t border-gray-200 py-4 space-y-4">
              <Link 
                href="/estimate" 
                className="block text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                견적신청
              </Link>
              <Link 
                href="/company" 
                className="block text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                회사소개
              </Link>
              <Link 
                href="/driver" 
                className="block text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                대리운전
              </Link>
              <Link 
                href="/consign" 
                className="block text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                차량위탁
              </Link>
              <Link 
                href="/insurance" 
                className="block text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                보험안내
              </Link>
            </nav>
          </ShowOn>
        )}
      </ResponsiveContainer>
    </header>
  );
}

function HeaderSkeleton() {
  return (
    <header className="bg-white shadow-sm border-b">
      <ResponsiveContainer>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <div className="w-[120px] h-10 bg-gray-200 animate-pulse rounded" />
            <div>
              <div className="w-24 h-5 bg-gray-200 animate-pulse rounded mb-1" />
              <div className="w-32 h-4 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
          <div className="w-24 h-8 bg-gray-200 animate-pulse rounded" />
        </div>
      </ResponsiveContainer>
    </header>
  );
}