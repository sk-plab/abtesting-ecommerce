// eslint-disable-next-line
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';

import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../store/modules';

import ProductView from '../components/ProductView';
import CartModal from '../components/CartModal';
import ABTest from '../libs/abtest';

interface MatchParams {
  id: string;
}
const ProductViewPage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
  history,
}) => {
  const id: number = parseInt(match.params.id, 10);

  const products = useSelector((state: RootState) => state.Shopping.products);
  const product = products.find((e) => e.id === id);

  // modal
  const [cartModalShow, setCartModalShow] = useState(false);

  // dispatch
  const dispatch = useDispatch();

  const addToCart = () => {
    ABTest.track('add_to_cart');
    dispatch(actions.AddToCart({ id }));
    setCartModalShow(true);
  };
  const onCheckout = () => {
    dispatch(actions.DirectCheckout({ id }));
    history.push('/checkout');
  };

  if (!product) return null;

  return (
    <Fragment>
      <ProductView
        product={product}
        onCart={addToCart}
        onCheckout={onCheckout}
      />
      <CartModal show={cartModalShow} onHide={() => setCartModalShow(false)} />
    </Fragment>
  );
};
export default ProductViewPage;
