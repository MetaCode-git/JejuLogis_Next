'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronRight } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  showRefresh?: boolean;
  showHome?: boolean;
  fullPage?: boolean;
}

export function ErrorDisplay({
  title = '오류가 발생했습니다',
  message = '죄송합니다. 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  action,
  showRefresh = true,
  showHome = false,
  fullPage = false
}: ErrorDisplayProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const content = (
    <div className="flex flex-col items-center justify-center text-center space-y-6 p-8">
      <div className="flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full">
        <AlertTriangle className="w-8 h-8" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 max-w-md">{message}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {action && (
          <EnhancedButton onClick={action.onClick} variant="default">
            {action.label}
          </EnhancedButton>
        )}
        
        {showRefresh && (
          <EnhancedButton onClick={handleRefresh} variant="outline" icon={RefreshCw}>
            새로고침
          </EnhancedButton>
        )}
        
        {showHome && (
          <EnhancedButton onClick={handleGoHome} variant="outline" icon={Home}>
            홈으로 가기
          </EnhancedButton>
        )}
      </div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

// 404 에러 전용 컴포넌트
export function NotFoundError() {
  return (
    <ErrorDisplay
      title="페이지를 찾을 수 없습니다"
      message="요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다."
      showRefresh={false}
      showHome={true}
      fullPage={true}
    />
  );
}

// 네트워크 에러 전용 컴포넌트
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorDisplay
      title="네트워크 연결 오류"
      message="인터넷 연결을 확인하고 다시 시도해주세요."
      action={onRetry ? { label: '다시 시도', onClick: onRetry } : undefined}
      showRefresh={true}
      fullPage={true}
    />
  );
}

// 서버 에러 전용 컴포넌트
export function ServerError() {
  return (
    <ErrorDisplay
      title="서버 오류"
      message="일시적인 서버 문제입니다. 잠시 후 다시 시도해주세요."
      showRefresh={true}
      showHome={true}
      fullPage={true}
    />
  );
}

// 인라인 에러 메시지
interface InlineErrorProps {
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function InlineError({ message, action }: InlineErrorProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <span className="text-red-800 text-sm">{message}</span>
      </div>
      
      {action && (
        <button
          onClick={action.onClick}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          {action.label}
          <ChevronRight className="w-4 h-4 inline ml-1" />
        </button>
      )}
    </div>
  );
}

// 폼 필드 에러
interface FieldErrorProps {
  message?: string;
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  
  return (
    <div className="flex items-center mt-1 text-red-600">
      <AlertTriangle className="w-4 h-4 mr-1" />
      <span className="text-sm">{message}</span>
    </div>
  );
}