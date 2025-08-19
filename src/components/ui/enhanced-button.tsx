import React from 'react';
import { Button, ButtonProps } from './button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { cn } from '@/lib/theme';
import { LucideIcon } from 'lucide-react';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  gradient?: boolean;
  pulse?: boolean;
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ 
    children, 
    loading = false, 
    loadingText, 
    icon: Icon, 
    iconPosition = 'left',
    fullWidth = false,
    gradient = false,
    pulse = false,
    className,
    disabled,
    variant,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <Button
        ref={ref}
        disabled={isDisabled}
        variant={variant}
        className={cn(
          // 기본 스타일
          'transition-all duration-200',
          
          // 전체 너비
          fullWidth && 'w-full',
          
          // 그라데이션 효과
          gradient && variant === 'default' && [
            'bg-gradient-to-r from-red-500 to-red-600',
            'hover:from-red-600 hover:to-red-700',
            'text-white border-0'
          ],
          
          // 펄스 애니메이션
          pulse && 'animate-pulse',
          
          // 로딩 상태
          loading && 'cursor-not-allowed opacity-80',
          
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-center gap-2">
          {loading && <LoadingSpinner size="sm" />}
          
          {!loading && Icon && iconPosition === 'left' && (
            <Icon className="w-4 h-4" />
          )}
          
          <span>
            {loading && loadingText ? loadingText : children}
          </span>
          
          {!loading && Icon && iconPosition === 'right' && (
            <Icon className="w-4 h-4" />
          )}
        </div>
      </Button>
    );
  }
);

EnhancedButton.displayName = 'EnhancedButton';

export { EnhancedButton, type EnhancedButtonProps };