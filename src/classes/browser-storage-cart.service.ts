import { CartService } from '../services/cart.service';
import { CartItem } from './cart-item';
import { SerializableCartService } from '../interfaces/serializable-cart.service';

export abstract class BrowserStorageCartService<T extends CartItem> extends CartService<T> implements SerializableCartService {
  itemClass: any;
  protected storage: Storage;

  constructor(itemClass: T, protected storageKey) {
    super();
    this.itemClass = itemClass;
  }

  protected readStorage(): T[] {
    const storageContents = this.storage.getItem(this.storageKey);
    if (!storageContents) {
      return [];
    }
    return JSON.parse(storageContents).map(i => (new this.itemClass().fromJSON(i)));
  }

  protected writeStorage(items: T[]): void {
    this.storage.setItem(this.storageKey, JSON.stringify(items));
  }

  getItem(id: any): T {
    const items = this.readStorage();
    return items.find(i => i.getId() === id);
  }

  getItems(): T[] {
    return this.readStorage();
  }

  addItem(item: T): void {
    const items = this.readStorage();
    const idx = items.findIndex(i => i.getId() === item.getId());
    if (idx !== -1) {
      items[idx] = item;
    } else {
      items.push(item);
    }
    this.writeStorage(items);
    this.onItemAdded.emit(item);
    this.onItemsChanged.emit(items.length);
  }

  removeItem(id: any): void {
    const items = this.readStorage();
    const idx = items.findIndex(i => i.getId() === id);
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

  entries(): number {
    return this.readStorage().reduce((curr, i) => (curr + i.getQuantity()), 0);
  }

  cost(): number {
    return this.readStorage().reduce((curr, i) => (curr + i.getPrice() * i.getQuantity()), 0);
  }

  clear(): void {
    this.writeStorage([]);
  }

  getShipping(): number {
    const value = this.storage.getItem(this.storageKey + 'Shipping');
    return value ? parseFloat(value) : 0;
  }

  setShipping(shipping: number): void {
    this.storage.setItem(this.storageKey + 'Shipping', shipping.toString());
  }

  getTaxRate(): number {
    const value = this.storage.getItem(this.storageKey + 'Tax');
    return value ? parseFloat(value) : 0;
  }

  setTaxRate(tax: number): void {
    this.storage.setItem(this.storageKey + 'Tax', tax.toString());
  }

  isEmpty(): boolean {
    return this.readStorage().length === 0;
  }
}
