// eslint-disable-next-line
import React from 'react';
import {
  Wrapper,
  Sale,
  DirectOrderButton,
  CartButton,
  CTAGroup,
} from '../components/styled/WithStyledProductView';
import { FaCartArrowDown, FaMoneyBillAlt } from 'react-icons/fa';
import ABTest from '../libs/abtest';

interface IProp {
  product: ProductType;
  onCart: () => void;
  onCheckout: () => void;
}
const ProductView: React.FC<IProp> = ({ product, onCart, onCheckout }) => {
  // a/b testing init.
  ABTest.init();

  // abtesting start
  const expKey = 'ProductView';
  const abtest = ABTest.start(expKey);

  return (
    <Wrapper>
      <section className="shopping-container" data-abtest-area={expKey}>
        <div className="shopping-box">
          <div className="images">
            <img src={`/images/${product.imageUrl}`} width="100%" alt="" />
          </div>
          <div className="property">
            <ul>
              <li>Name: {product.name}</li>
              <li>
                Price: ${product.price}
                <Sale>
                  <FaMoneyBillAlt
                    style={{ fontSize: '20px', margin: '0 5px' }}
                  />
                  20% Sale
                </Sale>
              </li>
              <li>Color: {product.color}</li>
              <li>Category: {product.category}</li>
            </ul>

            <div className="desc">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </div>
          </div>

          {abtest.variables.enableFeature ? (
            <React.Fragment>
              <CTAGroup new="true" className="btn-group-lg">
                <CartButton new="true" onClick={onCart}>
                  <FaCartArrowDown />
                </CartButton>

                <DirectOrderButton new="true" onClick={onCheckout}>
                  바로 구매
                </DirectOrderButton>
              </CTAGroup>
            </React.Fragment>
          ) : (
            <CTAGroup className="btn-group-lg">
              <CartButton onClick={onCart}>
                <FaCartArrowDown />
              </CartButton>

              <DirectOrderButton onClick={onCheckout}>
                구매하기
              </DirectOrderButton>
            </CTAGroup>
          )}
        </div>
      </section>
    </Wrapper>
  );
};

export default React.memo(ProductView);
