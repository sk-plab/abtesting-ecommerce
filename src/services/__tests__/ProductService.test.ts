import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProductService } from '../ProductService';

test('get product data', () => {
  const products = ProductService();

  expect(products.length).toBe(10);
});
