// eslint-disable-next-line
import React, { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import { Button, Table } from 'react-bootstrap';
import TotalAmount from '../components/ToalAmount';
import CartProduct from '../components/CartProduct';
import * as actions from '../actions';

const CartList: React.FC<ProductListType & RouteComponentProps> = ({
  history,
}) => {
  const dispatch = useDispatch();
  const onCheckout = (id: number) => {
    dispatch(actions.Checkout({ id }));
    history.push('/order');
  };
  const onCheckoutAll = () => {
    dispatch(actions.Checkout({}));
    history.push('/order');
  };
  const onDeleteCart = (id: number) => {
    dispatch(actions.DeleteCart({ id }));
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
      <TotalAmount products={products} />

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
        <td colSpan={5}>장바구니에 담겨진 상품이 없습니다.</td>
      </tr>
    </Fragment>
  );
}
export default withRouter(CartList);
