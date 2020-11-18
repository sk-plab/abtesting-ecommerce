import React, { useContext } from 'react';
import { Waypoint } from 'react-waypoint';
import CartContainer from '../containers/CartContainer';
import { Context } from '../store/context';

const CartPage: React.FC = () => {
  const { abtestCtx } = useContext(Context);

  return (
    <React.Fragment>
      <Waypoint onEnter={() => abtestCtx.setExpKey('')} />

      <h2>장바구니</h2>
      <CartContainer />
    </React.Fragment>
  );
};

export default CartPage;
