// eslint-disable-next-line
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import CartList from './CartList';

interface IProps {
  show: boolean;
  onHide: () => void;
}
const CartModal: React.FC<IProps> = (props) => {
  const products = useSelector((state: RootState) => state.Shopping.cart);

  return (
    <Modal centered {...props}>
      <Modal.Header closeButton>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CartList products={products} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
