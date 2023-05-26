import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { QUERY_KEYS } from '../consts';
import { toastError, toastSuccess } from '../helpers/toast-notifications';

const fetchOrders = async () => {
  const res = await axios.get('/orders');
  return res.data;
};

const addOrder = async order => {
  const res = await axios.post('/orders', order);
  return res.data;
};
export const useOrders = () => {
  return useQuery(QUERY_KEYS.ORDER_KEY, fetchOrders, {
    staleTime: 30000,
  });
};

export const useAddOrdersData = () => {
  return useMutation(addOrder, {
    onSuccess: () => {
      toastSuccess("We have received your order, it's on its way!");
    },
    onError: () => {
      toastError('Something get wrong, try again latter');
    },
  });
};
