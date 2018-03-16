import { Injectable } from '@angular/core';
import { CartItem } from '../classes/cart-item';
import { BrowserStorageCartService } from '../classes/browser-storage-cart.service';
import { ItemClassService } from './item-class.service';
import { BrowserStorageServiceOptions } from '../interfaces/browser-storage-service-options';

@Injectable()
export class SessionStorageCartService<T extends CartItem> extends BrowserStorageCartService<T> {
  constructor(itemClassService: ItemClassService<T>, options: BrowserStorageServiceOptions = null) {
    super(itemClassService, options);
    this.storage = window.sessionStorage;
    this.restore();
  }
}
