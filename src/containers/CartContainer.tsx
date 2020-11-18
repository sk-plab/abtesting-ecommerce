import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../store/modules';
import * as actions from '../actions';
import { Table, Button } from 'react-bootstrap';
import CartProduct from '../components/CartProduct';
import TotalAmount from '../components/TotalAmount';
import Noty from 'noty';

const CartContainer: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.Shopping.cart);

  const onCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const dataId = target.getAttribute('data-id');
      if (dataId) {
        const id = parseInt(dataId, 10);
        dispatch(actions.CartSelectProduct({ id, chk: target.checked }));
      }
    },
    [dispatch]
  );

  const onIncrease = useCallback(
    (id) => {
      dispatch(actions.IncreaseCart({ id }));
    },
    [dispatch]
  );

  const onDecrease = useCallback(
    (id) => {
      dispatch(actions.DecreaseCart({ id }));
    },
    [dispatch]
  );

  const onDeleteCart = useCallback(
    (id: number) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        dispatch(actions.DeleteCart({ id }));
      }
    },
    [dispatch]
  );
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
      <Table hover responsive>
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
              onCheck={onCheck}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
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
    </React.Fragment>
  );
};
function NotFound() {
  return (
    <React.Fragment>
      <tr>
        <td colSpan={6}>장바구니에 담겨진 상품이 없습니다.</td>
      </tr>
    </React.Fragment>
  );
}
export default withRouter(CartContainer);
