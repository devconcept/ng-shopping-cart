import { Injectable } from '@angular/core';
import { CartItem } from '../classes/cart-item';
import { BrowserStorageCartService } from '../classes/browser-storage-cart.service';

@Injectable()
export class SessionStorageCartService<T extends CartItem> extends BrowserStorageCartService<T> {
  constructor(itemClass: any, storageKey = 'NgShoppingCart') {
    super(itemClass, storageKey);
    this.storage = window.sessionStorage;
  }
}
