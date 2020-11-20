import React from 'react';
import { render, screen } from '../../test-utils';

import { BrowserRouter as Router } from 'react-router-dom';
import Cartpage from '../CartPage';
import { ProductService } from '../../services/ProductService';
import { initialState } from '../../store/modules/shopping';

it('renders without crashing', async () => {
  const products = ProductService();
  const initialState_ = { ...initialState, cart: products };

  render(
    <Router>
      <Cartpage />
    </Router>,
    {
      initialState: initialState_,
    }
  );

  //screen.debug();
  expect(screen.queryByText('장바구니')).toBeInTheDocument();
  expect(screen.queryAllByText(/애플 아이폰 12 5G 256GB 자급제/)[0]).toBeInTheDocument();
});
