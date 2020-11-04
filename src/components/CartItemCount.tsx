import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import styled from 'styled-components';
import { Badge } from 'react-bootstrap';

const Wrapper = styled(Badge)``;
const CartItemCount: React.FC<Record<string, unknown>> = (props) => {
  const carts = useSelector((state: RootState) => state.Shopping.cart);

  return (
    <Wrapper {...props} pill variant="danger">
      {carts.length}
    </Wrapper>
  );
};

export default React.memo(CartItemCount);
