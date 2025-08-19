import { useEffect, useState, useRef, RefObject } from 'react';
import { useUIStore } from '@/stores/useUIStore';

// 포커스 관리 훅
export function useFocusManagement() {
  const focusableElementsSelector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  const trapFocus = (containerRef: RefObject<HTMLElement>) => {
    if (!containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(focusableElementsSelector);
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  };

  const restoreFocus = (elementToFocus?: HTMLElement) => {
    if (elementToFocus) {
      elementToFocus.focus();
    }
  };

  return { trapFocus, restoreFocus };
}

// 키보드 네비게이션 훅
export function useKeyboardNavigation(onEscape?: () => void, onEnter?: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          if (onEscape) {
            e.preventDefault();
            onEscape();
          }
          break;
        case 'Enter':
          if (onEnter && e.target instanceof HTMLElement && e.target.role === 'button') {
            e.preventDefault();
            onEnter();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, onEnter]);
}

// 스크린 리더 공지 훅
export function useAnnouncement() {
  const [announcement, setAnnouncement] = useState<string>('');

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement(''); // 기존 메시지 클리어
    setTimeout(() => {
      setAnnouncement(message);
    }, 100);

    // 일정 시간 후 메시지 클리어
    setTimeout(() => {
      setAnnouncement('');
    }, 3000);
  };

  const AnnouncementRegion = ({ priority = 'polite' }: { priority?: 'polite' | 'assertive' }) => (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );

  return { announce, AnnouncementRegion };
}

// 색상 대비 및 시각적 접근성 훅
export function useVisualAccessibility() {
  const { reducedMotion, highContrast, fontSize, setReducedMotion, setHighContrast, setFontSize } = useUIStore();

  useEffect(() => {
    // 사용자 시스템 설정 감지
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');

    setReducedMotion(prefersReducedMotion.matches);

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
    };

    prefersReducedMotion.addEventListener('change', handleReducedMotionChange);
    prefersHighContrast.addEventListener('change', handleHighContrastChange);

    return () => {
      prefersReducedMotion.removeEventListener('change', handleReducedMotionChange);
      prefersHighContrast.removeEventListener('change', handleHighContrastChange);
    };
  }, [setReducedMotion, setHighContrast]);

  // 폰트 크기 적용
  useEffect(() => {
    const root = document.documentElement;
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    
    root.style.fontSize = fontSizeMap[fontSize];
  }, [fontSize]);

  // 고대비 모드 적용
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);

  // 모션 감소 적용
  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reducedMotion);
  }, [reducedMotion]);

  return {
    reducedMotion,
    highContrast,
    fontSize,
    setReducedMotion,
    setHighContrast,
    setFontSize,
  };
}

// ARIA 속성 관리 훅
export function useAriaAttributes(isExpanded?: boolean, hasPopup?: boolean) {
  const [ariaAttributes, setAriaAttributes] = useState({
    'aria-expanded': isExpanded,
    'aria-haspopup': hasPopup,
  });

  useEffect(() => {
    setAriaAttributes({
      'aria-expanded': isExpanded,
      'aria-haspopup': hasPopup,
    });
  }, [isExpanded, hasPopup]);

  return ariaAttributes;
}

// 폼 접근성 훅
export function useFormAccessibility() {
  const generateId = (prefix: string = 'field') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const getLabelProps = (id: string, required?: boolean) => ({
    htmlFor: id,
    'aria-required': required,
  });

  const getInputProps = (id: string, describedBy?: string, invalid?: boolean) => ({
    id,
    'aria-describedby': describedBy,
    'aria-invalid': invalid,
  });

  const getErrorProps = (id: string) => ({
    id: `${id}-error`,
    role: 'alert',
    'aria-live': 'polite' as const,
  });

  return {
    generateId,
    getLabelProps,
    getInputProps,
    getErrorProps,
  };
}

// 랜드마크 역할 관리 훅
export function useLandmarkRoles() {
  const getLandmarkProps = (role: 'main' | 'navigation' | 'banner' | 'contentinfo' | 'complementary' | 'search', label?: string) => ({
    role,
    'aria-label': label,
  });

  return { getLandmarkProps };
}