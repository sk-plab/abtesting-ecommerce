import items from './mockItems.json';

export const fetchItems = (id: number | null = null): Promise<ProductType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result: ProductType[];

      if (id !== null && id !== undefined) {
        result = items.data.filter((e) => e.id === id);
      } else {
        result = items.data.map((e) => {
          return { ...e, q: 1 };
        });
      }

      resolve(result);
    }, 500);
  });
};

export const addToCart = (item: ProductType): Promise<ProductType> => {
  return new Promise((resolve) => {
    resolve(item);
  });
};
