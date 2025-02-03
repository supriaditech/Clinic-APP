import { ClinicDetailProps } from '@/pages/clinic/[slug]';
import React from 'react';
import { LoadingImage } from '../Layouts/LazyLoading/LoadingImage';
import { FaRegHeart, FaStar } from 'react-icons/fa';

function Spesialis({ clinicData }: ClinicDetailProps) {
  return (
    <div className="container relative z-20 mx-auto px-10 2xl:px-0 my-8">
      <p className="text-2xl font-bold">
        Spesialis{' '}
        <span className="text-[#2AA996]">
          ({clinicData.specialists.length})
        </span>
      </p>
      <div className="flex items-center gap-4 py-10 overflow-x-auto scrollbar-hide">
        {clinicData.specialists.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg flex gap-4 items-center px-4 py-2 rounded-md w-96 border border-gray-50"
          >
            <LoadingImage
              src="/image/clinic/Profil.png"
              width={100}
              height={100}
              alt={item.name}
              className="w-[100px] h-[100px]"
            />
            <div className="w-full">
              <div className="flex justify-between items-center border-b pb-2">
                <p className="text-lg font-bold">{item.name}</p>
                <FaRegHeart className="w-5 h-5" />
              </div>
              <p className="font-semibold mt-2">{item.specialization}</p>
              <div className="flex gap-2 items-center mt-1">
                <FaStar className="text-[#F9D800] w-4 h-4" />
                <p className="text-xs">{item.rating}</p> |{' '}
                <p className="text-xs">{item.totalReviews} Review</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Spesialis;
