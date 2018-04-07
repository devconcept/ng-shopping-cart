import { CartItem } from '../../classes/cart-item';

export class TestCartItem extends CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;

  constructor(id, name, price, quantity, image) {
    super();
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
  }

  static fromJSON(item) {
    const { id, name, price, quantity, image } = item;
    return new TestCartItem(id, name, price, quantity, image);
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
