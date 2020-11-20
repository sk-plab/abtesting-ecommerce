import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import {
  Context,
  GLOBAL_MEDIA_QUERIES,
  IContext,
  GuideLayout,
  NotGuideLayout,
} from '../store/context';

import * as actions from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { productsSelector } from '../store/modules';

import { ProductListPage, ProductViewPage, CartPage, OrderPage, CheckoutPage } from '../pages';
import GuideContainer from '../containers/GuideContainer';
import { useMedia } from 'react-media';

import { ProductService } from '../services/ProductService';

const App: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  // get products
  const products = useSelector(productsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    // products settings
    const products = ProductService();
    dispatch(actions.SetProductData({ products }));

    return history.listen((location) =>
      console.log(`You chanaged the page to: ${location.pathname}`)
    );
  }, [history, dispatch]);

  // context settings
  const [expKey, setExpKey] = useState('');
  const defaultValue: IContext = { abtestCtx: { expKey, setExpKey } };

  // layout settings
  const matches = useMedia({ queries: GLOBAL_MEDIA_QUERIES });
  const layout = matches.small ? NotGuideLayout() : GuideLayout;

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
