import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { HomePage } from '@/components/sections/HomePage';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
  );
}