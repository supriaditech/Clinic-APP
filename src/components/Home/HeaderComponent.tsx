import { Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { FaPlus, FaStar } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import Searching from './Searching';
import { div } from 'framer-motion/client';

function HeaderComponent() {
  return (
    <div className="relative w-full bg-[#F3FFFD] pt-10 py-32  ">
      <div className="container relative z-20 mx-auto xl:grid grid-cols-2 gap-12 px-10 2xl:px-0">
        <div className="w-full flex flex-col gap-10 py-10 ">
          <h1 className="text-7xl font-bold text-[#383A3A]">
            <span className="text-[#357A7B]"> Partner Kepercayaan</span> Anda
            dalam Mencari Klinik Kesehatan
          </h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae
            lacus dui. Integer imperdiet sem ac nisi ultrices semper non ac
            dolor. Aliquam id porttitor dui, eget congue eros. Duis iaculis
            purus eu quam mollis, ut iaculis quam cursus. Proin semper odio eu
            mauris rhoncus, et finibus diam pellentesque.
          </p>
          <button className="bg-gradient-to-tr from-[#2AA996] to-[#357A7B] py-3 px-10 flex justify-center items-center text-white shadow-lg rounded-md w-[400px]">
            <p className="text-xl font-bold">Book an appointment</p>
            <IoIosArrowForward className="text-2xl font-extrabold w-7 h-full" />
          </button>
        </div>

        {/* Responsive Background Image */}
        <div className="bg-[url('/image/home/imageHeder.png')] bg-no-repeat bg-cover bg-center w-full h-auto sm:h-[600px] relative z-10 ">
          <div className="bg-white shadow-lg absolute py-4 px-6 bottom-40 -right-4 2xl:-right-12 rounded-md">
            <div className="flex gap-2 justify-center items-center ">
              <div className=" flex -space-x-2">
                <Image
                  src="/image/home/photoProfile/Ellipse1.png"
                  width={28}
                  height={28}
                  alt="Photo profile"
                />
                <Image
                  src="/image/home/photoProfile/Ellipse1.png"
                  width={28}
                  height={28}
                  alt="Photo profile"
                />
                <Image
                  src="/image/home/photoProfile/Ellipse1.png"
                  width={28}
                  height={28}
                  alt="Photo profile"
                />
                <Image
                  src="/image/home/photoProfile/Ellipse1.png"
                  width={28}
                  height={28}
                  alt="Photo profile"
                />
              </div>
              <div className="flex items-baseline gap-1">
                <p className="font-bold text-2xl text-[#3D3D3D]">1400</p>
                <FaPlus className="w-3 h-3 text-[#357A7B]" />
              </div>
            </div>
            <p className="text-[#357A7B] mt-2 font-bold text-lg">
              Happy Customers
            </p>

            <div className="mt-2 flex">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="flex">
                  <FaStar className="text-[#F9D800] w-5 h-5" />
                </div>
              ))}
              <p className="ml-2 font-semibold">(5 Stars)</p>
            </div>
          </div>
          <div className="bg-white shadow-xl absolute bottom-20 -left-12 py-4 px-6 rounded-md flex items-center gap-2">
            <FaStar className="text-[#357A7B] w-6 h-6 bg-[#EFF9FF] p-1 rounded-md" />
            <p className="text-[#357A7B] font-semibold">
              Mudah untuk buat janji
            </p>
          </div>
        </div>
      </div>

      {/* Optional additional design element */}
      <div className="w-[400px] h-[400px] bg-gradient-to-t absolute top-0 right-0 z-10 from-[#357A7B] to-[#8EDACE] opacity-40 rounded-full" />

      <Searching />
    </div>
  );
}

export default HeaderComponent;
