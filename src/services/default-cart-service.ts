import { CartService } from './cart-service';
import { CartItem } from '../classes/cart-item';

export class DefaultCartService extends CartService {
  private _items: CartItem[] = [];
  private _rawItems: any[] = [];
  tax = 0;
  shipping = 0;

  getItem(id: any): CartItem {
    return this._items.find(i => i.id === id);
  }

  getRawItem(id: any): any {
    const idx = this._items.findIndex(i => i.id === id);
    return this._rawItems[idx];
  }

  getItems(): CartItem[] {
    return this._items.slice(0);
  }

  getRawItems(): any[] {
    return this._rawItems.slice(0);
  }

  itemCount(): number {
    return this._items.length;
  }

  transform(item: any): CartItem {
    return new CartItem(item.id, item.name, item.price, item.quantity, item.data);
  }

  addItem(item: any): CartItem {
    const newItem = this.transform(item);
    this._items.push(newItem);
    this._rawItems.push(item);
    return newItem;
  }

  removeItem(id: any): void {
    const idx = this._items.findIndex(i => i.id === id);
    if (idx !== -1) {
      this._items.splice(idx, 1);
      this._rawItems.splice(idx, 1);
    }
  }

  cost(): number {
    return this._items.reduce((curr, i) => (curr + i.price * i.quantity), 0);
  }

  totalCost(): number {
    return this.cost() + this.tax + this.shipping;
  }
}
