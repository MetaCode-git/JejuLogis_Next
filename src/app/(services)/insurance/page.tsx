import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { InsurancePage } from '@/components/sections/InsurancePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '보험 안내 - 제주탁송',
  description: '제주탁송의 종합 보험 안내. 운송보험, 시설배상보험으로 완벽한 보장을 제공합니다.',
};

export default function Insurance() {
  return (
    <>
      <Header />
      <main>
        <InsurancePage />
      </main>
      <Footer />
    </>
  );
}