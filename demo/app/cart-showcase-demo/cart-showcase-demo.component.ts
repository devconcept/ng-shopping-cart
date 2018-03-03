import { Component } from '@angular/core';
import { CartItem } from '../../../src/classes/cart-item';

@Component({
  selector: 'cart-showcase-demo',
  templateUrl: './cart-showcase-demo.component.html',
  styleUrls: ['./cart-showcase-demo.component.scss']
})
export class CartShowcaseDemoComponent {
  items: CartItem[] = [new CartItem(1, 'foooo'), new CartItem(2, 'bar')];

  constructor() {
  }

}
