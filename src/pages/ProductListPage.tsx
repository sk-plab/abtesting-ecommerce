import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Product from '../components/Product';
import { Col, Row, Container } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import ABTest from '../libs/abtest';
import { Waypoint } from 'react-waypoint';
import { Context, GLOBAL_MEDIA_QUERIES } from '../store/context';
import MarkingABTest from '../components/MarkingABTest';
import { useMedia } from 'react-media';

const ProductListPage: React.FC<ProductListType> = ({ products }) => {
  const history = useHistory();
  const { abtestCtx } = useContext(Context);
  const matches = useMedia({ queries: GLOBAL_MEDIA_QUERIES });

  const onClickProduct = useCallback(
    (id: number) => {
      history.push(`/view/${id}`);

      // abtesting event track
      ABTest.track('ProductList.product_click');
    },
    [history]
  );

  // a/b testing init.
  ABTest.init();

  // abtesting start
  const expKey = 'ProductList';
  const abtest = ABTest.start(expKey);
  abtestCtx.variation = abtest.variation;

  // config grid layout
  const columnCount = 4;

  const productsMap = chunkArray(products, columnCount).map((e, index) => (
    <Row key={index}>
      {e.map((product) => {
        return (
          <Col key={product.id} xs={12} sm={6} md={12 / columnCount}>
            <Product product={product} onClickProduct={onClickProduct} />
          </Col>
        );
      })}
    </Row>
  ));

  return (
    <Container fluid>
      <MarkingABTest expKey={expKey} variation={abtest.variation}>
        <h2>추천 상품</h2>
        <Waypoint
          onEnter={() => abtestCtx.setExpKey(expKey)}
          onLeave={() => abtestCtx.setExpKey('')}
        />

        {!abtest.variables.enableFeature ? (
          productsMap
        ) : (
          <Swiper slidesPerView={matches.small ? 2 : 3}>
            {products.map((product) => (
              <div key={product.id}>
                <Product key={product.id} product={product} onClickProduct={onClickProduct} />
              </div>
            ))}
          </Swiper>
        )}
      </MarkingABTest>

      <div style={{ padding: '50px 0' }}>
        <h2>MD 추천 상품</h2>

        <Swiper slidesPerView={matches.small ? 2 : 3}>
          {products.map((product) => (
            <div key={product.id}>
              <Product key={product.id} product={product} onClickProduct={onClickProduct} />
            </div>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default ProductListPage;

function chunkArray(myArray: Array<ProductType>, chunk_size: number) {
  let index = 0;
  const arrayLength = myArray.length;
  const tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    const myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }

  return tempArray;
}
