'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { EstimateList } from '@/components/admin/EstimateList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminEstimate } from '@/types/admin';
import { 
  LogOut, 
  Settings, 
  User, 
  Shield, 
  ShieldCheck,
  Bell,
  Activity
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const {
    isAuthenticated,
    user,
    logout,
    checkAuthStatus,
    isAdmin,
    isSuperAdmin,
  } = useAdminAuth();

  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state
  useEffect(() => {
    checkAuthStatus();
    setIsInitialized(true);
  }, [checkAuthStatus]);

  const handleLoginSuccess = useCallback(() => {
    // Login successful, component will re-render with authenticated state
    console.log('Admin login successful');
  }, []);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleEstimateEdit = useCallback((estimate: AdminEstimate) => {
    // Navigate to estimate detail page in edit mode
    router.push(`/admin/estimates/${estimate.id}?mode=edit`);
  }, [router]);

  const handleEstimateView = useCallback((estimate: AdminEstimate) => {
    // Navigate to estimate detail page
    router.push(`/admin/estimates/${estimate.id}`);
  }, [router]);

  // Show loading while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">초기화 중...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated || !user) {
    return <AdminLoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  // Main admin dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">제주탁송 관리자</h1>
              <div className="flex items-center space-x-2">
                {isSuperAdmin ? (
                  <div className="flex items-center space-x-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    <ShieldCheck className="h-3 w-3" />
                    <span>최고관리자</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    <Shield className="h-3 w-3" />
                    <span>관리자</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-sm text-gray-500">({user.loginId})</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  설정
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  로그아웃
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>관리자 대시보드</span>
            </CardTitle>
            <CardDescription>
              {user.name}님, 환영합니다. 
              {isSuperAdmin 
                ? ' 모든 관리 권한을 가지고 있습니다.' 
                : ' 견적 관리 권한을 가지고 있습니다.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Shield className="h-4 w-4" />
                <span>권한: {isSuperAdmin ? '최고관리자' : '일반관리자'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-4 w-4" />
                <span>계정: {user.loginId}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Bell className="h-4 w-4" />
                <span>상태: 활성</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estimate Management */}
        <EstimateList
          onEstimateEdit={handleEstimateEdit}
          onEstimateView={handleEstimateView}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 제주탁송. 모든 권리 보유.</p>
            <p className="mt-1">관리자 전용 시스템 - 무단 접근을 금지합니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}