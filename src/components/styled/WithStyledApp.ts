import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #FFF;
    font-size: 15px;

    padding-top: 5.5rem;
  }

  code {
    font-family: 'Roboto';
    font-weight: bold;
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
