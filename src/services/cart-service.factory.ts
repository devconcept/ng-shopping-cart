import { DefaultCartItem } from '../classes/default-cart-item';
import { LocalStorageCartService } from './local-storage-cart.service';

export function CartServiceFactory() {
  return new LocalStorageCartService<DefaultCartItem>(DefaultCartItem);
}
