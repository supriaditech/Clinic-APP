import CategoryKlinik from '@/components/Home/CategoryKlinik';
import HeaderComponent from '@/components/Home/HeaderComponent';
import Promo from '@/components/Home/Promo';
import MasterLayout from '@/components/Layouts/MasterLayout';
import { Button } from '@heroui/react';

export default function Home() {
  return (
    <MasterLayout title={'Home - Clicic'}>
      <div className="min-h-screen pb-10">
        <HeaderComponent />
        <CategoryKlinik />
        <Promo />
      </div>
    </MasterLayout>
  );
}
