// eslint-disable-next-line
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import styled from 'styled-components';
import { Table, Button, Image, Alert } from 'react-bootstrap';

import ABTest from '../libs/abtest';
import { RootState } from '../store/modules';
import TotalAmount from '../components/ToalAmount';

// a/b testing init.
ABTest.init();

const SuccessHeader = styled.h1`
  color: #f43142;
`;
const Header = styled.h2`
  font-weight: bold;
  margin-bottom: 10px;
`;

const OrderPage: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const ordered = useSelector((state: RootState) => state.Shopping.ordered);

  useEffect(() => {
    ABTest.track('order');

    return () => {
      dispatch({
        type: 'CHECKOUT_COMPLETE',
      });
    };
  }, [dispatch]);

  const GoToHome = () => {
    history.push('/');
  };

  return (
    <React.Fragment>
      <SuccessHeader>주문이 성공적으로 완료되었습니다.</SuccessHeader>
      <hr />
      <Alert variant="success">
        <p style={{ fontSize: 15 }}>
          주문번호: T1234987123
          <br />
          주문일자: 20201212 09:12:12
          <br />
          결제금액: <TotalAmount products={ordered} />
        </p>
        <hr />
        <p className="mb-0">주문해주셔서 감사합니다.</p>
      </Alert>

      <hr />

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
          {ordered.map((product, index) => (
            <tr key={index}>
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
                <b>${product.price * product.q}</b>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button size="lg" block variant="outline-primary" onClick={GoToHome}>
        쇼핑 계속하기
      </Button>
    </React.Fragment>
  );
};

export default OrderPage;
