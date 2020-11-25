import React, { useCallback, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ProductViewContainer from '../containers/ProductViewContainer';
import CartModal from '../components/CartModal';
import CartContainer from '../containers/CartContainer';
import { useSelector } from 'react-redux';
import { productsSelector } from '../store/modules';
import { Container } from 'react-bootstrap';

const ProductViewPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = parseInt(match.params.id, 10);
  const products = useSelector(productsSelector);
  const product = products.filter((e) => e.id === id)[0];

  const [cartModalShow, setCartModalShow] = useState(false);

  const onCartTrigger = useCallback(() => {
    setCartModalShow(true);
  }, [setCartModalShow]);

  return (
    <Container fluid>
      <ProductViewContainer product={product} onCartTrigger={onCartTrigger} />

      <CartModal show={cartModalShow} onHide={() => setCartModalShow(false)}>
        <CartContainer />
      </CartModal>
    </Container>
  );
};
export default ProductViewPage;
