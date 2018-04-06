import { CartItem } from './cart-item';

/**
 * A default implementation for CartItem
 */
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

  /**
   * Abstract base method implementation to obtain the item id
   */
  getId(): any {
    return this.id;
  }

  /**
   * Sets the current id for the item
   * @param id {any}: The id value
   */
  setId(id: any): void {
    this.id = id;
  }

  /**
   * Abstract base method implementation to return the name, a small text describing the item
   */
  getName(): string {
    return this.name;
  }

  /**
   * Sets the name of the item
   */
  setName(name: string): void {
    this.name = name;
  }

  /**
   * Abstract base method implementation to know how much the item cost
   */
  getPrice(): number {
    return this.price;
  }

  /**
   * Set the price of the item
   */
  setPrice(price: number): void {
    this.price = price;
  }

  /**
   * Abstract base method implementation to return how much of the item is ordered
   */
  getQuantity(): number {
    return this.quantity;
  }

  /**
   * Abstract base method implementation to set how much of the item is ordered
   */
  setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  /**
   * Abstract base method implementation to get the url of an image for the item
   */
  getImage(): string {
    return this.image;
  }

  /**
   * Sets the url of the item's image
   */
  setImage(image: string): void {
    this.image = image;
  }
}
