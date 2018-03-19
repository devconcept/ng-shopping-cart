import { Component } from '@angular/core';
import { CartViewDisplay } from '../../../src/types';

@Component({
  selector: 'cart-view-demo',
  templateUrl: './cart-view-demo.component.html',
  styleUrls: ['./cart-view-demo.component.scss']
})
export class CartViewDemoComponent {
  display: CartViewDisplay = 'fixed';
  showImages = true;
}
