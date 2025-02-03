import { ClinicDetailProps } from '@/pages/clinic/[slug]';
import React from 'react';
import { FaStar } from 'react-icons/fa';

function Review({ clinicData }: ClinicDetailProps) {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const stars = [
      ...Array(fullStars).fill(
        <FaStar key="full" className="text-[#F9D800] w-4 h-4" />,
      ),
      ...Array(halfStar).fill(
        <FaStar
          key="half"
          className="text-[#F9D800] w-4 h-4"
          style={{
            clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 0%)',
          }}
        />,
      ), // Setengah bintang
      ...Array(emptyStars).fill(
        <FaStar key="empty" className="text-[#D3D3D3] w-4 h-4" />,
      ), // Bintang kosong
    ];

    return stars;
  };

  return (
    <div className="container relative z-20 mx-auto px-10 2xl:px-0 my-8">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">Review</p>
        <p className="text-lg ">Lihat semua</p>
      </div>
      <div className="flex gap-4 py-10 overflow-x-auto scrollbar-hide">
        {clinicData.reviews.map((item) => (
          <div
            key={item.id}
            className="bg-[#F3FFFD] shadow-lg flex flex-col gap-1 px-4 py-2 rounded-md w-[400px] border border-gray-50"
          >
            <p className="text-lg text-[#357A7B] font-semibold">
              {item.userName}
            </p>
            <div className="flex gap-2 items-center">
              <p>{item.rating}</p>
              <div className="flex gap-1">{renderStars(item.rating)}</div>
            </div>
            <p className="w-[300px]">{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
