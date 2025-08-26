'use client';

import { useCallback, useState } from 'react';
import { AdminEstimate, ESTIMATE_STATUS, ESTIMATE_STATUS_LABELS } from '@/types/admin';
import { useAdminEstimates } from '@/hooks/useAdminEstimates';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Truck, 
  CheckCircle, 
  XCircle,
  AlertTriangle 
} from 'lucide-react';
import { toast } from 'sonner';

interface StatusUpdateButtonsProps {
  estimate: AdminEstimate;
  onUpdate?: () => void;
  className?: string;
}

export function StatusUpdateButtons({ 
  estimate, 
  onUpdate,
  className 
}: StatusUpdateButtonsProps) {
  const { updateEstimateStatus, isUpdating } = useAdminEstimates();
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  const getStatusIcon = (status: number) => {
    switch (status) {
      case ESTIMATE_STATUS.WAITING:
        return <Clock className="h-4 w-4" />;
      case ESTIMATE_STATUS.RUNNING:
        return <Truck className="h-4 w-4" />;
      case ESTIMATE_STATUS.COMPLETED:
        return <CheckCircle className="h-4 w-4" />;
      case ESTIMATE_STATUS.CANCELED:
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case ESTIMATE_STATUS.WAITING:
        return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      case ESTIMATE_STATUS.RUNNING:
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case ESTIMATE_STATUS.COMPLETED:
        return 'bg-green-500 hover:bg-green-600 text-white';
      case ESTIMATE_STATUS.CANCELED:
        return 'bg-red-500 hover:bg-red-600 text-white';
      default:
        return 'bg-gray-500 hover:bg-gray-600 text-white';
    }
  };

  const handleStatusUpdate = useCallback(async (newStatus: number) => {
    if (estimate.status === newStatus) {
      toast.info('현재 상태와 동일합니다.');
      return;
    }

    setUpdatingStatus(newStatus);
    
    try {
      const success = await updateEstimateStatus(estimate.id, newStatus);
      
      if (success) {
        const statusLabel = ESTIMATE_STATUS_LABELS[newStatus as keyof typeof ESTIMATE_STATUS_LABELS];
        toast.success(`견적 상태가 '${statusLabel}'로 변경되었습니다.`);
        onUpdate?.();
      } else {
        toast.error('상태 변경에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Status update failed:', error);
      toast.error('상태 변경 중 오류가 발생했습니다.');
    } finally {
      setUpdatingStatus(null);
    }
  }, [estimate.id, estimate.status, updateEstimateStatus, onUpdate]);

  const statusOptions = [
    {
      status: ESTIMATE_STATUS.WAITING,
      label: ESTIMATE_STATUS_LABELS[ESTIMATE_STATUS.WAITING],
      description: '탁송 대기 중'
    },
    {
      status: ESTIMATE_STATUS.RUNNING,
      label: ESTIMATE_STATUS_LABELS[ESTIMATE_STATUS.RUNNING],
      description: '탁송 진행 중'
    },
    {
      status: ESTIMATE_STATUS.COMPLETED,
      label: ESTIMATE_STATUS_LABELS[ESTIMATE_STATUS.COMPLETED],
      description: '탁송 완료'
    },
    {
      status: ESTIMATE_STATUS.CANCELED,
      label: ESTIMATE_STATUS_LABELS[ESTIMATE_STATUS.CANCELED],
      description: '탁송 취소'
    },
  ];

  return (
    <div className={`space-y-4 ${className || ''}`}>
      {/* Current Status */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">현재 상태</h4>
        <Badge className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800">
          {getStatusIcon(estimate.status)}
          <span className="ml-2">
            {ESTIMATE_STATUS_LABELS[estimate.status as keyof typeof ESTIMATE_STATUS_LABELS] || '알 수 없음'}
          </span>
        </Badge>
      </div>

      {/* Status Update Buttons */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">상태 변경</h4>
        <div className="grid grid-cols-2 gap-3">
          {statusOptions.map(({ status, label, description }) => {
            const isCurrentStatus = estimate.status === status;
            const isUpdating = updatingStatus === status;
            const isAnyUpdating = updatingStatus !== null || isUpdating;

            return (
              <Button
                key={status}
                onClick={() => handleStatusUpdate(status)}
                disabled={isCurrentStatus || isAnyUpdating}
                className={`h-auto py-3 px-4 flex-col space-y-1 ${
                  isCurrentStatus 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : getStatusColor(status)
                }`}
                variant={isCurrentStatus ? 'outline' : 'default'}
              >
                <div className="flex items-center space-x-2">
                  {isUpdating ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    getStatusIcon(status)
                  )}
                  <span className="font-medium">{label}</span>
                </div>
                <span className="text-xs opacity-90">{description}</span>
                {isCurrentStatus && (
                  <span className="text-xs">(현재 상태)</span>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Info Message */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">상태 변경 안내</p>
            <ul className="text-xs space-y-1 text-blue-700">
              <li>• 상태 변경은 즉시 반영되며 되돌릴 수 없습니다.</li>
              <li>• 고객에게 별도 알림이 발송되지 않습니다.</li>
              <li>• 필요시 문자 템플릿을 활용하여 고객에게 안내하세요.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}