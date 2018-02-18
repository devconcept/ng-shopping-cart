import { CartService } from './cart.service';
import { CartItem } from '../classes/cart-item';
import { Injectable } from '@angular/core';

@Injectable()
export class MemoryCartService extends CartService {
  private _items: CartItem[] = [];
  tax = 0;
  shipping = 0;

  public getItem(id: any): CartItem {
    return this._items.find(i => i.id === id);
  }

  public getItems(): CartItem[] {
    return this._items.slice(0);
  }

  public itemCount(): number {
    return this._items.length;
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

    return item;
  }

  public removeItem(id: any): void {
    const idx = this._items.findIndex(i => i.id === id);
    if (idx !== -1) {
      this._items.splice(idx, 1);
    }
  }

  public cost(): number {
    return this._items.reduce((curr, i) => (curr + i.price * i.quantity), 0);
  }

  public totalCost(): number {
    return this.cost() + this.tax + this.shipping;
  }
}
