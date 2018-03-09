import { CartItem } from './cart-item';

export default class DefaultCartItem extends CartItem {
  private _id: any;
  private _name: string;
  private _price: number;
  private _image: string;
  private _quantity: number;

  constructor(id: any = 0, name: string = '', price: number = 0, image: string = '', quantity: number = 0) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this._image = image;
    this._quantity = quantity;
  }

  getId(): any {
    return this._id;
  }

  getName(): string {
    return this._name;
  }

  getPrice(): number {
    return this._price;
  }

  getQuantity(): number {
    return this._quantity;
  }

  setQuantity(quantity: number): void {
    this._quantity = quantity;
  }

  getImage(): string {
    return this._image;
  }

}
