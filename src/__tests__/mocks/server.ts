import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// API 핸들러들
export const handlers = [
  // 견적 관련 API 모킹
  http.post('/api/estimates/submit', async ({ request }) => {
    const estimateData = await request.json();
    
    return HttpResponse.json({
      success: true,
      data: {
        id: 'EST-2024-TEST-001',
        ...estimateData,
        basePrice: 120000,
        totalPrice: 135000,
        createdAt: new Date().toISOString(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        additionalFees: [
          { name: '보험료', amount: 10000, description: '운송보험 필수 가입' },
          { name: '연료비 할증', amount: 5000, description: '유가 상승으로 인한 할증' }
        ],
        discounts: [
          { name: '신규고객 할인', amount: 10000, description: '첫 이용 고객 특별 할인' }
        ]
      }
    });
  }),

  http.get('/api/estimates/:id', ({ params }) => {
    const { id } = params;
    
    return HttpResponse.json({
      success: true,
      data: {
        id,
        vehicleCategory: 'midsize',
        vehicleModel: '현대 아반떼 2023년형',
        departureAddress: '제주특별자치도 제주시 연동 123-45',
        arrivalAddress: '제주특별자치도 서귀포시 중문동 67-89',
        transportDate: '2024-03-15',
        customerName: '테스트 고객',
        customerPhone: '010-1234-5678',
        customerEmail: 'test@example.com',
        basePrice: 120000,
        totalPrice: 135000,
        createdAt: new Date().toISOString(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }
    });
  }),

  // 차량 카테고리 API 모킹
  http.get('/api/vehicles/categories', () => {
    return HttpResponse.json({
      success: true,
      data: [
        { id: 'compact', name: '소형차', description: '모닝, 스파크, 레이 등', basePrice: 80000 },
        { id: 'midsize', name: '중형차', description: '아반떼, 소나타, K5 등', basePrice: 120000 },
        { id: 'large', name: '대형차', description: '그랜저, K9, 제네시스 등', basePrice: 150000 },
      ]
    });
  }),

  // 주소 검색 API 모킹
  http.get('/api/address/search', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') || '';
    
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: '1',
          address: `제주특별자치도 제주시 ${query}`,
          roadAddress: `제주특별자치도 제주시 중앙로 ${query}번길`,
          zipcode: '63166'
        },
        {
          id: '2',
          address: `제주특별자치도 서귀포시 ${query}`,
          roadAddress: `제주특별자치도 서귀포시 중정로 ${query}`,
          zipcode: '63565'
        }
      ]
    });
  }),

  // 회사 설정 API 모킹
  http.get('/api/config/company', () => {
    return HttpResponse.json({
      success: true,
      data: {
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
        }
      }
    });
  }),

  // 에러 테스트용 핸들러
  http.get('/api/error-test', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Internal Server Error'
    });
  }),

  // 네트워크 오류 테스트용 핸들러
  http.get('/api/network-error', () => {
    return HttpResponse.error();
  })
];

// 서버 설정
export const server = setupServer(...handlers);