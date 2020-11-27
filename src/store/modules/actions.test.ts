import items from '../../api/mockItems.json';
import * as actions from './actions';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as api from '../../api';
import { ShoppingState } from './shopping';
import { ActionType, ShoppingAction } from './actions';
import API from 'API';

type DispatchExts = ThunkDispatch<ShoppingState, API, ShoppingAction>;
const middlewares = [thunk.withExtraArgument<API>(api)];
const mockStore = configureMockStore<ShoppingState, DispatchExts>(middlewares);
const store = mockStore();

describe('Shopping Action Creators', () => {
  it('ADD_ITEM', async () => {
    const products: ProductType[] = items.data;
    const product = products[0];

    await store.dispatch(actions.addItem(product));

    expect(store.getActions()[0]).toEqual({
      type: 'ADD_ITEM',
      payload: product,
    });

    store.clearActions();
  });

  it('CHECKOUT_SINGLE_ITEM', async () => {
    const products: ProductType[] = items.data;
    const product = products[0];

    await store.dispatch(actions.checkoutSingleItem(product));

    expect(store.getActions()[0]).toEqual({
      type: 'CHECKOUT_SINGLE_ITEM',
      payload: product,
    });

    store.clearActions();
  });

  it('INCREASE_ITEM', () => {
    expect(actions.increaseItem(1)).toEqual({
      type: 'INCREASE_ITEM',
      payload: 1,
    });
  });

  it('DECREASE_ITEM', () => {
    expect(actions.decreaseItem(1)).toEqual({
      type: 'DECREASE_ITEM',
      payload: 1,
    });
  });

  it('REMOVE_ITEM', () => {
    expect(actions.removeItem(1)).toEqual({
      type: 'REMOVE_ITEM',
      payload: 1,
    });
  });

  it('SELECT_CHECKOUT_ITEM', () => {
    expect(actions.selectCheckoutItem(1)).toEqual({
      type: 'SELECT_CHECKOUT_ITEM',
      payload: 1,
    });
  });

  it('CHECKOUT_ITEMS', () => {
    expect(actions.checkoutItems()).toEqual({
      type: 'CHECKOUT_ITEMS',
    });
  });

  it('CHECKOUT_COMPLETE', () => {
    expect(actions.checkoutComplete()).toEqual({
      type: 'CHECKOUT_COMPLETE',
    });
  });

  it('asynchronously dispatches SUCCESS', async () => {
    const store = mockStore(/* initial state */);
    const success = { type: ActionType.CHECKOUT_ITEMS };

    const func = (): ThunkAction<void, ShoppingState, API, ShoppingAction> => async (dispatch) => {
      dispatch(success);
    };

    store.dispatch(func());

    await store.dispatch(async (dispatch) => {
      dispatch(success);
    });

    expect(store.getActions()[0]).toBe(success);
  });
});
