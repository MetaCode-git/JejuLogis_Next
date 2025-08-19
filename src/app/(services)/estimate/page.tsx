import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { EstimatePage } from '@/components/sections/EstimatePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '견적 신청 - 제주탁송',
  description: '제주도 차량 탁송 견적을 신청하세요. 빠르고 정확한 견적을 제공합니다.',
};

export default function Estimate() {
  return (
    <>
      <Header />
      <main>
        <EstimatePage />
      </main>
      <Footer />
    </>
  );
}