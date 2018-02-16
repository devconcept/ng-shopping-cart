import { CartItem } from '../classes/cart-item';

export abstract class CartService {
  abstract transform(item: any): CartItem;
}
