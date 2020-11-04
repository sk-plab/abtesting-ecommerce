import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Image } from 'react-bootstrap';
import { Header } from './styled/WithStyledCheckout';

const CheckoutProduct: React.FC<ProductListType> = ({ products }) => {
  return (
    <React.Fragment>
      <Header>주문상품</Header>
      <p>상품수량 및 옵션변경은 상품상세 또는 장바구니에서 가능합니다.</p>
      <Table hover>
        <thead>
          <tr>
            <th colSpan={2}>상품정보</th>
            <th>수량</th>
            <th>주문금액</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

function Product({ product }: { product: ProductType }) {
  return (
    <React.Fragment>
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
        <td>
          <b>{product.q}</b>
        </td>
        <td>
          <b>${product.price * product.q}</b>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default React.memo(CheckoutProduct);
