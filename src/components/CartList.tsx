// eslint-disable-next-line
import React, { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import { Button, Table } from 'react-bootstrap';
import TotalAmount from '../components/ToalAmount';
import CartProduct from '../components/CartProduct';
import * as actions from '../actions';
import Noty from 'noty';

const CartList: React.FC<ProductListType & RouteComponentProps> = ({
  history,
}) => {
  const dispatch = useDispatch();
  const onCheckout = (id: number) => {
    dispatch(actions.Checkout({ id }));
    history.push('/checkout');
  };
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
  const onDeleteCart = (id: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(actions.DeleteCart({ id }));
    }
  };

  const products = useSelector((state: RootState) => state.Shopping.cart);

  return (
    <Fragment>
      <Table hover>
        <thead>
          <tr>
            <th>선택</th>
            <th colSpan={2}>상품정보</th>
            <th>수량</th>
            <th>주문금액</th>
            <th>선택</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <CartProduct
              key={product.id}
              product={product}
              onCheckout={onCheckout}
              onDeleteCart={onDeleteCart}
            />
          ))}
          {!products.length && <NotFound />}
        </tbody>
      </Table>

      <hr />
      <h4>
        Total: <TotalAmount products={products} />
      </h4>

      {products.length > 0 && (
        <Button size="lg" block onClick={onCheckoutAll}>
          Proceed to Checkout
        </Button>
      )}
    </Fragment>
  );
};
function NotFound() {
  return (
    <Fragment>
      <tr>
        <td colSpan={6}>장바구니에 담겨진 상품이 없습니다.</td>
      </tr>
    </Fragment>
  );
}
export default withRouter(CartList);
