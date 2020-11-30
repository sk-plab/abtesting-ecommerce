import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ABTest from '../libs/abtest';
import { actions } from '../store/modules/cartItemSlice';
import { useMutation } from 'react-query';
import * as API from '../api';

interface IResult {
  addItem: (item: ProductType) => void;
  increaseItem: (item: ProductType) => void;
  decreaseItem: (item: ProductType) => void;
  removeItem: (item: ProductType) => void;
  selectCheckoutItem: (id: number) => void;
  checkoutSingleItem: (item: ProductType) => void;
  checkoutItems: () => void;
  checkoutComplete: () => void;
}
const useShoppingCart = (): IResult => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [addItem] = useMutation(API.addItem, {
    onSuccess: (data) => {
      dispatch(actions.addItem(data));
      ABTest.track('add_to_cart');
    },
  });

  const [increaseItem] = useMutation(API.increaseQtyItem, {
    onSuccess: (data) => {
      dispatch(actions.increaseItem(data));
    },
  });
  const [decreaseItem] = useMutation(API.decreaseQtyItem, {
    onSuccess: (data) => {
      dispatch(actions.decreaseItem(data));
    },
  });

  const [removeItem] = useMutation(API.removeItem, {
    onSuccess: (data) => {
      dispatch(actions.removeItem(data));
    },
  });

  const selectCheckoutItem = useCallback(
    (id: number) => {
      dispatch(actions.selectCheckoutItem(id));
    },
    [dispatch]
  );

  const [checkoutSingleItem] = useMutation(API.checkoutItems, {
    onSuccess: (data) => {
      dispatch(actions.checkoutSingleItem(data));
      history.push('/checkout');
    },
  });

  const [checkoutItems] = useMutation(API.checkoutItems, {
    onSuccess: () => {
      dispatch(actions.checkoutItems());
      history.push('/checkout');
    },
    onError: (error) => {
      alert(error);
    },
  });

  const checkoutComplete = () => {
    dispatch(actions.checkoutComplete());
  };

  return {
    addItem,
    increaseItem,
    decreaseItem,
    removeItem,
    checkoutSingleItem,
    checkoutItems,
    selectCheckoutItem,
    checkoutComplete,
  };
};

export default useShoppingCart;
