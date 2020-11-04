// eslint-disable-next-line
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import CartList from './CartList';
import * as actions from '../actions';
import TotalAmount from './ToalAmount';
import Noty from 'noty';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IProps {
  show: boolean;
  onHide: () => void;
}
const CartModal: React.FC<IProps & RouteComponentProps> = ({
  show,
  onHide,
  history,
}) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.Shopping.cart);

  const onCheckoutAll = () => {
    const _products = products.filter((e) => e.chk);
    if (_products.length > 0) {
      dispatch(actions.Checkout({}));
      history.push('/checkout');
    } else {
      new Noty({
        type: 'error',
        text: `선택한 장바구니 상품이 없습니다.`,
        timeout: 3000,
      }).show();
    }
  };
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CartList products={products} />
        <hr />
        <h4>
          Total: <TotalAmount products={products} />
        </h4>

        {products.length > 0 && (
          <Button size="lg" block onClick={onCheckoutAll}>
            Proceed to Checkout
          </Button>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default withRouter(CartModal);
