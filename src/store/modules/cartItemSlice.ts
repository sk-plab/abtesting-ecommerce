import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface itemState<T = CartProductType[]> {
  items: T;
  checkout: T;
}

export const initialState: itemState = {
  items: [],
  checkout: [],
};

const cartItemSlice = createSlice({
  name: 'cartItem',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ProductType>) {
      const idx = state.items.findIndex((e) => e.id === action.payload.id);
      if (idx === -1) {
        state.items = state.items.concat({ ...action.payload, q: 1, chk: true });
      } else {
        state.items = state.items.map((e) =>
          e.id === action.payload.id ? { ...e, q: e.q + 1 } : e
        );
      }
    },
    increaseItem(state, action: PayloadAction<ProductType>) {
      state.items = state.items.map((e) => (e.id === action.payload.id ? { ...e, q: e.q + 1 } : e));
    },
    decreaseItem(state, action: PayloadAction<ProductType>) {
      state.items = state.items.map((e) =>
        e.id === action.payload.id && e.q !== 1 ? { ...e, q: e.q - 1 } : e
      );
    },
    removeItem: (state, action: PayloadAction<ProductType>) => {
      const index = state.items.findIndex((e) => e.id === action.payload.id);
      state.items.splice(index, 1);
    },
    selectCheckoutItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.map((e) => {
        if (e.id === action.payload) {
          e.chk = !e.chk;
        }

        return e;
      });
    },

    checkoutSingleItem: (state, action: PayloadAction<ProductType>) => {
      state.checkout = [{ ...action.payload, q: 1, chk: true }];
    },
    checkoutItems: (state) => {
      state.checkout = state.items.filter((e) => e.chk === true);
    },
    checkoutComplete: (state) => {
      const ids: string[] = state.checkout.map((e) => e.id);

      state.items = state.items.filter((e) => !ids.includes(e.id));
      state.checkout = [];
    },
  },
  extraReducers: {},
});

const { reducer } = cartItemSlice;

export const actions = cartItemSlice.actions;

export default reducer;
