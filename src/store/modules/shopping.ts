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

const Shopping = (state: ShoppingState = initialState, action: ShoppingAction): ShoppingState => {
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
        const _product: any = { ...product, q: 1 };

        return {
          ...state,
          cart: state.cart.concat(_product),
        };
      } else {
        return {
          ...state,
          cart: state.cart.map((e) => {
            if (e.id === action.item.id) {
              const result = {
                ...e,
                q: e.q + 1,
              };

              return result;
            } else {
              return e;
            }
          }),
        };
      }
    case types.DELETE_CART:
      return {
        ...state,
        cart: state.cart.filter((e) => e.id !== action.item.id),
      };
    case types.DIRECT_CHECKOUT:
      const product = state.products.find((e) => e.id === action.item.id);
      const _product: any = { ...product, q: 1 };
      return {
        ...state,
        ordered: state.ordered.concat(_product),
      };
    case types.CHECKOUT:
      const cartProduct: any = state.cart.find((e) => e.id === action.item.id);
      return {
        ...state,
        cart: state.cart.filter((e) => e.id !== action.item.id),
        ordered: state.ordered.concat(cartProduct),
      };
    case types.CHECKOUT_COMPLETE:
      return {
        ...state,
        ordered: [],
      };
    default:
      return state;
  }
};

export default Shopping;
