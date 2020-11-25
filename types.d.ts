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
