// eslint-disable-next-line
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../store/modules';
import { useSelector } from 'react-redux';
import Product from '../components/Product';
import { Col, Row } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import ABTest from '../libs/abtest';

// a/b testing init.
ABTest.init();

// abtesting start
const expKey = 'ProductList';
const abtest = ABTest.start(expKey);
const swiperParams = {
  slidesPerView: 2,
  spaceBetween: 10,
};
const ProductListPage: React.FC<RouteComponentProps> = ({ history }) => {
  const products = useSelector((state: RootState) => state.Shopping.products);

  const onClickProduct = (id: number) => {
    history.push(`/view/${id}`);

    // abtesting event track
    ABTest.track('ProductList.product_click');
  };

  return (
    <div data-abtest-area={expKey}>
      <h2>추천 상품</h2>
      <hr />

      <div data-abtest-area={expKey}>
        {!abtest.variables.enableFeature ? (
          <Row>
            {products.map((product) => {
              return (
                <Col key={product.id}>
                  <Product product={product} onClickProduct={onClickProduct} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <Swiper {...swiperParams}>
            {products.map((product) => (
              <div key={product.id}>
                <Product
                  key={product.id}
                  product={product}
                  onClickProduct={onClickProduct}
                />
              </div>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
