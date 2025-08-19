import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  
  /* 병렬 테스트 실행 */
  fullyParallel: true,
  
  /* CI에서 실패 시 재시도 안함 */
  forbidOnly: !!process.env.CI,
  
  /* CI에서 재시도 횟수 */
  retries: process.env.CI ? 2 : 0,
  
  /* 워커 수 설정 */
  workers: process.env.CI ? 1 : undefined,
  
  /* 리포터 설정 */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  
  /* 공통 설정 */
  use: {
    /* Base URL을 사용하여 상대 경로로 탐색 */
    baseURL: 'http://localhost:3000',
    
    /* 모든 테스트에서 스크린샷 및 비디오 수집 */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    /* 브라우저 컨텍스트 옵션 */
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    
    /* 한국어 설정 */
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul',
  },

  /* 프로젝트 설정 */
  projects: [
    /* 데스크톱 브라우저 */
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // 한국어 설정
        locale: 'ko-KR',
        timezoneId: 'Asia/Seoul',
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        locale: 'ko-KR',
        timezoneId: 'Asia/Seoul',
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        locale: 'ko-KR',
        timezoneId: 'Asia/Seoul',
      },
    },

    /* 모바일 브라우저 */
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        locale: 'ko-KR',
        timezoneId: 'Asia/Seoul',
      },
    },
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
        locale: 'ko-KR',
        timezoneId: 'Asia/Seoul',
      },
    },

    /* Microsoft Edge */
    {
      name: 'Microsoft Edge',
      use: { 
        ...devices['Desktop Edge'], 
        channel: 'msedge',
        locale: 'ko-KR',
        timezoneId: 'Asia/Seoul',
      },
    },

    /* Google Chrome */
    {
      name: 'Google Chrome',
      use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome',
        locale: 'ko-KR',
        timezoneId: 'Asia/Seoul',
      },
    },
  ],

  /* 로컬 개발 서버 설정 */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  /* 글로벌 설정 */
  globalTimeout: 60 * 60 * 1000, // 1시간
  timeout: 30 * 1000, // 30초
  expect: {
    timeout: 10 * 1000, // 10초
  },

  /* 출력 디렉토리 */
  outputDir: 'test-results/',
});