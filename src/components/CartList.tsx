// eslint-disable-next-line
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import CartProduct from '../components/CartProduct';
import * as actions from '../actions';

const CartList: React.FC<ProductListType> = ({ products }) => {
  const dispatch = useDispatch();

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
export default CartList;
