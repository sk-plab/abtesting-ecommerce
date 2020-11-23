import React from 'react';
import { Container } from 'react-bootstrap';
import CartContainer from '../containers/CartContainer';

const CartPage: React.FC = () => {
  return (
    <Container fluid>
      <h2>장바구니</h2>
      <CartContainer />
    </Container>
  );
};

export default CartPage;
