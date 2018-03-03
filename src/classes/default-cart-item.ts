import { CartItem } from './cart-item';

export default class DefaultCartItem extends CartItem {
  private _id: any;
  private _name: string;
  private _price: number;
  private _image: string;
  private _quantity: number;

  constructor(id: any = 0, name: string = '', price: number = 0, image: string = '', quantity: number = 0) {
    super();
    this.setId(id);
    this.setName(name);
    this.setPrice(price);
    this.setImage(image);
    this.setQuantity(quantity);
  }

  getId(): any {
    return this._id;
  }

  setId(id: any): void {
    this._id = id;
  }

  getName(): string {
    return this._name;
  }

  setName(name: string): void {
    this._name = name;
  }

  getPrice(): number {
    return this._price;
  }

  setPrice(price: number): void {
    this._price = price;
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

  setImage(imageUrl: string): void {
    this._image = imageUrl;
  }

}
