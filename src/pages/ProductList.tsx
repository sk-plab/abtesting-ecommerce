// eslint-disable-next-line
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ProductList from '../components/ProductList';
import ABTest from '../libs/abtest';
import { RootState } from '../store/modules';

// abtesting init
ABTest.init();

// abtesting start
const expKey = 'ProductList';
const abtest = ABTest.start(expKey);

const ProductListPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.Shopping.products);

  return (
    <Wrapper data-abtest-area={expKey}>
      <h2>추천 상품</h2>
      <hr />
      <ProductList products={products} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ProductListPage;
