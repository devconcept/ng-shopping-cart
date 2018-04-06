import { CartService } from './cart.service';
import { CartItem } from '../classes/cart-item';
import { Injectable } from '@angular/core';

/**
 * An implementation of the CartService using an in-memory array to store items
 */
@Injectable()
export class MemoryCartService<T extends CartItem> extends CartService<T> {
  protected _items: T[] = [];
  protected _taxRate = 0;
  protected _shipping = 0;

  public getItem(id: any): T {
    return this._items.find(i => i.getId() === id);
  }

  public getItems(): T[] {
    return this._items.slice(0);
  }

  public itemCount(): number {
    return this._items.length;
  }

  public entries(): number {
    return this._items.reduce((curr, i) => (curr + i.getQuantity()), 0);
  }

  public addItem(item: T): void {
    const foundIdx = this._items.findIndex(i => i.getId() === item.getId());
    if (foundIdx === -1) {
      this._items.push(item);
    } else {
      this._items[foundIdx] = item;
    }
    this.onItemAdded.emit(item);
    this.onItemsChanged.emit(this._items.length);
  }

  public removeItem(id: any): void {
    const idx = this._items.findIndex(i => i.getId() === id);
    if (idx !== -1) {
      const removed = this._items.splice(idx, 1);
      this.onItemRemoved.emit(removed[0]);
      this.onItemsChanged.emit(this._items.length);
    }
  }

  public cost(): number {
    return this._items.reduce((curr, i) => (curr + i.getPrice() * i.getQuantity()), 0);
  }

  public clear() {
    this._items = [];
  }

  public getShipping(): number {
    return this._shipping;
  }

  public setShipping(shipping: number): void {
    this._shipping = shipping;
  }

  public getTaxRate(): number {
    return this._taxRate;
  }

  public setTaxRate(taxRate: number): void {
    this._taxRate = taxRate;
  }

  public isEmpty(): boolean {
    return this._items.length === 0;
  }
}
