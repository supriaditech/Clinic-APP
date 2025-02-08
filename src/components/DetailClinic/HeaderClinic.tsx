import { ClinicDetailProps } from '@/pages/clinic/[slug]';
import Link from 'next/link';
import React, { useState } from 'react';
import { LoadingImage } from '../Layouts/LazyLoading/LoadingImage';
import { imageDetailClinic } from '@/data/dummyDetailImage';
import { Button, Tab, Tabs } from '@heroui/react';
import { LuMapPin } from 'react-icons/lu';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { SecretKey } from '../../../config/config';
import CryptoJS from 'crypto-js';

const HeaderClinic = ({ clinicData }: ClinicDetailProps) => {
  const image = imageDetailClinic;
  const route = useRouter();
  const [selectedKey, setSelectedKey] = useState<string>('InfoUmum');
  const handleClickBooking = (item: any) => {
    // Enkripsi item
    const encryptedItem = CryptoJS.AES.encrypt(
      JSON.stringify(item),
      SecretKey,
    ).toString();

    // Kirimkan item yang sudah terenkripsi ke halaman booking
    route.push({
      pathname: '/booking',
      query: { data: encryptedItem },
    });
  };

  return (
    <div className="relative w-full bg-[#F3FFFD] pt-0 sm:pt-10 pb-10  rounded-b-[40px] sm:rounded-b-[80px]">
      <div className="container relative z-20 mx-auto px-10 2xl:px-0">
        <div className="flex flex-row items-center gap-2">
          <Link href={'/'}>Beranda</Link> <p> - </p>
          <Link href={'/clinic'}>Klinik</Link> <p> - </p>
          <Link href={`/clinic/${clinicData.id}`} className="text-[#2AA996]">
            {clinicData.name}
          </Link>
        </div>
        <div className="sm:grid grid-cols-3 mt-10 gap-6">
          <div className="w-full sm:col-span-1 rounded-lg ">
            <LoadingImage
              src={image[0].imageUrl}
              width={200}
              height={200}
              alt="Detail Image"
              className="w-full h-[410px] rounded-xl object-cover"
            />
          </div>
          <div className="hidden col-span-2 sm:grid grid-cols-3 gap-6">
            {image.map((item) => (
              <div key={item.id} className="rounded-lg ">
                <LoadingImage
                  src={item.imageUrl}
                  width={20}
                  height={20}
                  alt="Detail Image"
                  className="col-span-1 w-full h-48 rounded-xl object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          aria-label="Tabs variants"
          variant="underlined"
          className="mt-4"
          selectedKey={selectedKey}
          onSelectionChange={(key: React.Key) => setSelectedKey(String(key))} // Convert key to string
          classNames={{
            tab: 'border-b-2 text-[#4B5563] hover:border-[#2AA996] hover:text-[#2AA996] focus:outline-none',
            tabList: '',
            panel: '',
            base: 'flex wrap',
          }}
        >
          <Tab
            key="InfoUmum"
            title="Info Umum"
            className={`${
              selectedKey === 'InfoUmum'
                ? 'border-[#2AA996] text-[#2AA996]'
                : ''
            }`}
          />
          <Tab
            key="Spesialis"
            title="Spesialis"
            className={`${
              selectedKey === 'Spesialis'
                ? 'border-[#2AA996] text-[#2AA996]'
                : ''
            }`}
          />
          <Tab
            key="Fasilitas"
            title="Fasilitas"
            className={`${
              selectedKey === 'Fasilitas'
                ? 'border-[#2AA996] text-[#2AA996]'
                : ''
            }`}
          />
          <Tab
            key="Review"
            title="Review"
            className={`${
              selectedKey === 'Review' ? 'border-[#2AA996] text-[#2AA996]' : ''
            }`}
          />
          <Tab
            key="Lokasi"
            title="Lokasi"
            className={`${
              selectedKey === 'Lokasi' ? 'border-[#2AA996] text-[#2AA996]' : ''
            }`}
          />
        </Tabs>

        <p className="text-3xl mt-10 font-bold text-[#1E1E1E]">
          {clinicData.name}
        </p>
        <div className="sm:flex justify-between items-start mt-6">
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{clinicData.type}</p>
            <div className="flex text-[#4B5563] items-center gap-2 text-xs">
              <LuMapPin className="w-5 h-5" />
              <p>{clinicData.address}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#4B5563]">
              <FaStar className="text-[#F9D800] w-5 h-5" />
              <p>{clinicData.rating}</p>
              <p>{clinicData.totalReviews} Reviews</p>
            </div>
          </div>
          <Button
            className="mt-2 sm:mt-0 bg-[#357A7B] text-white font-bold"
            onPress={() => handleClickBooking(clinicData)}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderClinic;
