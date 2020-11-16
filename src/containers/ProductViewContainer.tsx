import React, { useCallback, useContext } from 'react';
import { Context } from '../store/context';
import {
  Wrapper,
  Sale,
  DirectOrderButton,
  CartButton,
  CTAGroup,
} from '../components/styled/WithStyledProductView';
import { FaCartArrowDown, FaMoneyBillAlt } from 'react-icons/fa';
import ABTest from '../libs/abtest';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import * as actions from '../actions';
import { Waypoint } from 'react-waypoint';
import MarkingABTest from '../components/MarkingABTest';

interface MatchParams {
  id: string;
}
interface IProp {
  onCartTrigger: () => void;
}
const ProductViewContainer: React.FC<IProp & RouteComponentProps<MatchParams>> = ({
  match,
  history,
  onCartTrigger,
}) => {
  const { abtestCtx } = useContext(Context);

  const id: number = parseInt(match.params.id, 10);

  const products = useSelector((state: RootState) => state.Shopping.products);
  const product = products.find((e) => e.id === id);

  // dispatch
  const dispatch = useDispatch();

  const addToCart = useCallback(() => {
    ABTest.track('add_to_cart');
    dispatch(actions.AddToCart({ id }));
    onCartTrigger();
  }, [dispatch, id, onCartTrigger]);

  const onCheckout = useCallback(() => {
    dispatch(actions.DirectCheckout({ id }));
    history.push('/checkout');
  }, [dispatch, id, history]);

  if (!product) return null;

  // a/b testing init.
  ABTest.init();

  // abtesting start
  const expKey = 'ProductView';
  const abtest = ABTest.start(expKey);
  abtestCtx.variation = abtest.variation;

  return (
    <Wrapper>
      <section className="shopping-container">
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
                <CartButton new="true" onClick={addToCart}>
                  <FaCartArrowDown />
                </CartButton>

                <DirectOrderButton new="true" onClick={onCheckout}>
                  바로 구매
                </DirectOrderButton>
              </CTAGroup>
            ) : (
              <CTAGroup size="lg">
                <CartButton onClick={addToCart}>
                  <FaCartArrowDown />
                </CartButton>

                <DirectOrderButton onClick={onCheckout}>구매하기</DirectOrderButton>
              </CTAGroup>
            )}

            <Waypoint
              onEnter={() => abtestCtx.setExpKey(expKey)}
              onLeave={() => abtestCtx.setExpKey('')}
            />
          </MarkingABTest>
        </div>
      </section>
    </Wrapper>
  );
};

export default React.memo(withRouter(ProductViewContainer));
