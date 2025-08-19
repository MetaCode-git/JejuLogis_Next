import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { ConsignPage } from '@/components/sections/ConsignPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '차량 위탁 서비스 - 제주탁송',
  description: '제주도 장단기 차량 위탁 보관 서비스. 안전하고 신뢰할 수 있는 차량 보관을 경험하세요.',
};

export default function Consign() {
  return (
    <>
      <Header />
      <main>
        <ConsignPage />
      </main>
      <Footer />
    </>
  );
}