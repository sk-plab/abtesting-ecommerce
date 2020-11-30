import axios from 'axios';

export const fetchItems = async (): Promise<ProductType[]> => {
  try {
    const res = await axios.get('/api/items');
    return res.data;
  } catch (e) {
    const error = new Error(`An error occurred while fetching the data. ${e.message}`);
    throw error;
  }
};

export const fetchItemById = async (id: number): Promise<ProductType> => {
  try {
    const res = await axios.get<ProductType>(`/api/items/${id}`);
    return res.data;
  } catch (e) {
    const error = new Error(`An error occurred while fetching the data. ${e.message}`);
    throw error;
  }
};

export const addToCart = (item: ProductType): Promise<ProductType> => {
  return new Promise((resolve) => {
    resolve(item);
  });
};
