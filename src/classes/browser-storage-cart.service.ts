import { CartService } from '../';
import { CartItem } from './cart-item';

export class BrowserStorageCartService extends CartService {
  protected storage: Storage;
  protected storageKey: 'NgShoppingCart';

  private readStorage(): CartItem[] {
    return JSON.parse(this.storage.getItem(this.storageKey));
  }

  private writeStorage(items: CartItem[]): void {
    this.storage.setItem(this.storageKey, JSON.stringify(items));
  }

  getItem(id: any): CartItem {
    const items = this.readStorage();
    return items.find(i => i.id === id);
  }

  getItems(): CartItem[] {
    return this.readStorage();
  }

  addItem(id: any, name: string, price: number, quantity: number, data: any): CartItem {
    const items = this.readStorage();
    const idx = items.findIndex(i => i.id === id);
    const item = new CartItem(id, name, price, quantity, data);
    if (idx !== -1) {
      items[idx] = item;
    } else {
      items.push(item);
    }
    this.writeStorage(items);
    this.onItemAdded.emit(item);
    this.onItemsChanged.emit(items.length);
    return item;
  }

  removeItem(id: any): void {
    const items = this.readStorage();
    const idx = items.findIndex(i => i.id === id);
    if (idx !== -1) {
      const removed = items.splice(idx, 1);
      this.writeStorage(items);
      this.onItemRemoved.emit(removed[0]);
      this.onItemsChanged.emit(items.length);
    }
  }

  itemCount(): number {
    return this.readStorage().length;
  }

  cost(): number {
    return this.readStorage().reduce((curr, i) => (curr + i.price * i.quantity), 0);
  }

  clear(): void {
    this.writeStorage([]);
  }

  getShipping(): number {
    return parseFloat(this.storage.getItem(this.storageKey + 'Shipping'));
  }

  setShipping(shipping: number): void {
    this.storage.setItem(this.storageKey + 'Shipping', shipping.toString());
  }

  getTax(): number {
    return parseFloat(this.storage.getItem(this.storageKey + 'Tax'));
  }

  setTax(tax: number): void {
    this.storage.setItem(this.storageKey + 'Tax', tax.toString());
  }

  isEmpty(): boolean {
    return this.readStorage().length === 0;
  }
}
