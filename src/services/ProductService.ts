import ProductData from './ProductData.json';

export const ProductService = (): ProductType[] => {
  return ProductData.data.map((e) => {
    return { ...e, q: 1 };
  });
};
