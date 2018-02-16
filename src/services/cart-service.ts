import { CartItem } from '../classes/cart-item';

export abstract class CartService {
  abstract getItem(id: any): CartItem;

  abstract getItems(): CartItem[];

  abstract transform(item: any): CartItem;

  abstract addItem(item: any): CartItem;

  abstract removeItem(id: any): void;

  abstract itemCount(): number;

  abstract cost(): number;

  abstract totalCost(): number;
}
