import { CartItem } from '../../../src/classes/cart-item';

export class DemoCartItem extends CartItem {
  public identifier: string;
  public label: string;
  public cost: number;
  public amount: number;
  public description: string;
  public origin: string;
  public photo: string;

  getId(): any {
    return this.identifier;
  }

  setId(id: any): void {
    this.identifier = id;
  }

  getName(): string {
    return this.label;
  }

  setName(name: string): void {
    this.label = name;
  }

  getPrice(): number {
    return this.cost;
  }

  setPrice(price: number): void {
    this.cost = price;
  }

  getQuantity(): number {
    return this.amount;
  }

  setQuantity(quantity: number): void {
    this.amount = quantity;
  }

  getImage(): string {
    return this.photo;
  }

  setImage(imageUrl: string): void {
    this.photo = imageUrl;
  }

}
