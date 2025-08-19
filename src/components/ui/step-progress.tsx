import React from 'react';
import { Progress } from './progress';
import { cn } from '@/lib/theme';
import { CheckCircle, Circle } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  current?: boolean;
}

interface StepProgressProps {
  steps: Step[];
  className?: string;
  showLabels?: boolean;
  variant?: 'horizontal' | 'vertical';
}

export function StepProgress({
  steps,
  className,
  showLabels = true,
  variant = 'horizontal',
}: StepProgressProps) {
  const currentStepIndex = steps.findIndex((step) => step.current);
  const completedSteps = steps.filter((step) => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  if (variant === 'vertical') {
    return (
      <div className={cn('space-y-4', className)}>
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-3">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full border-2',
                  step.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : step.current
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                )}
              >
                {step.completed ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-0.5 h-12 mt-2',
                    step.completed
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  )}
                />
              )}
            </div>
            
            {showLabels && (
              <div className="flex-1 min-h-[2rem]">
                <h4
                  className={cn(
                    'font-medium',
                    step.completed || step.current
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  )}
                >
                  {step.title}
                </h4>
                {step.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Progress Bar */}
      <div className="mb-6">
        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>진행률</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
      </div>

      {/* Steps */}
      <div className="flex justify-between items-start">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              'flex flex-col items-center text-center',
              'flex-1',
              index < steps.length - 1 && 'border-r border-gray-200 pr-4',
              index > 0 && 'pl-4'
            )}
          >
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full border-2 mb-2',
                step.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : step.current
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-400'
              )}
            >
              {step.completed ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
            </div>
            
            {showLabels && (
              <div>
                <h4
                  className={cn(
                    'font-medium text-sm',
                    step.completed || step.current
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  )}
                >
                  {step.title}
                </h4>
                {step.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}