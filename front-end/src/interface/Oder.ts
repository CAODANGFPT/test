export interface IOrder {
  id: number;
  userId: number;
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity:number;
  quantityProduct:number;
}
export interface IUpdate {
  id: number;
  quantity:number;
}