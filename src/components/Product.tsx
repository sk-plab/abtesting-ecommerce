// eslint-disable-next-line
import React from 'react';

import { Image } from 'react-bootstrap';
import {
  ProductName,
  ProductWrapper,
  ProductPrice,
} from './styled/WithStyledProduct';

interface Props {
  product: ProductType;
  onClickProduct: (id: number) => void;
}
const Product: React.FC<Props> = ({ product, onClickProduct }) => {
  return (
    <ProductWrapper onClick={() => onClickProduct(product.id)}>
      <Image src={`images/${product.imageUrl}`} width="100%" />

      <ProductName>
        {product.name} in {product.color}
      </ProductName>

      <ProductPrice>${product.price}</ProductPrice>
    </ProductWrapper>
  );
};
export default React.memo(Product);
