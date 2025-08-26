'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAdminEstimates } from '@/hooks/useAdminEstimates';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { EstimateDetail } from '@/components/admin/EstimateDetail';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function EstimateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, user, isAdmin } = useAdminAuth();
  const { useEstimate } = useAdminEstimates();
  
  const estimateId = parseInt(params.id as string, 10);
  const { data: estimate, isLoading, isError, error } = useEstimate(estimateId);

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    router.push('/admin');
    return null;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600">견적 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError || !estimate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              견적을 불러올 수 없습니다
            </h3>
            <p className="text-gray-600 mb-4">
              {error?.message || '견적 정보를 가져오는 중 오류가 발생했습니다.'}
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => router.push('/admin')} 
                variant="outline" 
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                관리자 페이지로 돌아가기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/admin')}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                목록으로
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                견적 상세 - #{estimate.id}
              </h1>
            </div>
            <div className="text-sm text-gray-600">
              접수일: {new Date(estimate.createdAt).toLocaleString('ko-KR')}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EstimateDetail 
          estimate={estimate} 
          isAdmin={isAdmin}
          onUpdate={() => {
            // The EstimateDetail component will handle the update
            // and invalidate the cache automatically
          }}
        />
      </main>
    </div>
  );
}