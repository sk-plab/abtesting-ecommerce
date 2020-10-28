import * as types from './ActionTypes';

// prop types
interface SetProductDataPropsType {
  products: ProductType[];
}
interface ShoppingItemProps {
  id: number;
}

// action types
interface SetProductDataActionType {
  type: typeof types.SET_PRODUCT_DATA;
  item: SetProductDataPropsType;
}
interface AddToCartActionType {
  type: typeof types.ADD_TO_CART;
  item: ShoppingItemProps;
}
interface DirectCheckoutActionType {
  type: typeof types.DIRECT_CHECKOUT;
  item: ShoppingItemProps;
}
interface CheckoutActionType {
  type: typeof types.CHECKOUT;
  item: ShoppingItemProps;
}
interface DeleteCartActionType {
  type: typeof types.DELETE_CART;
  item: ShoppingItemProps;
}
interface CheckoutCompleteActionType {
  type: typeof types.CHECKOUT_COMPLETE;
}

export const SetProductData = (item: SetProductDataPropsType): SetProductDataActionType => ({
  type: types.SET_PRODUCT_DATA,
  item,
});
export const AddToCart = (item: ShoppingItemProps): AddToCartActionType => ({
  type: types.ADD_TO_CART,
  item,
});

export const DirectCheckout = (item: ShoppingItemProps): DirectCheckoutActionType => ({
  type: types.DIRECT_CHECKOUT,
  item,
});
export const Checkout = (item: ShoppingItemProps): CheckoutActionType => ({
  type: types.CHECKOUT,
  item,
});

export const DeleteCart = (item: ShoppingItemProps): DeleteCartActionType => ({
  type: types.DELETE_CART,
  item,
});

export const CheckoutComplete = (): CheckoutCompleteActionType => ({
  type: types.CHECKOUT_COMPLETE,
});

export type ShoppingAction =
  | ReturnType<typeof SetProductData>
  | ReturnType<typeof AddToCart>
  | ReturnType<typeof DirectCheckout>
  | ReturnType<typeof Checkout>
  | ReturnType<typeof DeleteCart>
  | ReturnType<typeof CheckoutComplete>;
