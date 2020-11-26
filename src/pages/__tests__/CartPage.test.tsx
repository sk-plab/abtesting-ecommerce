import React from 'react';
import { render, screen } from '../../test-utils';
import { Router, Route } from 'react-router-dom';
import Cartpage from '../CartPage';
import { createMemoryHistory } from 'history';
import * as API from '../../api';
import { initialState as iState, ShoppingState } from '../../store/modules/shopping';
import { fireEvent, waitFor } from '@testing-library/react';
import CheckoutPage from '../CheckoutPage';

describe('CartPage', () => {
  beforeEach(async () => {
    const route = '/cart';
    const history = createMemoryHistory({ initialEntries: [route] });
    const products = await API.fetchItems();
    const cartProducts: CartProductType[] = products.slice(0, 1).map((e) => {
      return { ...e, chk: true, q: 1 };
    });
    const initialState: ShoppingState = {
      ...iState,
      cart: cartProducts,
    };

    render(
      <Router history={history}>
        <Route path="/cart" component={Cartpage} />
        <Route path="/checkout" component={CheckoutPage} />
      </Router>,
      {
        initialState,
      }
    );
  });
  it('renders without crashing', () => {
    expect(screen.queryByText('장바구니')).toBeInTheDocument();
    expect(screen.queryAllByText(/애플 아이폰 12 5G 256GB 자급제/)[0]).toBeInTheDocument();
    expect(screen.getByText('1600')).toBeInTheDocument();
  });
  it('수량 증가', () => {
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText(`${1600 * 2}`)).toBeInTheDocument();
  });
  it('수량 증가 & 감소', () => {
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('-'));
    expect(screen.getByText(`${1600}`)).toBeInTheDocument();

    fireEvent.click(screen.getByText('-'));
    expect(screen.getByText(`${1600}`)).toBeInTheDocument();
  });
  it('장바구니 상품 삭제', () => {
    window.confirm = jest.fn(() => true); // always click 'yes'

    const target = document.querySelector('svg')?.parentNode as HTMLElement;

    fireEvent.click(target);

    expect(screen.getByText('0')).toBeInTheDocument();
  });
  it('체크아웃 페이지 이동', async () => {
    fireEvent.click(screen.getByText(/Proceed to Checkout/));

    await waitFor(() => {
      //screen.debug();
      expect(screen.getByText('주문결제')).toBeInTheDocument();
    });
  });
});
