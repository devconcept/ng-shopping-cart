/**
 * The base class for every unit of information stored in the cart service
 */
export abstract class CartItem {
  /**
   * Returns an unique identifier for your item
   */
  abstract getId(): any;
  /**
   * Returns the name, a small text describing the item
   */
  abstract getName(): string;
  /**
   * Return how much a single unit of the item costs
   */
  abstract getPrice(): number;
  /**
   * Sets how much of this item is ordered
   */
  abstract setQuantity(quantity: number): void;
  /**
   * Returns how much of this item is ordered
   */
  abstract getQuantity(): number;
  /**
   * Returns the url of an image for the item
   */
  abstract getImage(): string;
  /**
   * Return the total cost of the item, that is the price multiplied by the quantity
   */
  public total() {
    return this.getPrice() * this.getQuantity();
  }
}


