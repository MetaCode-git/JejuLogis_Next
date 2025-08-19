import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { VehicleSelectPage } from '@/components/sections/VehicleSelectPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '차량 선택 - 제주탁송',
  description: '운송할 차량 종류를 선택하고 예상 견적을 확인하세요.',
};

export default function VehicleSelect() {
  return (
    <>
      <Header />
      <main>
        <VehicleSelectPage />
      </main>
      <Footer />
    </>
  );
}