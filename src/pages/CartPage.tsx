import React from 'react';
import CartContainer from '../containers/CartContainer';

const CartPage: React.FC = () => {
  return (
    <React.Fragment>
      <h2>장바구니</h2>
      <CartContainer />
    </React.Fragment>
  );
};

export default CartPage;
