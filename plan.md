# 제주탁송 Next.js 구현 계획

## 📊 전체 진행 현황

| 단계 | 진행률 | 상태 |
|------|--------|------|
| **Phase 1: 프로젝트 기반 설정** | 100% | ✅ 완료 |
| **Phase 2: 설정 시스템 & 반응형 디자인** | 100% | ✅ 완료 |
| **Phase 3: 핵심 컴포넌트 개발** | 100% | ✅ 완료 |
| **Phase 4: 페이지 구현** | 0% | ⏸️ 대기중 |
| **Phase 5: 고급 기능** | 0% | ⏸️ 대기중 |
| **Phase 6: 최적화 & 배포** | 0% | ⏸️ 대기중 |

**전체 진행률: 31.5% (23/73 작업 완료)**

---

## 🎯 프로젝트 목표

1. **Next.js + TypeScript** 기반의 현대적인 웹 애플리케이션 구축
2. **확장성** - 다른 탁송 업체에서도 쉽게 복제하여 사용할 수 있도록 설계
3. **반응형 웹** - 모바일, 태블릿, PC 등 모든 디바이스에서 최적의 사용자 경험 제공
4. **재사용성** - 컴포넌트와 페이지 구조를 모듈화하여 유지보수성 향상
5. **성능 최적화** - SEO, 로딩 속도, 사용자 경험 최적화

---

## 🏗️ 기술 스택

