import { Component } from '@angular/core';
import { CartService } from '../../src';
import { DemoCartItem } from './demo-cart-item';

@Component({
  selector: 'cart-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private cartService: CartService<DemoCartItem>) {
    this.cartService.itemClass = DemoCartItem;
  }
}
