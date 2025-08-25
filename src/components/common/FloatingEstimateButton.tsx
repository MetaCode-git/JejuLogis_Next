'use client';

import React, { useState } from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EstimateBottomSheet } from '@/components/estimate/EstimateBottomSheet';
import { Calculator } from 'lucide-react';
import { cn } from '@/lib/theme';

interface FloatingEstimateButtonProps {
  className?: string;
}

export function FloatingEstimateButton({ className }: FloatingEstimateButtonProps) {
  const [isEstimateBottomSheetOpen, setIsEstimateBottomSheetOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className={cn(
        "fixed bottom-4 right-4 z-50",
        "sm:bottom-6 sm:right-6",
        "md:bottom-8 md:right-8",
        className
      )}>
        <EnhancedButton
          size="lg"
          gradient
          icon={Calculator}
          iconPosition="left"
          className="text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-semibold rounded-full"
          onClick={() => setIsEstimateBottomSheetOpen(true)}
        >
          <span className="hidden sm:inline">간편 견적 조회</span>
          <span className="sm:hidden">견적</span>
        </EnhancedButton>
      </div>

      {/* Estimate Bottom Sheet */}
      <EstimateBottomSheet 
        isOpen={isEstimateBottomSheetOpen}
        onClose={() => setIsEstimateBottomSheetOpen(false)}
      />
    </>
  );
}