import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import { Table, Button } from 'react-bootstrap';
import CartProduct from '../components/CartProduct';
import TotalAmount from '../components/TotalAmount';
import useShoppingCart from '../hooks/useShoppingCart';

const CartContainer: React.FC = () => {
  const products = useSelector((state: RootState) => state.Shopping.cart);

  const { redirectToCheckout } = useShoppingCart();

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
            <CartProduct key={product.id} product={product} />
          ))}
          {!products.length && <NotFound />}
        </tbody>
      </Table>
      <hr />
      <h4>
        Total: <TotalAmount products={products} />
      </h4>

      {products.length > 0 && (
        <Button size="lg" block onClick={redirectToCheckout}>
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
export default CartContainer;
