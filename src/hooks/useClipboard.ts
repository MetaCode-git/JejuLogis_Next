'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export interface ClipboardResult {
  isSupported: boolean;
  copyToClipboard: (text: string, successMessage?: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook for clipboard operations with fallback support
 * Provides cross-browser clipboard functionality with user feedback
 */
export const useClipboard = (): ClipboardResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if clipboard API is supported
  const isSupported = typeof navigator !== 'undefined' && 
                     'clipboard' in navigator && 
                     typeof navigator.clipboard.writeText === 'function';

  const copyToClipboard = useCallback(async (
    text: string, 
    successMessage: string = '클립보드에 복사되었습니다.'
  ): Promise<boolean> => {
    if (!text) {
      const errorMsg = '복사할 텍스트가 없습니다.';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (isSupported) {
        // Use modern Clipboard API
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback method for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        
        // Make the textarea out of viewport
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.setAttribute('readonly', '');
        textArea.setAttribute('aria-hidden', 'true');
        
        document.body.appendChild(textArea);
        
        // Focus and select the text
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, 99999); // For mobile devices
        
        // Execute copy command
        const successful = document.execCommand('copy');
        
        // Clean up
        document.body.removeChild(textArea);
        
        if (!successful) {
          throw new Error('복사 명령이 실패했습니다.');
        }
      }

      toast.success(successMessage);
      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '클립보드 복사에 실패했습니다.';
      setError(errorMessage);
      
      toast.error(errorMessage, {
        description: '텍스트를 수동으로 복사해주세요.',
      });
      
      // Show a fallback modal or alert with the text for manual copy
      if (typeof window !== 'undefined') {
        console.error('클립보드 복사 실패:', err);
        console.log('복사할 텍스트:', text);
        
        // In development, also log to console for debugging
        if (process.env.NODE_ENV === 'development') {
          alert(`클립보드 복사 실패. 다음 텍스트를 수동으로 복사하세요:\n\n${text.substring(0, 200)}${text.length > 200 ? '...' : ''}`);
        }
      }
      
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  return {
    isSupported,
    copyToClipboard,
    isLoading,
    error,
  };
};

/**
 * Utility function to format text for clipboard
 */
export const formatTextForClipboard = (text: string): string => {
  return text
    .replace(/^\s+/gm, '') // Remove leading whitespace from each line
    .replace(/\s+$/gm, '') // Remove trailing whitespace from each line
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
    .trim(); // Remove leading/trailing whitespace from entire text
};

/**
 * Template variables replacement utility
 */
export const replaceTemplateVariables = (
  template: string, 
  variables: Record<string, string | number | undefined>
): string => {
  let result = template;
  
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    const replacement = value?.toString() || '';
    result = result.replace(new RegExp(placeholder, 'g'), replacement);
  });
  
  return result;
};