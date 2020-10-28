import styled from 'styled-components';

export const ProductWrapper = styled.div`
  padding: 10px;
  margin: 10px;
  text-align: center;
  width: 100%;
  transition: all 0.3s ease-out;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

export const ProductName = styled.div`
  font-size: 15px;
`;

export const ProductPrice = styled.div`
  color: #111;
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
  letter-spacing: 0;
`;
