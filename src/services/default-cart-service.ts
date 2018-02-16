import { CartService } from './cart-service';
import { CartItem } from '../classes/cart-item';

export class DefaultCartService extends CartService {
  transform(item: any): CartItem {
    return item;
  }

}
