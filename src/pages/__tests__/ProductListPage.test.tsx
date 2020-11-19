import React from 'react';
import { render, screen } from '../../test-utils';

import ProductListPage from '../ProductListPage';
import { ProductService } from '../../services/ProductService';

it('renders without crashing', async () => {
  const products = ProductService();

  render(<ProductListPage products={products} />);
  //screen.debug();

  expect(screen.queryByText('추천 상품')).toBeInTheDocument();
  expect(screen.queryAllByText(/애플 아이폰 12 5G 256GB 자급제/)[0]).toBeInTheDocument();
});
