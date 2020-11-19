import React from 'react';
import { render, screen } from '../../test-utils';

import ProductListPage from '../ProductListPage';
import { ProductService } from '../../services/ProductService';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', async () => {
  const products = ProductService();

  render(
    <Router>
      <ProductListPage products={products} />
    </Router>
  );
  //screen.debug();

  expect(screen.queryByText('추천 상품')).toBeInTheDocument();
  expect(screen.queryAllByText(/애플 아이폰 12 5G 256GB 자급제/)[0]).toBeInTheDocument();
});
