import { Component } from '@angular/core';
import { CartItem } from '../../../src/classes/cart-item';

@Component({
  selector: 'cart-showcase-demo',
  templateUrl: './cart-showcase-demo.component.html',
  styleUrls: ['./cart-showcase-demo.component.scss']
})
export class CartShowcaseDemoComponent {
  items: CartItem[] = [
    new CartItem(1, 'foooo', 10, 1, '/photo.png'),
    new CartItem(2, 'bar', 20.5, 1, '/photo2.png'),
  ];

  constructor() {
  }

}
