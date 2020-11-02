// eslint-disable-next-line
import React from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import ABTest from '../libs/abtest';
import { Nav, Navbar } from 'react-bootstrap';
import CartItemCount from './CartItemCount';

const Header: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Navbar
      fixed="top"
      bg="light"
      style={{ borderBottom: '1px solid #d9d9d9' }}
    >
      <Nav activeKey={location.pathname} style={{ fontSize: 15 }}>
        <Nav.Link as={NavLink} to="/">
          Home
        </Nav.Link>

        <Nav.Link as={NavLink} to="/cart">
          장바구니 <CartItemCount />
        </Nav.Link>
      </Nav>

      <Nav.Item>
        <Nav.Link href="#" onClick={ABTest.debug} style={{ fontSize: 15 }}>
          A/B Testing 현황판
        </Nav.Link>
      </Nav.Item>
    </Navbar>
  );
};

export default withRouter(Header);
