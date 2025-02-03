import Api from '@/service/api';
import { ClinicType } from '@/types/CategoryType';
import React from 'react';
import useSWR from 'swr';

const fetcher = async <T>(url: string): Promise<T> => {
  const api = new Api();
  api.url = url;
  api.type = 'json';
  api.method = 'GET';
  return (await api.call()) as T;
};

const useClinic = (name?: string) => {
  const [getData, setGetData] = React.useState(false);
  const {
    data: listClinic,
    error: errorListClinic,
    isLoading: isLoadingListClinic,
  } = useSWR<ClinicType[]>(
    getData ? [`/api/clinics?name=${name}`] : null,
    ([url]: [string]) => fetcher(url),
  );

  return {
    listClinic,
    errorListClinic,
    isLoadingListClinic,
    setGetData,
    getData,
  };
};

export default useClinic;
