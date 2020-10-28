// eslint-disable-next-line
import React from 'react';
import { StaticContext } from 'react-router';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';

import ABTest from '../libs/abtest';
import { Nav, Navbar } from 'react-bootstrap';

type Location = {
  pathname: string;
};
type LocationState = {
  location: Location;
};
const Header: React.FC<RouteComponentProps<Record<string, string>, StaticContext, LocationState>> = ({ location }) => {
  return (
    <Navbar fixed="top" bg="">
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
          A/B debug
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
