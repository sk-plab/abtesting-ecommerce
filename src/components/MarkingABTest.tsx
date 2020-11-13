import React from 'react';
import styled from 'styled-components';

const ContainerClass = styled.div`
  position: relative;
  border: 3px solid #921e21;
  animation: blinker 2s linear infinite;

  @keyframes blinker {
    50% {
      border-color: red;
    }
  }
`;
const Marker = styled.div`
  position: absolute;
  top: -20px;
  left: -30px;
  z-index: 1000;
  background: #1278fd;
  color: #fff;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 1em;
  font-weight: bold;
`;
interface IProps {
  children: React.ReactNode;
}
const MarkingABTesting: React.FC<IProps> = ({ children }) => {
  return (
    <ContainerClass>
      <Marker>
        <img src="/images/logo.png" width="25" alt="logo" />
        A/B Testing...
      </Marker>
      {children}
    </ContainerClass>
  );
};

export default MarkingABTesting;
