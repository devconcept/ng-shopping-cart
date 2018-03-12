export abstract class CartItem {
  abstract getId(): any;

  abstract getName(): string;

  abstract getPrice(): number;

  abstract setQuantity(quantity: number): void;

  abstract getQuantity(): number;

  abstract getImage(): string;

  public abstract fromJSON(obj: any): any;

  public total() {
    return this.getPrice() * this.getQuantity();
  }
}


