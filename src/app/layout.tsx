import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { CompanyProvider } from '@/contexts/CompanyContext';
import { QueryProvider } from '@/providers/QueryProvider';
import { Toaster } from '@/components/ui/sonner';
import { PWAInstaller } from '@/components/common/PWAInstaller';
import { FloatingEstimateButton } from '@/components/common/FloatingEstimateButton';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const spoqaHanSans = localFont({
  src: [
    {
      path: '../../public/assets/fonts/SpoqaHanSansNeo-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-spoqa',
  display: 'swap',
});

const jua = localFont({
  src: '../../public/assets/fonts/Jua-Regular.ttf',
  variable: '--font-jua',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '제주탁송 - 제주도 차량 탁송 서비스',
  description: '제주도 지역 차량 탁송, 대리운전 서비스를 제공합니다.',
  keywords: ['제주탁송', '차량탁송', '제주도', '대리운전', '번개대리'],
  manifest: '/manifest.json',
  themeColor: '#dc2626',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '제주탁송',
  },
  openGraph: {
    title: '제주탁송 - 제주도 차량 탁송 서비스',
    description: '제주도 지역 차량 탁송, 대리운전 서비스를 제공합니다.',
    type: 'website',
    locale: 'ko_KR',
  },
  icons: {
    icon: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${spoqaHanSans.variable} ${jua.variable} font-spoqa antialiased`}
      >
        <ErrorBoundary>
          <QueryProvider>
            <CompanyProvider>
              {children}
              <FloatingEstimateButton />
              <PWAInstaller />
              <Toaster />
            </CompanyProvider>
          </QueryProvider>
        </ErrorBoundary>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('SW registered: ', registration);
                  }).catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
