import React, { Fragment, useCallback, useState } from 'react';
import ProductViewContainer from '../containers/ProductViewContainer';
import CartModal from '../components/CartModal';
import CartContainer from '../containers/CartContainer';

const ProductViewPage: React.FC = () => {
  const [cartModalShow, setCartModalShow] = useState(false);

  const onCartTrigger = useCallback(() => {
    setCartModalShow(true);
  }, [setCartModalShow]);

  return (
    <Fragment>
      <ProductViewContainer onCartTrigger={onCartTrigger} />

      <CartModal show={cartModalShow} onHide={() => setCartModalShow(false)}>
        <CartContainer />
      </CartModal>
    </Fragment>
  );
};
export default ProductViewPage;
