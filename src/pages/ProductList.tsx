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

  const columnCount = 3;
  const chunkArray = (myArray: Array<ProductType>, chunk_size = 3) => {
    let index = 0;
    const arrayLength = myArray.length;
    const tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      const myChunk = myArray.slice(index, index + chunk_size);
      tempArray.push(myChunk);
    }

    return tempArray;
  };

  const productsMap = chunkArray(products).map((e, index) => {
    return (
      <Row key={index}>
        {e.map((product) => {
          return (
            <Col key={product.id} xs={12 / columnCount}>
              <Product product={product} onClickProduct={onClickProduct} />
            </Col>
          );
        })}
      </Row>
    );
  }, columnCount);

  return (
    <div data-abtest-area={expKey}>
      <h2>추천 상품</h2>
      <hr />

      <div data-abtest-area={expKey}>
        {!abtest.variables.enableFeature ? (
          productsMap
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
