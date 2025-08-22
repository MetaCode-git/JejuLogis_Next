'use client';

import { useCallback } from 'react';
import { useAdminStore } from '@/stores/useAdminStore';
import { Badge } from '@/components/ui/badge';
import { ESTIMATE_STATUS_LABELS } from '@/types/admin';
import { Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StatusFilterProps {
  onFilterChange?: () => void;
  className?: string;
}

export function StatusFilter({ onFilterChange, className }: StatusFilterProps) {
  const { estimateFilter, setEstimateFilter, updateEstimateFilter } = useAdminStore();

  const handleFilterToggle = useCallback((filterKey: keyof typeof estimateFilter) => {
    const newValue = !estimateFilter[filterKey];
    setEstimateFilter({ [filterKey]: newValue });
    updateEstimateFilter();
    onFilterChange?.();
  }, [estimateFilter, setEstimateFilter, updateEstimateFilter, onFilterChange]);

  const resetFilters = useCallback(() => {
    setEstimateFilter({
      showWaiting: true,
      showRunning: true,
      showCompleted: true,
      showCanceled: true,
    });
    updateEstimateFilter();
    onFilterChange?.();
  }, [setEstimateFilter, updateEstimateFilter, onFilterChange]);

  const activeFiltersCount = Object.values(estimateFilter).filter(Boolean).length;
  const totalFilters = Object.keys(estimateFilter).length;

  const filterButtons = [
    {
      key: 'showWaiting' as const,
      label: ESTIMATE_STATUS_LABELS[0],
      color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      activeColor: 'bg-yellow-500 text-white hover:bg-yellow-600',
    },
    {
      key: 'showRunning' as const,
      label: ESTIMATE_STATUS_LABELS[1],
      color: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      activeColor: 'bg-blue-500 text-white hover:bg-blue-600',
    },
    {
      key: 'showCompleted' as const,
      label: ESTIMATE_STATUS_LABELS[2],
      color: 'bg-green-100 text-green-800 hover:bg-green-200',
      activeColor: 'bg-green-500 text-white hover:bg-green-600',
    },
    {
      key: 'showCanceled' as const,
      label: ESTIMATE_STATUS_LABELS[3],
      color: 'bg-red-100 text-red-800 hover:bg-red-200',
      activeColor: 'bg-red-500 text-white hover:bg-red-600',
    },
  ];

  return (
    <div className={`space-y-4 ${className || ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">상태별 필터</h3>
          <Badge variant="secondary" className="text-xs">
            {activeFiltersCount}/{totalFilters} 활성
          </Badge>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="text-gray-600 hover:text-gray-800"
          title="필터 초기화"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          초기화
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterButtons.map(({ key, label, color, activeColor }) => {
          const isActive = estimateFilter[key];
          
          return (
            <button
              key={key}
              onClick={() => handleFilterToggle(key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                isActive ? activeColor : color
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              role="checkbox"
              aria-checked={isActive}
              aria-label={`${label} 필터 ${isActive ? '비활성화' : '활성화'}`}
            >
              <div className="flex items-center space-x-1">
                <span>{label}</span>
                {isActive && (
                  <span className="inline-block w-2 h-2 bg-white rounded-full opacity-80" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter summary */}
      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        {activeFiltersCount === totalFilters ? (
          <span>모든 상태의 견적이 표시됩니다.</span>
        ) : activeFiltersCount === 0 ? (
          <span className="text-orange-600">⚠️ 모든 필터가 비활성화되어 견적이 표시되지 않습니다.</span>
        ) : (
          <span>
            선택된 상태: {filterButtons
              .filter(({ key }) => estimateFilter[key])
              .map(({ label }) => label)
              .join(', ')}
          </span>
        )}
      </div>
    </div>
  );
}