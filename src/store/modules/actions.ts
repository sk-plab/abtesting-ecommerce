import API from 'API';
import { Action as AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ShoppingState } from './shopping';

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

export interface FSA<Type extends string, Payload = null> extends AnyAction {
  type: Type;
  payload?: Payload;
}

type ThunkResult<R> = ThunkAction<R, ShoppingState, API, AnyAction<string>>;

// action types
export type ShoppingAction =
  | FSA<typeof ActionType.ADD_ITEM, ProductType>
  | FSA<typeof ActionType.SELECT_CHECKOUT_ITEM, number>
  | FSA<typeof ActionType.INCREASE_ITEM, number>
  | FSA<typeof ActionType.DECREASE_ITEM, number>
  | FSA<typeof ActionType.REMOVE_ITEM, number>
  | FSA<typeof ActionType.CHECKOUT_SINGLE_ITEM, ProductType>
  | FSA<typeof ActionType.CHECKOUT_ITEMS>
  | FSA<typeof ActionType.CHECKOUT_COMPLETE>;

export const addItem = (item: ProductType): ThunkResult<void> => {
  return async (dispatch, _, api) => {
    const payload = await api.addToCart(item);

    dispatch<ShoppingAction>({
      type: ActionType.ADD_ITEM,
      payload,
    });
  };
};

export const checkoutSingleItem = (item: ProductType): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch<ShoppingAction>({
      type: ActionType.CHECKOUT_SINGLE_ITEM,
      payload: item,
    });
  };
};

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
