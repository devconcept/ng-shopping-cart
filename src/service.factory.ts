import {LocalStorageCartService} from './services/local-storage-cart.service';
import {MemoryCartService} from './services/memory-cart.service';
import {CartItem} from './classes/cart-item';
import {SessionStorageCartService} from './services/session-storage-cart.service';

export function localStorageFactory<T extends CartItem>(itemClass: CartItem, configuration: any) {
  return new LocalStorageCartService<T>(itemClass, configuration);
}

export function sessionStorageFactory<T extends CartItem>(itemClass: CartItem, configuration: any) {
  return new SessionStorageCartService<T>(itemClass, configuration);
}

export function memoryStorageFactory<T extends CartItem>() {
  return new MemoryCartService<T>();
}
