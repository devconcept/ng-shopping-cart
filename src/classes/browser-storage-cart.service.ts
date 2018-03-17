import { CartItem } from './cart-item';
import { MemoryCartService } from '../services/memory-cart.service';
import { BrowserStorageServiceConfiguration } from '../interfaces/browser-storage-service-options';

export abstract class BrowserStorageCartService<T extends CartItem> extends MemoryCartService<T> {
  protected itemClass: any;
  protected storage: Storage;
  protected storageKey: string;
  protected clearOnError: boolean;

  constructor(itemClass: CartItem, configuration: BrowserStorageServiceConfiguration) {
    super();
    this.storageKey = configuration && configuration.storageKey ? configuration.storageKey : 'NgShoppingCart';
    this.clearOnError = configuration && configuration.clearOnError !== undefined ? configuration.clearOnError : true;
    this.itemClass = itemClass;
  }

  protected readStorage(): T[] {
    const storageContents = this.storage.getItem(this.storageKey);
    if (!storageContents) {
      return [];
    }
    let contents = [];
    try {
      contents = JSON.parse(storageContents).map(i => {
        if (this.itemClass.fromJSON) {
          return this.itemClass.fromJSON(i);
        }
        return new this.itemClass(i);
      });
    } catch (e) {
      this.writeStorage([]);
      this.storage.setItem(this.storageKey + 'Shipping', '0');
      this.storage.setItem(this.storageKey + 'TaxRate', '0');
    }
    return contents;
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
