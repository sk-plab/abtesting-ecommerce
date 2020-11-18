import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled(Badge)`
  font-size: 13px;
  position: absolute !important;
  right: 0px;
  top: 2px;
`;
interface IProps {
  carts: ProductType[];
}
const CartItemCount: React.FC<IProps> = ({ carts = [] }) => (
  <Wrapper pill variant="danger">
    {carts.length}
  </Wrapper>
);

export default React.memo(CartItemCount);
