// eslint-disable-next-line
import React from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';

import ABTest from '../libs/abtest';
import { Nav, Navbar } from 'react-bootstrap';

const Header: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Navbar fixed="top">
      <Nav activeKey={location.pathname}>
        <Nav.Link as={NavLink} to="/">
          Home (상품 목록)
        </Nav.Link>

        <Nav.Link as={NavLink} to="/cart">
          장바구니
        </Nav.Link>
      </Nav>

      <Nav.Item>
        <Nav.Link href="#" onClick={ABTest.debug}>
          A/B Testing 현황판
        </Nav.Link>
      </Nav.Item>
    </Navbar>
  );
};

export default withRouter(Header);

/*
<Nav activeKey={location.pathname}>
        <Nav.Link href="/">상품 목록</Nav.Link>
        <Nav.Link href="/cart">장바구니</Nav.Link>
      </Nav>

*/
