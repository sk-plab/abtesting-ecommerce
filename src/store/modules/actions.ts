import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api';

export enum ActionType {
  ADD_ITEM = 'ADD_ITEM',
  INCREASE_ITEM = 'INCREASE_ITEM',
  DECREASE_ITEM = 'DECREASE_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  SELECT_CHECKOUT_ITEM = 'SELECT_CHECKOUT_ITEM',
  CHECKOUT_SINGLE_ITEM = 'CHECKOUT_SINGLE_ITEM',
  CHECKOUT_ITEMS = 'CHECKOUT_ITEMS',
  CHECKOUT_COMPLETE = 'CHECKOUT_COMPLETE',
}

export const addItem = createAsyncThunk<ProductType, ProductType>(
  ActionType.ADD_ITEM,
  async (item) => {
    const payload = await api.addToCart(item);
    return payload;
  }
);

export const checkoutSingleItem = createAsyncThunk<ProductType, ProductType>(
  ActionType.CHECKOUT_SINGLE_ITEM,
  async (item) => {
    return item;
  }
);

export const increaseItem = createAction<number>(ActionType.INCREASE_ITEM);
export const decreaseItem = createAction<number>(ActionType.DECREASE_ITEM);
//export const removeItem = createAction<number>(ActionType.REMOVE_ITEM);
export const selectCheckoutItem = createAction<number>(ActionType.SELECT_CHECKOUT_ITEM);
export const checkoutItems = createAction(ActionType.CHECKOUT_ITEMS);
export const checkoutComplete = createAction(ActionType.CHECKOUT_COMPLETE);
