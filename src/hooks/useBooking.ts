import Api from '@/service/api';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
const useBooking = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleBooking = async (data: any) => {
    setLoading(true);
    // Menghasilkan slug dari nama
    const api = new Api();
    api.url = '/api/bookings';
    api.type = 'json';
    api.body = {
      NamaLengkap: data.NamaLengkap,
      NoHp: data.NoHp,
    };
    api.method = 'POST';
    api.type = 'json';
    const response = await api.call();
    if (response.id) {
      toast.success('Category created successfully!');
      setLoading(false);
      return { success: true };
    } else {
      setLoading(false);

      toast.error(response.meta.message || 'Failed to create category');
      return { success: false };
    }
  };

  return { handleBooking, loading };
};

export default useBooking;
