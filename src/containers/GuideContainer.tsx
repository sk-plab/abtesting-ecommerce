import React from 'react';
import { Context } from '../store/context';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  z-index: 10000;
  right: 0;
  top: 100px;
  width: 500px;
  height: 500px;
  overflow: auto;
  font-size: 12px;
  overflow: auto;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  background: #fff;
  padding: 20px;
`;
const GuideContainer: React.FC = () => {
  const [context] = React.useContext(Context);

  const codeString: Record<string, string> = {
    ProductList: `// 실험 영역 UI 정의
{!abtest.variables.enableFeature ? (
  productsMap
) : (
  <Swiper slidesPerView={matches.small ? 2 : 3}>
    {products.map((product) => (
      <div key={product.id}>
        <Product
          key={product.id}
          product={product}
          onClickProduct={onClickProduct}
        />
      </div>
    ))}
  </Swiper>
)}
    `,

    ProductView: `// 실험 영역 UI 정의
{abtest.variables.enableFeature ? (
  <React.Fragment>
    <CTAGroup new="true" className="btn-group-lg">
      <CartButton new="true" onClick={addToCart}>
        <FaCartArrowDown />
      </CartButton>

      <DirectOrderButton new="true" onClick={onCheckout}>
        바로 구매
      </DirectOrderButton>
    </CTAGroup>
  </React.Fragment>
) : (
  <CTAGroup className="btn-group-lg">
    <CartButton onClick={addToCart}>
      <FaCartArrowDown />
    </CartButton>

    <DirectOrderButton onClick={onCheckout}>
      구매하기
    </DirectOrderButton>
  </CTAGroup>
)}


// 장바구니 버튼 정의
export const CartButton = styled(Button)\`
  \${(props) =>
    props.new
    ? css\`
        background: #4ad9af;
        border-color: #4ad9af;
        color: #fff;
        width: 10%;
        font-size: 14px;
        border-radius: 30px !important;
        font-weight: bold;
        &:hover {
          background: \${darken(0.1, '#4ad9af')};
          border-color: #4ad9af;
          color: yellow;
        }
      \`
      : css\`
        background: #4ad9af;
        border-color: #4ad9af;
        border-radius: 0 !important;
        color: #fff;
        width: 50%;
        &:hover {
          background: \${darken(0.1, '#4ad9af')};
          border-color: #4ad9af;
          color: yellow;
        }
      \`}
    \`
    `,
  };

  console.log(`context: ${context}`);

  return (
    <React.Fragment>
      {codeString[context] ? (
        <Container>
          <h2>
            <img src="/images/logo.png" width="50" alt="logo" />
            <sub>A/B Testing...</sub>
          </h2>
          <p>해당 영역에서 실험이 진행중입니다.</p>
          <p>실험키: {context}</p>

          <p>아래코드를 참고하세요.</p>
          <SyntaxHighlighter language="jsx" style={dark}>
            {codeString[context]}
          </SyntaxHighlighter>
        </Container>
      ) : (
        '.'
      )}
    </React.Fragment>
  );
};

export default GuideContainer;
