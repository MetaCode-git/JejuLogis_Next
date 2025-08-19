'use client';

import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, X } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { cn } from '@/lib/theme';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = '날짜를 선택하세요',
  disabled = false,
  minDate,
  maxDate,
  label,
  error,
  required = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    date ? format(date, 'yyyy-MM-dd', { locale: ko }) : ''
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setInputValue(format(selectedDate, 'yyyy-MM-dd', { locale: ko }));
      onDateChange?.(selectedDate);
      setOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 날짜 형식 검증 (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(value)) {
      const parsedDate = new Date(value);
      if (isValid(parsedDate)) {
        onDateChange?.(parsedDate);
      }
    }
  };

  const clearDate = () => {
    setInputValue('');
    onDateChange?.(undefined);
  };

  const disabledDays = [];
  if (minDate) disabledDays.push({ before: minDate });
  if (maxDate) disabledDays.push({ after: maxDate });

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'pr-20',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-200'
          )}
          type="date"
          min={minDate ? format(minDate, 'yyyy-MM-dd') : undefined}
          max={maxDate ? format(maxDate, 'yyyy-MM-dd') : undefined}
        />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {inputValue && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-gray-100"
              onClick={clearDate}
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </Button>
          )}

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-gray-100"
                disabled={disabled}
              >
                <Calendar className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-auto p-0">
              <DialogHeader className="p-4 pb-0">
                <DialogTitle>날짜 선택</DialogTitle>
              </DialogHeader>
              <div className="p-4">
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  disabled={disabledDays}
                  locale={ko}
                  className="rdp"
                  classNames={{
                    months: 'rdp-months',
                    month: 'rdp-month',
                    caption: 'rdp-caption flex justify-center py-1 relative items-center',
                    caption_label: 'rdp-caption_label text-sm font-medium',
                    nav: 'rdp-nav flex items-center',
                    nav_button: 'rdp-nav_button inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-7 w-7',
                    nav_button_previous: 'rdp-nav_button_previous absolute left-1',
                    nav_button_next: 'rdp-nav_button_next absolute right-1',
                    table: 'rdp-table w-full border-collapse',
                    head_row: 'rdp-head_row flex',
                    head_cell: 'rdp-head_cell text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                    row: 'rdp-row flex w-full mt-2',
                    cell: 'rdp-cell h-9 w-9 text-center text-sm p-0 relative first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                    day: 'rdp-day inline-flex items-center justify-center rounded-md text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 w-9',
                    day_range_end: 'rdp-day_range_end day-range-end',
                    day_selected: 'rdp-day_selected bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                    day_today: 'rdp-day_today bg-accent text-accent-foreground',
                    day_outside: 'rdp-day_outside day-outside text-muted-foreground opacity-50',
                    day_disabled: 'rdp-day_disabled text-muted-foreground opacity-50',
                    day_range_middle: 'rdp-day_range_middle aria-selected:bg-accent aria-selected:text-accent-foreground',
                    day_hidden: 'rdp-day_hidden invisible',
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}