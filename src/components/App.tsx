// eslint-disable-next-line
import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import { ProductList, ProductView, Cart, Order, Checkout } from '../pages';
import { Container } from 'react-bootstrap';

import * as actions from '../actions';
import { ProductData } from '../api/Product';

import { GlobalStyle, View } from './styled/WithStyledApp';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { RootState } from '../store/modules';
import ScrollToTop from '../hooks/ScrollToTop';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const products = useSelector((state: RootState) => state.Shopping.products);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      const products = await ProductData();

      dispatch(actions.SetProductData({ products }));
    };

    fetchProductData();
  }, [dispatch]);

  if (products.length === 0) return null;

  return (
    <View>
      <GlobalStyle />
      <Header />

      <Container fluid>
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            timeout={300}
            classNames="page"
          >
            <Switch location={location}>
              <Route path="/" exact>
                <ProductList products={products} />
              </Route>
              <Route path="/view/:id" component={ProductView} exact />
              <Route path="/cart" component={Cart} exact />
              <Route path="/checkout" component={Checkout} exact />
              <Route path="/order" component={Order} exact />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Container>

      <Footer />
      <ScrollToTop />
    </View>
  );
};

export default withRouter(App);
