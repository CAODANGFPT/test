export interface IProduct {
  id?: number;
  name: string;
  image: string;
  brand: string;
  price: number;
  discount: number;
  quantity: number;
  description?: string;
  category_id: number;
}
