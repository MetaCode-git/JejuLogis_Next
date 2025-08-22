# 제주 서버 api

# **제주로지스 서버 API 테스트 가이드**

## **📋 기본 정보**

- **Base URL**: `https://jejulogis.kro.kr` (운영환경) / `http://localhost:8080` (개발환경)
- **Content-Type**: `application/json`
- **API 버전**: v0

## **📚 API 목록**

1. **🚗 차량 목록 API** (`/api/v0/car-list`) - 차량 조회, 검색, 타입별/제조사별 필터링
2. **📊 견적 API** (`/api/v0/estimates`) - 견적 계산, 저장, 조회, 수정, 상태 관리
3. **👥 관리자 API** (`/api/v0/admin`) - 관리자 인증, CRUD 관리 (권한 기반)
4. **📅 공휴일 API** (`/api/v0/holidays`) - 공휴일 조회 및 확인

---

## **📊 Enum 정리**

### **EstimateStatus (견적 상태)**

| **코드** | **값** | **설명** |
| --- | --- | --- |
| `0` | 탁송대기 | 견적 요청 완료, 탁송 대기 상태 |
| `1` | 탁송중 | 탁송 진행 중 |
| `2` | 탁송완료 | 탁송 완료 |
| `3` | 탁송취소 | 탁송 취소 |

### **CarType (차량 타입)**

| **Enum** | **값** | **URL 인코딩** |
| --- | --- | --- |
| `DOMESTIC` | 국산차 | `%EA%B5%AD%EC%82%B0%EC%B0%A8` |
| `IMPORTED` | 수입차 | `%EC%88%98%EC%9E%85%EC%B0%A8` |

### **CarMaker (전체 제조사)**

### **📊 요약**

- **국산차**: 8개 제조사
- **수입차**: 69개 제조사 (독일 8개, 일본 12개, 미국 14개, 이탈리아 7개, 영국 9개 등)
- **총계**: 77개 제조사

### **🚗 국산차 제조사 (8개)**

```
현대(HYUNDAI)     기아(KIA)         GM대우(GM_DAEWOO)    제네시스(GENESIS)
쌍용(SSANGYONG)   르노삼성(RENAULT_SAMSUNG)   바이크(BIKE)   캠핑카(CAMPING_CAR)

```

