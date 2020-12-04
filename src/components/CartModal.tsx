import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { Context } from '../store/context';

interface IProps {
  children: React.ReactNode;
}
const CartModal: React.FC<IProps> = ({ children }) => {
  const ctx = useContext(Context);
  return (
    <Modal
      size="lg"
      centered
      show={ctx.cartModal.isShow}
      onHide={() => ctx.cartModal.setShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CartModal;
