import useCategory from '@/hooks/useCategory';
import { CategoryType } from '@/types/CategoryType';
import React from 'react';
import {
  PiBoneThin,
  PiEarLight,
  PiEyeLight,
  PiHospitalThin,
  PiToothThin,
} from 'react-icons/pi';

function CategoryKlinik() {
  const { dataCategory, isLoadingCategory } = useCategory();

  if (isLoadingCategory) {
    return <div>Loading...</div>;
  }

  const categoryIcons = [
    <PiHospitalThin className="text-[#357A7B] w-10 h-10 m-5" />,
    <PiEyeLight className="text-[#357A7B] w-10 h-10 m-5" />,
    <PiToothThin className="text-[#357A7B] w-10 h-10 m-5" />,
    <PiBoneThin className="text-[#357A7B] w-10 h-10 m-5" />,
    <PiEarLight className="text-[#357A7B] w-10 h-10 m-5" />,
  ];

  return (
    <div className="relative -z-50 mt-40 container mx-auto  ">
      <h1 className="text-4xl text-center font-bold text-[#383A3A]">
        Kategori <span className="text-[#357A7B]">Klinik</span>
      </h1>
      <div className="flex justify-center flex-wrap items-center mt-16 gap-8">
        {dataCategory?.map((category: CategoryType, index: number) => (
          <div key={category.id} className="flex flex-col gap-2 items-center">
            <div className="bg-[#D6F2F2] rounded-full flex justify-center items-center">
              {/* Menampilkan icon sesuai urutan berdasarkan kategori */}
              {categoryIcons[index] || (
                <div className="text-[#357A7B] w-10 h-10 m-5" />
              )}
            </div>
            <p className="text-[#357A7B]">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryKlinik;
