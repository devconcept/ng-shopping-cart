import { CartItem } from '../../src/classes/cart-item';

export class DemoCartItem extends CartItem {
  public identifier: string;
  public label: string;
  public cost: number;
  public amount: number;
  public description: string;
  public country: string;
  public photo: string;

  constructor(itemData: any = {}) {
    super();
    const { identifier, label, cost, amount, description, country, photo } = itemData;
    this.identifier = identifier || 0;
    this.label = label || '';
    this.cost = cost || 0;
    this.amount = amount || 1;
    this.description = description || '';
    this.country = country || '';
    this.photo = photo || '';
  }

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

}
