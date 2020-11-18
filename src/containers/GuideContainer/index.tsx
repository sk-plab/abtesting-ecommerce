import React, { useEffect } from 'react';
import { Context } from '../../store/context';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { GuideCode } from './GuideCode';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ABTest from '../../libs/abtest';
import { Button, ButtonGroup } from 'react-bootstrap';

const Container = styled.div`
  position: fixed;
  z-index: 1040;
  right: 10px;
  top: 100px;
  width: 500px;
  height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  background: #fff;
  padding: 5px 20px;
`;
const LogoImage = styled.img`
  position: absolute;
  right: -1px;
  top: 10px;
  opacity: 0.5;
  width: 180px;
`;
const GuideContainer: React.FC = () => {
  const { abtestCtx, matches } = React.useContext(Context);

  useEffect(() => {
    AOS.init();
  });

  if (matches.small) return null; // only desktop
  if (!GuideCode[abtestCtx.expKey]) return null;

  return (
    <Container data-aos="fade-up">
      <LogoImage src="/images/logo.png" alt="logo" />
      <h2>
        <sub>A/B Testing...</sub>
      </h2>
      <p>
        해당 영역에서 실험이 진행중입니다. 아래코드를 참고하세요.
        <br />
        실험키: {abtestCtx.expKey}
        <br />
        현재 Variation: {abtestCtx.variation}
      </p>
      <ButtonGroup size="sm">
        <Button
          onClick={() => {
            ABTest.forcedVariation(abtestCtx.expKey, 'A');
          }}
        >
          Variation: A 강제 설정
        </Button>
        <Button
          onClick={() => {
            ABTest.forcedVariation(abtestCtx.expKey, 'B');
          }}
        >
          Variation: B 강제 설정
        </Button>
      </ButtonGroup>
      <SyntaxHighlighter language="javascript" style={atomOneDark}>
        {GuideCode[abtestCtx.expKey]}
      </SyntaxHighlighter>
    </Container>
  );
};

export default GuideContainer;
