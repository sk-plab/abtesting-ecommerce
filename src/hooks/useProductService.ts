import { useEffect } from 'react';
import * as actions from '../store/modules/actions';
import { useDispatch } from 'react-redux';
import { ProductService as fetcher } from '../services/ProductService';
import useSWR from 'swr';

export const useProducts = (): {
  products: ProductType[];
} => {
  const dispatch = useDispatch();

  const { data = [] } = useSWR<ProductType[]>('/api/products', fetcher);

  useEffect(() => {
    dispatch(actions.SetProductData(data));
  }, [dispatch, data]);

  return { products: data };
};
