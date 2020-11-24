import { Action as AnyAction } from 'redux';

export enum ActionType {
  SET_PRODUCT_ITEM = 'SET_PRODUCT_ITEM',
  ADD_ITEM = 'ADD_ITEM',
  INCREASE_ITEM = 'INCREASE_ITEM',
  DECREASE_ITEM = 'DECREASE_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  SELECT_CHECKOUT_ITEM = 'SELECT_CHECKOUT_ITEM',
  CHECKOUT_SINGLE_ITEM = 'CHECKOUT_SINGLE_ITEM',
  CHECKOUT_ITEMS = 'CHECKOUT_ITEMS',
  CHECKOUT_COMPLETE = 'CHECKOUT_COMPLETE',
}

export interface FSA<Type extends string, Payload = null> extends AnyAction {
  type: Type;
  payload?: Payload;
}

// action types
export type ShoppingAction =
  | FSA<typeof ActionType.SET_PRODUCT_ITEM, ProductType[]>
  | FSA<typeof ActionType.ADD_ITEM, number>
  | FSA<typeof ActionType.INCREASE_ITEM, number>
  | FSA<typeof ActionType.DECREASE_ITEM, number>
  | FSA<typeof ActionType.REMOVE_ITEM, number>
  | FSA<typeof ActionType.SELECT_CHECKOUT_ITEM, number>
  | FSA<typeof ActionType.CHECKOUT_SINGLE_ITEM, number>
  | FSA<typeof ActionType.CHECKOUT_ITEMS>
  | FSA<typeof ActionType.CHECKOUT_COMPLETE>;

export const setProductItem = (products: ProductType[]): ShoppingAction => ({
  type: ActionType.SET_PRODUCT_ITEM,
  payload: products,
});

export const addItem = (id: number): ShoppingAction => ({
  type: ActionType.ADD_ITEM,
  payload: id,
});

export const increaseItem = (id: number): ShoppingAction => ({
  type: ActionType.INCREASE_ITEM,
  payload: id,
});

export const decreaseItem = (id: number): ShoppingAction => ({
  type: ActionType.DECREASE_ITEM,
  payload: id,
});

export const removeItem = (id: number): ShoppingAction => ({
  type: ActionType.REMOVE_ITEM,
  payload: id,
});

export const checkoutSingleItem = (id: number): ShoppingAction => ({
  type: ActionType.CHECKOUT_SINGLE_ITEM,
  payload: id,
});

export const selectCheckoutItem = (id: number): ShoppingAction => ({
  type: ActionType.SELECT_CHECKOUT_ITEM,
  payload: id,
});

export const checkoutItems = (): ShoppingAction => ({
  type: ActionType.CHECKOUT_ITEMS,
});

export const checkoutComplete = (): ShoppingAction => ({
  type: ActionType.CHECKOUT_COMPLETE,
});
