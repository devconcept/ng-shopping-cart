import { Injectable } from '@angular/core';
import { CartItem } from '../classes/cart-item';
import { BrowserStorageCartService } from '../classes/browser-storage-cart.service';

@Injectable()
export class SessionStorageCartService<T extends CartItem> extends BrowserStorageCartService<T> {
  constructor() {
    super();
    this.storage = window.sessionStorage;
  }
}
