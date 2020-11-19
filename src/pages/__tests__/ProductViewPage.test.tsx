import React from 'react';
import { render, renderWithRouterMatch, screen } from '../../test-utils';

import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ProductViewPage from '../ProductViewPage';
import { ProductService } from '../../services/ProductService';

it('renders without crashing', async () => {
  const route = '/view/0';
  const history = createMemoryHistory({ initialEntries: [route] });
  const products = ProductService();

  // render(
  //   <Router history={history}>
  //     <Route path="/view/:id" component={ProductViewPage} />
  //   </Router>,
  //   {
  //     initialState: {
  //       products,
  //       cart: [],
  //       ordered: [],
  //     },
  //   }
  // );
  render(renderWithRouterMatch(<ProductViewPage />), {
    initialState: {
      products,
      cart: [],
      ordered: [],
    },
  });

  //screen.debug();
  expect(screen.queryAllByText(/애플 아이폰 12 5G 256GB 자급제/)[0]).toBeInTheDocument();
});
