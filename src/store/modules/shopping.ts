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

        if (isProduct(product)) {
          const _product = { ...product, q: 1, chk: true };
          return {
            ...state,
            cart: state.cart.concat(_product),
          };
        } else {
          return state;
        }
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
    case types.DIRECT_CHECKOUT:
      const product = state.products.find((e) => e.id === action.item.id);
      if (isProduct(product)) {
        const _product = { ...product, q: 1, chk: true };

        return {
          ...state,
          ordered: state.ordered.concat(_product),
        };
      } else {
        return state;
      }
    case types.CHECKOUT:
      if (action.item.id) {
        const product = state.cart.find((e) => e.id === action.item.id);
        if (isProduct(product)) {
          return {
            ...state,
            cart: state.cart.filter((e) => e.id !== action.item.id),
            ordered: state.ordered.concat(product),
          };
        } else {
          return state;
        }
      } else {
        const products: ProductType[] = state.cart.filter(
          (e) => e.chk === true
        );
        const ids: Array<number> = products.map((e) => e.id);

        return {
          ...state,
          cart: state.cart.filter((e) => !ids.includes(e.id)),
          ordered: products,
        };
      }

    /*const orderingProducts: any = state.cart.filter((e) =>
        action.item.ids.includes(e.id)
      );
      console.log(orderingProducts);

      return {
        ...state,
        cart: state.cart.filter((e) => !action.item.ids.includes(e.id)),
        ordered: orderingProducts,
      };*/

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
