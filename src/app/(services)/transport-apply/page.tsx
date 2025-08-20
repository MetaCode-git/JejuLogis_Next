"use client"

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { ArrowLeft, Car, MapPin, Phone, Mail, User, Calendar, CreditCard } from 'lucide-react';
import Link from 'next/link';

function TransportApplyContent() {
  const searchParams = useSearchParams();
  
  // URL 파라미터에서 견적 정보 가져오기
  const vehicle = searchParams.get('vehicle') || '';
  const departure = searchParams.get('departure') || '';
  const arrival = searchParams.get('arrival') || '';
  const cost = searchParams.get('cost') || '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <ResponsiveContainer>
          <div className="flex items-center py-4">
            <Link href="/" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <h1 className="text-xl font-semibold">탁송 신청</h1>
          </div>
        </ResponsiveContainer>
      </div>

      <ResponsiveContainer className="py-6">
        <div className="max-w-2xl mx-auto">
          {/* 견적 정보 요약 */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">견적 정보</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-500">차량</span>
                  <div className="font-medium">{vehicle}</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <div>
                    <span className="text-sm text-gray-500">출발지</span>
                    <div className="font-medium">{departure}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <div>
                    <span className="text-sm text-gray-500">도착지</span>
                    <div className="font-medium">{arrival}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-500">견적 금액</span>
                  <div className="text-xl font-bold text-blue-600">₩ {cost ? Number(cost).toLocaleString() : '0'}원</div>
                </div>
              </div>
            </div>
          </div>

          {/* 고객 정보 입력 폼 */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">고객 정보</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  고객명
                </label>
                <Input placeholder="이름을 입력하세요" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  연락처
                </label>
                <Input placeholder="010-0000-0000" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  이메일 (선택)
                </label>
                <Input placeholder="example@email.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  희망 탁송 일시
                </label>
                <Input type="datetime-local" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  특이사항 (선택)
                </label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={3}
                  placeholder="특별히 요청할 사항이 있으시면 입력해주세요"
                />
              </div>
            </div>
          </div>

          {/* 주의사항 */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  탁송 신청 전 확인사항
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>차량 상태를 정확히 확인해주세요</li>
                    <li>귀중품은 미리 제거해주세요</li>
                    <li>차량 열쇠는 픽업 시 전달해주세요</li>
                    <li>신청 후 담당자가 연락드립니다</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 신청 버튼 */}
          <div className="space-y-3">
            <Button 
              className="w-full h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                // TODO: 실제 신청 처리 로직
                alert('탁송 신청이 접수되었습니다. 곧 담당자가 연락드리겠습니다.');
              }}
            >
              탁송 신청하기
            </Button>
            
            <Link href="/">
              <Button variant="outline" className="w-full">
                홈으로 돌아가기
              </Button>
            </Link>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
}

export default function TransportApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">페이지를 불러오는 중...</p>
        </div>
      </div>
    }>
      <TransportApplyContent />
    </Suspense>
  );
}