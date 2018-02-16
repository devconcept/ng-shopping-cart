import { CartService } from './cart-service';
import { CartItem } from '../classes/cart-item';
import { Injectable } from '@angular/core';

@Injectable()
export class DefaultCartService extends CartService {
  private _items: CartItem[] = [];
  private _rawItems: any[] = [];
  tax = 0;
  shipping = 0;

  public getItem(id: any): CartItem {
    return this._items.find(i => i.id === id);
  }

  public getRawItem(id: any): any {
    const idx = this._items.findIndex(i => i.id === id);
    return this._rawItems[idx];
  }

  public getItems(): CartItem[] {
    return this._items.slice(0);
  }

  public getRawItems(): any[] {
    return this._rawItems.slice(0);
  }

  public itemCount(): number {
    return this._items.length;
  }

  protected transform(item: any): CartItem {
    return new CartItem(item.id, item.name, item.price, item.quantity, item.data);
  }

  public addItem(item: any): CartItem {
    const newItem = this.transform(item);
    this._items.push(newItem);
    this._rawItems.push(item);
    return newItem;
  }

  public removeItem(id: any): void {
    const idx = this._items.findIndex(i => i.id === id);
    if (idx !== -1) {
      this._items.splice(idx, 1);
      this._rawItems.splice(idx, 1);
    }
  }

  public cost(): number {
    return this._items.reduce((curr, i) => (curr + i.price * i.quantity), 0);
  }

  public totalCost(): number {
    return this.cost() + this.tax + this.shipping;
  }
}
