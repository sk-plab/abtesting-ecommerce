import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import styled from 'styled-components';
import { Badge } from 'react-bootstrap';

const Wrapper = styled(Badge)`
`;
const CartItemCount = () => {
  const carts = useSelector((state: RootState) => state.Shopping.cart);

  return <Wrapper pill variant="success">{carts.length}</Wrapper>;
};

export default CartItemCount;