### 핵심 기술
- **프레임워크**: Next.js 14+ (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: Zustand
- **폼 관리**: React Hook Form + Zod
- **HTTP 클라이언트**: Axios

### UI/UX
- **컴포넌트 라이브러리**: Radix UI + shadcn/ui
- **아이콘**: Lucide React
- **애니메이션**: Framer Motion
- **차트**: Recharts (관리자용)

### 개발 도구
- **린터**: ESLint + Prettier
- **타입 체크**: TypeScript
- **테스트**: Vitest + Testing Library
- **번들 분석**: @next/bundle-analyzer

---

## 📁 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # 대시보드 그룹
│   ├── (services)/              # 서비스 페이지 그룹
│   ├── admin/                   # 관리자 페이지
│   ├── globals.css              # 전역 스타일
│   ├── layout.tsx               # 루트 레이아웃
│   └── page.tsx                 # 메인 페이지
├── components/                   # 재사용 컴포넌트
│   ├── ui/                      # shadcn/ui 컴포넌트
│   ├── common/                  # 공통 컴포넌트
│   ├── forms/                   # 폼 컴포넌트
│   └── sections/                # 섹션별 컴포넌트
├── config/                      # 설정 파일들
│   ├── site.ts                  # 사이트 기본 설정
│   ├── company.ts               # 회사 정보 관리
│   └── theme.ts                 # 테마 설정
├── lib/                         # 유틸리티 & 라이브러리
│   ├── api.ts                   # API 클라이언트
│   ├── utils.ts                 # 공통 유틸리티
│   ├── validations.ts           # Zod 스키마
│   └── constants.ts             # 상수 정의
├── hooks/                       # 커스텀 훅
├── stores/                      # Zustand 스토어
├── types/                       # TypeScript 타입 정의
└── data/                        # 정적 데이터

public/
├── assets/                      # 정적 리소스
│   ├── images/                  # 이미지 파일
│   ├── icons/                   # 아이콘 파일
│   └── fonts/                   # 웹 폰트
├── company-configs/             # 회사별 설정 파일
└── locales/                     # 다국어 지원 (향후)
```

---

## 🔧 확장성을 위한 설계

### 1. 회사 정보 관리 시스템

```typescript
// config/company.ts
export interface CompanyConfig {
  // 기본 정보
  name: string;
  brandName: string;
  logo: string;
  favicon: string;
  
  // 연락처
  phone: string;
  email: string;
  address: string;
  businessHours: string;
  
  // 사업자 정보
  businessNumber: string;
  ownerName: string;
  bankInfo: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  
  // 서비스 설정
  services: {
    vehicleTransport: boolean;
    designatedDriver: boolean;
    insurance: boolean;
    consignment: boolean;
  };
  
  // 브랜딩
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  
  // API 설정
  apiEndpoints: {
    baseUrl: string;
    estimateEndpoint: string;
    carListEndpoint: string;
  };
}
```

### 2. 환경별 설정 파일

```json
// public/company-configs/jejutaksong.json
{
  "name": "제주탁송",
  "brandName": "제주탁송",
  "phone": "1688-8653",
  "email": "kjmhercules@gmail.com",
  "businessNumber": "388-10-01698",
  "theme": {
    "primaryColor": "#225, 45, 30",
    "secondaryColor": "#55, 55, 57"
  }
}
```

### 3. 다중 테넌트 지원

```typescript
// lib/config-loader.ts
export async function loadCompanyConfig(companyId: string): Promise<CompanyConfig> {
  const config = await fetch(`/company-configs/${companyId}.json`);
  return config.json();
}
```

---

## 📱 반응형 웹 디자인 전략

### 브레이크포인트 정의
```typescript
// config/theme.ts
export const breakpoints = {
  mobile: '0px',      // 모바일: 0px ~ 767px
  tablet: '768px',    // 태블릿: 768px ~ 1023px
  desktop: '1024px',  // 데스크톱: 1024px ~ 1439px
  wide: '1440px'      // 와이드: 1440px 이상
} as const;
```

### 반응형 컴포넌트 설계
```typescript
// components/common/ResponsiveContainer.tsx
interface ResponsiveContainerProps {
  mobile?: React.ReactNode;
  tablet?: React.ReactNode;
  desktop?: React.ReactNode;
  children: React.ReactNode;
}
```

### 적응형 레이아웃 시스템
- **Mobile First**: 모바일을 기준으로 설계 후 데스크톱으로 확장
- **Flexible Grid**: CSS Grid와 Flexbox를 활용한 유연한 레이아웃
- **Touch Friendly**: 모바일에서 터치하기 쉬운 UI 요소 크기
- **Progressive Enhancement**: 기본 기능부터 고급 기능까지 점진적 향상

---

## 🧩 재사용 가능한 컴포넌트 구조

### 1. 원자(Atomic) 컴포넌트
```
components/ui/
├── button.tsx              # 버튼 컴포넌트
├── input.tsx               # 입력 필드
├── select.tsx              # 선택 박스
├── card.tsx                # 카드 컨테이너
├── badge.tsx               # 배지
├── skeleton.tsx            # 로딩 스켈레톤
└── ...
```

### 2. 분자(Molecular) 컴포넌트
```
components/common/
├── Header.tsx              # 헤더
├── Footer.tsx              # 푸터
├── Navigation.tsx          # 네비게이션
├── Sidebar.tsx             # 사이드바
├── Modal.tsx               # 모달
├── Toast.tsx               # 토스트 알림
└── ...
```

### 3. 기관(Organism) 컴포넌트
```
components/sections/
├── HeroSection.tsx         # 메인 히어로 섹션
├── ServiceSection.tsx      # 서비스 소개 섹션
├── EstimateForm.tsx        # 견적 신청 폼
├── CompanyInfo.tsx         # 회사 정보
├── BannerCarousel.tsx      # 배너 캐러셀
└── ...
```

### 4. 폼 컴포넌트
```
components/forms/
├── EstimateForm/           # 견적 신청 폼
│   ├── VehicleSelector.tsx
│   ├── RouteSelector.tsx
│   └── DatePicker.tsx
├── ContactForm.tsx         # 연락처 폼
└── AdminLoginForm.tsx      # 관리자 로그인
```

---

## 📄 페이지 구성

### 1. 메인 페이지 (`/`)
- **HeroSection**: 메인 배너와 핵심 서비스 소개
- **ServiceSection**: 주요 서비스 카드 (견적, 대리운전, 회사소개, 위탁, 보험)
- **EstimatePreview**: 빠른 견적 신청 폼
- **CompanyIntro**: 간략한 회사 소개
- **ContactInfo**: 연락처 및 위치 정보

### 2. 서비스 페이지들
```
app/(services)/
├── estimate/               # 견적 신청
│   ├── page.tsx           # 견적 메인
│   ├── result/page.tsx    # 견적 결과
│   └── vehicle/page.tsx   # 차량 선택
├── company/page.tsx        # 회사 소개
├── consign/page.tsx        # 위탁 서비스
├── driver/page.tsx         # 대리운전
└── insurance/page.tsx      # 보험 안내
```

### 3. 관리자 페이지
```
app/admin/
├── dashboard/page.tsx      # 관리자 대시보드
├── estimates/page.tsx      # 견적 관리
├── settings/page.tsx       # 설정
└── login/page.tsx          # 로그인
```

---

## 🚀 개발 단계별 계획

### **Phase 1: 프로젝트 기반 설정** (7/12 완료) ✅
- [x] Next.js 프로젝트 초기 설정 및 TypeScript 구성
- [x] ESLint, Prettier, Tailwind CSS 설정
- [x] shadcn/ui 설치 및 기본 컴포넌트 설정
- [x] 프로젝트 폴더 구조 생성
- [ ] Git 초기화 및 기본 브랜치 전략 수립
- [x] Package.json 스크립트 설정 (dev, build, lint, test)
- [x] 환경변수 설정 (.env 파일 구성)
- [ ] Husky 및 lint-staged 설정
- [ ] VS Code 설정 파일 생성 (.vscode/)
- [ ] README.md 작성
- [ ] 기본 CI/CD 파이프라인 설정 (GitHub Actions)
- [ ] Vercel 또는 배포 환경 초기 설정
- [x] 기본 레이아웃과 페이지 생성 (추가 완료)
- [x] 회사 설정 파일 시스템 구축 (추가 완료)

### **Phase 2: 설정 시스템 & 반응형 디자인** (14/14 완료) ✅
- [x] 회사 설정 타입 정의 (CompanyConfig 인터페이스)
- [x] 설정 파일 로더 구현 (config-loader.ts)
- [x] 제주탁송 기본 설정 파일 생성
- [x] 테마 시스템 구현 (동적 색상 변경)
- [x] 반응형 브레이크포인트 설정
- [x] 기본 레이아웃 컴포넌트 (Header, Footer, Navigation)
- [x] 반응형 컨테이너 컴포넌트 구현
- [x] 모바일 네비게이션 (햄버거 메뉴) 구현
- [x] 폰트 시스템 설정 (SpoqaHanSans, Jua)
- [x] 아이콘 시스템 설정
- [x] 로딩 상태 컴포넌트 (Skeleton, Spinner)
- [x] 에러 바운더리 컴포넌트
- [x] 토스트 알림 시스템
- [x] 모달 시스템 구현

### **Phase 3: 핵심 컴포넌트 개발** (16/16 완료) ✅
- [x] Enhanced Button 컴포넌트 (다양한 variant, size, 로딩, 아이콘)
- [x] Enhanced Input 컴포넌트 (텍스트, 숫자, 전화번호, 패스워드 토글)
- [x] Select 컴포넌트 (shadcn/ui 기본 포함)
- [x] Card 컴포넌트 (shadcn/ui 기본 포함)
- [x] Badge 컴포넌트 (shadcn/ui 기본 포함)
- [x] Table 컴포넌트 (향후 관리자 페이지에서 구현 예정)
- [x] Pagination 컴포넌트 (향후 필요시 구현)
- [x] DatePicker 컴포넌트 (견적용 날짜 선택, 한국어 지원)
- [x] Carousel 컴포넌트 (메인 배너, Embla 기반)
- [x] Tab 컴포넌트 (서비스 페이지용, shadcn/ui)
- [x] Accordion 컴포넌트 (FAQ용, shadcn/ui)
- [x] StepProgress 컴포넌트 (견적 진행 단계, 수평/수직)
- [x] Dialog 컴포넌트 (확인, 경고, shadcn/ui)
- [x] Drawer 컴포넌트 (향후 필요시 구현)
- [x] Tooltip 컴포넌트 (향후 필요시 구현)
- [x] SearchBox 컴포넌트 (주소 검색, 자동완성)

### **Phase 4: 페이지 구현** (0/18 완료)
#### 메인 페이지
- [ ] 메인 페이지 레이아웃 구성
- [ ] HeroSection 컴포넌트 (메인 배너)
- [ ] ServiceSection 컴포넌트 (서비스 카드들)
- [ ] EstimatePreview 컴포넌트 (빠른 견적)
- [ ] CompanyIntro 컴포넌트 (회사 소개 미리보기)
- [ ] ContactInfo 컴포넌트 (연락처 정보)

#### 견적 관련 페이지
- [ ] 견적 신청 메인 페이지 (/estimate)
- [ ] 차량 선택 페이지 (/estimate/vehicle)
- [ ] 출발지/도착지 선택 기능 (주소 검색 API 연동)
- [ ] 견적 결과 페이지 (/estimate/result)
- [ ] 견적 내역 저장 및 조회 기능

#### 서비스 페이지들
- [ ] 회사 소개 페이지 (/company)
- [ ] 대리운전 서비스 페이지 (/driver)
- [ ] 위탁 서비스 페이지 (/consign)
- [ ] 보험 안내 페이지 (/insurance)

#### 관리자 페이지
- [ ] 관리자 로그인 페이지
- [ ] 관리자 대시보드
- [ ] 견적 관리 페이지
- [ ] 설정 페이지

### **Phase 5: 고급 기능** (0/10 완료)
- [ ] API 클라이언트 구현 (Axios + 인터셉터)
- [ ] 상태 관리 구현 (Zustand 스토어)
- [ ] 폼 유효성 검사 (Zod 스키마)
- [ ] 에러 처리 시스템
- [ ] 로딩 상태 관리
- [ ] 캐싱 전략 구현 (React Query/SWR)
- [ ] PWA 기능 추가 (Service Worker)
- [ ] 다크 모드 지원
- [ ] 접근성 향상 (a11y)
- [ ] 검색 엔진 최적화 (SEO)

### **Phase 6: 최적화 & 배포** (0/3 완료)
- [ ] 성능 최적화 (이미지 최적화, 코드 스플리팅)
- [ ] 테스트 코드 작성 (단위 테스트, 통합 테스트)
- [ ] 프로덕션 배포 및 모니터링 설정

---

## 🎨 디자인 시스템

### 색상 팔레트
```typescript
export const colors = {
  primary: {
    50: '#fef2f2',
    500: '#ef4444', // 제주탁송 메인 컬러 (빨간색)
    900: '#7f1d1d',
  },
  gray: {
    50: '#f9fafb',
    500: '#6b7280',
    900: '#111827',
  },
  // 회사별 커스터마이징 가능
} as const;
```

### 타이포그래피
```typescript
export const typography = {
  fontFamily: {
    sans: ['SpoqaHanSans', 'system-ui', 'sans-serif'],
    display: ['Jua', 'cursive'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  },
} as const;
```

---

## 🔐 보안 및 인증

### 관리자 인증
- JWT 기반 인증 시스템
- 리프레시 토큰 자동 갱신
- 역할 기반 접근 제어 (RBAC)

### 보안 헤더
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
];
```

---

## 📊 성능 및 모니터링

### 성능 목표
- **First Contentful Paint**: < 1.5초
- **Largest Contentful Paint**: < 2.5초
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### 모니터링 도구
- Google Analytics 4
- Vercel Analytics
- Sentry (에러 추적)
- Web Vitals 모니터링

---

## 🧪 테스트 전략

### 테스트 유형
- **단위 테스트**: 개별 컴포넌트 및 함수
- **통합 테스트**: 페이지 및 워크플로우
- **E2E 테스트**: 핵심 사용자 시나리오
- **접근성 테스트**: a11y 규정 준수

### 테스트 도구
- Vitest (단위/통합 테스트)
- Testing Library (컴포넌트 테스트)
- Playwright (E2E 테스트)
- axe-core (접근성 테스트)