import CryptoTable from '@/components/CryptoTable';
import HeroSection from '@/components/HeroSection';
import SwapToken from '@/components/SwapToken';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <section className=" flex flex-col justify-center items-center gap-y-20">
        <CryptoTable />
        <SwapToken />
      </section>
    </main>
  );
}
