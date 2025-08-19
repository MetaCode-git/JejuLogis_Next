'use client';

import React from 'react';
import { cn } from '@/lib/theme';

interface ResponsiveContainerProps {
  className?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md', 
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full'
};

export function ResponsiveContainer({ 
  className, 
  children, 
  maxWidth = 'full' 
}: ResponsiveContainerProps) {
  return (
    <div className={cn(
      'container mx-auto px-4',
      maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  );
}

interface ShowOnProps {
  breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wide';
  children: React.ReactNode;
}

export function ShowOn({ breakpoint, children }: ShowOnProps) {
  const classes = {
    mobile: 'block md:hidden',
    tablet: 'hidden md:block lg:hidden',
    desktop: 'hidden lg:block xl:hidden', 
    wide: 'hidden xl:block'
  };

  return (
    <div className={classes[breakpoint]}>
      {children}
    </div>
  );
}

export function HideOn({ breakpoint, children }: ShowOnProps) {
  const classes = {
    mobile: 'hidden md:block',
    tablet: 'block md:hidden lg:block',
    desktop: 'block lg:hidden xl:block',
    wide: 'block xl:hidden'
  };

  return (
    <div className={classes[breakpoint]}>
      {children}
    </div>
  );
}