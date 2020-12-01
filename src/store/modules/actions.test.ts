import items from '../../server/mockItems.json';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AppThunk, RootState } from '../../store';
import { actions } from './cartItemSlice';
import configureMockStore from 'redux-mock-store';
import { Action } from 'redux';

type DispatchExts = ThunkDispatch<RootState, unknown, Action<string>>;
const middlewares = [thunk];
const mockStore = configureMockStore<RootState, DispatchExts>(middlewares);
const store = mockStore();

describe('Shopping Action Creators', () => {
  it('addItem', async () => {
    const products: ProductType[] = items.data;
    const product = products[0];

    await store.dispatch(actions.addItem(product));

    expect(store.getActions()[0]).toEqual({
      type: 'cartItem/addItem',
      payload: product,
    });

    store.clearActions();
  });

  it('CHECKOUT_SINGLE_ITEM', async () => {
    const products: ProductType[] = items.data;
    const product = products[0];

    await store.dispatch(actions.checkoutSingleItem(product));

    expect(store.getActions()[0]).toEqual({
      type: 'cartItem/checkoutSingleItem',
      payload: product,
    });

    store.clearActions();
  });

  it('INCREASE_ITEM', () => {
    const product: ProductType = items.data[0];
    expect(actions.increaseItem(product)).toEqual({
      type: 'cartItem/increaseItem',
      payload: product,
    });
  });

  it('DECREASE_ITEM', () => {
    const product: ProductType = items.data[0];
    expect(actions.decreaseItem(product)).toEqual({
      type: 'cartItem/decreaseItem',
      payload: product,
    });
  });

  it('REMOVE_ITEM', () => {
    const product: ProductType = items.data[0];
    expect(actions.removeItem(product)).toEqual({
      type: 'cartItem/removeItem',
      payload: product,
    });
  });

  it('SELECT_CHECKOUT_ITEM', () => {
    expect(actions.selectCheckoutItem(1)).toEqual({
      type: 'cartItem/selectCheckoutItem',
      payload: 1,
    });
  });

  it('CHECKOUT_ITEMS', () => {
    expect(actions.checkoutItems()).toEqual({
      type: 'cartItem/checkoutItems',
    });
  });

  it('CHECKOUT_COMPLETE', () => {
    expect(actions.checkoutComplete()).toEqual({
      type: 'cartItem/checkoutComplete',
    });
  });

  it('asynchronously dispatches SUCCESS', async () => {
    const store = mockStore(/* initial state */);
    const success = { type: 'cartItem/checkoutComplete' };

    const func = (): AppThunk => async (dispatch) => {
      dispatch(success);
    };

    store.dispatch(func());

    await store.dispatch(async (dispatch) => {
      dispatch(success);
    });

    expect(store.getActions()[0]).toBe(success);
  });
});
