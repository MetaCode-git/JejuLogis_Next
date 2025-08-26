'use client';

import { useMemo, useState } from 'react';
import { useAdminEstimates } from '@/hooks/useAdminEstimates';
import { AdminEstimate } from '@/types/admin';
import { EstimateCard } from './EstimateCard';
import { StatusFilter } from './StatusFilter';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  RefreshCw, 
  Search, 
  SortAsc, 
  SortDesc,
  FileText,
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
  DollarSign
} from 'lucide-react';
import { EnhancedInput } from '@/components/ui/enhanced-input';

interface EstimateListProps {
  onEstimateEdit?: (estimate: AdminEstimate) => void;
  onEstimateView?: (estimate: AdminEstimate) => void;
  className?: string;
}

type SortField = 'id' | 'createdAt' | 'transportDate' | 'cost' | 'customerName';
type SortOrder = 'asc' | 'desc';

export function EstimateList({ onEstimateEdit, onEstimateView, className }: EstimateListProps) {
  const {
    filteredEstimates,
    estimateStats,
    isLoading,
    isError,
    error,
    refreshEstimates,
  } = useAdminEstimates();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

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

  // Filtered and sorted estimates
  const processedEstimates = useMemo(() => {
    let filtered = filteredEstimates;

    // Apply search filter
    if (searchTerm && searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((estimate) =>
        estimate.id.toString().includes(term) ||
        (estimate.customerName && estimate.customerName.toLowerCase().includes(term)) ||
        (estimate.carName && estimate.carName.toLowerCase().includes(term)) ||
        (estimate.carNumber && estimate.carNumber.toLowerCase().includes(term)) ||
        (estimate.departure && estimate.departure.toLowerCase().includes(term)) ||
        (estimate.arrival && estimate.arrival.toLowerCase().includes(term)) ||
        (estimate.customerPhone && estimate.customerPhone.includes(term)) ||
        (estimate.companyKey && estimate.companyKey.toLowerCase().includes(term)) ||
        getCompanyName(estimate.companyKey).toLowerCase().includes(term)
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Convert dates to timestamps for comparison
      if (sortField === 'createdAt' || sortField === 'transportDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Convert strings to lowercase for case-insensitive comparison
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return sorted;
  }, [filteredEstimates, searchTerm, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">견적 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">데이터를 불러올 수 없습니다</h3>
        <p className="text-gray-600 mb-4">
          {error?.message || '견적 목록을 가져오는 중 오류가 발생했습니다.'}
        </p>
        <Button onClick={refreshEstimates} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">전체</p>
                <p className="text-2xl font-bold text-gray-900">{estimateStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">탁송대기</p>
                <p className="text-2xl font-bold text-yellow-600">{estimateStats.waiting}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">탁송중</p>
                <p className="text-2xl font-bold text-blue-600">{estimateStats.running}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">탁송완료</p>
                <p className="text-2xl font-bold text-green-600">{estimateStats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>견적 리스트</span>
            </CardTitle>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshEstimates}
                className="text-gray-600 hover:text-gray-800"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                새로고침
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Search and Controls */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <EnhancedInput
                    type="text"
                    placeholder="접수번호, 고객명, 차량명, 연락처, 회사명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">정렬:</span>
                <div className="flex space-x-1">
                  {[
                    { field: 'createdAt' as SortField, label: '접수일' },
                    { field: 'id' as SortField, label: '번호' },
                    { field: 'transportDate' as SortField, label: '운송일' },
                    { field: 'cost' as SortField, label: '금액' },
                  ].map(({ field, label }) => (
                    <Button
                      key={field}
                      variant={sortField === field ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleSort(field)}
                      className="text-xs"
                    >
                      {label}
                      {getSortIcon(field)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <StatusFilter />

            {/* Results Summary */}
            <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <span>
                총 {processedEstimates.length}개의 견적
                {searchTerm && (
                  <span className="ml-2 text-blue-600">
                    ('{searchTerm}' 검색결과)
                  </span>
                )}
              </span>
              
              {processedEstimates.length > 0 && (
                <span>
                  총 견적금액: {new Intl.NumberFormat('ko-KR').format(
                    processedEstimates.reduce((sum, estimate) => sum + estimate.cost, 0)
                  )}원
                </span>
              )}
            </div>
          </div>

          {/* Estimate Cards */}
          {processedEstimates.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">견적이 없습니다</h3>
              <p className="text-gray-600">
                {searchTerm ? '검색 조건에 맞는 견적이 없습니다.' : '현재 등록된 견적이 없습니다.'}
              </p>
              {searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm('')}
                  className="mt-4"
                >
                  검색 초기화
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {processedEstimates.map((estimate) => (
                <EstimateCard
                  key={estimate.id}
                  estimate={estimate}
                  onEdit={onEstimateEdit}
                  onView={onEstimateView}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}