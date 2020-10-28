interface Window {
  plabDatafile: Record<string, unknown>;
}

interface ProductType {
  id: number;
  name: string;
  color: string;
  category: string;
  price: number;
  imageUrl: string;
  q: number;
}

interface ProductListType {
  products: ProductType[];
}
