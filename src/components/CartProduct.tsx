// eslint-disable-next-line
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Image, InputGroup } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

interface CartProductProps {
  product: ProductType;
  onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onDeleteCart: (id: number) => void;
}
const CartProduct: React.FC<CartProductProps> = ({
  product,
  onCheck,
  onIncrease,
  onDecrease,
  onDeleteCart,
}) => {
  return (
    <React.Fragment>
      <tr>
        <td>
          <Form.Check
            type="checkbox"
            checked={product.chk}
            data-id={product.id}
            onChange={onCheck}
          />
        </td>
        <td>
          <Link to={`/view/${product.id}`}>
            <Image src={`../images/${product.imageUrl}`} width="100" height="100" alt="" />
          </Link>
        </td>

        <td>
          {product.name} in {product.color}
        </td>

        <td>
          <InputGroup size="sm" style={{ width: 100 }}>
            <InputGroup.Prepend>
              <Button size="sm" variant="secondary" onClick={() => onDecrease(product.id)}>
                -
              </Button>
            </InputGroup.Prepend>

            <Form.Control
              value={product.q}
              style={{ fontSize: 15, textAlign: 'center' }}
              readOnly
            />
            <InputGroup.Append>
              <Button size="sm" variant="secondary" onClick={() => onIncrease(product.id)}>
                +
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </td>
        <td>${product.price}</td>
        <td>
          <Button variant="dark" size="sm" onClick={() => onDeleteCart(product.id)}>
            <FaTrash />
          </Button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default React.memo(CartProduct);
