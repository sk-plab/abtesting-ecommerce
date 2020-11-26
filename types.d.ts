interface Window {
  plabDatafile: Record<string, unknown>;
  plab: PlabInterface;
}

interface ProductType {
  id: number;
  name: string;
  color: string;
  category: string;
  price: number;
  imageUrl: string;
}

interface ProductListType {
  products: ProductType[];
}

interface CartProductType extends ProductType {
  q: number;
  chk: boolean;
}

declare module 'API' {
  //export const fetchItems = (id: number | null = null): Promise<ProductType[]> => {
  interface API {
    fetchItems: (id?: number | null) => Promise<ProductType[]>;
    addToCart: (item: ProductType) => Promise<ProductType>;
  }
  export default API;
}
