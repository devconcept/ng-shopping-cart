export abstract class CartItem {

  abstract getId(): any;

  abstract setId(id: any): void;

  abstract getName(): string;

  abstract setName(name: string): void;

  abstract getPrice(): number;

  abstract setPrice(price: number): void;

  abstract getQuantity(): number;

  abstract setQuantity(quantity: number): void;

  abstract getImage(): string;

  abstract setImage(imageUrl: string): void;

  public total() {
    return this.getPrice() * this.getQuantity();
  }

}
