import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductViewContainer from '../containers/ProductViewContainer';
import CartModal from '../components/CartModal';
import CartContainer from '../containers/CartContainer';
import { useSelector } from 'react-redux';
import { productsSelector } from '../store/modules';
import { Container } from 'react-bootstrap';

interface MatchParams {
  id: string;
}
const ProductViewPage: React.FC = () => {
  const params = useParams<MatchParams>();

  const id: number = parseInt(params.id, 10);
  const products = useSelector(productsSelector);
  const product = products.filter((e) => e.id === id)[0];

  const [cartModalShow, setCartModalShow] = useState(false);

  const onCartTrigger = useCallback(() => {
    setCartModalShow(true);
  }, [setCartModalShow]);

  if (!product) return <div>loading...</div>;

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
