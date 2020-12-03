import React from 'react';
import { render, screen } from '../../test-utils';
import { Router, Route } from 'react-router-dom';
import Cartpage from '../CartPage';
import { createMemoryHistory } from 'history';
import * as API from '../../api';
import { initialState as iState, itemState } from '../../store/modules/cartItemSlice';
import { fireEvent, waitFor } from '@testing-library/react';
import CheckoutPage from '../CheckoutPage';
import { makeServer } from '../../server';

const server = makeServer();
server.logging = false;

describe('CartPage', () => {
  let products: ProductType[];
  let product: ProductType;

  beforeAll(async () => {
    products = await API.fetchItems();
    product = products[0];

    await API.addItem(product);
  });

  beforeEach(async () => {
    const route = '/cart';
    const history = createMemoryHistory({ initialEntries: [route] });
    const cartProducts: CartProductType[] = products.slice(0, 1).map((e) => {
      return { ...e, chk: true, q: 1 };
    });
    const initialState: itemState = {
      ...iState,
      items: cartProducts,
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
  it('수량 증가', async () => {
    expect(screen.getByText('1600')).toBeInTheDocument();

    fireEvent.click(screen.getByText('+'));

    await waitFor(() => {
      expect(screen.getByText(`${1600 * 2}`)).toBeInTheDocument();
    });
  });
  it('수량 증가 & 감소', async () => {
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('-'));

    await waitFor(() => {
      expect(screen.getByText(`${1600}`)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('-'));

    await waitFor(() => {
      expect(screen.getByText(`${1600}`)).toBeInTheDocument();
    });
  });
  it('장바구니 상품 삭제', async () => {
    window.confirm = jest.fn(() => true); // always click 'yes'

    const target = document.querySelector('svg')?.parentNode as HTMLElement;

    fireEvent.click(target);

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });
  it('체크아웃 페이지 이동', async () => {
    fireEvent.click(screen.getByText(/Proceed to Checkout/));

    await waitFor(() => {
      expect(screen.getByText('주문결제')).toBeInTheDocument();
    });
  });
});
