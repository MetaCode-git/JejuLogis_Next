# 제주탁송 Next.js 마이그레이션 프로젝트

## 프로젝트 개요

제주탁송은 제주도 지역의 차량 탁송 서비스를 제공하는 웹 애플리케이션입니다. 기존의 Flutter Web 애플리케이션을 Next.js로 마이그레이션하여 더 나은 성능과 SEO 최적화를 목표로 합니다.

## 기존 Flutter 애플리케이션 분석

### 주요 기능
- **차량 견적 서비스**: 차량 정보와 출발/도착지를 기반으로 한 탁송 견적 계산
- **대리운전 서비스**: 번개 대리운전 서비스 예약 및 관리
- **회사 소개**: 제주탁송 회사 정보 및 서비스 안내
- **위탁 서비스**: 차량 위탁 관련 서비스
- **보험 안내**: 탁송 보험 관련 정보
- **관리자 페이지**: 견적 관리 및 운영 도구

### 기술 스택 (Flutter)
- **상태 관리**: GetX (get: ^4.6.1)
- **네트워킹**: Retrofit + Dio (retrofit: ^4.5.0, dio: ^5.8.0+1)
- **로컬 저장소**: get_storage: ^2.0.3
- **UI 컴포넌트**: carousel_slider, page_view_indicators, flutter_spinkit
- **주소 검색**: kpostal (한국 우편번호 서비스)
- **기타**: intl, url_launcher, webview_flutter

### 주요 모듈 구조
```
lib/
├── common/              # 공통 설정 및 네트워킹
├── components/          # 재사용 가능한 UI 컴포넌트
├── enums/              # 열거형 정의
├── models/             # 데이터 모델
├── modules/            # 페이지별 모듈
│   ├── dashboard/      # 대시보드
│   ├── estimate/       # 견적 계산
│   ├── company/        # 회사 소개
│   ├── consign/        # 위탁 서비스
│   ├── designated_driver_service/  # 대리운전
│   ├── insurance/      # 보험 안내
│   └── admin/          # 관리자
├── routes/             # 라우팅 설정
└── services/           # 서비스 레이어
```

### 라우트 구조
- `/` - 루트/홈페이지
- `/home/dashboard` - 대시보드
- `/home/estimate` - 견적 계산
- `/home/company` - 회사 소개
- `/home/consign` - 위탁 서비스
- `/home/designatedDriverService` - 대리운전 서비스
- `/home/insurance` - 보험 안내
- `/admin` - 관리자 페이지
- `/login` - 로그인

### API 엔드포인트 (실제 서버 API)

#### 차량 관련 API
- `GET /car-list/total` - 전체 차량 목록 확인
  - 국산차/수입차 카테고리별 제조사와 모델 정보 반환
- `GET /car-list/search?text={검색어}` - 차량 검색
  - 검색어에 맞는 차량 모델 목록 반환

#### 견적 관련 API
- `GET /estimates/calculate?dep={출발지}&arr={도착지}&name={차량명}&date={날짜}` - 견적 계산
  - 출발지, 도착지, 차량명, 운송날짜 기반 견적 계산
- `POST /estimates/save` - 견적 저장
  - 계산된 견적 정보를 서버에 저장
- `GET /estimates` - 견적 목록 확인 & 수정 결과 확인
  - 저장된 견적 목록 조회 및 수정된 견적 결과 확인
- `POST /estimates/filtered` - 필터링된 견적 조회
  - 조건별 견적 목록 필터링 (회사별, 상태별, 날짜별 등)
- `PATCH /estimates` - 견적 수정
  - 기존 견적 정보 업데이트

#### API 구현 상태
- ✅ API 엔드포인트 상수 정의 (`src/lib/api.ts`)
- ✅ 제주탁송 API 서비스 클래스 (`src/lib/jejulogis-api.ts`)
- ✅ React Query 훅 구현 (`src/hooks/useEstimateAPI.ts`)
- ✅ API 타입 정의 (`src/types/api.ts`)
- ✅ 테스트 목업 서버 (`src/__tests__/mocks/server.ts`)

#### 제거된 기존 API
- ❌ `find_car/` (차량 검색) → `car-list/search`로 대체
- ❌ `estimate/` → `estimates/calculate`로 대체  
- ❌ `estimate/list` → `estimates`로 대체
- ❌ `estimate/filter` → `estimates/filtered`로 대체
- ❌ `getRestDeInfo` (공휴일 정보) - 서버 API 목록에 없음
- ❌ 주소 검색 API - 서버 API 목록에 없음 (클라이언트에서 별도 처리)

### 리소스 파일
- **이미지**: `assets/images/` - 배너, 아이콘, 일러스트레이션
- **폰트**: SpoqaHanSans, Jua
- **설정 파일**: `assets/texts/information.json` - 회사 정보 설정

## 회사 정보
- **회사명**: 제주탁송
- **대리운전**: 번개 대리운전
- **전화**: 1688-8653
- **영업시간**: 평일 10:00 - 20:00 (일, 공휴일 휴무)
- **소재지**: 제주특별자치도 서귀포시 신서로98번길 14, 303호

## 리소스 파일 위치
- **배너 이미지**: `legacy/assets/images/new_banner/`
- **아이콘**: `legacy/assets/icons/`, `legacy/assets/button/`
- **폰트**: `legacy/assets/fonts/`
- **설정**: `legacy/assets/texts/information.json`
- **약관**: `legacy/assets/agreement/`

## 개발 환경 및 도구

### 알림 시스템
프로젝트 개발 진행 상황을 실시간으로 알림받기 위해 **macOS AppleScript**를 활용합니다.

#### 사용 방법
```bash
# Phase 완료 시 알림
osascript -e "display alert \"Phase 1 완료!\" message \"다음 단계를 진행할까요?\""

# 에러 발생 시 알림
osascript -e "display alert \"빌드 실패!\" message \"로그를 확인해주세요.\""

# 서버 실행 완료 시 알림
osascript -e "display alert \"서버 실행 완료!\" message \"localhost:3000에서 확인하세요.\""
```

#### 특징
- ✅ macOS 시스템 네이티브 알림창 사용
- ✅ 터미널에서 직접 실행 가능
- ✅ 다른 작업 중에도 알림 확인 가능
- ✅ 각 개발 단계별 진행 상황 실시간 피드백

#### 활용 시나리오
- **Phase별 완료 알림**: 각 개발 단계 완료 시 자동 알림
- **에러 발생 알림**: 빌드 실패, 테스트 실패 등 문제 상황 즉시 알림
- **서버 상태 알림**: 개발 서버 실행, 중지 등 상태 변화 알림
- **중요 결정 요청**: 사용자 확인이 필요한 시점에서 대화형 알림