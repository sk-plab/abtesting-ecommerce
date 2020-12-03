import React from 'react';
import { render, screen } from '../../test-utils';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import OrderPage from '../OrderPage';
import * as API from '../../api';
import { initialState } from '../../store/modules/cartItemSlice';
import { makeServer } from '../../server';

const server = makeServer();
server.logging = false;

it('renders without crashing', async () => {
  const products = await API.fetchItems();
  const cartProducts: CartProductType[] = products.slice(0, 1).map((e) => {
    return { ...e, chk: true, q: 1 };
  });
  const initialState_ = { ...initialState, checkout: cartProducts };
  const history = createMemoryHistory({ initialEntries: ['/order'] });

  render(
    <Router history={history}>
      <Route path="/order" component={OrderPage} />
    </Router>,
    {
      initialState: initialState_,
    }
  );

  //screen.debug();
  expect(screen.queryByText('주문이 성공적으로 완료되었습니다.')).toBeInTheDocument();
  expect(screen.queryAllByText(/애플 아이폰 12 5G 256GB 자급제/)[0]).toBeInTheDocument();
});
