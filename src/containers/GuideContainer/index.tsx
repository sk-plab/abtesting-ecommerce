import React, { useEffect } from 'react';
import { Context } from '../../store/context';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { GuideCode } from './GuideCode';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
  padding: 20px;
`;
const LogoImage = styled.img`
  position: absolute;
  right: -1px;
  top: 10px;
  opacity: 0.5;
  width: 180px;
`;
const GuideContainer: React.FC = () => {
  const { context } = React.useContext(Context);

  useEffect(() => {
    AOS.init();
  });

  if (!GuideCode[context]) return null;

  return (
    <Container data-aos="fade-up">
      <LogoImage src="/images/logo.png" alt="logo" />
      <h2>
        <sub>A/B Testing...</sub>
      </h2>
      <p>해당 영역에서 실험이 진행중입니다.</p>
      <p>실험키: {context}</p>

      <p>아래코드를 참고하세요.</p>
      <SyntaxHighlighter language="javascript" style={atomOneDark}>
        {GuideCode[context]}
      </SyntaxHighlighter>
    </Container>
  );
};

export default GuideContainer;
