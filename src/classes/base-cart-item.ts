import { CartItem } from './cart-item';

export class BaseCartItem extends CartItem {
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

  setId(id: any): void {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(price: number): void {
    this.price = price;
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

  setImage(image: string): void {
    this.image = image;
  }
}
