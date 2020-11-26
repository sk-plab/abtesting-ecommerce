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
import MarkingABTest from '../components/MarkingABTest';
import useShoppingCart from '../hooks/useShoppingCart';

// a/b testing init.
ABTest.init();

interface IProp {
  product: ProductType;
  onCartTrigger: () => void;
}
const ProductViewContainer: React.FC<IProp> = ({ product, onCartTrigger }) => {
  // abtesting start
  const expKey = 'ProductView';
  const abtest = ABTest.start(expKey);

  const { addToItem, checkoutSingleItem } = useShoppingCart();

  return (
    <Wrapper>
      <section className="shopping-container">
        <div className="shopping-box">
          <div className="images">
            <img
              src={`/images/${product.imageUrl}`}
              width="100%"
              style={{ minHeight: 200 }}
              alt=""
            />
          </div>
          <div className="property">
            <ul>
              <li>Name: {product.name}</li>
              <li>
                Price: ${product.price}
                <Sale>
                  <FaMoneyBillAlt style={{ fontSize: '20px', margin: '0 5px' }} />
                  20% Sale
                </Sale>
              </li>
              <li>Color: {product.color}</li>
              <li>Category: {product.category}</li>
            </ul>

            <div className="desc">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </div>
          </div>

          <MarkingABTest expKey={expKey} variation={abtest.variation}>
            {abtest.variables.enableFeature ? (
              <CTAGroup new="true" size="lg">
                <CartButton
                  new="true"
                  onClick={() => {
                    addToItem(product);
                    onCartTrigger();
                  }}
                >
                  <FaCartArrowDown />
                </CartButton>

                <DirectOrderButton
                  new="true"
                  onClick={() => {
                    checkoutSingleItem(product);
                  }}
                >
                  바로 구매
                </DirectOrderButton>
              </CTAGroup>
            ) : (
              <CTAGroup size="lg">
                <CartButton
                  onClick={() => {
                    addToItem(product);
                    onCartTrigger();
                  }}
                >
                  <FaCartArrowDown />
                </CartButton>

                <DirectOrderButton
                  onClick={() => {
                    checkoutSingleItem(product);
                  }}
                >
                  구매하기
                </DirectOrderButton>
              </CTAGroup>
            )}
          </MarkingABTest>
        </div>
      </section>
    </Wrapper>
  );
};

export default React.memo(ProductViewContainer);
