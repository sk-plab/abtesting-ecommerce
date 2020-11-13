import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #FFF;
    font-size: 15px;

    padding-top: 5.5rem;
  }

  .page {
    position: absolute;
    left: 15px;
    right: 15px;
  }
  
  .page-enter {
    opacity: 0;
    transform: scale(1.1);
  }
  
  .page-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }
  
  .page-exit {
    opacity: 1;
    transform: scale(1);
  }
  
  .page-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }

  .my-node-enter {
    opacity: 0;
  }
  .my-node-enter-active {
    opacity: 1;
    transition: opacity 2000ms;
  }
  .my-node-exit {
    opacity: 1;
  }
  .my-node-exit-active {
    opacity: 0;
    transition: opacity 2000ms;
  }
  
  h1 {
    font-size: 36px;
    font-weight: bold;
    color: #343a40;
  }
  .abtest-devtool-container {
    padding: 30px 20px !important;
  }

  .swiper-slide {
    overflow: hidden;
  }

  .menu {
    color: #111;
    font-size: 17px;
  }
`;

export const View = styled.div``;
