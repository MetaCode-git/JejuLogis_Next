// 성능 측정 유틸리티

export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

// Web Vitals 측정
export function measureWebVitals(metric: any) {
  const { name, value, id } = metric;
  
  // 개발 환경에서 콘솔에 출력
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name}: ${value}`, { id, value });
  }

  // 프로덕션에서 분석 서비스로 전송
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', name, {
        custom_parameter_1: value,
        custom_parameter_2: id,
      });
    }

    // 커스텀 분석 서비스로 전송
    sendToAnalytics({ name, value, id });
  }
}

// 분석 서비스로 데이터 전송
async function sendToAnalytics(metric: { name: string; value: number; id: string }) {
  try {
    await fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metric),
    });
  } catch (error) {
    console.error('Failed to send web vitals:', error);
  }
}

// 사용자 정의 성능 측정
export class PerformanceTracker {
  private marks: Map<string, number> = new Map();
  private measures: Map<string, number> = new Map();

  // 시작점 마킹
  mark(name: string): void {
    const timestamp = performance.now();
    this.marks.set(name, timestamp);
    
    if (typeof performance.mark === 'function') {
      performance.mark(name);
    }
  }

  // 측정 종료 및 결과 반환
  measure(name: string, startMark: string): number | null {
    const startTime = this.marks.get(startMark);
    const endTime = performance.now();
    
    if (!startTime) {
      console.warn(`Start mark "${startMark}" not found`);
      return null;
    }

    const duration = endTime - startTime;
    this.measures.set(name, duration);
    
    if (typeof performance.measure === 'function') {
      performance.measure(name, startMark);
    }

    return duration;
  }

  // 모든 측정값 반환
  getAll(): Record<string, number> {
    return Object.fromEntries(this.measures);
  }

  // 특정 측정값 반환
  get(name: string): number | undefined {
    return this.measures.get(name);
  }

  // 측정값 클리어
  clear(): void {
    this.marks.clear();
    this.measures.clear();
    
    if (typeof performance.clearMarks === 'function') {
      performance.clearMarks();
    }
    if (typeof performance.clearMeasures === 'function') {
      performance.clearMeasures();
    }
  }
}

// 전역 성능 트래커 인스턴스
export const performanceTracker = new PerformanceTracker();

// 컴포넌트 렌더링 성능 측정 HOC
export function withPerformanceTracking<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) {
  return function PerformanceTrackedComponent(props: P) {
    React.useEffect(() => {
      performanceTracker.mark(`${componentName}-mount-start`);
      
      return () => {
        const mountTime = performanceTracker.measure(
          `${componentName}-mount-time`,
          `${componentName}-mount-start`
        );
        
        if (mountTime !== null && process.env.NODE_ENV === 'development') {
          console.log(`${componentName} mount time: ${mountTime.toFixed(2)}ms`);
        }
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
}

// 리소스 로딩 성능 측정
export function measureResourceLoading() {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    
    entries.forEach((entry) => {
      if (entry.entryType === 'resource') {
        const resourceEntry = entry as PerformanceResourceTiming;
        
        // 느린 리소스 식별 (1초 이상)
        if (resourceEntry.duration > 1000) {
          console.warn(`Slow resource detected: ${resourceEntry.name}`, {
            duration: resourceEntry.duration,
            size: resourceEntry.transferSize || resourceEntry.encodedBodySize,
          });
        }
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
  
  // 정리 함수 반환
  return () => observer.disconnect();
}

// 메모리 사용량 모니터링
export function monitorMemoryUsage() {
  if (typeof window === 'undefined' || !('memory' in performance)) {
    return null;
  }

  const memory = (performance as any).memory;
  
  return {
    used: memory.usedJSHeapSize,
    total: memory.totalJSHeapSize,
    limit: memory.jsHeapSizeLimit,
    percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
  };
}

// 네트워크 정보 수집
export function getNetworkInfo() {
  if (typeof window === 'undefined' || !('connection' in navigator)) {
    return null;
  }

  const connection = (navigator as any).connection;
  
  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData,
  };
}

// 페이지 로드 성능 측정
export function measurePageLoad() {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const metrics = {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        request: navigation.responseStart - navigation.requestStart,
        response: navigation.responseEnd - navigation.responseStart,
        dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        load: navigation.loadEventEnd - navigation.loadEventStart,
        total: navigation.loadEventEnd - navigation.navigationStart,
      };

      if (process.env.NODE_ENV === 'development') {
        console.table(metrics);
      }

      // 분석 서비스로 전송
      if (process.env.NODE_ENV === 'production') {
        sendToAnalytics({
          name: 'page_load_metrics',
          value: metrics.total,
          id: 'page-load',
        });
      }
    }, 0);
  });
}

// 이미지 로딩 성능 최적화 helper
export function optimizeImageLoading() {
  if (typeof window === 'undefined') return;

  // Intersection Observer를 사용한 지연 로딩
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.1,
    }
  );

  // data-src 속성을 가진 모든 이미지를 관찰
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });

  return () => imageObserver.disconnect();
}