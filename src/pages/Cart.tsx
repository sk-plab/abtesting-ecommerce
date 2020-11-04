// eslint-disable-next-line
import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartList from '../components/CartList';
import { RootState } from '../store/modules';
import * as actions from '../actions';

import { Button } from 'react-bootstrap';
import TotalAmount from '../components/ToalAmount';
import Noty from 'noty';

const CartPage: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.Shopping.cart);

  const onCheckoutAll = () => {
    const _products = products.filter((e) => e.chk);
    if (_products.length > 0) {
      dispatch(actions.Checkout({}));
      history.push('/checkout');
    } else {
      new Noty({
        type: 'error',
        text: `선택한 장바구니 상품이 없습니다.`,
        timeout: 3000,
      }).show();
    }
  };

  return (
    <React.Fragment>
      <h2>장바구니</h2>
      <CartList products={products} />

      <hr />
      <h4>
        Total: <TotalAmount products={products} />
      </h4>

      {products.length > 0 && (
        <Button size="lg" block onClick={onCheckoutAll}>
          Proceed to Checkout
        </Button>
      )}
    </React.Fragment>
  );
};

export default withRouter(CartPage);
