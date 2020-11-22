import { Reducer } from 'redux';
import * as ActionType from '../../actions/ActionTypes';
import { ShoppingAction } from '../../actions';

export interface ShoppingState {
  products: ProductType[];
  cart: ProductType[];
  ordered: ProductType[];
}
export const initialState: ShoppingState = {
  products: [],
  cart: [],
  ordered: [],
};

// type guards
function isProduct(x: ProductType | undefined): x is ProductType {
  return typeof x === 'object';
}

const reducer: Reducer<ShoppingState, ShoppingAction> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_PRODUCT_DATA:
      return {
        ...state,
        products: action.payload ?? [],
      };
    case ActionType.ADD_TO_CART:
      const idx = state.cart.findIndex((e) => e.id === action.payload);

      if (idx === -1) {
        const product = state.products.find((e) => e.id === action.payload);

        return isProduct(product)
          ? {
              ...state,
              cart: state.cart.concat({ ...product, q: 1, chk: true }),
            }
          : state;
      } else {
        return {
          ...state,
          cart: state.cart.map((e) => (e.id === action.payload ? { ...e, q: e.q + 1 } : e)),
        };
      }
    case ActionType.INCREASE_CART:
      return {
        ...state,
        cart: state.cart.map((e) => (e.id === action.payload ? { ...e, q: e.q + 1 } : e)),
      };
    case ActionType.DECREASE_CART:
      return {
        ...state,
        cart: state.cart.map((e) =>
          e.id === action.payload && e.q !== 1 ? { ...e, q: e.q - 1 } : e
        ),
      };
    case ActionType.DELETE_CART:
      return {
        ...state,
        cart: state.cart.filter((e) => e.id !== action.payload),
      };
    case ActionType.CART_SELECT_PRODUCT:
      return {
        ...state,
        cart: state.cart.map((e) => {
          if (e.id === action.payload) {
            e = { ...e, chk: !e.chk };
          }

          return e;
        }),
      };
    // save to: ordered
    case ActionType.DIRECT_CHECKOUT:
      const product = state.products.find((e) => e.id === action.payload);

      return {
        ...state,
        ordered: isProduct(product) ? [{ ...product, q: 1, chk: true }] : [],
      };
    // save to: ordered
    case ActionType.CHECKOUT:
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
