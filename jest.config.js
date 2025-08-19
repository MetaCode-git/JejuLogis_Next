const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Next.js 앱의 경로를 제공
  dir: './',
});

// Jest에 대한 커스텀 설정 추가
const customJestConfig = {
  // 테스트 환경 설정
  testEnvironment: 'jest-environment-jsdom',
  
  // 테스트 실행 전 설정 파일
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  
  // 모듈 경로 매핑
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // 테스트 파일 패턴
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js|jsx)',
    '**/*.(test|spec).(ts|tsx|js|jsx)',
  ],
  
  // 테스트에서 제외할 파일들
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/__tests__/setup.ts',
    '<rootDir>/src/__tests__/mocks/',
  ],
  
  // 커버리지 설정
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/__tests__/**',
    '!src/**/index.ts',
  ],
  
  // 커버리지 임계값
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // 변환할 파일 확장자
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // 모듈 변환 설정
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  
  // 정적 파일 모킹
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$': '<rootDir>/src/__tests__/mocks/fileMock.js',
  },
  
  // 테스트 타임아웃
  testTimeout: 10000,
  
  // 병렬 실행 설정
  maxWorkers: '50%',
  
  // 캐시 설정
  cacheDirectory: '<rootDir>/.jest-cache',
  
  // 리포터 설정
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/test-results',
        outputName: 'junit.xml',
      },
    ],
  ],
  
  // 글로벌 설정
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};

// createJestConfig는 비동기이므로, Jest가 next/jest에서 config를 로드할 수 있도록 내보냄
module.exports = createJestConfig(customJestConfig);