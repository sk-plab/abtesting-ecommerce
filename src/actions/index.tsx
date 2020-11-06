import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/modules';
import * as types from './ActionTypes';

// prop types
interface SetProductDataPropsType {
  products: ProductType[];
}
interface ShoppingItemProps {
  id: number;
}
interface CheckoutProps {
  id?: number;
}
interface CartSelectProductProps {
  id: number;
  chk: boolean;
}

// action types
interface ISetProductDataActionType {
  type: typeof types.SET_PRODUCT_DATA;
  item: SetProductDataPropsType;
}
interface IAddToCartActionType {
  type: typeof types.ADD_TO_CART;
  item: ShoppingItemProps;
}
interface IIncreaseCartActionType {
  type: typeof types.INCREASE_CART;
  item: ShoppingItemProps;
}
interface IDecreaseCartActionType {
  type: typeof types.DECREASE_CART;
  item: ShoppingItemProps;
}
interface ICartSelectProductActionType {
  type: typeof types.CART_SELECT_PRODUCT;
  item: CartSelectProductProps;
}
interface IDirectCheckoutActionType {
  type: typeof types.DIRECT_CHECKOUT;
  item: ShoppingItemProps;
}
interface ICheckoutActionType {
  type: typeof types.CHECKOUT;
  item: CheckoutProps;
}
interface IDeleteCartActionType {
  type: typeof types.DELETE_CART;
  item: ShoppingItemProps;
}
interface ICheckoutCompleteActionType {
  type: typeof types.CHECKOUT_COMPLETE;
}

export const SetProductData = (
  item: SetProductDataPropsType
): ISetProductDataActionType => ({
  type: types.SET_PRODUCT_DATA,
  item,
});

export const AddToCart = (item: ShoppingItemProps): IAddToCartActionType => ({
  type: types.ADD_TO_CART,
  item,
});

export const AddToCartAsync = (
  item: ShoppingItemProps
): ThunkAction<void, RootState, null, IAddToCartActionType> => (dispatch) => {
  setTimeout(() => {
    dispatch(AddToCart(item));
  }, 3000);
};

export const IncreaseCart = (
  item: ShoppingItemProps
): IIncreaseCartActionType => ({
  type: types.INCREASE_CART,
  item,
});

export const DecreaseCart = (
  item: ShoppingItemProps
): IDecreaseCartActionType => ({
  type: types.DECREASE_CART,
  item,
});

export const DirectCheckout = (
  item: ShoppingItemProps
): IDirectCheckoutActionType => ({
  type: types.DIRECT_CHECKOUT,
  item,
});

export const Checkout = (item: CheckoutProps): ICheckoutActionType => ({
  type: types.CHECKOUT,
  item,
});

export const DeleteCart = (item: ShoppingItemProps): IDeleteCartActionType => ({
  type: types.DELETE_CART,
  item,
});
export const CartSelectProduct = (
  item: CartSelectProductProps
): ICartSelectProductActionType => ({
  type: types.CART_SELECT_PRODUCT,
  item,
});
export const CheckoutComplete = (): ICheckoutCompleteActionType => ({
  type: types.CHECKOUT_COMPLETE,
});

export type ShoppingAction =
  | ReturnType<typeof SetProductData>
  | ReturnType<typeof AddToCart>
  | ReturnType<typeof IncreaseCart>
  | ReturnType<typeof DecreaseCart>
  | ReturnType<typeof DirectCheckout>
  | ReturnType<typeof Checkout>
  | ReturnType<typeof DeleteCart>
  | ReturnType<typeof CartSelectProduct>
  | ReturnType<typeof CheckoutComplete>;
