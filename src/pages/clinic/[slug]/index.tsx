import Fasilitas from '@/components/DetailClinic/Fasilitas';
import HeaderClinic from '@/components/DetailClinic/HeaderClinic';
import Review from '@/components/DetailClinic/Review';
import Spesialis from '@/components/DetailClinic/Spesialis';
import MasterLayout from '@/components/Layouts/MasterLayout';
import Api from '@/service/api';
import { ClinicType } from '@/types/CategoryType';
import { GetServerSideProps } from 'next';
import React from 'react';

export interface ClinicDetailProps {
  clinicData: ClinicType;
}

const ClinicDetail = ({ clinicData }: ClinicDetailProps) => {
  if (!clinicData) return <div>Klinik tidak ditemukan</div>;

  return (
    <MasterLayout title="Detail Clinic- Clinic">
      <div className="min-h-screen pb-0 sm:pb-10">
        <HeaderClinic clinicData={clinicData} />
        <Spesialis clinicData={clinicData} />
        <Fasilitas clinicData={clinicData} />
        <Review clinicData={clinicData} />
      </div>
    </MasterLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params || {};
  if (!slug) {
    return { notFound: true };
  }

  try {
    const api = new Api();
    api.url = `/api/clinics/${slug}`;
    api.type = 'json';
    api.method = 'GET';

    const clinicData = await api.call();
    if (!clinicData) {
      return { notFound: true };
    }

    return {
      props: { clinicData },
    };
  } catch (error) {
    console.error('Error fetching clinic data:', error);
    return { notFound: true };
  }
};

export default ClinicDetail;
