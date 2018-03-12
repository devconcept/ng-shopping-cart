import { CartItem } from '../../src/classes/cart-item';

export class DemoCartItem extends CartItem {
  public identifier: string;
  public label: string;
  public cost: number;
  public amount: number;
  public description: string;
  public country: string;
  public photo: string;

  getId(): any {
    return this.identifier;
  }

  getName(): string {
    return this.label;
  }

  getPrice(): number {
    return this.cost;
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

  fromJSON(obj: any): any {
    const { identifier, label, cost, amount, description, country, photo } = obj;
    const item = new DemoCartItem();
    item.identifier = identifier;
    item.label = label;
    item.cost = cost;
    item.amount = amount;
    item.description = description;
    item.country = country;
    item.photo = photo;
    return item;
  }

}
