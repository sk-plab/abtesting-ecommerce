import React, { useState } from 'react';
import { Col, Row, Table, Image, Button, Form, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import TotalAmount from '../components/ToalAmount';

import { RootState } from '../store/modules';
import Payment from '../components/Payment';
import {
  CheckoutWrapper,
  RowClass,
  ColClass,
  Header,
} from '../components/styled/WithStyledCheckout';

const Checkout: React.FC<RouteComponentProps> = ({ history }) => {
  const ordered = useSelector((state: RootState) => state.Shopping.ordered);

  const [showPayment, setShowPayment] = useState(false);
  const handleClose = () => setShowPayment(false);

  const onPayment = () => {
    setShowPayment(true);
  };
  const onOrder = (e: React.MouseEvent) => {
    e.currentTarget.innerHTML = '결제중...';

    setTimeout(() => {
      history.push('/order');
    }, 1000);
  };

  if (!ordered.length)
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>주문 세션을 찾을 수 없습니다.</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
    );

  return (
    <CheckoutWrapper fluid>
      <h1>주문결제</h1>
      <hr />
      <RowClass>
        <Col md={8}>
          <div>
            <Header>주문상품</Header>
            <p>상품수량 및 옵션변경은 상품상세 또는 장바구니에서 가능합니다.</p>
            <Table hover>
              <thead>
                <tr>
                  <th colSpan={2}>상품정보</th>
                  <th>수량</th>
                  <th>주문금액</th>
                </tr>
              </thead>
              <tbody>
                {ordered.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <Link to={`/view/${product.id}`}>
                        <Image
                          src={`../images/${product.imageUrl}`}
                          width="100"
                          height="100"
                          alt=""
                        />
                      </Link>
                    </td>
                    <td>
                      {product.name} in {product.color}
                    </td>
                    <td>
                      <b>{product.q}</b>
                    </td>
                    <td>
                      <b>{product.price * product.q}</b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <hr style={{ margin: '30px 0' }} />
          <Header>배송정보</Header>
          <div style={{ marginTop: 20 }}>
            <b style={{ fontSize: 15 }}>홍길동</b>
            <br />
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
          </div>

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
              <TotalAmount products={ordered} />
            </ColClass>
          </RowClass>
          <RowClass>
            <ColClass>배송비</ColClass>
            <ColClass>0 원</ColClass>
          </RowClass>
          <RowClass>
            <ColClass>할인금액</ColClass>
            <ColClass>0 원</ColClass>
          </RowClass>
          <RowClass>
            <ColClass>합계</ColClass>
            <ColClass>
              <h4 style={{ color: '#f43142', fontWeight: 'bold' }}>
                <TotalAmount products={ordered} />
              </h4>
            </ColClass>
          </RowClass>

          <Button size="lg" block onClick={onPayment}>
            총 {ordered.length} 개 결제하기
          </Button>
        </Col>
      </RowClass>

      <Payment show={showPayment} handleClose={handleClose} onOrder={onOrder} />
    </CheckoutWrapper>
  );
};

export default Checkout;
