// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { StaticContext } from 'react-router';
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import { ProductList, ProductView, Cart, Order } from '../pages';
import { Container, Spinner } from 'react-bootstrap';

import * as actions from '../actions';
import { ProductData } from '../api/Product';

import '../styles.scss';
import { GlobalStyle, View } from './styled/WithStyledApp';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

type Location = {
  key: string;
};
type LocationState = {
  location: Location;
};

const App: React.FC<RouteComponentProps<
  Record<string, string>,
  StaticContext,
  LocationState
>> = ({ location }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
      await delay(1000);

      const products = await ProductData();

      dispatch(actions.SetProductData({ products }));
      setProducts(products);
    };

    fetchProductData();
  }, [dispatch]);

  return (
    <View>
      <GlobalStyle />
      <Header />

      <Container>
        {products.length === 0 ? (
          <Spinner animation="border" />
        ) : (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={{ enter: 200, exit: 0 }}
              classNames="fade"
            >
              <Switch location={location}>
                <Route path="/" component={ProductList} exact />
                <Route path="/view/:id" component={ProductView} exact />
                <Route path="/cart" component={Cart} exact />
                <Route path="/order" component={Order} exact />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      </Container>

      <Footer />
    </View>
  );
};

export default withRouter(App);
