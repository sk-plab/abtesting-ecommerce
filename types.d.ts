interface Window {
  plabDatafile: Record<string, unknown>;
  plab: PlabInterface;

  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
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
  interface API {
    fetchItems: () => Promise<ProductType[]>;
    fetchItemById: (id: number) => Promise<ProductType>;
    addToCart: (item: ProductType) => Promise<ProductType>;
  }
  export default API;
}
