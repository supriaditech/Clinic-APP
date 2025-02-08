import { LoadingImage } from '@/components/Layouts/LazyLoading/LoadingImage';
import React from 'react';
import { SecretKey } from '../../config/config';
import CryptoJS from 'crypto-js';
import Head from 'next/head';

interface SuccessBookingProps {
  item: any;
}

function SuccessBooking({ item }: SuccessBookingProps) {
  return (
    <>
      <Head>
        <title>{'Success Booking - Clinic'}</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <LoadingImage
          src="/image/calender.png"
          width={100}
          height={100}
          alt={'Calender'}
          className="w-[300px] aspect-auto "
        />
        <p className="text-2xl font-bold text-gray-700 pt-4">Success !!!</p>
        <p className="text-2xl font-bold text-gray-700 ">
          Anda berhasil buat janji di {item?.name} dengan{' '}
          {item.specialists[0].name}
        </p>
        <p className="text-lg text-gray-400">
          Pihak klinik akan mengirim konfirmasi ke nomor handphone anda
        </p>
      </div>
    </>
  );
}

export default SuccessBooking;

export const getServerSideProps = async (context: any) => {
  const { query } = context;

  const encryptedData = query.data || null;

  if (encryptedData) {
    try {
      const decryptedData = CryptoJS.AES.decrypt(
        encryptedData,
        SecretKey,
      ).toString(CryptoJS.enc.Utf8);

      const item = JSON.parse(decryptedData);

      return {
        props: {
          item,
        },
      };
    } catch (error) {
      console.error('Failed to decrypt data:', error);
      return {
        props: {
          item: null,
        },
      };
    }
  }

  return {
    props: {
      item: null,
    },
  };
};
