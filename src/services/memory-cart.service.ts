import { CartService } from './cart.service';
import { CartItem } from '../classes/cart-item';
import { Injectable } from '@angular/core';

@Injectable()
export class MemoryCartService extends CartService {
  private _items: CartItem[] = [];
  private _taxRate = 0;
  private _shipping = 0;

  public getItem(id: any): CartItem {
    return this._items.find(i => i.id === id);
  }

  public getItems(): CartItem[] {
    return this._items.slice(0);
  }

  public itemCount(): number {
    return this._items.length;
  }

  entries(): number {
    return this._items.reduce((curr, i) => (curr + i.quantity), 0);
  }

  public addItem(id: any, name: string, price: number, quantity: number, data: any): CartItem {
    const foundIdx = this._items.findIndex(i => i.id === id);
    let item;
    item = new CartItem(id, name, price, quantity, data);
    if (foundIdx === -1) {
      this._items.push(item);
    } else {
      this._items[foundIdx] = item;
    }
    this.onItemAdded.emit(item);
    this.onItemsChanged.emit(this._items.length);
    return item;
  }

  public removeItem(id: any): void {
    const idx = this._items.findIndex(i => i.id === id);
    if (idx !== -1) {
      const removed = this._items.splice(idx, 1);
      this.onItemRemoved.emit(removed[0]);
      this.onItemsChanged.emit(this._items.length);
    }
  }

  public cost(): number {
    return this._items.reduce((curr, i) => (curr + i.price * i.quantity), 0);
  }

  public clear() {
    this._items = [];
  }

  getShipping(): number {
    return this._shipping;
  }

  setShipping(shipping: number): void {
    this._shipping = shipping;
  }

  getTaxRate(): number {
    return this._taxRate;
  }

  setTaxRate(taxRate: number): void {
    this._taxRate = taxRate;
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }
}
