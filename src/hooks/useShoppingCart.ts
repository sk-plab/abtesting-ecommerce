import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../actions';
import ABTest from '../libs/abtest';
import { RootState } from '../store/modules';
import Noty from 'noty';

interface IResult {
  addToItem: (product: ProductType) => void;
  increaseItem: (id: number) => void;
  decreaseItem: (id: number) => void;
  removeItem: (id: number) => void;
  checkoutSingleItem: (id: number) => void;
  redirectToCheckout: () => void;
  selectCheckoutItem: (id: number) => void;
}
const useShoppingCart = (): IResult => {
  const dispatch = useDispatch();
  const history = useHistory();

  const addToItem = useCallback(
    (product: ProductType) => {
      ABTest.track('add_to_cart');
      dispatch(actions.AddToCart(product.id));
    },
    [dispatch]
  );
  const increaseItem = useCallback((id: number) => dispatch(actions.IncreaseCart(id)), [dispatch]);
  const decreaseItem = useCallback((id: number) => dispatch(actions.DecreaseCart(id)), [dispatch]);
  const removeItem = useCallback(
    (id: number) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        dispatch(actions.DeleteCart(id));
      }
    },
    [dispatch]
  );

  const checkoutSingleItem = useCallback(
    (id: number) => {
      dispatch(actions.DirectCheckout(id));
      history.push('/checkout');
    },
    [dispatch, history]
  );

  const selectCheckoutItem = useCallback(
    (id: number) => {
      dispatch(actions.CartSelectProduct(id));
    },
    [dispatch]
  );

  const cartItems = useSelector((state: RootState) => state.Shopping.cart);

  const redirectToCheckout = useCallback(() => {
    const items = cartItems.filter((e) => e.chk);
    if (items.length > 0) {
      dispatch(actions.Checkout());
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
    redirectToCheckout,
    selectCheckoutItem,
  };
};

export default useShoppingCart;
