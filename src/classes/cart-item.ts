export abstract class CartItem {

  abstract getId(): any;

  abstract getName(): string;

  abstract getPrice(): number;

  abstract getQuantity(): number;

  abstract setQuantity(quantity: number): void;

  abstract getImage(): string;

  public total() {
    return this.getPrice() * this.getQuantity();
  }

}
