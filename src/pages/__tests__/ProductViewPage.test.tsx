import React from 'react';
import { render, screen, waitFor } from '../../test-utils';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ProductViewPage from '../ProductViewPage';
import CheckoutPage from '../CheckoutPage';
import { ProductService } from '../../services/ProductService';
import { initialState } from '../../store/modules/shopping';
import { fireEvent } from '@testing-library/react';

describe('ProductViewPage', () => {
  beforeEach(async () => {
    const route = '/view/0';
    const history = createMemoryHistory({ initialEntries: [route] });
    const products = await ProductService();
    const initialState_ = { ...initialState, products };

    render(
      <Router history={history}>
        <Route path="/view/:id" component={ProductViewPage} />
        <Route path="/checkout" component={CheckoutPage} />
      </Router>,
      {
        initialState: initialState_,
      }
    );
  });

  test('상품 상세 페이지가 이상없이 보여야 한다.', async () => {
    expect(screen.queryAllByText(/애플 아이폰 12 5G 256GB 자급제/)[0]).toBeInTheDocument();
  });

  test('장바구니 버튼 클릭하면 모달창이 보여야 한다.', async () => {
    const cartButton = screen.getAllByRole('button');
    fireEvent.click(cartButton[0]);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('장바구니')).toBeInTheDocument();
    });
  });

  test('구매하기 버튼 클릭시 체크아웃 페이지로 이동해야 한다.', async () => {
    const target = screen.getByText(/구매/);
    fireEvent.click(target);

    await waitFor(() => {
      expect(screen.getByText('주문결제')).toBeInTheDocument();
    });
  });
});
