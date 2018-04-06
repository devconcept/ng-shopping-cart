import { CartItem } from '../../classes/cart-item';

export class TestCartItem extends CartItem {
  getId(): any {
    return 1;
  }

  getName(): string {
    return 'Test';
  }

  getPrice(): number {
    return 1;
  }

  setQuantity(quantity: number): void {

  }

  getQuantity(): number {
    return 1;
  }

  getImage(): string {
    return '';
  }
}
