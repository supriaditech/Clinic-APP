import React, { useState } from 'react';
import { LoadingImage } from '../Layouts/LazyLoading/LoadingImage';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  SelectItem,
  Spinner,
} from '@heroui/react';
import { BookingPageProps } from '@/pages/booking';
import { LuMapPin } from 'react-icons/lu';
import { BsTelephone } from 'react-icons/bs';
import { today, getLocalTimeZone } from '@internationalized/date';
import useBooking from '@/hooks/useBooking';
import { useRouter } from 'next/router';
import { SecretKey } from '../../../config/config';
import CryptoJS from 'crypto-js';

function DataBooking({ item }: BookingPageProps) {
  const { handleBooking, loading } = useBooking();
  const route = useRouter();
  const gender = [
    { id: 1, text: 'Laki-laki' },
    { id: 2, text: 'Perempuan' },
  ];

  // Handle submit
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const response = await handleBooking(data);
    const encryptedItem = CryptoJS.AES.encrypt(
      JSON.stringify(item),
      SecretKey,
    ).toString();
    // Setelah booking sukses, kirimkan `item` ke halaman success-booking
    if (response.success) {
      route.push({
        pathname: '/success-booking',
        query: { data: encryptedItem }, // Mengirim item ke query string
      });
    }
  };
  const yesterday = today(getLocalTimeZone()).subtract({ days: 1 });

  return (
    <Form
      className="py-8 lg:grid grid-cols-4 gap-10"
      validationBehavior="native"
      onSubmit={onSubmit}
    >
      <div className="col-span-4 w-full  lg:col-span-3">
        <div className="bg-[#F3FFFD] w-full p-6 border border-[#a7cdce] rounded-md">
          <div className="flex gap-4 items-center">
            <LoadingImage
              src="/image/calender.png"
              width={100}
              height={100}
              alt={'Calender'}
              className="w-[100px] aspect-auto "
            />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Pastikan Data Anda Benar
              </p>
              <p className="text-gray-400">
                Sebelum melanjutkan proses booking pastikan semua data anda
                benar
              </p>
            </div>
          </div>
        </div>
        <div className="my-10 w-full grid grid-cols-3 gap-6">
          <Input
            isRequired
            errorMessage="Harap lengkapi nama"
            label="Nama Lengkap"
            labelPlacement="outside"
            name="NamaLengkap"
            placeholder="Masukkan nama lengkap"
            type="text"
            variant="bordered"
            radius={'sm'}
            size="lg"
            className="col-span-2"
          />
          <Input
            isRequired
            errorMessage="Harap lengkapi nomor handphone dan pastikan sudah benar"
            label="No. HP"
            labelPlacement="outside"
            name="NoHp"
            placeholder="Masukkan No. Hp"
            type="number"
            variant="bordered"
            radius={'sm'}
            size="lg"
            className="col-span-1"
            pattern="^[0-9]{10,12}$"
          />
          <div className="col-span-3 grid grid-cols-3 gap-6 items-start">
            <div className="pt-1">
              <Select
                isRequired
                errorMessage="Pilih jenis kelamin untuk booking"
                className="w-full"
                label="Jenis Kelamin"
                labelPlacement={'outside'}
                placeholder="Silahkan Pilih"
                size="lg"
                name="jenisKelamin"
                radius={'sm'}
                variant="bordered"
              >
                {gender.map((item) => (
                  <SelectItem key={item.id}>{item.text}</SelectItem>
                ))}
              </Select>
            </div>

            {/* Toggle the DatePicker visibility based on dateCondition */}
            <div className={` w-full`}>
              <DatePicker
                isRequired
                errorMessage="Pilih dan pastikan tanggal lahir anda benar"
                labelPlacement={'outside'}
                label="Tanggal Lahir"
                selectorButtonPlacement="start"
                variant="bordered"
                size="lg"
                radius={'sm'}
                className="w-full "
                maxValue={yesterday}
                name="tanggalLahir"
              />
            </div>

            <div className="pt-1 w-full">
              <Input
                isRequired
                errorMessage="Harap Masukkan alamat lengkap"
                label="Alamat Lengkap"
                labelPlacement="outside"
                name="alamat"
                placeholder="Jakarta Selatan"
                type="text"
                variant="bordered"
                radius={'sm'}
                size="lg"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-white w-full shadow-[0_4px_10px_rgba(0,0,0,0.1),0_-4px_10px_rgba(0,0,0,0.1)] rounded-md p-4 h-full">
        <div className="flex items-center pb-4 border-b border-gray-200 gap-4 mb-4">
          <LoadingImage
            src="/image/photoProfile.png"
            width={120}
            height={20}
            className="w-16 h-16"
            alt="Logo"
          />
          <div>
            <p className="text-lg font-bold">{item?.specialists[0]?.name}</p>
            <p className="text-sm -mt-1">Pelayanan Dokter Umum</p>
          </div>
        </div>

        {/* Additional information */}
        <div className="pb-4 border-b border-gray-200 flex flex-col gap-2 mb-4">
          <p className="text-lg font-bold">{item?.name}</p>
          <div className="flex text-[#4B5563]  gap-2 text-sm mt-1">
            <LuMapPin className="w-5 h-5" />
            <p>{item?.address}</p>
          </div>
          <div className="flex text-[#4B5563] items-center gap-2 text-sm">
            <BsTelephone className="w-5 h-5" />
            <p>082277280453</p>
          </div>
        </div>

        <div className="pb-4 border-b border-gray-200 flex flex-col gap-2 mb-4">
          <p className="text-lg font-bold">Jadwal Booking</p>
          <div className="flex text-[#4B5563] items-center gap-2 text-sm mt-1">
            <LuMapPin className="w-5 h-5" />
            <p>Senin, 24 Juli 2025</p>
          </div>
          <div className="flex text-[#4B5563] items-center gap-2 text-sm">
            <BsTelephone className="w-5 h-5" />
            <p>082277280453</p>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full flex justify-center items-center gap-4 bg-[#2AA996] text-white font-semibold"
        >
          {loading && <Spinner size="sm" />} Submit
        </Button>
      </div>
    </Form>
  );
}

export default DataBooking;
