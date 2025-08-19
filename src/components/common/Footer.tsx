'use client';

import React from 'react';
import { ResponsiveContainer } from './ResponsiveContainer';
import { useCompany } from '@/contexts/CompanyContext';

export function Footer() {
  const { config, loading } = useCompany();

  if (loading || !config) {
    return <FooterSkeleton />;
  }

  return (
    <footer className="bg-gray-800 text-white py-12">
      <ResponsiveContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{config.company.name}</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>사업자등록번호: {config.company.businessNumber}</p>
              <p>대표: {config.company.ownerName}</p>
              <p>주소: {config.company.address}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">연락처</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>전화: {config.company.phone}</p>
              <p>이메일: {config.company.email}</p>
              <p>영업시간: {config.company.businessHours}</p>
            </div>
          </div>

          {/* Bank Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">계좌정보</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>은행: {config.company.bankInfo.bankName}</p>
              <p>계좌: {config.company.bankInfo.accountNumber}</p>
              <p>예금주: {config.company.bankInfo.accountHolder}</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 {config.company.name}. All rights reserved.</p>
        </div>
      </ResponsiveContainer>
    </footer>
  );
}

function FooterSkeleton() {
  return (
    <footer className="bg-gray-800 py-12">
      <ResponsiveContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className="w-24 h-6 bg-gray-700 animate-pulse rounded mb-4" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-700 animate-pulse rounded" />
                <div className="w-3/4 h-4 bg-gray-700 animate-pulse rounded" />
                <div className="w-5/6 h-4 bg-gray-700 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </ResponsiveContainer>
    </footer>
  );
}