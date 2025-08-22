'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface AdminLoginFormProps {
  onLoginSuccess?: () => void;
  className?: string;
}

export function AdminLoginForm({ onLoginSuccess, className }: AdminLoginFormProps) {
  const router = useRouter();
  const {
    loginWithLegacyCredentials,
    isLoggingIn,
    loginError,
    DEFAULT_ADMIN_CREDENTIALS,
  } = useAdminAuth();

  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    autoLogin: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((field: string, value: string | boolean | React.ChangeEvent<HTMLInputElement>) => {
    // Handle both string values and change events
    let actualValue: string | boolean;
    if (typeof value === 'object' && 'target' in value) {
      // It's a change event
      actualValue = value.target.value;
    } else {
      // It's a direct value
      actualValue = value;
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: actualValue,
    }));
    
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  }, [error]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const loginId = String(formData.loginId).trim();
    const password = String(formData.password).trim();

    if (!loginId || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const success = await loginWithLegacyCredentials(
        loginId,
        password,
        formData.autoLogin
      );

      if (success) {
        onLoginSuccess?.();
        // Navigation will be handled by the parent component
      } else {
        setError('로그인에 실패했습니다. 계정정보를 확인하세요.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인 중 오류가 발생했습니다.');
    }
  }, [formData, loginWithLegacyCredentials, onLoginSuccess]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleAutoLoginChange = useCallback((checked: boolean) => {
    handleInputChange('autoLogin', checked);
  }, [handleInputChange]);

  return (
    <div className={`flex items-center justify-center min-h-screen bg-gray-50 ${className || ''}`}>
      <Card className="w-full max-w-md mx-4 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            제주탁송 관리자
          </CardTitle>
          <CardDescription className="text-gray-600">
            관리자 계정으로 로그인하세요
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="loginId" className="text-sm font-medium text-gray-700">
                아이디
              </label>
              <EnhancedInput
                id="loginId"
                type="text"
                value={formData.loginId}
                onChange={(value) => handleInputChange('loginId', value)}
                placeholder="관리자 아이디를 입력하세요"
                disabled={isLoggingIn}
                className="w-full"
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <div className="relative">
                <EnhancedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(value) => handleInputChange('password', value)}
                  placeholder="비밀번호를 입력하세요"
                  disabled={isLoggingIn}
                  className="w-full pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoggingIn}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="autoLogin"
                type="checkbox"
                checked={formData.autoLogin}
                onChange={(e) => handleAutoLoginChange(e.target.checked)}
                disabled={isLoggingIn}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="autoLogin" className="text-sm text-gray-700">
                자동 로그인
              </label>
            </div>

            {(error || loginError) && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">
                  {error || loginError?.message || '로그인에 실패했습니다.'}
                </span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoggingIn || !String(formData.loginId).trim() || !String(formData.password).trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span>로그인 중...</span>
                </div>
              ) : (
                '로그인'
              )}
            </Button>
          </form>

          {/* Development helper */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-3 bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">테스트 계정 정보:</p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>서버 API 테스트: admin / admin123</div>
                <div>로컬 테스트: {DEFAULT_ADMIN_CREDENTIALS.key} / {DEFAULT_ADMIN_CREDENTIALS.password}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}