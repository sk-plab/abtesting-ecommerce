import * as types from '../../actions/ActionTypes';
import { ShoppingAction } from '../../actions';

export interface ShoppingState {
  products: ProductType[];
  cart: ProductType[];
  ordered: ProductType[];
}
const initialState: ShoppingState = {
  products: [],
  cart: [],
  ordered: [],
};

// type guards
function isProduct(x: ProductType | undefined): x is ProductType {
  return typeof x === 'object';
}

const Shopping = (
  state: ShoppingState = initialState,
  action: ShoppingAction
): ShoppingState => {
  switch (action.type) {
    case types.SET_PRODUCT_DATA:
      return {
        ...state,
        products: action.item.products,
      };
    case types.ADD_TO_CART:
      const idx = state.cart.findIndex((e) => e.id === action.item.id);

      if (idx === -1) {
        const product = state.products.find((e) => e.id === action.item.id);

        return isProduct(product)
          ? {
              ...state,
              cart: state.cart.concat({ ...product, q: 1, chk: true }),
            }
          : state;
      } else {
        return {
          ...state,
          cart: state.cart.map((e) =>
            e.id === action.item.id ? { ...e, q: e.q + 1 } : e
          ),
        };
      }
    case types.INCREASE_CART:
      return {
        ...state,
        cart: state.cart.map((e) =>
          e.id === action.item.id ? { ...e, q: e.q + 1 } : e
        ),
      };
    case types.DECREASE_CART:
      return {
        ...state,
        cart: state.cart.map((e) =>
          e.id === action.item.id && e.q !== 1 ? { ...e, q: e.q - 1 } : e
        ),
      };
    case types.DELETE_CART:
      return {
        ...state,
        cart: state.cart.filter((e) => e.id !== action.item.id),
      };
    case types.CART_SELECT_PRODUCT:
      return {
        ...state,
        cart: state.cart.map((e) => {
          if (e.id === action.item.id) {
            e = { ...e, chk: !e.chk };
          }

          return e;
        }),
      };
    // save to: ordered
    case types.DIRECT_CHECKOUT:
      const product = state.products.find((e) => e.id === action.item.id);
      return isProduct(product)
        ? {
            ...state,
            ordered: state.ordered.concat({ ...product, q: 1, chk: true }),
          }
        : state;
    // save to: ordered
    case types.CHECKOUT:
      const products: ProductType[] = state.cart.filter((e) => e.chk === true);

      return {
        ...state,
        ordered: products,
      };
    case types.CHECKOUT_COMPLETE:
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

export default Shopping;
