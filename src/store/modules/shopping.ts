import { Reducer } from 'redux';
import { ShoppingAction, ActionType } from './actions';

export interface ShoppingState<T = ProductType[]> {
  products: T;
  cart: T;
  ordered: T;
}

export const initialState: ShoppingState = {
  products: [],
  cart: [],
  ordered: [],
};
const reducer: Reducer<ShoppingState, ShoppingAction> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_PRODUCT_ITEM:
      return {
        ...state,
        products: action.payload ?? [],
      };
    case ActionType.ADD_ITEM:
      const idx = state.cart.findIndex((e) => e.id === action.payload);
      if (idx === -1) {
        const product = state.products.filter((e) => e.id === action.payload)[0];

        return {
          ...state,
          cart: state.cart.concat({ ...product, q: 1, chk: true }),
        };
      } else {
        return {
          ...state,
          cart: state.cart.map((e) => (e.id === action.payload ? { ...e, q: e.q + 1 } : e)),
        };
      }
    case ActionType.INCREASE_ITEM:
      return {
        ...state,
        cart: state.cart.map((e) => (e.id === action.payload ? { ...e, q: e.q + 1 } : e)),
      };
    case ActionType.DECREASE_ITEM:
      return {
        ...state,
        cart: state.cart.map((e) =>
          e.id === action.payload && e.q !== 1 ? { ...e, q: e.q - 1 } : e
        ),
      };
    case ActionType.REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((e) => e.id !== action.payload),
      };
    case ActionType.SELECT_CHECKOUT_ITEM:
      return {
        ...state,
        cart: state.cart.map((e) => {
          if (e.id === action.payload) {
            e = { ...e, chk: !e.chk };
          }

          return e;
        }),
      };
    case ActionType.CHECKOUT_SINGLE_ITEM:
      const product = state.products.filter((e) => e.id === action.payload)[0];

      return {
        ...state,
        ordered: [{ ...product, q: 1, chk: true }],
      };
    case ActionType.CHECKOUT_ITEMS:
      const products = state.cart.filter((e) => e.chk === true);

      return {
        ...state,
        ordered: products,
      };
    case ActionType.CHECKOUT_COMPLETE:
      const ids: Array<number> = state.ordered.map((e) => e.id);
      return {
        ...state,
        cart: state.cart.filter((e) => !ids.includes(e.id)),
        ordered: [],
      };
    default:
      return state;
  }
};

export default reducer;
