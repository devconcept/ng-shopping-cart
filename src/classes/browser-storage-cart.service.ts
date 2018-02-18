import { CartService } from '../';
import { CartItem } from './cart-item';

export class BrowserStorageCartService extends CartService {
  protected storage: Storage;
  protected storageKey: 'ngShoppingCart';

  private readData(): CartItem[] {
    return JSON.parse(this.storage.getItem(this.storageKey));
  }

  private writeData(data: CartItem[]): void {
    this.storage.setItem(this.storageKey, JSON.stringify(data));
  }

  getItem(id: any): CartItem {
    const data = this.readData();
    return data.find(i => i.id === id);
  }

  getItems(): CartItem[] {
    return this.readData();
  }

  addItem(item: CartItem): void {
    const data = this.readData();
    const idx = data.findIndex(i => i.id === item.id);
    if (idx !== -1) {
      data[idx] = item;
    } else {
      data.push(item);
    }
    this.writeData(data);
  }

  removeItem(id: any): void {
    const data = this.readData();
    const idx = data.findIndex(i => i.id === id);
    if (idx !== -1) {
      data.splice(idx, 1);
      this.writeData(data);
    }
  }

  itemCount(): number {
    return this.readData().length;
  }

  cost(): number {
    return this.readData().reduce((curr, i) => (curr + i.price * i.quantity), 0);
  }

  totalCost(): number {
    return this.cost();
  }

}
