import React from 'react';
import styled from 'styled-components';

const ContainerClass = styled.div`
  position: relative;

  // ribbon code
  .badge-promo {
    position: relative;
    overflow: hidden;
    max-height: 60px;
    margin-bottom: -8px;
    z-index: 1;
    padding: 12px 14px;
    border-radius: 2px 2px 0 0;
    color: #fff;
    text-align: left;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
    }

    &:before {
      background: #a5daff;
      height: 100%;
      width: 110%;
      transform-origin: bottom right;
      transform: rotate(1deg);
    }

    &:after {
      background: #3fb0ff;
      transform: rotate(-3deg);
      transform-origin: bottom left;
      height: 100%;
      width: 110%;
    }
  }

  .badge-promo-content {
    position: relative;
    z-index: 1;
  }
`;

interface IProps {
  expKey: string;
  children: React.ReactNode;
}
const MarkingABTesting: React.FC<IProps> = ({ expKey, children }) => {
  return (
    <ContainerClass data-abtest-area={expKey}>
      <div className="badge-promo">
        <span className="badge-promo-content">
          <img src="/images/logo.png" width="25" alt="logo" />
          A/B Testing...
        </span>
      </div>
      {children}
    </ContainerClass>
  );
};

export default MarkingABTesting;
