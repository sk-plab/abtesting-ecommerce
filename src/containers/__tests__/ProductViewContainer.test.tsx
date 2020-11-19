import React from 'react';
import { render, screen } from '../../test-utils';

import ProductViewContainer from '../ProductViewContainer';
import { ProductService } from '../../services/ProductService';

it('renders without crashing', async () => {
  const id = 1;
  const products = ProductService();
  const product = products.filter((e) => e.id === id)[0];
  const addToCart = jest.fn();
  const onCheckout = jest.fn();

  render(<ProductViewContainer product={product} addToCart={addToCart} onCheckout={onCheckout} />);
  //screen.debug();

  expect(screen.queryByText('구매하기')).toBeInTheDocument();
  expect(screen.queryAllByText(/애플 아이폰 12 5G 256GB 자급제/)[0]).toBeInTheDocument();
});
