import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CompanyProvider } from '@/contexts/CompanyContext';
import { Toaster } from '@/components/ui/sonner';

// 테스트용 Query Client 생성
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
    },
  });
}

// 테스트용 Wrapper 컴포넌트
interface AllTheProvidersProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

const AllTheProviders = ({ children, queryClient }: AllTheProvidersProps) => {
  const testQueryClient = queryClient || createTestQueryClient();

  return (
    <QueryClientProvider client={testQueryClient}>
      <CompanyProvider>
        {children}
        <Toaster />
      </CompanyProvider>
    </QueryClientProvider>
  );
};

// 커스텀 render 함수
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
}

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { queryClient, ...renderOptions } = options;

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <AllTheProviders queryClient={queryClient}>{children}</AllTheProviders>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// 테스트용 Hook Wrapper
export function createWrapper(queryClient?: QueryClient) {
  return ({ children }: { children: ReactNode }) => (
    <AllTheProviders queryClient={queryClient}>{children}</AllTheProviders>
  );
}

// 폼 테스트 유틸리티
export const fillForm = async (
  getByLabelText: any,
  userEvent: any,
  formData: Record<string, string>
) => {
  for (const [label, value] of Object.entries(formData)) {
    const input = getByLabelText(label);
    await userEvent.clear(input);
    await userEvent.type(input, value);
  }
};

// 비동기 작업 대기 유틸리티
export const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

// 모킹된 router 생성
export const createMockRouter = (router: Partial<any> = {}) => ({
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  push: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(() => Promise.resolve()),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: true,
  isReady: true,
  defaultLocale: 'ko',
  domainLocales: [],
  isPreview: false,
  ...router,
});

// 로컬 스토리지 모킹 유틸리티
export const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => Object.keys(store)[index] || null,
  };
})();

// 날짜 모킹 유틸리티
export const mockDate = (dateString: string) => {
  const mockDate = new Date(dateString);
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  return mockDate;
};

// 네트워크 상태 모킹
export const mockNetworkStatus = (isOnline: boolean) => {
  Object.defineProperty(navigator, 'onLine', {
    writable: true,
    value: isOnline,
  });

  if (isOnline) {
    window.dispatchEvent(new Event('online'));
  } else {
    window.dispatchEvent(new Event('offline'));
  }
};

// 미디어 쿼리 모킹
export const mockMediaQuery = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

// 테스트 데이터 팩토리
export const createTestEstimateData = (overrides = {}) => ({
  vehicleCategory: 'midsize',
  vehicleModel: '현대 아반떼 2023년형',
  departureAddress: '제주특별자치도 제주시 연동 123-45',
  arrivalAddress: '제주특별자치도 서귀포시 중문동 67-89',
  transportDate: '2024-03-15',
  customerName: '테스트 고객',
  customerPhone: '010-1234-5678',
  customerEmail: 'test@example.com',
  specialRequests: '테스트 요청사항',
  ...overrides,
});

export const createTestCompanyConfig = (overrides = {}) => ({
  company: {
    name: '제주탁송',
    phone: '064-123-4567',
    email: 'info@jejulogis.com',
    address: '제주특별자치도 제주시 중앙로 123',
    businessNumber: '123-45-67890',
    ownerName: '김제주',
    businessHours: '24시간 운영',
    bankInfo: {
      bankName: '농협은행',
      accountNumber: '123-456-789012',
      accountHolder: '제주탁송'
    }
  },
  designatedDriver: {
    name: '번개 대리운전',
    phone: '064-987-6543'
  },
  ...overrides,
});

// re-export everything from React Testing Library
export * from '@testing-library/react';

// override render method
export { customRender as render };