import React from 'react';

const TotalAmount: React.FC<ProductListType> = ({ products }) => {
  const total = products
    .filter((e) => e.chk)
    .reduce(
      (pre: number, cur: ProductType): number => pre + cur.price * cur.q,
      0
    );

  return <h4>Total: ${total}</h4>;
};

export default TotalAmount;
