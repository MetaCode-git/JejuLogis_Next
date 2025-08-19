import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { DriverPage } from '@/components/sections/DriverPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '번개 대리운전 - 제주탁송',
  description: '제주도 24시간 대리운전 서비스. 안전하고 빠른 번개 대리운전을 이용하세요.',
};

export default function Driver() {
  return (
    <>
      <Header />
      <main>
        <DriverPage />
      </main>
      <Footer />
    </>
  );
}