import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { Container, Button, ButtonGroup } from 'react-bootstrap';

export const Wrapper = styled(Container)`
  width: 100%; /* mobile first */
  position: relative;

  @media only screen and (min-width: 768px) {
    width: 500px;
  }

  section.shopping-container {
    text-align: center;
    border-radius: 30px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    background: #fff;

    .shopping-box {
      width: 100%;
      background: #fff;

      div.images {
        margin-bottom: 20px;
      }

      div.property {
        position: relative;
        text-align: left;

        ul {
          margin: 0;
        }

        div.desc {
          padding: 10px;
        }
      }
    }
  }
`;
export const CTAGroup = styled(ButtonGroup)`
  ${(props) =>
    props.new
      ? css`
          width: 100%;
          padding: 15px;
        `
      : css`
          width: 100%;
          bottom: 0;
          background: #fff;
        `}
`;
export const DirectOrderButton = styled(Button)`
  ${(props) =>
    props.new
      ? css`
          width: 50%;
          background: #fff;
          color: #23bfa5;
          border: 1px solid #23bfa5;
          border-radius: 30px !important;
          font-weight: bold;
          margin-left: 5px !important;
          &:hover {
            background: ${darken(0.1, '#4ad9af')};
            border-color: #4ad9af;
          }
        `
      : css`
          background: ${darken(0.1, '#4ad9af')};
          border-color: #4ad9af;
          color: #fff;
          width: 50%;
          border-radius: 0 !important;
          &:hover {
            background: ${darken(0.2, '#4ad9af')};
            border-color: #4ad9af;
            color: yellow;
          }
        `}
`;
export const CartButton = styled(Button)`
  ${(props) =>
    props.new
      ? css`
          background: #4ad9af;
          border-color: #4ad9af;
          color: #fff;
          width: 10%;
          font-size: 14px;
          border-radius: 30px !important;
          font-weight: bold;
          &:hover {
            background: ${darken(0.1, '#4ad9af')};
            border-color: #4ad9af;
            color: yellow;
          }
        `
      : css`
          background: #4ad9af;
          border-color: #4ad9af;
          border-radius: 0 !important;
          color: #fff;
          width: 50%;
          &:hover {
            background: ${darken(0.1, '#4ad9af')};
            border-color: #4ad9af;
            color: yellow;
          }
        `}
`;

export const Sale = styled.div`
  position: absolute;
  top: -32px;
  left: 20px;
  z-index: 1;
  background: red;
  color: #fff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 2px 10px;
  font-size: 1em;
  font-weight: bold;

  animation: blinker 3s linear infinite;

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;
