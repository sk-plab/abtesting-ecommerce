import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Context, useSettings } from '../store/context';
import { useLoading } from '../hooks/useLoading';
import { useProducts } from '../hooks/useProductService';

const ProductListPage = lazy(() => import('./ProductListPage'));
const ProductViewPage = lazy(() => import('./ProductViewPage'));
const CartPage = lazy(() => import('./CartPage'));
const OrderPage = lazy(() => import('./OrderPage'));
const CheckoutPage = lazy(() => import('./CheckoutPage'));
const GuideContainer = lazy(() => import('../containers/GuideContainer'));

const App: React.FC = () => {
  // context settings
  const defaultValue = useSettings();

  useProducts();

  return (
    <Context.Provider value={defaultValue}>
      <Suspense fallback={useLoading()}>
        <Switch>
          <Route path="/" exact component={ProductListPage} />
          <Route path="/view/:id" component={ProductViewPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/order" component={OrderPage} />
        </Switch>
        <GuideContainer />
      </Suspense>
    </Context.Provider>
  );
};

export default App;
