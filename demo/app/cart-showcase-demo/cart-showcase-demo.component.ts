import { Component } from '@angular/core';
import { CartItem } from '../../../src/classes/cart-item';
import DefaultCartItem from '../../../src/classes/default-cart-item';

@Component({
  selector: 'cart-showcase-demo',
  templateUrl: './cart-showcase-demo.component.html',
  styleUrls: ['./cart-showcase-demo.component.scss']
})
export class CartShowcaseDemoComponent {
  ratios: string[] = [];
  aspectRatio = '1:1';
  items: CartItem[] = [
    new DefaultCartItem(1, 'Item1', 10, '/assets/laptop.jpg', 1),
    new DefaultCartItem(2, 'Item2', 20.5, '/assets/laptop.jpg', 1),
    new DefaultCartItem(3, 'Item3', 45.5, '/assets/laptop.jpg', 1),
    new DefaultCartItem(4, 'Item4', 33.99, '/assets/laptop.jpg', 1),
    new DefaultCartItem(5, 'Item5', 67.99, '/assets/laptop.jpg', 1),
    new DefaultCartItem(6, 'Item6', 100, '/assets/laptop.jpg', 1),
  ];

  constructor() {
    const used = [];
    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 4; j++) {
        const ratio = i / j;
        if (used.indexOf(ratio) === -1) {
          used.push(ratio);
          this.ratios.push(`${i}:${j}`);
        }
      }
    }
  }

}
