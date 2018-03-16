import { CartItem } from '../classes/cart-item';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemClassService<T extends CartItem> {
  private itemClass: new () => T;

  constructor(c: new () => T) {
    this.itemClass = c;
  }

  public instantiate(...args) {
    return new this.itemClass(...args);
  }
}
