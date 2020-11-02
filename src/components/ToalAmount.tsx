import React, { Fragment } from 'react';

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
    (pre: number, cur: ProductType): number => pre + cur.price * cur.q,
    0
  );

  return (
    <Fragment>
      {prefix} {total} {currency || '원'}
    </Fragment>
  );
};

export default TotalAmount;
