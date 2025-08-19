import { CompanyConfig } from '@/types/company';

export const breakpoints = {
  mobile: '0px',      // 모바일: 0px ~ 767px
  tablet: '768px',    // 태블릿: 768px ~ 1023px
  desktop: '1024px',  // 데스크톱: 1024px ~ 1439px
  wide: '1440px'      // 와이드: 1440px 이상
} as const;

export function applyTheme(config: CompanyConfig) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  
  // 테마 색상 적용
  root.style.setProperty('--color-primary', config.theme.primaryColor);
  root.style.setProperty('--color-secondary', config.theme.secondaryColor);
  
  // CSS 변수로 변환
  const primaryRgb = hexToRgb(config.theme.primaryColor);
  const secondaryRgb = hexToRgb(config.theme.secondaryColor);
  
  if (primaryRgb) {
    root.style.setProperty('--primary', `${primaryRgb.r} ${primaryRgb.g} ${primaryRgb.b}`);
  }
  
  if (secondaryRgb) {
    root.style.setProperty('--secondary', `${secondaryRgb.r} ${secondaryRgb.g} ${secondaryRgb.b}`);
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// 반응형 유틸리티
export function useBreakpoint() {
  if (typeof window === 'undefined') return 'mobile';
  
  const width = window.innerWidth;
  if (width >= 1440) return 'wide';
  if (width >= 1024) return 'desktop';
  if (width >= 768) return 'tablet';
  return 'mobile';
}

// 클래스명 유틸리티
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}