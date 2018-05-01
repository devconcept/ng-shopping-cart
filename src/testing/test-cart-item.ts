import {CartItem} from '../classes/cart-item';

export class TestCartItem extends CartItem {
  uuid: number;
  description: string;
  cost: number;
  amount: number;
  picture: string;

  constructor(id, name, price, quantity, image) {
    super();
    this.uuid = id;
    this.description = name;
    this.cost = price;
    this.amount = quantity;
    this.picture = image;
  }

  static fromJSON(item) {
    const {uuid, description: description, cost, amount, picture} = item;
    return new TestCartItem(uuid, description, cost, amount, picture);
  }

  getId(): any {
    return this.uuid;
  }

  getName(): string {
    return this.description;
  }

  getPrice(): number {
    return this.cost;
  }

  setQuantity(quantity: number): void {
    this.amount = quantity;
  }

  getQuantity(): number {
    return this.amount;
  }

  getImage(): string {
    return this.picture;
  }
}
