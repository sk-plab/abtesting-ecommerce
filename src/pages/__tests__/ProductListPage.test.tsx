import React from 'react';
import { render, screen } from '../../test-utils';
import { createMemoryHistory } from 'history';
import ProductListPage from '../ProductListPage';
import ProductViewPage from '../ProductViewPage';
import * as API from '../../api';
import { Router, Route } from 'react-router-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { initialState } from '../../store/modules/cartItemSlice';
import { makeServer } from '../../server';

const server = makeServer();
server.logging = false;

beforeEach(async () => {
  const route = '/';
  const history = createMemoryHistory({ initialEntries: [route] });

  const products = await API.fetchItems();
  const initialState_ = { ...initialState, products };

  render(
    <Router history={history}>
      <Route path="/" exact>
        <ProductListPage />
      </Route>
      <Route path="/view/:id">
        <ProductViewPage />
      </Route>
    </Router>,
    {
      initialState: initialState_,
    }
  );
});

test('renders without crashing', async () => {
  await waitFor(() => {
    expect(screen.queryByText('추천 상품')).toBeInTheDocument();
    expect(screen.queryAllByText(/애플 아이폰 12 5G 256GB 자급제/)[0]).toBeInTheDocument();
  });
});

test('상품 클릭후 상세 페이지 이동해야 한다.', async () => {
  await waitFor(() => {
    const target = screen.queryAllByText(/애플 아이폰 12 5G 256GB 자급제/)[0];
    fireEvent.click(target);

    expect(screen.getByText(/구매/)).toBeInTheDocument();
  });
});
