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
import { ProductList, ProductView, Cart, Order } from '../pages';
import { Container } from 'react-bootstrap';

import * as actions from '../actions';
import { ProductData } from '../api/Product';

import '../styles.scss';
import { GlobalStyle, View } from './styled/WithStyledApp';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { RootState } from '../store/modules';

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

  if (products.length === 0) return <p>등록된 항목이 없습니다.</p>;

  return (
    <View>
      <GlobalStyle />
      <Header />

      <Container>
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
      </Container>

      <Footer />
    </View>
  );
};

export default withRouter(App);
