import React from 'react';
import { render, screen } from '../../test-utils';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import OrderPage from '../OrderPage';
import { ProductService } from '../../services/ProductService';
import { initialState } from '../../store/modules/shopping';

it('renders without crashing', async () => {
  const products = await ProductService();
  const initialState_ = { ...initialState, ordered: products };
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
