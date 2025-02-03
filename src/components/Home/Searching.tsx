import useCategory from '@/hooks/useCategory';
import useClinic from '@/hooks/uuseClinic';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { IoSearch } from 'react-icons/io5';
import { ApiUrl } from '../../../config/config';
import { imageClinic } from '@/data/dummyDataImageClinic';
import { LoadingImage } from '../Layouts/LazyLoading/LoadingImage';
import { LuMapPin } from 'react-icons/lu';
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';

function Searching() {
  const [showList, setShowList] = useState(false);
  const { dataCategory, isLoadingCategory } = useCategory();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // State to store selected category
  const { listClinic, errorListClinic, isLoadingListClinic, setGetData } =
    useClinic(searchQuery);

  const inputRef = useRef<HTMLInputElement>(null); // Ref untuk input field
  const listRef = useRef<HTMLDivElement>(null); // Ref untuk list yang berisi hasil pencarian

  const handleClikkSearch = () => {
    setShowList(true);
    setGetData(true);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category); // Set the selected category
  };

  // Filter listClinic based on selected category
  const filteredClinics = listClinic?.filter((clinic) => {
    // If "Semua" is selected, show all clinics
    if (selectedCategory === 'Semua') {
      return true;
    }

    // Filter by selected category
    return clinic.type.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  // Close the list when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full -bottom-24 absolute z-20">
      <div className="container mx-auto bg-white border border-[#2AA996] py-8 px-10 rounded-md shadow-lg relative z-30">
        <p className="text-2xl text-[#357A7B] font-bold mb-4">
          Cari Klinik Pilihan Anda
        </p>
        <div className="relative rounded-md border border-gray-300 bg-white flex flex-row gap-2 items-center p-4 z-10">
          <IoSearch className="text-2xl text-default-400 w-8 h-8" />
          <input
            ref={inputRef} // Tambahkan ref ke input
            onClick={handleClikkSearch}
            placeholder="Cari klinik"
            type="text"
            className="h-8 text-xl w-full z-20 relative focus:outline-none focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div
            ref={listRef} // Tambahkan ref ke list hasil pencarian
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              showList ? 'h-[600px]' : 'max-h-0'
            } w-full absolute top-20 shadow-lg rounded-md -ml-4 bg-white `}
          >
            <div className="p-6">
              <p className="text-xl font-bold text-[#1E1E1E]">
                Hasil untuk{' '}
                {searchQuery !== '' ? ' "' + searchQuery + '"' : null}
              </p>
              <div className="flex items-center gap-4 mt-4">
                {dataCategory?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleCategoryClick(item.name)}
                    className={`px-4 py-1 rounded-3xl border text-center flex items-center  ${
                      selectedCategory === item.name
                        ? 'bg-[#357A7B] text-white'
                        : 'bg-white text-black border-[#1E1E1E]'
                    }`}
                  >
                    <p>{item.name}</p>
                  </button>
                ))}
              </div>
              <p className="font-bold mt-4">
                {filteredClinics?.length} Ditemukan
              </p>
              <div className="overflow-y-auto max-h-[400px] scroll-smooth">
                {filteredClinics?.map((dataClinic, index) => {
                  const clinicImage = imageClinic.find(
                    (image) => image.id === dataClinic.id,
                  );
                  return (
                    <Link
                      href={`/clinic/${dataClinic.id}`} // Gantilah dengan path yang sesuai, di sini pakai ID
                      passHref
                    >
                      <div
                        key={index}
                        className="mt-4 p-2 flex gap-4 hover:bg-[#F3FFFD]"
                      >
                        {clinicImage && (
                          <LoadingImage
                            src={clinicImage.imageUrl}
                            alt={`Clinic Image ${index}`}
                            width={300}
                            height={200}
                            className="w-[110px] h-[110px] aspect-auto"
                          />
                        )}
                        <div className="flex flex-col w-full justify-between">
                          <p className="text-xl text-[#4B5563] font-bold pb-3 border-b w-full">
                            {dataClinic.name}
                          </p>
                          <div>
                            <p className="font-semibold">{dataClinic.type}</p>
                            <div className="flex text-[#4B5563] items-center gap-2 text-xs">
                              <LuMapPin />
                              <p>{dataClinic.address}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#4B5563]">
                              <FaStar className="text-[#F9D800] w-5 h-5" />
                              <p>{dataClinic.rating}</p>
                              <p>{dataClinic.totalReviews} Reviews</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searching;
