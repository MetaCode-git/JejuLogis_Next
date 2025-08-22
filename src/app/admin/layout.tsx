import { Metadata } from 'next';
import { QueryProvider } from '@/providers/QueryProvider';

export const metadata: Metadata = {
  title: '제주탁송 관리자',
  description: '제주탁송 관리자 전용 페이지',
  robots: 'noindex, nofollow', // 검색엔진에서 제외
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <QueryProvider>
      <div className="admin-layout font-spoqa">
        {/* Security notice for admin pages */}
        <noscript>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#fef2f2',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#dc2626',
            fontWeight: 'bold'
          }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h1>JavaScript가 필요합니다</h1>
              <p>이 관리자 페이지를 사용하려면 JavaScript를 활성화해주세요.</p>
            </div>
          </div>
        </noscript>
        
        {children}
      </div>
    </QueryProvider>
  );
}