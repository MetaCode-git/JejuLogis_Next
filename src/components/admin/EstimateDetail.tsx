'use client';

import { useState, useCallback } from 'react';
import { AdminEstimate, ESTIMATE_STATUS_LABELS } from '@/types/admin';
import { StatusUpdateButtons } from './StatusUpdateButtons';
import { MessageTemplates } from './MessageTemplates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Car,
  MapPin,
  Calendar,
  Phone,
  User,
  DollarSign,
  Clock,
  Building2,
  Mail,
  FileText,
  MessageSquare,
  Settings,
  ExternalLink,
} from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface EstimateDetailProps {
  estimate: AdminEstimate;
  isAdmin?: boolean;
  onUpdate?: () => void;
  className?: string;
}

export function EstimateDetail({ 
  estimate, 
  isAdmin = false, 
  onUpdate,
  className 
}: EstimateDetailProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'admin'>('info');

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: return 'bg-yellow-100 text-yellow-800'; // 탁송대기
      case 1: return 'bg-blue-100 text-blue-800';     // 탁송중
      case 2: return 'bg-green-100 text-green-800';   // 탁송완료
      case 3: return 'bg-red-100 text-red-800';       // 탁송취소
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'yyyy년 MM월 dd일 (EEE)', { locale: ko });
  };

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), 'yyyy.MM.dd HH:mm', { locale: ko });
  };

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <Badge className={`px-3 py-1 text-sm font-medium ${getStatusColor(estimate.status)}`}>
          {ESTIMATE_STATUS_LABELS[estimate.status as keyof typeof ESTIMATE_STATUS_LABELS] || '알 수 없음'}
        </Badge>
        <div className="text-sm text-gray-600">
          최종 수정: {formatDateTime(estimate.updatedAt)}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'info'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          견적 정보
        </button>
        {isAdmin && (
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'admin'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            관리자 기능
          </button>
        )}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'info' && (
        <div className="space-y-6">
          {/* Main Estimate Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>견적 기본 정보</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cost */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">탁송비용</span>
                </div>
                <p className="text-3xl font-bold text-orange-900">
                  {formatCurrency(estimate.cost)}원
                </p>
              </div>

              {/* Transport Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">출발일</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatDate(estimate.transportDate)}
                  </p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Car className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">차종</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {estimate.carName}
                  </p>
                  {estimate.carNumber && (
                    <p className="text-sm text-gray-600 mt-1">
                      차량번호: {estimate.carNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Route Info */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">출발지</span>
                  </div>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {estimate.departure}
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="w-px h-8 bg-gray-300"></div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <span className="text-sm font-medium text-gray-700">도착지</span>
                  </div>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {estimate.arrival}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-green-600" />
                <span>고객 정보</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">고객명</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {estimate.customerName}
                  </p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">연락처</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {estimate.customerPhone}
                  </p>
                </div>
              </div>

              {estimate.customerEmail && (
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">이메일</span>
                  </div>
                  <p className="text-gray-900">
                    {estimate.customerEmail}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-purple-600" />
                <span>추가 정보</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Building2 className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">업체 키</span>
                  </div>
                  <p className="text-gray-900">{estimate.companyKey}</p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">접수일</span>
                  </div>
                  <p className="text-gray-900">{formatDateTime(estimate.createdAt)}</p>
                </div>
              </div>

              {estimate.memo && (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">메모</span>
                  </div>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {estimate.memo}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Non-admin actions */}
          {!isAdmin && (
            <Card>
              <CardContent className="text-center py-8">
                <Button 
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                  disabled
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  예약 및 상담하기
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  실제 예약은 카카오톡 채널을 통해 진행됩니다.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Admin Tab Content */}
      {activeTab === 'admin' && isAdmin && (
        <div className="space-y-6">
          {/* Status Update */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-blue-600" />
                <span>견적서 상태변경</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StatusUpdateButtons 
                estimate={estimate}
                onUpdate={onUpdate}
              />
            </CardContent>
          </Card>

          {/* Message Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <span>문자 템플릿 클립보드 저장</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MessageTemplates estimate={estimate} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}