import { CartItem } from './cart-item';

export class DefaultCartItem extends CartItem {
  public id: any;
  public name: string;
  public price: number;
  public image: string;
  public quantity: number;
  public data: any;

  constructor(itemData: any = {}) {
    super();
    this.id = itemData.id || 0;
    this.name = itemData.name || '';
    this.price = itemData.price || 0;
    this.image = itemData.image || '';
    this.quantity = itemData.quantity || 1;
    this.data = itemData.data || {};
  }

  getId(): any {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getImage(): string {
    return this.image;
  }
}
