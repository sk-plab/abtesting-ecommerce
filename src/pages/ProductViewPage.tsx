import React, { useCallback, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ProductViewContainer from '../containers/ProductViewContainer';
import CartModal from '../components/CartModal';
import CartContainer from '../containers/CartContainer';
import { fetchItemById } from '../api';
import { Container } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';

const ProductViewPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;

  const [cartModalShow, setCartModalShow] = useState(false);

  const onCartTrigger = useCallback(() => {
    setCartModalShow(true);
  }, [setCartModalShow]);

  const { isLoading, error, data } = useQuery<ProductType, Error>(`items/${id}`, () =>
    fetchItemById(id)
  );
  if (error) return <div>An error has occurred: {error.message}</div>;

  if (!data || isLoading)
    return (
      <Container fluid>
        <Skeleton height={260} />
        <Skeleton height={24} style={{ marginTop: 22 }} />
        <Skeleton height={20} style={{ marginTop: 10, marginBottom: 22 }} />
      </Container>
    );

  return (
    <Container fluid>
      <ProductViewContainer product={data} onCartTrigger={onCartTrigger} />

      <CartModal show={cartModalShow} onHide={() => setCartModalShow(false)}>
        <CartContainer />
      </CartModal>
    </Container>
  );
};
export default ProductViewPage;
