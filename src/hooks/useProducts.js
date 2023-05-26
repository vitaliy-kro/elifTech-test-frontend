import axios from 'axios';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../consts';

axios.defaults.baseURL = QUERY_KEYS.BACKEND_URL;

const fetchProducts = async ({ queryKey }) => {
  const shop = queryKey[1];
  const res = await axios.get(`/products${shop ? `?shop=${shop}` : ''}`);
  return res.data;
};

export const useProducts = shop => {
  return useQuery([QUERY_KEYS.PRODUCT_KEY, shop], fetchProducts, {
    staleTime: 30000,
  });
};
