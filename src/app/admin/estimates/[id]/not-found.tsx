'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function EstimateNotFound() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract estimate ID from pathname
  const estimateId = pathname?.split('/').pop();

  useEffect(() => {
    console.warn(`Estimate ${estimateId} not found in static build`);
  }, [estimateId]);

  const handleRetry = () => {
    // Try to reload the page - this might work if the estimate exists in the API
    window.location.reload();
  };

  const handleGoBack = () => {
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md w-full mx-4">
        <CardContent className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            견적을 찾을 수 없습니다
          </h3>
          <p className="text-gray-600 mb-4">
            견적 번호 <span className="font-mono font-semibold">#{estimateId}</span>는 
            현재 정적 빌드에 포함되지 않았습니다.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            최근에 추가된 견적일 수 있습니다. 다시 시도하거나 관리자 페이지로 돌아가세요.
          </p>
          <div className="space-y-2">
            <Button 
              onClick={handleRetry} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              다시 시도
            </Button>
            <Button 
              onClick={handleGoBack} 
              variant="outline" 
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              관리자 페이지로 돌아가기
            </Button>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>개발자 정보:</strong> 정적 빌드 한계로 인해 빌드 시점 이후 추가된 견적은 
              별도의 처리가 필요합니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}