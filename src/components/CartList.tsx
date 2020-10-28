// eslint-disable-next-line
import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Table, Button, Image } from 'react-bootstrap';
import * as actions from '../actions';

const CartList: React.FC<ProductListType & RouteComponentProps> = ({
  products,
  history,
}) => {
  const dispatch = useDispatch();
  const onCheckout = (id: number) => {
    dispatch(actions.Checkout({ id }));
    history.push('/order');
  };
  const onDeleteCart = (id: number) => {
    dispatch(actions.DeleteCart({ id }));
  };

  return (
    <Table hover>
      <thead>
        <tr>
          <th colSpan={2}>상품정보</th>
          <th>수량</th>
          <th>주문금액</th>
          <th>선택</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 && <NotFound />}

        {products.map((product) => (
          <CartProduct
            key={product.id}
            product={product}
            onCheckout={onCheckout}
            onDeleteCart={onDeleteCart}
          />
        ))}
      </tbody>
    </Table>
  );
};

interface CartProductProps {
  product: ProductType;
  onCheckout: (id: number) => void;
  onDeleteCart: (id: number) => void;
}
const CartProduct: React.FC<CartProductProps> = ({
  product,
  onCheckout,
  onDeleteCart,
}) => {
  return (
    <React.Fragment key={product.id}>
      <tr>
        <td>
          <Link to={`/view/${product.id}`}>
            <Image
              src={`../images/${product.imageUrl}`}
              width="100"
              height="100"
              alt=""
            />
          </Link>
        </td>

        <td>
          {product.name} in {product.color}
        </td>

        <td>{product.q}</td>
        <td>
          <b>${product.price * product.q}</b>
        </td>
        <td>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onCheckout(product.id)}
          >
            주문
          </Button>{' '}
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => onDeleteCart(product.id)}
          >
            삭제
          </Button>
        </td>
      </tr>
    </React.Fragment>
  );
};

function NotFound() {
  return (
    <React.Fragment>
      <tr>
        <td colSpan={5}>not found</td>
      </tr>
    </React.Fragment>
  );
}
export default withRouter(CartList);
