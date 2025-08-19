import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { EstimateResultPage } from '@/components/sections/EstimateResultPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '견적 결과 - 제주탁송',
  description: '차량 운송 견적 결과를 확인하고 예약을 진행하세요.',
};

export default function EstimateResult() {
  return (
    <>
      <Header />
      <main>
        <EstimateResultPage />
      </main>
      <Footer />
    </>
  );
}