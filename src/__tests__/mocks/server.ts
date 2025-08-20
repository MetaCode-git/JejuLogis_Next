import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// API 핸들러들 - 서버 API 리스트에 맞춰 수정
export const handlers = [
  // 1. 차량 목록 확인: GET /car-list/total
  http.get('/api/car-list/total', () => {
    return HttpResponse.json({
      success: true,
      data: {
        '국산차': [
          {
            '현대': ['아반떼', '소나타', '그랜저', '제네시스 G70', '제네시스 G80', 'i30', '투싼', '싼타페'],
            '기아': ['K3', 'K5', 'K7', 'K9', '스포티지', '쏘렌토', '모하비'],
            '쌍용': ['티볼리', '코란도', '렉스턴'],
            '르노삼성': ['SM3', 'SM5', 'SM6', 'QM6'],
            'GM대우': ['스파크', '아베오', '크루즈', '말리부']
          }
        ],
        '수입차': [
          {
            'BMW': ['320i', '520i', 'X3', 'X5'],
            '벤츠': ['C클래스', 'E클래스', 'S클래스', 'GLC', 'GLE'],
            '아우디': ['A3', 'A4', 'A6', 'Q5', 'Q7'],
            '토요타': ['캠리', '프리우스', 'RAV4']
          }
        ]
      }
    });
  }),

  // 2. 차량 검색: GET /car-list/search?text=소나타
  http.get('/api/car-list/search', ({ request }) => {
    const url = new URL(request.url);
    const searchText = url.searchParams.get('text') || '';
    
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: 1,
          manufacturer: '현대',
          model: '소나타',
          year: 2023,
          fuel_type: '가솔린'
        },
        {
          id: 2,
          manufacturer: '현대',
          model: '소나타 하이브리드',
          year: 2023,
          fuel_type: '하이브리드'
        }
      ].filter(car => car.model.includes(searchText))
    });
  }),

  // 3. 견적 계산: GET /estimates/calculate?dep=서울&arr=제주&name=소나타&date=2024-01-15
  http.get('/api/estimates/calculate', ({ request }) => {
    const url = new URL(request.url);
    const dep = url.searchParams.get('dep') || '';
    const arr = url.searchParams.get('arr') || '';
    const name = url.searchParams.get('name') || '';
    const date = url.searchParams.get('date') || '';
    
    return HttpResponse.json({
      success: true,
      data: {
        id: 'EST-CALC-001',
        base_price: 120000,
        additional_fees: 15000,
        total_price: 135000,
        distance: 450,
        estimated_duration: '6시간',
        transport_date: date,
        vehicle_info: {
          id: 1,
          manufacturer: '현대',
          model: name,
          year: 2023,
          fuel_type: '가솔린'
        },
        departure_info: {
          address: dep,
          latitude: 37.5665,
          longitude: 126.9780
        },
        arrival_info: {
          address: arr,
          latitude: 33.4996,
          longitude: 126.5312
        },
        created_at: new Date().toISOString()
      }
    });
  }),

  // 4. 견적 저장: POST /estimates/save
  http.post('/api/estimates/save', async ({ request }) => {
    const estimateData = await request.json();
    
    return HttpResponse.json({
      success: true,
      data: {
        id: 'EST-SAVE-001',
        ...estimateData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    });
  }),

  // 5. 견적 목록 확인: GET /estimates
  http.get('/api/estimates', () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: 'EST-001',
          base_price: 120000,
          total_price: 135000,
          vehicle_info: { manufacturer: '현대', model: '소나타' },
          departure_info: { address: '서울특별시 강남구' },
          arrival_info: { address: '제주특별자치도 제주시' },
          transport_date: '2024-01-15',
          created_at: '2024-01-10T09:00:00Z'
        },
        {
          id: 'EST-002',
          base_price: 100000,
          total_price: 115000,
          vehicle_info: { manufacturer: '기아', model: 'K5' },
          departure_info: { address: '서울특별시 종로구' },
          arrival_info: { address: '제주특별자치도 서귀포시' },
          transport_date: '2024-01-20',
          created_at: '2024-01-15T14:30:00Z'
        }
      ]
    });
  }),

  // 6. 필터링된 견적 조회: POST /estimates/filtered
  http.post('/api/estimates/filtered', async ({ request }) => {
    const filters = await request.json();
    
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: 'EST-FILTERED-001',
          base_price: 120000,
          total_price: 135000,
          vehicle_info: { manufacturer: '현대', model: '소나타' },
          departure_info: { address: '서울특별시 강남구' },
          arrival_info: { address: '제주특별자치도 제주시' },
          transport_date: '2024-01-15',
          created_at: '2024-01-10T09:00:00Z',
          status: '확정'
        }
      ]
    });
  }),

  // 7. 견적 수정: PATCH /estimates
  http.patch('/api/estimates', async ({ request }) => {
    const estimateData = await request.json();
    
    return HttpResponse.json({
      success: true,
      data: {
        ...estimateData,
        updated_at: new Date().toISOString()
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