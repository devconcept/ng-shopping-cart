import { Inject, Injectable } from '@angular/core';
import { CartItem } from '../classes/cart-item';
import { BrowserStorageCartService } from '../classes/browser-storage-cart.service';
import { BrowserStorageServiceOptions } from '../interfaces/browser-storage-service-options';
import { ITEM_CLASS } from './item-class.token';

@Injectable()
export class SessionStorageCartService<T extends CartItem> extends BrowserStorageCartService<T> {
  constructor(@Inject(ITEM_CLASS) itemClass, options: BrowserStorageServiceOptions = null) {
    super(itemClass, options);
    this.storage = window.sessionStorage;
    this.restore();
  }
}
