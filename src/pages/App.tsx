import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import {
  Context,
  GLOBAL_MEDIA_QUERIES,
  IContext,
  GuideLayout,
  NotGuideLayout,
} from '../store/context';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';

import * as actions from '../actions';
import { ProductData } from '../api/Product';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { RootState } from '../store/modules';

import { ProductListPage, ProductViewPage, CartPage, OrderPage, CheckoutPage } from '../pages';
import GuideContainer from '../containers/GuideContainer';
import { useMedia } from 'react-media';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const products = useSelector((state: RootState) => state.Shopping.products);
  const dispatch = useDispatch();

  const [expKey, setExpKey] = useState('');
  const matches = useMedia({ queries: GLOBAL_MEDIA_QUERIES });
  const defaultValue: IContext = { abtestCtx: { expKey, setExpKey }, matches };

  useEffect(() => {
    const fetchProductData = async () => {
      const products = await ProductData();

      dispatch(actions.SetProductData({ products }));
    };

    fetchProductData();
  }, [dispatch]);

  let layout = GuideLayout;
  if (matches.small) {
    layout = NotGuideLayout();
  }

  if (!products.length) return null;

  return (
    <Context.Provider value={defaultValue}>
      <Container fluid>
        <Row>
          <Col {...layout}>
            <TransitionGroup>
              <CSSTransition key={location.pathname} timeout={300} classNames="page">
                <Switch location={location}>
                  <Route
                    path="/"
                    exact
                    render={() => <ProductListPage products={products} />}
                  ></Route>
                  <Route path="/view/:id" component={ProductViewPage} />
                  <Route path="/cart" component={CartPage} />
                  <Route path="/checkout" component={CheckoutPage} />
                  <Route path="/order" component={OrderPage} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </Col>
        </Row>
      </Container>

      {!matches.small && <GuideContainer />}
    </Context.Provider>
  );
};

export default withRouter(App);
