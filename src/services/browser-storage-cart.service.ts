import {Inject} from '@angular/core';

import {MemoryCartService} from './memory-cart.service';
import {CART_ITEM_CLASS} from './item-class.token';
import {CART_SERVICE_CONFIGURATION} from './service-configuration.token';
import {CartItem} from '../classes/cart-item';
import {BrowserStorageServiceConfiguration} from '../interfaces/browser-storage-service-configuration';

/**
 * The base class for all CartService implementations that use the Storage interface of the Web Storage API like LocalStorage and
 * SessionStorage.
 * @order 4
 */
export abstract class BrowserStorageCartService<T extends CartItem> extends MemoryCartService<T> {
  protected itemClass: any;
  protected storage: Storage;
  protected storageKey: string;
  protected clearOnError: boolean;

  constructor(
    @Inject(CART_ITEM_CLASS) itemClass: CartItem,
    @Inject(CART_SERVICE_CONFIGURATION) configuration: BrowserStorageServiceConfiguration
  ) {
    super() /* istanbul ignore next */;
    this.storageKey = configuration && configuration.storageKey ? configuration.storageKey : 'NgShoppingCart';
    this.clearOnError = configuration && configuration.clearOnError !== undefined ? configuration.clearOnError : true;
    this.itemClass = itemClass;
  }

  private resetStorage(error: boolean | string | Error) {
    if (this.clearOnError || !error) {
      this.setTaxRate(0);
      this.setShipping(0);
      this.clear();
      this.save();
    } else {
      if (typeof error === 'string') {
        throw new Error(error);
      }
      throw error;
    }
  }

  protected save() {
    this.storage.setItem(this.storageKey, JSON.stringify(this.toObject()));
  }

  protected restore() {
    if (!this.storage.getItem(this.storageKey)) {
      this.resetStorage(false);
      return;
    }
    try {
      const sc = JSON.parse(this.storage.getItem(this.storageKey));
      if (!(sc.hasOwnProperty('items') && Array.isArray(sc.items) && sc.hasOwnProperty('taxRate') && sc.hasOwnProperty('shipping'))) {
        this.resetStorage('The object found under the key ' + this.storageKey + ' is not a valid cart object');
        return;
      }
      this._items = sc.items.map(i => {
        if (this.itemClass.fromJSON) {
          return this.itemClass.fromJSON(i);
        }
        return new this.itemClass(i);
      });
      this.setTaxRate(parseFloat(sc.taxRate));
      this.setShipping(parseFloat(sc.shipping));
    } catch (e) {
      this.resetStorage(e);
    }
  }

  addItem(item: T): void {
    super.addItem(item);
    this.save();
  }

  removeItem(id: any): void {
    super.removeItem(id);
    this.save();
  }

  clear(): void {
    super.clear();
    this.save();
  }

  setShipping(shipping: number): void {
    super.setShipping(shipping);
    this.save();
  }

  setTaxRate(tax: number): void {
    super.setTaxRate(tax);
    this.save();
  }
}
