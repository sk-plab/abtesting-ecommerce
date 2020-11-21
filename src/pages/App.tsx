import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import {
  Context,
  GLOBAL_MEDIA_QUERIES,
  IContext,
  GuideLayout,
  NotGuideLayout,
} from '../store/context';
import { Col, Container, Row } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { ProductListPage, ProductViewPage, CartPage, OrderPage, CheckoutPage } from '../pages';
import GuideContainer from '../containers/GuideContainer';
import { useMedia } from 'react-media';

import { useProducts } from '../hooks/useProductService';

const App: React.FC = () => {
  // get products
  // products settings
  const { payload } = useProducts();
  const products = payload;

  // context settings
  const [expKey, setExpKey] = useState('');
  const defaultValue: IContext = { abtestCtx: { expKey, setExpKey } };

  // layout settings
  const matches = useMedia({ queries: GLOBAL_MEDIA_QUERIES });
  const layout = matches.small ? NotGuideLayout() : GuideLayout;

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    return history.listen((location) =>
      console.log(`You chanaged the page to: ${location.pathname}`)
    );
  }, [history]);

  return (
    <Context.Provider value={defaultValue}>
      <Container fluid>
        <Row>
          <Col {...layout}>
            <TransitionGroup>
              <CSSTransition key={location.pathname} timeout={300} classNames="page">
                <Switch location={location}>
                  <Route path="/" exact>
                    <ProductListPage products={products} />
                  </Route>
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

      <GuideContainer />
    </Context.Provider>
  );
};

export default App;
