import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Image, InputGroup } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import useShoppingCart from '../hooks/useShoppingCart';

interface IProps {
  product: CartProductType;
}
const CartProduct: React.FC<IProps> = ({ product }) => {
  const { increaseItem, decreaseItem, removeItem, selectCheckoutItem } = useShoppingCart();

  return (
    <React.Fragment>
      <tr>
        <td>
          <Form.Check
            type="checkbox"
            checked={product.chk}
            onChange={() => selectCheckoutItem(product.id)}
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
              <Button size="sm" variant="secondary" onClick={() => decreaseItem(product.id)}>
                -
              </Button>
            </InputGroup.Prepend>

            <Form.Control
              value={product.q}
              style={{ fontSize: 15, textAlign: 'center' }}
              readOnly
            />
            <InputGroup.Append>
              <Button size="sm" variant="secondary" onClick={() => increaseItem(product.id)}>
                +
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </td>
        <td>${product.price}</td>
        <td>
          <Button variant="dark" size="sm" onClick={() => removeItem(product.id)}>
            <FaTrash />
          </Button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default CartProduct;
