import React from 'react';
import { render, screen } from '@testing-library/react';

import Product from '../Product';

it('renders without crashing', () => {
  const product = {
    id: 2,
    name: '애플 아이폰 12 5G 256GB 자급제',
    color: 'Forest Green',
    category: '핸드폰',
    price: 1600,
    imageUrl: 'item_3.jpg',
    q: 1,
    chk: true,
  };

  const onClickProduct = jest.fn();
  render(<Product product={product} onClickProduct={onClickProduct} />);

  expect(screen.getByText(/애플 아이폰 12 5G 256GB 자급제/)).toBeInTheDocument();
});
