import thunk, { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import reducer, { initialState, itemState, actions } from './cartItemSlice';
import configureMockStore from 'redux-mock-store';
import { Action } from 'redux';
import mockProducts from '../../server/mockItems.json';

type DispatchExts = ThunkDispatch<RootState, unknown, Action<string>>;
const middlewares = [thunk];
const mockStore = configureMockStore<RootState, DispatchExts>(middlewares);
const store = mockStore();

describe('Shopping Reducers', () => {
  let initialStateCart: itemState;

  let products: ProductType[];
  let product: ProductType;

  // test product
  const PID = 0;

  beforeAll(async () => {
    products = mockProducts.data;
    product = products.slice(0, 1)[0];

    initialStateCart = {
      ...initialState,
      items: [{ ...product, chk: true, q: 1 }],
    };
  });

  describe('ITEM', () => {
    it('ADD_ITEM', async () => {
      await store.dispatch(actions.addItem(product));

      expect(reducer(initialState, store.getActions()[0]).items.length).toEqual(1);

      const cartProducts: CartProductType[] = initialState.items.concat({
        ...product,
        chk: true,
        q: 1,
      });
      expect(reducer(initialState, store.getActions()[0])).toEqual({
        ...initialState,
        items: cartProducts,
      });
      store.clearActions();
    });

    it('INCREASE_ITEM', () => {
      const action = actions.increaseItem(product);
      const state = reducer(initialStateCart, action);
      expect(state).toEqual({
        ...initialState,
        items: [{ ...product, chk: true, q: 2 }],
      });
      const state2 = reducer(state, action);
      expect(state2).toEqual({
        ...initialState,
        items: [{ ...product, chk: true, q: 3 }],
      });
    });
    it('DECREASE_ITEM', () => {
      const action = actions.decreaseItem(product);
      expect(reducer(initialStateCart, action)).toEqual({
        ...initialState,
        items: [{ ...product, chk: true, q: 1 }],
      });
    });
    it('아이템 최소 수량은 1', () => {
      const action = actions.decreaseItem(product);
      expect(reducer(initialStateCart, action)).not.toEqual({
        ...initialState,
        items: [{ ...product, chk: true, q: 0 }],
      });
    });
    it('REMOVE_ITEM', () => {
      const action = actions.removeItem(product);
      expect(reducer(initialStateCart, action)).toEqual({
        ...initialState,
        items: [],
      });
    });
    it('장바구니에서 체크박스 선택한 상품 반전 테스트', () => {
      const action = actions.selectCheckoutItem(PID);
      const state = reducer(initialStateCart, action);
      expect(state).toEqual({
        ...initialState,
        items: [{ ...product, chk: !true, q: 1 }],
      });
      const state2 = reducer(state, action);
      expect(state2).toEqual({
        ...initialState,
        items: [{ ...product, chk: true, q: 1 }],
      });
    });
  });

  describe('CHECKOUT', () => {
    it('checkout 프로퍼티 필수', async () => {
      await store.dispatch(actions.checkoutSingleItem(product));

      expect(reducer(initialState, store.getActions()[0])).toHaveProperty('checkout');
      expect(reducer(initialState, store.getActions()[0]).checkout.length).toEqual(1);

      store.clearActions();
    });
    it('바로 구매', async () => {
      await store.dispatch(actions.checkoutSingleItem(product));

      expect(reducer(initialState, store.getActions()[0])).toEqual({
        ...initialState,
        checkout: [{ ...product, chk: true, q: 1 }],
      });

      store.clearActions();
    });
    it('chk property 값은 true', async () => {
      await store.dispatch(actions.checkoutSingleItem(product));

      expect(reducer(initialState, store.getActions()[0])).toEqual({
        ...initialState,
        checkout: [{ ...product, chk: true, q: 1 }],
      });

      store.clearActions();
    });
    it('장바구니에서 체크한 것만 주문단계로 이동.', () => {
      const action = actions.checkoutItems();
      expect(reducer(initialStateCart, action)).toEqual({
        ...initialStateCart,
        checkout: [{ ...product, chk: true, q: 1 }],
      });
    });
    it('주문완료후 checkout property should clear.', () => {
      const initialStateOrdered = {
        ...initialStateCart,
        checkout: [{ ...product, chk: true, q: 1 }],
      };
      const action = actions.checkoutComplete();
      expect(reducer(initialStateOrdered, action)).toEqual({
        ...initialState,
        items: [],
        checkout: [],
      });
    });
  });
});
