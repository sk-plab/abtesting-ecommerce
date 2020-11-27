import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  increaseItem,
  decreaseItem,
  selectCheckoutItem,
  checkoutSingleItem,
  checkoutItems,
  checkoutComplete,
} from './actions';

export interface ShoppingState<A = CartProductType[]> {
  status: string;
  cart: A;
  ordered: A;
}

export const initialState = {
  status: 'idle',
  cart: [],
  ordered: [],
};
const reducer = createReducer<ShoppingState>(initialState, {
  // [addItem.pending.type]: (state) => {
  //   state.status = 'loading';
  // },
  // [addItem.fulfilled.type]: (state, action: PayloadAction<ProductType>) => {
  //   state.status = 'succeeded';
  //   const idx = state.cart.findIndex((e) => e.id === action.payload.id);
  //   if (idx === -1) {
  //     state.cart = state.cart.concat({ ...action.payload, q: 1, chk: true });
  //   } else {
  //     state.cart = state.cart.map((e) => (e.id === action.payload.id ? { ...e, q: e.q + 1 } : e));
  //   }
  // },
  [checkoutSingleItem.fulfilled.type]: (state, action: PayloadAction<ProductType>) => {
    return {
      ...state,
      ordered: [{ ...action.payload, q: 1, chk: true }],
    };
  },
  [increaseItem.type]: (state, action: PayloadAction<number>) => {
    return {
      ...state,
      cart: state.cart.map((e) => (e.id === action.payload ? { ...e, q: e.q + 1 } : e)),
    };
  },
  [decreaseItem.type]: (state, action: PayloadAction<number>) => {
    return {
      ...state,
      cart: state.cart.map((e) =>
        e.id === action.payload && e.q !== 1 ? { ...e, q: e.q - 1 } : e
      ),
    };
  },
  // [removeItem.type]: (state, action: PayloadAction<number>) => {
  //   return {
  //     ...state,
  //     cart: state.cart.filter((e) => e.id !== action.payload),
  //   };
  // },
  [selectCheckoutItem.type]: (state, action: PayloadAction<number>) => {
    return {
      ...state,
      cart: state.cart.map((e) => {
        if (e.id === action.payload) {
          e = { ...e, chk: !e.chk };
        }

        return e;
      }),
    };
  },
  [checkoutItems.type]: (state) => {
    return {
      ...state,
      ordered: state.cart.filter((e) => e.chk === true),
    };
  },
  [checkoutComplete.type]: (state) => {
    const ids: number[] = state.ordered.map((e) => e.id);
    return {
      ...state,
      cart: state.cart.filter((e) => !ids.includes(e.id)),
      ordered: [],
    };
  },
});

export default reducer;
