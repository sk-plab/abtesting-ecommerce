import axios, { AxiosResponse } from 'axios';

export const fetchItems = async (): Promise<ProductType[]> => {
  try {
    const { data } = await axios.get('/api/products');
    return data;
  } catch (e) {
    throw new Error(`An error occurred while fetching the data. ${e.message}`);
  }
};

export const fetchItemById = async (id: number): Promise<ProductType> => {
  try {
    const { data } = await axios.get<ProductType>(`/api/products/${id}`);
    return data;
  } catch (e) {
    throw new Error(`An error occurred while fetching the data. ${e.message}`);
  }
};

export const addItem = async (item: ProductType): Promise<ProductType> => {
  try {
    const { data } = await axios.post<ProductType>(`/api/cart/add`, item);
    return data;
  } catch (e) {
    throw new Error(`An error occurred while fetching the data. ${e.message}`);
  }
};

export const increaseQtyItem = async (item: ProductType): Promise<ProductType> => {
  try {
    const { data } = await axios.post<ProductType, AxiosResponse<ProductType>>(
      `/api/cart/increase`,
      item
    );
    return data;
  } catch (e) {
    throw new Error(`An error occurred while fetching the data. ${e.message}`);
  }
};

export const decreaseQtyItem = async (item: ProductType): Promise<ProductType> => {
  try {
    const { data } = await axios.post<ProductType, AxiosResponse<ProductType>>(
      `/api/cart/decrease`,
      item
    );

    return data;
  } catch (e) {
    throw new Error(`An error occurred while fetching the data. ${e.message}`);
  }
};

export const removeItem = async (item: ProductType): Promise<ProductType> => {
  try {
    const { data } = await axios.delete<ProductType, AxiosResponse<ProductType>>(`/api/cart`, {
      data: item,
    });
    return data;
  } catch (e) {
    throw new Error(`An error occurred while fetching the data. ${e.message}`);
  }
};

export const checkoutItems = async (item: ProductType): Promise<ProductType> => {
  try {
    const { data } = await axios.post<ProductType, AxiosResponse<ProductType>>(
      `/api/checkout`,
      item
    );

    return data;
  } catch (e) {
    throw new Error(`An error occurred while fetching the data. ${e.message}`);
  }
};
