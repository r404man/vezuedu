export default interface Product {
  id: number;
  code?: number;
  name: string;
  weight?: number;
  count?: number;
  image?: string;
  details?: string;
  compound?: string;
  price: number;
  amount: number;
  startPrice?: number;
}
