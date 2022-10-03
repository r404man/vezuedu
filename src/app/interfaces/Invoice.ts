import Product from './Product';
import User from './User';
export interface Invoice extends User {
  id: number;
  number?: number;
  price: number;
  cart: Product[];
}
