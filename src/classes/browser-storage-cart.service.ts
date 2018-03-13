import { CartItem } from './cart-item';
import { SerializableCartService } from '../interfaces/serializable-cart.service';
import { MemoryCartService } from '../services/memory-cart.service';

export abstract class BrowserStorageCartService<T extends CartItem> extends MemoryCartService<T> implements SerializableCartService {
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

  protected save() {
    this.writeStorage(this._items);
    this.storage.setItem(this.storageKey + 'Shipping', this._shipping.toString());
    this.storage.setItem(this.storageKey + 'TaxRate', this._taxRate.toString());
  }

  protected restore() {
    const taxRate = this.storage.getItem(this.storageKey + 'TaxRate');
    const shipping = this.storage.getItem(this.storageKey + 'Shipping');
    this._items = this.readStorage();
    this._taxRate = taxRate ? parseFloat(taxRate) : 0;
    this._shipping = shipping ? parseFloat(shipping) : 0;
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
