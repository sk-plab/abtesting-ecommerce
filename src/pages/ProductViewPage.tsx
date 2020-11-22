import React, { Fragment, useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ProductViewContainer from '../containers/ProductViewContainer';
import CartModal from '../components/CartModal';
import CartContainer from '../containers/CartContainer';
import { useSelector } from 'react-redux';
import { productsSelector } from '../store/modules';
import ABTest from '../libs/abtest';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';

interface MatchParams {
  id: string;
}
const ProductViewPage: React.FC = () => {
  const params = useParams<MatchParams>();
  const history = useHistory();
  const dispatch = useDispatch();

  const id: number = parseInt(params.id, 10);
  const products = useSelector(productsSelector);
  const product = products.filter((e) => e.id === id)[0];

  const [cartModalShow, setCartModalShow] = useState(false);

  const onCartTrigger = useCallback(() => {
    setCartModalShow(true);
  }, [setCartModalShow]);

  const addToCart = useCallback(() => {
    ABTest.track('add_to_cart');
    dispatch(actions.AddToCart(id));
    onCartTrigger();
  }, [dispatch, id, onCartTrigger]);

  const onCheckout = useCallback(() => {
    dispatch(actions.DirectCheckout(id));
    history.push('/checkout');
  }, [dispatch, id, history]);

  if (!product) throw new Error('Not found product');

  return (
    <Fragment>
      <ProductViewContainer product={product} addToCart={addToCart} onCheckout={onCheckout} />

      <CartModal show={cartModalShow} onHide={() => setCartModalShow(false)}>
        <CartContainer />
      </CartModal>
    </Fragment>
  );
};
export default ProductViewPage;
