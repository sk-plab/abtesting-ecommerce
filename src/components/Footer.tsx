// eslint-disable-next-line
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: linear-gradient(45deg, #0052a4 0%, #06c 25%, #66c7d6 100%);
  font-family: 'Nanum Gothic', sans-serif;
  box-sizing: border-box;
  margin-top: 50px;
  padding: 55px 1em 60px;
  color: #efefef;
  font-size: 13px;
  text-align: center;
  -webkit-box-shadow: 0px 1px 15px 0px rgba(84, 110, 122, 0.4);
  -moz-box-shadow: 0px 1px 15px 0px rgba(84, 110, 122, 0.4);
  box-shadow: 0px 1px 15px 0px rgba(84, 110, 122, 0.4);
  -webkit-transform: translateY(-1px);
  transform: translateY(-1px);
  color: #fff;
`;

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <p>
        13487 경기도 성남시 분당구 판교로 264(삼평동)&nbsp;&nbsp;&nbsp; The Planet&nbsp;&nbsp;&nbsp;
        SK플래닛 주식회사 &nbsp;&nbsp;사장 이한상
        <br />© Copyright 2017-2021 SK Planet™ Inc. All rights reserved.
      </p>
    </Wrapper>
  );
};

export default Footer;
