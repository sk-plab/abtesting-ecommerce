import React from 'react';

interface IProps {
  prefix?: string;
  currency?: string;
}
const TotalAmount: React.FC<IProps & ProductListType> = ({
  prefix,
  products,
  currency,
}) => {
  const total = products.reduce(
    (pre: number, cur: ProductType): number =>
      cur.chk ? pre + cur.price * cur.q : pre,
    0
  );

  return (
    <React.Fragment>
      {currency || '$'} {prefix} {total}
    </React.Fragment>
  );
};

export default React.memo(TotalAmount);
