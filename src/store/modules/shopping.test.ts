import reducer, { initialState, ShoppingState } from './shopping';
import * as actions from './actions';
import * as api from '../../api';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import API from 'API';

type DispatchExts = ThunkDispatch<ShoppingState, API, actions.ShoppingAction>;
const middlewares = [thunk.withExtraArgument<API>(api)];
const mockStore = configureMockStore<ShoppingState, DispatchExts>(middlewares);
const store = mockStore();

describe('Shopping Reducers', () => {
  let initialStateCart: ShoppingState;

  let products: ProductType[];
  let product: ProductType;

  // test product
  const PID = 0;

  beforeAll(async () => {
    products = await api.fetchItems();
    product = products.slice(0, 1)[0];

    initialStateCart = {
      ...initialState,
      cart: [{ ...product, chk: true, q: 1 }],
    };
  });

  describe('ITEM', () => {
    it('ADD_ITEM', async () => {
      await store.dispatch(actions.addItem(product));

      expect(reducer(initialState, store.getActions()[0]).cart.length).toEqual(1);

      const cartProducts: CartProductType[] = initialState.cart.concat({
        ...product,
        chk: true,
        q: 1,
      });
      expect(reducer(initialState, store.getActions()[0])).toEqual({
        ...initialState,
        cart: cartProducts,
      });
      store.clearActions();
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
    it('ordered 프로퍼티 필수', async () => {
      await store.dispatch(actions.checkoutSingleItem(product));

      expect(reducer(initialState, store.getActions()[0])).toHaveProperty('ordered');
      expect(reducer(initialState, store.getActions()[0]).ordered.length).toEqual(1);

      store.clearActions();
    });
    it('바로 구매', async () => {
      await store.dispatch(actions.checkoutSingleItem(product));

      expect(reducer(initialState, store.getActions()[0])).toEqual({
        ...initialState,
        ordered: [{ ...product, chk: true, q: 1 }],
      });

      store.clearActions();
    });
    it('chk property 값은 true', async () => {
      await store.dispatch(actions.checkoutSingleItem(product));

      expect(reducer(initialState, store.getActions()[0])).toEqual({
        ...initialState,
        ordered: [{ ...product, chk: true, q: 1 }],
      });

      store.clearActions();
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
