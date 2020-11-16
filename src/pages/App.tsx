// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { Context, GLOBAL_MEDIA_QUERIES } from '../store/context';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';

import * as actions from '../actions';
import { ProductData } from '../api/Product';

import { GlobalStyle, View } from '../components/styled/WithStyledApp';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { RootState } from '../store/modules';
import ScrollToTop from '../hooks/ScrollToTop';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { ProductListPage, ProductViewPage, CartPage, OrderPage, CheckoutPage } from '../pages';
import GuideContainer from '../containers/GuideContainer';
import { useMedia } from 'react-media';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const products = useSelector((state: RootState) => state.Shopping.products);

  const dispatch = useDispatch();

  const [context, setContext] = useState('');
  const matches = useMedia({ queries: GLOBAL_MEDIA_QUERIES });
  const defaultValue = { context, setContext, matches };

  useEffect(() => {
    const fetchProductData = async () => {
      const products = await ProductData();

      dispatch(actions.SetProductData({ products }));
    };

    fetchProductData();
  }, [dispatch]);

  if (products.length === 0) return null;

  const layout = {
    xs: 8,
    md: 8,
    lg: 8,
  };
  if (matches.small) {
    layout['xs'] = 12;
    layout['md'] = 12;
    layout['lg'] = 12;
  }

  return (
    <Context.Provider value={defaultValue}>
      <View>
        <GlobalStyle />
        <Header />

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

        <Footer />
        <ScrollToTop />

        {!matches.small && <GuideContainer />}
      </View>
    </Context.Provider>
  );
};

export default withRouter(App);
