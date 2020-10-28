// eslint-disable-next-line
import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Product from './Product';
import ABTest from '../libs/abtest';
import { Row } from 'react-bootstrap';

// abtesting init
ABTest.init({
  datafile: window.plabDatafile,
});

interface Props {
  products: ProductType[];
}
const ProductList: React.FC<Props & RouteComponentProps> = ({
  products,
  history,
}) => {
  const onClickProduct = (id: number) => {
    history.push(`/view/${id}`);

    ABTest.track('ProductList.product_click');
  };

  if (products.length === 0) return <p>등록된 항목이 없습니다.</p>;

  return (
    <Row>
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          onClickProduct={onClickProduct}
        />
      ))}
    </Row>
  );
};

export default withRouter(ProductList);
