import { Component } from '@angular/core';
import { CartItem } from '../../../src/classes/cart-item';
import { DefaultCartItem } from '../../../src/classes/default-cart-item';

@Component({
  selector: 'cart-showcase-demo',
  templateUrl: './cart-showcase-demo.component.html',
  styleUrls: ['./cart-showcase-demo.component.scss']
})
export class CartShowcaseDemoComponent {
  ratios: string[] = [];
  aspectRatio = '1:1';
  items: CartItem[] = [
    new DefaultCartItem({id: 1, name: 'Item1', price: 10, image: '/assets/laptop.jpg', quantity: 1}),
    new DefaultCartItem({id: 2, name: 'Item1', price: 10, image: '/assets/laptop.jpg', quantity: 1}),
    new DefaultCartItem({id: 3, name: 'Item1', price: 10, image: '/assets/laptop.jpg', quantity: 1}),
    new DefaultCartItem({id: 4, name: 'Item1', price: 10, image: '/assets/laptop.jpg', quantity: 1}),
    new DefaultCartItem({id: 5, name: 'Item1', price: 10, image: '/assets/laptop.jpg', quantity: 1}),
    new DefaultCartItem({id: 6, name: 'Item1', price: 10, image: '/assets/laptop.jpg', quantity: 1}),
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
