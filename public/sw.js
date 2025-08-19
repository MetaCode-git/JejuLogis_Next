const CACHE_NAME = 'jeju-transport-v1.0.0';
const OFFLINE_PAGE = '/offline';

// 캐시할 리소스들
const STATIC_CACHE_URLS = [
  '/',
  '/estimate',
  '/company',
  '/driver',
  '/consign',
  '/insurance',
  '/offline',
  '/manifest.json',
  // 폰트 파일들
  '/assets/fonts/SpoqaHanSansNeo-Regular.ttf',
  '/assets/fonts/Jua-Regular.ttf',
  // 아이콘들
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
];

// 런타임에 캐시할 URL 패턴들
const RUNTIME_CACHE_PATTERNS = [
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
  /\.(?:png|jpg|jpeg|svg|webp|avif)$/,
  /\.(?:js|css)$/,
];

// 서비스 워커 설치
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        console.log('Caching static resources...');
        
        // 정적 리소스 캐시 (실패해도 설치 진행)
        const cachePromises = STATIC_CACHE_URLS.map(async (url) => {
          try {
            await cache.add(url);
          } catch (error) {
            console.warn(`Failed to cache ${url}:`, error);
          }
        });
        
        await Promise.allSettled(cachePromises);
        console.log('Static resources cached successfully');
        
        // 즉시 활성화
        self.skipWaiting();
      } catch (error) {
        console.error('Service Worker installation failed:', error);
      }
    })()
  );
});

// 서비스 워커 활성화
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    (async () => {
      try {
        // 이전 캐시 정리
        const cacheNames = await caches.keys();
        const deletePromises = cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('Deleting old cache:', name);
            return caches.delete(name);
          });
        
        await Promise.all(deletePromises);
        
        // 모든 클라이언트 제어
        await self.clients.claim();
        
        console.log('Service Worker activated successfully');
      } catch (error) {
        console.error('Service Worker activation failed:', error);
      }
    })()
  );
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', (event) => {
  // GET 요청만 처리
  if (event.request.method !== 'GET') return;
  
  // Chrome extension 요청 무시
  if (event.request.url.startsWith('chrome-extension://')) return;
  
  event.respondWith(handleFetch(event.request));
});

// 네트워크 요청 처리 함수
async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // 1. 네트워크 우선 전략 (API 요청)
    if (url.pathname.startsWith('/api/')) {
      return await networkFirst(request);
    }
    
    // 2. 캐시 우선 전략 (정적 리소스)
    if (isStaticResource(url)) {
      return await cacheFirst(request);
    }
    
    // 3. 페이지 요청 - 네트워크 우선, 실패 시 캐시
    if (isNavigationRequest(request)) {
      return await networkFirst(request, true);
    }
    
    // 4. 기본 전략 - 캐시 우선
    return await cacheFirst(request);
    
  } catch (error) {
    console.error('Fetch handler error:', error);
    
    // 페이지 요청이고 캐시에도 없으면 오프라인 페이지 반환
    if (isNavigationRequest(request)) {
      const cache = await caches.open(CACHE_NAME);
      const offlineResponse = await cache.match(OFFLINE_PAGE);
      return offlineResponse || new Response('오프라인입니다', { status: 503 });
    }
    
    return new Response('네트워크 오류', { status: 503 });
  }
}

// 네트워크 우선 전략
async function networkFirst(request, fallbackToCache = false) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      // 성공적인 응답은 캐시에 저장
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    if (fallbackToCache) {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    throw error;
  }
}

// 캐시 우선 전략
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // 백그라운드에서 캐시 업데이트
    fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
    }).catch(() => {
      // 백그라운드 업데이트 실패는 무시
    });
    
    return cachedResponse;
  }
  
  // 캐시에 없으면 네트워크 요청
  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
  }
  
  return response;
}

// 정적 리소스 확인
function isStaticResource(url) {
  return RUNTIME_CACHE_PATTERNS.some(pattern => pattern.test(url.href));
}

// 페이지 네비게이션 요청 확인
function isNavigationRequest(request) {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && request.headers.get('accept').includes('text/html'));
}

// 백그라운드 동기화 (미래 기능용)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // 오프라인 중에 저장된 데이터를 서버로 전송
    console.log('Background sync executed');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// 푸시 알림 처리 (미래 기능용)
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  try {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: data.tag || 'default',
      requireInteraction: data.requireInteraction || false,
      actions: data.actions || [],
      data: data.data || {},
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  } catch (error) {
    console.error('Push notification error:', error);
  }
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});