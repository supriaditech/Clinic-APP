import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { IoChevronBack } from 'react-icons/io5';
import MasterLayout from '@/components/Layouts/MasterLayout';
import DataBooking from '@/components/Booking/DataBooking';
import { SecretKey } from '../../config/config';
import { useRouter } from 'next/router';
import Link from 'next/link';

export interface BookingPageProps {
  item: any | null;
}

const Booking = ({ item }: BookingPageProps) => {
  const route = useRouter();
  return (
    <MasterLayout title="Booking - Clinic" navbarShow={false}>
      <div className="min-h-screen container mx-auto py-10 pb-0 sm:pb-10">
        {/* Header */}
        <div className="flex items-center gap-6 pb-10 border-b border-gray-300">
          <button onClick={() => route.back()}>
            <IoChevronBack className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-semibold text-gray-700">Form Login</h1>
        </div>

        {/* Pass the decrypted item to DataBooking */}
        <DataBooking item={item} />
      </div>
    </MasterLayout>
  );
};

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

export default Booking;
