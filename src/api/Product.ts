export const ProductData = async (): Promise<ProductType[]> => {
  const API_URL = process.env.REACT_APP_API_URL;
  if (!API_URL) throw new Error('not found REACT_APP_API_URL');

  const f = await fetch(API_URL);
  const data = await f.text();
  const parse = await parseProductData(data);

  return parse;
};

function parseProductData(data: string): ProductType[] {
  const itemLines: string[] = data.split('\n');

  const items = itemLines.reduce((pre: ProductType[], cur: string, currentIndex: number): ProductType[] => {
    const item = cur.trim().split(',');
    pre.push({
      id: currentIndex,
      name: item[0],
      color: item[1],
      category: item[2],
      price: parseInt(item[3].slice(1)),
      imageUrl: item[4],
      q: 1,
    });
    return pre;
  }, []);

  return items;
}
