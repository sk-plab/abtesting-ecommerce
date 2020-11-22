import * as ActionType from './ActionTypes';
import { Action as AnyAction } from 'redux';

export interface FSA<Type extends string, Payload = null> extends AnyAction {
  type: Type;
  payload?: Payload;
}

// action types
export type ShoppingAction =
  | FSA<typeof ActionType.SET_PRODUCT_DATA, ProductType[]>
  | FSA<typeof ActionType.ADD_TO_CART, number>
  | FSA<typeof ActionType.INCREASE_CART, number>
  | FSA<typeof ActionType.DECREASE_CART, number>
  | FSA<typeof ActionType.DELETE_CART, number>
  | FSA<typeof ActionType.DIRECT_CHECKOUT, number>
  | FSA<typeof ActionType.CART_SELECT_PRODUCT, number>
  | FSA<typeof ActionType.CHECKOUT>
  | FSA<typeof ActionType.CHECKOUT_COMPLETE>;

export const SetProductData = (products: ProductType[]): ShoppingAction => ({
  type: ActionType.SET_PRODUCT_DATA,
  payload: products,
});

export const AddToCart = (id: number): ShoppingAction => ({
  type: ActionType.ADD_TO_CART,
  payload: id,
});

export const IncreaseCart = (id: number): ShoppingAction => ({
  type: ActionType.INCREASE_CART,
  payload: id,
});

export const DecreaseCart = (id: number): ShoppingAction => ({
  type: ActionType.DECREASE_CART,
  payload: id,
});

export const DeleteCart = (id: number): ShoppingAction => ({
  type: ActionType.DELETE_CART,
  payload: id,
});

export const DirectCheckout = (id: number): ShoppingAction => ({
  type: ActionType.DIRECT_CHECKOUT,
  payload: id,
});

export const CartSelectProduct = (id: number): ShoppingAction => ({
  type: ActionType.CART_SELECT_PRODUCT,
  payload: id,
});

export const Checkout = (): ShoppingAction => ({
  type: ActionType.CHECKOUT,
});

export const CheckoutComplete = (): ShoppingAction => ({
  type: ActionType.CHECKOUT_COMPLETE,
});
