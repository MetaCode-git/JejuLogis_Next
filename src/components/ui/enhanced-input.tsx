import React, { forwardRef, useState } from 'react';
import { Input, InputProps } from './input';
import { cn } from '@/lib/theme';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

interface EnhancedInputProps extends Omit<InputProps, 'type'> {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  required?: boolean;
  showPasswordToggle?: boolean;
  formatPhoneNumber?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({
    type = 'text',
    label,
    description,
    error,
    success,
    required = false,
    showPasswordToggle = false,
    formatPhoneNumber = false,
    icon,
    iconPosition = 'left',
    className,
    value,
    onChange,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');

    const inputType = type === 'password' && showPassword ? 'text' : type;
    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      // 전화번호 포맷팅
      if (formatPhoneNumber && type === 'tel') {
        // 숫자만 추출
        const numbers = newValue.replace(/\D/g, '');
        
        // 한국 전화번호 포맷 적용
        if (numbers.length <= 3) {
          newValue = numbers;
        } else if (numbers.length <= 7) {
          newValue = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else if (numbers.length <= 11) {
          newValue = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
        } else {
          newValue = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
        }
        
        e.target.value = newValue;
      }

      setInternalValue(newValue);
      onChange?.(e);
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {/* Left Icon */}
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          
          <Input
            ref={ref}
            type={inputType}
            value={internalValue}
            onChange={handleChange}
            className={cn(
              // 기본 스타일
              'transition-all duration-200',
              
              // 아이콘 여백
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              
              // 패스워드 토글 여백
              (type === 'password' && showPasswordToggle) && 'pr-10',
              
              // 상태별 스타일
              hasError && [
                'border-red-500 focus:border-red-500 focus:ring-red-200'
              ],
              hasSuccess && [
                'border-green-500 focus:border-green-500 focus:ring-green-200'
              ],
              
              className
            )}
            {...props}
          />
          
          {/* Right Icon */}
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          
          {/* Password Toggle */}
          {type === 'password' && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
          
          {/* Status Icons */}
          {(hasError || hasSuccess) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {hasError && <AlertCircle className="w-4 h-4 text-red-500" />}
              {hasSuccess && <CheckCircle className="w-4 h-4 text-green-500" />}
            </div>
          )}
        </div>
        
        {/* Description */}
        {description && !error && !success && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        
        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}
        
        {/* Success Message */}
        {success && !error && (
          <p className="text-sm text-green-600 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {success}
          </p>
        )}
      </div>
    );
  }
);

EnhancedInput.displayName = 'EnhancedInput';

export { EnhancedInput, type EnhancedInputProps };