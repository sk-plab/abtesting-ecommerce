// eslint-disable-next-line
import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartList from '../components/CartList';
import styled from 'styled-components';
import { RootState } from '../store/modules';

export const Wrapper = styled.div``;

const CartPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.Shopping.cart);

  return (
    <Wrapper>
      <h2>장바구니</h2>
      <hr />
      <CartList products={products} />
    </Wrapper>
  );
};

export default withRouter(CartPage);
