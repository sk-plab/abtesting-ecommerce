import { Reducer } from 'redux';
import { ShoppingAction, ActionType } from './actions';

export interface ShoppingState<A = CartProductType[]> {
  cart: A;
  ordered: A;
}

export const initialState: ShoppingState = {
  cart: [],
  ordered: [],
};
const reducer: Reducer<ShoppingState, ShoppingAction> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_ITEM:
      if (action.payload === undefined) throw new Error(`[${ActionType.ADD_ITEM}] not found item`);

      const idx = state.cart.findIndex((e) => e.id === action.payload?.id);
      if (idx === -1) {
        return {
          ...state,
          cart: state.cart.concat({ ...action.payload, q: 1, chk: true }),
        };
      } else {
        return {
          ...state,
          cart: state.cart.map((e) => (e.id === action.payload?.id ? { ...e, q: e.q + 1 } : e)),
        };
      }
    case ActionType.CHECKOUT_SINGLE_ITEM:
      if (action.payload === undefined)
        throw new Error(`[${ActionType.CHECKOUT_SINGLE_ITEM}] not found item`);

      return {
        ...state,
        ordered: [{ ...action.payload, q: 1, chk: true }],
      };
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

    case ActionType.CHECKOUT_ITEMS:
      return {
        ...state,
        ordered: state.cart.filter((e) => e.chk === true),
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
