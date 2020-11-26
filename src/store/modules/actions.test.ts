import items from '../../api/mockItems.json';
import * as actions from './actions';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as api from '../../api';
import { initialState } from './shopping';

const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureStore(middlewares);

// 데이터들을 받아올 가짜 스토어 만들기
const products: ProductType[] = items.data;

describe('Shopping Action Creators', () => {
  it('ADD_ITEM', async () => {
    const store = mockStore(initialState);
    const product = products[0];

    const a = actions.addItem(product);

    await store.dispatch<any>(a);

    expect(store.getActions()[0]).toEqual({
      type: 'ADD_ITEM',
      payload: product,
    });
  });

  it.skip('INCREASE_ITEM', () => {
    expect(actions.increaseItem(1)).toEqual({
      type: 'INCREASE_ITEM',
      payload: 1,
    });
  });

  it.skip('DECREASE_ITEM', () => {
    expect(actions.decreaseItem(1)).toEqual({
      type: 'DECREASE_ITEM',
      payload: 1,
    });
  });

  it.skip('REMOVE_ITEM', () => {
    expect(actions.removeItem(1)).toEqual({
      type: 'REMOVE_ITEM',
      payload: 1,
    });
  });

  it.skip('SELECT_CHECKOUT_ITEM', () => {
    expect(actions.selectCheckoutItem(1)).toEqual({
      type: 'SELECT_CHECKOUT_ITEM',
      payload: 1,
    });
  });

  it.skip('CHECKOUT_SINGLE_ITEM', () => {
    const product = products[0];
    expect(actions.checkoutSingleItem(product)).toEqual({
      type: 'CHECKOUT_SINGLE_ITEM',
      payload: 1,
    });
  });

  it.skip('CHECKOUT_ITEMS', () => {
    expect(actions.checkoutItems()).toEqual({
      type: 'CHECKOUT_ITEMS',
    });
  });

  it.skip('CHECKOUT_COMPLETE', () => {
    expect(actions.checkoutComplete()).toEqual({
      type: 'CHECKOUT_COMPLETE',
    });
  });
});
