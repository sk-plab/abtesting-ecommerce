import React from 'react';
import { NavLink } from 'react-router-dom';
import ABTest from '../libs/abtest';
import { Image, Nav, Navbar } from 'react-bootstrap';
import CartItemCount from './CartItemCount';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';

const CartWrapper = styled(Nav.Link)`
  position: relative;
  background-image: url(/images/sprite.png);
  background-position: -53px -198px;
  width: 48px;
  height: 48px;
  background-size: 363px 275px;
  overflow: hidden;
  display: block;
  line-height: 200px;
`;
const Header: React.FC = () => {
  const carts = useSelector((state: RootState) => state.cartItems.items);

  return (
    <Navbar fixed="top" bg="light">
      <Nav>
        <Navbar.Brand
          href="#"
          onClick={(e: React.MouseEvent) => {
            ABTest.debug();
            e.preventDefault();
          }}
        >
          <Image src="/images/logo.png" width="50" />
        </Navbar.Brand>
      </Nav>

      <Nav className="menu mr-auto">
        <Nav.Link as={NavLink} to="/">
          <strong>베스트</strong>
        </Nav.Link>
      </Nav>

      <Nav className="justify-content-end">
        <Nav.Item>
          <CartWrapper as={NavLink} to="/cart">
            장바구니
            <CartItemCount carts={carts} />
          </CartWrapper>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Header;
