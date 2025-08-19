import { Metadata } from 'next';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';
import { WifiOff, RefreshCw, Phone, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: '오프라인 - 제주탁송',
  description: '현재 인터넷에 연결되어 있지 않습니다.',
};

export default function OfflinePage() {
  return (
    <>
      <Header />
      <main>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
          <ResponsiveContainer>
            <div className="text-center space-y-8">
              <div className="flex items-center justify-center w-24 h-24 bg-gray-100 text-gray-400 rounded-full mx-auto">
                <WifiOff className="w-12 h-12" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  인터넷 연결이 끊어졌습니다
                </h1>
                <p className="text-gray-600 max-w-md mx-auto">
                  현재 오프라인 상태입니다. 네트워크 연결을 확인하고 다시 시도해주세요.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <EnhancedButton
                  onClick={() => window.location.reload()}
                  icon={RefreshCw}
                  variant="default"
                >
                  새로고침
                </EnhancedButton>
                
                <EnhancedButton
                  onClick={() => window.location.href = '/'}
                  icon={Home}
                  variant="outline"
                >
                  홈으로 가기
                </EnhancedButton>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-lg mx-auto">
                <h3 className="font-semibold text-blue-900 mb-3">긴급 연락처</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-2 text-blue-700">
                    <Phone className="w-4 h-4" />
                    <span>고객센터: 064-123-4567</span>
                  </div>
                  <p className="text-blue-600">
                    인터넷 연결 없이도 전화로 견적 문의 및 서비스 이용이 가능합니다.
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-500 max-w-lg mx-auto">
                <h4 className="font-medium mb-2">오프라인에서도 이용 가능한 기능:</h4>
                <ul className="text-left space-y-1">
                  <li>• 이전에 방문한 페이지 내용 확인</li>
                  <li>• 캐시된 회사 정보 및 연락처</li>
                  <li>• 서비스 소개 및 요금 안내</li>
                  <li>• 긴급 연락처로 직접 전화</li>
                </ul>
              </div>
            </div>
          </ResponsiveContainer>
        </div>
      </main>
      <Footer />
    </>
  );
}