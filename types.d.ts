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
  q: number;
  chk?: boolean;
}

interface ProductListType {
  products: ProductType[];
}
