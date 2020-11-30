import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store/modules';

import CheckoutProduct from '../components/CheckoutProduct';
import Payment from '../components/Payment';
import TotalAmount from '../components/TotalAmount';

import { Col, Row, Image, Button, Form, Alert } from 'react-bootstrap';
import {
  CheckoutWrapper,
  RowClass,
  ColClass,
  Header,
} from '../components/styled/WithStyledCheckout';

const CheckoutPage: React.FC = () => {
  const history = useHistory();
  const checkout = useSelector((state: RootState) => state.cartItems.checkout);

  const [showPayment, setShowPayment] = useState(false);
  const handleClose = useCallback(() => setShowPayment(false), [setShowPayment]);

  const onPayment = useCallback(() => {
    setShowPayment(true);
  }, [setShowPayment]);

  const onOrder = useCallback(
    (e: React.MouseEvent) => {
      e.currentTarget.innerHTML = '결제중...';

      setTimeout(() => {
        setShowPayment(false);
        history.push('/order');
      }, 1000);
    },
    [history]
  );

  if (!checkout.length)
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>주문 세션을 찾을 수 없습니다.</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo luctus, nisi erat
          porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
      </Alert>
    );

  return (
    <CheckoutWrapper fluid>
      <Payment show={showPayment} handleClose={handleClose} onOrder={onOrder} />

      <h1>주문결제</h1>
      <hr />
      <RowClass>
        <Col md={8}>
          <CheckoutProduct products={checkout} />

          <hr style={{ margin: '30px 0' }} />
          <Header>배송정보</Header>
          <Ship />

          <hr style={{ margin: '30px 0' }} />
          <div>
            <Header>결제방법</Header>
            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="간편결제"></Form.Check>
            </Form.Group>
            <Row>
              <Col>
                <Image src={`images/card-ex-1.png`} />
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={4}>
          <Header>결제 예정금액</Header>
          <RowClass>
            <ColClass>상품금액</ColClass>
            <ColClass>
              <TotalAmount products={checkout} />
            </ColClass>
          </RowClass>
          <RowClass>
            <ColClass>배송비</ColClass>
            <ColClass>$0</ColClass>
          </RowClass>
          <RowClass>
            <ColClass>할인금액</ColClass>
            <ColClass>$0</ColClass>
          </RowClass>
          <RowClass>
            <ColClass>합계</ColClass>
            <ColClass>
              <h4 style={{ color: '#f43142', fontWeight: 'bold' }}>
                <TotalAmount products={checkout} />
              </h4>
            </ColClass>
          </RowClass>

          <Button size="lg" block onClick={onPayment}>
            총 {checkout.length} 개 결제하기
          </Button>
        </Col>
      </RowClass>
    </CheckoutWrapper>
  );
};

function Ship() {
  return (
    <div style={{ marginTop: 20 }}>
      <p
        style={{
          marginTop: 10,
          fontSize: 13,
          background: '#ddd',
          height: 25,
        }}
      ></p>
      <p
        style={{
          marginTop: 0,
          fontSize: 13,
          background: '#ddd',
          height: 25,
        }}
      ></p>
      <p
        style={{
          marginTop: 0,
          fontSize: 13,
          background: '#ddd',
          height: 25,
        }}
      ></p>
      <p
        style={{
          marginTop: 0,
          fontSize: 13,
          background: '#ddd',
          height: 25,
        }}
      ></p>
    </div>
  );
}
export default CheckoutPage;
