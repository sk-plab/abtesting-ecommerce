import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Product from '../components/Product';
import { Col, Row, Container } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import ABTest from '../libs/abtest';
import { GLOBAL_MEDIA_QUERIES } from '../store/context';
import MarkingABTest from '../components/MarkingABTest';
import { useMedia } from 'react-media';
import { fetchItems } from '../api';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';

// a/b testing init.
ABTest.init();

const ProductListPage: React.FC = () => {
  // abtesting start
  const expKey = 'ProductList';
  const abtest = ABTest.start(expKey);

  const history = useHistory();
  const matches = useMedia({ queries: GLOBAL_MEDIA_QUERIES });

  const onClickProduct = useCallback(
    (id: number) => {
      history.push(`/view/${id}`);

      // abtesting event track
      ABTest.track('ProductList.product_click');
    },
    [history]
  );

  const { data } = useSWR('/api/items', () => fetchItems());

  if (!data)
    return (
      <Container fluid>
        <Skeleton height={260} />
        <Skeleton height={24} style={{ marginTop: 22 }} />
        <Skeleton height={20} style={{ marginTop: 10, marginBottom: 22 }} />
      </Container>
    );

  const products = data;

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
