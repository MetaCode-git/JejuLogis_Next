'use client';

import { useCallback, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { AdminEstimate, ESTIMATE_STATUS_LABELS } from '@/types/admin';
import { useAdminEstimates } from '@/hooks/useAdminEstimates';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar,
  Car, 
  User, 
  Phone, 
  MapPin, 
  DollarSign, 
  Clock,
  Edit,
  Eye,
  ChevronDown,
  ChevronUp,
  Mail,
  MessageSquare,
  Building2
} from 'lucide-react';

interface EstimateCardProps {
  estimate: AdminEstimate;
  onEdit?: (estimate: AdminEstimate) => void;
  onView?: (estimate: AdminEstimate) => void;
  className?: string;
}

export function EstimateCard({ estimate, onEdit, onView, className }: EstimateCardProps) {
  const { updateEstimateStatus, isUpdating } = useAdminEstimates();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleStatusChange = useCallback(async (newStatus: number) => {
    if (isUpdating) return;
    
    const success = await updateEstimateStatus(estimate.id, newStatus);
    if (!success) {
      alert('상태 변경에 실패했습니다.');
    }
  }, [estimate.id, updateEstimateStatus, isUpdating]);

  const handleViewClick = useCallback(() => {
    // SSR 모드에서는 동적 라우팅 지원
    if (onView) {
      onView(estimate);
    } else {
      // Navigate to dynamic route - SSR 모드에서 정상 작동
      window.location.href = `/admin/estimates/${estimate.id}`;
    }
  }, [estimate, onView]);

  const handleEdit = useCallback(() => {
    onEdit?.(estimate);
  }, [estimate, onEdit]);

  const handleView = useCallback(() => {
    handleViewClick();
  }, [handleViewClick]);

  const getStatusBadgeColor = (status: number) => {
    switch (status) {
      case 0: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 1: return 'bg-blue-100 text-blue-800 border-blue-200';
      case 2: return 'bg-green-100 text-green-800 border-green-200';
      case 3: return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'yyyy년 MM월 dd일', { locale: ko });
    } catch {
      return dateString;
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'yyyy년 MM월 dd일 HH시 mm분', { locale: ko });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원';
  };

  const getCompanyName = (companyKey: string) => {
    const companyMap: Record<string, string> = {
      'JEJULOGIS': '제주탁송',
      'ADMIN': '관리자',
      'SCLOGIS': 'SC로지스',
      'jejuNhalla': '제주앤할라',
      'nationwide': '전국택배',
      'UPDATED_COMPANY': '업데이트된회사',
    };
    return companyMap[companyKey] || companyKey;
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${className || ''}`}>
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-bold text-gray-900">
                접수번호: {estimate.id}
              </h3>
              <Badge className={`${getStatusBadgeColor(estimate.status)} border`}>
                {ESTIMATE_STATUS_LABELS[estimate.status as keyof typeof ESTIMATE_STATUS_LABELS] || '알 수 없음'}
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Building2 className="h-3 w-3 mr-1" />
                {getCompanyName(estimate.companyKey)}
              </Badge>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>접수일시: {formatDateTime(estimate.createdAt)}</span>
              </div>
              {estimate.updatedAt !== estimate.createdAt && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-orange-600">
                    최종수정: {formatDateTime(estimate.updatedAt)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleView}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <Eye className="h-4 w-4 mr-1" />
              상세
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleExpanded}
              className="text-gray-600 hover:bg-gray-50"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-900">고객명:</span>
              <span className="text-gray-700">{estimate.customerName}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Car className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-900">차량:</span>
              <span className="text-gray-700">
                {estimate.carName}
                {estimate.carNumber && ` (${estimate.carNumber})`}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-900">출발예정일:</span>
              <span className="text-gray-700">{formatDate(estimate.transportDate)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-900">견적금액:</span>
              <span className="text-lg font-bold text-blue-600">
                {formatCurrency(estimate.cost)}
              </span>
            </div>
          </div>
        </div>

        {/* Route Information */}
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="font-medium text-gray-900">운송경로</span>
          </div>
          <div className="text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                출발지
              </span>
              <div className="flex-1 mx-2 border-t border-dashed border-gray-300"></div>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                도착지
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-medium">{estimate.departure}</span>
              <span className="font-medium">{estimate.arrival}</span>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-900">연락처:</span>
                  <span className="text-gray-700">{estimate.customerPhone}</span>
                </div>
                
                {estimate.customerEmail && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-900">이메일:</span>
                    <span className="text-gray-700">{estimate.customerEmail}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Building2 className="h-4 w-4 text-gray-500 mt-0.5" />
                  <span className="font-medium text-gray-900">담당회사:</span>
                  <div className="flex flex-col">
                    <span className="text-gray-700">{getCompanyName(estimate.companyKey)}</span>
                    <span className="text-xs text-gray-500">({estimate.companyKey})</span>
                  </div>
                </div>
                
                {estimate.updatedAt !== estimate.createdAt && (
                  <div className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 text-orange-500 mt-0.5" />
                    <span className="font-medium text-gray-900">최종수정일시:</span>
                    <span className="text-orange-600">{formatDateTime(estimate.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>

            {estimate.memo && (
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <span className="font-medium text-gray-900">메모:</span>
                    <p className="text-gray-700 mt-1 text-sm bg-gray-50 p-2 rounded">
                      {estimate.memo}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Status Change Buttons */}
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <span className="text-sm font-medium text-gray-700 mr-2">상태 변경:</span>
              {[0, 1, 2, 3].map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(status)}
                  disabled={isUpdating || estimate.status === status}
                  className={`text-xs ${
                    estimate.status === status
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {ESTIMATE_STATUS_LABELS[status as keyof typeof ESTIMATE_STATUS_LABELS]}
                </Button>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Edit className="h-4 w-4 mr-1" />
                수정
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}