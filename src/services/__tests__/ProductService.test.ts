import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProductService } from '../ProductService';

test('get product data', async () => {
  const products = await ProductService();

  expect(products.length).toBe(10);
});
