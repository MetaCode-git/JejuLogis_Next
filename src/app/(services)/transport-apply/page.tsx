"use client"

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { ArrowLeft, Car, MapPin, Phone, Mail, User, Calendar, CreditCard, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSaveEstimate } from '@/hooks/useEstimateAPI';
import type { EstimateSaveRequest } from '@/types/api';
import { toast } from 'sonner';

function TransportApplyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const saveEstimateMutation = useSaveEstimate();
  
  // URL 파라미터에서 견적 정보 가져오기
  const vehicle = searchParams.get('vehicle') || '';
  const departure = searchParams.get('departure') || '';
  const arrival = searchParams.get('arrival') || '';
  const cost = searchParams.get('cost') || '';

  // 폼 상태 관리
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [transportDateTime, setTransportDateTime] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // 폼 유효성 검증
  const validateForm = () => {
    if (!customerName.trim()) {
      toast.error('고객명을 입력해주세요.');
      return false;
    }
    if (!customerPhone.trim()) {
      toast.error('연락처를 입력해주세요.');
      return false;
    }
    if (!transportDateTime) {
      toast.error('희망 탁송 일시를 선택해주세요.');
      return false;
    }
    if (!departure || !arrival || !vehicle || !cost) {
      toast.error('견적 정보가 누락되었습니다. 다시 견적을 요청해주세요.');
      return false;
    }
    return true;
  };

  // 탁송 신청 처리
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const saveData: EstimateSaveRequest = {
      companyKey: 'JEJULOGIS',
      departure,
      arrival,
      carName: vehicle,
      transportDate: transportDateTime.split('T')[0], // YYYY-MM-DD 형식으로 변환
      cost: parseInt(cost) || 0,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || undefined,
      memo: specialRequests.trim() || undefined,
      status: 0
    };

    try {
      await saveEstimateMutation.mutateAsync(saveData);
      // 성공 시 홈페이지로 리다이렉트
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('탁송 신청 실패:', error);
    }
  };

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
                <Input 
                  placeholder="이름을 입력하세요" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  연락처
                </label>
                <Input 
                  placeholder="010-0000-0000" 
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  이메일 (선택)
                </label>
                <Input 
                  placeholder="example@email.com" 
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  희망 탁송 일시
                </label>
                <Input 
                  type="datetime-local" 
                  value={transportDateTime}
                  onChange={(e) => setTransportDateTime(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  특이사항 (선택)
                </label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={3}
                  placeholder="특별히 요청할 사항이 있으시면 입력해주세요"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
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

          {/* 테스트 버튼 */}
          <div className="mb-6">
            <Button 
              onClick={() => {
                // 랜덤 고객 정보 데이터
                const testNames = ['김철수', '이영희', '박민수', '정수진', '최대영'];
                const testPhones = ['010-1234-5678', '010-9876-5432', '010-5555-7777', '010-3333-8888'];
                const testEmails = ['test@naver.com', 'customer@gmail.com', 'user@daum.net', 'sample@kakao.com'];
                const testRequests = [
                  '차량 하부 긁힌 부분이 있습니다.',
                  '조심히 운송 부탁드립니다.',
                  '차량 안에 향수병이 있으니 주의해주세요.',
                  '빠른 배송 부탁드립니다.',
                  ''
                ];
                
                // 랜덤 데이터 생성
                const randomName = testNames[Math.floor(Math.random() * testNames.length)];
                const randomPhone = testPhones[Math.floor(Math.random() * testPhones.length)];
                const randomEmail = testEmails[Math.floor(Math.random() * testEmails.length)];
                const randomRequest = testRequests[Math.floor(Math.random() * testRequests.length)];
                
                // 현재 시간에서 1-3일 후 랜덤 시간 생성
                const now = new Date();
                const randomDays = Math.floor(Math.random() * 3) + 1; // 1-3일
                const randomHours = Math.floor(Math.random() * 10) + 8; // 8-17시
                const futureDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + randomDays, randomHours, 0);
                const randomDateTime = futureDate.toISOString().slice(0, 16);
                
                // 상태 업데이트
                setCustomerName(randomName);
                setCustomerPhone(randomPhone);
                setCustomerEmail(randomEmail);
                setTransportDateTime(randomDateTime);
                setSpecialRequests(randomRequest);
              }}
              variant="outline"
              className="w-full h-10 text-sm"
            >
              🎲 테스트 데이터 채우기
            </Button>
          </div>

          {/* 신청 버튼 */}
          <div className="space-y-3">
            <Button 
              className="w-full h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={saveEstimateMutation.isPending}
            >
              {saveEstimateMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  신청 중...
                </>
              ) : (
                '탁송 신청하기'
              )}
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