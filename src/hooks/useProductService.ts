import { useEffect, useState } from 'react';
import * as actions from '../actions';
import { useDispatch } from 'react-redux';
import { ProductService } from '../services/ProductService';

export const useProducts = (): {
  status: string;
  payload: ProductType[];
} => {
  const [status, setStatus] = useState('initial');
  const [payload, setPayload] = useState<ProductType[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setStatus('loading');

    ProductService().then((data) => {
      setPayload(data);
      setStatus('success');

      dispatch(actions.SetProductData({ products: data }));
    });
  }, [dispatch]);

  return { status, payload };
};