[](http://localhost:63342/markdownPreview/346475732/?_ijt=ktha8hpuj1srg50setsolfd8ku)

### **🌍 수입차 제조사 주요 목록**

**🇩🇪 독일 (8개)**

```
BMW               벤츠(MERCEDES_BENZ)   아우디(AUDI)         폭스바겐(VOLKSWAGEN)
포르쉐(PORSCHE)   오펠(OPEL)           마이바흐(MAYBACH)    스마트(SMART)

```

[](http://localhost:63342/markdownPreview/346475732/?_ijt=ktha8hpuj1srg50setsolfd8ku)

**🇯🇵 일본 (12개)**

```
도요타(TOYOTA)    혼다(HONDA)         닛산(NISSAN)        마쯔다(MAZDA)
렉서스(LEXUS)     미쓰비시(MITSUBISHI) 스즈키(SUZUKI)      스바루(SUBARU)
미쯔오카(MITSUOKA) 다이하쓰(DAIHATSU)   어큐라(ACURA)       인피니티(INFINITI)

```

[](http://localhost:63342/markdownPreview/346475732/?_ijt=ktha8hpuj1srg50setsolfd8ku)

**🇺🇸 미국 (14개)**

```
포드(FORD)        쉐보레(CHEVROLET)   캐딜락(CADILLAC)    링컨(LINCOLN)
지프(JEEP)        테슬라(TESLA)       크라이슬러(CHRYSLER) 닷지(DODGE)
GMC               뷰익(BUICK)         허머(HUMMER)        폰티악(PONTIAC)
새턴(SATURN)      머큐리(MERCURY)

```

[](http://localhost:63342/markdownPreview/346475732/?_ijt=ktha8hpuj1srg50setsolfd8ku)

**🇮🇹 이탈리아 (7개)**

```
페라리(FERRARI)   람보르기니(LAMBORGHINI)  마세라티(MASERATI)  피아트(FIAT)
알파로메오(ALFA_ROMEO)  란치아(LANCIA)     파가니(PAGANI)

```

[](http://localhost:63342/markdownPreview/346475732/?_ijt=ktha8hpuj1srg50setsolfd8ku)

**🇬🇧 영국 (9개)**

```
재규어(JAGUAR)    랜드로버(LAND_ROVER)   롤스로이스(ROLLS_ROYCE)  벤틀리(BENTLEY)
미니(MINI)        로터스(LOTUS)          로버(ROVER)             애스턴마틴(ASTON_MARTIN)
맥라렌(MCLAREN)

```

[](http://localhost:63342/markdownPreview/346475732/?_ijt=ktha8hpuj1srg50setsolfd8ku)

**🇫🇷 프랑스 (5개)**

```
르노(RENAULT)     푸조(PEUGEOT)      시트로엥(CITROEN)    부가티(BUGATTI)    DS

```

[](http://localhost:63342/markdownPreview/346475732/?_ijt=ktha8hpuj1srg50setsolfd8ku)

**🇸🇪 스웨덴 (3개)**

```
볼보(VOLVO)       사브(SAAB)         코닉세그(KOENIGSEGG)

```

[](http://localhost:63342/markdownPreview/346475732/?_ijt=ktha8hpuj1srg50setsolfd8ku)

### **📝 URL 인코딩 참고**

한글 제조사명을 URL에서 사용할 때는 다음과 같이 인코딩하세요:

**주요 한글 제조사 인코딩**

- `현대` → `%ED%98%84%EB%8C%80`
- `기아` → `%EA%B8%B0%EC%95%84`
- `벤츠` → `%EB%B2%A4%EC%B8%A0`
- `도요타` → `%EB%8F%84%EC%9A%94%ED%83%80`
- `볼보` → `%EB%B3%BC%EB%B3%B4`

**영문 제조사는 그대로 사용**

- `BMW`, `GMC`, `DS`, `LEVC` 등

---

## **🚗 차량 목록 API (`/api/v0/car-list`)**

### **1. 전체 차량 목록 조회 (타입별 그룹핑)**

```
GET https://jejulogis.kro.kr/api/v0/car-list/total
Content-Type: application/json

```

**응답 예시:**

```json
{
  "status": "OK",
  "message": "차량 목록을 성공적으로 조회했습니다.",
  "data": {
    "국산차": [
      {
        "현대": ["아반테", "소나타", "그랜저"]
      },
      {
        "기아": ["모닝", "K5", "K9"]
      }
    ],
    "수입차": [
      {
        "BMW": ["1시리즈", "3시리즈", "X5"]
      },
      {
        "벤츠": ["A클래스", "C클래스", "S클래스"]
      }
    ]
  }
}

```

### **2. 차량 검색**

```
GET https://jejulogis.kro.kr/api/v0/car-list/search?text=체어맨
Content-Type: application/json

```

**응답 예시:**

```json
{
  "status": "OK",
  "message": "차량을 성공적으로 검색했습니다.",
  "data": [
    {
      "id": 749,
      "type": "국산차",
      "maker": "현대",
      "name": "쏘나타",
      "priceNormal": 142400,
      "priceExtra": 151500,
      "createdAt": null,
      "updatedAt": null
    }
  ]
}

```

### **3. 차량 타입별 조회**

```
### 국산차 조회
GET https://jejulogis.kro.kr/api/v0/car-list/type/국산차
GET https://jejulogis.kro.kr/api/v0/car-list/type/%EA%B5%AD%EC%82%B0%EC%B0%A8
Content-Type: application/json

### 수입차 조회
GET https://jejulogis.kro.kr/api/v0/car-list/type/수입차
GET https://jejulogis.kro.kr/api/v0/car-list/type/%EC%88%98%EC%9E%85%EC%B0%A8
Content-Type: application/json

```

### **4. 제조사별 조회**

```
### 현대 차량 조회
GET https://jejulogis.kro.kr/api/v0/car-list/maker/현대
GET https://jejulogis.kro.kr/api/v0/car-list/maker/%ED%98%84%EB%8C%80
Content-Type: application/json

### 기아 차량 조회
GET https://jejulogis.kro.kr/api/v0/car-list/maker/기아
GET https://jejulogis.kro.kr/api/v0/car-list/maker/%EA%B8%B0%EC%95%84
Content-Type: application/json

### 벤츠 차량 조회
GET https://jejulogis.kro.kr/api/v0/car-list/maker/벤츠
GET https://jejulogis.kro.kr/api/v0/car-list/maker/%EB%B2%A4%EC%B8%A0
Content-Type: application/json

### BMW 차량 조회
GET https://jejulogis.kro.kr/api/v0/car-list/maker/BMW
Content-Type: application/json

### 볼보 차량 조회
GET https://jejulogis.kro.kr/api/v0/car-list/maker/볼보
GET https://jejulogis.kro.kr/api/v0/car-list/maker/%EB%B3%BC%EB%B3%B4
Content-Type: application/json

### 부가티 차량 조회
GET https://jejulogis.kro.kr/api/v0/car-list/maker/부가티
GET https://jejulogis.kro.kr/api/v0/car-list/maker/%EB%B6%80%EA%B0%80%ED%8B%B0
Content-Type: application/json

```

---

## **📊 견적 API (`/api/v0/estimates`)**

### **1. 견적 계산**

```
GET https://jejulogis.kro.kr/api/v0/estimates/calculate?dep=경기도 성남시 분당구 판교로 20&arr=제주특별자치도 제주시 이도2동 1999-1&name=GV70&date=2026-01-02
Content-Type: application/json

```

**응답 예시:**

```json
{
  "status": "OK",
  "message": "견적이 성공적으로 계산되었습니다.",
  "data": {
    "departure": "서울",
    "arrival": "제주시",
    "carName": "소나타",
    "transportDate": "2025-01-02",
    "cost": 180000,
    "isHoliday": false
  }
}

```

### **2. 견적 저장**

```
POST https://jejulogis.kro.kr/api/v0/estimates/save
Content-Type: application/json

{
  "companyKey": "JEJULOGIS",
  "departure": "서울",
  "arrival": "제주시",
  "carName": "소나타",
  "transportDate": "2025-01-02",
  "cost": 180000,
  "customerName": "홍길동",
  "customerPhone": "010-1234-5678",
  "customerEmail": "test@example.com",
  "memo": "테스트 견적",
  "status": 0
}

```

**응답 예시:**

```json
{
  "status": "CREATED",
  "message": "견적이 성공적으로 저장되었습니다.",
  "data": {
    "id": 97
  }
}

```

### **3. 견적 단일 조회**

```
GET https://jejulogis.kro.kr/api/v0/estimates/97
Content-Type: application/json

```

**응답 예시:**

```json
{
  "status": "OK",
  "message": "견적을 성공적으로 조회했습니다.",
  "data": {
    "id": 97,
    "companyKey": "JEJULOGIS",
    "departure": "서울",
    "arrival": "제주시",
    "carName": "소나타",
    "transportDate": "2025-01-02T00:00:00",
    "cost": 180000,
    "customerName": "홍길동",
    "customerPhone": "010-1234-5678",
    "customerEmail": "test@example.com",
    "memo": "테스트 견적",
    "status": 0,
    "createdAt": "2025-01-01T10:00:00",
    "updatedAt": "2025-01-01T10:00:00"
  }
}

```

### **4. 견적 수정**

```
POST https://jejulogis.kro.kr/api/v0/estimates/97
Content-Type: application/json

{
  "companyKey": "UPDATED_COMPANY",
  "departure": "부산",
  "arrival": "서귀포시",
  "carName": "아반테",
  "transportDate": "2025-01-05",
  "cost": 200000,
  "customerName": "김철수",
  "customerPhone": "010-9876-5432",
  "customerEmail": "updated@example.com",
  "memo": "수정된 견적",
  "status": 1
}

```

**응답 예시:**

```json
{
  "status": "OK",
  "message": "견적이 성공적으로 수정되었습니다.",
  "data": {
    "id": 97
  }
}

```

### **5. 견적 목록 조회 (필터링)**

```
### 전체 목록
GET https://jejulogis.kro.kr/api/v0/estimates?companyKey=JEJULOGIS
Content-Type: application/json

### 날짜 범위 필터
GET https://jejulogis.kro.kr/api/v0/estimates?companyKey=JEJULOGIS&startDate=2025-01-01&endDate=2025-01-31
Content-Type: application/json

```

### **6. 상태별 견적 조회**

```
### 탁송대기 (0)
GET https://jejulogis.kro.kr/api/v0/estimates/status/0
Content-Type: application/json

### 탁송중 (1)
GET https://jejulogis.kro.kr/api/v0/estimates/status/1
Content-Type: application/json

### 탁송완료 (2)
GET https://jejulogis.kro.kr/api/v0/estimates/status/2
Content-Type: application/json

### 탁송취소 (3)
GET https://jejulogis.kro.kr/api/v0/estimates/status/3
Content-Type: application/json

```

---

## **👥 관리자 API (`/api/v0/admin`)**

### **AdminRole (관리자 역할)**

| **코드** | **값** | **설명** |
| --- | --- | --- |
| `0` | 최고관리자 | 모든 관리자 계정 관리 권한 |
| `1` | 관리자 | 일반 관리자 권한 |

### **1. 관리자 로그인**

```
POST https://jejulogis.kro.kr/api/v0/admin/login
Content-Type: application/json

{
  "loginId": "admin",
  "password": "YWRtaW4xMjM="
}

```

**참고**: 비밀번호는 Base64로 인코딩된 값을 전송해야 합니다.

- `admin123` → `YWRtaW4xMjM=`
- `password123` → `cGFzc3dvcmQxMjM=`

**응답 예시:**

```json
{
  "status": "OK",
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": {
    "id": 1,
    "loginId": "admin",
    "name": "시스템관리자",
    "role": 0,
    "message": "로그인에 성공했습니다."
  }
}

```

### **2. 관리자 등록 (최고관리자만 가능)**

```
POST https://jejulogis.kro.kr/api/v0/admin
Content-Type: application/json
X-Admin-Id: 1

{
  "loginId": "admin001",
  "password": "cGFzc3dvcmQxMjM=",
  "role": 1,
  "phone": "010-1234-5678",
  "name": "일반관리자"
}

```

**응답 예시:**

```json
{
  "status": "OK",
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": {
    "id": 2,
    "loginId": "admin001",
    "role": 1,
    "phone": "010-1234-5678",
    "name": "일반관리자",
    "createdAt": "2025-08-22T20:00:00",
    "updatedAt": "2025-08-22T20:00:00"
  }
}

```

### **3. 관리자 목록 조회**

```
GET https://jejulogis.kro.kr/api/v0/admin
Content-Type: application/json

```

**응답 예시:**

```json
{
  "status": "OK",
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": [
    {
      "id": 1,
      "loginId": "admin",
      "role": 0,
      "phone": "010-0000-0000",
      "name": "시스템관리자",
      "createdAt": "2025-08-22T20:00:00",
      "updatedAt": "2025-08-22T20:00:00"
    },
    {
      "id": 2,
      "loginId": "admin001",
      "role": 1,
      "phone": "010-1234-5678",
      "name": "일반관리자",
      "createdAt": "2025-08-22T20:00:00",
      "updatedAt": "2025-08-22T20:00:00"
    }
  ]
}

```

### **4. 관리자 상세 조회**

```
GET https://jejulogis.kro.kr/api/v0/admin/1
Content-Type: application/json

```

### **5. 관리자 정보 수정 (최고관리자만 가능)**

```
PUT https://jejulogis.kro.kr/api/v0/admin/2
Content-Type: application/json
X-Admin-Id: 1

{
  "loginId": "admin001_updated",
  "password": "bmV3cGFzc3dvcmQxMjM=",
  "role": 1,
  "phone": "010-1111-2222",
  "name": "수정된관리자"
}

```

### **6. 관리자 삭제 (최고관리자만 가능, 본인 제외)**

```
DELETE https://jejulogis.kro.kr/api/v0/admin/2
X-Admin-Id: 1

```

**응답 예시:**

```json
{
  "status": "OK",
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": null
}

```

### **🔐 권한 규칙**

- **최고관리자 (role: 0)**: 모든 관리자 CRUD 권한
- **관리자 (role: 1)**: 조회만 가능
- **본인 삭제 불가**: 최고관리자도 본인 계정은 삭제할 수 없음
- **인증 헤더**: CRUD 작업 시 `X-Admin-Id` 헤더 필수

### **🚨 에러 예시**

```json
{
  "timestamp": "2025-08-22T20:00:00.123456",
  "status": "FORBIDDEN",
  "code": "LOGIS_FORBIDDEN",
  "message": "최고관리자만 관리자를 등록할 수 있습니다."
}

```

**주요 관리자 에러 코드:**

- `LOGIS_FORBIDDEN`: 권한 없음
- `LOGIS_UNAUTHORIZED`: 로그인 실패
- `LOGIS_BAD_REQUEST`: 잘못된 요청 (중복 아이디, 본인 삭제 시도 등)
- `LOGIS_NOT_FOUND`: 관리자를 찾을 수 없음

---

## **📅 공휴일 API (`/api/v0/holidays`)**

### **1. 특정 날짜 공휴일 확인**

```
GET https://jejulogis.kro.kr/api/v0/holidays/check?date=2025-01-01
Content-Type: application/json

```

**응답 예시:**

```json
{
  "status": "OK",
  "message": "공휴일 정보를 성공적으로 조회했습니다.",
  "data": {
    "date": "2025-01-01",
    "isHoliday": true,
    "holidayName": "신정"
  }
}

```

### **2. 월별 공휴일 조회**

```
GET https://jejulogis.kro.kr/api/v0/holidays/month?year=2025&month=1
Content-Type: application/json

```

---

## **🚨 에러 응답 형식**

### **일반적인 에러 응답**

```json
{
  "timestamp": "2025-01-01T10:00:00.123456",
  "status": "BAD_REQUEST",
  "code": "LOGIS_ILLEGAL_ARGUMENT",
  "message": "유효하지 않은 견적 상태 코드입니다: 9 (0: 탁송대기, 1: 탁송중, 2: 탁송완료, 3: 탁송취소)"
}

```

### **주요 에러 코드**

- `LOGIS_ILLEGAL_ARGUMENT`: 잘못된 파라미터
- `LOGIS_ESTIMATE_NOT_FOUND`: 견적을 찾을 수 없음
- `LOGIS_ESTIMATE_SAVE_FAILED`: 견적 저장 실패
- `LOGIS_CAR_NOT_FOUND`: 차량 정보를 찾을 수 없음

---

## **🔧 테스트 팁**

### **1. URL 인코딩**

- 한글 파라미터는 반드시 URL 인코딩 필요
- 예: `국산차` → `%EA%B5%AD%EC%82%B0%EC%B0%A8`

### **2. 날짜 형식**

- 날짜: `YYYY-MM-DD` (예: `2025-01-02`)
- 날짜시간: ISO 8601 형식 (예: `2025-01-02T00:00:00`)

### **3. 상태 코드**

- 견적 상태는 숫자로 전달 (0, 1, 2, 3)

### **4. 브라우저 vs HTTP 파일**

- **브라우저**: 한글 URL을 자동으로 인코딩 처리
- **HTTP 파일**: 한글과 인코딩된 URL 모두 제공 (환경에 따라 선택 사용)