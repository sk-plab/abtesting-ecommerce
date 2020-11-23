import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Context, IContext } from '../store/context';
import { Container } from 'react-bootstrap';
import { ProductListPage, ProductViewPage, CartPage, OrderPage, CheckoutPage } from '../pages';
import GuideContainer from '../containers/GuideContainer';
import { useProducts } from '../hooks/useProductService';
import Skeleton from 'react-loading-skeleton';

const App: React.FC = () => {
  // context settings
  const [expKey, setExpKey] = useState('');
  const defaultValue: IContext = { abtestCtx: { expKey, setExpKey } };

  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      console.log(`You chanaged the page to: ${location.pathname}`);
      setExpKey('');
    });
  }, [history, setExpKey]);

  // products settings
  const { products } = useProducts();

  if (!products.length)
    return (
      <Container fluid>
        <Skeleton height={260} />
        <Skeleton height={24} style={{ marginTop: 22 }} />
        <Skeleton height={20} style={{ marginTop: 10, marginBottom: 22 }} />
      </Container>
    );

  return (
    <Context.Provider value={defaultValue}>
      <Switch>
        <Route path="/" exact>
          <ProductListPage products={products} />
        </Route>
        <Route path="/view/:id" component={ProductViewPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/order" component={OrderPage} />
      </Switch>

      <GuideContainer />
    </Context.Provider>
  );
};

export default App;
