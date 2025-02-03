import { ClinicDetailProps } from '@/pages/clinic/[slug]';
import React from 'react';
import { FaWifi, FaParking, FaAirFreshener, FaSpa } from 'react-icons/fa';

function Fasilitas({ clinicData }: ClinicDetailProps) {
  const iconMap: { [key: string]: React.ReactNode } = {
    WiFi: <FaWifi className="w-6 h-6" />,
    Parkir: <FaParking className="w-6 h-6" />,
    AC: <FaAirFreshener className="w-6 h-6" />,
    Spa: <FaSpa className="w-6 h-6" />,
  };

  return (
    <div className="container relative z-20 mx-auto px-10 2xl:px-0 mb-10">
      <p className="text-2xl font-bold">Fasilitas</p>
      <div className="mt-8 grid grid-cols-2 gap-10 py-2 px-4 w-full  sm:w-[400px]">
        {clinicData.facilities.map((facility) => (
          <div key={facility.name} className="flex items-center gap-2 text-lg">
            {iconMap[facility.name] || <span className="w-6 h-6">❓</span>}{' '}
            {facility.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fasilitas;
