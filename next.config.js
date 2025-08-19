const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 실험적 기능들
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // 이미지 최적화
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1년
  },

  // 압축 설정
  compress: true,

  // PWA 설정
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // 정적 자산 캐싱
      {
        source: '/(.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot|otf|js|css)$)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // API 응답 헤더
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300',
          },
        ],
      },
      // 보안 헤더
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // 리다이렉트 설정
  async redirects() {
    return [
      // 이전 Flutter 웹 경로에서 새 Next.js 경로로 리다이렉트
      {
        source: '/flutter_web',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // 웹팩 설정 최적화
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 프로덕션 빌드 최적화
    if (!dev && !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };

      // 번들 크기 최적화
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            enforce: true,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'async',
            enforce: true,
          },
        },
      };
    }

    // 환경 변수 추가
    config.plugins.push(
      new webpack.DefinePlugin({
        '__BUILD_DATE__': JSON.stringify(new Date().toISOString()),
        '__BUILD_ID__': JSON.stringify(buildId),
      })
    );

    return config;
  },

  // 환경 변수
  env: {
    BUILD_DATE: new Date().toISOString(),
  },

  // 출력 추적
  output: 'standalone',

  // TypeScript 설정
  typescript: {
    tsconfigPath: './tsconfig.json',
  },

  // ESLint 설정
  eslint: {
    dirs: ['pages', 'utils', 'src'],
    ignoreDuringBuilds: false,
  },

  // 성능 최적화
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,

  // 개발 환경 설정
  ...(process.env.NODE_ENV === 'development' && {
    devIndicators: {
      buildActivity: true,
      buildActivityPosition: 'bottom-right',
    },
  }),
};

module.exports = withBundleAnalyzer(nextConfig);