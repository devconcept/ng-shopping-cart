import { Inject, Injectable } from '@angular/core';
import { CartItem } from '../classes/cart-item';
import { BrowserStorageCartService } from './browser-storage-cart.service';
import { BrowserStorageServiceConfiguration } from '../interfaces/browser-storage-service-options';
import { CART_ITEM_CLASS } from './item-class.token';
import { CART_SERVICE_CONFIGURATION } from './service-configuration.token';

/**
 * An implementation of the cart service using localStorage to store items
 */
@Injectable()
export class LocalStorageCartService<T extends CartItem> extends BrowserStorageCartService<T> {
  constructor(@Inject(CART_ITEM_CLASS) itemClass, @Inject(CART_SERVICE_CONFIGURATION) configuration: BrowserStorageServiceConfiguration) {
    super(itemClass, configuration);
    this.storage = window.localStorage;
    this.restore();
  }
}
