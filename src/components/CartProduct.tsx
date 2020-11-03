// eslint-disable-next-line
import React, { createRef, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Image, InputGroup } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';

interface CartProductProps {
  product: ProductType;
  onCheckout: (id: number) => void;
  onDeleteCart: (id: number) => void;
}
const CartProduct: React.FC<CartProductProps> = ({ product, onDeleteCart }) => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const dataId = target.getAttribute('data-id');
    if (dataId) {
      const id = parseInt(dataId, 10);
      dispatch(actions.CartSelectProduct({ id, chk: target.checked }));
    }
  };

  return (
    <React.Fragment key={product.id}>
      <tr>
        <td>
          <Form.Check
            type="checkbox"
            checked={product.chk}
            data-id={product.id}
            onChange={handleChange}
          />
        </td>
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
          <InputGroup size="sm" style={{ width: 100 }}>
            <InputGroup.Prepend>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  dispatch(actions.DecreaseCart({ id: product.id }))
                }
              >
                -
              </Button>
            </InputGroup.Prepend>

            <Form.Control
              value={product.q}
              style={{ fontSize: 15, textAlign: 'center' }}
              readOnly
            />
            <InputGroup.Append>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  dispatch(actions.IncreaseCart({ id: product.id }))
                }
              >
                +
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </td>
        <td>${product.price}</td>
        <td>
          {/*<Button
            variant="outline-primary"
            size="sm"
            onClick={() => onCheckout(product.id)}
          >
            주문
          </Button>{' '}*/}
          <Button
            variant="dark"
            size="sm"
            onClick={() => onDeleteCart(product.id)}
          >
            <FaTrash />
          </Button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default CartProduct;
