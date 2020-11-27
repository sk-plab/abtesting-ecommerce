import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../store/modules/actions';
import ABTest from '../libs/abtest';
import { RootState } from '../store/modules';
import Noty from 'noty';
import * as actions2 from '../store/modules/cartItemSlice';

interface IResult {
  addToItem: (item: ProductType) => void;
  increaseItem: (id: number) => void;
  decreaseItem: (id: number) => void;
  removeItem: (id: number) => void;
  selectCheckoutItem: (id: number) => void;
  checkoutSingleItem: (item: ProductType) => void;
  checkoutItems: () => void;
}
const useShoppingCart = (): IResult => {
  const dispatch = useDispatch();
  const history = useHistory();

  const addToItem = useCallback(
    async (item: ProductType) => {
      ABTest.track('add_to_cart');
      const resultAction = await dispatch(actions2.addItem(item));
      console.log(resultAction);
    },
    [dispatch]
  );
  const checkoutSingleItem = useCallback(
    (item: ProductType) => {
      dispatch(actions.checkoutSingleItem(item));
      history.push('/checkout');
    },
    [dispatch, history]
  );

  const increaseItem = useCallback((id: number) => dispatch(actions.increaseItem(id)), [dispatch]);
  const decreaseItem = useCallback((id: number) => dispatch(actions.decreaseItem(id)), [dispatch]);
  const removeItem = useCallback(
    (id: number) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        //dispatch(actions.removeItem(id));
        dispatch(actions2.removeItem(id));
      }
    },
    [dispatch]
  );

  const selectCheckoutItem = useCallback(
    (id: number) => {
      dispatch(actions.selectCheckoutItem(id));
    },
    [dispatch]
  );

  const cartItems = useSelector((state: RootState) => state.Shopping.cart);

  const checkoutItems = useCallback(() => {
    const items = cartItems.filter((e) => e.chk);
    if (items.length > 0) {
      dispatch(actions.checkoutItems());
      history.push('/checkout');
    } else {
      new Noty({
        type: 'error',
        text: `선택한 장바구니 상품이 없습니다.`,
        timeout: 3000,
      }).show();
    }
  }, [dispatch, history, cartItems]);

  return {
    addToItem,
    increaseItem,
    decreaseItem,
    removeItem,
    checkoutSingleItem,
    checkoutItems,
    selectCheckoutItem,
  };
};

export default useShoppingCart;
