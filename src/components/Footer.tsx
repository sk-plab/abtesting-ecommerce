// eslint-disable-next-line
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="container">
      <hr />
      <h3>사이트 설명</h3>
      <p>
        E-Commerce 사이트에 A/B Testing 을 적용한 데모입니다.
        <br />
        상품 목록 / 상품 보기 / 장바구니 / 주문 완료 4개 화면으로 구성되어
        있습니다.
        <br />
        상단에 DevTool 을 클릭하면 A/B Testing 관련 정보를 확인할 수 있습니다.
        <br />
        실험 적용 내용은 아래 참고하세요.
        <br />
      </p>
      <ul>
        <li>
          상품 보기 화면
          <ol>
            <li>장바구니 / 바로구매 (Call-to-Action) 버튼 변경</li>
            <li>B variation에만 Sale 박스 표시</li>
          </ol>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
