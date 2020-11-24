import reducer, { initialState as initialState_, ShoppingState } from './shopping';
import * as actions from './actions';
import { ProductService } from '../../services/ProductService';

describe('Shopping Reducers', () => {
  let initialState: ShoppingState;
  let initialStateCart: ShoppingState;

  let products: ProductType[];
  let product: ProductType;

  // test product
  const PID = 0;

  beforeAll(async () => {
    products = await ProductService();
    product = products.slice(0, 1)[0];

    initialState = { ...initialState_, products };

    initialStateCart = {
      ...initialState,
      cart: [{ ...product, chk: true, q: 1 }],
    };
  });

  describe('ITEM', () => {
    it('SET_PROUDCT_ITEM', () => {
      const action = actions.setProductItem(products);
      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        products,
      });
    });
    it('cart 프로퍼티 필수', () => {
      const action = actions.addItem(PID);
      expect(reducer(initialState, action)).toHaveProperty('cart');
    });
    it('ADD_ITEM', () => {
      const action = actions.addItem(PID);
      expect(reducer(initialState, action).cart.length).toEqual(1);
      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        cart: initialState.cart.concat({ ...product, chk: true }),
      });
    });
    it('INCREASE_ITEM', () => {
      const action = actions.increaseItem(PID);
      const state = reducer(initialStateCart, action);
      expect(state).toEqual({
        ...initialState,
        cart: [{ ...product, chk: true, q: 2 }],
      });
      const state2 = reducer(state, action);
      expect(state2).toEqual({
        ...initialState,
        cart: [{ ...product, chk: true, q: 3 }],
      });
    });
    it('DECREASE_ITEM', () => {
      const action = actions.decreaseItem(PID);
      expect(reducer(initialStateCart, action)).toEqual({
        ...initialState,
        cart: [{ ...product, chk: true, q: 1 }],
      });
    });
    it('아이템 최소 수량은 1', () => {
      const action = actions.decreaseItem(PID);
      expect(reducer(initialStateCart, action)).not.toEqual({
        ...initialState,
        cart: [{ ...product, chk: true, q: 0 }],
      });
    });
    it('REMOVE_ITEM', () => {
      const action = actions.removeItem(PID);
      expect(reducer(initialStateCart, action)).toEqual({
        ...initialState,
        cart: [],
      });
    });
    it('장바구니에서 체크박스 선택한 상품 반전 테스트', () => {
      const action = actions.selectCheckoutItem(PID);
      const state = reducer(initialStateCart, action);
      expect(state).toEqual({
        ...initialState,
        cart: [{ ...product, chk: !true, q: 1 }],
      });
      const state2 = reducer(state, action);
      expect(state2).toEqual({
        ...initialState,
        cart: [{ ...product, chk: true, q: 1 }],
      });
    });
  });

  describe('CHECKOUT', () => {
    it('ordered 프로퍼티 필수', () => {
      const action = actions.checkoutSingleItem(PID);
      expect(reducer(initialState, action)).toHaveProperty('ordered');
      expect(reducer(initialState, action).ordered.length).toEqual(1);
    });
    it('바로 구매', () => {
      const action = actions.checkoutSingleItem(PID);
      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        ordered: [{ ...product, chk: true, q: 1 }],
      });
    });
    it('chk property 값은 true', () => {
      const action = actions.checkoutSingleItem(PID);
      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        ordered: [{ ...product, chk: true, q: 1 }],
      });
    });
    it('장바구니에서 체크한 것만 주문단계로 이동.', () => {
      const action = actions.checkoutItems();
      expect(reducer(initialStateCart, action)).toEqual({
        ...initialStateCart,
        ordered: [{ ...product, chk: true, q: 1 }],
      });
    });
    it('주문완료후 orderd 비워야 함.', () => {
      const initialStateOrdered = {
        ...initialStateCart,
        ordered: [{ ...product, chk: true, q: 1 }],
      };
      const action = actions.checkoutComplete();
      expect(reducer(initialStateOrdered, action)).toEqual({
        ...initialState,
        cart: [],
        ordered: [],
      });
    });
  });
});
