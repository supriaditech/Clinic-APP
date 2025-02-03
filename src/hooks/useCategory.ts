import Api from '@/service/api';
import { CategoryType } from '@/types/CategoryType';
import useSWR from 'swr';

const fetcher = async <T>(url: string): Promise<T> => {
  const api = new Api();
  api.url = url;
  api.type = 'json';
  api.method = 'GET';
  return (await api.call()) as T;
};

const useCategory = (name?: string) => {
  const {
    data: dataCategory,
    error: errorDataCategory,
    isLoading: isLoadingCategory,
  } = useSWR<CategoryType[]>([`/api/categories`], ([url]: [string]) =>
    fetcher(url),
  );

  return {
    dataCategory,
    errorDataCategory,
    isLoadingCategory,
  };
};

export default useCategory;
