// eslint-disable-next-line
import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

import * as actions from '../actions';
import { ProductData } from '../api/Product';

import { GlobalStyle, View } from '../components/styled/WithStyledApp';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { RootState } from '../store/modules';
import ScrollToTop from '../hooks/ScrollToTop';

import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  ProductListPage,
  ProductViewPage,
  CartPage,
  OrderPage,
  CheckoutPage,
} from '../pages';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const products = useSelector((state: RootState) => state.Shopping.products);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      const products = await ProductData();

      //dispatch(actions.SetProductData({ products }));
      dispatch(actions.SetProductData(products));
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
                <ProductListPage products={products} />
              </Route>
              <Route path="/view/:id" component={ProductViewPage} />
              <Route path="/cart" component={CartPage} />
              <Route path="/checkout" component={CheckoutPage} />
              <Route path="/order" component={OrderPage} />
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
