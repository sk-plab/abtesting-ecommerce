import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api';

interface itemState {
  status: string;
  error: string | null;
  items: CartProductType[];
}

const initialState: itemState = {
  status: 'idle',
  error: null,
  items: [],
};

export const addItem = createAsyncThunk<ProductType, ProductType>('items/addItem', async (item) => {
  const payload = await api.addToCart(item);
  return payload;
});

export const removeItem = createAsyncThunk<void, number>('items/removeItem', async (item) => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, 1000);
  });
});

const cartItemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: {
    [addItem.pending.type]: (state) => {
      state.status = 'loading';
    },
    [addItem.fulfilled.type]: (state, action: PayloadAction<ProductType>) => {
      state.status = 'succeeded';
      const idx = state.items.findIndex((e) => e.id === action.payload.id);
      if (idx === -1) {
        state.items = state.items.concat({ ...action.payload, q: 1, chk: true });
      } else {
        state.items = state.items.map((e) =>
          e.id === action.payload.id ? { ...e, q: e.q + 1 } : e
        );
      }
    },
    [removeItem.fulfilled.type]: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((e) => e.id === action.payload);
      state.items.splice(index, 1);
    },
  },
});

const { reducer } = cartItemSlice;

export const actions = cartItemSlice.actions;

export default reducer;
