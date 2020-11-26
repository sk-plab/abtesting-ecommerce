import React, { useCallback, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ProductViewContainer from '../containers/ProductViewContainer';
import CartModal from '../components/CartModal';
import CartContainer from '../containers/CartContainer';
import { fetchItems } from '../api';
import { Container } from 'react-bootstrap';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';

const ProductViewPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = parseInt(match.params.id, 10);

  const [cartModalShow, setCartModalShow] = useState(false);

  const onCartTrigger = useCallback(() => {
    setCartModalShow(true);
  }, [setCartModalShow]);

  const { data } = useSWR(['/api/items', id], (url: string, id: number) => {
    return fetchItems(id);
  });

  if (!data)
    return (
      <Container fluid>
        <Skeleton height={260} />
        <Skeleton height={24} style={{ marginTop: 22 }} />
        <Skeleton height={20} style={{ marginTop: 10, marginBottom: 22 }} />
      </Container>
    );

  return (
    <Container fluid>
      <ProductViewContainer product={data[0]} onCartTrigger={onCartTrigger} />

      <CartModal show={cartModalShow} onHide={() => setCartModalShow(false)}>
        <CartContainer />
      </CartModal>
    </Container>
  );
};
export default ProductViewPage;
