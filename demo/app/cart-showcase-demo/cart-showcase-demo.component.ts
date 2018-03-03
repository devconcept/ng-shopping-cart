import { Component } from '@angular/core';
import { CartItem } from '../../../src/classes/cart-item';
import DefaultCartItem from '../../../src/classes/default-cart-item';

@Component({
  selector: 'cart-showcase-demo',
  templateUrl: './cart-showcase-demo.component.html',
  styleUrls: ['./cart-showcase-demo.component.scss']
})
export class CartShowcaseDemoComponent {
  items: CartItem[] = [
    new DefaultCartItem(1, 'foooo', 10, '/photo.png', 1),
    new DefaultCartItem(2, 'bar', 20.5, '/photo2.png', 1),
  ];

  constructor() {
  }

}
