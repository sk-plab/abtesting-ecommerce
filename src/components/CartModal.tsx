import React from 'react';
import { Modal } from 'react-bootstrap';

interface IProps {
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
}
const CartModal: React.FC<IProps> = ({ show, onHide, children }) => {
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CartModal;
