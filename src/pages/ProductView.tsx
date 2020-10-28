// eslint-disable-next-line
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions';
import ABTest from '../libs/abtest';
import { Wrapper, Sale, DirectOrderButton, CartButton, CTAGroup } from '../components/styled/WithStyledProductView';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../store/modules';

// abtesting init
ABTest.init({
  datafile: window.plabDatafile,
});
// abtesting start
// @see https://plab.skplanet.com/projects/29/experiments
const expKey = 'ProductView';
const abtest = ABTest.start(expKey);

interface MatchParams {
  id: string;
}
const ProductViewPage: React.FC<RouteComponentProps<MatchParams>> = ({ match, history }) => {
  const id: number = parseInt(match.params.id, 10);

  const products = useSelector((state: RootState) => state.Shopping.products);
  const product = products.find((e) => e.id === id);

  const dispatch = useDispatch();
  const addToCart = () => {
    ABTest.track('add_to_cart');
    dispatch(actions.AddToCart({ id }));
  };
  const onCheckout = () => {
    dispatch(actions.DirectCheckout({ id }));
    history.push('/order');
  };

  return (
    <Wrapper>
      <section className="shopping-container" data-abtest-area={expKey}>
        <div className="shopping-box">
          <div className="images">
            <img src={`../images/${product?.imageUrl}`} width="100%" height="300" alt="" />
          </div>
          <div className="property">
            <ul>
              <li>Name: {product?.name}</li>
              <li>Price: ${product?.price}</li>
              <li>Color: {product?.color}</li>
              <li>Category: {product?.category}</li>
            </ul>

            <div className="desc">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </div>
          </div>

          {abtest.variables.enableFeature ? (
            <CTAGroup new="true" className="btn-group-lg">
              <DirectOrderButton new="true" onClick={onCheckout}>
                바로 구매
              </DirectOrderButton>

              <CartButton new="true" onClick={addToCart}>
                장바구니 담기
              </CartButton>
            </CTAGroup>
          ) : (
            <CTAGroup className="btn-group-lg">
              <CartButton onClick={addToCart}>장바구니</CartButton>

              <DirectOrderButton onClick={onCheckout}>구매하기</DirectOrderButton>
            </CTAGroup>
          )}
        </div>

        {abtest.variables.enableFeature && <Sale>20% Sale</Sale>}
      </section>
    </Wrapper>
  );
};

export default ProductViewPage;
