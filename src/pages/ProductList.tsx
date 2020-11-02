// eslint-disable-next-line
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Product from '../components/Product';
import { Col, Row } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import ABTest from '../libs/abtest';

// a/b testing init.
ABTest.init();

// abtesting start
const expKey = 'ProductList';
const abtest = ABTest.start(expKey);

// config grid layout
const columnCount = 4;
const swiperParams = {
  slidesPerView: 2,
  spaceBetween: 30,
  centeredSlides: true,
  grabCursor: true,
};

const ProductListPage: React.FC<ProductListType & RouteComponentProps> = ({
  products,
  history,
}) => {
  const onClickProduct = (id: number) => {
    history.push(`/view/${id}`);

    // abtesting event track
    ABTest.track('ProductList.product_click');
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
  });

  return (
    <div>
      <div data-abtest-area={expKey}>
        <h2>추천 상품</h2>
        <hr />

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

      <div>
        <h2>MD 추천 상품</h2>
        <hr />

        <Swiper {...swiperParams} slidesPerView={3} centeredSlides={false}>
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
      </div>
    </div>
  );
};

export default withRouter(ProductListPage);

function chunkArray(myArray: Array<ProductType>, chunk_size = columnCount) {
  let index = 0;
  const arrayLength = myArray.length;
  const tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    const myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }

  return tempArray;
}
