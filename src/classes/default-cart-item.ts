import { CartItem } from './cart-item';

export class DefaultCartItem extends CartItem {
  public id: any;
  public name: string;
  public price: number;
  public image: string;
  public quantity: number;

  constructor(id: any = 0, name: string = '', price: number = 0, image: string = '', quantity: number = 1) {
    super();
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.quantity = quantity;
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

  fromJSON(obj: any): any {
    const { id, name, price, image, quantity } = obj;
    return new DefaultCartItem(id, name, price, image, quantity);
  }
}
