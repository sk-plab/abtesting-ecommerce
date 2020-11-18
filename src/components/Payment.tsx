import React from 'react';
import { Image, Button, Modal } from 'react-bootstrap';

interface IProp {
  show: boolean;
  onOrder: (e: React.MouseEvent) => void;
  handleClose: () => void;
}
const Payment: React.FC<IProp> = ({ show, onOrder, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>간편 결제</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={`images/payment.png`} width="100%" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소하기
        </Button>
        <Button variant="danger" onClick={onOrder}>
          결제하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(Payment);
