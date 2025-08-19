import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { CompanyPage } from '@/components/sections/CompanyPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회사 소개 - 제주탁송',
  description: '제주탁송의 회사 정보, 서비스 소개, 연락처를 확인하세요.',
};

export default function Company() {
  return (
    <>
      <Header />
      <main>
        <CompanyPage />
      </main>
      <Footer />
    </>
  );
}